// tps-meter — local opencode TUI plugin.
// Shows a live tokens/sec meter in the prompt area (session_prompt_right slot),
// then the final tok/s + session average once the assistant reply completes.
//
// Mirrors the proven plugin contract used by opencode's own tui-smoke plugin
// and oh-my-openagent (which loads on this machine):
//   - default export = { id, tui }
//   - tui(api) registers a slot via api.slots.register({ order, slots: {...} })
//   - slot render fn (ctx, value) returns an @opentui/solid element built
//     imperatively: solid.createElement(kind) / solid.setProp(el, name, value)
//     / solid.insert(el, child)
//   - @opentui/solid is dynamically imported and guarded (no-op on failure)
//   - a polling loop updates state and calls api.renderer.requestRender()

const CHARS_PER_TOKEN = 4; // rough English heuristic (matches opencode-tps)
const POLL_MS = 400;
const MIN_DT_S = 0.15; // ignore polls closer than this for rate math
const RATE_DECAY_S = 2.0; // treat samples older than this as stale (rate resets)

const fmt = (n) => (n >= 100 ? String(Math.round(n)) : n.toFixed(1));

function textLength(message) {
  let len = 0;
  for (const part of message.parts ?? []) {
    if (part && part.type === "text" && typeof part.text === "string") {
      len += part.text.length;
    }
  }
  return len;
}

function isStreaming(message) {
  return Boolean(message && !message.time?.completed);
}

export default {
  id: "tps-meter",
  tui: async (api) => {
    const solid = await import("@opentui/solid").catch(() => null);
    if (!solid) return;

    // Per-session meter state, updated by the poller, read by the slot fn.
    const meters = new Map();
    function meterFor(sessionID) {
      let m = meters.get(sessionID);
      if (!m) {
        m = {
          label: "",
          // live-rate tracking
          lastChars: 0,
          lastAt: 0,
          lastMsgID: null,
          // session cumulative stats (completed assistant messages)
          totalTokens: 0,
          totalMs: 0,
          lastFinal: null,
        };
        meters.set(sessionID, m);
      }
      return m;
    }

    function sampleSession(sessionID, m) {
      let messages = [];
      try {
        messages = api.state.session.messages(sessionID) ?? [];
      } catch {
        return;
      }
      const assistants = messages.filter((msg) => msg && msg.role === "assistant");
      const active = assistants[assistants.length - 1];

      if (!active) {
        if (m.label !== "") {
          m.label = "";
          api.renderer.requestRender();
        }
        return;
      }

      const now = Date.now();
      const chars = textLength(active);
      const id = active.id ?? active.parentID ?? "msg";

      if (isStreaming(active)) {
        // Live rate from text growth between polls.
        const dt = (now - m.lastAt) / 1000;
        const sameMsg = m.lastMsgID === id;
        const notStale = dt > 0 && dt < RATE_DECAY_S;
        let label = m.label;
        if (sameMsg && notStale && dt >= MIN_DT_S && chars >= m.lastChars) {
          const deltaChars = chars - m.lastChars;
          if (deltaChars > 0) {
            const live = deltaChars / CHARS_PER_TOKEN / dt;
            label = `${fmt(live)} tok/s`;
          }
        }
        m.lastChars = chars;
        m.lastAt = now;
        m.lastMsgID = id;
        if (label !== m.label) {
          m.label = label;
          api.renderer.requestRender();
        }
      } else {
        // Message completed: final rate from real token counts + wall time.
        m.lastChars = 0;
        m.lastAt = 0;
        m.lastMsgID = null;
        const created = active.time?.created;
        const completed = active.time?.completed;
        const output = active.tokens?.output;
        if (created && completed && typeof output === "number" && completed > created) {
          const durMs = completed - created;
          const final = output / (durMs / 1000);
          m.totalTokens += output;
          m.totalMs += durMs;
          const avg = m.totalMs > 0 ? m.totalTokens / (m.totalMs / 1000) : final;
          const label = avg > 0 ? `${fmt(final)} tok/s (avg ${fmt(avg)})` : `${fmt(final)} tok/s`;
          m.lastFinal = label;
          if (label !== m.label) {
            m.label = label;
            api.renderer.requestRender();
          }
        }
      }
    }

    // Sessions currently rendered by the slot; poller samples only these.
    const renderedSessions = new Set();
    const slotFn = (ctx, value) => {
      if (value?.session_id) renderedSessions.add(value.session_id);
      const el = solid.createElement("text");
      const m = meters.get(value?.session_id);
      if (!m || !m.label) {
        solid.setProp(el, "fg", ctx?.theme?.current?.textMuted ?? "#808080");
        solid.insert(el, "");
        return el;
      }
      solid.setProp(el, "fg", ctx?.theme?.current?.textMuted ?? "#808080");
      solid.insert(el, m.label);
      return el;
    };

    api.slots.register({
      order: 1,
      slots: {
        session_prompt_right: slotFn,
      },
    });

    const poll = () => {
      for (const sessionID of renderedSessions) {
        sampleSession(sessionID, meterFor(sessionID));
      }
    };

    const interval = setInterval(poll, POLL_MS);
    api.lifecycle.onDispose(() => {
      clearInterval(interval);
      meters.clear();
      renderedSessions.clear();
    });
  },
};

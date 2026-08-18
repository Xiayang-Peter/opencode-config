---
name: lecture-note-format
description: "Format, improve, polish, and CREATE clean, readable Markdown notes using bold, ==highlights==, callout blocks, tables, and clean heading hierarchy. Use whenever the user asks to modify, format, improve, polish, clean up, restructure, organize, or create ANY kind of note: lecture/study notes (especially COMPSCI 760/701/705/742 in Obsidian vaults), reading notes, meeting notes, daily notes, assignment notes, wiki pages, or any note with raw bullet points, typos, broken headings, incomplete sections, or source material (slides/PDFs) to complete it from. Triggers: 'format this note', 'make my notes readable', 'clean up my notes', 'improve this note', 'polish', 'write up', 'take notes on', 'create/make a note about', 'note this down'. Covers typos and structure fixes, completing notes from PDFs/slides, creating new notes from scratch, and applying consistent reading aids."
---

# Note Format

## Overview

Turn raw, messy notes into clean, scannable Obsidian notes — or create well-structured notes from the start. Three jobs:

1. **Fix**: typos, broken heading hierarchy, orphaned indents, malformed `==...==` markers, placeholder text (`==COMPLETE==`), unresolved inline questions.
2. **Enhance**: add bold, `==highlights==`, callout blocks, tables, `---` separators — and **complete missing sections from source material** (lecture slides, reading PDFs) when available.
3. **Create**: when the user asks for a new note, produce it fully formatted using these rules from the start (see "Creating New Notes").

## Workflow

1. **Read the note** (or the user's request, if creating). Identify: note type, section structure, user's voice/examples, existing images (`![[Pasted image ...]]`), existing highlights/callouts, TODO reminders.
2. **Extract source material** if a matching PDF/slides exists and the note is incomplete:
   ```bash
   pdftotext -layout "Lecture File.pdf" /tmp/lecture.txt
   ```
   Source material is the AUTHORITATIVE source — never invent facts. Note that `pdftotext` output contains OCR noise (garbled math like `↘` for ∇, `!` for apostrophes, split lines) — reconstruct clean text.
3. **Rewrite the note in place** (same path, same filename) — or create the new note — applying all rules below.
4. **Verify**: every `![[image]]` embed still exists in the vault, heading levels don't skip, highlight count is within budget.

## Formatting Rules

### Heading hierarchy

- `# <Title>` at the very top. For course lecture notes: `# W3L1 Adversarial Learning` (i.e. `# <Course>/<Week> <Lecture> Title`). For other notes: a clear, descriptive title.
- `##` major sections, `###` subsections, `####` only for granular sub-items.
- **Never** H1 mid-document. **Never** skip levels (H2 → H4 without H3).
- Fix any existing broken levels (e.g. a stray `# Evasion attack` mid-note → `##`).

### Bold

- Bold `**...**` every **key term** on first mention: definitions, important numbers, named attacks/methods, decisions, action owners.
- Use it deliberately — a term per bullet, not whole sentences.

### Highlights `==...==`

- `==highlight==` ONLY for **must-remember facts**: key numbers, the one-line core idea, critical caveats.
- Budget: **max 5–6 per note**. Count pairs — `grep -o '==' file | wc -l` divided by 2.
- Nesting is allowed: `==**text**==` for a highlighted bold term.

### Callout blocks

These are the reading aids — use them generously but purposefully:

| Callout | Use for |
|---|---|
| `> [!important]` | Core idea / the one thing to remember |
| `> [!info]` | Definitions, details, how-it-works explanations |
| `> [!tip]` | Mental models, analogies, "how to read this" |
| `> [!warning]` | Caveats, limitations, security dangers, "this has a catch" |
| `> [!success]` | Takeaways / key-differences summary at the end |
| `> [!question]` | Discussion questions to bring to class |
| `> [!todo]` | The user's own leftover reminders/TODOs / action items — PRESERVE these |

Syntax: `> [!type] Title` then `> content` on following lines. Bullets inside callouts work: `> - item`.

### Tables

- Use a table whenever two+ items need comparing: attack types, black/gray/white-box, method families, metrics, pros/cons, options.
- Keep header row + separator row + body rows. Bold the row labels.
- A single `✅` is allowed in a table cell to flag the "winner"/key case (matches vault style).

### Horizontal rules

- `---` between every major `##` section. Keep a blank line around each `---`.

### Math

- Keep LaTeX: inline `$...$`, display `$$...$$`. Preserve existing math exactly (fix OCR damage only if clearly wrong).

### Images

- **Never rename or alter** `![[Pasted image ...]]` embeds — Obsidian resolves them by exact filename.
- Don't add image embeds that don't already exist.

## Completing Notes from Source Material

When a note is truncated or has placeholders, complete it from the source material (lecture slides, paper PDFs, readings) — but keep it a **concise study note, not a source dump**:

- Bullets, not paragraphs. One idea per bullet.
- ~100–180 lines per lecture note (depending on lecture density); scale to the note type.
- Preserve the user's own examples, voice, and TODO reminders verbatim in substance.
- For the user's existing content: fix typos and formatting, but **do not reword or remove substantive content**.
- Keep paper references (e.g. `Refers to paper: [arxiv link]`), author-year citations, and the metadata (course, lecturer, date) at the top.

## Creating New Notes

When the user asks to create a note (e.g. "make a note on X", "take notes", "write up the reading", "note this down"):

- Determine the note type and apply the matching structure below.
- Follow the vault's `Style Guide.md` naming conventions (e.g. `W{week}L{lecture}`) and place it in the correct week folder — never invent names.
- Build the skeleton first (heading hierarchy), then fill content per the Formatting Rules.
- If source material exists, complete from it; otherwise, structure the user's supplied content.

## Note-type structures

- **Lecture note**: `# W#L# Title` → `##` per slide-section → callouts for key ideas → `> [!success]` takeaways at the end. ~100–180 lines.
- **Reading note**: `# W#R# Title` → paper metadata at top (authors, year, venue, link) → `##` per section (problem, method, findings, critique) → `> [!success]` takeaway / your reaction at the end.
- **Meeting / daily note**: `# YYYY-MM-DD` (or title) → `##` agenda / decisions / action items → `> [!todo]` for action items, owner + due date bolded.
- **Assignment note**: `# <Assignment Name>` → requirements, plan, status → `> [!todo]` for remaining work.

## Style Reference

See [references/formatted-example.md](references/formatted-example.md) for a fully formatted lecture note showing all rules applied in context.

Check the vault's own `Style Guide.md` (if present) for course-specific naming (`W{week}L{lecture}`) — filename conventions stay untouched.

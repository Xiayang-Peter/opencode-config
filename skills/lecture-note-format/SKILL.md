---
name: lecture-note-format
description: "Format and improve Obsidian lecture/study notes for readability using bold, ==highlights==, callout blocks, tables, and clean heading hierarchy. Use when a user asks to 'format', 'improve', 'polish', or 'make readable' a course/lecture note (.md in an Obsidian vault), especially COMPSCI notes (760/701/705/742) or any note with raw bullet points, typos, broken headings, incomplete sections, or slides available to complete it from. Covers typos and structure fixes, completing notes from lecture PDFs, and applying consistent reading aids."
---

# Lecture Note Format

## Overview

Turn raw, messy lecture notes into clean, scannable Obsidian study notes. Two jobs, in order:

1. **Fix**: typos, broken heading hierarchy, orphaned indents, malformed `==...==` markers, placeholder text (`==COMPLETE==`), unresolved inline questions.
2. **Enhance**: add bold, `==highlights==`, callout blocks, tables, `---` separators — and **complete missing sections from the lecture slides** when a PDF is available.

## Workflow

1. **Read the note.** Identify: section structure, user's voice/examples, existing images (`![[Pasted image ...]]`), existing highlights/callouts, TODO reminders.
2. **Extract the lecture slides** if a matching PDF exists and the note is incomplete:
   ```bash
   pdftotext -layout "Lecture File.pdf" /tmp/lecture.txt
   ```
   Slides are the AUTHORITATIVE source — never invent facts. Note that `pdftotext` output contains OCR noise (garbled math like `↘` for ∇, `!` for apostrophes, split lines) — reconstruct clean text.
3. **Rewrite the note in place** (same path, same filename), applying all rules below.
4. **Verify**: every `![[image]]` embed still exists in the vault, heading levels don't skip, highlight count is within budget.

## Formatting Rules

### Heading hierarchy

- `# <Course> <Lecture> Title` (e.g. `# W3L1 Adversarial Learning`) at the very top.
- `##` major sections, `###` subsections, `####` only for granular sub-items.
- **Never** H1 mid-document. **Never** skip levels (H2 → H4 without H3).
- Fix any existing broken levels (e.g. a stray `# Evasion attack` mid-note → `##`).

### Bold

- Bold `**...**` every **key term** on first mention: definitions, important numbers, named attacks/methods.
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
| `> [!todo]` | The user's own leftover reminders/TODOs — PRESERVE these |

Syntax: `> [!type] Title` then `> content` on following lines. Bullets inside callouts work: `> - item`.

### Tables

- Use a table whenever two+ items need comparing: attack types, black/gray/white-box, method families, metrics, pros/cons.
- Keep header row + separator row + body rows. Bold the row labels.
- A single `✅` is allowed in a table cell to flag the "winner"/key case (matches vault style).

### Horizontal rules

- `---` between every major `##` section. Keep a blank line around each `---`.

### Math

- Keep LaTeX: inline `$...$`, display `$$...$$`. Preserve existing math exactly (fix OCR damage only if clearly wrong).

### Images

- **Never rename or alter** `![[Pasted image ...]]` embeds — Obsidian resolves them by exact filename.
- Don't add image embeds that don't already exist.

## Completing Notes from Slides

When a note is truncated or has placeholders, complete it from the slides — but keep it a **concise study note, not a slide dump**:

- Bullets, not paragraphs. One idea per bullet.
- ~100–180 lines per lecture note (depending on lecture density).
- Preserve the user's own examples, voice, and TODO reminders verbatim in substance.
- For the user's existing content: fix typos and formatting, but **do not reword or remove substantive content**.
- Keep paper references (e.g. `Refers to paper: [arxiv link]`), author-year citations, and the lecture metadata (course, lecturer, date) at the top.

## Style Reference

See [references/formatted-example.md](references/formatted-example.md) for an excerpt of a fully formatted note showing all rules applied in context.

Check the vault's own `Style Guide.md` (if present) for course-specific naming (`W{week}L{lecture}`) — filename conventions stay untouched.

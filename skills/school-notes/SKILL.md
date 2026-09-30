---
name: school-notes
description: Knows the exact location and contents of all Peter's school notes, stored as an Obsidian vault-of-vaults under /var/home/peter/Documents/Vaults. USE WHEN user says "school notes", "my notes", "compsci 760 notes", "760 notes", "701 notes", "705 notes", "742 notes", "go to notes", "check my notes", "obsidian vault", "open the vault", or mentions any COMPSCI course notes / lecture notes / assignments / pitch. Navigate straight to the matching vault without asking which folder.
---

# School Notes Directory Map

All notes live in one Obsidian vault root: `/var/home/peter/Documents/Vaults/`
Each course is its own **nested Obsidian vault** (own `.obsidian/` config). Ignore `.obsidian/`, `copilot/`, `.debris/`, `.omo/`, `.venv`, `Rubbish/`, `*.zip` (backups), `*.annot.json`, `.directory`, `.megaignore` when navigating.

## Directory map (authoritative, verified 2026-09-21)

> 📐 Each course vault has a **`Style Guide.md`** at its root documenting the `W{week}L{n}` (lecture) / `W{week}R{n}` (reading) naming convention + week-folder structure. Consult it before navigating or adding files.

| Course | Path | Contents |
|---|---|---|
| **COMPSCI 701** (Software Design/Quality) | `Vaults/701_vault/` | Assignments, weekly notes + PDFs, test prep |
| **COMPSCI 705** (HCI Research Methods) | `Vaults/705_vault/` | Weekly notes, readings, PDFs (see duplication note) |
| **COMPSCI 742** (Internet Measurements/Web) | `Vaults/742_vault/` | Weekly notes, assignment, annotated PDFs + slides |
| **COMPSCI 760** (ML Research Project) | `Vaults/760_vault/` | Pitch + adversarial ML lecture notes |
| **Bazzite** (OS docs, not a course) | `Vaults/Bazzite_vault/` | Bazzite OS wiki/docs archive |

## What's inside each vault

### 701_vault — COMPSCI 701 (organised **by week**; assignments + test prep at root)
- Root: `Style Guide.md`, `Assignment 1.md` (marking rubric: functionality/OO design/maintainability/report), `Assignment 1 readme.md`, `Test 1 Cheat Sheet.md`, `Test 1 Study Guide.md`, `2026-07-31.md` (daily note)
- `Week 1/` → `Week 7/`; each week has a `Week N.md` hub + lecture PDFs (e.g. `Week 4/W4L1.md` + `W4L1 Guidelines.pdf`; `Week 5/W5L1 compsci701-2026-lec05.1-functions1.pdf`; `Week 7/compsci701-2026-lect07.1-dp1.pdf`)
- Naming: `W{week}L{lecture}` (e.g. `W2L3` = week 2 lecture 3), `W{week}R{n}` for readings

### 705_vault — COMPSCI 705 (organised **by week**)
- **Week folders exist in TWO places**: `705_vault/Week N/` and `705_vault/COMPSCI 705/Week N/` (duplicated sets). Root-level has the newer content (`Week 7/`, `assignment 2/`) — check both if a file seems missing.
- Root: `Style Guide.md`, `Wiki Style.md`, `assignment 2/Project Plan - System Overview.md`
- `Week 1/` → `Week 5/` + `Week 7/`; each week has `Week N.md` hub, `W{n}Exam.md`, `W{n}L*` lecture notes + PDFs, `W{n}R*` readings (e.g. `Week 3/W3R1 Ioannidis (2005).md`, `Week 5/W5R2 Reflexive Thematic Analysis.md`)
- `Week 7/` — `W7L1.md` + `W7L1 Ethics 2026.pdf`, `W7R1 Value-Sensitive Design.md` + `W7R1.pdf`, and `705 Lit review/` (group project: `Literature_Review_Research_Result.md`, `Presentation_Script.md`, lit PDFs + slides)
- Note: some filenames contain URL-encoded chars (`%3a` = `:`) from PDF exports

### 742_vault — COMPSCI 742 (organised **by week**)
- Root: `Assignment 1.md`, `Style Guide.md`
- `Week 1/` — `Week 1.md`
- `Week 2/` — `Week 2.md`, `W2L1 Internet Measurements Supplementary.pdf`, `W2L2 WebWorkloadCharacterization.pdf`
- `Week 4/` — `W4L1.md`, `W4L2.md`, paper + slides PDFs
- `Week 7/` — `W7L1-2 Intro and Wireless.md` + `W7L1-2 Recording Transcript.md/.srt` (lecture transcript), PDFs/PPTX for `W7L1 intro`, `W7L2 wireless`, `W7L3 satellite-internet`, `W7L4 starlink`

### 760_vault — COMPSCI 760 (organised **by week**; pitch files at root)
- Root: `Pitch Idea.md` — ML-driven CPU scheduling optimizer (SimPy simulation, feature extraction, algorithm choice: SJF/RR/SRTF), `Pitch script.md`, `Style Guide.md`
- `Week 3/` — adversarial ML: `W3L1 Adversarial Learning.md` + `.pdf`, `W3L1 Pre-lecture Notes.md`, `W3L2 Poisoning Attack.md` + `.pdf`, `W3L3.md`, `W3L3 Adversarial Defenses.pdf`
- `Week 4/` — `W4L1-2 SSL.md` + `.pdf`, `W4L3 LLMs.pdf`
- `Week 5/` — `W5L1.md`
- `Images/` — pasted screenshots

### Bazzite_vault — Bazzite OS documentation archive (not a course)
- `Bazzite/raw/` + `Bazzite/wiki/` — full Bazzite docs (~306 md files), plus `Bazzite.zip` original archive
- `resources/test_specifications.md`, `Wiki Style.md`, `Untitled.base`
- `copilot/` — Obsidian Copilot plugin data (ignore)

## Behavior

1. On trigger, `cd`/open the matching vault path directly — do NOT ask "which folder?".
2. List the folder's contents so the user can pick a file.
3. For COMPSCI courses, prefer `.md` notes over lecture PDFs unless the user asks for slides.
4. If the user says "the vault" without a course, show the vault root listing with all 5 vaults.

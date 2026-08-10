---
name: school-notes
description: Knows the exact location and contents of all Peter's school notes, stored as an Obsidian vault-of-vaults under /var/home/peter/Documents/Obsidian_vaults. USE WHEN user says "school notes", "my notes", "compsci 760 notes", "760 notes", "701 notes", "705 notes", "742 notes", "go to notes", "check my notes", "obsidian vault", "open the vault", or mentions any COMPSCI course notes / lecture notes / assignments / pitch. Navigate straight to the matching vault without asking which folder.
---

# School Notes Directory Map

All notes live in one Obsidian vault root: `/var/home/peter/Documents/Obsidian_vaults/`
Each course is its own **nested Obsidian vault** (own `.obsidian/` config). Ignore `.obsidian/`, `copilot/`, `.debris/`, `.directory`, `.megaignore`, `OLD.zip` (117MB backup), `a.zip` (31MB), `.venv` at root.

## Directory map (authoritative, verified 2026-08-09)

| Course | Path | Contents |
|---|---|---|
| **COMPSCI 701** (Software Design/Quality) | `Obsidian_vaults/701_vault/` | Assignments, lecture notes + PDFs |
| **COMPSCI 705** (HCI Research Methods) | `Obsidian_vaults/705_vault/COMPSCI 705/` | Weekly notes, readings, PDFs |
| **COMPSCI 742** (Internet Measurements/Web) | `Obsidian_vaults/742_vault/` | Weekly notes, assignments, annotated PDFs |
| **COMPSCI 760** (ML Research Project) | `Obsidian_vaults/760_vault/` | Pitch + weekly adversarial ML lecture notes |
| **Bazzite** (OS docs, not a course) | `Obsidian_vaults/Bazzite_vault/` | Bazzite OS wiki archive |

## What's inside each vault

### 701_vault — COMPSCI 701
- `Assignment 1.md` (marking rubric: functionality/OO design/maintainability/report), `Assignment 1 readme.md`
- Lecture notes: `701 Lecture 2.3 Testability.md`, `701 Lecture 3.1 + 3.2 Naming.md`
- Lecture PDFs: `compsci701-2026-lect02.2-alterability.pdf`, `lect02.3-testability.pdf`, `lect03.1-naming.pdf`, `lect03.2-naming-research.pdf`
- `2026-07-31.md` (daily note), `Pasted image 20260804095001.png`

### 705_vault — COMPSCI 705 (notes in `COMPSCI 705/` subfolder)
- `Week 1.md` (Oulasvirta & Hornbæk research problem types: empirical/conceptual/constructive), `Week 2.md`, `Week 3.md`
- `Reading 1.md`, `Week 3 reading.md` (Ioannidis "Why Most Published Research Findings Are False"), plus `Week 3 reading Ioannidis_(2005)...pdf` and Wikipedia HTML copy
- `Wk2ExperimentDesignX02.pdf`, `Week3slides1.pdf`, `Wiki Style.md` (note style guide)

### 742_vault — COMPSCI 742
- `Week 1.md`, `Week 2.md`, `Assignment 1.md`
- `Week 2.1 - Internet_Measurements_Supplementary.pdf` (+ `.annot.json` PDF annotation), `Week 2.2 - WebWorkloadCharacterization.pdf`

### 760_vault — COMPSCI 760
- `Pitch Idea.md` — ML-driven CPU scheduling optimizer (SimPy simulation, feature extraction, algorithm choice: SJF/RR/SRTF)
- `Pitch script.md`
- Week 3 adversarial ML: `W3L1 Adversarial Learning - Pre-lecture Notes.md`, `W3L1 Adversarial learning.md`, `W3L2 Poisoning attack.md`, `W3L3.md` (empty as of 2026-08-09)
- Lecture PDFs: `W3L1_Lecture1_AdversarialLearning.pdf`, `W3L2_Lecture2_PoisoningAttacks.pdf`, `W3L3_Lecture3_AdversarialDefenses.pdf`

### Bazzite_vault — Bazzite OS documentation archive (not a course)
- `Bazzite/raw/` — full Bazzite docs repo: `src/` (Advanced, Gaming, General, Handheld_and_HTPC_edition), `hooks/`, `plugins/`, `utils/`, `macros_tmpls/`, `theme_overrides/`, `mkdocs.yml`, `Justfile`, `pyproject.toml`, `README.md` (~193 md files)
- `Bazzite/wiki/` — wiki build: `Index.md`, `gemini.md`, `readme.md`, `src/` (~95 md files)
- `Bazzite.zip` — original archive
- `resources/test_specifications.md`, `Wiki Style.md`, `Untitled.base`

## Behavior

1. On trigger, `cd`/open the matching vault path directly — do NOT ask "which folder?".
2. List the folder's contents so the user can pick a file.
3. For COMPSCI courses, prefer `.md` notes over lecture PDFs unless the user asks for slides.
4. If the user says "the vault" without a course, show the vault root listing with all 5 vaults.

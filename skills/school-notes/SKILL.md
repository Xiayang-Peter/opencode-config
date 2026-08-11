---
name: school-notes
description: Knows the exact location and contents of all Peter's school notes, stored as an Obsidian vault-of-vaults under /var/home/peter/Documents/Obsidian_vaults. USE WHEN user says "school notes", "my notes", "compsci 760 notes", "760 notes", "701 notes", "705 notes", "742 notes", "go to notes", "check my notes", "obsidian vault", "open the vault", or mentions any COMPSCI course notes / lecture notes / assignments / pitch. Navigate straight to the matching vault without asking which folder.
---

# School Notes Directory Map

All notes live in one Obsidian vault root: `/var/home/peter/Documents/Obsidian_vaults/`
Each course is its own **nested Obsidian vault** (own `.obsidian/` config). Ignore `.obsidian/`, `copilot/`, `.debris/`, `.directory`, `.megaignore`, `OLD.zip` (117MB backup), `a.zip` (31MB), `.venv` at root.

## Directory map (authoritative, verified 2026-08-11)

> 📐 Each course vault has a **`Style Guide.md`** at its root documenting the `W{week}L{n}` (lecture) / `W{week}R{n}` (reading) naming convention + week-folder structure. Consult it before navigating or adding files.

| Course | Path | Contents |
|---|---|---|
| **COMPSCI 701** (Software Design/Quality) | `Obsidian_vaults/701_vault/` | Assignments, lecture notes + PDFs |
| **COMPSCI 705** (HCI Research Methods) | `Obsidian_vaults/705_vault/COMPSCI 705/` | Weekly notes, readings, PDFs |
| **COMPSCI 742** (Internet Measurements/Web) | `Obsidian_vaults/742_vault/` | Weekly notes, assignments, annotated PDFs |
| **COMPSCI 760** (ML Research Project) | `Obsidian_vaults/760_vault/` | Pitch + weekly adversarial ML lecture notes |
| **Bazzite** (OS docs, not a course) | `Obsidian_vaults/Bazzite_vault/` | Bazzite OS wiki archive |

## What's inside each vault

### 701_vault — COMPSCI 701 (organised **by week**; assignments + daily notes at root)
- Root: `Assignment 1.md` (marking rubric: functionality/OO design/maintainability/report), `Assignment 1 readme.md`, `2026-07-31.md` (daily note)
- **`Week 2/`** — `W2L2 Alterability.pdf`, `W2L3 Testability.md` + `.pdf`
- **`Week 3/`** — `W3L1-2 Naming.md`, `W3L1 Naming.pdf`, `W3L2 Naming Research.pdf`, `Pasted image 20260804095001.png`
- **`Week 4/`** — `W4L1.md`, `W4L1 Guidelines.pdf` (+ `.annot.json`)
- Naming convention: `W{week}L{lecture}` (e.g. `W2L3` = week 2 lecture 3), `W{week}R{n}` for readings

### 705_vault — COMPSCI 705 (notes in `COMPSCI 705/` subfolder, organised **by week**)
- `Wiki Style.md` (note style guide) sits at the `COMPSCI 705/` root
- **`Week 1/`** — `Week 1.md` (Oulasvirta & Hornbæk research problem types: empirical/conceptual/constructive), `Reading 1.md`
- **`Week 2/`** — `Week 2.md`, `Wk2ExperimentDesignX02.pdf`
- **`Week 3/`** — `Week 3.md`, `Week 3 reading.md` (Ioannidis "Why Most Published Research Findings Are False"), `Week 3 reading Ioannidis_(2005)...pdf`, Wikipedia HTML copy, `Week3slides1.pdf`
- **`Week 4/`** — `Week 4 reading.md` (HUB: Stefanidi et al. "Literature Reviews in HCI: A Review of Reviews", CHI '23), parts `Week 4 reading 1 - Overview` → `Week 4 reading 8 - Conclusion and Key Takeaways` (Obsidian-wikilinked cluster), `Week 4 Reading.pdf`

### 742_vault — COMPSCI 742 (organised **by week**)
- Root: `Assignment 1.md`
- **`Week 1/`** — `Week 1.md`
- **`Week 2/`** — `Week 2.md`, `W2L1 Internet Measurements Supplementary.pdf` (+ `.annot.json`), `W2L2 WebWorkloadCharacterization.pdf`

### 760_vault — COMPSCI 760 (organised **by week**; pitch files at root)
- Root: `Pitch Idea.md` — ML-driven CPU scheduling optimizer (SimPy simulation, feature extraction, algorithm choice: SJF/RR/SRTF), `Pitch script.md`
- **`Week 3/`** — adversarial ML: `W3L1 Adversarial Learning.md` + `.pdf`, `W3L1 Pre-lecture Notes.md`, `W3L2 Poisoning Attack.md` + `.pdf`, `W3L3.md`, `W3L3 Adversarial Defenses.pdf`
- **`Week 4/`** — `W4L1.md`, `W4L1-2 SSL.pdf`
- `Images/` — pasted screenshots

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

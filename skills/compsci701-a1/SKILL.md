# COMPSCI 701 Assignment 1 — Kalah Board Game

Project root: `/var/home/peter/Desktop/compsci701-2026-a01-xiayang-peter/`

## Triggers

Any mention of: "701 assignment 1", "701 a1", "compsci 701", "compsci701", "701 assignment", "kalah assignment", "kalah game", "kalah project", "701 kalah" → navigate to this project root and treat the workspace as this project.

## Project Overview

COMPSCI 701 Assignment 1 (2026). A Java implementation of the Kalah board game — clockwise variant, standard rules. Two players, 6 houses each, 4 seeds per house initially. The game uses ASCII console I/O (`stdin`/`stdout`) via the custom `IO` interface (not `System.in`/`System.out`).

## Repository Structure

```
./
├── README.md                          ← Full spec (Kalah rules, test infra, build instructions)
├── Makefile                           ← CI build script (DO NOT MODIFY)
├── src/kalah/
│   ├── Kalah.java                     ← Entry point. `void play(IO)` is what CI calls.
│   ├── Board.java                     ← Board state and pit management
│   ├── GameControl.java               ← Game loop, turn logic, game-over detection
│   ├── House.java                     ← House pit model
│   ├── Store.java                     ← Store pit model
│   ├── Player.java                    ← Player model (P1/P2)
│   ├── MoveProcessor.java             ← Sowing logic, capture detection
│   ├── InputHandler.java              ← Input parsing (house number / 'q')
│   ├── Renderer.java                  ← ASCII board rendering
│   ├── BoardTest.java                 ← Unit tests
│   └── KalahTest.java                 ← (if present)
├── resources/
│   ├── kalahSTC_6_4_SK_H_H_SH.jar     ← Test infrastructure JAR (IO+MockIO+test suite)
│   ├── junit-3.8.2.jar                ← JUnit 3.8
│   ├── IO.html                        ← IO interface docs
│   └── test_specifications/           ← I/O test spec files (*.txt)
├── bin/                               ← Compiled .class output
├── .github/workflows/testkalah.yml    ← CI workflow (DO NOT MODIFY)
└── COMPSCI701-a01-report.md/xlsx       ← Assignment report files
```

## Build & Test Commands

All run from project root.

| Command | What it does |
|---|---|
| `make` or `make tests` | Compile + run all tests via JUnit |
| `make play` | Compile + play interactively |
| `make compile` | Compile only (clean → javac) |
| `make clean` | Remove `bin/` |

**Manual (Linux/macOS)**:
```bash
# Compile
mkdir -p bin
javac -d bin -encoding utf8 -cp resources/junit-3.8.2.jar:resources/kalahSTC_6_4_SK_H_H_SH.jar:bin:src src/kalah/Kalah.java

# Run tests
java -cp resources/junit-3.8.2.jar:resources/kalahSTC_6_4_SK_H_H_SH.jar:bin junit.textui.TestRunner kalah.test.TestKalah

# Play
java -cp resources/junit-3.8.2.jar:resources/kalahSTC_6_4_SK_H_H_SH.jar:bin kalah.Kalah
```

**Windows**: Replace `:` with `;` in classpath.

## Key Architecture

- **`Kalah.java`** — The main class. Contains `public static void main(String[])` for interactive play AND `public void play(IO)` which is the method CI calls for testing.
- **`IO` interface** — Custom I/O abstraction. Use `io.println()`, `io.print()`, `io.readInteger()`, `io.readFromKeyboard()` instead of `System.out`/`System.in`. Crucially: `println()`/`print()` reject embedded newlines — build output line-by-line.
- **Test infra** — `kalahSTC_*.jar` contains `MockIO` which replays test spec files (`<` = input, `>` = expected output, `#` = comment) and throws `TextIOAssertionException` on mismatch.
- **Test specs** live in `resources/test_specifications/` — examine these directly when debugging test failures.

## Kalah Rules Summary

- 6 houses per player, 4 seeds each initially, stores start empty
- P1 bottom row (right-to-left numbering 6..1), P2 top row (left-to-right numbering 1..6)
- P1 store on left, P2 store on right
- Clockwise sowing: pick a house, distribute seeds one-by-one clockwise including own store, skipping opponent's store
- Outcomes: (1) last seed in non-empty house → other player's turn, (2) last seed in own store → extra turn, (3) last seed in own empty house + opponent's opposite house non-empty → capture (both seeds go to store)
- Game ends when current player has no seeds in any house — remaining opponent seeds go to their store. Highest store wins.

## CI / Submission

- CI runs on push to `submission` branch only
- **Develop on `main` or another branch**, merge to `submission` to trigger CI
- Limited number of submission pushes — check assessment guidelines
- DO NOT modify `Makefile`, `.github/workflows/testkalah.yml`, or `resources/*.jar`

## Important Notes

- Whitespace matters: test specs use exact character matching — watch tabs vs spaces
- All output must go through `IO` interface methods (never `System.out`)
- The `play(IO)` method signature is the CI entry point — it MUST be preserved

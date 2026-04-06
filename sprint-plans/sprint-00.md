# Sprint 0 — Layered Architecture & API Contracts

**Goal:** Establish a presentation / business-logic / implementation layered architecture with clear API contracts between layers. No feature work — only structure, interfaces, and wiring.

## Layers

| Layer | Responsibility | Module(s) |
|---|---|---|
| **Presentation** | Canvas rendering, DOM/d-pad events, animation loop | `src/presentation/` |
| **Business Logic** | Game rules, state transitions, win detection | `src/logic/` |
| **Implementation** | Maze generation algorithm, grid data structures | `src/infrastructure/` |

## Bob Martin (4 features)

Focus: layer boundaries, dependency rules, and the business-logic core.

- [ ] **`feature/bm-layer-structure`** — Create the directory skeleton (`src/presentation/`, `src/logic/`, `src/infrastructure/`) and a barrel `index.js` per layer that defines the public API surface. Add a top-level `src/api-contracts.md` documenting which layer may call which (dependency rule: presentation → logic → infrastructure, never the reverse).

- [ ] **`feature/bm-logic-api`** — Define the business-logic layer API. Move `canMove`, `movePlayer`, `isWon`, and `handleKey` into `src/logic/`. Export a single `gameLogic` facade with explicit function signatures and JSDoc contracts. Update existing tests to import from the new path.

- [ ] **`feature/bm-infra-api`** — Define the infrastructure layer API. Move `generateMaze` and `getCell` into `src/infrastructure/`. Export through a barrel with JSDoc contracts specifying input/output shapes (e.g., `Cell = { N: bool, S: bool, E: bool, W: bool }`). Update tests.

- [ ] **`feature/bm-dependency-tests`** — Add architectural guard tests that assert no module in `src/infrastructure/` imports from `src/logic/` or `src/presentation/`, and no module in `src/logic/` imports from `src/presentation/`. These are static analysis tests (grep-based or import-map), not runtime tests.

## Martin Fowler (3 features)

Focus: presentation layer contracts, state management pattern, and integration wiring.

- [ ] **`feature/mf-presentation-api`** — Define the presentation layer API. Move `renderMaze`, `renderPlayer`, and `initGame` into `src/presentation/`. Export through a barrel with JSDoc contracts. `initGame` should accept business-logic and infrastructure dependencies as parameters (dependency injection) rather than importing them directly. Update tests.

- [ ] **`feature/mf-game-state`** — Define a single `GameState` object shape (`{ maze, pos, rows, cols, cellSize, won }`) in `src/logic/state.js`. All layer APIs must accept/return this shape (or subsets of it) rather than ad-hoc positional arguments. Document the shape in `api-contracts.md`. Update function signatures and tests to use it.

- [ ] **`feature/mf-integration-wiring`** — Create `src/main.js` as the composition root. It imports from all three layer barrels, wires dependencies together, and exposes a single `startGame(canvas, config)` entry point. No logic lives here — only assembly. Add an integration test that calls `startGame` with a mock canvas and verifies the full pipeline (maze generated → rendered → player rendered → key handled → state updated).

## Merge order

1. `feature/bm-layer-structure` (skeleton first)
2. `feature/bm-infra-api` and `feature/mf-presentation-api` (parallel, no conflict)
3. `feature/bm-logic-api` (parallel with above)
4. `feature/mf-game-state` (depends on all three layer APIs)
5. `feature/bm-dependency-tests` (after layers populated)
6. `feature/mf-integration-wiring` (last — wires everything)

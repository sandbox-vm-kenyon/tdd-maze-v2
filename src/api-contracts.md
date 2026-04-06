# API Contracts

## Dependency Rule

Dependencies flow in one direction only:

```
presentation → logic → infrastructure
```

A layer may only import from the layer directly below it. Never the reverse —
infrastructure must not import from logic or presentation, and logic must not
import from presentation.

## Layer Responsibilities

| Layer | May import from | Responsibility |
|---|---|---|
| **presentation** | logic | Canvas rendering, DOM/d-pad events, animation loop |
| **logic** | infrastructure | Game rules, state transitions, win detection |
| **infrastructure** | _(none)_ | Maze generation algorithm, grid data structures |

## Public API Surfaces

Each layer exposes its public API through a barrel `index.js`. Consumers must
import only from the barrel — never reach into internal modules.

### presentation (`src/presentation/index.js`)

_To be defined in `feature/martin-fowler-presentation-api`._

### logic (`src/logic/index.js`)

_To be defined in `feature/bob-martin-logic-api`._

### infrastructure (`src/infrastructure/index.js`)

```js
/**
 * Cell — a single grid position with four walls.
 * @typedef {{ N: boolean, S: boolean, E: boolean, W: boolean }} Cell
 * Wall value `true` = wall present, `false` = open passage.
 */

/**
 * getCell() → Cell
 * Returns a new Cell with all walls intact (true).
 */

/**
 * generateMaze(rows: number, cols: number) → Cell[][]
 * Returns a 2-D grid (maze[row][col]) representing a perfect maze.
 * Uses recursive back-tracking. Every cell is reachable; no loops.
 * Boundary (perimeter) walls are always intact.
 */
```

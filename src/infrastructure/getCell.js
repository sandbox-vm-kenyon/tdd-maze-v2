/**
 * Creates a cell object representing a single grid position in the maze.
 *
 * A cell has four walls (N, S, E, W). All walls start intact (true).
 * A wall value of `true` means the wall is present; `false` means open passage.
 *
 * @returns {{ N: boolean, S: boolean, E: boolean, W: boolean }} A new Cell.
 */
function getCell() {
  return { N: true, S: true, E: true, W: true };
}

module.exports = getCell;

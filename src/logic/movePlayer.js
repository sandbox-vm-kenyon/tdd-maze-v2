const canMove = require('./canMove');

/**
 * Direction deltas keyed by wall name.
 * @type {Object<string, { dr: number, dc: number }>}
 */
const DELTA = {
  N: { dr: -1, dc: 0 },
  S: { dr: 1, dc: 0 },
  E: { dr: 0, dc: 1 },
  W: { dr: 0, dc: -1 },
};

/**
 * Attempts to move the player one step in the given direction.
 *
 * Returns a new position object if the move is valid, or the same position
 * if a wall blocks the way.
 *
 * @param {Array<Array<{ N: boolean, S: boolean, E: boolean, W: boolean }>>} maze
 *   The 2-D maze grid.
 * @param {{ row: number, col: number }} pos - Current player position.
 * @param {'N'|'S'|'E'|'W'} direction - Direction to move.
 * @returns {{ row: number, col: number }} The resulting position.
 */
function movePlayer(maze, pos, direction) {
  if (!canMove(maze, pos, direction)) {
    return pos;
  }
  const d = DELTA[direction];
  return { row: pos.row + d.dr, col: pos.col + d.dc };
}

module.exports = movePlayer;

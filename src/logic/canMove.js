/**
 * Checks whether the player can move in the given direction from their
 * current position.
 *
 * @param {Array<Array<{ N: boolean, S: boolean, E: boolean, W: boolean }>>} maze
 *   The 2-D maze grid.
 * @param {{ row: number, col: number }} pos - Current player position.
 * @param {'N'|'S'|'E'|'W'} direction - Direction to check.
 * @returns {boolean} `true` if the wall is open (passage exists).
 */
function canMove(maze, pos, direction) {
  return !maze[pos.row][pos.col][direction];
}

module.exports = canMove;

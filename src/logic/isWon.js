/**
 * Determines whether the player has reached the goal (bottom-right cell).
 *
 * @param {{ row: number, col: number }} pos - Current player position.
 * @param {number} rows - Number of rows in the maze.
 * @param {number} cols - Number of columns in the maze.
 * @returns {boolean} `true` if the player is on the goal cell.
 */
function isWon(pos, rows, cols) {
  return pos.row === rows - 1 && pos.col === cols - 1;
}

module.exports = isWon;

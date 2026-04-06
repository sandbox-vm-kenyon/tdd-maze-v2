const getCell = require('./getCell');

/**
 * Opposite wall lookup — used to open the wall on the neighbour's side.
 * @type {Object<string, string>}
 */
const OPPOSITE = { N: 'S', S: 'N', E: 'W', W: 'E' };

/**
 * Direction vectors keyed by wall name.
 * @type {Object<string, {dr: number, dc: number}>}
 */
const DELTA = {
  N: { dr: -1, dc: 0 },
  S: { dr: 1, dc: 0 },
  E: { dr: 0, dc: 1 },
  W: { dr: 0, dc: -1 },
};

/**
 * Generates a perfect maze using recursive back-tracking (depth-first).
 *
 * Every cell is reachable from every other cell; there are no loops.
 *
 * @param {number} rows — number of rows (must be ≥ 1).
 * @param {number} cols — number of columns (must be ≥ 1).
 * @returns {Array<Array<{ N: boolean, S: boolean, E: boolean, W: boolean }>>}
 *   A 2-D grid (`maze[row][col]`) of Cell objects. A wall value of `false`
 *   means the passage is open in that direction.
 */
function generateMaze(rows, cols) {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => getCell())
  );

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  function carve(r, c) {
    visited[r][c] = true;
    const dirs = shuffle(Object.keys(DELTA));
    for (const dir of dirs) {
      const nr = r + DELTA[dir].dr;
      const nc = c + DELTA[dir].dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
        grid[r][c][dir] = false;
        grid[nr][nc][OPPOSITE[dir]] = false;
        carve(nr, nc);
      }
    }
  }

  carve(0, 0);
  return grid;
}

/**
 * Fisher-Yates shuffle (in-place).
 * @param {Array} arr
 * @returns {Array} The same array, shuffled.
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

module.exports = generateMaze;

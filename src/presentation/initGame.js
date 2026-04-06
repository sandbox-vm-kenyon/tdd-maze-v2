const renderMaze = require('./renderMaze');
const renderPlayer = require('./renderPlayer');

/**
 * Initialise the game on a canvas element.
 *
 * Accepts business-logic and infrastructure dependencies via dependency
 * injection rather than importing them directly, keeping the presentation
 * layer decoupled from concrete implementations.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to render into.
 * @param {Object} deps - Injected layer dependencies.
 * @param {Object} deps.logic - Business-logic layer facade.
 * @param {Function} deps.logic.handleKey - Process a keypress, returns updated state.
 * @param {Function} deps.logic.isWon - Check if the game is won.
 * @param {Object} deps.infrastructure - Infrastructure layer facade.
 * @param {Function} deps.infrastructure.generateMaze - Generate a maze grid.
 * @param {Object} [deps.config] - Optional configuration overrides.
 * @param {number} [deps.config.rows=10] - Number of maze rows.
 * @param {number} [deps.config.cols=10] - Number of maze columns.
 * @param {number} [deps.config.cellSize=30] - Pixel size of each cell.
 * @returns {{ state: Object, render: Function }} The initial game state and a render function.
 */
function initGame(canvas, deps) {
  const { logic, infrastructure } = deps;
  const config = deps.config || {};
  const rows = config.rows || 10;
  const cols = config.cols || 10;
  const cellSize = config.cellSize || 30;

  canvas.width = cols * cellSize;
  canvas.height = rows * cellSize;

  const ctx = canvas.getContext('2d');
  const maze = infrastructure.generateMaze(rows, cols);

  const state = {
    maze,
    pos: { row: 0, col: 0 },
    rows,
    cols,
    cellSize,
    won: false,
  };

  function render() {
    renderMaze(ctx, state.maze, state.rows, state.cols, state.cellSize);
    renderPlayer(ctx, state.pos, state.cellSize);
  }

  render();

  return { state, render };
}

module.exports = initGame;

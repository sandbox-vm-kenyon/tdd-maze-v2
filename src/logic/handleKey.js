const movePlayer = require('./movePlayer');
const isWon = require('./isWon');

/**
 * Map of keyboard key names to maze directions.
 * @type {Object<string, 'N'|'S'|'E'|'W'>}
 */
const KEY_MAP = {
  ArrowUp: 'N',
  ArrowDown: 'S',
  ArrowRight: 'E',
  ArrowLeft: 'W',
  w: 'N',
  s: 'S',
  d: 'E',
  a: 'W',
};

/**
 * Processes a keypress and returns the updated game state.
 *
 * Accepts a game state object and a key string. If the key maps to a valid
 * direction and the move is legal, returns a new state with the updated
 * position and win flag. Otherwise returns the state unchanged.
 *
 * @param {{ maze: Array<Array<Object>>, pos: { row: number, col: number }, rows: number, cols: number, won: boolean }} state
 *   The current game state.
 * @param {string} key - The keyboard key name (e.g. `'ArrowUp'`, `'w'`).
 * @returns {{ maze: Array<Array<Object>>, pos: { row: number, col: number }, rows: number, cols: number, won: boolean }}
 *   The updated game state.
 */
function handleKey(state, key) {
  if (state.won) return state;

  const direction = KEY_MAP[key];
  if (!direction) return state;

  const newPos = movePlayer(state.maze, state.pos, direction);
  if (newPos === state.pos) return state;

  return {
    ...state,
    pos: newPos,
    won: isWon(newPos, state.rows, state.cols),
  };
}

module.exports = handleKey;

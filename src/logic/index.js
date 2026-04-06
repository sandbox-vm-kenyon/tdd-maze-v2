/**
 * Business Logic layer — public API surface.
 *
 * Responsible for: game rules, state transitions, win detection.
 *
 * Dependency rule: logic → infrastructure only. Never imports from presentation.
 *
 * @module logic
 */

const canMove = require('./canMove');
const movePlayer = require('./movePlayer');
const isWon = require('./isWon');
const handleKey = require('./handleKey');

/**
 * Game-logic facade — the single public entry point for the logic layer.
 *
 * @type {{
 *   canMove: Function,
 *   movePlayer: Function,
 *   isWon: Function,
 *   handleKey: Function
 * }}
 */
const gameLogic = { canMove, movePlayer, isWon, handleKey };

module.exports = gameLogic;

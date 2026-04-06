/**
 * Infrastructure layer — public API surface.
 *
 * Responsible for: maze generation algorithm, grid data structures.
 *
 * Dependency rule: infrastructure is the innermost layer. Never imports from
 * logic or presentation.
 */

const getCell = require('./getCell');
const generateMaze = require('./generateMaze');

module.exports = { getCell, generateMaze };

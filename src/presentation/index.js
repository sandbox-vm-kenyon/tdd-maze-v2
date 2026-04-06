/**
 * Presentation layer — public API surface.
 *
 * Responsible for: canvas rendering, DOM/d-pad events, animation loop.
 *
 * Dependency rule: presentation → logic → infrastructure (never the reverse).
 */

const renderMaze = require('./renderMaze');

module.exports = {
  renderMaze,
};

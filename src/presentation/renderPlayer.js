/**
 * Render the player as a filled circle at the given grid position.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {{ row: number, col: number }} pos - Current player position.
 * @param {number} cellSize - Pixel size of each cell.
 */
function renderPlayer(ctx, pos, cellSize) {
  const centerX = pos.col * cellSize + cellSize / 2;
  const centerY = pos.row * cellSize + cellSize / 2;
  const radius = cellSize * 0.3;

  ctx.fillStyle = '#e74c3c';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
}

module.exports = renderPlayer;

/**
 * Render a maze grid onto a canvas 2D context.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {Array<Array<{N: boolean, S: boolean, E: boolean, W: boolean}>>} maze
 *   2D grid of cells. `maze[row][col]` has boolean flags for open passages.
 * @param {number} rows - Number of rows in the maze.
 * @param {number} cols - Number of columns in the maze.
 * @param {number} cellSize - Pixel size of each cell.
 */
function renderMaze(ctx, maze, rows, cols, cellSize) {
  ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = maze[row][col];
      const x = col * cellSize;
      const y = row * cellSize;

      if (!cell.N) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellSize, y);
        ctx.stroke();
      }
      if (!cell.S) {
        ctx.beginPath();
        ctx.moveTo(x, y + cellSize);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.stroke();
      }
      if (!cell.W) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + cellSize);
        ctx.stroke();
      }
      if (!cell.E) {
        ctx.beginPath();
        ctx.moveTo(x + cellSize, y);
        ctx.lineTo(x + cellSize, y + cellSize);
        ctx.stroke();
      }
    }
  }
}

module.exports = renderMaze;

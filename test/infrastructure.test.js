const infrastructure = require('../src/infrastructure');
const { getCell, generateMaze } = infrastructure;

describe('infrastructure barrel', () => {
  test('exports getCell and generateMaze as functions', () => {
    expect(typeof infrastructure.getCell).toBe('function');
    expect(typeof infrastructure.generateMaze).toBe('function');
  });
});

describe('getCell', () => {
  test('returns a Cell with N, S, E, W boolean wall properties, all true by default', () => {
    const cell = getCell();
    expect(cell).toEqual({ N: true, S: true, E: true, W: true });
  });

  test('returns a new object each time (no shared references)', () => {
    const a = getCell();
    const b = getCell();
    expect(a).not.toBe(b);
  });
});

describe('generateMaze', () => {
  test('returns a 2D grid with the requested rows and cols', () => {
    const maze = generateMaze(3, 4);
    expect(maze).toHaveLength(3);
    maze.forEach(row => expect(row).toHaveLength(4));
  });

  test('generates a perfect maze — every cell is reachable from (0,0)', () => {
    const rows = 5, cols = 6;
    const maze = generateMaze(rows, cols);
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const DELTA = { N: [-1, 0], S: [1, 0], E: [0, 1], W: [0, -1] };

    const stack = [[0, 0]];
    visited[0][0] = true;
    let count = 1;
    while (stack.length) {
      const [r, c] = stack.pop();
      for (const [dir, [dr, dc]] of Object.entries(DELTA)) {
        if (!maze[r][c][dir]) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
            visited[nr][nc] = true;
            count++;
            stack.push([nr, nc]);
          }
        }
      }
    }
    expect(count).toBe(rows * cols);
  });

  test('handles a 1×1 maze', () => {
    const maze = generateMaze(1, 1);
    expect(maze).toHaveLength(1);
    expect(maze[0]).toHaveLength(1);
    expect(maze[0][0]).toEqual({ N: true, S: true, E: true, W: true });
  });

  test('boundary walls on the perimeter remain intact', () => {
    const rows = 4, cols = 5;
    const maze = generateMaze(rows, cols);
    for (let c = 0; c < cols; c++) {
      expect(maze[0][c].N).toBe(true);
      expect(maze[rows - 1][c].S).toBe(true);
    }
    for (let r = 0; r < rows; r++) {
      expect(maze[r][0].W).toBe(true);
      expect(maze[r][cols - 1].E).toBe(true);
    }
  });

  test('walls are consistent between adjacent cells', () => {
    const rows = 4, cols = 4;
    const maze = generateMaze(rows, cols);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r + 1 < rows) expect(maze[r][c].S).toBe(maze[r + 1][c].N);
        if (c + 1 < cols) expect(maze[r][c].E).toBe(maze[r][c + 1].W);
      }
    }
  });

  test('every cell has exactly N, S, E, W boolean properties', () => {
    const maze = generateMaze(4, 5);
    for (const row of maze) {
      for (const cell of row) {
        expect(Object.keys(cell).sort()).toEqual(['E', 'N', 'S', 'W']);
        Object.values(cell).forEach(v => expect(typeof v).toBe('boolean'));
      }
    }
  });
});

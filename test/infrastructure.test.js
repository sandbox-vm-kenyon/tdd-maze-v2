const { getCell, generateMaze } = require('../src/infrastructure');

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
});

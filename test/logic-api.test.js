const gameLogic = require('../src/logic');
const { generateMaze } = require('../src/infrastructure');

describe('logic barrel exports', () => {
  test('exports canMove, movePlayer, isWon, handleKey as functions', () => {
    expect(typeof gameLogic.canMove).toBe('function');
    expect(typeof gameLogic.movePlayer).toBe('function');
    expect(typeof gameLogic.isWon).toBe('function');
    expect(typeof gameLogic.handleKey).toBe('function');
  });
});

describe('canMove', () => {
  test('returns true when wall is open', () => {
    const maze = [[{ N: true, S: false, E: true, W: true }]];
    expect(gameLogic.canMove(maze, { row: 0, col: 0 }, 'S')).toBe(true);
  });

  test('returns false when wall is present', () => {
    const maze = [[{ N: true, S: true, E: true, W: true }]];
    expect(gameLogic.canMove(maze, { row: 0, col: 0 }, 'N')).toBe(false);
  });
});

describe('movePlayer', () => {
  test('moves to new position when passage is open', () => {
    const maze = [
      [{ N: true, S: false, E: true, W: true }, { N: true, S: true, E: true, W: true }],
      [{ N: false, S: true, E: true, W: true }, { N: true, S: true, E: true, W: true }],
    ];
    const pos = { row: 0, col: 0 };
    expect(gameLogic.movePlayer(maze, pos, 'S')).toEqual({ row: 1, col: 0 });
  });

  test('returns same position when wall blocks', () => {
    const maze = [[{ N: true, S: true, E: true, W: true }]];
    const pos = { row: 0, col: 0 };
    expect(gameLogic.movePlayer(maze, pos, 'N')).toBe(pos);
  });
});

describe('isWon', () => {
  test('returns true when player is at bottom-right', () => {
    expect(gameLogic.isWon({ row: 2, col: 3 }, 3, 4)).toBe(true);
  });

  test('returns false when player is not at goal', () => {
    expect(gameLogic.isWon({ row: 0, col: 0 }, 3, 4)).toBe(false);
  });
});

describe('handleKey', () => {
  let state;

  beforeEach(() => {
    // 2x2 maze with open passage south from (0,0) and east from (0,0)
    state = {
      maze: [
        [{ N: true, S: false, E: false, W: true }, { N: true, S: true, E: true, W: false }],
        [{ N: false, S: true, E: true, W: true }, { N: true, S: true, E: true, W: true }],
      ],
      pos: { row: 0, col: 0 },
      rows: 2,
      cols: 2,
      won: false,
    };
  });

  test('moves player on valid arrow key', () => {
    const next = gameLogic.handleKey(state, 'ArrowDown');
    expect(next.pos).toEqual({ row: 1, col: 0 });
  });

  test('moves player on WASD key', () => {
    const next = gameLogic.handleKey(state, 'd');
    expect(next.pos).toEqual({ row: 0, col: 1 });
  });

  test('returns same state on unmapped key', () => {
    expect(gameLogic.handleKey(state, 'x')).toBe(state);
  });

  test('returns same state when blocked by wall', () => {
    expect(gameLogic.handleKey(state, 'ArrowUp')).toBe(state);
  });

  test('returns same state when already won', () => {
    state.won = true;
    expect(gameLogic.handleKey(state, 'ArrowDown')).toBe(state);
  });

  test('sets won flag when reaching goal', () => {
    // Open path: (0,0) → S → (1,0), then need E open to (1,1)
    state.maze[1][0].E = false;
    state.maze[1][1].W = false;
    const step1 = gameLogic.handleKey(state, 'ArrowDown');
    const step2 = gameLogic.handleKey(step1, 'ArrowRight');
    expect(step2.pos).toEqual({ row: 1, col: 1 });
    expect(step2.won).toBe(true);
  });
});

describe('integration with generated maze', () => {
  test('canMove agrees with maze walls on a generated maze', () => {
    const maze = generateMaze(5, 5);
    const cell = maze[0][0];
    // canMove should reflect the cell's wall state
    expect(gameLogic.canMove(maze, { row: 0, col: 0 }, 'N')).toBe(!cell.N);
    expect(gameLogic.canMove(maze, { row: 0, col: 0 }, 'S')).toBe(!cell.S);
    expect(gameLogic.canMove(maze, { row: 0, col: 0 }, 'E')).toBe(!cell.E);
    expect(gameLogic.canMove(maze, { row: 0, col: 0 }, 'W')).toBe(!cell.W);
  });
});

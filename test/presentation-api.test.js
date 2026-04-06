const presentation = require('../src/presentation');

describe('presentation layer API', () => {
  describe('renderMaze', () => {
    test('is exported as a function', () => {
      expect(typeof presentation.renderMaze).toBe('function');
    });

    test('draws walls for closed passages and skips open ones', () => {
      const strokes = [];
      const ctx = {
        clearRect: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(() => strokes.push(true)),
        strokeStyle: '',
        lineWidth: 0,
      };

      // 1x1 maze: N open, S closed, E closed, W open
      const maze = [[{ N: true, S: false, E: false, W: true }]];
      presentation.renderMaze(ctx, maze, 1, 1, 20);

      expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 20, 20);
      // S wall + E wall = 2 strokes
      expect(strokes).toHaveLength(2);
    });
  });

  describe('renderPlayer', () => {
    test('is exported as a function', () => {
      expect(typeof presentation.renderPlayer).toBe('function');
    });

    test('draws a circle centered in the correct cell', () => {
      const ctx = {
        fillStyle: '',
        beginPath: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
      };

      presentation.renderPlayer(ctx, { row: 1, col: 2 }, 20);

      expect(ctx.arc).toHaveBeenCalledWith(
        2 * 20 + 10, // centerX
        1 * 20 + 10, // centerY
        6,            // radius = 20 * 0.3
        0,
        Math.PI * 2
      );
      expect(ctx.fill).toHaveBeenCalled();
    });
  });

  describe('initGame', () => {
    test('is exported as a function', () => {
      expect(typeof presentation.initGame).toBe('function');
    });

    function createMockCanvas() {
      const ctx = {
        clearRect: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        arc: jest.fn(),
        fill: jest.fn(),
      };
      return {
        canvas: { width: 0, height: 0, getContext: () => ctx },
        ctx,
      };
    }

    function createMockDeps(maze) {
      return {
        logic: {
          handleKey: jest.fn(),
          isWon: jest.fn(() => false),
        },
        infrastructure: {
          generateMaze: jest.fn(() => maze),
        },
      };
    }

    test('calls generateMaze and sets canvas dimensions', () => {
      const { canvas } = createMockCanvas();
      const maze = [[{ N: true, S: true, E: true, W: true }]];
      const deps = createMockDeps(maze);
      deps.config = { rows: 1, cols: 1, cellSize: 40 };

      presentation.initGame(canvas, deps);

      expect(deps.infrastructure.generateMaze).toHaveBeenCalledWith(1, 1);
      expect(canvas.width).toBe(40);
      expect(canvas.height).toBe(40);
    });

    test('returns state with correct initial values', () => {
      const { canvas } = createMockCanvas();
      const maze = [[{ N: true, S: true, E: true, W: true }]];
      const deps = createMockDeps(maze);
      deps.config = { rows: 1, cols: 1, cellSize: 25 };

      const { state } = presentation.initGame(canvas, deps);

      expect(state).toEqual({
        maze,
        pos: { row: 0, col: 0 },
        rows: 1,
        cols: 1,
        cellSize: 25,
        won: false,
      });
    });

    test('returns a render function that redraws the scene', () => {
      const { canvas, ctx } = createMockCanvas();
      const maze = [[{ N: false, S: false, E: false, W: false }]];
      const deps = createMockDeps(maze);
      deps.config = { rows: 1, cols: 1, cellSize: 20 };

      const { render } = presentation.initGame(canvas, deps);

      // clearRect called once during init render
      expect(ctx.clearRect).toHaveBeenCalledTimes(1);

      render();

      // clearRect called again on re-render
      expect(ctx.clearRect).toHaveBeenCalledTimes(2);
    });

    test('uses default config when none provided', () => {
      const { canvas } = createMockCanvas();
      const maze = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({ N: true, S: true, E: true, W: true }))
      );
      const deps = createMockDeps(maze);

      presentation.initGame(canvas, deps);

      expect(deps.infrastructure.generateMaze).toHaveBeenCalledWith(10, 10);
      expect(canvas.width).toBe(300);
      expect(canvas.height).toBe(300);
    });
  });
});

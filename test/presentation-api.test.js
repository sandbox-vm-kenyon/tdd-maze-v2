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
  });
});

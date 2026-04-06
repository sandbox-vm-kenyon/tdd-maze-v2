const presentation = require('../src/presentation');

describe('presentation layer API', () => {
  describe('renderMaze', () => {
    test('is exported as a function', () => {
      expect(typeof presentation.renderMaze).toBe('function');
    });
  });
});

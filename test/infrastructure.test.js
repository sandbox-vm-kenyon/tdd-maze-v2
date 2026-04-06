const { getCell } = require('../src/infrastructure');

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

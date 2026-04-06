const { getCell } = require('../src/infrastructure');

describe('getCell', () => {
  test('returns a Cell with N, S, E, W boolean wall properties, all true by default', () => {
    const cell = getCell();
    expect(cell).toEqual({ N: true, S: true, E: true, W: true });
  });
});

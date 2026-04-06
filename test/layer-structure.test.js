const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');

describe('Layer structure', () => {
  test('src/presentation/ directory exists', () => {
    expect(fs.existsSync(path.join(srcDir, 'presentation'))).toBe(true);
  });

  test('src/logic/ directory exists', () => {
    expect(fs.existsSync(path.join(srcDir, 'logic'))).toBe(true);
  });

  test('src/infrastructure/ directory exists', () => {
    expect(fs.existsSync(path.join(srcDir, 'infrastructure'))).toBe(true);
  });
});

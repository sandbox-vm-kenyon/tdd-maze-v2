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

  test('src/presentation/index.js barrel exists', () => {
    expect(fs.existsSync(path.join(srcDir, 'presentation', 'index.js'))).toBe(true);
  });

  test('src/logic/index.js barrel exists', () => {
    expect(fs.existsSync(path.join(srcDir, 'logic', 'index.js'))).toBe(true);
  });

  test('src/infrastructure/index.js barrel exists', () => {
    expect(fs.existsSync(path.join(srcDir, 'infrastructure', 'index.js'))).toBe(true);
  });
});

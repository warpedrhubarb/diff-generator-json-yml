// import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const expected = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('basic', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')) === expected)
    .toBe(true);
});

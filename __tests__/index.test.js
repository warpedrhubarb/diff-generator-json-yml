import path from 'path';
import genDiff from '../src/index.js';

const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);

test('basic', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')) === expected)
    .toBe(true);
});

test('basic-yaml', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')) === expected)
    .toBe(true);
});

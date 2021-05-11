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

const expectedPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expectedJson = '[{"name":"common","diffEntryType":"parent","children":[{"name":"follow","diffEntryType":"added","value":false},{"name":"setting1","diffEntryType":"unchanged","value":"Value 1"},{"name":"setting2","diffEntryType":"removed","value":200},{"name":"setting3","diffEntryType":"updated","oldValue":true,"newValue":null},{"name":"setting4","diffEntryType":"added","value":"blah blah"},{"name":"setting5","diffEntryType":"added","value":{"key5":"value5"}},{"name":"setting6","diffEntryType":"parent","children":[{"name":"doge","diffEntryType":"parent","children":[{"name":"wow","diffEntryType":"updated","oldValue":"","newValue":"so much"}]},{"name":"key","diffEntryType":"unchanged","value":"value"},{"name":"ops","diffEntryType":"added","value":"vops"}]}]},{"name":"group1","diffEntryType":"parent","children":[{"name":"baz","diffEntryType":"updated","oldValue":"bas","newValue":"bars"},{"name":"foo","diffEntryType":"unchanged","value":"bar"},{"name":"nest","diffEntryType":"updated","oldValue":{"key":"value"},"newValue":"str"}]},{"name":"group2","diffEntryType":"removed","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","diffEntryType":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

test('basic', () => {
  expect(genDiff('file1.json', 'file2.json') === expected)
    .toBe(true);
});

test('yaml', () => {
  expect(genDiff('file1.yml', 'file2.yml') === expected)
    .toBe(true);
});

test('plain', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain') === expectedPlain)
    .toBe(true);
});

test('json', () => {
  expect(genDiff('file1.json', 'file2.json', 'json') === expectedJson)
    .toBe(true);
});

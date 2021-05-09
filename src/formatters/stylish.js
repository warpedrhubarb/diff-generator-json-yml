import _ from 'lodash';

const indentDepth = (depth) => '    '.repeat(depth);
const indentPlus = '  + ';
const indentMinus = '  - ';
const indentEmpty = '    ';

const valueFormatter = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const formattedValue = keys.map((key) => `${indentDepth(depth + 2)}${key}: ${valueFormatter(value[key], depth + 1)}`);
  return `{\n${formattedValue.join('\n')}\n${indentDepth(depth + 1)}}`;
};

const stylish = (diff, depth = 0) => {
  const formattedDiff = diff.map((object) => {
    switch (object.diffEntryType) {
      case 'added':
        return `${indentDepth(depth)}${indentPlus}${object.name}: ${valueFormatter(object.value, depth)}`;
      case 'deleted':
        return `${indentDepth(depth)}${indentMinus}${object.name}: ${valueFormatter(object.value, depth)}`;
      case 'unchanged':
        return `${indentDepth(depth)}${indentEmpty}${object.name}: ${valueFormatter(object.value, depth)}`;
      case 'updated':
        return `${indentDepth(depth)}${indentMinus}${object.name}: ${valueFormatter(object.oldValue, depth)}\n`
          + `${indentDepth(depth)}${indentPlus}${object.name}: ${valueFormatter(object.newValue, depth)}`;
      case 'parent':
        return `${indentDepth(depth)}${indentEmpty}${object.name}: ${stylish(object.children, depth + 1)}`;
      default:
        throw new Error(`"${object.diffEntryType}" type is not supported by the formatter.`);
    }
  });
  return `{\n${formattedDiff.join('\n')}\n${indentDepth(depth)}}`;
};

export default stylish;

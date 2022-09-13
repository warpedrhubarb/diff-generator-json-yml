import getObject from './getObject.js';
import parse from './parsers.js';
import buildAst from './buildAst.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const firstObject = parse(getObject(filepath1));
  const secondObject = parse(getObject(filepath2));

  const diff = buildAst(firstObject, secondObject);
  return format(diff, formatName);
};

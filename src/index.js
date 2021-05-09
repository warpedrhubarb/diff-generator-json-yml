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

//   const objCompare = Object.entries(firstObject).reduce((acc, [key, value]) => {
//     const hasKey = _.has(secondObject, key);
//     if (hasKey) {
//       return (value === secondObject[key]
//         ? [...acc, `    ${key}: ${value}`]
//         : [...acc, `  - ${key}: ${value}`, `  + ${key}: ${secondObject[key]}`]
//       );
//     }
//     return [...acc, `  - ${key}: ${value}`];
//   }, []);
//
//   const result = Object.entries(secondObject).reduce((acc, [key, value]) => {
//     const hasKey = _.has(firstObject, key);
//     if (!hasKey) {
//       return [...acc, `  + ${key}: ${value}`];
//     }
//     return acc;
//   }, objCompare);
//
//   return `{\n${result.join('\n')}\n}`;
// };

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const filePathOne = path.resolve(process.cwd(), '__fixtures__', filepath1);
  const filePathTwo = path.resolve(process.cwd(), '__fixtures__', filepath2);
  const firstObject = JSON.parse(fs.readFileSync(filePathOne));
  const secondObject = JSON.parse(fs.readFileSync(filePathTwo));

  const objCompare = Object.entries(firstObject).reduce((acc, [key, value]) => {
    const hasKey = _.has(secondObject, key);
    if (hasKey) {
      return (value === secondObject[key]
        ? [...acc, `    ${key}: ${value}`]
        : [...acc, `  - ${key}: ${value}`, `  + ${key}: ${secondObject[key]}`]
      );
    }
    return [...acc, `  - ${key}: ${value}`];
  }, []);

  const result = Object.entries(secondObject).reduce((acc, [key, value]) => {
    const hasKey = _.has(firstObject, key);
    if (!hasKey) {
      return [...acc, `  + ${key}: ${value}`];
    }
    return acc;
  }, objCompare);

  return `{\n${result.join('\n')}\n}`;
};

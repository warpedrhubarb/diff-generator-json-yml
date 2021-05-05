import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const filePathOne = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const filePathTwo = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  const firstObject = JSON.parse(filePathOne);
  const secondObject = JSON.parse(filePathTwo);

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

import _ from 'lodash';
import getDataAndFormat from "./getDataAndFormat.js";
import parse from "./parsers.js"

export default (filepath1, filepath2) => {

  const [firstObjData, firstObjType] = getDataAndFormat(filepath1);
  const [secondObjData, secondObjType] = getDataAndFormat(filepath2);

  const firstObject = parse(firstObjType)(firstObjData);
  const secondObject = parse(secondObjType)(secondObjData);



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

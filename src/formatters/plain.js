import _ from 'lodash';

const valueFormatter = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : `${value}`;
};

const plain = (diff, path = []) => {
  const formattedDiff = diff.map((object) => {
    const pathParts = [...path, object.name];
    const fullPath = pathParts.join('.');
    switch (object.diffEntryType) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${valueFormatter(object.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'unchanged':
        return null;
      case 'updated':
        return `Property '${fullPath}' was updated. From ${valueFormatter(object.oldValue)}`
          + ` to ${valueFormatter(object.newValue)}`;
      case 'parent':
        return `${plain(object.children, pathParts)}`;
      default:
        throw new Error(`"${object.diffEntryType}" type is not supported by the formatter.`);
    }
  }).filter((object) => object !== null);

  return `${formattedDiff.join('\n')}`;
};

export default plain;

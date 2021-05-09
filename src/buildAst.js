import _ from 'lodash';

const buildAst = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  return _.sortBy(_.union(keys1, keys2)).map((key) => {
    if (!_.has(object1, key)) {
      return {
        name: key, diffEntryType: 'added', value: object2[key],
      };
    }
    if (!_.has(object2, key)) {
      return {
        name: key, diffEntryType: 'deleted', value: object1[key],
      };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return {
        name: key, diffEntryType: 'parent', children: buildAst(object1[key], object2[key]),
      };
    }
    if (!_.isEqual(object1[key], object2[key])) {
      return {
        name: key, diffEntryType: 'updated', oldValue: object1[key], newValue: object2[key],
      };
    }
    return {
      name: key, diffEntryType: 'unchanged', value: object1[key],
    };
  });
};

export default buildAst;

import yaml from 'js-yaml';

const mapping = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};

export default ([data, format]) => mapping[format](data);

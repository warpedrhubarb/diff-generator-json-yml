import yaml from 'js-yaml';

export default (format) => {
  if (format === '.json') {
    return JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    return yaml.safeLoad;
  }
}



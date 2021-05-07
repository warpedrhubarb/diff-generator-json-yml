import yaml from 'js-yaml';

const mapping = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};

export default ([data, format]) => mapping[format](data);

// export default ([data, format]) => {
//   let parse;
//   if (format === '.json') {
//     parse = JSON.parse;
//   }
//   if (format === '.yml' || format === '.yaml') {
//     parse = yaml.safeLoad;
//   }
//   return parse(data);
// };

import stylish from './stylish.js';

const formatters = {
  stylish,
};

export default (diff, formatName) => formatters[formatName](diff);

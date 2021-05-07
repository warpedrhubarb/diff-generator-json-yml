import path from 'path';
import fs from 'fs';

export default (config) => {
  const format = path.extname(config);
  const filepath = path.resolve(process.cwd(), '__fixtures__', config);
  const data = fs.readFileSync(filepath, 'utf8');
  return [data, format];
};

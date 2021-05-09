import path from 'path';
import fs from 'fs';

export default (filepath) => {
  const format = path.extname(filepath);
  const fullPath = path.resolve(process.cwd(), '__fixtures__', filepath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return [data, format];
};

#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two JSON or YAML files and shows a difference.')
  .version('0.1.0', '-V, --version', 'output version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2, program.opts().format));
    },
  );

program.parse();

#!/usr/bin/env ts-node

import { program } from 'commander';
import { argv } from 'node:process';
import { handleES } from '../src';
import packageJson from '../package.json';
program.version(packageJson.version).description('lint diff code by cli');

program
  .command('es')
  .option('--fix', 'eslint autofix')
  .description(` lint js or ts by eslint`)
  .action((options) => {
    handleES({
      fix: Boolean(options.fix),
    });
  });

program.parse(argv);

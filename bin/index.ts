#!/usr/bin/env ts-node

import { handleES } from '@/index';
import { program } from 'commander';
import { argv } from 'node:process';
import packageJson from '../package.json';
program.version(packageJson.version).description('lint diff code by cli');

program
  .command('es')
  .option('--fix', 'eslint autofix')
  .option('-b --branch [branchName]', 'diff [branchName] width current branch')
  .description(` lint js or ts by eslint`)
  .action((options) => {
    handleES({
      fix: Boolean(options.fix),
      branchName: String(options.branch),
    });
  });

program.parse(argv);

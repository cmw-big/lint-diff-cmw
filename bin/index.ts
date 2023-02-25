#!/usr/bin/env ts-node

import { handleES, handleTS } from '@/index';
import { program } from 'commander';
import { argv } from 'node:process';
import packageJson from '../package.json';
program.version(packageJson.version).description('lint diff code by cli');

/**
 * 公共的选项
 */
program.option('-b --branch [branchName]', 'diff [branchName] width current branch')
/**
 * eslint
 */
program
  .command('es')
  .option('--fix', 'eslint autofix')
  .description(`lint js or ts by eslint`)
  .action((options) => {
    handleES({
      fix: Boolean(options.fix),
      branchName: String(options.branch),
    });
  });

/**
 * tsc
 */
program
  .command('type')
  .description('typeCheck diff files')
  .action((options) => {
    handleTS({
      branchName: String(options.branch),
    });
  });

program.parse(argv);

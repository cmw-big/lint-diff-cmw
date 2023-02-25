#!/usr/bin/env ts-node

import { program } from 'commander';
import { argv } from 'node:process';
import { handleES, handleTS } from '../src';
import packageJson from '../package.json';

program.version(packageJson.version).description('lint diff code by cli');

/**
 * 公共的选项
 */
program.option(
  '-b --branch [branchName]',
  'diff [branchName] width current branch',
);
/**
 * eslint
 */
program
  .command('es')
  .option('--fix', 'eslint autofix')
  .description(`lint js or ts by eslint`)
  .action((options) => {
    const { branch } = program.opts();
    handleES({
      fix: Boolean(options.fix),
      branchName: branch,
    });
  });

/**
 * tsc
 */
program
  .command('type')
  .description('typeCheck diff files')
  .action((options) => {
    const { branch } = program.opts();
    handleTS({
      branchName: branch,
    });
  });

program.parse(argv);

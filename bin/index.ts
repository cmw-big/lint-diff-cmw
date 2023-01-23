#!/usr/bin/env node

import { program } from 'commander';
import { argv } from 'node:process';
import { handleES } from '../src'
program.version('0.01').description('lint diff code by cli');

program
  .command('es')
  .description(
    ` lint js or ts by eslint`,
  )
  .action(() => {
    handleES()
  });

program.parse(argv);

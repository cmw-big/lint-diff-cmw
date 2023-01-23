#!/usr/bin/env ts-node

import { program } from 'commander';
import { argv } from 'node:process';
import { handleES } from '../src'
import packageJson from '../package.json'
program.version(packageJson.version).description('lint diff code by cli');

program
  .command('es')
  .description(
    ` lint js or ts by eslint`,
  )
  .action(() => {
    handleES()
  });

program.parse(argv);

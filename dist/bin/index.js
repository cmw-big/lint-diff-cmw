#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const node_process_1 = require("node:process");
const src_1 = require("../src");
commander_1.program.version('0.01').description('lint diff code by cli');
commander_1.program
    .command('es')
    .description(` lint js or ts by eslint`)
    .action(() => {
    (0, src_1.handleES)();
});
commander_1.program.parse(node_process_1.argv);
//# sourceMappingURL=index.js.map
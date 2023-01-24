#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = require("commander");
const node_process_1 = require("node:process");
const src_1 = require("../src");
const package_json_1 = tslib_1.__importDefault(require("../package.json"));
commander_1.program.version(package_json_1.default.version).description('lint diff code by cli');
commander_1.program
    .command('es')
    .option('--fix', 'eslint autofix')
    .option('-b --branch [branchName]', 'diff [branchName] width current branch')
    .description(` lint js or ts by eslint`)
    .action((options) => {
    (0, src_1.handleES)({
        fix: Boolean(options.fix),
        branchName: String(options.branch),
    });
});
commander_1.program.parse(node_process_1.argv);
//# sourceMappingURL=index.js.map
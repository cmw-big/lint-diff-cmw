#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = require("commander");
const node_process_1 = require("node:process");
const src_1 = require("../src");
const package_json_1 = tslib_1.__importDefault(require("../package.json"));
commander_1.program.version(package_json_1.default.version).description('lint diff code by cli');
/**
 * 公共的选项
 */
commander_1.program.option('-b --branch [branchName]', 'diff [branchName] width current branch');
/**
 * eslint
 */
commander_1.program
    .command('es')
    .option('--fix', 'eslint autofix')
    .description(`lint js or ts by eslint`)
    .action((options) => {
    const { branch } = commander_1.program.opts();
    (0, src_1.handleES)({
        fix: Boolean(options.fix),
        branchName: String(branch),
    });
});
/**
 * tsc
 */
commander_1.program
    .command('type')
    .description('typeCheck diff files')
    .action((options) => {
    const { branch } = commander_1.program.opts();
    (0, src_1.handleTS)({
        branchName: String(branch),
    });
});
commander_1.program.parse(node_process_1.argv);
//# sourceMappingURL=index.js.map
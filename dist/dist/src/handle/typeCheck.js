"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCheck = void 0;
const tslib_1 = require("tslib");
/**
 * @file 类型检查ts文件
 */
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
const strip_json_comments_1 = tslib_1.__importDefault(require("strip-json-comments"));
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const typeCheck = (fileList, options) => {
    let tsconfig = '';
    try {
        tsconfig = (0, node_fs_1.readFileSync)((0, node_path_1.resolve)((0, node_process_1.cwd)(), 'tsconfig.json'), 'utf-8');
    }
    catch (error) {
        console.log('项目缺少tsconfig.json文件');
    }
    const jsonTsconfig = JSON.parse((0, strip_json_comments_1.default)(tsconfig));
    // 将tsconfig转化为createProgram需要的
    const { options: programOptions, errors } = typescript_1.default.convertCompilerOptionsFromJson(jsonTsconfig.compilerOptions || {}, process.cwd());
    if (errors.length) {
        console.error("Error: Couldn't parse compiler options");
        console.error(errors);
        return;
    }
    const program = typescript_1.default.createProgram({
        options: programOptions,
        rootNames: [...(fileList ?? [])],
    });
    // 创建输出结果
    const emitResult = program.emit();
    // 表示是否有错误发生，没有生成js代码
    if (emitResult.emitSkipped) {
        const allDiagnostics = typescript_1.default
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);
        allDiagnostics.forEach((diagnostic) => {
            if (diagnostic.file) {
                const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                const message = typescript_1.default.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            }
            else {
                console.log(typescript_1.default.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
            }
        });
        let exitCode = emitResult.emitSkipped ? 1 : 0;
        console.log(`Process exiting with code '${exitCode}'.`);
        process.exit(exitCode);
    }
};
exports.typeCheck = typeCheck;
//# sourceMappingURL=typeCheck.js.map
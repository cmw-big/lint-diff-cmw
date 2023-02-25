"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCheck = void 0;
const tslib_1 = require("tslib");
/**
 * @file 类型检查ts文件
 */
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
const strip_json_comments_1 = tslib_1.__importDefault(require("strip-json-comments"));
const typeCheck = (fileList, options) => {
    const tsconfig = (0, node_fs_1.readFileSync)((0, node_path_1.resolve)((0, node_process_1.cwd)(), 'tsconfig.json'), 'utf-8');
    const jsonTsconfig = JSON.parse((0, strip_json_comments_1.default)(tsconfig));
    console.log(fileList);
    fileList?.forEach((file) => {
        // 开始进行文件的类型检查
        try {
            // 读取 TypeScript 代码
            const code = (0, node_fs_1.readFileSync)(`${file}`, 'utf-8');
            typescript_1.default.transpileModule(code, {
                compilerOptions: jsonTsconfig.compilerOptions,
            });
        }
        catch (error) {
            console.log(error, 'error');
        }
    });
};
exports.typeCheck = typeCheck;
//# sourceMappingURL=typeCheck.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintFileList = void 0;
const node_child_process_1 = require("node:child_process");
const node_process_1 = require("node:process");
/**
 * 使用eslint的规则
 */
function eslintFileList(fileList) {
    if (!fileList?.length) {
        return;
    }
    console.log('eslint start...');
    console.time('eslint time');
    fileList?.forEach((file) => {
        try {
            const eslintRes = (0, node_child_process_1.execSync)(`pnpm exec eslint --color ${file}`, {
                cwd: (0, node_process_1.cwd)(),
            }).toString();
            console.log(eslintRes);
        }
        catch (error) {
            console.log(error.stdout.toString());
        }
    });
    console.timeEnd('eslint time');
    console.log('eslint end...');
}
exports.eslintFileList = eslintFileList;
//# sourceMappingURL=lintES.js.map
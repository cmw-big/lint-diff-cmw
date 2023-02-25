"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintFileList = void 0;
const eslint_1 = require("eslint");
/**
 * 使用eslint的规则
 */
async function eslintFileList(fileList, options) {
    if (!fileList?.length) {
        return;
    }
    console.log('eslint start...');
    console.time('eslint time');
    const eslint = new eslint_1.ESLint(options);
    for (let i = 0; i < fileList.length; i++) {
        try {
            const results = await eslint.lintFiles(fileList[i]);
            if (options?.fix) {
                await eslint_1.ESLint.outputFixes(results);
            }
            const formatter = await eslint.loadFormatter('stylish');
            const resultText = formatter.format(results);
            resultText && console.log(resultText);
        }
        catch (error) {
            process.exitCode = 1;
            console.error(error);
        }
    }
    console.timeEnd('eslint time');
    console.log('eslint end...');
}
exports.eslintFileList = eslintFileList;
//# sourceMappingURL=lintES.js.map
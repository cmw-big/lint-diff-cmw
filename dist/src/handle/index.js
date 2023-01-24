"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleES = void 0;
const lintES_1 = require("../lintES");
const utils_1 = require("../utils");
function handleES(options) {
    const { branchName } = options ?? {};
    delete options?.branchName;
    (0, lintES_1.eslintFileList)((0, utils_1.diffAllFileList)(branchName, ['.ts', '.js', '.tsx', '.jsx']), options);
}
exports.handleES = handleES;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTS = exports.handleES = void 0;
const lintES_1 = require("./lintES");
const diffAllFileList_1 = require("../utils/diffAllFileList");
const typeCheck_1 = require("./typeCheck");
function handleES(options) {
    const { branchName } = options ?? {};
    delete options?.branchName;
    (0, lintES_1.eslintFileList)((0, diffAllFileList_1.diffAllFileList)(branchName, ['.ts', '.js', '.tsx', '.jsx']), options);
}
exports.handleES = handleES;
function handleTS(options) {
    const { branchName } = options ?? {};
    (0, typeCheck_1.typeCheck)((0, diffAllFileList_1.diffAllFileList)(branchName, ['.ts', '.js', '.tsx', '.jsx']));
}
exports.handleTS = handleTS;
//# sourceMappingURL=index.js.map
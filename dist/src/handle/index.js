"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleES = void 0;
const lintES_1 = require("../lintES");
const utils_1 = require("../utils");
function handleES(options) {
    (0, lintES_1.eslintFileList)((0, utils_1.diffAllFileList)(options?.branchName, ['.ts', '.js', '.tsx', '.jsx']), options);
}
exports.handleES = handleES;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleES = void 0;
const lintES_1 = require("../lintES");
const utils_1 = require("../utils");
function handleES() {
    (0, lintES_1.eslintFileList)((0, utils_1.diffAllFileList)(['.ts', '.js', '.tsx', '.jsx']));
}
exports.handleES = handleES;
//# sourceMappingURL=index.js.map
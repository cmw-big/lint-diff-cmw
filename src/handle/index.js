"use strict";
exports.__esModule = true;
exports.handleTS = exports.handleES = void 0;
var lintES_1 = require("./lintES");
var diffAllFileList_1 = require("../utils/diffAllFileList");
var typeCheck_1 = require("./typeCheck");
function handleES(options) {
    var branchName = (options !== null && options !== void 0 ? options : {}).branchName;
    options === null || options === void 0 ? true : delete options.branchName;
    (0, lintES_1.eslintFileList)((0, diffAllFileList_1.diffAllFileList)(branchName, ['.ts', '.js', '.tsx', '.jsx']), options);
}
exports.handleES = handleES;
function handleTS(options) {
    var branchName = (options !== null && options !== void 0 ? options : {}).branchName;
    (0, typeCheck_1.typeCheck)((0, diffAllFileList_1.diffAllFileList)(branchName, ['.ts', '.js', '.tsx', '.jsx']));
}
exports.handleTS = handleTS;
// const a:number = ""

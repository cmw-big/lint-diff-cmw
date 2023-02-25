"use strict";
exports.__esModule = true;
exports.diffAllFileList = void 0;
var node_child_process_1 = require("node:child_process");
var node_os_1 = require("node:os");
var node_path_1 = require("node:path");
/**
 * 找到想要的后缀所有的git diff的文件
 */
function diffAllFileList(branchName, extList) {
    if (branchName === void 0) { branchName = 'master'; }
    try {
        var res = (0, node_child_process_1.execSync)("git rev-parse ".concat(branchName, " && git rev-parse HEAD")).toString();
        var diffList = res.split(node_os_1.EOL).filter(Boolean);
        if (diffList.length <= 1) {
            return [];
        }
        // 比较当前已经暂存但尚未提交的更改。
        var diffFileListStr = (0, node_child_process_1.execSync)("git diff ".concat(diffList[0], " ").concat(diffList[1], " --name-only --diff-filter=ACMRT")).toString();
        var diffFileList = diffFileListStr.split(node_os_1.EOL).filter(Boolean);
        if (!(extList === null || extList === void 0 ? void 0 : extList.length)) {
            return diffFileList;
        }
        return diffFileList
            .map(function (item) {
            if (extList === null || extList === void 0 ? void 0 : extList.includes((0, node_path_1.extname)(item))) {
                return item;
            }
            return null;
        })
            .filter(Boolean);
    }
    catch (error) {
        console.log(error.stdout.toString());
        return [];
    }
}
exports.diffAllFileList = diffAllFileList;

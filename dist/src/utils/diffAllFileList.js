"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffAllFileList = void 0;
const node_child_process_1 = require("node:child_process");
const node_os_1 = require("node:os");
const node_path_1 = require("node:path");
/**
 * 找到想要的后缀所有的git diff的文件
 */
function diffAllFileList(branchName = 'master', extList) {
    try {
        const res = (0, node_child_process_1.execSync)(`git rev-parse ${branchName} && git rev-parse HEAD`).toString();
        const diffList = res.split(node_os_1.EOL).filter(Boolean);
        if (diffList.length <= 1) {
            return [];
        }
        // 比较当前已经暂存但尚未提交的更改。
        const diffFileListStr = (0, node_child_process_1.execSync)(`git diff ${diffList[0]} ${diffList[1]} --name-only`).toString();
        const diffFileList = diffFileListStr.split(node_os_1.EOL).filter(Boolean);
        if (!extList?.length) {
            return diffFileList;
        }
        return diffFileList
            .map((item) => {
            if (extList?.includes((0, node_path_1.extname)(item))) {
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
//# sourceMappingURL=diffAllFileList.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // 将bin的第一行变成node
const node_fs_1 = require("node:fs");
const node_os_1 = require("node:os");
const node_path_1 = require("node:path");
const node_process_1 = require("node:process");
function replaceTsNode2Node() {
    const outDirPath = (0, node_path_1.resolve)((0, node_process_1.cwd)(), (0, node_path_1.join)('./', 'dist/bin/index.js'));
    const res = (0, node_fs_1.readFileSync)(outDirPath);
    const resultFileStr = res.toString();
    if (resultFileStr.includes('#!/usr/bin/env')) {
        const fileResList = resultFileStr.split(node_os_1.EOL);
        fileResList[0] = fileResList[0].replace('ts-node', 'node');
        (0, node_fs_1.writeFileSync)(outDirPath, fileResList.join(node_os_1.EOL));
    }
}
replaceTsNode2Node();
//# sourceMappingURL=handleFile.js.map
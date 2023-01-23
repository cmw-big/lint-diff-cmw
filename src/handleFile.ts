// // 将bin的第一行变成node
import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join, resolve } from 'node:path';
import { cwd } from 'node:process';

function replaceTsNode2Node() {
  const outDirPath = resolve(cwd(), join('./', 'dist/bin/index.js'));
  const res = readFileSync(outDirPath);
  const resultFileStr = res.toString();
  if (resultFileStr.includes('#!/usr/bin/env')) {
    const fileResList = resultFileStr.split(EOL);
    fileResList[0] = fileResList[0].replace('ts-node', 'node');
    writeFileSync(outDirPath, fileResList.join(EOL));
  }
}
replaceTsNode2Node();

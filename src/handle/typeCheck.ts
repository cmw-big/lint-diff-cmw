/**
 * @file 类型检查ts文件
 */
import ts from 'typescript';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import stripJsonComments from 'strip-json-comments';
export const typeCheck = (fileList?: string[], options?: any) => {
  const tsconfig = readFileSync(resolve(cwd(), 'tsconfig.json'), 'utf-8');
  const jsonTsconfig = JSON.parse(stripJsonComments(tsconfig));
  console.log(fileList);
  fileList?.forEach((file) => {
    // 开始进行文件的类型检查
    try {
      // 读取 TypeScript 代码
      const code = readFileSync(`${file}`, 'utf-8');
      ts.transpileModule(code, {
        compilerOptions: jsonTsconfig.compilerOptions,
      });
    } catch (error: unknown) {
      console.log(error, 'error');
    }
  });
};

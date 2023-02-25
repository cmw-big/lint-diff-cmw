/**
 * @file 类型检查ts文件
 */

import { execSync } from 'node:child_process';

export const typeCheck = (fileList?: string[], options?: any) => {
  fileList?.forEach((file) => {
    // 开始进行文件的类型检查
    try {
      const result = execSync(`tsc ${file} --noEmit`).toString();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
};

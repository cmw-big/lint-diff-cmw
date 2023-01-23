import { execSync, type SpawnSyncReturns } from "node:child_process";
import { EOL } from "node:os";
import { extname } from "node:path";

/**
 * 找到想要的后缀所有的git diff的文件
 */
export function diffAllFileList(extList?: string[]) {
    try {
      const res = execSync(
        'git rev-parse master && git rev-parse HEAD',
      ).toString();

      const diffList = res.split(EOL).filter(Boolean);
      if (diffList.length <= 1) {
        return [];
      }
      const diffFileListStr = execSync(
        `git diff ${diffList[0]} ${diffList[1]} --name-only`,
      ).toString();
      const diffFileList = diffFileListStr.split(EOL).filter(Boolean);
      if (!extList?.length) {
        return diffFileList;
      }
      return diffFileList
        .map((item) => {
          if (extList?.includes(extname(item))) {
            return item;
          }
          return null;
        })
        .filter(Boolean) as string[];
    } catch (error: unknown) {
      console.log((error as SpawnSyncReturns<Buffer>).stdout.toString());
      return [];
    }
  }
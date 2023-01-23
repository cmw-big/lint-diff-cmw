import { type SpawnSyncReturns, execSync } from 'node:child_process';
import { cwd } from 'node:process';

/**
 * 使用eslint的规则
 */
export function eslintFileList(fileList?: string[]) {
  if (!fileList?.length) {
    return;
  }
  console.log('eslint start...');
  console.time('eslint time');
  fileList?.forEach((file) => {
    try {
      const eslintRes = execSync(`pnpm exec eslint --color ${file}`, {
        cwd: cwd(),
      }).toString();
      console.log(eslintRes);
    } catch (error: unknown) {
      console.log((error as SpawnSyncReturns<Buffer>).stdout.toString());
    }
  });
  console.timeEnd('eslint time');
  console.log('eslint end...');
}

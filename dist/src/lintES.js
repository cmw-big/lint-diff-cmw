import { execSync } from 'node:child_process';
import { cwd } from 'node:process';
/**
 * 使用eslint的规则
 */
export function eslintFileList(fileList) {
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
        }
        catch (error) {
            console.log(error.stdout.toString());
        }
    });
    console.timeEnd('eslint time');
    console.log('eslint end...');
}
//# sourceMappingURL=lintES.js.map
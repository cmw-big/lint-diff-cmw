import { ESLint } from 'eslint';
/**
 * 使用eslint的规则
 */
export async function eslintFileList(fileList?: string[], options?: ESLint.Options) {
  if (!fileList?.length) {
    return;
  }
  console.log('eslint start...');
  console.time('eslint time');
  const eslint = new ESLint(options);
  for (let i = 0; i < fileList.length; i++) {
    try {
      const results = await eslint.lintFiles(fileList[i]);
      if (options?.fix) {
        await ESLint.outputFixes(results);
      }
      const formatter = await eslint.loadFormatter('stylish');
      const resultText = formatter.format(results);
      resultText && console.log(resultText);
    } catch (error: unknown) {
      process.exitCode = 1;
      console.error(error);
    }
  }
  console.timeEnd('eslint time');
  console.log('eslint end...');
}

import { ESLint } from 'eslint';
/**
 * 使用eslint的规则
 */
export function eslintFileList(fileList?: string[], options?: ESLint.Options) {
  if (!fileList?.length) {
    return;
  }
  console.log('eslint start...');
  console.time('eslint time');
  const eslint = new ESLint(options);
  fileList?.forEach(async (file) => {
    try {
      const results = await eslint.lintFiles(file);
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
  });
  console.timeEnd('eslint time');
  console.log('eslint end...');
}

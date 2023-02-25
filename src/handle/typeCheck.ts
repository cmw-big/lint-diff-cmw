/**
 * @file 类型检查ts文件
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import stripJsonComments from 'strip-json-comments';
import ts from 'typescript';
export const typeCheck = (fileList?: string[], options?: any) => {
  let tsconfig = '';
  try {
    tsconfig = readFileSync(resolve(cwd(), 'tsconfig.json'), 'utf-8');
  } catch (error) {
    console.log('项目缺少tsconfig.json文件');
  }
  const jsonTsconfig = JSON.parse(stripJsonComments(tsconfig));
  // 将tsconfig转化为createProgram需要的
  const { options: programOptions, errors } = ts.convertCompilerOptionsFromJson(
    {
      ...(jsonTsconfig.compilerOptions ?? {}),
      noEmit: true,
      incremental: false,
      composite: false,
    } || {
      noEmit: true,
      incremental: false,
    },
    process.cwd(),
  );
  if (errors.length) {
    console.error("Error: Couldn't parse compiler options");
    console.error(errors);
    return;
  }
  const program = ts.createProgram({
    options: programOptions,
    rootNames: [...(fileList ?? [])],
  });
  // 创建输出结果
  const emitResult = program.emit();
  // 表示是否有错误发生，没有生成js代码
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: (path) => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
  };
  const message = ts.formatDiagnosticsWithColorAndContext(
    allDiagnostics,
    formatHost,
  );
  console.error(message);
  console.log(
    `Found ${allDiagnostics?.length} errors in ${fileList?.length} files.`,
  );
  if (emitResult.emitSkipped) {
    throw new Error(message);
  } else if (allDiagnostics.length > 0) {
    process.exit(1);
  } else {
    console.log('TypeScript compilation successful!');
  }
};

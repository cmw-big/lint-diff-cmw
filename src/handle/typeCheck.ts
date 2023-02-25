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
    { ...(jsonTsconfig.compilerOptions ?? {}), noEmit: true } || {
      noEmit: true,
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
  console.log(emitResult, 'result');
  // 表示是否有错误发生，没有生成js代码
  if (emitResult.emitSkipped) {
    const allDiagnostics = ts
      .getPreEmitDiagnostics(program)
      .concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic) => {
      if (diagnostic.file) {
        const { line, character } =
          diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        const message = ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          '\n',
        );
        console.log(
          `${diagnostic.file.fileName} (${line + 1},${
            character + 1
          }): ${message}`,
        );
      } else {
        console.log(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
        );
      }
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
  }
};

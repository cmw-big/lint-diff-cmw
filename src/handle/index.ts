import { type ESLint } from 'eslint';
import { eslintFileList } from './lintES';
import { diffAllFileList } from '../utils/diffAllFileList';
import { typeCheck } from './typeCheck';

/**
 * 处理eslint格式化
 */
export interface HandleESParams extends ESLint.Options {
  branchName?: string;
}
export function handleES(options?: HandleESParams) {
  const { branchName } = options ?? {};
  delete options?.branchName;
  eslintFileList(
    diffAllFileList(branchName, ['.ts', '.js', '.tsx', '.jsx']),
    options,
  );
}

/**
 * 进行tsc的类型检测
 */
export interface HandleTSParams {
  /**
   * 指定分支名
   */
  branchName?: string;
}
export function handleTS(options?: HandleTSParams) {
  const { branchName } = options ?? {};
  typeCheck(diffAllFileList(branchName, ['.ts', '.js', '.tsx', '.jsx']));
}

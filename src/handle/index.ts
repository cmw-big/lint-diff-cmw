import { type ESLint } from 'eslint';
import { eslintFileList } from '../lintES';
import { diffAllFileList } from '../utils';

export interface HandleESParams extends ESLint.Options {
  branchName?: string;
}
export function handleES(options?: HandleESParams) {
  eslintFileList(
    diffAllFileList(options?.branchName, ['.ts', '.js', '.tsx', '.jsx']),
    options,
  );
}

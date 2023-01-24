import { type ESLint } from 'eslint';
import { eslintFileList } from '../lintES';
import { diffAllFileList } from '../utils';

export function handleES(options?: ESLint.Options) {
  eslintFileList(diffAllFileList(['.ts', '.js', '.tsx', '.jsx']), options);
}

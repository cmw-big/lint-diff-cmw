import { eslintFileList } from '../lintES';
import { diffAllFileList } from '../utils';

export function handleES() {
  eslintFileList(diffAllFileList(['.ts', '.js', '.tsx', '.jsx']));
}

import { type ESLint } from 'eslint';
export interface HandleESParams extends ESLint.Options {
    branchName?: string;
}
export declare function handleES(options?: HandleESParams): void;

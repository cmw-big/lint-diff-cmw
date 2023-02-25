import { type ESLint } from 'eslint';
/**
 * 处理eslint格式化
 */
export interface HandleESParams extends ESLint.Options {
    branchName?: string;
}
export declare function handleES(options?: HandleESParams): void;
/**
 * 进行tsc的类型检测
 */
export interface HandleTSParams {
    /**
     * 指定分支名
     */
    branchName?: string;
}
export declare function handleTS(options?: HandleTSParams): void;

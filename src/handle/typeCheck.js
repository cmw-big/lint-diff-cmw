"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.typeCheck = void 0;
/**
 * @file 类型检查ts文件
 */
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var node_process_1 = require("node:process");
var strip_json_comments_1 = require("strip-json-comments");
var typescript_1 = require("typescript");
var typeCheck = function (fileList, options) {
    var _a;
    var tsconfig = '';
    try {
        tsconfig = (0, node_fs_1.readFileSync)((0, node_path_1.resolve)((0, node_process_1.cwd)(), 'tsconfig.json'), 'utf-8');
    }
    catch (error) {
        console.log('项目缺少tsconfig.json文件');
    }
    var jsonTsconfig = JSON.parse((0, strip_json_comments_1["default"])(tsconfig));
    // 将tsconfig转化为createProgram需要的
    var _b = typescript_1["default"].convertCompilerOptionsFromJson(__assign(__assign({}, ((_a = jsonTsconfig.compilerOptions) !== null && _a !== void 0 ? _a : {})), { noEmit: true }) || {
        noEmit: true
    }, process.cwd()), programOptions = _b.options, errors = _b.errors;
    if (errors.length) {
        console.error("Error: Couldn't parse compiler options");
        console.error(errors);
        return;
    }
    var program = typescript_1["default"].createProgram({
        options: programOptions,
        rootNames: __spreadArray([], (fileList !== null && fileList !== void 0 ? fileList : []), true)
    });
    // 创建输出结果
    var emitResult = program.emit();
    // 表示是否有错误发生，没有生成js代码
    var allDiagnostics = typescript_1["default"]
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    var formatHost = {
        getCanonicalFileName: function (path) { return path; },
        getCurrentDirectory: typescript_1["default"].sys.getCurrentDirectory,
        getNewLine: function () { return typescript_1["default"].sys.newLine; }
    };
    var message = typescript_1["default"].formatDiagnosticsWithColorAndContext(allDiagnostics, formatHost);
    console.error(message);
    // console.log(`Found ${allDiagnostics?.length} errors in ${fileList?.length} files.\n\n${message}`);
    if (emitResult.emitSkipped) {
        throw new Error(message);
    }
    else if (allDiagnostics.length > 0) {
        console.error(message);
        process.exit(1);
    }
    else {
        console.log('TypeScript compilation successful!');
    }
};
exports.typeCheck = typeCheck;

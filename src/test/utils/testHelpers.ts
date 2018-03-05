/**
 * Developer: Stepan Burguchev
 * Date: 11/16/2017
 * Copyright: 2015-present ApprovalMax
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF ApprovalMax
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* eslint-disable import/no-extraneous-dependencies */

'use strict';

import { CodeModExports } from '../../models/CodeMod';
import codeModService from '../../services/codeModService';
import * as vscode from 'vscode';
import * as assert from 'assert';
import * as fs from 'fs-extra';
import * as path from 'path';

export function runInlineTest(
    modId: string,
    input: string,
    output: string,
    options: { fileName?: string; startPos?: vscode.Position; endPos?: vscode.Position } = {}
) {
    const mod = codeModService.loadOneEmbeddedCodeMod(modId);

    const runOptions = {
        fileName:
            (options && options.fileName) || '/Users/billy/projects/example/codemods/example.ts',
        source: input,
        selection: {
            startPos: (options && options.startPos) || new vscode.Position(0, 0),
            endPos: (options && options.endPos) || new vscode.Position(0, 0)
        }
    };

    const canRun = codeModService.executeCanRun(mod, runOptions);
    if (!canRun) {
        throw new Error('The transform cannot be run at this position.');
    }
    const actualOutput = codeModService.executeTransform(mod, runOptions);

    assert.equal(actualOutput, output);
}

export function runInlineCanRunTest(
    modId: string,
    input: string,
    expected: boolean,
    options: { fileName?: string; startPos?: vscode.Position; endPos?: vscode.Position } = {}
) {
    const mod = codeModService.loadOneEmbeddedCodeMod(modId);

    const runOptions = {
        fileName:
            (options && options.fileName) || '/Users/billy/projects/example/codemods/example.ts',
        source: input,
        selection: {
            startPos: (options && options.startPos) || new vscode.Position(0, 0),
            endPos: (options && options.endPos) || new vscode.Position(0, 0)
        }
    };

    const actualOutput = codeModService.executeCanRun(mod, runOptions);
    assert.equal(actualOutput, expected);
}

export function runTransformTest(
    dirName,
    modId: string,
    fixtureId: string | null = null,
    options: { fileName?: string; startPos?: vscode.Position; endPos?: vscode.Position } = {}
) {
    const fixDir = path.join(dirName, '__fixtures__');
    const fixtureSuffix = fixtureId ? `.${fixtureId}` : '';
    const files = fs.readdirSync(fixDir);
    const inputFile = files.find(file => file.startsWith(`${modId}${fixtureSuffix}.input.`));
    const outputFile = files.find(file => file.startsWith(`${modId}${fixtureSuffix}.output.`));
    if (!inputFile || !outputFile) {
        throw new Error(
            `Failed to find input or output fixture. modId: '${modId}', fixtureId: ${fixtureId}.`
        );
    }
    const input = fs.readFileSync(path.join(fixDir, inputFile), 'utf8');
    const output = fs.readFileSync(path.join(fixDir, outputFile), 'utf8');
    runInlineTest(modId, input, output, options);
}

export function runCanRunTest(
    dirName,
    modId: string,
    expected: boolean,
    fixtureId: string | null = null,
    options: { fileName?: string; startPos?: vscode.Position; endPos?: vscode.Position } = {}
) {
    const fixDir = path.join(dirName, '__fixtures__');
    const fixtureSuffix = fixtureId ? `.${fixtureId}` : '';
    const files = fs.readdirSync(fixDir);
    const inputFile = files.find(file => file.startsWith(`${modId}${fixtureSuffix}.check.`));
    if (!inputFile) {
        throw new Error(
            `Failed to find the input fixture for canRun() test. modId: '${modId}', fixtureId: ${fixtureId}.`
        );
    }
    const input = fs.readFileSync(path.join(fixDir, inputFile), 'utf8');
    runInlineCanRunTest(modId, input, expected, options);
}

export function defineTransformTest(
    dirName: string,
    modId: string,
    fixtureId: string | null = null,
    options: { fileName?: string; startPos?: vscode.Position; endPos?: vscode.Position } = {}
) {
    const testName = fixtureId
        ? `"${modId}" transforms correctly using "${fixtureId}" data`
        : `"${modId}" transforms correctly`;
    suite(modId, () => {
        test(testName, () => {
            runTransformTest(dirName, modId, fixtureId, options);
        });
    });
}

export function defineCanRunTest(
    dirName: string,
    modId: string,
    expected: boolean,
    fixtureId: string | null = null,
    options: { fileName?: string; startPos?: vscode.Position; endPos?: vscode.Position } = {}
) {
    const testName = fixtureId
        ? `"${modId}" transforms correctly using "${fixtureId}" data`
        : `"${modId}" transforms correctly`;
    suite(modId, () => {
        test(testName, () => {
            runCanRunTest(dirName, modId, expected, fixtureId, options);
        });
    });
}

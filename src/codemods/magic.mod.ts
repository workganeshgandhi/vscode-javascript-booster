import { CodeModExports } from '../models/CodeMod';
import { FunctionDeclaration, Printable } from 'ast-types';
import { Collection, JsCodeShift } from 'jscodeshift';
import { findNodeAtPosition } from '../utils';

let codeMod: CodeModExports = function(fileInfo, api, options) {
    const j = api.jscodeshift;
    const src = j(fileInfo.source);
    let result = src.find(j.FunctionDeclaration);
    if (result.length > 0) {
        result.nodes()[0].id.name = 'bar';
    }

    let resultText = src.toSource();
    return resultText;
};

codeMod.canRun = function(fileInfo, api, options) {
    const j = api.jscodeshift;
    const src = j(fileInfo.source);
    const pos = options.selection.endPos;
    const target = findNodeAtPosition(j, src, pos);
    return j.IfStatement.check(target.nodes()[0]);
};

codeMod.title = 'Add magic statements';

codeMod.description = 'No harm intended';

codeMod.detail = 'The statements added are scattered evenly throughout the code';

module.exports = codeMod;

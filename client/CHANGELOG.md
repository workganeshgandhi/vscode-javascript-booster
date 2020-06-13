# Change Log

All notable changes to the "vscode-javascript-booster" extension are documented in this file.

<!-- Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file. -->

<!-- CHANGELOG STARTS HERE -->

### 14.0.0

![Features](resources/recording-v14.0.0.gif)

In this release: a bunch of new code actions including React and TypeScript; resolve technical debt and do the groundwork for more exciting features!

-   New code actions

    -   React: Wrap function into useCallback() hook
    -   React: Wrap component function with React.forwardRef()
    -   React: Wrap component function with React.memo()
    -   React: Convert function to React.FunctionComponent<Props>
    -   TS: Convert enum to string-enum
    -   TS: Convert string-enum to type union
    -   TS: Convert type union of strings to string-enum
    -   Function: Convert arrow function to regular function
    -   Function: Convert function declaration to arrow function
    -   Conditions: Merge nested `if` statements declaration
    -   String: Trim whitespaces inside string

-   Fixes

    -   replace-with-regular-string should not trigger on tagged template strings
    -   React: convert to regular function now supports React function components

-   Others
    -   Add action scoping (e.g. react-only, ts-only)
    -   Use strict TypeScript in the language server
    -   Migrate to ESLint
    -   Switch to Yarn (for selective deps resolution)
    -   Add log-level, add verbose performance logs

### 0.12.0

-   Add new refactoring: `Replace ?: with if-else` (#19):

    ![Replace ?: with if-else](resources/replace-ternary-with-if-else.gif)

-   Fixed 'Remove redundant else' refactoring not to appear when there is not else statement (#21).
-   The project now uses Webpack internally to minimize the extension size and improve performance (#22).

### 0.11.0

-   Add new range-based code action: `Call await statements in parallel with Promise.All()` (#7):

    ![Call await statements in parallel with Promise.All()](resources/convert-await-sequence-into-parallel.gif)

-   Add new option to adjust formatting for generated code (only needed when a code action generates new code, the formatting of the unaffected code is always preserved). See `javascriptBooster.formattingOptions` and #10.
-   Bumped @babel/parser, adds proper Angular support (#13).
-   Fixed `Convert to arrow function` refactoring, now works correctly with async functions (#11).
-   Fixed `replace if-else with ?:` refactoring, now supports refactoring of pure expressions:

    ![replace if-else with ?:](resources/replace-if-else-with-ternary_expression-statement.gif)

### 0.10.0

-   [VSCode API] Switched to using selection parameter passed into `provideCodeActions()` (Fixes #5)
-   `JSX: Expand empty tag` now puts the cursor between the tags when executed.
-   `Split string under cursor` now puts selection before the second string when executed.
-   `Split string under cursor` no longed triggers outside string quotes.
-   `Remove redundant else` now supports the case when `if` branch ends with return statement:

    ![](resources/remove-redundant-else_return-in-if.gif)

-   `Replace with ternary` can now replace conditional return statements:

    ![](resources/replace-if-else-with-ternary_return.gif)

-   Added new action: `Simplify if-else`.

    ![](resources/simplify-if-else.gif)

-   Added new action: `Simplify ?:`.

    ![](resources/simplify-ternary.gif)

### 0.9.0

-   Improved language server performance when available code actions are computed.
-   Fixed `Split string literal under the cursor`, now works well with a series of concatenations (`'foo' + 'bar][baz' => 'foo' + 'bar' + 'baz'`) and respects escape sequences.
-   Fixed `App parens to arrow function parameter`, renamed into `Wrap parameter with ()` to avoid confusion with `Add braces to arrow function` and now always puts the cursor at the end of the parameter.
-   Fixed a number of string actions becoming available when under string literals which cannot be transformed (e.g. inside imports, TS enums etc).

### 0.8.0

-   Extracted all AST-related operations into a Language Server. Massively improves UI responsiveness, particularly when working with large files. 🔥
-   Added new code action: `Split string literal under the cursor`.
-   Fixed `Split into declaration and initialization` to work when inside a function/arrow expression.

### 0.7.0

-   Optimized code action performance on large files. Only the transformed fragment of the code is replaced when an action is applied.
-   Fixed Extend/Shrink selections fallback commands not working due to missing extension activation points.

### 0.6.0

-   Changed `Split into declaration and initialization` action:

    -   It no longer appears in the bulb when the cursor is inside a variable initializer.
    -   It no longer appears in the bulb when variable declaration is a part of ES6 module export.

-   Changed `Convert to shorthand arrow function` action: it now supports transformation of Expression Statements (without explicit return).

### 0.5.0

-   Added new inline code actions.

    -   Add parens to arrow function parameter
    -   Remove braces from JSX attribute

-   Added support for multiple cursors in smart selection commands.
-   Changed `Replace if-else with ?:` action: it now supports if-return-else-return scenario.
-   Fixed `Collapse/Expand empty tag` action: it previously didn't work when the element is nested into a JSX attribute.

### 0.4.0

-   Added new inline code actions.

    -   Flip ?:
    -   Convert function to arrow function
    -   Convert const -> let
    -   JSX: Collapse/Expand empty tag

-   Added support for TypeScript 2.7 (definite assignment assertion modifier in class property definitions) through upgrading to the latest Babylon.

-   Changed `Split into declaration and initialization` action: it can now split const declarations.

-   Fixed #1: Sequence of string literals doesn't convert properly when transforming to template literal.

-   Fixed smart selection extension for collapsed JSX elements.

### 0.3.0

-   Added new smart selection commands for JavaScript and TypeScript (with behavior very close to those in WebStorm). When used in other languages, the fallback commands defined in settings are used.

    -   `javascriptBooster.extendSelection`
    -   `javascriptBooster.shrinkSelection`

-   Added a command to run global code actions.
-   Added support for external code actions, you can run them from a directory inside your workspace (the directory path is defined is settings, `/codemods` by default).

### 0.2.0 (Initial release)

-   Added the following inline code actions. The list will keep expanding in later releases.

    -   Flip if-else
    -   Remove redundant else
    -   Replace if-else with ?:
    -   Convert shorthand arrow function to statement
    -   Convert to shorthand arrow function
    -   Replace string with template string
    -   Replace template string with regular string
    -   Wrap value with {} (JSX attributes)
    -   Convert var to let
    -   Convert var to const
    -   Split into multiple declarations
    -   Split into declaration and initialisation
    -   Merge declaration and initialisation

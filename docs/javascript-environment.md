---
id: javascript-environment
title: JavaScript Environment
---

## JavaScript Runtime

When using React Native, you're going to be running your JavaScript code in two environments:

- In most cases, React Native will use [JavaScriptCore](http://trac.webkit.org/wiki/JavaScriptCore), the JavaScript engine that powers Safari. Note that on iOS, JavaScriptCore does not use JIT due to the absence of writable executable memory in iOS apps.
- When using Chrome debugging, all JavaScript code runs within Chrome itself, communicating with native code via WebSockets. Chrome uses [V8](https://v8.dev/) as its JavaScript engine.

While both environments are very similar, you may end up hitting some inconsistencies. We're likely going to experiment with other JavaScript engines in the future, so it's best to avoid relying on specifics of any runtime.

## JavaScript Syntax Transformers

Syntax transformers make writing code more enjoyable by allowing you to use new JavaScript syntax without having to wait for support on all interpreters.

React Native ships with the [Babel JavaScript compiler](https://babeljs.io). Check [Babel documentation](https://babeljs.io/docs/plugins/#transform-plugins) on its supported transformations for more details.

A full list of React Native's enabled transformations can be found in [metro-react-native-babel-preset](https://github.com/facebook/metro/tree/master/packages/metro-react-native-babel-preset).

| Transformation                                                                                              | code                                                                        |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| <td colspan={2}><div className="label js">ES5 / ES2009</div></td>                                           |                                                                             |
| Reserved Words                                                                                              | `promise.catch(function() { });`                                            |
| <td colspan={2}><div className="label js">ES6 / ES2015</div></td>                                           |                                                                             |
| [Arrow functions](http://babeljs.io/docs/learn-es2015/#arrows)                                              | `<C onPress={() => this.setState({pressed: true})} />`                      |
| [Block scoping](https://babeljs.io/docs/learn-es2015/#let-const)                                            | `let greeting = 'hi';`                                                      |
| [Call spread](http://babeljs.io/docs/learn-es2015/#default-rest-spread)                                     | `Math.max(...array);`                                                       |
| [Classes](http://babeljs.io/docs/learn-es2015/#classes)                                                     | `class C extends React.Component { render() { return <View />; } }`         |
| [Computed Properties](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals)                        | `var key = 'abc'; var obj = {[key]: 10};`                                   |
| [Constants](https://babeljs.io/docs/learn-es2015/#let-const)                                                | `const answer = 42;`                                                        |
| [Destructuring](http://babeljs.io/docs/learn-es2015/#destructuring)                                         | `var {isActive, style} = this.props;`                                       |
| [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)           | `for (var num of [1, 2, 3]) {};`                                            |
| [Function Name](https://babeljs.io/docs/en/babel-plugin-transform-function-name)                            | `let number = x => x;`                                                      |
| [Literals](https://babeljs.io/docs/en/babel-plugin-transform-literals)                                      | `var b = 0b11; var o = 0o7; const u = "Hello\u{000A}\u{0009}!";`            |
| [Modules](http://babeljs.io/docs/learn-es2015/#modules)                                                     | `import React, { Component } from 'react';`                                 |
| [Object Concise Method](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals)                      | `var obj = { method() { return 10; } };`                                    |
| [Object Short Notation](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals)                      | `var name = 'vjeux'; var obj = { name };`                                   |
| [Parameters](https://babeljs.io/docs/en/babel-plugin-transform-parameters)                                  | `function test(x = "hello", { a, b }, ...args) {}`                          |
| [Rest Params](https://github.com/sebmarkbage/ecmascript-rest-spread)                                        | `function(type, ...args) {};`                                               |
| [Shorthand Properties](https://babeljs.io/docs/en/babel-plugin-transform-shorthand-properties)              | `var o = { a, b, c };`                                                      |
| [Sticky Regex](https://babeljs.io/docs/en/babel-plugin-transform-sticky-regex)                              | `const a = /o+/y;`                                                          |
| [Template Literals](http://babeljs.io/docs/learn-es2015/#template-strings)                                  | `` var who = 'world'; var str = `Hello ${who}`; ``                          |
| [Unicode Regex](https://babeljs.io/docs/en/babel-plugin-transform-unicode-regex)                            | `var string = "foo💩bar"; var match = string.match(/foo(.)bar/u);`          |
| <div className="label js">ES7 / ES2016</div>                                                                |                                                                             |
| [Exponentiation Operator](https://babeljs.io/docs/en/babel-plugin-transform-exponentiation-operator)        | `let x = 10 ** 2;`                                                          |
| <div className="label js">ES8 / ES2017</div>                                                                |                                                                             |
| [Function Trailing Comma](https://github.com/jeffmo/es-trailing-function-commas)                            | `function f(a, b, c,) {};`                                                  |
| [Async Functions](https://github.com/tc39/ecmascript-asyncawait)                                            | `async function doStuffAsync() { const foo = await doOtherStuffAsync(); };` |
| <div className="label js">ES10 / ES2019</div>                                                               |                                                                             |
| [Optional Catch Binding](https://babeljs.io/docs/en/babel-plugin-proposal-optional-catch-binding)           | `try {throw 0;} catch {doSomethingWhichDoesNotCareAboutTheValueThrown();}`  |
| <div className="label js">ES11 / ES2020</div>                                                               |                                                                             |
| [Dynamic Imports](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)                            | `var package = await import('package'); package.function()`                 |
| <div className="label js">Stage 1 Proposal</div>                                                            |                                                                             |
| [Export Default From](https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from)                 | `export v from "mod";`                                                      |
| <div className="label js">Stage 3 Proposal</div>                                                            |                                                                             |
| [Object Spread](https://github.com/tc39/proposal-object-rest-spread)                                        | `var extended = { ...obj, a: 10 };`                                         |
| [Static class fields](https://github.com/tc39/proposal-static-class-features)                               | `class CustomDate { static epoch = new CustomDate(0); }`                    |
| <div className="label js">ES.Next (Stage 4 Proposals)</div>                                                 |                                                                             |
| [Nullish Coalescing Operator](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator) | `var foo = object.foo ?? "default";`                                        |
| [Optional Chaining](https://github.com/tc39/proposal-optional-chaining)                                     | `var name = obj.user?.name;`                                                |
| <div className="label js">Proposals</div>                                                                   |                                                                             |
| [Class Properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)                       |                                                                             |
| <div className="label js">Miscellaneous</div>                                                               |                                                                             |
| [JSX](https://reactjs.org/docs/jsx-in-depth.html)                                                           | `<View style={{color: 'red'}} />`                                           |
| [React Display Name](https://babeljs.io/docs/en/babel-plugin-transform-react-display-name)                  | `var bar = createReactClass({});`                                           |
| [Flow](https://flowtype.org/)                                                                               | `function foo(x: ?number): string {};`                                      |
| [TypeScript](https://www.typescriptlang.org/)                                                               | `function foo(x: {hello: true, target: "react native!"}): string {};`       |
| [ESM to CJS](https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs)                            | `export default 42;`                                                        |
| [Object Assign](https://babeljs.io/docs/en/babel-plugin-transform-object-assign)                            | `Object.assign(a, b);`                                                      |
| [Babel Template](https://babeljs.io/docs/en/babel-template): allows AST templating                          |                                                                             |

## Polyfills

Many standard functions are also available on all the supported JavaScript runtimes.

Browser

- [console.{log, warn, error, info, trace, table, group, groupEnd}](https://developer.chrome.com/devtools/docs/console-api)
- [CommonJS require](https://nodejs.org/docs/latest/api/modules.html)
- [XMLHttpRequest, fetch](network.md#content)
- [{set, clear}{Timeout, Interval, Immediate}, {request, cancel}AnimationFrame](timers.md#content)

ES6

- [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- String.prototype.{[startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith), [endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith), [repeat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat), [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)}
- [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- Array.prototype.{[find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)}

ES7

- Array.prototype.[includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

ES8

- Object.{[entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)}

Specific

- `__DEV__`

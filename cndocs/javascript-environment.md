---
id: javascript-environment
title: JavaScript环境
---

## JavaScript 运行时环境

在使用 React Native 时，你的 JavaScript 代码将会运行在两个不同的环境上：

- 大多数情况下，React Native 使用的是[JavaScriptCore](http://trac.webkit.org/wiki/JavaScriptCore)，也就是 Safari 所使用的 JavaScript 引擎。但是在 iOS 上 JavaScriptCore 并没有使用即时编译技术（JIT），因为在 iOS 中应用无权拥有可写可执行的内存页（因此无法动态生成代码）。
- 在使用 Chrome 调试时，所有的 JavaScript 代码都运行在 Chrome 中，并且通过 WebSocket 与原生代码通信。此时的运行环境是[V8 引擎](https://code.google.com/p/v8/)。

虽然两个环境非常类似，但开发者还是可能碰到一些不一致的地方。未来我们很可能会尝试一些其他的 JS 引擎，所以请尽量避免使用依赖于特定运行环境的代码。

> 常见的不一致比如有：iOS 上有部分日期构造函数未实现；Android 上重复定义的 props 可能会导致报错。

## JavaScript 语法转换器

语法转换器可以使编写代码的过程更加享受，因为开发者可以借助转换器直接使用新的 JavaScirpt 语法标准，而无需等待 JS 解释器的支持。

React Native 内置了[Babel 转换器](https://babeljs.io)。你可以查看[Babel 的文档](https://babeljs.io/docs/plugins/#transform-plugins)来了解有关它可以转换的语法的详情。

在[metro-react-native-babel-preset](https://github.com/facebook/metro/tree/master/packages/metro-react-native-babel-preset)中可以看到目前 React Native 默认开启的语法转换特性。
注：若想学习相关语法，译者推荐阮一峰老师的[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)以及论坛的[讨论帖](http://bbs.reactnative.cn/topic/15)。

ES5

- 保留关键字: `promise.catch(function() { });`

ES6

- [箭头函数 Arrow functions](http://babeljs.io/docs/learn-es2015/#arrows): `<C onPress={() => this.setState({pressed: true})} />`
- [块级作用域 Block scoping](https://babeljs.io/docs/learn-es2015/#let-const): `let greeting = 'hi';`
- [数组的扩展运算 Call spread](http://babeljs.io/docs/learn-es2015/#default-rest-spread): `Math.max(...array);`
- [类 Classes](http://babeljs.io/docs/learn-es2015/#classes): `class C extends React.Component { render() { return <View />; } }`
- [常量 Constants](https://babeljs.io/docs/learn-es2015/#let-const): `const answer = 42;`
- [解构 Destructuring](http://babeljs.io/docs/learn-es2015/#destructuring): `var {isActive, style} = this.props;`
- [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of): `for (var num of [1, 2, 3]) {}`
- [模块 Modules](http://babeljs.io/docs/learn-es2015/#modules): `import React, { Component } from 'react';`
- [动态属性键 Computed Properties](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var key = 'abc'; var obj = {[key]: 10};`
- 对象方法的简写 Object Consise Method: `var obj = { method() { return 10; } };`
- [对象属性的简写 Object Short Notation](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var name = 'vjeux'; var obj = { name };`
- [参数的扩展运算 Rest Params](https://github.com/sebmarkbage/ecmascript-rest-spread): `function(type, ...args) { }`
- [字符串模板 Template Literals](http://babeljs.io/docs/learn-es2015/#template-strings): `` var who = 'world'; var str = `Hello ${who}`; ``

ES8

- [参数列表末尾允许放置逗号 Function Trailing Comma](https://github.com/jeffmo/es-trailing-function-commas): `function f(a, b, c,) { }`
- [异步函数 Async Functions](https://github.com/tc39/ecmascript-asyncawait): `async function doStuffAsync() { const foo = await doOtherStuffAsync(); };`

Stage 3

- [对象的扩展运算 Object Spread](https://github.com/sebmarkbage/ecmascript-rest-spread): `var extended = { ...obj, a: 10 };`
- [Optional Chaining](https://github.com/tc39/proposal-optional-chaining): `var name = obj.user?.name;`

其他特性

- [JSX](https://reactjs.org/docs/jsx-in-depth.html): `<View style={{color: 'red'}} />`
- [Flow](http://flowtype.org/): `function foo(x: ?number): string {}`
- [TypeScript](https://flowtype.org/): `function foo(x: number | undefined): string {};`
- [Babel Template](https://babeljs.io/docs/en/babel-template): allows AST templating

## 接口兼容（Polyfills）

许多标准功能也都在支持的 JavaScript 运行环境上做了兼容支持。

浏览器

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

- Array.prototype.{[includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)}

ES8

- Object.{[entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)}

其他特性

- `__DEV__` 用于判断当前是否开发环境的全局变量

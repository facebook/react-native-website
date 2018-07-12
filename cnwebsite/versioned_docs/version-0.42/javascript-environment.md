---
id: version-0.42-javascript-environment
title: JavaScript环境
original_id: javascript-environment
---

在使用React Native时，你的JavaScript代码将会运行在两个不同的环境上：

* 在iOS、Android的模拟器或是真机上，React Native使用的是[JavaScriptCore](http://trac.webkit.org/wiki/JavaScriptCore)，也就是Safari所使用的JavaScript引擎。但是在iOS上JavaScriptCore并没有使用即时编译技术（JIT），因为在iOS中应用无权拥有可写可执行的内存页（因而无法动态生成代码）。
* 在使用Chrome调试时，所有的JavaScript代码都运行在Chrome中，并且通过WebSocket与原生代码通信。此时的运行环境是[V8引擎](https://code.google.com/p/v8/)。

虽然两个环境非常类似，但开发者还是可能碰到一些不一致的地方。未来我们很可能会尝试一些其他的JS引擎，所以请尽量避免使用依赖于特定运行环境的代码。

## JavaScript语法转换器

语法转换器可以使编写代码的过程更加享受，因为开发者可以借助转换器直接使用新的JavaScirpt语法标准，而无需等待JS解释器的支持。

React Native从0.5.0版本开始已经内置[Babel转换器](https://babeljs.io)。你可以查看[Babel的文档](https://babeljs.io/docs/plugins/#transform-plugins)来了解有关它可以转换的语法的详情。

这里可以看到目前React Native默认开启的[语法转换特性](https://github.com/facebook/react-native/blob/master/babel-preset/configs/main.js#L16)。  
注：若想学习相关语法，译者推荐阮一峰老师的[《ECMAScript 6入门》](http://es6.ruanyifeng.com/)以及论坛的[讨论帖](http://bbs.reactnative.cn/topic/15)。

ES5

* 保留关键字: `promise.catch(function() { });`

ES6

* [箭头函数Arrow functions](http://babeljs.io/docs/learn-es2015/#arrows): `<C onPress={() => this.setState({pressed: true})}`
* [块级作用域Block scoping](https://babeljs.io/docs/learn-es2015/#let-const): `let greeting = 'hi';`
* [数组的扩展运算Call spread](http://babeljs.io/docs/learn-es2015/#default-rest-spread): `Math.max(...array);`
* [类Classes](http://babeljs.io/docs/learn-es2015/#classes): `class C extends React.Component { render() { return <View />; } }`
* [常量Constants](https://babeljs.io/docs/learn-es2015/#let-const): `const answer = 42;`
* [解构Destructuring](http://babeljs.io/docs/learn-es2015/#destructuring): `var {isActive, style} = this.props;`
* [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of): `for (var num of [1, 2, 3]) {}`
* [模块Modules](http://babeljs.io/docs/learn-es2015/#modules): `import React, { Component } from 'react';`
* [动态属性键Computed Properties](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var key = 'abc'; var obj = {[key]: 10};`
* 对象方法的简写Object Consise Method: `var obj = { method() { return 10; } };`
* [对象属性的简写Object Short Notation](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var name = 'vjeux'; var obj = { name };`
* [参数的扩展运算Rest Params](https://github.com/sebmarkbage/ecmascript-rest-spread): `function(type, ...args) { }`
* [字符串模板Template Literals](http://babeljs.io/docs/learn-es2015/#template-strings): ``var who = 'world'; var str = `Hello ${who}`;``

ES7

* [对象的扩展运算Object Spread](https://github.com/sebmarkbage/ecmascript-rest-spread): `var extended = { ...obj, a: 10 };`
* [参数列表末尾允许放置逗号Function Trailing Comma](https://github.com/jeffmo/es-trailing-function-commas): `function f(a, b, c,) { }`
* [Async函数](https://github.com/tc39/ecmascript-asyncawait): `async function doStuffAsync() { const foo = await doOtherStuffAsync(); }`;

其他特性

* [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html): `<View style={{color: 'red'}} />`
* [Flow](http://flowtype.org/): `function foo(x: ?number): string {}`

## 接口兼容（Polyfills）

许多标准功能也都在支持的JavaScript运行环境上做了兼容支持。

浏览器

* [console.{log, warn, error, info, trace, table}](https://developer.chrome.com/devtools/docs/console-api)
* [CommonJS require](https://nodejs.org/docs/latest/api/modules.html)
* [XMLHttpRequest, fetch](/react-native/docs/network.html#content)
* [{set, clear}{Timeout, Interval, Immediate}, {request, cancel}AnimationFrame](/react-native/docs/timers.html#content)
* [navigator.geolocation](/react-native/docs/geolocation.html#content)
 
ES6

* [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
* String.prototype.{[startsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith), [endsWith](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith), [repeat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeats), [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)}
* [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
* Array.prototype.{[find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)}

ES7

* Object.{[entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)}

其他特性

* `__DEV__`



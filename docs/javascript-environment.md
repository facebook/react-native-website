---
id: javascript-environment
title: JavaScript 実行環境
---

## JavaScript ランタイム

React Native を使用する場合、JavaScript を主に2つの環境で使用することになります。

- ほとんどの場合、React Native は、Safari を動かしている JavaScript エンジンである [JavaScriptCore](http://trac.webkit.org/wiki/JavaScriptCore) を使用します。iOS アプリには書き込み可能な実行メモリがないため、iOS では JavaScriptCore は JIT を使用しないことに注意してください。
- Chrome デバッグを使用している場合、すべての JavaScript コードは Chrome 内で実行され、WebSocket を介してネイティブコードと通信します。Chrome は JavaScript エンジンとして [V8](https://v8.dev/) を使用します。

これらの環境は非常に似ていますが、いくつかの不整合が発生する場合があります。将来的には他の JavaScript エンジンを使用するになるでしょうから、ランタイムの仕様に依存するのは避けた方が良いでしょう。

## JavaScript シンタックストランスフォーマー

シンタックストランスフォーマーはインタプリタのサポートを待たずに新しい JavaScript 構文を使用できるようにしてくれます。

React Native は [Babel](https://babeljs.io) を同梱します。Babel についての詳細は、 [Babel のドキュメンテーション](https://babeljs.io/docs/plugins/#transform-plugins)を御覧ください。

全てのトランスフォーメーションのリストは [metro-react-native-babel-preset](https://github.com/facebook/metro/tree/master/packages/metro-react-native-babel-preset) で確認できます。

ES5

- 予約語: `promise.catch(function() { });`

ES6

- [アロー関数（無名関数・ラムダ式）](http://babeljs.io/docs/learn-es2015/#arrows): `<C onPress={() => this.setState({pressed: true})} />`
- [ブロックスコーピング ( 変数宣言 `let`)](https://babeljs.io/docs/learn-es2015/#let-const): `let greeting = 'hi';`
- [スプレッド構文](http://babeljs.io/docs/learn-es2015/#default-rest-spread): `Math.max(...array);`
- [クラス](http://babeljs.io/docs/learn-es2015/#classes): `class C extends React.Component { render() { return <View />; } }`
- [定数宣言](https://babeljs.io/docs/learn-es2015/#let-const): `const answer = 42;`
- [分割代入](http://babeljs.io/docs/learn-es2015/#destructuring): `var {isActive, style} = this.props;`
- [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of): `for (var num of [1, 2, 3]) {};`
- [モジュール](http://babeljs.io/docs/learn-es2015/#modules): `import React, { Component } from 'react';`
- [プロパティ演算](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var key = 'abc'; var obj = {[key]: 10};`
- [オブジェクトメソッド](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var obj = { method() { return 10; } };`
- [オブジェクトの短縮表記](http://babeljs.io/docs/learn-es2015/#enhanced-object-literals): `var name = 'vjeux'; var obj = { name };`
- [可変長引数](https://github.com/sebmarkbage/ecmascript-rest-spread): `function(type, ...args) {};`
- [テンプレートリテラル](http://babeljs.io/docs/learn-es2015/#template-strings): `` var who = 'world'; var str = `Hello ${who}`; ``

ES8

- [最後の引数の後のコンマ](https://github.com/jeffmo/es-trailing-function-commas): `function f(a, b, c,) {};`
- [非同期関数](https://github.com/tc39/ecmascript-asyncawait): `async function doStuffAsync() { const foo = await doOtherStuffAsync(); };`

ステージ 3

- [オブジェクトスプレッド構文](https://github.com/tc39/proposal-object-rest-spread): `var extended = { ...obj, a: 10 };`
- [静的メソッド・プロパティ](https://github.com/tc39/proposal-static-class-features): `class CustomDate { static epoch = new CustomDate(0); }`
- [安全なプロパティアクセス](https://github.com/tc39/proposal-optional-chaining): `var name = obj.user?.name;`

言語固有

- [JSX](https://reactjs.org/docs/jsx-in-depth.html): `<View style={{color: 'red'}} />`
- [Flow](https://flowtype.org/): `function foo(x: ?number): string {};`
- [TypeScript](https://www.typescriptlang.org/): `function foo(x: number | undefined): string {};`
- [Babel Template](https://babeljs.io/docs/en/babel-template): allows AST templating

## Polyfills

多くの標準組込み関数は、サポートされているすべてのJavaScriptランタイムでも利用可能です。

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

- Array.prototype.{[includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)}

ES8

- Object.{[entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)}

Specific

- `__DEV__`

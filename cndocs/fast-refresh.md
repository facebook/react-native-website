---
id: fast-refresh
title: 快速刷新
---

快速刷新是 React Native 一个特性，在修改组件的时候快速刷新会给你一个即时的反馈。快速刷新默认是开启的，可以通过调整 React Native 开发者菜单里面的 "Enable Fast Refresh" 来开启或关闭。在快速刷新开启的时候，大多数的修改能在一到两秒之内呈现。

## 原理

- 如果你编辑了一个**仅导出 React 组件**的模块文件，快速刷新只会更新该模块的代码，并且重新渲染你的组件。你能够编辑文件里面的任何东西，包括样式，渲染逻辑，事件处理或者 effects。
- 如果你编辑的模块并不导出 React 组件，快速刷新将会重新运行该模块，和其他引入该模块的模块文件。例如，`Button.js` 和 `Modal.js` 同时引入了 `Theme.js` ，编辑 `theme.js` 的时候，`Button.js` 和 `Modal.js` 都会更新。
- 最后，如果你**编辑了某个文件，而这个文件被 React渲染树 之外的模块引入**，则快速刷新将会回退到完全刷新。你可能有一个文件，该文件渲染了一个 React 组件，同时又导出了一个被其他**非 React 组件**引入的值。例如，你的 React 组件模块同时导出了一个常量，并且在非 React 组件模块引入了它。在这种情况下面，考虑将查询迁移到一个单独的文件并将其导入到两个文件中。这样快速刷新才能重新生效。其他的情况也类似。

## 错误还原

如果在快速刷新的过程中出现了**语法错误**，可以在修复错误后重新保存文件。红屏警告会跟着消失。错误语法的模块会被阻止运行，这样你就不需要重载 app。

如果出现了**在模块初始化过程中的运行时错误**（例如，将`StyleSheet.create`错打成了`Style.create`），在你修复错误之后，快速刷新会话会继续进行。红屏警告消失，模块更新。

如果出现了**组件内部发生的运行时错误**，在你修复错误之后，快速刷新会话_也_将继续进行。在这种情况下，React 将会使用更新后的代码重新挂载你的应用。

If you have [error boundaries](https://reactjs.org/docs/error-boundaries.html) in your app (which is a good idea for graceful failures in production), they will retry rendering on the next edit after a redbox. In that sense, having an error boundary can prevent you from always getting kicked out to the root app screen. However, keep in mind that error boundaries shouldn't be _too_ granular. They are used by React in production, and should always be designed intentionally.

## 限制条件

当你正在编辑的时候，快速刷新会尝试保持组件里面的本地 state，但仅限于这种保持是安全的情况。以下是一些在你编辑文件之后，组件本地的 state 被重置的原因：

- class组件的本地 state 不会被保持（仅保持函数组件和 Hooks 的 state）。
- 除了React组件外，您正在编辑的模块可能还有 _其他_ 导出。
- 有时候，一个模块导出的是一个高阶组件，例如 `createNavigationContainer(MyScreen)`。如果返回的组件是一个class组件，state 将会被重置。

从长远来看，随着越来越多的代码库转移到函数组件和Hooks，会出现更多 state 被保持的情况。

## 提示

- 快速刷新默认保持函数组件（和 Hooks）的本地 state。
- 有时候你可能想要 _强制_ 状态被重置，某个组件被重新挂载。例如你正在调试一个发生在挂载期间的动画，这种情况是很有用的。为了做到这一点，你可以在文件的任何地方增加 `// @refresh reset`。这个指令是文件的本地指令，指示快速刷新在每次编辑时重新加载该文件中定义的组件。
- 在快速刷新的会话期间，你可以在编辑的组件里面放置 `console.log` 或者 `debugger;`

---
id: nodes
title: 来自 refs 的节点
---

React Native 应用会渲染一个表示 UI 的原生视图树，类似于 React DOM 在 Web 上的做法（DOM 树）。React Native 通过 [refs](https://react.dev/learn/manipulating-the-dom-with-refs) 提供对这个树的命令式访问，所有原生组件（包括内置组件如 [`View`](/docs/next/view) 渲染的组件）都会返回这些 refs。

React Native 提供 3 种类型的节点：

- [元素节点](/docs/next/element-nodes)：元素节点表示原生视图树中的原生组件（类似于 Web 上的 [Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 节点）。它们通过 refs 由所有原生组件提供。
- [文本节点](/docs/next/text-nodes)：文本节点表示树中的原始文本内容（类似于 Web 上的 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 节点）。它们不能直接通过 `refs` 访问，但可以使用元素 refs 上的方法（如 [`childNodes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes)）来访问。
- [文档节点](/docs/next/document-nodes)：文档节点表示完整的原生视图树（类似于 Web 上的 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 节点）。像文本节点一样，它们只能通过其他节点访问，使用如 [`ownerDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/ownerDocument) 这样的属性。

与 Web 上一样，这些节点可用于遍历渲染的 UI 树、访问布局信息或执行命令式操作（如 `focus`）。

:::info
**与 Web 不同的是，这些节点不允许变更**（例如：[`node.appendChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild)），因为树的内容完全由 React 渲染器管理。
:::

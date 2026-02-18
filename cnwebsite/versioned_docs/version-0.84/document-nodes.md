---
id: document-nodes
title: 文档节点
---

文档节点表示完整的原生视图树。使用原生导航的应用会为每个屏幕提供单独的文档节点。不使用原生导航的应用通常会为整个应用提供单个文档（类似于 Web 上的单页应用）。

```SnackPlayer ext=js&name=Document%20instance%20example
import * as React from 'react';
import {Text, TextInput, View} from 'react-native';

function MyComponent(props) {
  return (
    <View ref={props.ref}>
      <Text>Start typing below</Text>
      <TextInput id="main-text-input" />
    </View>
  )
}

export default function AccessingDocument() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    // 获取屏幕中的主文本输入框并在初始加载后聚焦它。
    const element = ref.current;
    const doc = element.ownerDocument;
    const textInput = doc.getElementById('main-text-input');
    textInput?.focus();
  }, []);

  return (
    <MyComponent ref={ref} />
  );
}
```

---

## 参考

### Web 兼容 API

来自 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)：

- 属性
  - [`childElementCount`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/childElementCount)
  - [`children`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/children)
  - [`documentElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/documentElement)
  - [`firstElementChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/firstElementChild)
  - [`lastElementChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/lastElementChild)
- 方法
  - [`getElementById()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)

来自 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)：

- 属性
  - [`childNodes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes)
  - [`firstChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/firstChild)
  - [`isConnected`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isConnected)
  - [`lastChild`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/lastChild)
  - [`nextSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nextSibling)
  - [`nodeName`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeName)
  - [`nodeType`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)
  - [`nodeValue`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeValue)
  - [`ownerDocument`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/ownerDocument)
  - [`parentElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentElement)
  - [`parentNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode)
  - [`previousSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling)
  - [`textContent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)
- 方法
  - [`compareDocumentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition)
  - [`contains()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)
  - [`getRootNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/getRootNode)
  - [`hasChildNodes()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/hasChildNodes)

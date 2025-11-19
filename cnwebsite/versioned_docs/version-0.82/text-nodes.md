---
id: text-nodes
title: 文本节点
---

文本节点表示树中的原始文本内容（类似于 Web 上的 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 节点）。它们不能直接通过 `refs` 访问，但可以使用元素 refs 上的方法（如 [`childNodes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes)）来访问。

```SnackPlayer ext=js&name=Text%20instances%20example
import * as React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const TextWithRefs = () => {
  const ref = React.useRef(null);
  const [viewInfo, setViewInfo] = React.useState('');

  React.useEffect(() => {
    // `textElement` 是实现此处描述的接口的对象。
    const textElement = ref.current;
    const textNode = textElement.childNodes[0];
    setViewInfo(
      `Text content is: ${textNode.nodeValue}`,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text ref={ref}>
        Hello world!
      </Text>
      <Text>{viewInfo}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    backgroundColor: 'gray',
  },
});

export default TextWithRefs;
```

---

## 参考

### Web 兼容 API

来自 [`CharacterData`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData)：

- 属性
  - [`data`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData/data)
  - [`length`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData/length)
  - [`nextElementSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData/nextElementSibling)
  - [`previousElementSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData/previousElementSibling)
- 方法
  - [`substringData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData/substringData)

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
    - ℹ️ 将返回渲染此组件的[文档实例](/docs/next/document-instances)。
  - [`parentElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentElement)
  - [`parentNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/parentNode)
  - [`previousSibling`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/previousSibling)
  - [`textContent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)
- 方法
  - [`compareDocumentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition)
  - [`contains()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)
  - [`getRootNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/getRootNode)
    - ℹ️ 如果组件未挂载，将返回对自身的引用。
  - [`hasChildNodes()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/hasChildNodes)

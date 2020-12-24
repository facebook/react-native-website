---
id: clipboard
title: 🚧 Clipboard
---

> **已过时。** Use [@react-native-community/clipboard](https://github.com/react-native-community/clipboard) instead.

`Clipboard`组件可以在 iOS 和 Android 的剪贴板中读写内容。

## 示例

```SnackPlayer name=Clipboard%20API%20Example&supportedPlatforms=ios,android
import React, { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Clipboard, StyleSheet } from 'react-native'
const App = () => {
  const [copiedText, setCopiedText] = useState('')
  const copyToClipboard = () => {
    Clipboard.setString('hello world')
  }
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString()
    setCopiedText(text)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchCopiedText()}>
          <Text>View copied text</Text>
        </TouchableOpacity>
        <Text style={styles.copiedText}>{copiedText}</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  copiedText: {
    marginTop: 10,
    color: 'red'
  }
})
export default App
```

---

# 文档

## 方法

### `getString()`

```jsx
static getString()
```

获取剪贴板的文本内容。返回一个`Promise`，然后你可以用下面的方式来读取剪贴板内容。

```jsx
async _getContent() {
  const content = await Clipboard.getString();
}
```

---

### `setString()`

```jsx
static setString(content)
```

设置剪贴板的文本内容，然后你可以用下面的方式来设置剪贴板内容。

```jsx
_setContent() {
  Clipboard.setString('hello world');
}
```

**参数：**

| 名称    | 类型   | Required | 说明                                      |
| ------- | ------ | -------- | ----------------------------------------- |
| content | string | Yes      | The content to be stored in the clipboard |

_Notice_

Be careful when you're trying to copy to clipboard any data except `string` and `number`, some data need additional stringification. For example, if you will try to copy array - Android will raise an exception, but iOS will not.

---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(95.83%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(3.13%), [774866545](https://github.com/search?q=774866545&type=Users)(1.04%)

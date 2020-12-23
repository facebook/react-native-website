---
id: actionsheetios
title: ActionSheetIOS
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(98.18%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(1.82%)

显示一个 iOS 原生的[Action Sheet](https://developer.apple.com/design/human-interface-guidelines/ios/views/action-sheets/)组件。

## 示例

```SnackPlayer name=ActionSheetIOS&supportedPlatforms=ios
import React, { useState } from "react";
import { ActionSheetIOS, Button, StyleSheet, Text, View } from "react-native";
const App = () => {
  const [result, setResult] = useState("🔮");
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Generate number", "Reset"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult(Math.floor(Math.random() * 100) + 1);
        } else if (buttonIndex === 2) {
          setResult("🔮");
        }
      }
    );
  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result}</Text>
      <Button onPress={onPress} title="Show Action Sheet" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  result: {
    fontSize: 64,
    textAlign: "center"
  }
});
export default App;
```

# 文档

## 方法

### `showActionSheetWithOptions()`

```jsx
static showActionSheetWithOptions(options, callback)
```

在 iOS 设备上显示一个 ActionSheet 弹出框，其中`options`参数为一个对象，其属性必须包含以下一项或多项：

- `options` （字符串数组） - 一组按钮的文字（必选）
- `cancelButtonIndex` （整型） - 取消性质的按钮在`options`中的位置（索引）
- `destructiveButtonIndex` （整型） - 删除性质的按钮在`options`中的位置（索引）
- `title` （字符串） - 弹出框顶部的标题
- `message` （字符串） - 弹出框顶部标题下方的信息
- `anchor` (number) - the node to which the action sheet should be anchored (used for iPad)
- `tintColor` (字符串) - 指定删除性质的按钮的文字的[颜色](colors.md)

* `disabledButtonIndices` (array of numbers) - a list of button indices which should be disabled

'callback'函数则仅接受一个参数，即所点击按钮的索引。

一个例子：

```
ActionSheetIOS.showActionSheetWithOptions({
  options: ['取消', '删除'],
  destructiveButtonIndex: 1,
  cancelButtonIndex: 0,
},
(buttonIndex) => {
if (buttonIndex === 1) { /* 当接收到的索引为1，即点击了删除按钮时，执行对应操作 */ }
});
```

---

### `showShareActionSheetWithOptions()`

```jsx
static showShareActionSheetWithOptions(options, failureCallback, successCallback)
```

在 iOS 设备上显示一个分享弹出框，其中`options`参数为一个对象，其属性包含以下几项（必须至少有 message 或 url）:

- `url` （字符串） - 要分享的 URL 地址
- `message` （字符串） - 要分享的信息
- `subject` （字符串） - 要分享的信息主题
- `excludedActivityTypes` （数组） - 指定在 actionsheet 中不显示的活动

注：如果`url`指向本地文件，或者是一个 base64 编码的 url，则会直接读取并分享相应的文件。你可以用这样的方式来分享图片、视频以及 PDF 文件等。If `url` points to a remote file or address it must conform to URL format as described in [RFC 2396](https://www.ietf.org/rfc/rfc2396.txt). For example, a web URL without a proper protocol (HTTP/HTTPS) will not be shared.

'failureCallback'函数仅接受一个错误对象参数。此对象中仅包含一个可选的`stack`属性，类型为字符串。

'successCallback'函数接受两个参数：

- 表示成功与否的布尔值
- 成功的话返回一个表示分享方式的字符串

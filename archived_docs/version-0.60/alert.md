---
id: version-0.60-alert
title: Alert
original_id: alert
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

启动一个提示对话框，包含对应的标题和信息。

你还可以指定一系列的按钮，点击对应的按钮会调用对应的 onPress 回调并且关闭提示框。默认情况下，对话框会仅有一个'确定'按钮。

本接口可以在 iOS 和 Android 上显示一个静态的提示框。如果要在显示提示框的同时接受用户输入一些信息，那你可能需要[`AlertIOS`](alertios.md)。

## 示例

<table>
  <tr>
    <th style="width: 50%;">iOS</th>
    <th style="width: 50%;">Android</th>
  </tr>
  <tr>
    <td style="width: 50%;">
      <center><img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/Alert/exampleios.gif"></img></center>
    </td>
    <td style="width: 50%;">
      <center><img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/Alert/exampleandroid.gif"></img></center>
    </td>
  </tr>
</table>

## iOS

在 iOS 上你可以指定任意数量的按钮。每个按钮还都可以指定自己的样式，此外还可以指定提示的类别。参阅[AlertIOS](alertios.md)来了解更多细节。

## Android

在 Android 上最多能指定三个按钮，这三个按钮分别具有“中间态”、“消极态”和“积极态”的概念：

如果你只指定一个按钮，则它具有“积极态”的属性（比如“确定”）；两个按钮，则分别是“消极态”和“积极态”（比如“取消”和“确定”）；三个按钮则意味着“中间态”、“消极态”和“积极态”（比如“稍候再说”，“取消”，“确定”）。

在 Android 上默认情况下点击提示框的外面会自动取消提示框。你可以提供一个额外参数来处理这一事件：`{ onDismiss: () => {} }`。

还有另外一个参数也可以用来阻止提示框被自动取消，即`{ cancelable: false }`。

一个简单的例子：

```
// iOS和Android上都可用
Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
```

### 查看方法

- [`alert`](alert.md#alert)

---

# 文档

## 方法

### `alert()`

```jsx
static alert(title, message?, buttons?, options?)
```

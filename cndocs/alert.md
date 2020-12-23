---
id: alert
title: Alert
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

启动一个提示对话框，包含对应的标题和信息。

你还可以指定一系列的按钮，点击对应的按钮会调用对应的 onPress 回调并且关闭提示框。默认情况下，对话框会仅有一个'确定'按钮。

本接口可以在 iOS 和 Android 上显示一个静态的提示框。只有 iOS 系统支持在提示框中加入文本框。

### 示例

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Alert%20Function%20Component%20Example&supportedPlatforms=ios,android
import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

const App = () => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  return (
    <View style={styles.container}>
      <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />
      <Button title={"3-Button Alert"} onPress={createThreeButtonAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default App;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Alert%20Class%20Component%20Example&supportedPlatforms=ios,android
import React, { Component } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

class App extends Component {
  createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  render() {
    return (
      <View style={styles.container}>
        <Button title={"2-Button Alert"} onPress={this.createTwoButtonAlert} />

        <Button
          title={"3-Button Alert"}
          onPress={this.createThreeButtonAlert}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default App;
```

</TabItem>
</Tabs>

## iOS

在 iOS 上你可以指定任意数量的按钮。每个按钮还都可以指定自己的样式，此外还可以指定提示的类别。参阅[AlertButtonStyle](#alertbuttonstyle.md)来了解更多细节。

## Android

在 Android 上最多能指定三个按钮，这三个按钮分别具有“中间态”、“消极态”和“积极态”的概念：

如果你只指定一个按钮，则它具有“积极态”的属性（比如“确定”）；两个按钮，则分别是“消极态”和“积极态”（比如“取消”和“确定”）；三个按钮则意味着“中间态”、“消极态”和“积极态”（比如“稍候再说”，“取消”，“确定”）。

在 Android 上可以通过点击提示框的外面来取消提示框，但这一行为默认没有启用。你可以在[`Options`](#options)中提供一个额外参数来启用这一行为：`{ cancelable: true }`。

还可以通过在`options`中添加`onDismiss`回调函数来捕获用户的取消操作：`{ onDismiss: () => {} }`。

### 示例 <div class="label android">Android</div>

```SnackPlayer name=Alert%20Android%20Dissmissable%20Example&supportedPlatforms=android
import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

const showAlert = () =>
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );

const App = () => (
  <Button title="Show alert" onPress={showAlert} />
);

export default App;
```

---

# 文档

## 方法

### `alert()`

```jsx
static alert(title, message?, buttons?, options?)
```

**参数：**

| 名称    | 类型                                                              | 说明                                                                    |
| ------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| title   | string <div class="label basic required">Required</div>           | The dialog's title. Passing `null` or empty string will hide the title. |
| message | string                                                            | An optional message that appears below the dialog's title.              |
| buttons | [Buttons](alert#buttons)                                          | An optional array containg buttons configuration.                       |
| options | [Options](alert#options) <div class="label android">Android</div> | An optional Alert configuration for the Android.                        |

---

### `prompt()` <div class="label ios">iOS</div>

```jsx
static prompt(title, message?, callbackOrButtons?, type?, defaultValue?, keyboardType?)
```

Create and display a prompt to enter some text in form of Alert.

**参数：**

| 名称              | 类型                                                    | 说明                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | string <div class="label basic required">Required</div> | The dialog's title.                                                                                                                                                                                   |
| message           | string                                                  | An optional message that appears above the text input.                                                                                                                                                |
| callbackOrButtons | function<hr/>[Buttons](alert#buttons)                   | If passed a function, it will be called with the prompt's value<br/>`(text: string) => void`, when the user taps 'OK'.<hr/>If passed an array, buttons will be configured based on the array content. |
| 类型              | [AlertType](alert#alerttype)                            | This configures the text input.                                                                                                                                                                       |
| defaultValue      | string                                                  | The default text in text input.                                                                                                                                                                       |
| keyboardType      | string                                                  | The keyboard type of first text field (if exists). One of TextInput [keyboardTypes](textinput#keyboardtype).                                                                                          |

---

## 类型定义

### AlertButtonStyle <div class="label ios">iOS</div>

An iOS Alert button style.

| 类型 |
| ---- |
| enum |

**常量：**

| Value           | 说明                      |
| --------------- | ------------------------- |
| `'default'`     | Default button style.     |
| `'cancel'`      | Cancel button style.      |
| `'destructive'` | Destructive button style. |

---

### AlertType <div class="label ios">iOS</div>

An iOS Alert type.

| 类型 |
| ---- |
| enum |

**常量：**

| Value              | 说明                         |
| ------------------ | ---------------------------- |
| `'default'`        | Default alert with no inputs |
| `'plain-text'`     | Plain text input alert       |
| `'secure-text'`    | Secure text input alert      |
| `'login-password'` | Login and password alert     |

---

### Buttons

Array of objects containg Alert buttons configuration.

| 类型             |
| ---------------- |
| array of objects |

**Objects properties:**

| 名称                                   | 类型                                       | 说明                                                    |
| -------------------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| text                                   | string                                     | Button label.                                           |
| onPress                                | function                                   | Callback function when button is pressed.               |
| style <div class="label ios">iOS</div> | [AlertButtonStyle](alert#alertbuttonstyle) | Button style, on Android this property will be ignored. |

---

### Options <div class="label android">Android</div>

| 类型   |
| ------ |
| object |

**Properties:**

| 名称       | 类型     | 说明                                                                   |
| ---------- | -------- | ---------------------------------------------------------------------- |
| cancelable | boolean  | Defines if alert can be dismissed by tapping outside of the alert box. |
| onDismiss  | function | Callback function fired when alert has been dismissed.                 |

---
id: toastandroid
title: ToastAndroid
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

本模块将原生的 ToastAndroid 模块导出为一个 JS 模块，用于在 Android 设备上显示一个悬浮的提示信息。本模块包含一个`show`方法接受以下的参数：

- _message_ 一个字符串，表示将要显示的文本内容。
- _duration_ 提示信息持续显示的时间。可以是`ToastAndroid.SHORT`或者`ToastAndroid.LONG`。

还有一个名为`showWithGravity`的方法可以指定弹出的位置。可选项有：ToastAndroid.TOP, ToastAndroid.BOTTOM, ToastAndroid.CENTER.

The 'showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)' method adds the ability to specify an offset with in pixels.

```SnackPlayer name=Toast%20Android%20API%20Example&supportedPlatforms=android
import React from "react";
import { View, StyleSheet, ToastAndroid, Button } from "react-native";
import Constants from "expo-constants";

const App = () => {
  const showToast = () => {
    ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "All Your Base Are Belong To Us",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "A wild toast appeared!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Toggle Toast" onPress={() => showToast()} />
      <Button
        title="Toggle Toast With Gravity"
        onPress={() => showToastWithGravity()}
      />
      <Button
        title="Toggle Toast With Gravity & Offset"
        onPress={() => showToastWithGravityAndOffset()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#888888",
    padding: 8
  }
});

export default App;
```

### Imperative hack

The ToastAndroid API is imperative, but there is a way to expose a declarative component from it as in this example:

```SnackPlayer name=Advanced%20Toast%20Android%20API%20Example&supportedPlatforms=android
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ToastAndroid, Button } from "react-native";
import Constants from "expo-constants";

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};

const App = () => {
  const [visibleToast, setvisibleToast] = useState(false);

  useEffect(() => setvisibleToast(false), [visibleToast]);

  const handleButtonPress = () => {
    setvisibleToast(true);
  };

  return (
    <View style={styles.container}>
      <Toast visible={visibleToast} message="Example" />
      <Button title="Toggle Toast" onPress={() => handleButtonPress()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#888888",
    padding: 8
  }
});

export default App;
```

---

# 文档

## 方法

### `show()`

```jsx
static show(message, duration)
```

---

### `showWithGravity()`

```jsx
static showWithGravity(message, duration, gravity)
```

---

### `showWithGravityAndOffset()`

```jsx
static showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)
```

## 属性

### `SHORT`

Indicates the duration on the screen.

```jsx
ToastAndroid.SHORT;
```

---

### `LONG`

Indicates the duration on the screen.

```jsx
ToastAndroid.LONG;
```

---

### `TOP`

Indicates the position on the screen.

```jsx
ToastAndroid.TOP;
```

---

### `BOTTOM`

Indicates the position on the screen.

```jsx
ToastAndroid.BOTTOM;
```

---

### `CENTER`

Indicates the position on the screen.

```jsx
ToastAndroid.CENTER;
```

---
id: toastandroid
title: ToastAndroid
---

React Native 的 ToastAndroid API 将 Android 平台的 ToastAndroid 模块以 JS 模块的形式暴露出来。它提供了 `show(message, duration)` 方法，接受以下参数：

- _message_ 要显示的 toast 文本字符串
- _duration_ toast 的持续时间——可以是 `ToastAndroid.SHORT` 或 `ToastAndroid.LONG`

你也可以使用 `showWithGravity(message, duration, gravity)` 来指定 toast 在屏幕上的显示位置。可选值为 `ToastAndroid.TOP`、`ToastAndroid.BOTTOM` 或 `ToastAndroid.CENTER`。

`showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)` 方法还支持以像素为单位指定偏移量。

:::note
从 Android 11（API 级别 30）开始，设置 gravity 对文本 toast 不再生效。详情请阅读[这里](https://developer.android.com/about/versions/11/behavior-changes-11#text-toast-api-changes)的说明。
:::

```SnackPlayer name=Toast%20Android%20API%20Example&supportedPlatforms=android
import React from 'react';
import {StyleSheet, ToastAndroid, Button, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const showToast = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title="Toggle Toast" onPress={() => showToast()} />
        <Button
          title="Toggle Toast With Gravity"
          onPress={() => showToastWithGravity()}
        />
        <Button
          title="Toggle Toast With Gravity & Offset"
          onPress={() => showToastWithGravityAndOffset()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#888888',
    padding: 8,
  },
});

export default App;
```

---

# 参考文档

## 方法

### `show()`

```tsx
static show(message: string, duration: number);
```

---

### `showWithGravity()`

此属性仅在 Android API 29 及以下版本生效。对于更高版本的 Android API，请考虑使用 snackbar 或通知。

```tsx
static showWithGravity(message: string, duration: number, gravity: number);
```

---

### `showWithGravityAndOffset()`

此属性仅在 Android API 29 及以下版本生效。对于更高版本的 Android API，请考虑使用 snackbar 或通知。

```tsx
static showWithGravityAndOffset(
  message: string,
  duration: number,
  gravity: number,
  xOffset: number,
  yOffset: number,
);
```

## 属性

### `SHORT`

表示在屏幕上的显示时长。

```tsx
static SHORT: number;
```

---

### `LONG`

表示在屏幕上的显示时长。

```tsx
static LONG: number;
```

---

### `TOP`

表示在屏幕上的显示位置。

```tsx
static TOP: number;
```

---

### `BOTTOM`

表示在屏幕上的显示位置。

```tsx
static BOTTOM: number;
```

---

### `CENTER`

表示在屏幕上的显示位置。

```tsx
static CENTER: number;
```

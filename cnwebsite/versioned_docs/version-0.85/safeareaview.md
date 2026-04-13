---
id: safeareaview
title: '🗑️ SafeAreaView'
---

:::warning 已弃用
请改用 [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context)。
:::

`SafeAreaView`会自动根据系统的各种导航栏、工具栏等预留出空间来渲染内部内容。更重要的是，它还会考虑到设备屏幕的局限，比如屏幕四周的圆角或是顶部中间不可显示的“刘海”区域。

## 示例

只需简单地把你原有的视图用`SafeAreaView`包起来，同时设置一个`flex: 1`的样式。当然可能还需要一些和你的设计相匹配的背景色。

```SnackPlayer name=SafeAreaView
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Page content</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
```

---

# 文档

## Props

### [View Props](view.md#props)

继承了所有的[View Props](view.md#props).

> As padding is used to implement the behavior of the component, padding rules in styles applied to a `SafeAreaView` will be ignored and can cause different results depending on the platform. See [#22211](https://github.com/facebook/react-native/issues/22211) for details.

---

### `emulateUnlessSupported`

| 类型 | Required | Default |
| ---- | -------- | ------- |
| bool | No       | true    |

---
id: systrace
title: Systrace
---

`Systrace` 是一个标准的基于标记的 Android 性能分析工具（在安装 Android platform-tools 包时会一起安装）。被分析的代码块会被开始/结束标记包围，然后以彩色图表格式可视化。Android SDK 和 React Native 框架都提供了可以可视化的标准标记。

## 示例

`Systrace` 允许您使用标签和整数值标记 JavaScript (JS) 事件。在 EasyProfiler 中捕获非计时的 JS 事件。

```SnackPlayer name=Systrace%20Example
import React from 'react';
import {Button, Text, View, StyleSheet, Systrace} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const enableProfiling = () => {
    Systrace.setEnabled(true); // 调用 setEnabled 来开启性能分析
    Systrace.beginEvent('event_label');
    Systrace.counterEvent('event_label', 10);
  };

  const stopProfiling = () => {
    Systrace.endEvent();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>
          React Native Systrace API
        </Text>
        <View style={styles.buttonsColumn}>
          <Button
            title="在 EasyProfiler 中捕获非计时的 JS 事件"
            onPress={() => enableProfiling()}
          />
          <Button
            title="停止捕获"
            onPress={() => stopProfiling()}
            color="#FF0000"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonsColumn: {
    gap: 16,
  },
});

export default App;
```

---

# 参考

## 方法

### `isEnabled()`

```tsx
static isEnabled(): boolean;
```

---

### `beginEvent()`

```tsx
static beginEvent(eventName: string | (() => string), args?: EventArgs);
```

beginEvent/endEvent 用于在同一个调用栈帧内开始和结束性能分析。

---

### `endEvent()`

```tsx
static endEvent(args?: EventArgs);
```

---

### `beginAsyncEvent()`

```tsx
static beginAsyncEvent(
  eventName: string | (() => string),
  args?: EventArgs,
): number;
```

beginAsyncEvent/endAsyncEvent 用于开始和结束性能分析，其中结束可以发生在另一个线程上或在当前堆栈帧之外，例如 await。返回的 cookie 变量应该用作 endAsyncEvent 调用的输入以结束性能分析。

---

### `endAsyncEvent()`

```tsx
static endAsyncEvent(
  eventName: EventName,
  cookie: number,
  args?: EventArgs,
);
```

---

### `counterEvent()`

```tsx
static counterEvent(eventName: string | (() => string), value: number);
```

将值注册到 systrace 时间线上的 profileName。

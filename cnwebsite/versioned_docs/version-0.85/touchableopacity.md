---
id: touchableopacity
title: TouchableOpacity
---

:::tip
如果你正在寻找一种更全面且面向未来的方式来处理触摸输入，请查看 [Pressable](pressable.md) API。
:::

本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。

不透明度的变化是通过把子元素封装在一个 `Animated.View` 中来实现的，这个动画视图会被添加到视图层级中，少数情况下有可能会影响到布局。

## 示例

```SnackPlayer name=TouchableOpacity%20Example
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
```

---

# 文档

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

继承 [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)。

---

### `style`

| Type                           |
| ------------------------------ |
| [View.style](view-style-props) |

---

### `activeOpacity`

指定封装的视图在被触摸操作激活时以多少不透明度显示（0 到 1 之间，0 表示完全透明，1 表示完全不透明）。默认值为 `0.2`。

| Type   |
| ------ |
| number |

---

### `hasTVPreferredFocus` <div className="label ios">iOS</div>

_(仅 Apple TV)_ TV 首选焦点（参见 View 组件文档）。

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

TV 下一个向下焦点（参见 View 组件文档）。

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

TV 下一个向前焦点（参见 View 组件文档）。

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

TV 下一个向左焦点（参见 View 组件文档）。

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

TV 下一个向右焦点（参见 View 组件文档）。

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

TV 下一个向上焦点（参见 View 组件文档）。

| Type   |
| ------ |
| number |

---

### `ref`

一个 ref 设置器，在组件挂载时会被赋值为一个[元素节点](element-nodes)。

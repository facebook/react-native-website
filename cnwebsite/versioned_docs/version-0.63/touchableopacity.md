---
id: touchableopacity
title: TouchableOpacity
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the [Pressable](pressable.md) API.

本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。

不透明度的变化是通过把子元素封装在一个`Animated.View`中来实现的，这个动画视图会被添加到视图层级中，少数情况下有可能会影响到布局。（译注：此组件与 TouchableHighlight 的区别在于并没有额外的颜色变化，更适于一般场景。）

## 示例

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=TouchableOpacity%20Function%20Component%20Example
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>Count: {count}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default App;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=TouchableOpacity%20Class%20Component%20Example
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    const { count } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default App;
```

</TabItem>
</Tabs>

---

# 文档

## Props

Inherits [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props).

### `style`

| 类型       | 必需 |
| ---------- | ---- |
| View.style | 否   |

---

### `activeOpacity`

指定封装的视图在被触摸操作激活时以多少不透明度显示（0 到 1 之间）。默认值为 0.2。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `tvParallaxProperties`

_(Apple TV only)_ Object with properties to control Apple TV parallax effects.

- `enabled`: If `true`, parallax effects are enabled. Defaults to `true`.
- `shiftDistanceX`: Defaults to `2.0`.
- `shiftDistanceY`: Defaults to `2.0`.
- `tiltAngle`: Defaults to `0.05`.
- `magnification`: Defaults to `1.0`.
- `pressMagnification`: Defaults to `1.0`.
- `pressDuration`: Defaults to `0.3`.
- `pressDelay`: Defaults to `0.0`.

| 类型   | 必需 | 平台 |
| ------ | ---- | ---- |
| object | 否   | iOS  |

---

### `hasTVPreferredFocus`

_(Apple TV only)_ TV preferred focus (see documentation for the View component).

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `nextFocusDown`

TV next focus down (see documentation for the View component).

| 类型 | Required | 平台    |
| ---- | -------- | ------- |
| bool | No       | Android |

---

### `nextFocusForward`

TV next focus forward (see documentation for the View component).

| 类型 | Required | 平台    |
| ---- | -------- | ------- |
| bool | No       | Android |

---

### `nextFocusLeft`

TV next focus left (see documentation for the View component).

| 类型 | Required | 平台    |
| ---- | -------- | ------- |
| bool | No       | Android |

---

### `nextFocusRight`

TV next focus right (see documentation for the View component).

| 类型 | Required | 平台    |
| ---- | -------- | ------- |
| bool | No       | Android |

---

### `nextFocusUp`

TV next focus up (see documentation for the View component).

| 类型 | Required | 平台    |
| ---- | -------- | ------- |
| bool | No       | Android |

## 方法

### `setOpacityTo()`

```jsx
setOpacityTo((value: number), (duration: number));
```

将本组件的不透明度设为指定值（伴有过渡动画）。

---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(90.13%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(9.87%)

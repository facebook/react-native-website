---
id: pressable
title: Pressable
---

`Pressable` 是一个核心组件的封装，它可以检测到任意子组件的不同阶段的按压交互情况。

```jsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

## 原理

在被 `Pressable` 包装的元素上：

- [`onPressIn`](#onpressin) 在按压时被调用。
- [`onPressOut`](#onpressout) 在按压动作结束后被调用。

在按下 [`onPressIn`](#onpressin) 后，将会出现如下两种情况的一种：

1. 用户移开手指，紧随 [`onPress`](#onpress) 之后触发 [`onPressOut`](#onpressout) 事件。
2. 按压持续 500 毫秒以上，触发[`onLongPress`](#onlongpress) 事件。([`onPressOut`](#onpressout) 在移开手后依旧会触发。)

<img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/d_pressable_pressing.svg" width="1000" alt="Diagram of the onPress events in sequence." />

手指的精准度终究不是很精确，人们经常会不小心按错了或者错过了触发区域。为了帮助解决这个问题， `Pressable` 提供了一个可选项 `HitRect` ，可以用来定义相对于包裹元素的有效触发距离。在 `HitRect` 内的任何地方都可以触发按压动作。

`PressRect` 在保持激活状态的同时，允许用户按压时在元素及设定的范围内滑动，使触控更加优雅。试想一下缓慢地滑动着离开按下的按钮。

> 触控区域不会超出绑定的父级 view，在按压到重叠的兄弟视图时，z-index 更高的那个视图会更优先。

<figure>
  <img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/d_pressable_anatomy.svg" width="1000" alt="Diagram of HitRect and PressRect and how they work." />
  <figcaption>
    用 <code>hitSlop</code> 设置 <code>HitRect</code>； 用 <code>pressRetentionOffset</code> 设置 <code>PressRect</code>； 
  </figcaption>
</figure>

> `Pressable` 使用了 React Native 的 `Pressability` API。查看[Pressability](https://github.com/facebook/react-native/blob/16ea9ba8133a5340ed6751ec7d49bf03a0d4c5ea/Libraries/Pressability/Pressability.js#L347)示例，获取更多关于 Pressability 的状态机流程和原理。

## 示例

```SnackPlayer name=Pressable
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? 'Pressed!' : 'Press Me'}
          </Text>
        )}
      </Pressable>
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLog}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});

export default App;
```

## Props

### `android_disableSound` <div class="label android">Android</div>

为 true 时，按下不会播放 Android 系统声音。

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

### `android_ripple` <div class="label android">Android</div>

使用并配置 Android 波纹效果。

| Type                                   | Required |
| -------------------------------------- | -------- |
| [RippleConfig](pressable#rippleconfig) | No       |

### `children`

接收按压状态布尔值的子节点。

| Type                     | Required |
| ------------------------ | -------- |
| [React Node](react-node) | No       |

### `delayLongPress`

从 `onPressIn` 触发到 `onLongPress` 被调用的时间间隔（毫秒）。

| Type   | Required | Default |
| ------ | -------- | ------- |
| number | No       | `500`   |

### `disabled`

是否禁用按压行为。

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

### `hitSlop`

设置元素能够检测到按压动作的额外距离。

| Type                   | Required |
| ---------------------- | -------- |
| [Rect](rect) or number | No       |

### `onLongPress`

在 `onPressIn` 持续超过 500 毫秒后调用。此持续时间可以通过 [`delayLongPress`](#delaylongpress) 自定义。

| Type                     | Required |
| ------------------------ | -------- |
| [PressEvent](pressevent) | No       |

### `onPress`

`onPressOut` 之后调用。

| Type                     | Required |
| ------------------------ | -------- |
| [PressEvent](pressevent) | No       |

### `onPressIn`

在 `onPressOut` 和 `onPress` 之前， 按压后立即调用。

| Type                     | Required |
| ------------------------ | -------- |
| [PressEvent](pressevent) | No       |

### `onPressOut`

松开手后调用。

| Type                     | Required |
| ------------------------ | -------- |
| [PressEvent](pressevent) | No       |

### `pressRetentionOffset`

在 `onPressOut` 被触发前，view 额外的有效触控距离。

| Type                   | Required | Default                                        |
| ---------------------- | -------- | ---------------------------------------------- |
| [Rect](rect) or number | No       | `{ bottom: 30, left: 20, right: 20, top: 20 }` |

### `style`

可使用普通视图样式，或者一个函数来根据按压状态布尔值返回视图样式。

| Type                              | Required |
| --------------------------------- | -------- |
| [ViewStyleProp](view-style-props) | No       |

### `testOnly_pressed`

仅用于指导文档或测试 (比如快照测试）。

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

## 类型定义

### RippleConfig

`android_ripple` 属性的波纹效果配置。

| Type   |
| ------ |
| object |

**Properties:**

| Name       | Type            | Required | Description                |
| ---------- | --------------- | -------- | -------------------------- |
| color      | [color](colors) | No       | 定义波纹的颜色。           |
| borderless | boolean         | No       | 定义波纹效果是否包含边框。 |
| radius     | number          | No       | 定义波纹的半径。           |

---
id: pressable
title: Pressable
---

`Pressable` 是一个核心组件的封装，它可以检测到任意子组件的不同阶段的按压交互情况。

```tsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

## 原理

在被 `Pressable` 包装的元素上：

- [`onPressIn`](#onpressin) 在按压时被调用。
- [`onPressOut`](#onpressout) 在按压动作结束后被调用。

在按下 [`onPressIn`](#onpressin) 后，将会出现如下两种情况的一种：

1. 用户移开手指，依次触发 [`onPressOut`](#onpressout) 和 [`onPress`](#onpress) 事件。
2. 按压持续 500 毫秒以上，触发 [`onLongPress`](#onlongpress) 事件。（[`onPressOut`](#onpressout) 在移开手后依旧会触发。）

<img src="/docs/assets/d_pressable_pressing.svg" width="1000" alt="Diagram of the onPress events in sequence." />

手指的精准度终究不是很精确，人们经常会不小心按错了或者错过了触发区域。为了帮助解决这个问题，`Pressable` 提供了一个可选项 `HitRect`，可以用来定义相对于包裹元素的有效触控距离。在 `HitRect` 内的任何地方都可以触发按压动作。

`PressRect` 在保持激活状态的同时，允许用户按压时在元素及设定的范围内滑动，使触控更加优雅。试想一下缓慢地滑动着离开按下的按钮。

:::note
触控区域不会超出绑定的父级 view，在按压到重叠的兄弟视图时，z-index 更高的那个视图会更优先。
:::

<figure>
  <img src="/docs/assets/d_pressable_anatomy.svg" width="1000" alt="Diagram of HitRect and PressRect and how they work." />
  <figcaption>
    用 <code>hitSlop</code> 设置 <code>HitRect</code>；用 <code>pressRetentionOffset</code> 设置 <code>PressRect</code>。
  </figcaption>
</figure>

:::info
`Pressable` 使用了 React Native 的 `Pressability` API。查看 [Pressability](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Pressability/Pressability.js#L350) 的实现，了解更多关于 Pressability 的状态机流程和原理。
:::

## 示例

```SnackPlayer name=Pressable
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => {
            setTimesPressed(current => current + 1);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
          )}
        </Pressable>
        <View style={styles.logBox}>
          <Text testID="pressable_press_console">{textLog}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

export default App;
```

## Props

### `android_disableSound` <div className="label android">Android</div>

为 true 时，按下不会播放 Android 系统声音。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

### `android_ripple` <div className="label android">Android</div>

使用并配置 Android 波纹效果。

| Type                                   |
| -------------------------------------- |
| [RippleConfig](pressable#rippleconfig) |

### `children`

接收按压状态布尔值的子节点或函数。

| Type                     |
| ------------------------ |
| [React Node](react-node) |

### `unstable_pressDelay`

按下后到调用 `onPressIn` 之前的等待时长（毫秒）。

| Type   |
| ------ |
| number |

### `delayLongPress`

从 `onPressIn` 触发到 `onLongPress` 被调用的时间间隔（毫秒）。

| Type   | Default |
| ------ | ------- |
| number | `500`   |

### `disabled`

是否禁用按压行为。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

### `hitSlop`

设置元素能够检测到按压动作的额外距离。

| Type                   |
| ---------------------- |
| [Rect](rect) or number |

### `onHoverIn`

当悬停激活时调用，用于提供视觉反馈。

| Type                                                                                                      |
| --------------------------------------------------------------------------------------------------------- |
| `md ({ nativeEvent: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) }) => void` |

### `onHoverOut`

当悬停结束时调用，用于撤销视觉反馈。

| Type                                                                                                      |
| --------------------------------------------------------------------------------------------------------- |
| `md ({ nativeEvent: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) }) => void` |

### `onLongPress`

在 `onPressIn` 持续超过 500 毫秒后调用。此持续时间可以通过 [`delayLongPress`](#delaylongpress) 自定义。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPress`

`onPressOut` 之后调用。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressIn`

在 `onPressOut` 和 `onPress` 之前，按压后立即调用。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressMove`

按压位置移动时调用。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressOut`

松开手后调用。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `pressRetentionOffset`

在 `onPressOut` 被触发前，view 额外的有效触控距离。

| Type                   | Default                                      |
| ---------------------- | -------------------------------------------- |
| [Rect](rect) or number | `{bottom: 30, left: 20, right: 20, top: 20}` |

### `style`

可使用普通视图样式，或者一个函数来根据按压状态布尔值返回视图样式。

| Type                                                                                            |
| ----------------------------------------------------------------------------------------------- |
| [View Style](view-style-props) 或 `md ({ pressed: boolean }) => [View Style](view-style-props)` |

### `testOnly_pressed`

仅用于指导文档或测试（比如快照测试）。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

## 类型定义

### RippleConfig

`android_ripple` 属性的波纹效果配置。

| Type   |
| ------ |
| object |

**Properties:**

| Name       | Type            | Required | Description                                                                                                                          |
| ---------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| color      | [color](colors) | No       | 定义波纹的颜色。                                                                                                                      |
| borderless | boolean         | No       | 定义波纹效果是否包含边框。                                                                                                            |
| radius     | number          | No       | 定义波纹的半径。                                                                                                                      |
| foreground | boolean         | No       | 设为 true 可将波纹效果添加到视图的前景而非背景。当子视图有自己的背景色或者你在显示图片时，这很有用，可以避免波纹效果被遮挡。 |

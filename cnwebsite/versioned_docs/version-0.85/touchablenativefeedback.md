---
id: touchablenativefeedback
title: TouchableNativeFeedback
---

:::tip
如果你正在寻找一种更全面、更面向未来的处理触摸输入的方式，请查看 [Pressable](pressable.md) API。
:::

本组件用于封装视图，使其可以正确响应触摸操作（仅限 Android 平台）。在 Android 设备上，这个组件利用原生状态来渲染触摸的反馈。

目前它只支持一个单独的 View 实例作为子节点。在底层实现上，实际会创建一个新的 RCTView 节点替换当前的子 View，并附带一些额外的属性。

原生触摸操作反馈的背景可以使用`background`属性来自定义。

## 示例

```SnackPlayer name=TouchableNativeFeedback%20Android%20Component%20Example&supportedPlatforms=android
import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [rippleColor, setRippleColor] = useState(randomHexColor());
  const [rippleOverflow, setRippleOverflow] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableNativeFeedback
          onPress={() => {
            setRippleColor(randomHexColor());
            setRippleOverflow(!rippleOverflow);
          }}
          background={TouchableNativeFeedback.Ripple(
            rippleColor,
            rippleOverflow,
          )}>
          <View style={styles.touchable}>
            <Text style={styles.text}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function () {
    return Math.round(Math.random() * 16).toString(16);
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  touchable: {
    flex: 0.33,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default App;
```

---

# 文档

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

继承所有 [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)。

---

### `background`

决定在触摸反馈的时候显示什么类型的背景。它接受一个有着`type`属性和一些基于`type`属性的额外数据的对象。推荐选用本组件的几个静态方法来创建这个对象。

| Type               |
| ------------------ |
| backgroundPropType |

---

### `useForeground`

设为 true 可以将涟漪效果添加到视图的前景而不是背景。当子视图有自己的背景色时（比如显示图片），这个属性很有用，可以避免涟漪效果被遮挡。

使用前请先调用 TouchableNativeFeedback.canUseNativeForeground() 检查，因为此功能仅在 Android 6.0 及以上版本可用。在较低版本上使用时会收到警告并自动回退到背景显示。

| Type |
| ---- |
| bool |

---

### `hasTVPreferredFocus` <div className="label android">Android</div>

TV 优先聚焦（参见 View 组件的文档）。

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

TV 下一个向下聚焦（参见 View 组件的文档）。

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

TV 下一个向前聚焦（参见 View 组件的文档）。

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

TV 下一个向左聚焦（参见 View 组件的文档）。

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

TV 下一个向右聚焦（参见 View 组件的文档）。

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

TV 下一个向上聚焦（参见 View 组件的文档）。

| Type   |
| ------ |
| number |

## 方法

### `SelectableBackground()`

```tsx
static SelectableBackground(
  rippleRadius: number | null,
): ThemeAttributeBackgroundPropType;
```

创建一个对象，表示安卓主题默认的可选中元素背景（`?android:attr/selectableItemBackground`）。`rippleRadius` 参数控制涟漪效果的半径。

---

### `SelectableBackgroundBorderless()`

```tsx
static SelectableBackgroundBorderless(
  rippleRadius: number | null,
): ThemeAttributeBackgroundPropType;
```

创建一个对象，表示安卓主题默认的无边框可选中元素背景（`?android:attr/selectableItemBackgroundBorderless`）。仅在 Android API level 21+ 可用。`rippleRadius` 参数控制涟漪效果的半径。

---

### `Ripple()`

```tsx
static Ripple(
  color: ColorValue,
  borderless: boolean,
  rippleRadius?: number | null,
): RippleBackgroundPropType;
```

创建一个指定颜色的涟漪效果对象。如果 `borderless` 参数为 true，涟漪效果会渲染到视图边界之外（参见原生 ActionBar 按钮的效果）。此背景类型仅在 Android API level 21+ 可用。

**参数：**

| Name         | Type    | Required | Description                    |
| ------------ | ------- | -------- | ------------------------------ |
| color        | string  | Yes      | 涟漪颜色                       |
| borderless   | boolean | Yes      | 涟漪是否可以渲染到视图边界之外 |
| rippleRadius | ?number | No       | 控制涟漪效果的半径             |

---

### `canUseNativeForeground()`

```tsx
static canUseNativeForeground(): boolean;
```

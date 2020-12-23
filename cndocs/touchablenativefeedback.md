---
id: touchablenativefeedback
title: TouchableNativeFeedback
---

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the [Pressable](pressable.md) API.

本组件用于封装视图，使其可以正确响应触摸操作（仅限 Android 平台）。在 Android 设备上，这个组件利用原生状态来渲染触摸的反馈。

目前它只支持一个单独的 View 实例作为子节点。在底层实现上，实际会创建一个新的 RCTView 节点替换当前的子 View，并附带一些额外的属性。

原生触摸操作反馈的背景可以使用`background`属性来自定义。

## 示例

```SnackPlayer name=TouchableNativeFeedback%20Android%20Component%20Example&supportedPlatforms=android
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableNativeFeedback } from "react-native";
import Constants from "expo-constants";

const randomHexColor = () => {
  return "#000000".replace(/0/g, function() {
    return (~~(Math.random() * 16)).toString(16);
  });
};
const App = () => {
  const [rippleColor, setRippleColor] = useState(randomHexColor());
  const [rippleOverflow, setRippleOverflow] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          setRippleColor(randomHexColor());
          setRippleOverflow(!rippleOverflow);
        }}
        background={TouchableNativeFeedback.Ripple(rippleColor, rippleOverflow)}
      >
        <View style={styles.touchable}>
          <Text style={styles.text}>TouchableNativeFeedback</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  touchable: { flex: 0.5, borderColor: "black", borderWidth: 1 },
  text: { alignSelf: "center" }
});

export default App;
```

---

# 文档

## Props

Inherits [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props).

### `background`

决定在触摸反馈的时候显示什么类型的背景。它接受一个有着`type`属性和一些基于`type`属性的额外数据的对象。我们推荐选用本组件的几个静态方法来创建这个对象。

| 类型               | 必填 |
| ------------------ | ---- |
| backgroundPropType | 否   |

---

### `useForeground`

Set to true to add the ripple effect to the foreground of the view, instead of the background. This is useful if one of your child views has a background of its own, or you're e.g. displaying images, and you don't want the ripple to be covered by them.

Check TouchableNativeFeedback.canUseNativeForeground() first, as this is only available on Android 6.0 and above. If you try to use this on older versions you will get a warning and fallback to background.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

## 方法

### `SelectableBackground()`

```jsx
static SelectableBackground(rippleRadius: ?number)
```

会创建一个对象，表示安卓主题默认的对于被选中对象的背景(?android:attr/selectableItemBackground)。`rippleRadius` parameter controls the radius of the ripple effect.

---

### `SelectableBackgroundBorderless()`

```jsx
static SelectableBackgroundBorderless(rippleRadius: ?number)
```

会创建一个对象，表示安卓主题默认的对于被选中的无边框对象的背景(?android:attr/selectableItemBackgroundBorderless)。只适用于 Android API level 21+。`rippleRadius` parameter controls the radius of the ripple effect.

---

### `Ripple()`

```jsx
static Ripple(color: string, borderless: boolean, rippleRadius: ?number)
```

会创建一个对象，当按钮被按下时产生一个涟漪状的背景，你可以通过 color 参数来指定颜色，如果参数`borderless`是 true，那么涟漪还会渲染到视图的范围之外（参见原生的 actionbar buttons 作为该效果的一个例子）。这个背景类型只在 Android API level 21+适用。

**参数：**

| 名称         | 类型    | 必填 | 说明                                         |
| ------------ | ------- | ---- | -------------------------------------------- |
| color        | string  | 是   | The ripple color                             |
| borderless   | boolean | 是   | If the ripple can render outside it's bounds |
| rippleRadius | ?number | No   | controls the radius of the ripple effect     |

---

### `canUseNativeForeground()`

```jsx
static canUseNativeForeground()
```

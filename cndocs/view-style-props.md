---
id: view-style-props
title: View Style Props
---

### 示例

```SnackPlayer name=ViewStyleProps
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.top} />
      <View style={styles.middle} />
      <View style={styles.bottom} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default App;
```

# 参考文档

## Props

### `backfaceVisibility`

| 类型                          |
| ----------------------------- |
| enum(`'visible'`, `'hidden'`) |

---

### `backgroundColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderBottomColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderBlockColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderBlockEndColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderBlockStartColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderBottomEndRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderBottomLeftRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderBottomRightRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderBottomStartRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderStartEndRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderStartStartRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderEndEndRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderEndStartRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderBottomWidth`

| 类型   |
| ------ |
| number |

---

### `borderColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderCurve` <div className="label ios">iOS</div>

在 iOS 13+ 上，可以更改边框的圆角曲线。

| 类型                               |
| ---------------------------------- |
| enum(`'circular'`, `'continuous'`) |

---

### `borderEndColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderLeftColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderLeftWidth`

| 类型   |
| ------ |
| number |

---

### `borderRadius`

如果圆角边框不可见，可以尝试同时添加 `overflow: 'hidden'`。

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderRightColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderRightWidth`

| 类型   |
| ------ |
| number |

---

### `borderStartColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderStyle`

| 类型                                    |
| --------------------------------------- |
| enum(`'solid'`, `'dotted'`, `'dashed'`) |

---

### `borderTopColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderTopEndRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderTopLeftRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderTopRightRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderTopStartRadius`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderTopWidth`

| 类型                              |
| --------------------------------- |
| number, string (百分比值) |

---

### `borderWidth`

| 类型   |
| ------ |
| number |

### `boxShadow`

:::note
`boxShadow` 仅在[新架构](/architecture/landing-page)下可用。外阴影仅支持 **Android 9+**，内阴影仅支持 **Android 10+**。
:::

为元素添加阴影效果，可以控制阴影的位置、颜色、大小和模糊度。根据阴影是否为 _inset_，阴影会出现在元素边框框的外部或内部。这是与 [web 同名样式属性](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)规范一致的实现。详细参数请参阅 [BoxShadowValue](./boxshadowvalue) 文档。

多个阴影可以组合在一起，使单个 `boxShadow` 包含多个不同的阴影。

`boxShadow` 接受模仿 [web 语法](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow#syntax)的字符串或 [BoxShadowValue](./boxshadowvalue) 对象数组。

| 类型 |
| --------------------------- |
| array of BoxShadowValue objects \| string |

### `cursor` <div className="label ios">iOS</div>

在 iOS 17+ 上，设置为 `pointer` 后，当指针设备（如 iOS 上的触控板或手写笔，或 visionOS 上的用户注视）悬停在视图上时，可以启用悬停效果。

| 类型                        |
| --------------------------- |
| enum(`'auto'`, `'pointer'`) |

---

### `elevation` <div className="label android">Android</div>

使用 Android 底层的 [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation) 设置视图的高度。这会为元素添加投影并影响重叠视图的 z 轴顺序。仅支持 Android 5.0+，在更早版本上无效。

| 类型   |
| ------ |
| number |

---

### `filter`

:::note
`filter` 仅在[新架构](/architecture/landing-page)下可用。
:::

为 `View` 添加图形滤镜。该滤镜由多个 _滤镜函数_ 组成，每个函数代表对 `View` 图形合成的某种原子变换。完整的有效滤镜函数列表如下。`filter` 会同时应用于 `View` 本身及其后代。`filter` 隐含了 `overflow: hidden`，因此后代元素会被裁剪以适应 `View` 的边界。

以下滤镜函数在所有平台上均可用：

- `brightness`：改变 `View` 的亮度。接受非负数或百分比。
- `opacity`：改变 `View` 的不透明度（alpha 值）。接受非负数或百分比。

:::note
由于性能和规范合规性问题，iOS 上目前仅支持以上两个滤镜函数。未来计划使用 SwiftUI 替代 UIKit 来探索可能的解决方案。
:::

<div className="label basic android">Android</div>

以下滤镜函数仅在 Android 上可用：

- `blur`：使用[高斯模糊](https://en.wikipedia.org/wiki/Gaussian_blur)模糊 `View`，指定的长度值表示模糊算法中使用的半径。接受任何非负 DIP 值（不支持百分比）。值越大，模糊效果越强。
- `contrast`：改变 `View` 的对比度。接受非负数或百分比。
- `dropShadow`：在 `View` 的 alpha 蒙版周围添加阴影（只有 `View` 中 alpha 值非零的像素才会投射阴影）。接受一个可选的颜色值代表阴影颜色，以及 2 或 3 个长度值。如果指定 2 个长度值，分别表示 `offsetX` 和 `offsetY`，即阴影在 X 和 Y 方向的偏移量。如果指定第 3 个长度值，则表示高斯模糊的标准差——值越大阴影越模糊。更多参数详情请参阅 [DropShadowValue](./dropshadowvalue.md)。
- `grayscale`：按指定程度将 `View` 转换为[灰度](https://en.wikipedia.org/wiki/Grayscale)。接受非负数或百分比，其中 `1` 或 `100%` 表示完全灰度。
- `hueRotate`：改变 `View` 的[色相](https://en.wikipedia.org/wiki/Hue)。此函数的参数定义了色相在色轮上旋转的角度，例如 `360deg` 则没有效果。角度单位可以是 `deg` 或 `rad`。
- `invert`：反转 `View` 中的颜色。接受非负数或百分比，其中 `1` 或 `100%` 表示完全反转。
- `sepia`：将 `View` 转换为[棕褐色](<https://en.wikipedia.org/wiki/Sepia_(color)>)。接受非负数或百分比，其中 `1` 或 `100%` 表示完全棕褐色。
- `saturate`：改变 `View` 的[饱和度](https://en.wikipedia.org/wiki/Colorfulness)。接受非负数或百分比。

:::note
`blur` 和 `dropShadow` 仅支持 **Android 12+**。
:::

`filter` 接受由上述滤镜函数组成的对象数组，或模仿 [web 语法](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#syntax)的字符串。

| 类型 |
| ------ |
| array of objects: `{brightness: number\|string}`, `{opacity: number\|string}`, `{blur: number\|string}`, `{contrast: number\|string}`, `{dropShadow: DropShadowValue\|string}`, `{grayscale: number\|string}`, `{hueRotate: number\|string}`, `{invert: number\|string}`, `{sepia: number\|string}`, `{saturate: number\|string}` or string|

---

### `mixBlendMode`

:::note
`mixBlendMode` 仅在[新架构](/architecture/landing-page)下可用。
:::

控制 `View` 如何与其**层叠上下文**中的其他元素进行颜色混合。有关每种混合函数的完整概述，请查阅 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)。

如需更精细地控制哪些元素参与混合，请参阅 [isolation](layout-props#isolation)。

##### mixBlendMode 值

- `normal`：元素绘制在背景之上，不进行混合。
- `multiply`：将源颜色与目标颜色相乘并替换目标。
- `screen`：将背景和源颜色值的补色相乘，然后取结果的补色。
- `overlay`：根据背景颜色值进行正片叠底或滤色。
- `darken`：选择背景和源颜色中较暗的一个。
- `lighten`：选择背景和源颜色中较亮的一个。
- `color-dodge`：提亮背景颜色以反映源颜色。使用黑色绘制不会产生变化。
- `color-burn`：加暗背景颜色以反映源颜色。使用白色绘制不会产生变化。
- `hard-light`：根据源颜色值进行正片叠底或滤色。效果类似于在背景上打一盏强聚光灯。
- `soft-light`：根据源颜色值使颜色变暗或变亮。效果类似于在背景上打一盏漫射聚光灯。
- `difference`：从较亮的颜色中减去两个组成颜色中较暗的一个。
- `exclusion`：产生类似差值模式但对比度较低的效果。
- `hue`：使用源颜色的色相与背景颜色的饱和度和亮度创建颜色。
- `saturation`：使用源颜色的饱和度与背景颜色的色相和亮度创建颜色。
- `color`：使用源颜色的色相和饱和度与背景颜色的亮度创建颜色。此模式保留了背景的灰度级别，适用于为单色图像着色或为彩色图像添加色调。
- `luminosity`：使用源颜色的亮度与背景颜色的色相和饱和度创建颜色。产生与 color 模式相反的效果。

| 类型                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| enum(`'normal'`, `'multiply'`, `'screen'`, `'overlay'`, `'darken'`, `'lighten'`, `'color-dodge'`, `'color-burn'`, `'hard-light'`, `'soft-light'`, `'difference'`, `'exclusion'`, `'hue'`, `'saturation'`, `'color'`, `'luminosity'`) |

---

### `opacity`

| 类型   |
| ------ |
| number |

---

### `outlineColor`

:::note
`outlineColor` 仅在[新架构](/architecture/landing-page)下可用。
:::

设置元素轮廓的颜色。更多详情请参阅 [web 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color)。

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `outlineOffset`

:::note
`outlineOffset` 仅在[新架构](/architecture/landing-page)下可用。
:::

设置轮廓与元素边界之间的间距。不影响布局。更多详情请参阅 [web 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset)。

| 类型   |
| ------ |
| number |

---

### `outlineStyle`

:::note
`outlineStyle` 仅在[新架构](/architecture/landing-page)下可用。
:::

设置元素轮廓的样式。更多详情请参阅 [web 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style)。

| 类型                                    |
| --------------------------------------- |
| enum(`'solid'`, `'dotted'`, `'dashed'`) |

---

### `outlineWidth`

:::note
`outlineWidth` 仅在[新架构](/architecture/landing-page)下可用。
:::

绘制在元素边框外部的轮廓宽度。不影响布局。更多详情请参阅 [web 文档](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width)。

| 类型   |
| ------ |
| number |

---

### `pointerEvents`

控制 `View` 是否可以成为触摸事件的目标。

- `'auto'`：View 可以成为触摸事件的目标。
- `'none'`：View 永远不会成为触摸事件的目标。
- `'box-none'`：View 本身不会成为触摸事件的目标，但其子视图可以。
- `'box-only'`：View 可以成为触摸事件的目标，但其子视图不可以。

| 类型                                                  |
| ----------------------------------------------------- |
| enum(`'auto'`, `'box-none'`, `'box-only'`, `'none'` ) |

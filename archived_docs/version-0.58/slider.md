---
id: version-0.58-slider
title: Slider
original_id: slider
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

用于选择一个范围值的组件。

### 查看Props

* [View props...](view.md#props)

- [`style`](slider.md#style)
- [`disabled`](slider.md#disabled)
- [`maximumValue`](slider.md#maximumvalue)
- [`minimumTrackTintColor`](slider.md#minimumtracktintcolor)
- [`minimumValue`](slider.md#minimumvalue)
- [`onSlidingComplete`](slider.md#onslidingcomplete)
- [`onValueChange`](slider.md#onvaluechange)
- [`step`](slider.md#step)
- [`maximumTrackTintColor`](slider.md#maximumtracktintcolor)
- [`testID`](slider.md#testid)
- [`value`](slider.md#value)
- [`thumbTintColor`](slider.md#thumbtintcolor)
- [`maximumTrackImage`](slider.md#maximumtrackimage)
- [`minimumTrackImage`](slider.md#minimumtrackimage)
- [`thumbImage`](slider.md#thumbimage)
- [`trackImage`](slider.md#trackimage)

---

# 文档

## Props

### `style`

Used to style and layout the `Slider`. See `StyleSheet.js` and `ViewStylePropTypes.js` for more info.

| 类型       | 必填 |
| ---------- | -------- |
| View.style | 否       |

---

### `disabled`

如果为true，用户就不能移动滑块。默认为false。

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `maximumValue`

滑块的最大值（当滑块滑到最右端时表示的值）。默认为1。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `minimumTrackTintColor`

滑块左侧轨道的颜色。在iOS上默认为一个蓝色的渐变色。

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `minimumValue`

滑块的最小值（当滑块滑到最左端时表示的值）。默认为0。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `onSlidingComplete`

用户松开滑块的时候调用此回调，无论值是否变化。回调值为当前值。

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onValueChange`

在用户拖动滑块的过程中不断调用此回调。

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `step`

滑块的步长（拖动变化的最小单元）。这个值应该在0到(maximumValue - minimumValue)之间。默认值为0。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `maximumTrackTintColor`

滑块右侧轨道的颜色。在iOS上默认为一个灰色的渐变色。

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `testID`

Used to locate this view in UI automation tests.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `value`

滑块的初始值。这个值应该在最小值和最大值之间。默认值是0。

_注意：这不是一个受控组件！_也就是说，你不需要在滑动过程中去手动更新值。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `thumbTintColor`

Color of the foreground switch grip.

| 类型               | 必填 | 平台 |
| ------------------ | -------- | -------- |
| [color](colors.md) | 否       | Android  |

---

### `maximumTrackImage`

指定一个滑块右侧轨道背景图。仅支持静态图片。图片最左边的像素会被平铺直至填满右侧轨道。

| 类型                   | 必填 | 平台 |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | 否       | iOS      |

---

### `minimumTrackImage`

指定一个滑块左侧轨道背景图。仅支持静态图片。图片最右边的像素会被平铺直至填满左侧轨道。

| 类型                   | 必填 | 平台 |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | 否       | iOS      |

---

### `thumbImage`

给滑块设置一张图片。只支持静态图片。

| 类型                   | 必填 | 平台 |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | 否       | iOS      |

---

### `trackImage`

给轨道设置一张背景图。只支持静态图片。图片最中央的像素会被平铺直至填满轨道。

| 类型                   | 必填 | 平台 |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | 否       | iOS      |

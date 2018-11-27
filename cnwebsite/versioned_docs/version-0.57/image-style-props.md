---
id: version-0.57-image-style-props
title: Image样式属性
original_id: image-style-props
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

### Props

* [`borderTopRightRadius`](image-style-props.md#bordertoprightradius)
* [`backfaceVisibility`](image-style-props.md#backfacevisibility)
* [`borderBottomLeftRadius`](image-style-props.md#borderbottomleftradius)
* [`borderBottomRightRadius`](image-style-props.md#borderbottomrightradius)
* [`borderColor`](image-style-props.md#bordercolor)
* [`borderRadius`](image-style-props.md#borderradius)
* [`borderTopLeftRadius`](image-style-props.md#bordertopleftradius)
* [`backgroundColor`](image-style-props.md#backgroundcolor)
* [`borderWidth`](image-style-props.md#borderwidth)
* [`opacity`](image-style-props.md#opacity)
* [`overflow`](image-style-props.md#overflow)
* [`resizeMode`](image-style-props.md#resizemode)
* [`tintColor`](image-style-props.md#tintcolor)
* [`overlayColor`](image-style-props.md#overlaycolor)

---

# 文档

## Props

### `borderTopRightRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `backfaceVisibility`

| 类型                      | 必填 |
| ------------------------- | ---- |
| enum('visible', 'hidden') | 否   |

---

### `borderBottomLeftRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderBottomRightRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderTopLeftRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `backgroundColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderWidth`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `opacity`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `overflow`

| 类型                      | 必填 |
| ------------------------- | ---- |
| enum('visible', 'hidden') | 否   |

---

### `resizeMode`

| 类型                         | 必填 |
| ---------------------------- | ---- |
| Object.keys(ImageResizeMode) | 否   |

---

### `tintColor`

为所有非透明的像素指定一个颜色。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `overlayColor`

当图片有圆角的时候，指定一个颜色用于填充圆角处的空白。虽然一般情况下圆角处是透明的，但在某些情况下，Android 并不支持圆角透明，比如：

* 某些 resize 模式比如'contain'
* GIF 动画

常见的用法就是在不能圆角透明时，设置`overlayColor`和背景色一致。

详细说明可参考<http://frescolib.org/rounded-corners-and-circles.md>。

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | 否   | Android |

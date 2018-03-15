---
id: image-style-props
title: Image样式属性
---

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

Changes the color of all the non-transparent pixels to the tintColor.

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `overlayColor`

When the image has rounded corners, specifying an overlayColor will cause the remaining space in the corners to be filled with a solid color. This is useful in cases which are not supported by the Android implementation of rounded corners:

* Certain resize modes, such as 'contain'
* Animated GIFs

A typical way to use this prop is with images displayed on a solid background and setting the `overlayColor` to the same color as the background.

For details of how this works under the hood, see http://frescolib.org/rounded-corners-and-circles.md

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | 否   | Android |

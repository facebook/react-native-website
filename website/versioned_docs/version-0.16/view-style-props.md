---
id: version-0.16-view-style-props
title: View Style Props
original_id: view-style-props
---

### Props

- [`borderStyle`](view-style-props.md#borderstyle)
- [`backfaceVisibility`](view-style-props.md#backfacevisibility)
- [`borderBottomColor`](view-style-props.md#borderbottomcolor)
- [`borderBottomLeftRadius`](view-style-props.md#borderbottomleftradius)
- [`borderBottomRightRadius`](view-style-props.md#borderbottomrightradius)
- [`borderBottomWidth`](view-style-props.md#borderbottomwidth)
- [`borderColor`](view-style-props.md#bordercolor)
- [`borderLeftColor`](view-style-props.md#borderleftcolor)
- [`borderLeftWidth`](view-style-props.md#borderleftwidth)
- [`borderRadius`](view-style-props.md#borderradius)
- [`borderRightColor`](view-style-props.md#borderrightcolor)
- [`borderRightWidth`](view-style-props.md#borderrightwidth)
- [`backgroundColor`](view-style-props.md#backgroundcolor)
- [`borderTopColor`](view-style-props.md#bordertopcolor)
- [`borderTopLeftRadius`](view-style-props.md#bordertopleftradius)
- [`borderTopRightRadius`](view-style-props.md#bordertoprightradius)
- [`borderTopWidth`](view-style-props.md#bordertopwidth)
- [`borderWidth`](view-style-props.md#borderwidth)
- [`opacity`](view-style-props.md#opacity)
- [`overflow`](view-style-props.md#overflow)
- [`shadowColor`](view-style-props.md#shadowcolor)
- [`shadowOffset`](view-style-props.md#shadowoffset)
- [`shadowOpacity`](view-style-props.md#shadowopacity)
- [`shadowRadius`](view-style-props.md#shadowradius)
- [`elevation`](view-style-props.md#elevation)

---

# Reference

## Props

### `borderStyle`

| Type                              | Required |
| --------------------------------- | -------- |
| enum('solid', 'dotted', 'dashed') | No       |

---

### `backfaceVisibility`

| Type                      | Required |
| ------------------------- | -------- |
| enum('visible', 'hidden') | No       |

---

### `borderBottomColor`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `borderBottomLeftRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderBottomRightRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderBottomWidth`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderColor`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `borderLeftColor`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `borderLeftWidth`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderRightColor`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `borderRightWidth`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `backgroundColor`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `borderTopColor`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `borderTopLeftRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderTopRightRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderTopWidth`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderWidth`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `opacity`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `overflow`

| Type                      | Required |
| ------------------------- | -------- |
| enum('visible', 'hidden') | No       |

---

### `shadowColor`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `shadowOffset`

| Type                                   | Required |
| -------------------------------------- | -------- |
| object: {width: number,height: number} | No       |

---

### `shadowOpacity`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `shadowRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `elevation`

(Android-only) Sets the elevation of a view, using Android's underlying [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation). This adds a drop shadow to the item and affects z-order for overlapping views. Only supported on Android 5.0+, has no effect on earlier versions.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---
id: version-0.25-text-style-props
title: Text Style Props
original_id: text-style-props
---

### Props

- [`textShadowColor`](text-style-props.md#textshadowcolor)
- [`color`](text-style-props.md#color)
- [`fontSize`](text-style-props.md#fontsize)
- [`fontStyle`](text-style-props.md#fontstyle)
- [`fontWeight`](text-style-props.md#fontweight)
- [`lineHeight`](text-style-props.md#lineheight)
- [`textAlign`](text-style-props.md#textalign)
- [`textDecorationLine`](text-style-props.md#textdecorationline)
- [`fontFamily`](text-style-props.md#fontfamily)
- [`textShadowOffset`](text-style-props.md#textshadowoffset)
- [`textShadowRadius`](text-style-props.md#textshadowradius)
- [`textAlignVertical`](text-style-props.md#textalignvertical)
- [`letterSpacing`](text-style-props.md#letterspacing)
- [`textDecorationColor`](text-style-props.md#textdecorationcolor)
- [`textDecorationStyle`](text-style-props.md#textdecorationstyle)
- [`writingDirection`](text-style-props.md#writingdirection)

---

# Reference

## Props

### `textShadowColor`

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `color`

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `fontSize`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `fontStyle`

| Type                     | Required |
| ------------------------ | -------- |
| enum('normal', 'italic') | No       |

---

### `fontWeight`

Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

| Type                                                                                  | Required |
| ------------------------------------------------------------------------------------- | -------- |
| enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900') | No       |

---

### `lineHeight`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `textAlign`

Specifies text alignment. The value 'justify' is only supported on iOS.

| Type                                               | Required |
| -------------------------------------------------- | -------- |
| enum('auto', 'left', 'right', 'center', 'justify') | No       |

---

### `textDecorationLine`

| Type                                                                | Required |
| ------------------------------------------------------------------- | -------- |
| enum('none', 'underline', 'line-through', 'underline line-through') | No       |

---

### `fontFamily`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `textShadowOffset`

| Type                                   | Required |
| -------------------------------------- | -------- |
| object: {width: number,height: number} | No       |

---

### `textShadowRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `textAlignVertical`

| Type                                    | Required | Platform |
| --------------------------------------- | -------- | -------- |
| enum('auto', 'top', 'bottom', 'center') | No       | Android  |

---

### `letterSpacing`

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `textDecorationColor`

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |

---

### `textDecorationStyle`

| Type                                        | Required | Platform |
| ------------------------------------------- | -------- | -------- |
| enum('solid', 'double', 'dotted', 'dashed') | No       | iOS      |

---

### `writingDirection`

| Type                       | Required | Platform |
| -------------------------- | -------- | -------- |
| enum('auto', 'ltr', 'rtl') | No       | iOS      |

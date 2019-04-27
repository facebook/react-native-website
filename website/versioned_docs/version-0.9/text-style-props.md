---
id: version-0.9-text-style-props
title: Text Style Props
original_id: text-style-props
---

### Props

- [`textAlign`](text-style-props.md#textalign)
- [`color`](text-style-props.md#color)
- [`fontSize`](text-style-props.md#fontsize)
- [`fontStyle`](text-style-props.md#fontstyle)
- [`fontWeight`](text-style-props.md#fontweight)
- [`lineHeight`](text-style-props.md#lineheight)
- [`fontFamily`](text-style-props.md#fontfamily)
- [`letterSpacing`](text-style-props.md#letterspacing)
- [`textDecorationColor`](text-style-props.md#textdecorationcolor)
- [`textDecorationLine`](text-style-props.md#textdecorationline)
- [`textDecorationStyle`](text-style-props.md#textdecorationstyle)
- [`writingDirection`](text-style-props.md#writingdirection)

---

# Reference

## Props

### `textAlign`

Specifies text alignment. The value 'justify' is only supported on iOS.

| Type                                               | Required |
| -------------------------------------------------- | -------- |
| enum('auto', 'left', 'right', 'center', 'justify') | No       |

---

### `color`

| Type   | Required |
| ------ | -------- |
| string | No       |

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

### `fontFamily`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `letterSpacing`

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `textDecorationColor`

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |

---

### `textDecorationLine`

| Type                                                                | Required | Platform |
| ------------------------------------------------------------------- | -------- | -------- |
| enum('none', 'underline', 'line-through', 'underline line-through') | No       | iOS      |

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

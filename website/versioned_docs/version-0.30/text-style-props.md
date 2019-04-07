---
id: version-0.30-text-style-props
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

| Type                  | Required |
| --------------------- | -------- |
| ReactPropTypes.number | No       |

---

### `fontStyle`

| Type                                       | Required |
| ------------------------------------------ | -------- |
| ReactPropTypes.oneOf(['normal', 'italic']) | No       |

---

### `fontWeight`

Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

| Type | Required |
| ---- | -------- |


| ReactPropTypes.oneOf( ['normal' /*default*/, 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] ) | No |

---

### `lineHeight`

| Type                  | Required |
| --------------------- | -------- |
| ReactPropTypes.number | No       |

---

### `textAlign`

Specifies text alignment. The value 'justify' is only supported on iOS and fallbacks to `left` on Android.

| Type | Required |
| ---- | -------- |


| ReactPropTypes.oneOf( ['auto' /*default*/, 'left', 'right', 'center', 'justify'] ) | No |

---

### `textDecorationLine`

| Type | Required |
| ---- | -------- |


| ReactPropTypes.oneOf( ['none' /*default*/, 'underline', 'line-through', 'underline line-through'] ) | No |

---

### `fontFamily`

| Type                  | Required |
| --------------------- | -------- |
| ReactPropTypes.string | No       |

---

### `textShadowOffset`

| Type | Required |
| ---- | -------- |


| ReactPropTypes.shape( {width: ReactPropTypes.number, height: ReactPropTypes.number} ) | No |

---

### `textShadowRadius`

| Type                  | Required |
| --------------------- | -------- |
| ReactPropTypes.number | No       |

---

### `textAlignVertical`

| Type | Required | Platform |
| ---- | -------- | -------- |


| ReactPropTypes.oneOf( ['auto' /*default*/, 'top', 'bottom', 'center'] ) | No | Android |

---

### `letterSpacing`

| Type                  | Required | Platform |
| --------------------- | -------- | -------- |
| ReactPropTypes.number | No       | iOS      |

---

### `textDecorationColor`

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |

---

### `textDecorationStyle`

| Type | Required | Platform |
| ---- | -------- | -------- |


| ReactPropTypes.oneOf( ['solid' /*default*/, 'double', 'dotted','dashed'] ) | No | iOS |

---

### `writingDirection`

| Type | Required | Platform |
| ---- | -------- | -------- |


| ReactPropTypes.oneOf( ['auto' /*default*/, 'ltr', 'rtl'] ) | No | iOS |

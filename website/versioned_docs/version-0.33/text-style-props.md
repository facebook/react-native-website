---
id: version-0.33-text-style-props
title: Text Style Props
original_id: text-style-props
---

### Props

- [`textDecorationLine`](text-style-props.md#textdecorationline)
- [`color`](text-style-props.md#color)
- [`fontSize`](text-style-props.md#fontsize)
- [`fontStyle`](text-style-props.md#fontstyle)
- [`fontVariant`](text-style-props.md#fontvariant)
- [`fontWeight`](text-style-props.md#fontweight)
- [`lineHeight`](text-style-props.md#lineheight)
- [`textAlign`](text-style-props.md#textalign)
- [`fontFamily`](text-style-props.md#fontfamily)
- [`textShadowColor`](text-style-props.md#textshadowcolor)
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

### `textDecorationLine`

| Type | Required |
| ---- | -------- |


| ReactPropTypes.oneOf( ['none' /*default*/, 'underline', 'line-through', 'underline line-through'] ) | No |

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

### `fontVariant`

| Type | Required |
| ---- | -------- |


| ReactPropTypes.arrayOf( ReactPropTypes.oneOf([ 'small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums', ]) ) | No |

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

### `fontFamily`

| Type                  | Required |
| --------------------- | -------- |
| ReactPropTypes.string | No       |

---

### `textShadowColor`

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

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

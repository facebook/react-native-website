---
id: text-style-props
title: Text Style Props
---

# Reference

## Props

### `textShadowOffset`

| Type                                   | Required |
| -------------------------------------- | -------- |
| object: {width: number,height: number} | No       |

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

Specifies text alignment. The value 'justify' is only supported on iOS and fallbacks to `left` on Android.

| Type                                               | Required |
| -------------------------------------------------- | -------- |
| enum('auto', 'left', 'right', 'center', 'justify') | No       |

---

### `textDecorationLine`

| Type                                                                | Required |
| ------------------------------------------------------------------- | -------- |
| enum('none', 'underline', 'line-through', 'underline line-through') | No       |

---

### `textShadowColor`

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `fontFamily`

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `textShadowRadius`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `includeFontPadding`

Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders. With some fonts, this padding can make text look slightly misaligned when centered vertically. For best results also set `textAlignVertical` to `center`. Default is true.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `textAlignVertical`

| Type                                    | Required | Platform |
| --------------------------------------- | -------- | -------- |
| enum('auto', 'top', 'bottom', 'center') | No       | Android  |

---

### `fontVariant`

| Type                                                                                             | Required | Platform |
| ------------------------------------------------------------------------------------------------ | -------- | -------- |
| array of enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums') | No       | iOS      |

---

### `letterSpacing`

| Type   | Required | Platform            |
| ------ | -------- | ------------------- |
| number | No       | iOS, Android >= 5.0 |

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

### `textTransform`

| Type                                                 | Required |
| ---------------------------------------------------- | -------- |
| enum('none', 'uppercase', 'lowercase', 'capitalize') | No       |

---

### `writingDirection`

| Type                       | Required | Platform |
| -------------------------- | -------- | -------- |
| enum('auto', 'ltr', 'rtl') | No       | iOS      |

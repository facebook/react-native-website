---
id: version-0.61-text-style-props
title: Text样式属性
original_id: text-style-props
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

# 文档

## Props

### `textShadowOffset`

| 类型                                   | 必填 |
| -------------------------------------- | -------- |
| object: {width: number,height: number} | 否       |

---

### `color`

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `fontSize`

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `fontStyle`

| 类型                     | 必填 |
| ------------------------ | -------- |
| enum('normal', 'italic') | 否       |

---

### `fontWeight`

Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

| 类型                                                                                  | 必填 |
| ------------------------------------------------------------------------------------- | -------- |
| enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900') | 否       |

---

### `lineHeight`

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `textAlign`

Specifies text alignment. The value 'justify' is only supported on iOS and fallbacks to `left` on Android.

| 类型                                               | 必填 |
| -------------------------------------------------- | -------- |
| enum('auto', 'left', 'right', 'center', 'justify') | 否       |

---

### `textDecorationLine`

| 类型                                                                | 必填 |
| ------------------------------------------------------------------- | -------- |
| enum('none', 'underline', 'line-through', 'underline line-through') | 否       |

---

### `textShadowColor`

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `fontFamily`

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `textShadowRadius`

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `includeFontPadding`

Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders. With some fonts, this padding can make text look slightly misaligned when centered vertically. For best results also set `textAlignVertical` to `center`. Default is true.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | Android  |

---

### `textAlignVertical`

| 类型                                    | 必填 | 平台 |
| --------------------------------------- | -------- | -------- |
| enum('auto', 'top', 'bottom', 'center') | 否       | Android  |

---

### `fontVariant`

| 类型                                                                                             | 必填 | 平台 |
| ------------------------------------------------------------------------------------------------ | -------- | -------- |
| array of enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums') | 否       | iOS      |

---

### `letterSpacing`

| 类型   | 必填 | 平台 |
| ------ | -------- | ------------------- |
| number | 否       | iOS, Android >= 5.0 |

---

### `textDecorationColor`

| 类型               | 必填 | 平台 |
| ------------------ | -------- | -------- |
| [color](colors.md) | 否       | iOS      |

---

### `textDecorationStyle`

| 类型                                        | 必填 | 平台 |
| ------------------------------------------- | -------- | -------- |
| enum('solid', 'double', 'dotted', 'dashed') | 否       | iOS      |

---

### `textTransform`

| 类型                                                 | 必填 |
| ---------------------------------------------------- | -------- |
| enum('none', 'uppercase', 'lowercase', 'capitalize') | No       |

---

### `writingDirection`

| 类型                       | 必填 | 平台 |
| -------------------------- | -------- | -------- |
| enum('auto', 'ltr', 'rtl') | 否       | iOS      |

---
id: picker-item
title: Picker.Item
---

Individual selectable item in a [Picker](picker.md).

### 查看 Props

- [`label`](picker-item.md#label)
- [`color`](picker-item.md#color)
- [`testID`](picker-item.md#testid)
- [`value`](picker-item.md#value)

---

# 文档

## Props

### `label`

Text to display for this item.

| 类型   | 必需 |
| ------ | ---- |
| string | 是   |

### `color`

文本的颜色。

| 类型               | 必需 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

### `testID`

Used to locate the item in end-to-end tests.

| 类型   | 必需 |
| ------ | ---- |
| string | 否   |

### `value`

The value to be passed to picker's `onValueChange` callback when this item is selected. Can be a string or an integer.

| 类型 | 必需 | 平台    |
| ---- | ---- | ------- |
| any  | 否   | Android |

---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

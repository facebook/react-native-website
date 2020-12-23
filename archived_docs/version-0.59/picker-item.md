---
id: version-0.59-picker-item
title: Picker.Item
original_id: picker-item
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

Individual selectable item in a [Picker](picker.md).

### 查看 Props

* [`label`](picker-item.md#label)
* [`color`](picker-item.md#color)
* [`testID`](picker-item.md#testid)
* [`value`](picker-item.md#value)

---

# 文档

## Props

### `label`

Text to display for this item.

| 类型   | 必填 |
| ------ | ---- |
| string | 是   |

### `color`

文本的颜色。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

### `testID`

Used to locate the item in end-to-end tests.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

### `value`

The value to be passed to picker's `onValueChange` callback when this item is selected. Can be a string or an integer.

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| any  | 否   | Android |

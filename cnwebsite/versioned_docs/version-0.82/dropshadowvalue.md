---
id: dropshadowvalue
title: DropShadowValue 对象类型
---

`DropShadowValue` 对象类型由 [`filter`](./view-style-props.md#filter) 样式属性的 `dropShadow` 函数所使用。它由 2 或 3 个长度和一个可选的颜色组成。这些值共同定义了投影的颜色、位置和模糊程度。

## 示例

```js
{
  offsetX: 10,
  offsetY: -3,
  standardDeviation: '15px',
  color: 'blue',
}
```

## 属性与值

### `offsetX`

在 x 轴上的偏移量。它可以是正数或负数。正数表示向右，负数表示向左。

| 类型             | 可选 |
| ---------------- | ---- |
| number \| string | 否   |

### `offsetY`

在 y 轴上的偏移量。它可以是正数或负数。正数表示向上，负数表示向下。

| 类型             | 可选 |
| ---------------- | ---- |
| number \| string | 否   |

### `standardDeviation`

表示用于 [高斯模糊](https://en.wikipedia.org/wiki/Gaussian_blur) 算法的标准差。值越大，阴影越模糊。仅非负值有效。默认值为 0。

| 类型            | 可选 |
| --------------- | ---- |
| numer \| string | 是   |

### `color`

阴影的颜色。默认值为 `black`。

| 类型                 | 可选 |
| -------------------- | ---- |
| [color](./colors.md) | 是   |

## 被下列属性使用

- [`filter`](./view-style-props.md#filter)

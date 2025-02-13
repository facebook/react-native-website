---
id: boxshadowvalue
title: BoxShadowValue 对象类型
---

`BoxShadowValue` 对象类型由 [`boxShadow`](./view-style-props.md#boxshadow) 样式属性所使用。它由 2-4 个长度、一个可选的颜色和一个可选的 `inset` 布尔值组成。这些值共同定义了盒阴影的颜色、位置、大小和模糊程度。

## 示例

```js
{
  offsetX: 10,
  offsetY: -3,
  blurRadius: '15px',
  spreadDistance: '10px',
  color: 'red',
  inset: true,
}
```

## 键和值

### `offsetX`

在 x 轴上的偏移量。它可以是正数或负数。正数表示向右，负数表示向左。

| 类型             | 可选 |
| ---------------- | -------- |
| number \| string | No       |

### `offsetY`

在 y 轴上的偏移量。它可以是正数或负数。正数表示向上，负数表示向下。

| 类型             | 可选 |
| ---------------- | -------- |
| number \| string | No       |

### `blurRadius`

Represents the radius used in the [Guassian blur](https://en.wikipedia.org/wiki/Gaussian_blur) algorithm. The larger the value the blurrier the shadow is. Only non-negative values are valid. The default is 0.

| Type            | Optional |
| --------------- | -------- |
| numer \| string | Yes      |

### `spreadDistance`

How much larger or smaller the shadow grows or shrinks. A positive value will grow the shadow, a negative value will shrink the shadow.

| Type            | Optional |
| --------------- | -------- |
| numer \| string | Yes      |

### `color`

The color of the shadow. The default is `black`.

| Type                 | Optional |
| -------------------- | -------- |
| [color](./colors.md) | Yes      |

### `inset`

Whether the shadow is inset or not. Inset shadows will appear around the inside of the element's border box as opposed to the outside.

| Type    | Optional |
| ------- | -------- |
| boolean | Yes      |

## Used by

- [`boxShadow`](./view-style-props.md#boxshadow)

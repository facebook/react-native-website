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
| ---------------- | ---- |
| number \| string | No   |

### `offsetY`

在 y 轴上的偏移量。它可以是正数或负数。正数表示向上，负数表示向下。

| 类型             | 可选 |
| ---------------- | ---- |
| number \| string | No   |

### `blurRadius`

表示用于 [高斯模糊](https://en.wikipedia.org/wiki/Gaussian_blur) 算法的半径。值越大，阴影越模糊。仅非负值有效。默认值为 0。

| 类型            | 可选 |
| --------------- | ---- |
| numer \| string | Yes  |

### `spreadDistance`

阴影扩展的距离。正值会使阴影变大，负值会使阴影变小。

| 类型            | 可选 |
| --------------- | ---- |
| numer \| string | Yes  |

### `color`

阴影的颜色。默认值为 `black`。

| 类型                 | 可选 |
| -------------------- | ---- |
| [color](./colors.md) | Yes  |

### `inset`

是否为内阴影。内阴影会出现在元素的边框盒内部，而不是外部。

| 类型    | 可选 |
| ------- | ---- |
| boolean | Yes  |

## 由以下对象使用

- [`boxShadow`](./view-style-props.md#boxshadow)

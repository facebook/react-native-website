---
id: boxshadowvalue
title: BoxShadowValue 对象类型
---

`BoxShadowValue` 对象由 [`boxShadow`](./view-style-props.md#boxshadow) 样式属性所使用。它由 2-4 个长度值、一个可选的颜色和一个可选的 `inset` 布尔值组成，这些值共同定义了盒阴影的颜色、位置、大小和模糊程度。

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

## 属性与值

### `offsetX`

x 轴上的偏移量，可以是正数或负数。正值表示向右，负值表示向左。

| 类型             | 可选 |
| ---------------- | ---- |
| number \| string | 否   |

### `offsetY`

y 轴上的偏移量，可以是正数或负数。正值表示向上，负值表示向下。

| 类型             | 可选 |
| ---------------- | ---- |
| number \| string | 否   |

### `blurRadius`

用于[高斯模糊](https://en.wikipedia.org/wiki/Gaussian_blur)算法的半径。值越大，阴影越模糊。仅接受非负值。默认值为 0。

| 类型             | 可选 |
| ---------------- | ---- |
| number \| string | 是   |

### `spreadDistance`

阴影扩展或收缩的距离。正值会使阴影变大，负值会使阴影变小。

| 类型             | 可选 |
| ---------------- | ---- |
| number \| string | 是   |

### `color`

阴影的颜色。默认值为 `black`。

| 类型                 | 可选 |
| -------------------- | ---- |
| [color](./colors.md) | 是   |

### `inset`

是否为内阴影。内阴影会出现在元素的边框盒内部，而不是外部。

| 类型    | 可选 |
| ------- | ---- |
| boolean | 是   |

## 被下列属性使用

- [`boxShadow`](./view-style-props.md#boxshadow)

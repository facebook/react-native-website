---
id: layoutevent
title: 布局事件对象
---

`LayoutEvent` object is returned in the callback as a result of component layout change, for example `onLayout` in [View](view) component.

## 示例

```js
{
    layout: {
        width: 520,
        height: 70.5,
        x: 0,
        y: 42.5
    },
    target: 1127
}
```

## 属性与值

### `height`

Height of the component after the layout changes.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `width`

Width of the component after the layout changes.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `x`

Component X coordinate inside the parent component.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `y`

Component Y coordinate inside the parent component.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `target`

The node id of the element receiving the PressEvent.

| Type                        | Optional |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

## 被下列组件引用

- [`Image`](image)
- [`Pressable`](pressable)
- [`ScrollView`](scrollview)
- [`Text`](text)
- [`TextInput`](textinput)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
- [`View`](view)

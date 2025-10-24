---
id: layoutevent
title: LayoutEvent 对象类型
---

`LayoutEvent` 对象作为组件布局变化的结果在回调中返回，例如 [View](view) 组件中的 `onLayout`。

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

布局变化后组件的高度。

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `width`

布局变化后组件的宽度。

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `x`

组件在父组件内的 X 坐标。

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `y`

组件在父组件内的 Y 坐标。

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `target`

接收 LayoutEvent 的元素的节点 ID。

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

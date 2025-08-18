---
id: pressevent
title: 点击事件对象
---

点击事件对象作为用户按压交互的结果在回调中返回，例如 [Button](button) 组件中的 `onPress`。

## 示例

```js
{
    changedTouches: [PressEvent],
    identifier: 1,
    locationX: 8,
    locationY: 4.5,
    pageX: 24,
    pageY: 49.5,
    target: 1127,
    timestamp: 85131876.58868201,
    touches: []
}
```

## 属性与值

### `changedTouches`

自上次事件以来发生变化的所有点击事件对象数组。

| 类型             | 可选 |
| ---------------- | ---- |
| 点击事件对象数组 | 否   |

### `force` <div class="label ios">iOS</div>

3D Touch 按压期间使用的力度。返回范围从 `0.0` 到 `1.0` 的浮点值。

| 类型   | 可选 |
| ------ | ---- |
| number | Yes  |

### `identifier`

为事件分配的唯一数字标识符。

| 类型   | 可选 |
| ------ | ---- |
| number | No   |

### `locationX`

在可触摸区域内触摸原点的 X 坐标（相对于元素）。

| 类型   | 可选 |
| ------ | ---- |
| number | No   |

### `locationY`

在可触摸区域内触摸原点的 Y 坐标（相对于元素）。

| 类型   | 可选 |
| ------ | ---- |
| number | No   |

### `pageX`

触摸原点在屏幕上的 X 坐标（相对于根视图）。

| 类型   | 可选 |
| ------ | ---- |
| number | No   |

### `pageY`

触摸原点在屏幕上的 Y 坐标（相对于根视图）。

| 类型   | 可选 |
| ------ | ---- |
| number | No   |

### `target`

接收点击事件对象的元素的节点 id。

| 类型                        | 可选 |
| --------------------------- | ---- |
| number, `null`, `undefined` | No   |

### `timestamp`

当点击事件对象发生时的时间戳。值以毫秒为单位表示。

| 类型   | 可选 |
| ------ | ---- |
| number | No   |

### `touches`

屏幕上所有当前点击事件对象的数组。

| 类型             | 可选 |
| ---------------- | ---- |
| 点击事件对象数组 | No   |

## 使用点击事件对象的组件

- [`Button`](button)
- [`PanResponder`](panresponder)
- [`Pressable`](pressable)
- [`ScrollView`](scrollview)
- [`Text`](text)
- [`TextInput`](textinput)
- [`TouchableHighlight`](touchablenativefeedback)
- [`TouchableOpacity`](touchablewithoutfeedback)
- [`TouchableNativeFeedback`](touchablenativefeedback)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
- [`View`](view)

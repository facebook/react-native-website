---
id: targetevent
title: TargetEvent 对象类型
---

`TargetEvent` 对象作为焦点变化的结果在回调中返回，例如 [TextInput](textinput) 组件中的 `onFocus` 或 `onBlur`。

## 示例

```
{
    target: 1127
}
```

## 属性与值

### `target`

接收 TargetEvent 的元素的节点 ID。

| Type                        | Optional |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

## 被下列组件引用

- [`TextInput`](textinput)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)

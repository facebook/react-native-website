---
id: version-0.56-switch
title: Switch
original_id: switch
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

跨平台通用的“开关”组件。  

注意这是一个“受控组件”（controlled component）。你必须使用`onValueChange`回调来更新`value`属性以响应用户的操作。如果不更新`value`属性，组件只会按一开始给定的`value`值来渲染且保持不变，看上去就像完全点不动。  

@keyword checkbox @keyword toggle @keyword 单选 @keyword 多选

### 查看Props

* [View props...](view.md#props)

- [`disabled`](switch.md#disabled)
- [`onTintColor`](switch.md#ontintcolor)
- [`onValueChange`](switch.md#onvaluechange)
- [`testID`](switch.md#testid)
- [`thumbTintColor`](switch.md#thumbtintcolor)
- [`tintColor`](switch.md#tintcolor)
- [`value`](switch.md#value)

---

# 文档

## Props

### `disabled`

如果为`true`则禁用此组件的交互。

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `onTintColor`

开启状态时的背景颜色。

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `onValueChange`

当值改变的时候调用此回调函数，参数为新的值。

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `testID`

用来在端到端测试中定位此视图。

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `thumbTintColor`

开关上圆形按钮的背景颜色。在iOS上设置此颜色会丢失按钮的投影。

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `tintColor`

关闭状态时的边框颜色(iOS)或背景颜色(Android)。

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `value`

表示此开关是否打开。默认为false（关闭状态）。

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---
id: version-0.62-picker
title: Picker
original_id: picker
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

本组件可以在 iOS 和 Android 上渲染原生的选择器（Picker）。用例：

```js
<Picker
  selectedValue={this.state.language}
  style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
```

---

# 文档

## Props

继承所有[View Props](view.md#props).

### `onValueChange`

某一项被选中时执行此回调。调用时带有如下参数：

- `itemValue`: 被选中项的`value`属性
- `itemPosition`: 被选中项在 picker 中的索引位置

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `selectedValue`

默认选中的值。可以是字符串或整数。

| 类型 | 必填 |
| ---- | ---- |
| any  | 否   |

---

### `style`

| 类型            | 必填 |
| --------------- | ---- |
| pickerStyleType | 否   |

---

### `testID`

用于在端对端测试中定位此视图。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `enabled`

如果设为 false，则会禁用此选择器。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `mode`

在 Android 上，可以指定在用户点击选择器时，以怎样的形式呈现选项：

- 'dialog': 显示一个模态对话框。默认选项。
- 'dropdown': 以选择器所在位置为锚点展开一个下拉框。

| 类型                       | 必填 | 平台    |
| -------------------------- | ---- | ------- |
| enum('dialog', 'dropdown') | 否   | Android |

---

### `prompt`

设置选择器的提示字符串。在 Android 的对话框模式中用作对话框的标题。

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | 否   | Android |

---

### `itemStyle`

指定应用在每项标签上的样式。

| 类型                               | 必填 | 平台 |
| ---------------------------------- | ---- | ---- |
| [text styles](text-style-props.md) | 否   | iOS  |

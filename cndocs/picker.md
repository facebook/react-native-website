---
id: picker
title: Picker
---

Renders the native picker component on iOS and Android. Example:

    <Picker
      selectedValue={this.state.language}
      onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>

### Props

* [View props...](view.md#props)

- [`onValueChange`](picker.md#onvaluechange)
- [`selectedValue`](picker.md#selectedvalue)
- [`style`](picker.md#style)
- [`testID`](picker.md#testid)
- [`enabled`](picker.md#enabled)
- [`mode`](picker.md#mode)
- [`prompt`](picker.md#prompt)
- [`itemStyle`](picker.md#itemstyle)

---

# 文档

## Props

### `onValueChange`

Callback for when an item is selected. This is called with the following parameters:

* `itemValue`: the `value` prop of the item that was selected
* `itemPosition`: the index of the selected item in this picker

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `selectedValue`

Value matching value of one of the items. Can be a string or an integer.

| 类型 | 必填 |
| ---- | -------- |
| any  | 否       |

---

### `style`

| 类型            | 必填 |
| --------------- | -------- |
| pickerStyleType | 否       |

---

### `testID`

Used to locate this view in end-to-end tests.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `enabled`

If set to false, the picker will be disabled, i.e. the user will not be able to make a selection.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | Android  |

---

### `mode`

On Android, specifies how to display the selection items when the user taps on the picker:

* 'dialog': Show a modal dialog. This is the default.
* 'dropdown': Shows a dropdown anchored to the picker view

| 类型                       | 必填 | 平台 |
| -------------------------- | -------- | -------- |
| enum('dialog', 'dropdown') | 否       | Android  |

---

### `prompt`

Prompt string for this picker, used on Android in dialog mode as the title of the dialog.

| 类型   | 必填 | 平台 |
| ------ | -------- | -------- |
| string | 否       | Android  |

---

### `itemStyle`

Style to apply to each of the item labels.

| 类型                               | 必填 | 平台 |
| ---------------------------------- | -------- | -------- |
| [text styles](text-style-props.md) | 否       | iOS      |

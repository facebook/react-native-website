---
id: version-0.19-picker
title: Picker
original_id: picker
---

Renders the native picker component on iOS and Android. Example:

    <Picker
      selectedValue={this.state.language}
      onValueChange={(lang) => this.setState({language: lang})}>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>

Note: The picker has a default fixed height which you can modify using `style` if needed. To set the width, you can use `style` as well, e.g. to set a fixed width or stretch the picker horizontally.

### Props

- [View props...](view.md#props)

* [`onValueChange`](picker.md#onvaluechange)
* [`selectedValue`](picker.md#selectedvalue)
* [`style`](picker.md#style)
* [`testID`](picker.md#testid)
* [`enabled`](picker.md#enabled)
* [`mode`](picker.md#mode)
* [`prompt`](picker.md#prompt)
* [`itemStyle`](picker.md#itemstyle)

---

# Reference

## Props

### `onValueChange`

Callback for when an item is selected. This is called with the following parameters:

- `itemValue`: the `value` prop of the item that was selected
- `itemPosition`: the index of the selected item in this picker

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `selectedValue`

Value matching value of one of the items. Can be a string or an integer.

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### `style`

| Type            | Required |
| --------------- | -------- |
| pickerStyleType | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `enabled`

If set to false, the picker will be disabled, i.e. the user will not be able to make a selection.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `mode`

On Android, specifies how to display the selection items when the user taps on the picker:

- 'dialog': Show a modal dialog. This is the default.
- 'dropdown': Shows a dropdown anchored to the picker view

| Type                       | Required | Platform |
| -------------------------- | -------- | -------- |
| enum('dialog', 'dropdown') | No       | Android  |

---

### `prompt`

Prompt string for this picker, used on Android in dialog mode as the title of the dialog.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `itemStyle`

Style to apply to each of the item labels.

| Type                               | Required | Platform |
| ---------------------------------- | -------- | -------- |
| [text styles](text-style-props.md) | No       | iOS      |

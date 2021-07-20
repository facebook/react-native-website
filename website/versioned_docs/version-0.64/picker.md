---
id: picker
title: '🚧 Picker'
---

> **Deprecated.** Use one of the [community packages](https://reactnative.directory/?search=picker) instead.

Renders the native picker component on Android and iOS.

## Example

```SnackPlayer name=picker
import React, { useState } from "react";
import { View, Picker, StyleSheet } from "react-native";

const App = () => {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

export default App;
```

---

# Reference

## Props

Inherits [View Props](view.md#props).

### `enabled`

If set to false, the picker will be disabled, i.e. the user will not be able to make a selection.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `itemStyle`

Style to apply to each of the item labels.

| Type                               | Required | Platform |
| ---------------------------------- | -------- | -------- |
| [text styles](text-style-props.md) | No       | iOS      |

---

### `mode`

On Android, specifies how to display the selection items when the user taps on the picker:

- 'dialog': Show a modal dialog. This is the default.
- 'dropdown': Shows a dropdown anchored to the picker view

| Type                       | Required | Platform |
| -------------------------- | -------- | -------- |
| enum('dialog', 'dropdown') | No       | Android  |

---

### `onValueChange`

Callback for when an item is selected. This is called with the following parameters:

- `itemValue`: the `value` prop of the item that was selected
- `itemPosition`: the index of the selected item in this picker

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `prompt`

Prompt string for this picker, used on Android in dialog mode as the title of the dialog.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

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

---
id: checkbox
title: '🚧 CheckBox'
---

> **Deprecated.** Use [@react-native-community/checkbox](https://github.com/react-native-community/react-native-checkbox) instead.

Renders a boolean input (Android only).

This is a controlled component that requires an `onValueChange` callback that updates the `value` prop in order for the component to reflect user actions. If the `value` prop is not updated, the component will continue to render the supplied `value` prop instead of the expected result of any user actions.

## Example

```SnackPlayer name=CheckBox%20Component%20Example&supportedPlatforms=android,web
import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View } from "react-native";

export default App = () => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Do you like React Native?</Text>
      </View>
      <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
```

---

# Reference

## Props

Inherits [View Props](view#props).

---

### `disabled`

If true the user won't be able to toggle the checkbox. Default value is `false`.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onChange`

Used in case the props change removes the component.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onValueChange`

Invoked with the new value when the value changes.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `value`

The value of the checkbox. If true the checkbox will be turned on. Default value is `false`.

| Type | Required |
| ---- | -------- |
| bool | No       |

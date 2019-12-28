---
id: activityindicator
title: ActivityIndicator
---

Displays a circular loading indicator.

### Example

```SnackPlayer name=ActivityIndicator
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default App = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    <ActivityIndicator size="small" color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
```

---

# Reference

## Props

Inherits [View Props](view.md#props).

### `animating`

Whether to show the indicator (true, the default) or hide it (false).

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `color`

The foreground color of the spinner (default is gray on iOS and dark cyan on Android).

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `hidesWhenStopped`

Whether the indicator should hide when not animating (true by default).

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `size`

Size of the indicator (default is 'small'). Passing a number to the size prop is only supported on Android.

| Type                           | Required |
| ------------------------------ | -------- |
| enum('small', 'large'), number | No       |

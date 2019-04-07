---
id: version-0.5-activityindicator
title: ActivityIndicator
original_id: activityindicator
---

Displays a circular loading indicator.

### Example

```ReactNativeWebPlayer
import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'

class App extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

AppRegistry.registerComponent('App', () => App)
```

### Props

- [`View` props...](view.md#props)
- [`animating`](activityindicator.md#animating)
- [`color`](activityindicator.md#color)
- [`size`](activityindicator.md#size)
- [`hidesWhenStopped`](activityindicator.md#hideswhenstopped)

---

# Reference

## Props

### `animating`

Whether to show the indicator (`true`, the default) or hide it (`false`).

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `color`

The foreground color of the spinner (default is gray).

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `size`

Size of the indicator (default is 'small').

Passing a number to the size prop is only supported on Android.

| Type                           | Required |
| ------------------------------ | -------- |
| enum('small', 'large'), number | No       |

---

### `hidesWhenStopped`

Whether the indicator should hide when not animating (true by default).

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---
id: version-0.62-activityindicator
title: ActivityIndicator
original_id: activityindicator
---

Displays a circular loading indicator.

## Example

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=ActivityIndicator%20Function%20Component%20Example
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
      <ActivityIndicator size="small" color="#00ff00" />
      <ActivityIndicator size="large" color="#0000ff" />
      <ActivityIndicator size="small" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
```

<block class="classical syntax" />

```SnackPlayer name=ActivityIndicator%20Class%20Component%20Example
import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

```

<block class="endBlock syntax" />

# Reference

## Props

Inherits [View Props](view#props).

### `animating`

Whether to show the indicator (true, the default) or hide it (false).

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `color`

The foreground color of the spinner (default is gray on iOS and dark cyan on Android).

| Type            | Required |
| --------------- | -------- |
| [color](colors) | No       |

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

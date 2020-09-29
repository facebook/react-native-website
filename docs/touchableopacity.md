---
id: touchableopacity
title: TouchableOpacity
---

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the [Pressable](pressable.md) API.

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

Opacity is controlled by wrapping the children in an `Animated.View`, which is added to the view hierarchy. Be aware that this can affect layout.

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

```SnackPlayer name=TouchableOpacity%20Function%20Component%20Example
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>Count: {count}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default App;
```

<block class="classical syntax" />

```SnackPlayer name=TouchableOpacity%20Class%20Component%20Example
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    const { count } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default App;
```

<block class="endBlock syntax" />

---

# Reference

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

Inherits [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props).

---

### `style`

| Type       | Required |
| ---------- | -------- |
| View.style | No       |

---

### `activeOpacity`

Determines what the opacity of the wrapped view should be when touch is active. Defaults to `0.2`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `tvParallaxProperties`

_(Apple TV only)_ Object with properties to control Apple TV parallax effects.

- `enabled`: If `true`, parallax effects are enabled. Defaults to `true`.
- `shiftDistanceX`: Defaults to `2.0`.
- `shiftDistanceY`: Defaults to `2.0`.
- `tiltAngle`: Defaults to `0.05`.
- `magnification`: Defaults to `1.0`.
- `pressMagnification`: Defaults to `1.0`.
- `pressDuration`: Defaults to `0.3`.
- `pressDelay`: Defaults to `0.0`.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| object | No       | iOS      |

---

### `hasTVPreferredFocus`

_(Apple TV only)_ TV preferred focus (see documentation for the View component).

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `nextFocusDown`

TV next focus down (see documentation for the View component).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `nextFocusForward`

TV next focus forward (see documentation for the View component).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `nextFocusLeft`

TV next focus left (see documentation for the View component).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `nextFocusRight`

TV next focus right (see documentation for the View component).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `nextFocusUp`

TV next focus up (see documentation for the View component).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

## Methods

### `setOpacityTo()`

```jsx
setOpacityTo((value: number), (duration: number));
```

Animate the touchable to a new opacity.

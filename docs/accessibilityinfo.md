---
id: accessibilityinfo
title: AccessibilityInfo
---

Sometimes it's useful to know whether or not the device has a screen reader that is currently active. The `AccessibilityInfo` API is designed for this purpose. You can use it to query the current state of the screen reader as well as to register to be notified when the state of the screen reader changes.

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

```SnackPlayer name=AccessibilityInfo%20Function%20Component%20Example&supportedPlatforms=android,ios
import React, { useState, useEffect } from "react";
import { AccessibilityInfo, View, Text, StyleSheet } from "react-native";

const App = () => {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      handleReduceMotionToggled
    );
    AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      handleScreenReaderToggled
    );

    AccessibilityInfo.isReduceMotionEnabled().then(
      reduceMotionEnabled => {
        setReduceMotionEnabled(reduceMotionEnabled);
      }
    );
    AccessibilityInfo.isScreenReaderEnabled().then(
      screenReaderEnabled => {
        setScreenReaderEnabled(screenReaderEnabled);
      }
    );

    return () => {
      AccessibilityInfo.removeEventListener(
        "reduceMotionChanged",
        handleReduceMotionToggled
      );
      AccessibilityInfo.removeEventListener(
        "screenReaderChanged",
        handleScreenReaderToggled
      );
    };
  }, []);

  const handleReduceMotionToggled = reduceMotionEnabled => {
    setReduceMotionEnabled(reduceMotionEnabled);
  };

  const handleScreenReaderToggled = screenReaderEnabled => {
    setScreenReaderEnabled(screenReaderEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        The reduce motion is {reduceMotionEnabled ? "enabled" : "disabled"}.
      </Text>
      <Text style={styles.status}>
        The screen reader is {screenReaderEnabled ? "enabled" : "disabled"}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  status: {
    margin: 30
  }
});

export default App;
```

<block class="classical syntax" />

```SnackPlayer name=AccessibilityInfo%20Class%20Component%20Example&supportedPlatforms=android,ios
import React, { Component } from 'react';
import { AccessibilityInfo, View, Text, StyleSheet } from 'react-native';

class AccessibilityStatusExample extends Component {
  state = {
    reduceMotionEnabled: false,
    screenReaderEnabled: false,
  };

  componentDidMount() {
    AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      this._handleReduceMotionToggled
    );
    AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      this._handleScreenReaderToggled
    );

    AccessibilityInfo.isReduceMotionEnabled().then(reduceMotionEnabled => {
      this.setState({ reduceMotionEnabled });
    });
    AccessibilityInfo.isScreenReaderEnabled().then(screenReaderEnabled => {
      this.setState({ screenReaderEnabled });
    });
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener(
      'reduceMotionChanged',
      this._handleReduceMotionToggled
    );

    AccessibilityInfo.removeEventListener(
      'screenReaderChanged',
      this._handleScreenReaderToggled
    );
  }

  _handleReduceMotionToggled = reduceMotionEnabled => {
    this.setState({ reduceMotionEnabled });
  };

  _handleScreenReaderToggled = screenReaderEnabled => {
    this.setState({ screenReaderEnabled });
  };

  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.status}>
          The reduce motion is{' '}
          {this.state.reduceMotionEnabled ? 'enabled' : 'disabled'}.
        </Text>
        <Text style={this.styles.status}>
          The screen reader is{' '}
          {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    status: {
      margin: 30,
    },
  });
}

export default AccessibilityStatusExample;
```

<block class="endBlock syntax" />

---

# Reference

## Methods

### `isBoldTextEnabled()`

```jsx
static isBoldTextEnabled()
```

**iOS-Only.** Query whether a bold text is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when bold text is enabled and `false` otherwise.

### `isGrayscaleEnabled()`

```jsx
static isGrayscaleEnabled()
```

**iOS-Only.** Query whether grayscale is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when grayscale is enabled and `false` otherwise.

### `isInvertColorsEnabled()`

```jsx
static isInvertColorsEnabled()
```

**iOS-Only.** Query whether invert colors is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when invert colors is enabled and `false` otherwise.

### `isReduceMotionEnabled()`

```jsx
static isReduceMotionEnabled()
```

Query whether reduce motion is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when reduce motion is enabled and `false` otherwise.

### `isReduceTransparencyEnabled()`

```jsx
static isReduceTransparencyEnabled()
```

**iOS-Only.** Query whether reduce transparency is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when a reduce transparency is enabled and `false` otherwise.

### `isScreenReaderEnabled()`

```jsx
static isScreenReaderEnabled()
```

Query whether a screen reader is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when a screen reader is enabled and `false` otherwise.

---

### `addEventListener()`

```jsx
static addEventListener(eventName, handler)
```

Add an event handler. Supported events:

- `boldTextChanged`: iOS-only event. Fires when the state of the bold text toggle changes. The argument to the event handler is a boolean. The boolean is `true` when bold text is enabled and `false` otherwise.
- `grayscaleChanged`: iOS-only event. Fires when the state of the gray scale toggle changes. The argument to the event handler is a boolean. The boolean is `true` when a gray scale is enabled and `false` otherwise.
- `invertColorsChanged`: iOS-only event. Fires when the state of the invert colors toggle changes. The argument to the event handler is a boolean. The boolean is `true` when invert colors is enabled and `false` otherwise.
- `reduceMotionChanged`: Fires when the state of the reduce motion toggle changes. The argument to the event handler is a boolean. The boolean is `true` when a reduce motion is enabled (or when "Transition Animation Scale" in "Developer options" is "Animation off") and `false` otherwise.
- `screenReaderChanged`: Fires when the state of the screen reader changes. The argument to the event handler is a boolean. The boolean is `true` when a screen reader is enabled and `false` otherwise.
- `reduceTransparencyChanged`: iOS-only event. Fires when the state of the reduce transparency toggle changes. The argument to the event handler is a boolean. The boolean is `true` when reduce transparency is enabled and `false` otherwise.
- `announcementFinished`: iOS-only event. Fires when the screen reader has finished making an announcement. The argument to the event handler is a dictionary with these keys:
  - `announcement`: The string announced by the screen reader.
  - `success`: A boolean indicating whether the announcement was successfully made.

---

### `setAccessibilityFocus()`

```jsx
static setAccessibilityFocus(reactTag)
```

Set accessibility focus to a React component. On Android, this calls `UIManager.sendAccessibilityEvent(reactTag, UIManager.AccessibilityEventTypes.typeViewFocused);`.

> **Note**: Make sure that any `View` you want to receive the accessibility focus has `accessible={true}`.

---

### `announceForAccessibility()`

```jsx
static announceForAccessibility(announcement)
```

Post a string to be announced by the screen reader.

---

### `removeEventListener()`

```jsx
static removeEventListener(eventName, handler)
```

Remove an event handler.

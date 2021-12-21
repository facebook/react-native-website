---
id: dimensions
title: Dimensions
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

> [`useWindowDimensions`](usewindowdimensions) is the preferred API for React components. Unlike `Dimensions`, it updates as the window's dimensions update. This works nicely with the React paradigm.

```jsx
import { Dimensions } from 'react-native';
```

You can get the application window's width and height using the following code:

```jsx
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```

> Although dimensions are available immediately, they may change (e.g due to device rotation, foldable devices etc) so any rendering logic or styles that depend on these constants should try to call this function on every render, rather than caching the value (for example, using inline styles rather than setting a value in a `StyleSheet`).

If you are targeting foldable devices or devices which can change the screen size or app window size, you can use the event listener available in the Dimensions module as shown in the below example.

## Example

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Dimensions
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const App = () => {
  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Window Dimensions</Text>
      {Object.entries(dimensions.window).map(([key, value]) => (
        <Text>{key} - {value}</Text>
      ))}
      <Text style={styles.header}>Screen Dimensions</Text>
      {Object.entries(dimensions.screen).map(([key, value]) => (
        <Text>{key} - {value}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 16,
    marginVertical: 10
  }
});

export default App;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Dimensions
import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

class App extends Component {
  state = {
    dimensions: {
      window,
      screen
    }
  };

  onChange = ({ window, screen }) => {
    this.setState({ dimensions: { window, screen } });
  };

  componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener("change", this.onChange);
  }

  componentWillUnmount() {
    this.dimensionsSubscription?.remove();
  }

  render() {
    const { dimensions: { window, screen } } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Window Dimensions</Text>
        {Object.entries(window).map(([key, value]) => (
          <Text>{key} - {value}</Text>
        ))}
        <Text style={styles.header}>Screen Dimensions</Text>
        {Object.entries(screen).map(([key, value]) => (
          <Text>{key} - {value}</Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 16,
    marginVertical: 10
  }
});

export default App;
```

</TabItem>
</Tabs>

# Reference

## Methods

### `addEventListener()`

```jsx
static addEventListener(type, handler)
```

Add an event handler. Supported events:

- `change`: Fires when a property within the `Dimensions` object changes. The argument to the event handler is a [`DimensionsValue`](#dimensionsvalue) type object.

---

### `get()`

```jsx
static get(dim)
```

Initial dimensions are set before `runApplication` is called so they should be available before any other require's are run, but may be updated later.

Example: `const {height, width} = Dimensions.get('window');`

**Parameters:**

| Name                                                               | Type   | Description                                                                       |
| ------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------------- |
| dim <div className="label basic required two-lines">Required</div> | string | Name of dimension as defined when calling `set`. Returns value for the dimension. |

> For Android the `window` dimension will exclude the size used by the `status bar` (if not translucent) and `bottom navigation bar`

---

### `removeEventListener()`

```jsx
static removeEventListener(type, handler)
```

> **Deprecated.** Use the `remove()` method on the event subscription returned by [`addEventListener()`](#addeventlistener).

---

### `set()`

```jsx
static set(dims)
```

This should only be called from native code by sending the `didUpdateDimensions` event.

**Parameters:**

| Name                                                      | Type   | Description                               |
| --------------------------------------------------------- | ------ | ----------------------------------------- |
| dims <div className="label basic required">Required</div> | object | String-keyed object of dimensions to set. |

---

## Type Definitions

### DimensionsValue

**Properties:**

| Name   | Type                                        | Description                             |
| ------ | ------------------------------------------- | --------------------------------------- |
| window | [DisplayMetrics](dimensions#displaymetrics) | Size of the visible Application window. |
| screen | [DisplayMetrics](dimensions#displaymetrics) | Size of the device's screen.            |

### DisplayMetrics

| Type   |
| ------ |
| object |

**Properties:**

| Name      | Type   |
| --------- | ------ |
| width     | number |
| height    | number |
| scale     | number |
| fontScale | number |

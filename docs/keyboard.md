---
id: keyboard
title: Keyboard
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`Keyboard` module to control keyboard events.

### Usage

The Keyboard module allows you to listen for native events and react to them, as well as make changes to the keyboard, like dismissing it.

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Keyboard%20Function%20Component%20Example&supportedPlatforms=ios,android
import React, { useState, useEffect } from "react";
import { Keyboard, Text, TextInput, StyleSheet, View } from "react-native";

const Example = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder='Click here…'
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={style.status}>{keyboardStatus}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4
  },
  status: {
    padding: 10,
    textAlign: "center"
  }
});

export default Example;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Keyboard%20Class%20Component%20Example&supportedPlatforms=ios,android
import React, { Component } from 'react';
import { Keyboard, Text, TextInput, StyleSheet, View } from 'react-native';

class Example extends Component {
  state = {
    keyboardStatus: undefined
  };

  componentDidMount() {
    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({ keyboardStatus: 'Keyboard Shown' });
      },
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({ keyboardStatus: 'Keyboard Hidden' });
      },
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
  }

  render() {
    return (
      <View style={style.container}>
        <TextInput
          style={style.input}
          placeholder='Click here…'
          onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={style.status}>
          {this.state.keyboardStatus}
        </Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4
  },
  status: {
    padding: 10,
    textAlign: "center"
  }
});

export default Example;
```

</TabItem>
</Tabs>

---

# Reference

## Methods

### `addListener()`

```jsx
static addListener(eventName, callback)
```

The `addListener` function connects a JavaScript function to an identified native keyboard notification event.

This function then returns the reference to the listener.

**Parameters:**

| Name                                                                     | Type     | Description                                                                    |
| ------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------ |
| eventName <div className="label basic two-lines required">Required</div> | string   | The string that identifies the event you're listening for. See the list below. |
| callback <div className="label basic two-lines required">Required</div>  | function | The function to be called when the event fires                                 |

**`eventName`**

This can be any of the following:

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`
- `keyboardWillChangeFrame`
- `keyboardDidChangeFrame`

> Note that only `keyboardDidShow` and `keyboardDidHide` events are available on Android. The events will not be fired when using Android 10 and under if your activity has `android:windowSoftInputMode` set to `adjustNothing`.

---

### `removeListener()`

```jsx
static removeListener(eventName, callback)
```

> **Deprecated.** Use the `remove()` method on the event subscription returned by [`addListener()`](#addlistener).

**Parameters:**

| Name      | Type     | Required | Description                                                                    |
| --------- | -------- | -------- | ------------------------------------------------------------------------------ |
| eventName | string   | Yes      | The `nativeEvent` is the string that identifies the event you're listening for |
| callback  | function | Yes      | The function to be called when the event fires                                 |

---

### `removeAllListeners()`

```jsx
static removeAllListeners(eventName)
```

Removes all listeners for a specific event type.

**Parameters:**

| Name      | Type   | Required | Description                                                          |
| --------- | ------ | -------- | -------------------------------------------------------------------- |
| eventType | string | Yes      | The native event string listeners are watching which will be removed |

---

### `dismiss()`

```jsx
static dismiss()
```

Dismisses the active keyboard and removes focus.

---

### `scheduleLayoutAnimation`

```jsx
static scheduleLayoutAnimation(event)
```

Useful for syncing TextInput (or other keyboard accessory view) size of position changes with keyboard movements.

## Type Definitions

### KeyboardMetrics
`KeyboardMetrics` object is part of [`Keyboard`](text#addListener) callback and contains the measurement data of `Keyboard`.


#### Example

```js
{
  screenX: 0,
  screenY: 401.1428527832031,
  width: 411.4285583496094,
  height: 282.28570556640625,
}
```

#### Properties

| Name      | Type    | Optional  | Description                                                         |
| --------- | ------- | --------- | ------------------------------------------------------------------- |
| screenX   | number  | No        | Virtual keyboard X position on screen in pixels.                    |
| screenY   | number  | No        | Virtual keyboard Y position on screen in pixels.                    |
| width     | number  | No        | Virtual keyboard width in pixels.                                   |
| height    | number  | No        | Virtual keyboard height in pixels.                                  |

### KeyboardEvent

`KeyboardEvent` object is returned in the callback as a result of a [`Keyboard`](text#addListener) event. It contains a key called `endCoordinates` with a value which is an object of type [`KeyboardMetrics`](text#KeyboardMetrics).

#### Example

```js
{
  duration: 0,
  easing: "keyboard",
  endCoordinates: KeyboardMetrics
}
```

#### Properties

| Name           | Type                                                                       | Optional | Description                                    |
| -------------- | -------------------------------------------------------------------------- | -------- | ---------------------------------------------- |
| duration       | number                                                                     | No       | Virtual keyboard animation duration.           |
| easing         | enum(`"easeIn"`, `"easeInEaseOut"`, `"easeOut"`, `"linear"`, `"keyboard"`) | No       | Virtual keyboard animation easing function.    |
| endCoordinates | [KeyboardMetrics](text#KeyboardMetrics) object                             | No       | Object containing `Keyboard` measurement data. |

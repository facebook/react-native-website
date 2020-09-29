---
id: alert
title: Alert
---

Launches an alert dialog with the specified title and message.

Optionally provide a list of buttons. Tapping any button will fire the respective onPress callback and dismiss the alert. By default, the only button will be an 'OK' button.

This is an API that works both on Android and iOS and can show static alerts. Alert that prompts the user to enter some information is avaiable on iOS only.

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

```SnackPlayer name=Alert%20Function%20Component%20Example&supportedPlatforms=ios,android
import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

const App = () => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  return (
    <View style={styles.container}>
      <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />

      <Button title={"3-Button Alert"} onPress={createThreeButtonAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default App;
```

<block class="classical syntax" />

```SnackPlayer name=Alert%20Class%20Component%20Example&supportedPlatforms=ios,android
import React, { Component } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

class App extends Component {
  createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  render() {
    return (
      <View style={styles.container}>
        <Button title={"2-Button Alert"} onPress={this.createTwoButtonAlert} />

        <Button
          title={"3-Button Alert"}
          onPress={this.createThreeButtonAlert}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default App;
```

<block class="endBlock syntax" />

## iOS

On iOS you can specify any number of buttons. Each button can optionally specify a style, avaiable options are represented by the [AlertButtonStyle](#alertbuttonstyle) enum.

## Android

On Android at most three buttons can be specified. Android has a concept of a neutral, negative and a positive button:

- If you specify one button, it will be the 'positive' one (such as 'OK')
- Two buttons mean 'negative', 'positive' (such as 'Cancel', 'OK')
- Three buttons mean 'neutral', 'negative', 'positive' (such as 'Later', 'Cancel', 'OK')

Alerts on Android can be dismissed by tapping outside of the alert box. It is disabled by default and can be enabled by providing an optional [Options](alert#options) parameter with the cancelable property set to `true` i.e.<br/>`{ cancelable: true }`.

The cancel event can be handled by providing an `onDismiss` callback property inside the `options` parameter.

### Example <div class="label android">Android</div>

```SnackPlayer name=Alert%20Android%20Dissmissable%20Example&supportedPlatforms=android
import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

const showAlert = () =>
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This alert was dismissed by tapping outside of the alert dialog."
        ),
    }
  );

const App = () => (
  <Button title="Show alert" onPress={showAlert} />
);

export default App;
```

---

# Reference

## Methods

### `alert()`

```jsx
static alert(title, message?, buttons?, options?)
```

**Parameters:**

| Name    | Type                                                              | Description                                                             |
| ------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| title   | string <div class="label basic required">Required</div>           | The dialog's title. Passing `null` or empty string will hide the title. |
| message | string                                                            | An optional message that appears below the dialog's title.              |
| buttons | [Buttons](alert#buttons)                                          | An optional array containg buttons configuration.                       |
| options | [Options](alert#options) <div class="label android">Android</div> | An optional Alert configuration for the Android.                        |

---

### `prompt()` <div class="label ios">iOS</div>

```jsx
static prompt(title, message?, callbackOrButtons?, type?, defaultValue?, keyboardType?)
```

Create and display a prompt to enter some text in form of Alert.

**Parameters:**

| Name              | Type                                                    | Description                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | string <div class="label basic required">Required</div> | The dialog's title.                                                                                                                                                                                   |
| message           | string                                                  | An optional message that appears above the text input.                                                                                                                                                |
| callbackOrButtons | function<hr/>[Buttons](alert#buttons)                   | If passed a function, it will be called with the prompt's value<br/>`(text: string) => void`, when the user taps 'OK'.<hr/>If passed an array, buttons will be configured based on the array content. |
| type              | [AlertType](alert#alerttype)                            | This configures the text input.                                                                                                                                                                       |
| defaultValue      | string                                                  | The default text in text input.                                                                                                                                                                       |
| keyboardType      | string                                                  | The keyboard type of first text field (if exists). One of TextInput [keyboardTypes](textinput#keyboardtype).                                                                                          |

---

## Type Definitions

### AlertButtonStyle <div class="label ios">iOS</div>

An iOS Alert button style.

| Type |
| ---- |
| enum |

**Constants:**

| Value           | Description               |
| --------------- | ------------------------- |
| `'default'`     | Default button style.     |
| `'cancel'`      | Cancel button style.      |
| `'destructive'` | Destructive button style. |

---

### AlertType <div class="label ios">iOS</div>

An iOS Alert type.

| Type |
| ---- |
| enum |

**Constants:**

| Value              | Description                  |
| ------------------ | ---------------------------- |
| `'default'`        | Default alert with no inputs |
| `'plain-text'`     | Plain text input alert       |
| `'secure-text'`    | Secure text input alert      |
| `'login-password'` | Login and password alert     |

---

### Buttons

Array of objects containg Alert buttons configuration.

| Type             |
| ---------------- |
| array of objects |

**Objects properties:**

| Name                                   | Type                                       | Description                                             |
| -------------------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| text                                   | string                                     | Button label.                                           |
| onPress                                | function                                   | Callback function when button is pressed.               |
| style <div class="label ios">iOS</div> | [AlertButtonStyle](alert#alertbuttonstyle) | Button style, on Android this property will be ignored. |

---

### Options <div class="label android">Android</div>

| Type   |
| ------ |
| object |

**Properties:**

| Name       | Type     | Description                                                            |
| ---------- | -------- | ---------------------------------------------------------------------- |
| cancelable | boolean  | Defines if alert can be dismissed by tapping outside of the alert box. |
| onDismiss  | function | Callback function fired when alert has been dismissed.                 |

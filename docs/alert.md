---
id: alert
title: Alert
---

Launches an alert dialog with the specified title and message.

Optionally provide a list of buttons. Tapping any button will fire the respective onPress callback and dismiss the alert. By default, the only button will be an 'OK' button.

This is an API that works both on iOS and Android and can show static alerts. To show an alert that prompts the user to enter some information, see `AlertIOS`; entering text in an alert is common on iOS only.

## Example

<table>
  <tr>
    <th style="width: 50%;">iOS</th>
    <th style="width: 50%;">Android</th>
  </tr>
  <tr>
    <td style="width: 50%;">
      <center><img src="/react-native/docs/assets/Alert/exampleios.gif"></img></center>
    </td>
    <td style="width: 50%;">
      <center><img src="/react-native/docs/assets/Alert/exampleandroid.gif"></img></center>
    </td>
  </tr>
</table>

## iOS

On iOS you can specify any number of buttons. Each button can optionally specify a style, which is one of 'default', 'cancel' or 'destructive'.

## Android

On Android at most three buttons can be specified. Android has a concept of a neutral, negative and a positive button:

- If you specify one button, it will be the 'positive' one (such as 'OK')
- Two buttons mean 'negative', 'positive' (such as 'Cancel', 'OK')
- Three buttons mean 'neutral', 'negative', 'positive' (such as 'Later', 'Cancel', 'OK')

By default alerts on Android are not dismissable by tapping outside of the alert box (since v0.60). To enable it, you can pass an optional `options` object with the `cancelable` property set to `true`. The dismissal event can be handled by adding an `onDismiss` callback property to `options`. Note: Alerts are never dismissable on iOS.

Example usage:

```javascript
// Works on both iOS and Android
Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  // Cancelability by tapping outside the popup can be enabled on Android
  {cancelable: true, onDismiss: () => {}},
);
```

### Methods

- [`alert`](alert.md#alert)

---

# Reference

## Methods

### `alert()`

```javascript
static alert(title, message?, buttons?, options?)
```

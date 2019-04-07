---
id: version-0.42-appstate
title: AppState
original_id: appstate
---

`AppState` can tell you if the app is in the foreground or background, and notify you when the state changes.

AppState is frequently used to determine the intent and proper behavior when handling push notifications.

### App States

- `active` - The app is running in the foreground
- `background` - The app is running in the background. The user is either in another app or on the home screen
- `inactive` - This is a state that occurs when transitioning between foreground & background, and during periods of inactivity such as entering the Multitasking view or in the event of an incoming call

For more information, see [Apple's documentation](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html)

### Basic Usage

To see the current state, you can check `AppState.currentState`, which will be kept up-to-date. However, `currentState` will be null at launch while `AppState` retrieves it over the bridge.

```
import React, {Component} from 'react'
import {AppState, Text} from 'react-native'

class AppStateExample extends Component {

  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <Text>Current state is: {this.state.appState}</Text>
    );
  }

}
```

This example will only ever appear to say "Current state is: active" because the app is only visible to the user when in the `active` state, and the null state will happen only momentarily.

### Methods

- [`addEventListener`](appstate.md#addeventlistener)
- [`removeEventListener`](appstate.md#removeeventlistener)

### Properties

- [`currentState`](appstate.md#currentstate)

---

# Reference

## Methods

### `addEventListener()`

```javascript
addEventListener(type, handler);
```

Add a handler to AppState changes by listening to the `change` event type and providing the handler

**Parameters:**

| Name    | Type     | Required | Description |
| ------- | -------- | -------- | ----------- |
| type    | string   | Yes      |             |
| handler | function | Yes      |             |

TODO: now that AppState is a subclass of NativeEventEmitter, we could deprecate `addEventListener` and `removeEventListener` and just use `addListener` and `listener.remove()` directly. That will be a breaking change though, as both the method and event names are different (addListener events are currently required to be globally unique).

---

### `removeEventListener()`

```javascript
removeEventListener(type, handler);
```

Remove a handler by passing the `change` event type and the handler

**Parameters:**

| Name    | Type     | Required | Description |
| ------- | -------- | -------- | ----------- |
| type    | string   | Yes      |             |
| handler | function | Yes      |             |

## Properties

### `currentState`

```javascript
AppState.currentState;
```

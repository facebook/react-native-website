---
id: version-0.19-appstate
title: AppState
original_id: appstate
---

`AppState` can tell you if the app is in the foreground or background, and notify you when the state changes.

AppState is frequently used to determine the intent and proper behavior when handling push notifications.

### App States

- `active` - The app is running in the foreground
- `background` - The app is running in the background. The user is either in another app or on the home screen
- `inactive` - This is a transition state that currently never happens for typical React Native apps.

For more information, see [Apple's documentation](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html)

### Basic Usage

To see the current state, you can check `AppState.currentState`, which will be kept up-to-date. However, `currentState` will be null at launch while `AppState` retrieves it over the bridge.

```
getInitialState: function() {
  return {
    currentAppState: AppState.currentState,
  };
},
componentDidMount: function() {
  AppState.addEventListener('change', this._handleAppStateChange);
},
componentWillUnmount: function() {
  AppState.removeEventListener('change', this._handleAppStateChange);
},
_handleAppStateChange: function(currentAppState) {
  this.setState({ currentAppState, });
},
render: function() {
  return (
    <Text>Current state is: {this.state.currentAppState}</Text>
  );
},
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

```jsx
static addEventListener(type, handler)
```

Add a handler to AppState changes by listening to the `change` event type and providing the handler

**Parameters:**

| Name    | Type     | Required | Description |
| ------- | -------- | -------- | ----------- |
| type    | string   | Yes      |             |
| handler | function | Yes      |             |

---

### `removeEventListener()`

```jsx
static removeEventListener(type, handler)
```

Remove a handler by passing the `change` event type and the handler

**Parameters:**

| Name    | Type     | Required | Description |
| ------- | -------- | -------- | ----------- |
| type    | string   | Yes      |             |
| handler | function | Yes      |             |

## Properties

### `currentState`

```jsx
AppState.currentState;
```

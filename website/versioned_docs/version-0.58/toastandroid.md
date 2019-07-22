---
id: version-0.58-toastandroid
title: ToastAndroid
original_id: toastandroid
---

This exposes the native ToastAndroid module as a JS module. This has a function 'show' which takes the following parameters:

1. String message: A string with the text to toast
2. int duration: The duration of the toast. May be ToastAndroid.SHORT or ToastAndroid.LONG

There is also a function `showWithGravity` to specify the layout gravity. May be ToastAndroid.TOP, ToastAndroid.BOTTOM, ToastAndroid.CENTER.

The 'showWithGravityAndOffset' function adds on the ability to specify offset These offset values will translate to pixels.

Basic usage:

```jsx
import {ToastAndroid} from 'react-native';

ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
ToastAndroid.showWithGravity(
  'All Your Base Are Belong To Us',
  ToastAndroid.SHORT,
  ToastAndroid.CENTER,
);
ToastAndroid.showWithGravityAndOffset(
  'A wild toast appeared!',
  ToastAndroid.LONG,
  ToastAndroid.BOTTOM,
  25,
  50,
);
```

### Advanced usage:

The ToastAndroid API is imperative and this might present itself as an issue, but there is actually a way(hack) to expose a declarative component from it. See an example below:

```jsx
import React, {Component} from 'react';
import {View, Button, ToastAndroid} from 'react-native';

// a component that calls the imperative ToastAndroid API
const Toast = (props) => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleButtonPress = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        this.hideToast();
      },
    );
  };

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Toast visible={this.state.visible} message="Example" />
        <Button title="Toggle Modal" onPress={this.handleButtonPress} />
      </View>
    );
  }
}
```

### Methods

- [`show`](toastandroid.md#show)
- [`showWithGravity`](toastandroid.md#showwithgravity)
- [`showWithGravityAndOffset`](toastandroid.md#showwithgravityandoffset)

### Properties

- [`SHORT`](toastandroid.md#short)
- [`LONG`](toastandroid.md#long)
- [`TOP`](toastandroid.md#top)
- [`BOTTOM`](toastandroid.md#bottom)
- [`CENTER`](toastandroid.md#center)

---

# Reference

## Methods

### `show()`

```jsx
static show(message, duration)
```

---

### `showWithGravity()`

```jsx
static showWithGravity(message, duration, gravity)
```

---

### `showWithGravityAndOffset()`

```jsx
static showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)
```

## Properties

### `SHORT`

```jsx
ToastAndroid.SHORT;
```

---

### `LONG`

```jsx
ToastAndroid.LONG;
```

---

### `TOP`

```jsx
ToastAndroid.TOP;
```

---

### `BOTTOM`

```jsx
ToastAndroid.BOTTOM;
```

---

### `CENTER`

```jsx
ToastAndroid.CENTER;
```

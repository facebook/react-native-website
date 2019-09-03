---
id: imagebackground
title: ImageBackground
---

A common feature request from developers familiar with the web is `background-image`. To handle this use case, you can use the `<ImageBackground>` component, which has the same props as `<Image>`, and add whatever children to it you would like to layer on top of it.

You might not want to use `<ImageBackground>` in some cases, since the implementation is very simple. Refer to `<ImageBackground>`'s [source code](https://github.com/facebook/react-native/blob/master/Libraries/Image/ImageBackground.js) for more insight, and create your own custom component when needed.

Note that you must specify some width and height style attributes.

## Example

```SnackPlayer name=imagebackground
import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundContainer}
        source={{
          uri: 'https://facebook.github.io/react-native/img/opengraph.png',
        }}
      >
        <Text>React-native</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    width: 200,
    height: 200,
  },
});
```

### Props

- [`Image` props...](image.md#props)
- [`style`](imagebackground.md#style)
- [`imageStyle`](imagebackground.md#imagestyle)
- [`imageRef`](imagebackground.md#imageref)

---

# Reference

## Props

### `style`

| Type                               | Required |
| ---------------------------------- | -------- |
| [view styles](view-style-props.md) | No       |

### `imageStyle`

| Type                                 | Required |
| ------------------------------------ | -------- |
| [image styles](image-style-props.md) | No       |

### `imageRef`

Allows to set a reference to the inner `Image` component

| Type                                                  | Required |
| ----------------------------------------------------- | -------- |
| [Ref](https://reactjs.org/docs/refs-and-the-dom.html) | No       |

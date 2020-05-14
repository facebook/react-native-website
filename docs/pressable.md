---
id: pressable
title: Pressable
---

Pressable is a Core Component wrapper that can detect various stages of press interactions on any of it's defined children.

```jsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

## How it works

On an element wrapped by `Pressable`:

1. [`onPressIn`](#onpressin) is called when a press is activated—before `onPress` is called.
2. [`onPress`](#onpress) is called when a single press gesture is triggered.
3. [`onLongPress`](#onlongpress) is called only if the press gesture is activated beyond 500ms or the time set with [`delayLongPress`](#delaylongpress).
4. [`onPressOut`](#onpressout) is called when the press gesture is deactivated.

  <img src="/docs/assets/d_pressable_pressing.svg" width="1000" alt="Diagram of the onPress events in sequence.">

Fingers are not the most precise instruments, and it's not uncommon for users to "fat finger" an interface—to activate the wrong thing or miss the activation area. To help, `Pressable` has an optional `HitRect` you can use to define how far a touch can register away from the the wrapped element. Presses can start anywhere within a `HitRect`.

`PressRect` allows presses to move beyond the element and its `HitRect` while maintaining activation and being eligible for a "press"—think of sliding your finger slowly away from a button you're pressing down on.

> The touch area never extends past the parent view bounds and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.

<figure>
  <img src="/docs/assets/d_pressable_anatomy.svg" width="1000" alt="Diagram of HitRect and PressRect and how they work.">
  <figcaption>
    You can set <code>HitRect</code> with <code>hitSlop</code> and set <code>PressRect</code> with <code>pressRetentionOffset</code>.
  </figcaption>
</figure>

> `Pressable` uses React Native's `Pressability` API. For more information around the state machine flow of Pressability and how it works, check out the implementation for [Pressability](https://github.com/facebook/react-native/blob/16ea9ba8133a5340ed6751ec7d49bf03a0d4c5ea/Libraries/Pressability/Pressability.js#L347).

## Example

```js
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default (App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <View>
      <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? 'Pressed!' : 'Press Me'}
          </Text>
        )}
      </Pressable>
      <View style={styles.logBox}>
        <Text testID="pressable_press_console">{textLog}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
    fontSize: 16
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});
```

## Props

### `android_disableSound`

If true, doesn't play Android system sound on press.

| Type    | Required | Platform |
| ------- | -------- | -------- |
| boolean | No       | Android  |

### `android_rippleColor`

Enables the Android ripple effect and configures its color.

| Type                                         | Required | Platform |
| -------------------------------------------- | -------- | -------- |
| [color](https://reactnative.dev/docs/colors) | No       | Android  |

### `children`

Either children or a function that receives a boolean reflecting whether the component is currently pressed.

| Type       | Required |
| ---------- | -------- |
| React.Node | No       |

### `delayLongPress`

Duration (in milliseconds) from `onPressIn` before `onLongPress` is called.

| Type   | Required |
| ------ | -------- |
| number | No       |

### `disabled`

Whether the press behavior is disabled.

| Type    | Required |
| ------- | -------- |
| boolean | No       |

### `hitSlop`

Sets additional distance outside of element in which a press can be detected.

| Type       | Required |
| ---------- | -------- |
| RectOrSize | No       |

### `onLongPress`

Called when a press event lasts longer than 500 milliseconds.

| Type       | Required |
| ---------- | -------- |
| PressEvent | No       |

### `onPress`

Called when a single tap gesture is detected, after `onPressIn`.

| Type       | Required |
| ---------- | -------- |
| PressEvent | No       |

### `onPressIn`

Called when a touch is engaged, before `onPress`.

| Type       | Required |
| ---------- | -------- |
| PressEvent | No       |

### `onPressOut`

Called when a touch is released.

| Type       | Required |
| ---------- | -------- |
| PressEvent | No       |

### `pressRectOffset`

Additional distance outside of this view in which a touch is considered a press before `onPressOut` is triggered.

| Type         | Required |
| ------------ | -------- |
| Rect or Size | No       |

### `style`

Either view styles or a function that receives a boolean reflecting whether the component is currently pressed and returns view styles.

| Type                                                           | Required |
| -------------------------------------------------------------- | -------- |
| [ViewStyleProp](https://reactnative.dev/docs/view-style-props) | No       |

### `testOnly_pressed`

Used only for documentation or testing (e.g. snapshot testing).

| Type    | Required |
| ------- | -------- |
| boolean | No       |

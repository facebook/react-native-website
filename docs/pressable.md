---
id: pressable
title: Pressable
---

Pressable is a Core Component wrapper that can detect various types of interaction states on any of it's defined children.

```jsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

## Example

```js
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

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
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
          },
          styles.wrapperCustom,
        ]}>
        {({pressed}) => (
          <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
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
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});
```

## Pressable Implementation Details/Flow

`Pressable` uses `Pressability` under the covers. Which only assumes that there exists a `HitRect` node. The `PressRect` is an abstract box that is extended beyond the `HitRect`.

```
┌────────────────────────┐
│  ┌──────────────────┐  │ - Presses start anywhere within `HitRect`, which
│  │  ┌────────────┐  │  │   is expanded via the prop `hitSlop`.
│  │  │ VisualRect │  │  │
│  │  └────────────┘  │  │ - When pressed down for sufficient amount of time
│  │    HitRect       │  │   before letting up, `VisualRect` activates for
│  └──────────────────┘  │   as long as the press stays within `PressRect`.
│       PressRect    o   │
└────────────────────│───┘
       Out Region   └────── `PressRect`, which is expanded via the prop
                            `pressRectOffset`, allows presses to move
                            beyond `HitRect` while maintaining activation
                            and being eligible for a "press".
```

### `HitRect`

This defines how far your touch can start away from the button. This is added to `pressRetentionOffset` when moving off of the button.

> The touch area never extends past the parent view bounds and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.

For more information around the state machine flow of Pressability and how it works, check out the implementation for [Pressability](https://github.com/facebook/react-native/blob/16ea9ba8133a5340ed6751ec7d49bf03a0d4c5ea/Libraries/Pressability/Pressability.js#L347).

---

# Reference

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

Additional distance outside of this view in which a press is detected.

| Type       | Required |
| ---------- | -------- |
| RectOrSize | No       |

### `onLongPress`

Called when this view's layout changes.

| Type       | Required |
| ---------- | -------- |
| PressEvent | No       |

### `onPress`

Called when a single tap gesture is detected.

| Type       | Required |
| ---------- | -------- |
| PressEvent | No       |

### `onPressIn`

Called when a touch is engaged before `onPress`.

| Type       | Required |
| ---------- | -------- |
| PressEvent | No       |

### `onPressOut`

Called when a touch is released before `onPress`.

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

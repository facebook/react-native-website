---
id: version-0.5-slider
title: Slider
original_id: slider
---

A component used to select a single value from a range of values.

### Usage

The example below shows how to use `Slider` to change a value used by `Text`. The value is stored using the state of the root component (`App`). The same component subscribes to the `onValueChange` of `Slider` and changes the value using `setState`.

```jsx
import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50
    };
  }

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value)
      };
    });
  }

  render() {
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{String(value)}</Text>
        <Slider
          step={1}
          maximumValue={100}
          onValueChange={this.change.bind(this)}
          value={value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    fontSize: 50,
    textAlign: 'center'
  }
});
```

### Props

- [View props...](view.md#props)
- [`style`](slider.md#style)
- [`disabled`](slider.md#disabled)
- [`maximumValue`](slider.md#maximumvalue)
- [`minimumTrackTintColor`](slider.md#minimumtracktintcolor)
- [`minimumValue`](slider.md#minimumvalue)
- [`onSlidingComplete`](slider.md#onslidingcomplete)
- [`onValueChange`](slider.md#onvaluechange)
- [`step`](slider.md#step)
- [`maximumTrackTintColor`](slider.md#maximumtracktintcolor)
- [`testID`](slider.md#testid)
- [`value`](slider.md#value)
- [`thumbTintColor`](slider.md#thumbtintcolor)
- [`maximumTrackImage`](slider.md#maximumtrackimage)
- [`minimumTrackImage`](slider.md#minimumtrackimage)
- [`thumbImage`](slider.md#thumbimage)
- [`trackImage`](slider.md#trackimage)

---

# Reference

## Props

### `style`

Used to style and layout the `Slider`. See `StyleSheet.js` and `ViewStylePropTypes.js` for more info.

| Type                        | Required |
| --------------------------- | -------- |
| [View.style](view.md#style) | No       |

---

### `disabled`

If true the user won't be able to move the slider. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `maximumValue`

Initial maximum value of the slider. Default value is 1.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `minimumTrackTintColor`

The color used for the track to the left of the button. Overrides the default blue gradient image on iOS.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `minimumValue`

Initial minimum value of the slider. Default value is 0.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `onSlidingComplete`

Callback that is called when the user releases the slider, regardless if the value has changed. The current value is passed as an argument to the callback handler.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onValueChange`

Callback continuously called while the user is dragging the slider.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `step`

Step value of the slider. The value should be between 0 and (maximumValue - minimumValue). Default value is 0.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `maximumTrackTintColor`

The color used for the track to the right of the button. Overrides the default blue gradient image on iOS.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `testID`

Used to locate this view in UI automation tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `value`

Initial value of the slider. The value should be between minimumValue and maximumValue, which default to 0 and 1 respectively. Default value is 0.

_This is not a controlled component_, you don't need to update the value during dragging.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `thumbTintColor`

Color of the foreground switch grip.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | Android  |

---

### `maximumTrackImage`

Assigns a maximum track image. Only static images are supported. The leftmost pixel of the image will be stretched to fill the track.

| Type                                      | Required | Platform |
| ----------------------------------------- | -------- | -------- |
| [Image.propTypes.source](image.md#source) | No       | iOS      |

---

### `minimumTrackImage`

Assigns a minimum track image. Only static images are supported. The rightmost pixel of the image will be stretched to fill the track.

| Type                                      | Required | Platform |
| ----------------------------------------- | -------- | -------- |
| [Image.propTypes.source](image.md#source) | No       | iOS      |

---

### `thumbImage`

Sets an image for the thumb. Only static images are supported.

| Type                                      | Required | Platform |
| ----------------------------------------- | -------- | -------- |
| [Image.propTypes.source](image.md#source) | No       | iOS      |

---

### `trackImage`

Assigns a single image for the track. Only static images are supported. The center pixel of the image will be stretched to fill the track.

| Type                                      | Required | Platform |
| ----------------------------------------- | -------- | -------- |
| [Image.propTypes.source](image.md#source) | No       | iOS      |

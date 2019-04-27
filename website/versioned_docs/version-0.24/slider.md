---
id: version-0.24-slider
title: Slider
original_id: slider
---

A component used to select a single value from a range of values.

### Props

- [View props...](view.md#props)

* [`testID`](slider.md#testid)
* [`disabled`](slider.md#disabled)
* [`minimumValue`](slider.md#minimumvalue)
* [`onSlidingComplete`](slider.md#onslidingcomplete)
* [`onValueChange`](slider.md#onvaluechange)
* [`step`](slider.md#step)
* [`style`](slider.md#style)
* [`maximumValue`](slider.md#maximumvalue)
* [`value`](slider.md#value)
* [`maximumTrackImage`](slider.md#maximumtrackimage)
* [`maximumTrackTintColor`](slider.md#maximumtracktintcolor)
* [`minimumTrackImage`](slider.md#minimumtrackimage)
* [`minimumTrackTintColor`](slider.md#minimumtracktintcolor)
* [`thumbImage`](slider.md#thumbimage)
* [`trackImage`](slider.md#trackimage)

---

# Reference

## Props

### `testID`

Used to locate this view in UI automation tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `disabled`

If true the user won't be able to move the slider. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `minimumValue`

Initial minimum value of the slider. Default value is 0.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `onSlidingComplete`

Callback called when the user finishes changing the value (e.g. when the slider is released).

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

### `style`

Used to style and layout the `Slider`. See `StyleSheet.js` and `ViewStylePropTypes.js` for more info.

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `maximumValue`

Initial maximum value of the slider. Default value is 1.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `value`

Initial value of the slider. The value should be between minimumValue and maximumValue, which default to 0 and 1 respectively. Default value is 0.

_This is not a controlled component_, you don't need to update the value during dragging.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `maximumTrackImage`

Assigns a maximum track image. Only static images are supported. The leftmost pixel of the image will be stretched to fill the track.

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | No       | iOS      |

---

### `maximumTrackTintColor`

The color used for the track to the right of the button. Overrides the default blue gradient image.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |

---

### `minimumTrackImage`

Assigns a minimum track image. Only static images are supported. The rightmost pixel of the image will be stretched to fill the track.

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | No       | iOS      |

---

### `minimumTrackTintColor`

The color used for the track to the left of the button. Overrides the default blue gradient image.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |

---

### `thumbImage`

Sets an image for the thumb. Only static images are supported.

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | No       | iOS      |

---

### `trackImage`

Assigns a single image for the track. Only static images are supported. The center pixel of the image will be stretched to fill the track.

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | No       | iOS      |

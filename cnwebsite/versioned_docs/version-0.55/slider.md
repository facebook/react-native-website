---
id: version-0.55-slider
title: Slider
original_id: slider
---

A component used to select a single value from a range of values.

### Props

* [View props...](view.md#props)

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

# 文档

## Props

### `style`

Used to style and layout the `Slider`. See `StyleSheet.js` and `ViewStylePropTypes.js` for more info.

| 类型       | 必填 |
| ---------- | -------- |
| View.style | 否       |

---

### `disabled`

If true the user won't be able to move the slider. Default value is false.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `maximumValue`

Initial maximum value of the slider. Default value is 1.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `minimumTrackTintColor`

The color used for the track to the left of the button. Overrides the default blue gradient image on iOS.

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `minimumValue`

Initial minimum value of the slider. Default value is 0.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `onSlidingComplete`

Callback that is called when the user releases the slider, regardless if the value has changed. The current value is passed as an argument to the callback handler.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onValueChange`

Callback continuously called while the user is dragging the slider.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `step`

Step value of the slider. The value should be between 0 and (maximumValue - minimumValue). Default value is 0.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `maximumTrackTintColor`

The color used for the track to the right of the button. Overrides the default blue gradient image on iOS.

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `testID`

Used to locate this view in UI automation tests.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `value`

Initial value of the slider. The value should be between minimumValue and maximumValue, which default to 0 and 1 respectively. Default value is 0.

_This is not a controlled component_, you don't need to update the value during dragging.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `thumbTintColor`

Color of the foreground switch grip.

| 类型               | 必填 | 平台 |
| ------------------ | -------- | -------- |
| [color](colors.md) | 否       | Android  |

---

### `maximumTrackImage`

Assigns a maximum track image. Only static images are supported. The leftmost pixel of the image will be stretched to fill the track.

| 类型                   | 必填 | 平台 |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | 否       | iOS      |

---

### `minimumTrackImage`

Assigns a minimum track image. Only static images are supported. The rightmost pixel of the image will be stretched to fill the track.

| 类型                   | 必填 | 平台 |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | 否       | iOS      |

---

### `thumbImage`

Sets an image for the thumb. Only static images are supported.

| 类型                   | 必填 | 平台 |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | 否       | iOS      |

---

### `trackImage`

Assigns a single image for the track. Only static images are supported. The center pixel of the image will be stretched to fill the track.

| 类型                   | 必填 | 平台 |
| ---------------------- | -------- | -------- |
| Image.propTypes.source | 否       | iOS      |

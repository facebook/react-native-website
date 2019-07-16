---
id: version-0.6-touchablehighlight
title: TouchableHighlight
original_id: touchablehighlight
---

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view. The underlay comes from adding a view to the view hierarchy, which can sometimes cause unwanted visual artifacts if not used correctly, for example if the backgroundColor of the wrapped view isn't explicitly set to an opaque color.

Example:

```
renderButton: function() {
  return (
    <TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('image!myButton')}
      />
    </TouchableHighlight>
  );
},
```

### Props

- [TouchableWithoutFeedback props...](touchablewithoutfeedback.md#props)

* [`activeOpacity`](touchablehighlight.md#activeopacity)
* [`onHideUnderlay`](touchablehighlight.md#onhideunderlay)
* [`onShowUnderlay`](touchablehighlight.md#onshowunderlay)
* [`style`](touchablehighlight.md#style)
* [`underlayColor`](touchablehighlight.md#underlaycolor)

### Methods

- [`computeSyntheticState`](touchablehighlight.md#computesyntheticstate)

---

# Reference

## Props

### `activeOpacity`

Determines what the opacity of the wrapped view should be when touch is active.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `onHideUnderlay`

Called immediately after the underlay is hidden

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onShowUnderlay`

Called immediately after the underlay is shown

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `style`

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `underlayColor`

The color of the underlay that will show through when the touch is active.

| Type   | Required |
| ------ | -------- |
| string | No       |

## Methods

### `computeSyntheticState()`

```jsx
computeSyntheticState(props);
```

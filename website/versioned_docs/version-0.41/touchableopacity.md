---
id: version-0.41-touchableopacity
title: TouchableOpacity
original_id: touchableopacity
---

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it. This is done without actually changing the view hierarchy, and in general is quick to add to an app without weird side-effects.

Example:

```
renderButton: function() {
  return (
    <TouchableOpacity onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('./myButton.png')}
      />
    </TouchableOpacity>
  );
},
```

### Props

- [TouchableWithoutFeedback props...](touchablewithoutfeedback.md#props)

* [`activeOpacity`](touchableopacity.md#activeopacity)
* [`focusedOpacity`](touchableopacity.md#focusedopacity)
* [`tvParallaxProperties`](touchableopacity.md#tvparallaxproperties)

### Methods

- [`setOpacityTo`](touchableopacity.md#setopacityto)

---

# Reference

## Props

### `activeOpacity`

Determines what the opacity of the wrapped view should be when touch is active. Defaults to 0.2.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `focusedOpacity`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `tvParallaxProperties`

Apple TV parallax effects

| Type   | Required |
| ------ | -------- |
| object | No       |

## Methods

### `setOpacityTo()`

```jsx
setOpacityTo((value: number), (duration: number));
```

Animate the touchable to a new opacity.

---
id: version-0.43-touchableopacity
title: TouchableOpacity
original_id: touchableopacity
---

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

Opacity is controlled by wrapping the children in an Animated.View, which is added to the view hierarchy. Be aware that this can affect layout.

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

```javascript
setOpacityTo((value: number), (duration: number));
```

Animate the touchable to a new opacity.

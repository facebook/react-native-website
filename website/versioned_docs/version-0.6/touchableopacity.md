---
id: version-0.6-touchableopacity
title: TouchableOpacity
original_id: touchableopacity
---

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it. This is done without actually changing the view hierarchy, and in general is possible to add to an app without weird side-effects.

Example:

```
renderButton: function() {
  return (
    <TouchableOpacity onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('image!myButton')}
      />
    </TouchableOpacity>
  );
},
```

> **NOTE**: TouchableOpacity supports only one child
>
> If you wish to have to have several child components, wrap them in a View.

### Props

- [TouchableWithoutFeedback props...](touchablewithoutfeedback.md#props)

* [`activeOpacity`](touchableopacity.md#activeopacity)

### Methods

- [`setOpacityTo`](touchableopacity.md#setopacityto)

---

# Reference

## Props

### `activeOpacity`

Determines what the opacity of the wrapped view should be when touch is active.

| Type   | Required |
| ------ | -------- |
| number | No       |

## Methods

### `setOpacityTo()`

```jsx
setOpacityTo(value);
```

---
id: version-0.12-touchablenativefeedback
title: TouchableNativeFeedback
original_id: touchablenativefeedback
---

A wrapper for making views respond properly to touches (Android only). On Android this component uses native state drawable to display touch feedback. At the moment it only supports having a single View instance as a child node, as it's implemented by replacing that View with another instance of RCTView node with some additional properties set.

Background drawable of native feedback touchable can be customized with `background` property.

Example:

```
renderButton: function() {
  return (
    <TouchableNativeFeedback
        onPress={this._onPressButton}
        background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
        <Text style={{margin: 30}}>Button</Text>
      </View>
    </TouchableNativeFeedback>
  );
},
```

### Props

- [TouchableWithoutFeedback props...](touchablewithoutfeedback.md#props)

* [`background`](touchablenativefeedback.md#background)

### Methods

- [`SelectableBackground`](touchablenativefeedback.md#selectablebackground)
- [`SelectableBackgroundBorderless`](touchablenativefeedback.md#selectablebackgroundborderless)
- [`Ripple`](touchablenativefeedback.md#ripple)

---

# Reference

## Props

### `background`

Determines the type of background drawable that's going to be used to display feedback. It takes an object with `type` property and extra data depending on the `type`. It's recommended to use one of the following static methods to generate that dictionary:

1. TouchableNativeFeedback.SelectableBackground() - will create object that represents android theme's default background for selectable elements (?android:attr/selectableItemBackground)

2. TouchableNativeFeedback.SelectableBackgroundBorderless() - will create object that represent android theme's default background for borderless selectable elements (?android:attr/selectableItemBackgroundBorderless). Available on android API level 21+

3. TouchableNativeFeedback.Ripple(color, borderless) - will create object that represents ripple drawable with specified color (as a string). If property `borderless` evaluates to true the ripple will render outside of the view bounds (see native actionbar buttons as an example of that behavior). This background type is available on Android API level 21+

| Type               | Required |
| ------------------ | -------- |
| backgroundPropType | No       |

## Methods

### `SelectableBackground()`

```jsx
static SelectableBackground()
```

---

### `SelectableBackgroundBorderless()`

```jsx
static SelectableBackgroundBorderless()
```

---

### `Ripple()`

```jsx
static Ripple(color, borderless)
```

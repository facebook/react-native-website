---
id: version-0.49-button
title: Button
original_id: button
---

A basic button component that should render nicely on any platform. Supports a minimal level of customization.

<center><img src="/docs/assets/buttonExample.png"></img></center>

If this button doesn't look right for your app, you can build your own button using [TouchableOpacity](touchableopacity.md) or [TouchableNativeFeedback](touchablenativefeedback.md). For inspiration, look at the [source code for this button component](https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js). Or, take a look at the [wide variety of button components built by the community](https://js.coach/?menu%5Bcollections%5D=React%20Native&page=1&query=button).

Example usage:

```
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

### Props

- [`onPress`](button.md#onpress)
- [`title`](button.md#title)
- [`accessibilityLabel`](button.md#accessibilitylabel)
- [`color`](button.md#color)
- [`disabled`](button.md#disabled)
- [`testID`](button.md#testid)

---

# Reference

## Props

### `onPress`

Handler to be called when the user taps the button

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### `title`

Text to display inside the button

| Type   | Required |
| ------ | -------- |
| string | Yes      |

---

### `accessibilityLabel`

Text to display for blindness accessibility features

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `color`

Color of the text (iOS), or background color of the button (Android)

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `disabled`

If true, disable all interactions for this component.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

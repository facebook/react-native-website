---
id: version-0.45-text
title: Text
original_id: text
---

A React component for displaying text.

`Text` supports nesting, styling, and touch handling.

In the following example, the nested title and body text will inherit the `fontFamily` from `styles.baseText`, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines:

```SnackPlayer
import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet } from 'react-native';

export default class TextInANest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bird's Nest",
      bodyText: 'This is not really a bird nest.'
    };
  }

  render() {
    return (
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.titleText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}
        </Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('TextInANest', () => TextInANest);
```

### Props

- [`style`](text.md#style)
- [`accessible`](text.md#accessible)
- [`ellipsizeMode`](text.md#ellipsizemode)
- [`numberOfLines`](text.md#numberoflines)
- [`onLayout`](text.md#onlayout)
- [`onLongPress`](text.md#onlongpress)
- [`onPress`](text.md#onpress)
- [`pressRetentionOffset`](text.md#pressretentionoffset)
- [`selectable`](text.md#selectable)
- [`allowFontScaling`](text.md#allowfontscaling)
- [`testID`](text.md#testid)
- [`disabled`](text.md#disabled)
- [`nativeID`](text.md#nativeid)
- [`selectionColor`](text.md#selectioncolor)
- [`textBreakStrategy`](text.md#textbreakstrategy)
- [`adjustsFontSizeToFit`](text.md#adjustsfontsizetofit)
- [`minimumFontScale`](text.md#minimumfontscale)
- [`suppressHighlighting`](text.md#suppresshighlighting)

---

# Reference

## Props

### `style`

| Type  | Required |
| ----- | -------- |
| style | No       |

- [View Style Props...](view-style-props.md#style)

- **`textShadowOffset`**: object: {width: number,height: number}

- **`color`**: [color](colors.md)

- **`fontSize`**: number

- **`fontStyle`**: enum('normal', 'italic')

- **`fontWeight`**: enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')

  Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

- **`lineHeight`**: number

- **`textAlign`**: enum('auto', 'left', 'right', 'center', 'justify')

  Specifies text alignment. The value 'justify' is only supported on iOS and fallbacks to `left` on Android.

- **`textDecorationLine`**: enum('none', 'underline', 'line-through', 'underline line-through')

- **`textShadowColor`**: [color](colors.md)

- **`fontFamily`**: string

- **`textShadowRadius`**: number

- **`includeFontPadding`**: bool (_Android_)

  Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders. With some fonts, this padding can make text look slightly misaligned when centered vertically. For best results also set `textAlignVertical` to `center`. Default is true.

* **`textAlignVertical`**: enum('auto', 'top', 'bottom', 'center') (_Android_)

* **`fontVariant`**: array of enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums') (_iOS_)

* **`letterSpacing`**: number (_iOS_)

* **`textDecorationColor`**: [color](colors.md) (_iOS_)

* **`textDecorationStyle`**: enum('solid', 'double', 'dotted', 'dashed') (_iOS_)

* **`writingDirection`**: enum('auto', 'ltr', 'rtl') (_iOS_)

---

### `accessible`

When set to `true`, indicates that the view is an accessibility element. The default value for a `Text` element is `true`.

See the [Accessibility guide](accessibility.md#accessible-ios-android) for more information.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `ellipsizeMode`

When `numberOfLines` is set, this prop defines how text will be truncated. `numberOfLines` must be set in conjunction with this prop.

This can be one of the following values:

- `head` - The line is displayed so that the end fits in the container and the missing text at the beginning of the line is indicated by an ellipsis glyph. e.g., "...wxyz"
- `middle` - The line is displayed so that the beginning and end fit in the container and the missing text in the middle is indicated by an ellipsis glyph. "ab...yz"
- `tail` - The line is displayed so that the beginning fits in the container and the missing text at the end of the line is indicated by an ellipsis glyph. e.g., "abcd..."
- `clip` - Lines are not drawn past the edge of the text container.

The default is `tail`.

> `clip` is working only for iOS

| Type                                   | Required |
| -------------------------------------- | -------- |
| enum('head', 'middle', 'tail', 'clip') | No       |

---

### `numberOfLines`

Used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.

This prop is commonly used with `ellipsizeMode`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `onLayout`

Invoked on mount and layout changes with

`{nativeEvent: {layout: {x, y, width, height}}}`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLongPress`

This function is called on long press.

e.g., `onLongPress={this.increaseSize}>`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onPress`

This function is called on press.

e.g., `onPress={() => console.log('1st')}`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `pressRetentionOffset`

When the scroll view is disabled, this defines how far your touch may move off of the button, before deactivating the button. Once deactivated, try moving it back and you'll see that the button is once again reactivated! Move it back and forth several times while the scroll view is disabled. Ensure you pass in a constant to reduce memory allocations.

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

---

### `selectable`

Lets the user select text, to use the native copy and paste functionality.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `allowFontScaling`

Specifies whether fonts should scale to respect Text Size accessibility settings. The default is `true`.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `disabled`

Specifies the disabled state of the text view for testing purposes

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `nativeID`

Used to locate this view from native code.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `selectionColor`

The highlight color of the text.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | Android  |

---

### `textBreakStrategy`

Set text break strategy on Android API Level 23+, possible values are `simple`, `highQuality`, `balanced` The default value is `highQuality`.

| Type                                      | Required | Platform |
| ----------------------------------------- | -------- | -------- |
| enum('simple', 'highQuality', 'balanced') | No       | Android  |

---

### `adjustsFontSizeToFit`

Specifies whether font should be scaled down automatically to fit given style constraints.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `minimumFontScale`

Specifies smallest possible scale a font can reach when adjustsFontSizeToFit is enabled. (values 0.01-1.0).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `suppressHighlighting`

When `true`, no visual change is made when text is pressed down. By default, a gray oval highlights the text on press down.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

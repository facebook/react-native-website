---
id: version-0.33-text
title: Text
original_id: text
---

A React component for displaying text.

`Text` supports nesting, styling, and touch handling.

In the following example, the nested title and body text will inherit the `fontFamily` from `styles.baseText`, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines:

```SnackPlayer
import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet } from 'react-native';

class TextInANest extends Component {
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
          {this.state.titleText}<br /><br />
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

// App registration and rendering
AppRegistry.registerComponent('TextInANest', () => TextInANest);
```

### Props

- [`style`](text.md#style)
- [`accessible`](text.md#accessible)
- [`numberOfLines`](text.md#numberoflines)
- [`onLayout`](text.md#onlayout)
- [`onLongPress`](text.md#onlongpress)
- [`onPress`](text.md#onpress)
- [`ellipsizeMode`](text.md#ellipsizemode)
- [`testID`](text.md#testid)
- [`selectable`](text.md#selectable)
- [`adjustsFontSizeToFit`](text.md#adjustsfontsizetofit)
- [`allowFontScaling`](text.md#allowfontscaling)
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

- **`textDecorationLine`**: ReactPropTypes.oneOf( ['none' /*default*/, 'underline', 'line-through', 'underline line-through'] )

- **`color`**: [color](colors.md)

- **`fontSize`**: ReactPropTypes.number

- **`fontStyle`**: ReactPropTypes.oneOf(['normal', 'italic'])

- **`fontVariant`**: ReactPropTypes.arrayOf( ReactPropTypes.oneOf([ 'small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums', ]) )

- **`fontWeight`**: ReactPropTypes.oneOf( ['normal' /*default*/, 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] )

      Specifies font weight. The values 'normal' and 'bold' are supported for
      most fonts. Not all fonts have a variant for each of the numeric values,
      in that case the closest one is chosen.

- **`lineHeight`**: ReactPropTypes.number

- **`textAlign`**: ReactPropTypes.oneOf( ['auto' /*default*/, 'left', 'right', 'center', 'justify'] )

      Specifies text alignment. The value 'justify' is only supported on iOS and
      fallbacks to `left` on Android.

- **`fontFamily`**: ReactPropTypes.string

- **`textShadowColor`**: [color](colors.md)

- **`textShadowOffset`**: ReactPropTypes.shape( {width: ReactPropTypes.number, height: ReactPropTypes.number} )

- **`textShadowRadius`**: ReactPropTypes.number

- **`textAlignVertical`**: ReactPropTypes.oneOf( ['auto' /*default*/, 'top', 'bottom', 'center'] ) (_Android_)

- **`letterSpacing`**: ReactPropTypes.number (_iOS_)

- **`textDecorationColor`**: [color](colors.md) (_iOS_)

- **`textDecorationStyle`**: ReactPropTypes.oneOf( ['solid' /*default*/, 'double', 'dotted','dashed'] ) (_iOS_)

- **`writingDirection`**: ReactPropTypes.oneOf( ['auto' /*default*/, 'ltr', 'rtl'] ) (_iOS_)

---

### `accessible`

When set to `true`, indicates that the view is an accessibility element. The default value for a `Text` element is `true`.

See the [Accessibility guide](/react-native/accessibility.md#accessible-ios-android) for more information.

| Type | Required |
| ---- | -------- |
| bool | No       |

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

e.g., `onLongPress={this.increaseSize}>``

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onPress`

This function is called on press.

e.g., `onPress={() => console.log('1st')}``

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `ellipsizeMode`

This can be one of the following values:

- `head` - The line is displayed so that the end fits in the container and the missing text at the beginning of the line is indicated by an ellipsis glyph. e.g., "...wxyz"
- `middle` - The line is displayed so that the beginning and end fit in the container and the missing text in the middle is indicated by an ellipsis glyph. "ab...yz"
- `tail` - The line is displayed so that the beginning fits in the container and the missing text at the end of the line is indicated by an ellipsis glyph. e.g., "abcd..."
- `clip` - Lines are not drawn past the edge of the text container.

The default is `tail`.

`numberOfLines` must be set in conjunction with this prop.

> `clip` is working only for iOS

| Type                                   | Required |
| -------------------------------------- | -------- |
| enum('head', 'middle', 'tail', 'clip') | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `selectable`

Lets the user select text, to use the native copy and paste functionality.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `adjustsFontSizeToFit`

Specifies whether font should be scaled down automatically to fit given style constraints.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `allowFontScaling`

Specifies whether fonts should scale to respect Text Size accessibility setting on iOS. The default is `true`.

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

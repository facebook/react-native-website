---
id: version-0.10-text
title: Text
original_id: text
---

A React component for displaying text which supports nesting, styling, and touch handling. In the following example, the nested title and body text will inherit the `fontFamily` from `styles.baseText`, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines:

```
renderText: function() {
  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText} onPress={this.onPressTitle}>
        {this.state.titleText + '\n\n'}
      </Text>
      <Text numberOfLines={5}>
        {this.state.bodyText}
      </Text>
    </Text>
  );
},
...
var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};
```

### Props

- [`allowFontScaling`](text.md#allowfontscaling)
- [`numberOfLines`](text.md#numberoflines)
- [`onLayout`](text.md#onlayout)
- [`onPress`](text.md#onpress)
- [`style`](text.md#style)
- [`testID`](text.md#testid)
- [`suppressHighlighting`](text.md#suppresshighlighting)

### Methods

- [`onStartShouldSetResponder`](text.md#onstartshouldsetresponder)
- [`handleResponderTerminationRequest`](text.md#handleresponderterminationrequest)
- [`handleResponderGrant`](text.md#handlerespondergrant)
- [`handleResponderMove`](text.md#handlerespondermove)
- [`handleResponderRelease`](text.md#handleresponderrelease)
- [`handleResponderTerminate`](text.md#handleresponderterminate)

---

# Reference

## Props

### `allowFontScaling`

Specifies should fonts scale to respect Text Size accessibility setting on iOS.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `numberOfLines`

Used to truncate the text with an elipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.

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

### `onPress`

This function is called on press.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `style`

| Type  | Required |
| ----- | -------- |
| style | No       |

- [View Style Props...](view-style-props.md#style)

- **`textAlign`**: enum('auto', 'left', 'right', 'center', 'justify')

  Specifies text alignment. The value 'justify' is only supported on iOS.

- **`color`**: string

- **`fontSize`**: number

- **`fontStyle`**: enum('normal', 'italic')

- **`fontWeight`**: enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')

  Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

- **`lineHeight`**: number

- **`fontFamily`**: string

- **`letterSpacing`**: number (_iOS_)

- **`textDecorationColor`**: string (_iOS_)

- **`textDecorationLine`**: enum('none', 'underline', 'line-through', 'underline line-through') (_iOS_)

- **`textDecorationStyle`**: enum('solid', 'double', 'dotted', 'dashed') (_iOS_)

- **`writingDirection`**: enum('auto', 'ltr', 'rtl') (_iOS_)

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `suppressHighlighting`

When true, no visual change is made when text is pressed down. By default, a gray oval highlights the text on press down.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

## Methods

### `onStartShouldSetResponder()`

```jsx
onStartShouldSetResponder():
```

---

### `handleResponderTerminationRequest()`

```jsx
handleResponderTerminationRequest():
```

---

### `handleResponderGrant()`

```jsx
handleResponderGrant((e: SyntheticEvent), (dispatchID: string));
```

---

### `handleResponderMove()`

```jsx
handleResponderMove((e: SyntheticEvent));
```

---

### `handleResponderRelease()`

```jsx
handleResponderRelease((e: SyntheticEvent));
```

---

### `handleResponderTerminate()`

```jsx
handleResponderTerminate((e: SyntheticEvent));
```

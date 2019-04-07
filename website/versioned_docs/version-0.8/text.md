---
id: version-0.8-text
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

- [`numberOfLines`](text.md#numberoflines)
- [`onLayout`](text.md#onlayout)
- [`onPress`](text.md#onpress)
- [`style`](text.md#style)
- [`suppressHighlighting`](text.md#suppresshighlighting)
- [`testID`](text.md#testid)

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

### `numberOfLines`

Used to truncate the text with an elipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `onLayout`

Invoked on mount and layout changes with

{nativeEvent: {layout: {x, y, width, height}}}.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onPress`

This function is called on press. Text intrinsically supports press handling with a default highlight state (which can be disabled with `suppressHighlighting`).

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `style`

| Type  | Required |
| ----- | -------- |
| style | No       |

- [View Style Props...](view-style-props.md#style)

- **`lineHeight`**: number

- **`color`**: string

- **`fontSize`**: number

- **`fontStyle`**: enum('normal', 'italic')

- **`fontWeight`**: enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')

- **`letterSpacing`**: number

- **`fontFamily`**: string

- **`textAlign`**: enum('auto', 'left', 'right', 'center', 'justify')

- **`textDecorationColor`**: string

- **`textDecorationLine`**: enum('none', 'underline', 'line-through', 'underline line-through')

- **`textDecorationStyle`**: enum('solid', 'double', 'dotted', 'dashed')

- **`writingDirection`**: enum('auto', 'ltr', 'rtl')

---

### `suppressHighlighting`

When true, no visual change is made when text is pressed down. By default, a gray oval highlights the text on press down.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

## Methods

### `onStartShouldSetResponder()`

```javascript
onStartShouldSetResponder():
```

---

### `handleResponderTerminationRequest()`

```javascript
handleResponderTerminationRequest():
```

---

### `handleResponderGrant()`

```javascript
handleResponderGrant((e: SyntheticEvent), (dispatchID: string));
```

---

### `handleResponderMove()`

```javascript
handleResponderMove((e: SyntheticEvent));
```

---

### `handleResponderRelease()`

```javascript
handleResponderRelease((e: SyntheticEvent));
```

---

### `handleResponderTerminate()`

```javascript
handleResponderTerminate((e: SyntheticEvent));
```

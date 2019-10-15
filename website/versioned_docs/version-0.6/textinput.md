---
id: version-0.6-textinput
title: TextInput
original_id: textinput
---

A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto- correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

The most basic use case is to plop down a `TextInput` and subscribe to the `onChangeText` events to read the user input. There are also other events, such as `onSubmitEditing` and `onFocus` that can be subscribed to. A minimal example:

```
<View>
  <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(text) => this.setState({input: text})}
  />
  <Text>{'user input: ' + this.state.input}</Text>
</View>
```

The `value` prop can be used to set the value of the input in order to make the state of the component clear, but <TextInput> does not behave as a true controlled component by default because all operations are asynchronous. Setting `value` once is like setting the default value, but you can change it continuously based on `onChangeText` events as well. If you really want to force the component to always revert to the value you are setting, you can set `controlled={true}`.

The `multiline` prop is not supported in all releases, and some props are multiline only.

### Props

- [`onChangeText`](textinput.md#onchangetext)
- [`autoCapitalize`](textinput.md#autocapitalize)
- [`autoFocus`](textinput.md#autofocus)
- [`bufferDelay`](textinput.md#bufferdelay)
- [`clearButtonMode`](textinput.md#clearbuttonmode)
- [`clearTextOnFocus`](textinput.md#cleartextonfocus)
- [`controlled`](textinput.md#controlled)
- [`editable`](textinput.md#editable)
- [`enablesReturnKeyAutomatically`](textinput.md#enablesreturnkeyautomatically)
- [`keyboardType`](textinput.md#keyboardtype)
- [`multiline`](textinput.md#multiline)
- [`onBlur`](textinput.md#onblur)
- [`onChange`](textinput.md#onchange)
- [`autoCorrect`](textinput.md#autocorrect)
- [`onEndEditing`](textinput.md#onendediting)
- [`onFocus`](textinput.md#onfocus)
- [`onLayout`](textinput.md#onlayout)
- [`onSubmitEditing`](textinput.md#onsubmitediting)
- [`password`](textinput.md#password)
- [`placeholder`](textinput.md#placeholder)
- [`placeholderTextColor`](textinput.md#placeholdertextcolor)
- [`returnKeyType`](textinput.md#returnkeytype)
- [`selectTextOnFocus`](textinput.md#selecttextonfocus)
- [`selectionState`](textinput.md#selectionstate)
- [`style`](textinput.md#style)
- [`testID`](textinput.md#testid)
- [`value`](textinput.md#value)

### Methods

- [`isFocused`](textinput.md#isfocused)

---

# Reference

## Props

### `onChangeText`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `autoCapitalize`

Can tell TextInput to automatically capitalize certain characters.

- characters: all characters,
- words: first letter of each word
- sentences: first letter of each sentence (default)
- none: don't auto capitalize anything

| Type                                             | Required |
| ------------------------------------------------ | -------- |
| enum('none', 'sentences', 'words', 'characters') | No       |

---

### `autoFocus`

If true, focuses the input on componentDidMount. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `bufferDelay`

This helps avoid drops characters due to race conditions between JS and the native text input. The default should be fine, but if you're potentially doing very slow operations on every keystroke then you may want to try increasing this.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `clearButtonMode`

When the clear button should appear on the right side of the text view

| Type                                                       | Required |
| ---------------------------------------------------------- | -------- |
| enum('never', 'while-editing', 'unless-editing', 'always') | No       |

---

### `clearTextOnFocus`

If true, clears the text field automatically when editing begins

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `controlled`

If you really want this to behave as a controlled component, you can set this true, but you will probably see flickering, dropped keystrokes, and/or laggy typing, depending on how you process onChange events.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `editable`

If false, text is not editable. Default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `enablesReturnKeyAutomatically`

If true, the keyboard disables the return key when there is no text and automatically enables it when there is text. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `keyboardType`

Determines which keyboard to open, e.g.`numeric`.

| Type                                                                                                                                                                                | Required |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum('default', 'numeric', 'email-address', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search') | No       |

---

### `multiline`

If true, the text input can be multiple lines. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onBlur`

Callback that is called when the text input is blurred

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onChange`

Callback that is called when the text input's text changes.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `autoCorrect`

If false, disables auto-correct. Default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onEndEditing`

Callback that is called when text input ends.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onFocus`

Callback that is called when the text input is focused

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLayout`

Invoked on mount and layout changes with {x, y, width, height}.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onSubmitEditing`

Callback that is called when the text input's submit button is pressed.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `password`

If true, the text input obscures the text entered so that sensitive text like passwords stay secure. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `placeholder`

The string that will be rendered before text input has been entered

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `placeholderTextColor`

The text color of the placeholder string

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `returnKeyType`

Determines how the return key should look.

| Type                                                                                                          | Required |
| ------------------------------------------------------------------------------------------------------------- | -------- |
| enum('default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call') | No       |

---

### `selectTextOnFocus`

If true, selected the text automatically when editing begins

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `selectionState`

See DocumentSelectionState.js, some state that is responsible for maintaining selection information for a document

| Type                   | Required |
| ---------------------- | -------- |
| DocumentSelectionState | No       |

---

### `style`

Styles

| Type                  | Required |
| --------------------- | -------- |
| [Text](text.md#style) | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `value`

The default value for the text input

| Type   | Required |
| ------ | -------- |
| string | No       |

## Methods

### `isFocused()`

```jsx
isFocused():
```

---
id: version-0.10-textinput
title: TextInput
original_id: textinput
---

A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

The most basic use case is to plop down a `TextInput` and subscribe to the `onChangeText` events to read the user input. There are also other events, such as `onSubmitEditing` and `onFocus` that can be subscribed to. A minimal example:

```
  <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(text) => this.setState({text})}
    value={this.state.text}
  />
```

Note that some props are only available with multiline={true/false}:

var onlyMultiline = { onSelectionChange: true, // not supported in Open Source yet onTextInput: true, // not supported in Open Source yet children: true, };

var notMultiline = { onSubmitEditing: true, };

### Props

- [`placeholderTextColor`](textinput.md#placeholdertextcolor)
- [`autoCapitalize`](textinput.md#autocapitalize)
- [`autoFocus`](textinput.md#autofocus)
- [`defaultValue`](textinput.md#defaultvalue)
- [`editable`](textinput.md#editable)
- [`keyboardType`](textinput.md#keyboardtype)
- [`multiline`](textinput.md#multiline)
- [`onBlur`](textinput.md#onblur)
- [`onChange`](textinput.md#onchange)
- [`onChangeText`](textinput.md#onchangetext)
- [`onEndEditing`](textinput.md#onendediting)
- [`onFocus`](textinput.md#onfocus)
- [`onLayout`](textinput.md#onlayout)
- [`onSubmitEditing`](textinput.md#onsubmitediting)
- [`placeholder`](textinput.md#placeholder)
- [`autoCorrect`](textinput.md#autocorrect)
- [`secureTextEntry`](textinput.md#securetextentry)
- [`style`](textinput.md#style)
- [`testID`](textinput.md#testid)
- [`textAlign`](textinput.md#textalign)
- [`value`](textinput.md#value)
- [`textAlignVertical`](textinput.md#textalignvertical)
- [`underlineColorAndroid`](textinput.md#underlinecolorandroid)
- [`clearButtonMode`](textinput.md#clearbuttonmode)
- [`clearTextOnFocus`](textinput.md#cleartextonfocus)
- [`enablesReturnKeyAutomatically`](textinput.md#enablesreturnkeyautomatically)
- [`maxLength`](textinput.md#maxlength)
- [`returnKeyType`](textinput.md#returnkeytype)
- [`selectTextOnFocus`](textinput.md#selecttextonfocus)
- [`selectionState`](textinput.md#selectionstate)

### Methods

- [`isFocused`](textinput.md#isfocused)
- [`clear`](textinput.md#clear)

---

# Reference

## Props

### `placeholderTextColor`

The text color of the placeholder string

| Type   | Required |
| ------ | -------- |
| string | No       |

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

If true, focuses the input on componentDidMount. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `defaultValue`

Provides an initial value that will change when the user starts typing. Useful for use-cases where you don't want to deal with listening to events and updating the value prop to keep the controlled state in sync.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `editable`

If false, text is not editable. The default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `keyboardType`

Determines which keyboard to open, e.g.`numeric`.

The following values work across platforms:

- default
- numeric
- email-address

| Type                                                                                                                                                                                | Required |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum('default', 'numeric', 'email-address', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search') | No       |

---

### `multiline`

If true, the text input can be multiple lines. The default value is false.

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

### `onChangeText`

Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.

| Type     | Required |
| -------- | -------- |
| function | No       |

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

Invoked on mount and layout changes with `{x, y, width, height}`.

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

### `placeholder`

The string that will be rendered before text input has been entered

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `autoCorrect`

If false, disables auto-correct. The default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `secureTextEntry`

If true, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `style`

Styles

| Type                  | Required |
| --------------------- | -------- |
| [Text](text.md#style) | No       |

---

### `testID`

Used to locate this view in end-to-end tests

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `textAlign`

Set the position of the cursor from where editing will begin. @platorm android

| Type                           | Required |
| ------------------------------ | -------- |
| enum('start', 'center', 'end') | No       |

---

### `value`

The value to show for the text input. TextInput is a controlled component, which means the native value will be forced to match this value prop if provided. For most uses this works great, but in some cases this may cause flickering - one common cause is preventing edits by keeping value the same. In addition to setting the same value, either set `editable={false}`, or set/update `maxLength` to prevent unwanted edits without flicker.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `textAlignVertical`

Aligns text vertically within the TextInput.

| Type                            | Required | Platform |
| ------------------------------- | -------- | -------- |
| enum('top', 'center', 'bottom') | No       | Android  |

---

### `underlineColorAndroid`

The color of the textInput underline.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

---

### `clearButtonMode`

When the clear button should appear on the right side of the text view

| Type                                                       | Required | Platform |
| ---------------------------------------------------------- | -------- | -------- |
| enum('never', 'while-editing', 'unless-editing', 'always') | No       | iOS      |

---

### `clearTextOnFocus`

If true, clears the text field automatically when editing begins

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `enablesReturnKeyAutomatically`

If true, the keyboard disables the return key when there is no text and automatically enables it when there is text. The default value is false.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `maxLength`

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `returnKeyType`

Determines how the return key should look.

| Type                                                                                                          | Required | Platform |
| ------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| enum('default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call') | No       | iOS      |

---

### `selectTextOnFocus`

If true, all text will automatically be selected on focus

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `selectionState`

See DocumentSelectionState.js, some state that is responsible for maintaining selection information for a document

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| DocumentSelectionState | No       | iOS      |

## Methods

### `isFocused()`

```jsx
isFocused():
```

---

### `clear()`

```jsx
clear();
```

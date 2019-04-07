---
id: version-0.27-textinput
title: TextInput
original_id: textinput
---

A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

The simplest use case is to plop down a `TextInput` and subscribe to the `onChangeText` events to read the user input. There are also other events, such as `onSubmitEditing` and `onFocus` that can be subscribed to. A simple example:

```
  <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(text) => this.setState({text})}
    value={this.state.text}
  />
```

Note that some props are only available with `multiline={true/false}`. Additionally, border styles that apply to only one side of the element (e.g., `borderBottomColor`, `borderLeftWidth`, etc.) will not be applied if `multiline=false`. To achieve the same effect, you can wrap your `TextInput` in a `View`:

```
 <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, }}>
   <TextInput {...props} />
 </View>
```

### Props

- [View props...](view.md#props)

* [`placeholder`](textinput.md#placeholder)
* [`autoCapitalize`](textinput.md#autocapitalize)
* [`autoFocus`](textinput.md#autofocus)
* [`blurOnSubmit`](textinput.md#bluronsubmit)
* [`defaultValue`](textinput.md#defaultvalue)
* [`editable`](textinput.md#editable)
* [`keyboardType`](textinput.md#keyboardtype)
* [`maxLength`](textinput.md#maxlength)
* [`multiline`](textinput.md#multiline)
* [`onBlur`](textinput.md#onblur)
* [`onChange`](textinput.md#onchange)
* [`onChangeText`](textinput.md#onchangetext)
* [`onEndEditing`](textinput.md#onendediting)
* [`onFocus`](textinput.md#onfocus)
* [`onLayout`](textinput.md#onlayout)
* [`onSelectionChange`](textinput.md#onselectionchange)
* [`onSubmitEditing`](textinput.md#onsubmitediting)
* [`autoCorrect`](textinput.md#autocorrect)
* [`placeholderTextColor`](textinput.md#placeholdertextcolor)
* [`returnKeyType`](textinput.md#returnkeytype)
* [`secureTextEntry`](textinput.md#securetextentry)
* [`selectTextOnFocus`](textinput.md#selecttextonfocus)
* [`selectionColor`](textinput.md#selectioncolor)
* [`style`](textinput.md#style)
* [`value`](textinput.md#value)
* [`numberOfLines`](textinput.md#numberoflines)
* [`returnKeyLabel`](textinput.md#returnkeylabel)
* [`underlineColorAndroid`](textinput.md#underlinecolorandroid)
* [`clearButtonMode`](textinput.md#clearbuttonmode)
* [`clearTextOnFocus`](textinput.md#cleartextonfocus)
* [`enablesReturnKeyAutomatically`](textinput.md#enablesreturnkeyautomatically)
* [`keyboardAppearance`](textinput.md#keyboardappearance)
* [`onKeyPress`](textinput.md#onkeypress)
* [`selectionState`](textinput.md#selectionstate)

### Methods

- [`isFocused`](textinput.md#isfocused)
- [`clear`](textinput.md#clear)

---

# Reference

## Props

### `placeholder`

The string that will be rendered before text input has been entered

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

### `blurOnSubmit`

If true, the text field will blur when submitted. The default value is true for single-line fields and false for multiline fields. Note that for multiline fields, setting blurOnSubmit to true means that pressing return will blur the field and trigger the onSubmitEditing event instead of inserting a newline into the field.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `defaultValue`

Provides an initial value that will change when the user starts typing. Useful for simple use-cases where you don't want to deal with listening to events and updating the value prop to keep the controlled state in sync.

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
| enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search') | No       |

---

### `maxLength`

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

| Type   | Required |
| ------ | -------- |
| number | No       |

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

### `onSelectionChange`

Callback that is called when the text input selection is changed

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onSubmitEditing`

Callback that is called when the text input's submit button is pressed. Invalid if multiline={true} is specified.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `autoCorrect`

If false, disables auto-correct. The default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `placeholderTextColor`

The text color of the placeholder string

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `returnKeyType`

Determines how the return key should look. On Android you can also use `returnKeyLabel`.

The following values work across platforms:

- done
- go
- next
- search
- send

The following values work on Android only:

- none
- previous

The following values work on iOS only:

- default
- emergency-call
- google
- join
- route
- yahoo

| Type                                                                                                                              | Required |
| --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo') | No       |

---

### `secureTextEntry`

If true, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `selectTextOnFocus`

If true, all text will automatically be selected on focus

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `selectionColor`

The highlight (and cursor on ios) color of the text input

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `style`

Styles

| Type                  | Required |
| --------------------- | -------- |
| [Text](text.md#style) | No       |

---

### `value`

The value to show for the text input. TextInput is a controlled component, which means the native value will be forced to match this value prop if provided. For most uses this works great, but in some cases this may cause flickering - one common cause is preventing edits by keeping value the same. In addition to simply setting the same value, either set `editable={false}`, or set/update `maxLength` to prevent unwanted edits without flicker.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `numberOfLines`

Sets the number of lines for a TextInput. Use it with multiline set to true to be able to fill the lines.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | Android  |

---

### `returnKeyLabel`

Sets the return key to the label. Use it instead of `returnKeyType`.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | Android  |

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

### `keyboardAppearance`

Determines the color of the keyboard.

| Type                             | Required | Platform |
| -------------------------------- | -------- | -------- |
| enum('default', 'light', 'dark') | No       | iOS      |

---

### `onKeyPress`

Callback that is called when a key is pressed. Pressed key value is passed as an argument to the callback handler. Fires before onChange callbacks.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `selectionState`

See DocumentSelectionState.js, some state that is responsible for maintaining selection information for a document

| Type                   | Required | Platform |
| ---------------------- | -------- | -------- |
| DocumentSelectionState | No       | iOS      |

## Methods

### `isFocused()`

```javascript
isFocused():
```

Returns if the input is currently focused.

---

### `clear()`

```javascript
clear();
```

Removes all text from the input.

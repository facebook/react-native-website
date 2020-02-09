---
id: version-0.31-textinput
title: TextInput
original_id: textinput
---

A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

One use case is to plop down a `TextInput` and subscribe to the `onChangeText` events to read the user input. There are also other events, such as `onSubmitEditing` and `onFocus` that can be subscribed to. A minimal example:

```SnackPlayer
import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent('AwesomeProject', () => UselessTextInput);
```

Note that some props are only available with `multiline={true/false}`. Additionally, border styles that apply to only one side of the element (e.g., `borderBottomColor`, `borderLeftWidth`, etc.) will not be applied if `multiline=false`. To achieve the same effect, you can wrap your `TextInput` in a `View`:

```SnackPlayer
import React, { Component } from 'react';
import { AppRegistry, View, TextInput } from 'react-native';

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {40}
      />
    );
  }
}

class UselessTextInputMultiline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Multiline Placeholder',
    };
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
     <View style={{
       backgroundColor: this.state.text,
       borderBottomColor: '#000000',
       borderBottomWidth: 1 }}
     >
       <UselessTextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
       />
     </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent(
 'AwesomeProject',
 () => UselessTextInputMultiline
);
```

`TextInput` has by default a border at the bottom of its view. This border has its padding set by the background image provided by the system, and it cannot be changed. Solutions to avoid this is to either not set height explicitly, case in which the system will take care of displaying the border in the correct position, or to not display the border by setting `underlineColorAndroid` to transparent.

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
* [`onContentSizeChange`](textinput.md#oncontentsizechange)
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
* [`inlineImageLeft`](textinput.md#inlineimageleft)
* [`inlineImagePadding`](textinput.md#inlineimagepadding)
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

The string that will be rendered before text input has been entered.

| Type             | Required |
| ---------------- | -------- |
| PropTypes.string | No       |

---

### `autoCapitalize`

Can tell `TextInput` to automatically capitalize certain characters.

- `characters`: all characters.
- `words`: first letter of each word.
- `sentences`: first letter of each sentence (_default_).
- `none`: don't auto capitalize anything.

| Type | Required |
| ---- | -------- |


| PropTypes.oneOf([ 'none', 'sentences', 'words', 'characters', ]) | No |

---

### `autoFocus`

If `true`, focuses the input on `componentDidMount`. The default value is `false`.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `blurOnSubmit`

If `true`, the text field will blur when submitted. The default value is true for single-line fields and false for multiline fields. Note that for multiline fields, setting `blurOnSubmit` to `true` means that pressing return will blur the field and trigger the `onSubmitEditing` event instead of inserting a newline into the field.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `defaultValue`

Provides an initial value that will change when the user starts typing. Useful for use-cases where you do not want to deal with listening to events and updating the value prop to keep the controlled state in sync.

| Type             | Required |
| ---------------- | -------- |
| PropTypes.string | No       |

---

### `editable`

If `false`, text is not editable. The default value is `true`.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `keyboardType`

Determines which keyboard to open, e.g.`numeric`.

The following values work across platforms:

- `default`
- `numeric`
- `email-address`
- `phone-pad`

| Type | Required |
| ---- | -------- |


| PropTypes.oneOf([ // Cross-platform 'default', 'email-address', 'numeric', 'phone-pad', // iOS-only 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', ]) | No |

---

### `maxLength`

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

| Type             | Required |
| ---------------- | -------- |
| PropTypes.number | No       |

---

### `multiline`

If `true`, the text input can be multiple lines. The default value is `false`.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `onBlur`

Callback that is called when the text input is blurred.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onChange`

Callback that is called when the text input's text changes.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onChangeText`

Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onContentSizeChange`

Callback that is called when the text input's content size changes. This will be called with `{ nativeEvent: { contentSize: { width, height } } }`.

Only called for multiline text inputs.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onEndEditing`

Callback that is called when text input ends.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onFocus`

Callback that is called when the text input is focused.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onLayout`

Invoked on mount and layout changes with `{x, y, width, height}`.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onSelectionChange`

Callback that is called when the text input selection is changed.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onSubmitEditing`

Callback that is called when the text input's submit button is pressed. Invalid if `multiline={true}` is specified.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `autoCorrect`

If `false`, disables auto-correct. The default value is `true`.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `placeholderTextColor`

The text color of the placeholder string.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `returnKeyType`

Determines how the return key should look. On Android you can also use `returnKeyLabel`.

_Cross platform_

The following values work across platforms:

- `done`
- `go`
- `next`
- `search`
- `send`

_Android Only_

The following values work on Android only:

- `none`
- `previous`

_iOS Only_

The following values work on iOS only:

- `default`
- `emergency-call`
- `google`
- `join`
- `route`
- `yahoo`

| Type | Required |
| ---- | -------- |


| PropTypes.oneOf([ // Cross-platform 'done', 'go', 'next', 'search', 'send', // Android-only 'none', 'previous', // iOS-only 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo', ]) | No |

---

### `secureTextEntry`

If `true`, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is `false`.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `selectTextOnFocus`

If `true`, all text will automatically be selected on focus.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `selectionColor`

The highlight (and cursor on iOS) color of the text input.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `style`

[Styles](style.md)

| Type                  | Required |
| --------------------- | -------- |
| [Text](text.md#style) | No       |

---

### `value`

The value to show for the text input. `TextInput` is a controlled component, which means the native value will be forced to match this value prop if provided. For most uses, this works great, but in some cases this may cause flickering - one common cause is preventing edits by keeping value the same. In addition to setting the same value, either set `editable={false}`, or set/update `maxLength` to prevent unwanted edits without flicker.

| Type             | Required |
| ---------------- | -------- |
| PropTypes.string | No       |

---

### `inlineImageLeft`

If defined, the provided image resource will be rendered on the left.

| Type             | Required | Platform |
| ---------------- | -------- | -------- |
| PropTypes.string | No       | Android  |

---

### `inlineImagePadding`

Padding between the inline image, if any, and the text input itself.

| Type             | Required | Platform |
| ---------------- | -------- | -------- |
| PropTypes.number | No       | Android  |

---

### `numberOfLines`

Sets the number of lines for a `TextInput`. Use it with multiline set to `true` to be able to fill the lines.

| Type             | Required | Platform |
| ---------------- | -------- | -------- |
| PropTypes.number | No       | Android  |

---

### `returnKeyLabel`

Sets the return key to the label. Use it instead of `returnKeyType`.

| Type             | Required | Platform |
| ---------------- | -------- | -------- |
| PropTypes.string | No       | Android  |

---

### `underlineColorAndroid`

The color of the `TextInput` underline.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | Android  |

---

### `clearButtonMode`

When the clear button should appear on the right side of the text view.

| Type | Required | Platform |
| ---- | -------- | -------- |


| PropTypes.oneOf([ 'never', 'while-editing', 'unless-editing', 'always', ]) | No | iOS |

---

### `clearTextOnFocus`

If `true`, clears the text field automatically when editing begins.

| Type           | Required | Platform |
| -------------- | -------- | -------- |
| PropTypes.bool | No       | iOS      |

---

### `enablesReturnKeyAutomatically`

If `true`, the keyboard disables the return key when there is no text and automatically enables it when there is text. The default value is `false`.

| Type           | Required | Platform |
| -------------- | -------- | -------- |
| PropTypes.bool | No       | iOS      |

---

### `keyboardAppearance`

Determines the color of the keyboard.

| Type | Required | Platform |
| ---- | -------- | -------- |


| PropTypes.oneOf([ 'default', 'light', 'dark', ]) | No | iOS |

---

### `onKeyPress`

Callback that is called when a key is pressed. Pressed key value is passed as an argument to the callback handler. Fires before `onChange` callbacks.

| Type           | Required | Platform |
| -------------- | -------- | -------- |
| PropTypes.func | No       | iOS      |

---

### `selectionState`

An instance of `DocumentSelectionState`, this is some state that is responsible for maintaining selection information for a document.

Some functionality that can be performed with this instance is:

- `blur()`
- `focus()`
- `update()`

> You can reference `DocumentSelectionState` in [`vendor/document/selection/DocumentSelectionState.js`](https://github.com/facebook/react-native/blob/master/Libraries/vendor/document/selection/DocumentSelectionState.js)

| Type                                         | Required | Platform |
| -------------------------------------------- | -------- | -------- |
| PropTypes.instanceOf(DocumentSelectionState) | No       | iOS      |

## Methods

### `isFocused()`

```jsx
isFocused():
```

Returns `true` if the input is currently focused; `false` otherwise.

---

### `clear()`

```jsx
clear();
```

Removes all text from the `TextInput`.

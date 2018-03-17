---
id: textinput
title: TextInput
---

A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

The simplest use case is to plop down a `TextInput` and subscribe to the `onChangeText` events to read the user input. There are also other events, such as `onSubmitEditing` and `onFocus` that can be subscribed to. A simple example:

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class UselessTextInput extends Component {
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

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => UselessTextInput);
```

Two methods exposed via the native element are .focus() and .blur() that will focus or blur the TextInput programmatically.

Note that some props are only available with `multiline={true/false}`. Additionally, border styles that apply to only one side of the element (e.g., `borderBottomColor`, `borderLeftWidth`, etc.) will not be applied if `multiline=false`. To achieve the same effect, you can wrap your `TextInput` in a `View`:

```ReactNativeWebPlayer
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

export default class UselessTextInputMultiline extends Component {
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

// skip these lines if using Create React Native App
AppRegistry.registerComponent(
 'AwesomeProject',
 () => UselessTextInputMultiline
);
```

`TextInput` has by default a border at the bottom of its view. This border has its padding set by the background image provided by the system, and it cannot be changed. Solutions to avoid this is to either not set height explicitly, case in which the system will take care of displaying the border in the correct position, or to not display the border by setting `underlineColorAndroid` to transparent.

Note that on Android performing text selection in input can change app's activity `windowSoftInputMode` param to `adjustResize`. This may cause issues with components that have position: 'absolute' while keyboard is active. To avoid this behavior either specify `windowSoftInputMode` in AndroidManifest.xml ( https://developer.android.com/guide/topics/manifest/activity-element.html ) or control this param programmatically with native code.

### Props

* [View props...](view.md#props)

- [`placeholderTextColor`](textinput.md#placeholdertextcolor)
- [`allowFontScaling`](textinput.md#allowfontscaling)
- [`autoCorrect`](textinput.md#autocorrect)
- [`autoFocus`](textinput.md#autofocus)
- [`blurOnSubmit`](textinput.md#bluronsubmit)
- [`caretHidden`](textinput.md#carethidden)
- [`contextMenuHidden`](textinput.md#contextMenuHidden)
- [`defaultValue`](textinput.md#defaultvalue)
- [`editable`](textinput.md#editable)
- [`keyboardType`](textinput.md#keyboardtype)
- [`maxLength`](textinput.md#maxlength)
- [`multiline`](textinput.md#multiline)
- [`onBlur`](textinput.md#onblur)
- [`onChange`](textinput.md#onchange)
- [`onChangeText`](textinput.md#onchangetext)
- [`onContentSizeChange`](textinput.md#oncontentsizechange)
- [`onEndEditing`](textinput.md#onendediting)
- [`onFocus`](textinput.md#onfocus)
- [`onLayout`](textinput.md#onlayout)
- [`onScroll`](textinput.md#onscroll)
- [`onSelectionChange`](textinput.md#onselectionchange)
- [`onSubmitEditing`](textinput.md#onsubmitediting)
- [`placeholder`](textinput.md#placeholder)
- [`autoCapitalize`](textinput.md#autocapitalize)
- [`returnKeyType`](textinput.md#returnkeytype)
- [`secureTextEntry`](textinput.md#securetextentry)
- [`selectTextOnFocus`](textinput.md#selecttextonfocus)
- [`selection`](textinput.md#selection)
- [`selectionColor`](textinput.md#selectioncolor)
- [`style`](textinput.md#style)
- [`value`](textinput.md#value)
- [`disableFullscreenUI`](textinput.md#disablefullscreenui)
- [`inlineImageLeft`](textinput.md#inlineimageleft)
- [`inlineImagePadding`](textinput.md#inlineimagepadding)
- [`numberOfLines`](textinput.md#numberoflines)
- [`returnKeyLabel`](textinput.md#returnkeylabel)
- [`textBreakStrategy`](textinput.md#textbreakstrategy)
- [`underlineColorAndroid`](textinput.md#underlinecolorandroid)
- [`clearButtonMode`](textinput.md#clearbuttonmode)
- [`clearTextOnFocus`](textinput.md#cleartextonfocus)
- [`dataDetectorTypes`](textinput.md#datadetectortypes)
- [`enablesReturnKeyAutomatically`](textinput.md#enablesreturnkeyautomatically)
- [`keyboardAppearance`](textinput.md#keyboardappearance)
- [`onKeyPress`](textinput.md#onkeypress)
- [`selectionState`](textinput.md#selectionstate)
- [`spellCheck`](textinput.md#spellcheck)

### Methods

* [`isFocused`](textinput.md#isfocused)
* [`clear`](textinput.md#clear)

---

# 文档

## Props

### `placeholderTextColor`

The text color of the placeholder string.

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `allowFontScaling`

Specifies whether fonts should scale to respect Text Size accessibility settings. The default is `true`.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `autoCorrect`

If `false`, disables auto-correct. The default value is `true`.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `autoFocus`

If `true`, focuses the input on `componentDidMount`. The default value is `false`.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `blurOnSubmit`

If `true`, the text field will blur when submitted. The default value is true for single-line fields and false for multiline fields. Note that for multiline fields, setting `blurOnSubmit` to `true` means that pressing return will blur the field and trigger the `onSubmitEditing` event instead of inserting a newline into the field.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `caretHidden`

If `true`, caret is hidden. The default value is `false`.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `contextMenuHidden`

If `true`, context menu is hidden. The default value is `false`.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `defaultValue`

Provides an initial value that will change when the user starts typing. Useful for simple use-cases where you do not want to deal with listening to events and updating the value prop to keep the controlled state in sync.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `editable`

If `false`, text is not editable. The default value is `true`.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `keyboardType`

Determines which keyboard to open, e.g.`numeric`.

The following values work across platforms:

* `default`
* `numeric`
* `email-address`
* `phone-pad`

_iOS Only_

The following values work on iOS only:

* `ascii-capable`
* `numbers-and-punctuation`
* `url`
* `number-pad`
* `name-phone-pad`
* `decimal-pad`
* `twitter`
* `web-search`

_Android Only_

The following values work on Android only:

* `visible-password`

| 类型                                                                                                                                                                                                    | 必填 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password') | 否   |

---

### `maxLength`

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `multiline`

If `true`, the text input can be multiple lines. The default value is `false`.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `onBlur`

Callback that is called when the text input is blurred.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onChange`

Callback that is called when the text input's text changes.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onChangeText`

Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onContentSizeChange`

Callback that is called when the text input's content size changes. This will be called with `{ nativeEvent: { contentSize: { width, height } } }`.

Only called for multiline text inputs.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onEndEditing`

Callback that is called when text input ends.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onFocus`

Callback that is called when the text input is focused.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLayout`

Invoked on mount and layout changes with `{x, y, width, height}`.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onScroll`

Invoked on content scroll with `{ nativeEvent: { contentOffset: { x, y } } }`. May also contain other properties from ScrollEvent but on Android contentSize is not provided for performance reasons.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onSelectionChange`

Callback that is called when the text input selection is changed. This will be called with `{ nativeEvent: { selection: { start, end } } }`.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onSubmitEditing`

Callback that is called when the text input's submit button is pressed. Invalid if `multiline={true}` is specified.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `placeholder`

The string that will be rendered before text input has been entered.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `autoCapitalize`

Can tell `TextInput` to automatically capitalize certain characters.

* `characters`: all characters.
* `words`: first letter of each word.
* `sentences`: first letter of each sentence (_default_).
* `none`: don't auto capitalize anything.

| 类型                                             | 必填 |
| ------------------------------------------------ | ---- |
| enum('none', 'sentences', 'words', 'characters') | 否   |

---

### `returnKeyType`

Determines how the return key should look. On Android you can also use `returnKeyLabel`.

_Cross platform_

The following values work across platforms:

* `done`
* `go`
* `next`
* `search`
* `send`

_Android Only_

The following values work on Android only:

* `none`
* `previous`

_iOS Only_

The following values work on iOS only:

* `default`
* `emergency-call`
* `google`
* `join`
* `route`
* `yahoo`

| 类型                                                                                                                              | 必填 |
| --------------------------------------------------------------------------------------------------------------------------------- | ---- |
| enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo') | 否   |

---

### `secureTextEntry`

If `true`, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is `false`. Does not work with 'multiline={true}'.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `selectTextOnFocus`

If `true`, all text will automatically be selected on focus.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `selection`

The start and end of the text input's selection. Set start and end to the same value to position the cursor.

| 类型                                | 必填 |
| ----------------------------------- | ---- |
| object: {start: number,end: number} | 否   |

---

### `selectionColor`

The highlight and cursor color of the text input.

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `style`

Note that not all Text styles are supported, an incomplete list of what is not supported includes:

* `borderLeftWidth`
* `borderTopWidth`
* `borderRightWidth`
* `borderBottomWidth`
* `borderTopLeftRadius`
* `borderTopRightRadius`
* `borderBottomRightRadius`
* `borderBottomLeftRadius`

see [Issue#7070](https://github.com/facebook/react-native/issues/7070) for more detail.

[Styles](style.md)

| 类型                  | 必填 |
| --------------------- | ---- |
| [Text](text.md#style) | 否   |

---

### `value`

The value to show for the text input. `TextInput` is a controlled component, which means the native value will be forced to match this value prop if provided. For most uses, this works great, but in some cases this may cause flickering - one common cause is preventing edits by keeping value the same. In addition to simply setting the same value, either set `editable={false}`, or set/update `maxLength` to prevent unwanted edits without flicker.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `disableFullscreenUI`

When `false`, if there is a small amount of space available around a text input (e.g. landscape orientation on a phone), the OS may choose to have the user edit the text inside of a full screen text input mode. When `true`, this feature is disabled and users will always edit the text directly inside of the text input. Defaults to `false`.

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `inlineImageLeft`

If defined, the provided image resource will be rendered on the left. The image resource must be inside `/android/app/src/main/res/drawable` and referenced like

```
<TextInput
 inlineImageLeft='search_icon'
/>
```

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | 否   | Android |

---

### `inlineImagePadding`

Padding between the inline image, if any, and the text input itself.

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | 否   | Android |

---

### `numberOfLines`

Sets the number of lines for a `TextInput`. Use it with multiline set to `true` to be able to fill the lines.

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | 否   | Android |

---

### `returnKeyLabel`

Sets the return key to the label. Use it instead of `returnKeyType`.

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | 否   | Android |

---

### `textBreakStrategy`

Set text break strategy on Android API Level 23+, possible values are `simple`, `highQuality`, `balanced` The default value is `simple`.

| 类型                                      | 必填 | 平台    |
| ----------------------------------------- | ---- | ------- |
| enum('simple', 'highQuality', 'balanced') | 否   | Android |

---

### `underlineColorAndroid`

The color of the `TextInput` underline.

| 类型               | 必填 | 平台    |
| ------------------ | ---- | ------- |
| [color](colors.md) | 否   | Android |

---

### `clearButtonMode`

When the clear button should appear on the right side of the text view. This property is supported only for single-line TextInput component.

| 类型                                                       | 必填 | 平台 |
| ---------------------------------------------------------- | ---- | ---- |
| enum('never', 'while-editing', 'unless-editing', 'always') | 否   | iOS  |

---

### `clearTextOnFocus`

If `true`, clears the text field automatically when editing begins.

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `dataDetectorTypes`

Determines the types of data converted to clickable URLs in the text input. Only valid if `multiline={true}` and `editable={false}`. By default no data types are detected.

You can provide one type or an array of many types.

Possible values for `dataDetectorTypes` are:

* `'phoneNumber'`
* `'link'`
* `'address'`
* `'calendarEvent'`
* `'none'`
* `'all'`

| 类型                                                                                                                                                     | 必填 | 平台 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- |
| enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), ,array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all') | 否   | iOS  |

---

### `enablesReturnKeyAutomatically`

If `true`, the keyboard disables the return key when there is no text and automatically enables it when there is text. The default value is `false`.

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `keyboardAppearance`

Determines the color of the keyboard.

| 类型                             | 必填 | 平台 |
| -------------------------------- | ---- | ---- |
| enum('default', 'light', 'dark') | 否   | iOS  |

---

### `onKeyPress`

Callback that is called when a key is pressed. This will be called with `{ nativeEvent: { key: keyValue } }` where `keyValue` is `'Enter'` or `'Backspace'` for respective keys and the typed-in character otherwise including `' '` for space. Fires before `onChange` callbacks.

| 类型     | 必填 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `selectionState`

An instance of `DocumentSelectionState`, this is some state that is responsible for maintaining selection information for a document.

Some functionality that can be performed with this instance is:

* `blur()`
* `focus()`
* `update()`

> You can reference `DocumentSelectionState` in [`vendor/document/selection/DocumentSelectionState.js`](https://github.com/facebook/react-native/blob/master/Libraries/vendor/document/selection/DocumentSelectionState.js)

| 类型                   | 必填 | 平台 |
| ---------------------- | ---- | ---- |
| DocumentSelectionState | 否   | iOS  |

---

### `spellCheck`

If `false`, disables spell-check style (i.e. red underlines). The default value is inherited from `autoCorrect`.

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

## Methods

### `isFocused()`

```javascript
isFocused():
```

Returns `true` if the input is currently focused; `false` otherwise.

---

### `clear()`

```javascript
clear();
```

Removes all text from the `TextInput`.

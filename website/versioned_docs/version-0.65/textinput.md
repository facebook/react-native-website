---
id: textinput
title: TextInput
---

A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types, such as a numeric keypad.

The most basic use case is to plop down a `TextInput` and subscribe to the `onChangeText` events to read the user input. There are also other events, such as `onSubmitEditing` and `onFocus` that can be subscribed to. A minimal example:

```SnackPlayer name=TextInput
import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UselessTextInput;
```

Two methods exposed via the native element are .focus() and .blur() that will focus or blur the TextInput programmatically.

Note that some props are only available with `multiline={true/false}`. Additionally, border styles that apply to only one side of the element (e.g., `borderBottomColor`, `borderLeftWidth`, etc.) will not be applied if `multiline=true`. To achieve the same effect, you can wrap your `TextInput` in a `View`:

```SnackPlayer name=TextInput
import React from 'react';
import { View, TextInput } from 'react-native';

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

const UselessTextInputMultiline = () => {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View
      style={{
        backgroundColor: value,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
      }}>
      <UselessTextInput
        multiline
        numberOfLines={4}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 10}}
      />
    </View>
  );
}

export default UselessTextInputMultiline;
```

`TextInput` has by default a border at the bottom of its view. This border has its padding set by the background image provided by the system, and it cannot be changed. Solutions to avoid this are to either not set height explicitly, in which case the system will take care of displaying the border in the correct position, or to not display the border by setting `underlineColorAndroid` to transparent.

Note that on Android performing text selection in an input can change the app's activity `windowSoftInputMode` param to `adjustResize`. This may cause issues with components that have position: 'absolute' while the keyboard is active. To avoid this behavior either specify `windowSoftInputMode` in AndroidManifest.xml ( https://developer.android.com/guide/topics/manifest/activity-element.html ) or control this param programmatically with native code.

---

# Reference

## Props

### [View Props](view.md#props)

Inherits [View Props](view.md#props).

---

### `allowFontScaling`

Specifies whether fonts should scale to respect Text Size accessibility settings. The default is `true`.

| Type |
| ---- |
| bool |

---

### `autoCapitalize`

Tells `TextInput` to automatically capitalize certain characters. This property is not supported by some keyboard types such as `name-phone-pad`.

- `characters`: all characters.
- `words`: first letter of each word.
- `sentences`: first letter of each sentence (_default_).
- `none`: don't auto capitalize anything.

| Type                                             |
| ------------------------------------------------ |
| enum('none', 'sentences', 'words', 'characters') |

---

### `autoCompleteType` <div class="label android">Android</div>

Specifies autocomplete hints for the system, so it can provide autofill. On Android, the system will always attempt to offer autofill by using heuristics to identify the type of content. To disable autocomplete, set `autoCompleteType` to `off`.

Possible values for `autoCompleteType` are:

- `off`
- `username`
- `password`
- `email`
- `name`
- `tel`
- `street-address`
- `postal-code`
- `cc-number`
- `cc-csc`
- `cc-exp`
- `cc-exp-month`
- `cc-exp-year`

| Type                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| enum('off', 'username', 'password', 'email', 'name', 'tel', 'street-address', 'postal-code', 'cc-number', 'cc-csc', 'cc-exp', 'cc-exp-month', 'cc-exp-year') |

---

### `autoCorrect`

If `false`, disables auto-correct. The default value is `true`.

| Type |
| ---- |
| bool |

---

### `autoFocus`

If `true`, focuses the input on `componentDidMount` or `useEffect`. The default value is `false`.

| Type |
| ---- |
| bool |

---

### `blurOnSubmit`

If `true`, the text field will blur when submitted. The default value is true for single-line fields and false for multiline fields. Note that for multiline fields, setting `blurOnSubmit` to `true` means that pressing return will blur the field and trigger the `onSubmitEditing` event instead of inserting a newline into the field.

| Type |
| ---- |
| bool |

---

### `caretHidden`

If `true`, caret is hidden. The default value is `false`.

| Type |
| ---- |
| bool |

---

### `clearButtonMode` <div class="label ios">iOS</div>

When the clear button should appear on the right side of the text view. This property is supported only for single-line TextInput component. The default value is `never`.

| Type                                                       |
| ---------------------------------------------------------- |
| enum('never', 'while-editing', 'unless-editing', 'always') |

---

### `clearTextOnFocus` <div class="label ios">iOS</div>

If `true`, clears the text field automatically when editing begins.

| Type |
| ---- |
| bool |

---

### `contextMenuHidden`

If `true`, context menu is hidden. The default value is `false`.

| Type |
| ---- |
| bool |

---

### `dataDetectorTypes` <div class="label ios">iOS</div>

Determines the types of data converted to clickable URLs in the text input. Only valid if `multiline={true}` and `editable={false}`. By default no data types are detected.

You can provide one type or an array of many types.

Possible values for `dataDetectorTypes` are:

- `'phoneNumber'`
- `'link'`
- `'address'`
- `'calendarEvent'`
- `'none'`
- `'all'`

| Type                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), ,array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all') |

---

### `defaultValue`

Provides an initial value that will change when the user starts typing. Useful for use-cases where you do not want to deal with listening to events and updating the value prop to keep the controlled state in sync.

| Type   |
| ------ |
| string |

---

### `disableFullscreenUI` <div class="label android">Android</div>

When `false`, if there is a small amount of space available around a text input (e.g. landscape orientation on a phone), the OS may choose to have the user edit the text inside of a full screen text input mode. When `true`, this feature is disabled and users will always edit the text directly inside of the text input. Defaults to `false`.

| Type |
| ---- |
| bool |

---

### `editable`

If `false`, text is not editable. The default value is `true`.

| Type |
| ---- |
| bool |

---

### `enablesReturnKeyAutomatically` <div class="label ios">iOS</div>

If `true`, the keyboard disables the return key when there is no text and automatically enables it when there is text. The default value is `false`.

| Type |
| ---- |
| bool |

---

### `importantForAutofill` <div class="label android">Android</div>

Tells the operating system whether the individual fields in your app should be included in a view structure for autofill purposes on Android API Level 26+. Possible values are `auto`, `no`, `noExcludeDescendants`, `yes`, and `yesExcludeDescendants`. The default value is `auto`.

- `auto`: Let the Android System use its heuristics to determine if the view is important for autofill.
- `no`: This view isn't important for autofill.
- `noExcludeDescendants`: This view and its children aren't important for autofill.
- `yes`: This view is important for autofill.
- `yesExcludeDescendants`: This view is important for autofill, but its children aren't important for autofill.

| Type                                                                       |
| -------------------------------------------------------------------------- |
| enum('auto', 'no', 'noExcludeDescendants', 'yes', 'yesExcludeDescendants') |

---

### `inlineImageLeft` <div class="label android">Android</div>

If defined, the provided image resource will be rendered on the left. The image resource must be inside `/android/app/src/main/res/drawable` and referenced like

```
<TextInput
 inlineImageLeft='search_icon'
/>
```

| Type   |
| ------ |
| string |

---

### `inlineImagePadding` <div class="label android">Android</div>

Padding between the inline image, if any, and the text input itself.

| Type   |
| ------ |
| number |

---

### `inputAccessoryViewID` <div class="label ios">iOS</div>

An optional identifier which links a custom [InputAccessoryView](inputaccessoryview.md) to this text input. The InputAccessoryView is rendered above the keyboard when this text input is focused.

| Type   |
| ------ |
| string |

---

### `keyboardAppearance` <div class="label ios">iOS</div>

Determines the color of the keyboard.

| Type                             |
| -------------------------------- |
| enum('default', 'light', 'dark') |

---

### `keyboardType`

Determines which keyboard to open, e.g.`numeric`.

See screenshots of all the types [here](http://lefkowitz.me/2018/04/30/visual-guide-to-react-native-textinput-keyboardtype-options/).

The following values work across platforms:

- `default`
- `number-pad`
- `decimal-pad`
- `numeric`
- `email-address`
- `phone-pad`

_iOS Only_

The following values work on iOS only:

- `ascii-capable`
- `numbers-and-punctuation`
- `url`
- `name-phone-pad`
- `twitter`
- `web-search`

_Android Only_

The following values work on Android only:

- `visible-password`

| Type                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password') |

---

### `maxFontSizeMultiplier`

Specifies largest possible scale a font can reach when `allowFontScaling` is enabled. Possible values:

- `null/undefined` (default): inherit from the parent node or the global default (0)
- `0`: no max, ignore parent/global default
- `>= 1`: sets the `maxFontSizeMultiplier` of this node to this value

| Type   |
| ------ |
| number |

---

### `maxLength`

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

| Type   |
| ------ |
| number |

---

### `multiline`

If `true`, the text input can be multiple lines. The default value is `false`. It is important to note that this aligns the text to the top on iOS, and centers it on Android. Use with `textAlignVertical` set to `top` for the same behavior in both platforms.

| Type |
| ---- |
| bool |

---

### `numberOfLines` <div class="label android">Android</div>

Sets the number of lines for a `TextInput`. Use it with multiline set to `true` to be able to fill the lines.

| Type   |
| ------ |
| number |

---

### `onBlur`

Callback that is called when the text input is blurred.

> Note: If you are attempting to access the `text` value from `nativeEvent` keep in mind that the resulting value you get can be `undefined` which can cause unintended errors. If you are trying to find the last value of TextInput, you can use the [`onEndEditing`](textinput#onendediting) event, which is fired upon completion of editing.

| Type     |
| -------- |
| function |

---

### `onChange`

Callback that is called when the text input's text changes.

| Type                                                     |
| -------------------------------------------------------- |
| (`{ nativeEvent: { eventCount, target, text} }`) => void |

---

### `onChangeText`

Callback that is called when the text input's text changes. Changed text is passed as a single string argument to the callback handler.

| Type     |
| -------- |
| function |

---

### `onContentSizeChange`

Callback that is called when the text input's content size changes.

Only called for multiline text inputs.

| Type                                                            |
| --------------------------------------------------------------- |
| (`{ nativeEvent: { contentSize: { width, height } } }`) => void |

---

### `onEndEditing`

Callback that is called when text input ends.

| Type     |
| -------- |
| function |

---

### `onPressIn`

Callback that is called when a touch is engaged.

| Type                                                |
| --------------------------------------------------- |
| ({ nativeEvent: [PressEvent](pressevent) }) => void |

---

### `onPressOut`

Callback that is called when a touch is released.

| Type                                                |
| --------------------------------------------------- |
| ({ nativeEvent: [PressEvent](pressevent) }) => void |

---

### `onFocus`

Callback that is called when the text input is focused.

| Type                                                  |
| ----------------------------------------------------- |
| ({ nativeEvent: [LayoutEvent](layoutevent) }) => void |

---

### `onKeyPress`

Callback that is called when a key is pressed. This will be called with object where `keyValue` is `'Enter'` or `'Backspace'` for respective keys and the typed-in character otherwise including `' '` for space. Fires before `onChange` callbacks. Note: on Android only the inputs from soft keyboard are handled, not the hardware keyboard inputs.

| Type                                           |
| ---------------------------------------------- |
| (`{ nativeEvent: { key: keyValue } }`) => void |

---

### `onLayout`

Invoked on mount and on layout changes.

| Type                                                  |
| ----------------------------------------------------- |
| ({ nativeEvent: [LayoutEvent](layoutevent) }) => void |

---

### `onScroll`

Invoked on content scroll. May also contain other properties from `ScrollEvent` but on Android `contentSize` is not provided for performance reasons.

| Type                                                     |
| -------------------------------------------------------- |
| (`{ nativeEvent: { contentOffset: { x, y } } }`) => void |

---

### `onSelectionChange`

Callback that is called when the text input selection is changed.

| Type                                                       |
| ---------------------------------------------------------- |
| (`{ nativeEvent: { selection: { start, end } } }`) => void |

---

### `onSubmitEditing`

Callback that is called when the text input's submit button is pressed.

| Type                                                     |
| -------------------------------------------------------- |
| (`{ nativeEvent: { text, eventCount, target }}`) => void |

Note that on iOS this method isn't called when using `keyboardType="phone-pad"`.

---

### `placeholder`

The string that will be rendered before text input has been entered.

| Type   |
| ------ |
| string |

---

### `placeholderTextColor`

The text color of the placeholder string.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `returnKeyLabel` <div class="label android">Android</div>

Sets the return key to the label. Use it instead of `returnKeyType`.

| Type   |
| ------ |
| string |

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

| Type                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------- |
| enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo') |

### `rejectResponderTermination` <div class="label ios">iOS</div>

If `true`, allows TextInput to pass touch events to the parent component. This allows components such as SwipeableListView to be swipeable from the TextInput on iOS, as is the case on Android by default. If `false`, TextInput always asks to handle the input (except when disabled). The default value is `true`.

| Type |
| ---- |
| bool |

---

### `scrollEnabled` <div class="label ios">iOS</div>

If `false`, scrolling of the text view will be disabled. The default value is `true`. Only works with `multiline={true}`.

| Type |
| ---- |
| bool |

---

### `secureTextEntry`

If `true`, the text input obscures the text entered so that sensitive text like passwords stay secure. The default value is `false`. Does not work with `multiline={true}`.

| Type |
| ---- |
| bool |

---

### `selection`

The start and end of the text input's selection. Set start and end to the same value to position the cursor.

| Type                                |
| ----------------------------------- |
| object: {start: number,end: number} |

---

### `selectionColor`

The highlight and cursor color of the text input.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `selectTextOnFocus`

If `true`, all text will automatically be selected on focus.

| Type |
| ---- |
| bool |

---

### `showSoftInputOnFocus`

When `false`, it will prevent the soft keyboard from showing when the field is focused. The default value is `true`.

| Type |
| ---- |
| bool |

---

### `spellCheck` <div class="label ios">iOS</div>

If `false`, disables spell-check style (i.e. red underlines). The default value is inherited from `autoCorrect`.

| Type |
| ---- |
| bool |

---

### `textAlign`

Align the input text to the left, center, or right sides of the input field.

Possible values for `textAlign` are:

- `left`
- `center`
- `right`

| Type                            |
| ------------------------------- |
| enum('left', 'center', 'right') |

---

### `textContentType` <div class="label ios">iOS</div>

Give the keyboard and the system information about the expected semantic meaning for the content that users enter.

For iOS 11+ you can set `textContentType` to `username` or `password` to enable autofill of login details from the device keychain.

For iOS 12+ `newPassword` can be used to indicate a new password input the user may want to save in the keychain, and `oneTimeCode` can be used to indicate that a field can be autofilled by a code arriving in an SMS.

To disable autofill, set `textContentType` to `none`.

Possible values for `textContentType` are:

- `none`
- `URL`
- `addressCity`
- `addressCityAndState`
- `addressState`
- `countryName`
- `creditCardNumber`
- `emailAddress`
- `familyName`
- `fullStreetAddress`
- `givenName`
- `jobTitle`
- `location`
- `middleName`
- `name`
- `namePrefix`
- `nameSuffix`
- `nickname`
- `organizationName`
- `postalCode`
- `streetAddressLine1`
- `streetAddressLine2`
- `sublocality`
- `telephoneNumber`
- `username`
- `password`
- `newPassword`
- `oneTimeCode`

| Type                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('none', 'URL', 'addressCity', 'addressCityAndState', 'addressState', 'countryName', 'creditCardNumber', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'nickname', 'organizationName', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'username', 'password') |

---

### `passwordRules` <div class="label ios">iOS</div>

When using `textContentType` as `newPassword` on iOS we can let the OS know the minimum requirements of the password so that it can generate one that will satisfy them. In order to create a valid string for `PasswordRules` take a look to the [Apple Docs](https://developer.apple.com/password-rules/).

> If passwords generation dialog doesn't appear please make sure that:
>
> - AutoFill is enabled: **Settings** → **Passwords & Accounts** → toggle "On" the **AutoFill Passwords**,
> - iCloud Keychain is used: **Settings** → **Apple ID** → **iCloud** → **Keychain** → toggle "On" the **iCloud Keychain**.

| Type   |
| ------ |
| string |

---

### `style`

Note that not all Text styles are supported, an incomplete list of what is not supported includes:

- `borderLeftWidth`
- `borderTopWidth`
- `borderRightWidth`
- `borderBottomWidth`
- `borderTopLeftRadius`
- `borderTopRightRadius`
- `borderBottomRightRadius`
- `borderBottomLeftRadius`

see [Issue#7070](https://github.com/facebook/react-native/issues/7070) for more detail.

[Styles](style.md)

| Type                  |
| --------------------- |
| [Text](text.md#style) |

---

### `textBreakStrategy` <div class="label android">Android</div>

<!-- alex disable simple -->

Set text break strategy on Android API Level 23+, possible values are `simple`, `highQuality`, `balanced` The default value is `simple`.

| Type                                      |
| ----------------------------------------- |
| enum('simple', 'highQuality', 'balanced') |

<!-- alex enable simple -->

---

### `underlineColorAndroid` <div class="label android">Android</div>

The color of the `TextInput` underline.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `value`

The value to show for the text input. `TextInput` is a controlled component, which means the native value will be forced to match this value prop if provided. For most uses, this works great, but in some cases this may cause flickering - one common cause is preventing edits by keeping value the same. In addition to setting the same value, either set `editable={false}`, or set/update `maxLength` to prevent unwanted edits without flicker.

| Type   |
| ------ |
| string |

## Methods

### `.focus()`

```jsx
focus();
```

Makes the native input request focus.

### `.blur()`

```jsx
blur();
```

Makes the native input lose focus.

### `clear()`

```jsx
clear();
```

Removes all text from the `TextInput`.

---

### `isFocused()`

```jsx
isFocused();
```

Returns `true` if the input is currently focused; `false` otherwise.

# Known issues

- [react-native#19096](https://github.com/facebook/react-native/issues/19096): Doesn't support Android's `onKeyPreIme`.
- [react-native#19366](https://github.com/facebook/react-native/issues/19366): Calling .focus() after closing Android's keyboard via back button doesn't bring keyboard up again.
- [react-native#26799](https://github.com/facebook/react-native/issues/26799): Doesn't support Android's `secureTextEntry` when `keyboardType="email-address"` or `keyboardType="phone-pad"`.

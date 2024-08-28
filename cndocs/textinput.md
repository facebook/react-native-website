---
id: textinput
title: TextInput
---

TextInput 是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。

最简单的用法就是丢一个`TextInput`到应用里，然后订阅它的`onChangeText`事件来读取用户的输入。注意，从 TextInput 里取值这就是目前唯一的做法！也就是使用在`onChangeText`中用`setState`把用户的输入写入到 state 中，然后在需要取值的地方从 this.state 中取出值。它还有一些其它的事件，譬如`onSubmitEditing`和`onFocus`。一个简单的例子如下：

```SnackPlayer name=TextInput
import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

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

export default TextInputExample;
```

Two methods exposed via the native element are .focus() and .blur() that will focus or blur the TextInput programmatically.

注意有些属性仅在`multiline`为 true 或者为 false 的时候有效。此外，当`multiline=false`时，为元素的某一个边添加边框样式（例如：`borderBottomColor`，`borderLeftWidth`等）将不会生效。为了能够实现效果你可以使用一个`View`来包裹`TextInput`：

```SnackPlayer name=TextInput
import React from 'react';
import {View, TextInput} from 'react-native';

const MultilineTextInputExample = () => {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  // 你可以试着输入一种颜色，比如red，那么这个red就会作用到View的背景色样式上
  return (
    <View
      style={{
        backgroundColor: value,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
      }}>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 10}}
      />
    </View>
  );
};

export default MultilineTextInputExample;
```

`TextInput` has a border at the bottom of its view by default. This border has its padding set by the background image provided by the system, and it cannot be changed. Solutions to avoid this are to either not set height explicitly, in which case the system will take care of displaying the border in the correct position, or to not display the border by setting `underlineColorAndroid` to transparent.

又又，在安卓上长按选择文本会导致`windowSoftInputMode`设置变为`adjustResize`，这样可能导致绝对定位的元素被键盘给顶起来。要解决这一问题你需要在 AndroidManifest.xml 中明确指定合适的`windowSoftInputMode`(https://developer.android.com/guide/topics/manifest/activity-element.html)值，或是自己监听事件来处理布局变化。

---

# Reference

## Props

### [View Props](view.md#props)

Inherits [View Props](view.md#props).

---

### `allowFontScaling`

控制字体是否要根据系统的“字体大小”辅助选项来进行缩放。默认值为`true`。

| Type |
| ---- |
| bool |

---

### `autoCapitalize`

控制 TextInput 是否要自动将特定字符切换为大写，This property is not supported by some keyboard types such as `name-phone-pad`.

- `characters`: 所有的字符。
- `words`: 每个单词的第一个字符。
- `sentences`: 每句话的第一个字符（默认）。
- `none`: 不切换。

| Type                                             |
| ------------------------------------------------ |
| enum('none', 'sentences', 'words', 'characters') |

---

### `autoComplete`

Specifies autocomplete hints for the system, so it can provide autofill. On Android, the system will always attempt to offer autofill by using heuristics to identify the type of content. To disable autocomplete, set `autoComplete` to `off`.

The following values work across platforms:

- `additional-name`
- `address-line1`
- `address-line2`
- `birthdate-day` (iOS 17+)
- `birthdate-full` (iOS 17+)
- `birthdate-month` (iOS 17+)
- `birthdate-year` (iOS 17+)
- `cc-csc` (iOS 17+)
- `cc-exp` (iOS 17+)
- `cc-exp-day` (iOS 17+)
- `cc-exp-month` (iOS 17+)
- `cc-exp-year` (iOS 17+)
- `cc-number`
- `country`
- `current-password`
- `email`
- `family-name`
- `given-name`
- `honorific-prefix`
- `honorific-suffix`
- `name`
- `new-password`
- `off`
- `one-time-code`
- `postal-code`
- `street-address`
- `tel`
- `username`

<div class="label basic ios">iOS</div>

The following values work on iOS only:

- `cc-family-name` (iOS 17+)
- `cc-given-name` (iOS 17+)
- `cc-middle-name` (iOS 17+)
- `cc-name` (iOS 17+)
- `cc-type` (iOS 17+)
- `nickname`
- `organization`
- `organization-title`
- `url`

<div class="label basic android">Android</div>

The following values work on Android only:

- `gender`
- `name-family`
- `name-given`
- `name-middle`
- `name-middle-initial`
- `name-prefix`
- `name-suffix`
- `password`
- `password-new`
- `postal-address`
- `postal-address-country`
- `postal-address-extended`
- `postal-address-extended-postal-code`
- `postal-address-locality`
- `postal-address-region`
- `sms-otp`
- `tel-country-code`
- `tel-device`
- `tel-national`
- `username-new`

| Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('additional-name', 'address-line1', 'address-line2', 'birthdate-day', 'birthdate-full', 'birthdate-month', 'birthdate-year', 'cc-csc', 'cc-exp', 'cc-exp-day', 'cc-exp-month', 'cc-exp-year', 'cc-number', 'country', 'current-password', 'email', 'family-name', 'given-name', 'honorific-prefix', 'honorific-suffix', 'name', 'new-password', 'off', 'one-time-code', 'postal-code', 'street-address', 'tel', 'username', 'cc-family-name', 'cc-given-name', 'cc-middle-name', 'cc-name', 'cc-type', 'nickname', 'organization', 'organization-title', 'url', 'gender', 'name-family', 'name-given', 'name-middle', 'name-middle-initial', 'name-prefix', 'name-suffix', 'password', 'password-new', 'postal-address', 'postal-address-country', 'postal-address-extended', 'postal-address-extended-postal-code', 'postal-address-locality', 'postal-address-region', 'sms-otp', 'tel-country-code', 'tel-device', 'tel-national', 'username-new') |

---

### `autoCorrect`

如果为 false，会关闭拼写自动修正。默认值是 true。

| Type |
| ---- |
| bool |

---

### `autoFocus`

如果为 true，在`componentDidMount`后会获得焦点。默认值为 false。

| Type |
| ---- |
| bool |

---

### `blurOnSubmit`

如果为 true，文本框会在提交的时候失焦。对于单行输入框默认值为 true，多行则为 false。注意：对于多行输入框来说，如果将`blurOnSubmit`设为 true，则在按下回车键时就会失去焦点同时触发`onSubmitEditing`事件，而不会换行。

| Type |
| ---- |
| bool |

---

### `caretHidden`

如果为 true，则隐藏光标。默认值为 false。

| Type |
| ---- |
| bool |

---

### `clearButtonMode` <div class="label ios">iOS</div>

是否要在文本框右侧显示“清除”按钮。仅在单行模式下可用。默认值为`never`。

| Type                                                       |
| ---------------------------------------------------------- |
| enum('never', 'while-editing', 'unless-editing', 'always') |

---

### `clearTextOnFocus` <div class="label ios">iOS</div>

如果为 true，每次开始输入的时候都会清除文本框的内容。

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

设置 text input 内能被转化为可点击 URL 的数据的类型。当且仅当`multiline={true}`和`editable={false}`时起作用。默认情况下不检测任何数据类型。

可接受一个类型值或类型值数组。

`dataDetectorTypes`的可用值有:

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

提供一个文本框中的初始值。当用户开始输入的时候，值就可以改变。在一些简单的使用情形下，如果你不想用监听消息然后更新 value 属性的方法来保持属性和状态同步的时候，就可以用 defaultValue 来代替。

| Type   |
| ------ |
| string |

---

### `cursorColor` <div class="label android">Android</div>

When provided it will set the color of the cursor (or "caret") in the component. Unlike the behavior of `selectionColor` the cursor color will be set independently from the color of the text selection box.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `disableFullscreenUI` <div class="label android">Android</div>

当值为 false 时, 如果 text input 的周围有少量可用空间的话（比如说，当手机横过来时），操作系统可能会将这个 text input 设置为全屏模式。当值为 true 时, 这个特性不可用，text input 就是普通的模式。默认为 false。

| Type |
| ---- |
| bool |

---

### `editable`

如果为 false，文本框是不可编辑的。默认值为 true。

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

### `enterKeyHint`

Determines what text should be shown to the return key. Has precedence over the `returnKeyType` prop.

The following values work across platforms:

- `enter`
- `done`
- `next`
- `search`
- `send`

_Android Only_

The following values work on Android only:

- `previous`

| Type                                                        |
| ----------------------------------------------------------- |
| enum('enter', 'done', 'next', 'previous', 'search', 'send') |

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

指定一个图片放置在左侧。图片必须放置在`/android/app/src/main/res/drawable`目录下，经过编译后按如下形式引用（无路径无后缀）：

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

### `inputMode`

Works like the `inputmode` attribute in HTML, it determines which keyboard to open, e.g. `numeric` and has precedence over `keyboardType`.

Support the following values:

- `none`
- `text`
- `decimal`
- `numeric`
- `tel`
- `search`
- `email`
- `url`

| Type                                                                        |
| --------------------------------------------------------------------------- |
| enum('decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url') |

---

### `keyboardAppearance` <div class="label ios">iOS</div>

Determines the color of the keyboard.

| Type                             |
| -------------------------------- |
| enum('default', 'light', 'dark') |

---

### `keyboardType`

决定弹出何种软键盘类型，譬如`numeric`（纯数字键盘）。

See screenshots of all the types [here](https://lefkowitz.me/2018/04/30/visual-guide-to-react-native-textinput-keyboardtype-options/).

这些值在所有平台都可用：

- `default`
- `number-pad`
- `decimal-pad`
- `numeric`
- `email-address`
- `phone-pad`
- `url`


下面的值仅 iOS 可用：

- `ascii-capable`
- `numbers-and-punctuation`
- `name-phone-pad`
- `twitter`
- `web-search`

下面的值仅 Android 可用：

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

限制文本框中最多的字符数。使用这个属性而不用 JS 逻辑去实现，可以避免闪烁的现象。

| Type   |
| ------ |
| number |

---

### `multiline`

如果为 true，文本框中可以输入多行文字。默认值为 false。注意安卓上如果设置`multiline = {true}`，文本默认会垂直居中，可设置`textAlignVertical: 'top'`样式来使其居顶显示。

| Type |
| ---- |
| bool |

---

### `numberOfLines` <div class="label android">Android</div>

设置输入框的行数。当 multiline 设置为 true 时使用它，可以占据对应的行数。

| Type   |
| ------ |
| number |

---

### `onBlur`

当文本框失去焦点的时候调用此回调函数。

> Note: If you are attempting to access the `text` value from `nativeEvent` keep in mind that the resulting value you get can be `undefined` which can cause unintended errors. If you are trying to find the last value of TextInput, you can use the [`onEndEditing`](textinput#onendediting) event, which is fired upon completion of editing.

| Type     |
| -------- |
| function |

---

### `onChange`

当文本框内容变化时调用此回调函数。回调参数为`{ nativeEvent: { eventCount, target, text} }`。

| Type                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {eventCount, target, text}}`) => void |

---

### `onChangeText`

当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。

| Type     |
| -------- |
| function |

---

### `onContentSizeChange`

Callback that is called when the text input's content size changes.

Only called for multiline text inputs.

| Type                                                       |
| ---------------------------------------------------------- |
| (`{nativeEvent: {contentSize: {width, height} }}`) => void |

---

### `onEndEditing`

当文本输入结束后调用此回调函数。

| Type     |
| -------- |
| function |

---

### `onPressIn`

Callback that is called when a touch is engaged.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressOut`

Callback that is called when a touch is released.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onFocus`

当文本框获得焦点的时候调用此回调函数。回调参数为`{ nativeEvent: { target } }`。

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onKeyPress`

当一个键被按下的时候调用此回调。传递给回调函数的参数为`{ nativeEvent: { key: keyValue } }`，其中`keyValue`即为被按下的键。会在 onChange 之前调用。注意：在 Android 上只有软键盘会触发此事件，物理键盘不会触发。

| Type                                        |
| ------------------------------------------- |
| (`{nativeEvent: {key: keyValue} }`) => void |

---

### `onLayout`

当组件加载或者布局变化的时候调用，回调参数为`{ nativeEvent: {layout: {x, y, width, height}, target } }`。

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onScroll`

在内容滚动时持续调用，传回参数的格式形如`{ nativeEvent: { contentOffset: { x, y } } }`。也可能包含其他和滚动事件相关的参数，但是在 Android 上，出于性能考虑，不会提供`contentSize`参数。

| Type                                                |
| --------------------------------------------------- |
| (`{nativeEvent: {contentOffset: {x, y} }}`) => void |

---

### `onSelectionChange`

光标位置变化时，传回参数的格式形如`{ nativeEvent: { selection: { start, end } } }`。

| Type                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {selection: {start, end} }}`) => void |

---

### `onSubmitEditing`

此回调函数当软键盘的`确定`/`提交`按钮被按下的时候调用此函数，所传参数为`{nativeEvent: {text, eventCount, target}}`。如果`multiline={true}`，此属性不可用。

| Type                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {text, eventCount, target}}`) => void |

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

### `readOnly`

If `true`, text is not editable. The default value is `false`.

| Type |
| ---- |
| bool |

---

### `returnKeyLabel` <div class="label android">Android</div>

Sets the return key to the label. Use it instead of `returnKeyType`.

| Type   |
| ------ |
| string |

---

### `returnKeyType`

决定“确定”按钮显示的内容。在 Android 上你还可以使用`returnKeyLabel`。

下列这些选项是跨平台可用的：

- `done`
- `go`
- `next`
- `search`
- `send`

下列这些选项仅 Android 可用：

- `none`
- `previous`

下列这些选项仅 iOS 可用：

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

### `rows` <div class="label android">Android</div>

Sets the number of lines for a `TextInput`. Use it with multiline set to `true` to be able to fill the lines.

| Type   |
| ------ |
| number |

---

### `scrollEnabled` <div class="label ios">iOS</div>

If `false`, scrolling of the text view will be disabled. The default value is `true`. Only works with `multiline={true}`.

| Type |
| ---- |
| bool |

---

### `secureTextEntry`

如果为 true，文本框会遮住之前输入的文字，这样类似密码之类的敏感文字可以更加安全。默认值为 false。`multiline={true}`时不可用。

| Type |
| ---- |
| bool |

---

### `selection`

设置选中文字的范围（指定首尾的索引值）。如果首尾为同一索引位置，则相当于指定光标的位置。

| Type                                  |
| ------------------------------------- |
| object: `{start: number,end: number}` |

---

### `selectionColor`

设置输入框高亮时的颜色（还包括光标）。

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `selectTextOnFocus`

如果为 true，当获得焦点的时候，所有的文字都会被选中。

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

如果设置为`false`，则禁用拼写检查的样式（比如错误拼写的单词下的红线）。默认值继承自`autoCorrect`。

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

:::note
[`autoComplete`](#autocomplete), provides the same functionality and is available for all platforms. You can use [`Platform.select`](/docs/next/platform#select) for differing platform behaviors.

Avoid using both `textContentType` and `autoComplete`. For backwards compatibility, `textContentType` takes precedence when both properties are set.
:::

You can set `textContentType` to `username` or `password` to enable autofill of login details from the device keychain.

`newPassword` can be used to indicate a new password input the user may want to save in the keychain, and `oneTimeCode` can be used to indicate that a field can be autofilled by a code arriving in an SMS.

To disable autofill, set `textContentType` to `none`.

Possible values for `textContentType` are:

- `none`
- `addressCity`
- `addressCityAndState`
- `addressState`
- `birthdate` (iOS 17+)
- `birthdateDay` (iOS 17+)
- `birthdateMonth` (iOS 17+)
- `birthdateYear` (iOS 17+)
- `countryName`
- `creditCardExpiration` (iOS 17+)
- `creditCardExpirationMonth` (iOS 17+)
- `creditCardExpirationYear` (iOS 17+)
- `creditCardFamilyName` (iOS 17+)
- `creditCardGivenName` (iOS 17+)
- `creditCardMiddleName` (iOS 17+)
- `creditCardName` (iOS 17+)
- `creditCardNumber`
- `creditCardSecurityCode` (iOS 17+)
- `creditCardType` (iOS 17+)
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
- `newPassword`
- `nickname`
- `oneTimeCode`
- `organizationName`
- `password`
- `postalCode`
- `streetAddressLine1`
- `streetAddressLine2`
- `sublocality`
- `telephoneNumber`
- `URL`
- `username`

| Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| enum('none', 'addressCity', 'addressCityAndState', 'addressState', 'birthdate', 'birthdateDay', 'birthdateMonth', 'birthdateYear', 'countryName', 'creditCardExpiration', 'creditCardExpirationMonth', 'creditCardExpirationYear', 'creditCardFamilyName', 'creditCardGivenName', 'creditCardMiddleName', 'creditCardName', 'creditCardNumber', 'creditCardSecurityCode', 'creditCardType', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'newPassword', 'nickname', 'oneTimeCode', 'organizationName', 'password', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'URL', 'username') |

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

[Styles](style.md)

| Type                  |
| --------------------- |
| [Text](text.md#style) |

---

### `textBreakStrategy` <div class="label android">Android</div>

Set text break strategy on Android API Level 23+, possible values are `simple`, `highQuality`, `balanced` The default value is `highQuality`.

| Type                                      |
| ----------------------------------------- |
| enum('simple', 'highQuality', 'balanced') |

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

---

### `lineBreakStrategyIOS` <div class="label ios">iOS</div>

Set line break strategy on iOS 14+. Possible values are `none`, `standard`, `hangul-word` and `push-out`.

| Type                                                        | Default  |
| ----------------------------------------------------------- | -------- |
| enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` |

## Methods

### `.focus()`

```tsx
focus();
```

Makes the native input request focus.

### `.blur()`

```tsx
blur();
```

Makes the native input lose focus.

### `clear()`

```tsx
clear();
```

Removes all text from the `TextInput`.

---

### `isFocused()`

```tsx
isFocused(): boolean;
```

Returns `true` if the input is currently focused; `false` otherwise.

# Known issues

- [react-native#19096](https://github.com/facebook/react-native/issues/19096): Doesn't support Android's `onKeyPreIme`.
- [react-native#19366](https://github.com/facebook/react-native/issues/19366): Calling .focus() after closing Android's keyboard via back button doesn't bring keyboard up again.
- [react-native#26799](https://github.com/facebook/react-native/issues/26799): Doesn't support Android's `secureTextEntry` when `keyboardType="email-address"` or `keyboardType="phone-pad"`.

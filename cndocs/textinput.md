---
id: textinput
title: TextInput
---

TextInput是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。

最简单的用法就是丢一个`TextInput`到应用里，然后订阅它的`onChangeText`事件来读取用户的输入。注意，从TextInput里取值这就是目前唯一的做法！也就是使用在`onChangeText`中用`setState`把用户的输入写入到state中，然后在需要取值的地方从this.state中取出值。它还有一些其它的事件，譬如`onSubmitEditing`和`onFocus`。一个简单的例子如下：

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { TextInput } from 'react-native';

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

```

Two methods exposed via the native element are .focus() and .blur() that will focus or blur the TextInput programmatically.

注意有些属性仅在`multiline`为true或者为false的时候有效。此外，当`multiline=false`时，为元素的某一个边添加边框样式（例如：`borderBottomColor`，`borderLeftWidth`等）将不会生效。为了能够实现效果你可以使用一个`View`来包裹`TextInput`：

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
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

  // 你可以试着输入一种颜色，比如red，那么这个red就会作用到View的背景色样式上
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

```

`TextInput`在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置`padding: 0`，同时设置`underlineColorAndroid="transparent"`来去掉底边框。

又，在安卓上如果设置`multiline = {true}`，文本默认会垂直居中，可设置`textAlignVertical: 'top'`样式来使其居顶显示。

又又，在安卓上长按选择文本会导致`windowSoftInputMode`设置变为`adjustResize`，这样可能导致绝对定位的元素被键盘给顶起来。要解决这一问题你需要在AndroidManifest.xml中明确指定合适的`windowSoftInputMode`( <https://developer.android.com/guide/topics/manifest/activity-element.html> )值，或是自己监听事件来处理布局变化。

### 查看Props

* [View props...](view.md#props)

- [`allowFontScaling`](textinput.md#allowfontscaling)
- [`autoCapitalize`](textinput.md#autocapitalize)
- [`autoCorrect`](textinput.md#autocorrect)
- [`autoFocus`](textinput.md#autofocus)
- [`blurOnSubmit`](textinput.md#bluronsubmit)
- [`caretHidden`](textinput.md#carethidden)
- [`clearButtonMode`](textinput.md#clearbuttonmode)
- [`clearTextOnFocus`](textinput.md#cleartextonfocus)
- [`contextMenuHidden`](textinput.md#contextMenuHidden)
- [`dataDetectorTypes`](textinput.md#datadetectortypes)
- [`defaultValue`](textinput.md#defaultvalue)
- [`disableFullscreenUI`](textinput.md#disablefullscreenui)
- [`editable`](textinput.md#editable)
- [`enablesReturnKeyAutomatically`](textinput.md#enablesreturnkeyautomatically)
- [`inlineImageLeft`](textinput.md#inlineimageleft)
- [`inlineImagePadding`](textinput.md#inlineimagepadding)
- [`keyboardAppearance`](textinput.md#keyboardappearance)
- [`keyboardType`](textinput.md#keyboardtype)
- [`maxLength`](textinput.md#maxlength)
- [`multiline`](textinput.md#multiline)
- [`numberOfLines`](textinput.md#numberoflines)
- [`onBlur`](textinput.md#onblur)
- [`onChange`](textinput.md#onchange)
- [`onChangeText`](textinput.md#onchangetext)
- [`onContentSizeChange`](textinput.md#oncontentsizechange)
- [`onEndEditing`](textinput.md#onendediting)
- [`onFocus`](textinput.md#onfocus)
- [`onKeyPress`](textinput.md#onkeypress)
- [`onLayout`](textinput.md#onlayout)
- [`onScroll`](textinput.md#onscroll)
- [`onSelectionChange`](textinput.md#onselectionchange)
- [`onSubmitEditing`](textinput.md#onsubmitediting)
- [`placeholder`](textinput.md#placeholder)
- [`placeholderTextColor`](textinput.md#placeholdertextcolor)
- [`returnKeyLabel`](textinput.md#returnkeylabel)
- [`returnKeyType`](textinput.md#returnkeytype)
- [`scrollEnabled`](textinput.md#scrollenabled)
- [`secureTextEntry`](textinput.md#securetextentry)
- [`selection`](textinput.md#selection)
- [`selectionColor`](textinput.md#selectioncolor)
- [`selectionState`](textinput.md#selectionstate)
- [`selectTextOnFocus`](textinput.md#selecttextonfocus)
- [`spellCheck`](textinput.md#spellcheck)
- [`style`](textinput.md#style)
- [`textContentType`](textinput.md#textcontenttype)
- [`textBreakStrategy`](textinput.md#textbreakstrategy)
- [`underlineColorAndroid`](textinput.md#underlinecolorandroid)
- [`value`](textinput.md#value)

### 查看方法

* [`clear`](textinput.md#clear)
* [`isFocused`](textinput.md#isfocused)

---

# Reference

## Props

### `allowFontScaling`

控制字体是否要根据系统的“字体大小”辅助选项来进行缩放。默认值为`true`。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `autoCapitalize`

控制TextInput是否要自动将特定字符切换为大写：

* `characters`: 所有的字符。
* `words`: 每个单词的第一个字符。
* `sentences`: 每句话的第一个字符（默认）。
* `none`: 不切换。

| 类型                                             | 必填 |
| ------------------------------------------------ | ---- |
| enum('none', 'sentences', 'words', 'characters') | No   |

---

### `autoCorrect`

如果为false，会关闭拼写自动修正。默认值是true。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `autoFocus`

如果为true，在`componentDidMount`后会获得焦点。默认值为false。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `blurOnSubmit`

如果为true，文本框会在提交的时候失焦。对于单行输入框默认值为true，多行则为false。注意：对于多行输入框来说，如果将`blurOnSubmit`设为true，则在按下回车键时就会失去焦点同时触发`onSubmitEditing`事件，而不会换行。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `caretHidden`

如果为true，则隐藏光标。默认值为false。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `clearButtonMode`

是否要在文本框右侧显示“清除”按钮。仅在单行模式下可用。

| 类型                                                       | 必填 | 平台 |
| ---------------------------------------------------------- | ---- | ---- |
| enum('never', 'while-editing', 'unless-editing', 'always') | No   | iOS  |

---

### `clearTextOnFocus`

如果为true，每次开始输入的时候都会清除文本框的内容。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | No   | iOS  |

---

### `contextMenuHidden`

If `true`, context menu is hidden. The default value is `false`.

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `dataDetectorTypes`

设置 text input 内能被转化为可点击URL的数据的类型。当且仅当`multiline={true}`和`editable={false}`时起作用。默认情况下不检测任何数据类型。

可接受一个类型值或类型值数组。

`dataDetectorTypes`的可用值有:

* `'phoneNumber'`
* `'link'`
* `'address'`
* `'calendarEvent'`
* `'none'`
* `'all'`

| 类型                                                                                                                                                     | 必填 | 平台 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- |
| enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), ,array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all') | No   | iOS  |

---

### `defaultValue`

提供一个文本框中的初始值。当用户开始输入的时候，值就可以改变。在一些简单的使用情形下，如果你不想用监听消息然后更新value属性的方法来保持属性和状态同步的时候，就可以用defaultValue来代替。

| 类型   | 必填 |
| ------ | ---- |
| string | No   |

---

### `disableFullscreenUI`

当值为false时, 如果 text input 的周围有少量可用空间的话（比如说，当手机横过来时），操作系统可能会将这个 text input 设置为全屏模式。当值为true时, 这个特性不可用，text input 就是普通的模式。默认为false。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | No   | Android |

---

### `editable`

如果为false，文本框是不可编辑的。默认值为true。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `enablesReturnKeyAutomatically`

如果为true，键盘会在文本框内没有文字的时候禁用确认按钮。默认值为false。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | No   | iOS  |

---

### `inlineImageLeft`

指定一个图片放置在左侧。图片必须放置在`/android/app/src/main/res/drawable`目录下，经过编译后按如下形式引用（无路径无后缀）：

```
<TextInput
 inlineImageLeft='search_icon'
/>
```

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | No   | Android |

---

### `inlineImagePadding`

给放置在左侧的图片设置padding样式。

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | No   | Android |

---

### `keyboardAppearance`

指定键盘的颜色。

| 类型                             | 必填 | 平台 |
| -------------------------------- | ---- | ---- |
| enum('default', 'light', 'dark') | No   | iOS  |

---

### `keyboardType`

决定弹出的何种软键盘的，譬如`numeric`（纯数字键盘）。

这些值在所有平台都可用：

* `default`
* `number-pad`
* `decimal-pad`
* `numeric`
* `email-address`
* `phone-pad`

下面的值仅iOS可用：

* `ascii-capable`
* `numbers-and-punctuation`
* `url`
* `name-phone-pad`
* `twitter`
* `web-search`

下面的值仅Android可用：

* `visible-password`

| 类型                                                                                                                                                                                                    | 必填 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password') | No   |

---

### `maxLength`

限制文本框中最多的字符数。使用这个属性而不用JS逻辑去实现，可以避免闪烁的现象。

| 类型   | 必填 |
| ------ | ---- |
| number | No   |

---

### `multiline`

如果为true，文本框中可以输入多行文字。默认值为false。注意安卓上如果设置`multiline = {true}`，文本默认会垂直居中，可设置`textAlignVertical: 'top'`样式来使其居顶显示。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `numberOfLines`

设置输入框的行数。当multiline设置为true时使用它，可以占据对应的行数。

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | No   | Android |

---

### `onBlur`

当文本框失去焦点的时候调用此回调函数。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onChange`

当文本框内容变化时调用此回调函数。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onChangeText`

当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onContentSizeChange`

Callback that is called when the text input's content size changes. This will be called with `{ nativeEvent: { contentSize: { width, height } } }`.

Only called for multiline text inputs.

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onEndEditing`

当文本输入结束后调用此回调函数。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onFocus`

当文本框获得焦点的时候调用此回调函数。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onKeyPress`

当一个键被按下的时候调用此回调。传递给回调函数的参数为`{ nativeEvent: { key: keyValue } }`，其中`keyValue`即为被按下的键。会在onChange之前调用。注意：在Android上只有软键盘会触发此事件，物理键盘不会触发。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onLayout`

当组件加载或者布局变化的时候调用，参数为`{x, y, width, height}`。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onScroll`

在内容滚动时持续调用，传回参数的格式形如`{ nativeEvent: { contentOffset: { x, y } } }`。也可能包含其他和滚动事件相关的参数，但是在Android上，出于性能考虑，不会提供`contentSize`参数。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onSelectionChange`

长按选择文本时，选择范围变化时调用此函数，传回参数的格式形如`{ nativeEvent: { selection: { start, end } } }`。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onSubmitEditing`

此回调函数当软键盘的`确定`/`提交`按钮被按下的时候调用此函数。如果`multiline={true}`，此属性不可用。

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `placeholder`

如果没有任何文字输入，会显示此字符串。

| 类型   | 必填 |
| ------ | ---- |
| string | No   |

---

### `placeholderTextColor`

占位字符串显示的文字颜色。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | No   |

---

### `returnKeyLabel`

Sets the return key to the label. Use it instead of `returnKeyType`.

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| string | No   | Android |

---

### `returnKeyType`

决定“确定”按钮显示的内容。在Android上你还可以使用`returnKeyLabel`。

下列这些选项是跨平台可用的：

* `done`
* `go`
* `next`
* `search`
* `send`

下列这些选项仅Android可用：

* `none`
* `previous`

下列这些选项仅iOS可用：

* `default`
* `emergency-call`
* `google`
* `join`
* `route`
* `yahoo`

| 类型                                                                                                                              | 必填 |
| --------------------------------------------------------------------------------------------------------------------------------- | ---- |
| enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo') | No   |

---

### `scrollEnabled`

If `false`, scrolling of the text view will be disabled. The default value is `true`. Only works with `multiline={true}`.

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `secureTextEntry`

如果为true，文本框会遮住之前输入的文字，这样类似密码之类的敏感文字可以更加安全。默认值为false。`multiline={true}`时不可用。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `selection`

设置选中文字的范围（指定首尾的索引值）。如果首尾为同一索引位置，则相当于指定光标的位置。

| 类型                                | 必填 |
| ----------------------------------- | ---- |
| object: {start: number,end: number} | No   |

---

### `selectionColor`

设置输入框高亮时的颜色（还包括光标）。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | No   |

---

### `selectionState`

An instance of `DocumentSelectionState`，可以控制一个文档中哪段文字被选中的状态。

Some functionality that can be performed with this instance is:

* `blur()`
* `focus()`
* `update()`

> 参阅[`vendor/document/selection/DocumentSelectionState.js`](https://github.com/facebook/react-native/blob/master/Libraries/vendor/document/selection/DocumentSelectionState.js)源码中的`DocumentSelectionState`

| 类型                   | 必填 | 平台 |
| ---------------------- | ---- | ---- |
| DocumentSelectionState | No   | iOS  |

---

### `selectTextOnFocus`

如果为true，当获得焦点的时候，所有的文字都会被选中。

| 类型 | 必填 |
| ---- | ---- |
| bool | No   |

---

### `spellCheck`

如果设置为`false`，则禁用拼写检查的样式（比如错误拼写的单词下的红线）。默认值继承自`autoCorrect`。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | No   | iOS  |

---

### `textContentType`

Give the keyboard and the system information about the expected semantic meaning for the content that users enter.

For iOS 11+ you can set `textContentType` to `username` or `password` to enable autofill of login details from the device keychain.

To disable autofill, set `textContentType` to `none`.

Possible values for `textContentType` are:

* `none`
* `URL`
* `addressCity`
* `addressCityAndState`
* `addressState`
* `countryName`
* `creditCardNumber`
* `emailAddress`
* `familyName`
* `fullStreetAddress`
* `givenName`
* `jobTitle`
* `location`
* `middleName`
* `name`
* `namePrefix`
* `nameSuffix`
* `nickname`
* `organizationName`
* `postalCode`
* `streetAddressLine1`
* `streetAddressLine2`
* `sublocality`
* `telephoneNumber`
* `username`
* `password`

| 类型                                                                                                                                                                                                                                                                                                                                                                                                       | 必填 | 平台 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---- |
| enum('none', 'URL', 'addressCity', 'addressCityAndState', 'addressState', 'countryName', 'creditCardNumber', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'nickname', 'organizationName', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'username', 'password') | 否   | iOS  |

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
| [Text](text.md#style) | No   |

---

### `textBreakStrategy`

在 Android API Level 23+ 的平台上设置文字断行策略, 可能值有`simple`, `highQuality`, `balanced`。默认值为`simple`。

| 类型                                      | 必填 | 平台    |
| ----------------------------------------- | ---- | ------- |
| enum('simple', 'highQuality', 'balanced') | No   | Android |

---

### `underlineColorAndroid`

文本框的下划线颜色(译注：如果要去掉文本框的边框，请将此属性设为透明transparent)。

| 类型               | 必填 | 平台    |
| ------------------ | ---- | ------- |
| [color](colors.md) | No   | Android |

---

### `value`

文本框中的文字内容。
TextInput是一个受约束的(Controlled)的组件，意味着如果提供了value属性，原生值会被强制与value属性保持一致。在大部分情况下这都工作的很好，不过有些情况下会导致一些闪烁现象——一个常见的原因就是通过不改变value来阻止用户进行编辑。如果你希望阻止用户输入，可以考虑设置`editable={false}`；如果你是希望限制输入的长度，可以考虑设置`maxLength`属性，这两个属性都不会导致闪烁。

| 类型   | 必填 |
| ------ | ---- |
| string | No   |

## 方法

### `clear()`

```javascript
clear();
```

清空输入框的内容。

---

### `isFocused()`

```javascript
isFocused():
```

返回值表明当前输入框是否获得了焦点。

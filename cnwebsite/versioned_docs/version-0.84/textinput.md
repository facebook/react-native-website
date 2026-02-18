---
id: textinput
title: TextInput
---

TextInput 是一个允许用户在应用中通过键盘输入文本的基础组件。通过不同的属性，你可以配置自动更正、自动大小写、占位文字，以及数字键盘等不同键盘类型。

最简单的用法就是放一个 `TextInput` 在界面上，然后订阅它的 `onChangeText` 事件来读取用户的输入。通常做法是在 `onChangeText` 中用 `setState`（或 `useState`）把用户的输入写入 state，然后在需要的地方从 state 中取值。它还有一些其它的事件，例如 `onSubmitEditing` 和 `onFocus`。一个简单的例子如下：

```SnackPlayer name=TextInput%20Example
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
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

原生元素还暴露了两个方法：`.focus()` 和 `.blur()`，可以让你在代码中主动让 TextInput 获取或失去焦点。

注意有些属性仅在 `multiline` 为 `true/false` 时才有效。此外，当 `multiline=true` 时，为元素的某一个边添加边框样式（例如：`borderBottomColor`、`borderLeftWidth` 等）将不会生效。为了实现同样的效果，你可以使用一个 `View` 来包裹 `TextInput`：

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

`TextInput` 在视图底部默认会有一条下划线边框。这个边框的 padding 是由系统提供的背景图片决定的，无法直接修改。要避免这个问题，可以不显式设置高度，让系统自己把边框画在合适的位置；或者将 `underlineColorAndroid` 设为透明来隐藏这条下划线。

注意，在 Android 上对输入框进行文本选择时，可能会把当前 Activity 的 `windowSoftInputMode` 参数改成 `adjustResize`。这会在键盘弹出时影响使用 `position: 'absolute'` 布局的组件。要避免这种行为，可以在 AndroidManifest.xml 里显式设置合适的 `windowSoftInputMode`（详见 https://developer.android.com/guide/topics/manifest/activity-element.html），或者通过原生代码在运行时控制这个参数。

---

# Reference

## Props

### [View Props](view.md#props)

继承 [View Props](view.md#props)。

---

### `allowFontScaling`

控制字体是否要根据系统的“字体大小”辅助选项来进行缩放。默认值为`true`。

| Type |
| ---- |
| bool |

---

### `autoCapitalize`

控制 TextInput 是否要自动将特定字符切换为大写。某些键盘类型（例如 `name-phone-pad`）不支持此特性。

- `characters`: 所有的字符。
- `words`: 每个单词的第一个字符。
- `sentences`: 每句话的第一个字符（默认）。
- `none`: 不切换。

| Type                                             |
| ------------------------------------------------ |
| enum('none', 'sentences', 'words', 'characters') |

---

### `autoComplete`

为系统提供自动补全提示，从而启用系统级的自动填充。在 Android 上，系统会通过启发式判断内容类型，尽可能提供自动填充。要禁用自动补全，将 `autoComplete` 设为 `off`。

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

下列取值仅在 iOS 上生效：

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

下列取值仅在 Android 上生效：

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

::::warning Deprecated
`submitBehavior` 现在取代了 `blurOnSubmit`，并会覆盖由 `blurOnSubmit` 定义的行为。详见 [submitBehavior](textinput#submitbehavior)。
::::

如果为 `true`，文本框会在提交的时候失焦。对于单行输入框默认值为 `true`，多行则为 `false`。注意：对于多行输入框来说，如果将 `blurOnSubmit` 设为 `true`，按下回车键时会失去焦点并触发 `onSubmitEditing` 事件，而不会在输入框中插入换行。

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

如果为 `true`，将隐藏文本选择时弹出的上下文菜单。默认值为 `false`。

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

### `disableKeyboardShortcuts` <div class="label ios">iOS</div>

如果为 `true`，将禁用键盘上的快捷按钮（撤销/重做和复制按钮）。默认值为 `false`。

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `cursorColor` <div class="label android">Android</div>

如果设置，将改变组件中光标（caret）的颜色。与 `selectionColor` 不同，光标颜色会独立于选区高亮颜色单独设置。

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

如果为 `true`，当输入框内容为空时，键盘会禁用回车键；一旦有文本输入，则自动启用回车键。默认值为 `false`。

| Type |
| ---- |
| bool |

---

### `enterKeyHint`

决定“回车”键上显示的文字。优先级高于 `returnKeyType` 属性。

以下取值在所有平台上都可用：

- `done`
- `next`
- `search`
- `send`
- `go`

_仅 Android 可用_

以下取值仅在 Android 上生效：

- `previous`

_仅 iOS 可用_

以下取值仅在 iOS 上生效：

- `enter`

| Type                                                              |
| ----------------------------------------------------------------- |
| enum('enter', 'done', 'next', 'previous', 'search', 'send', 'go') |

---

### `importantForAutofill` <div class="label android">Android</div>

告知操作系统：应用中的某个输入字段是否应该被包含在用于自动填充（autofill）的视图结构中（Android API 26+）。可选值有 `auto`、`no`、`noExcludeDescendants`、`yes` 和 `yesExcludeDescendants`，默认值为 `auto`。

- `auto`：让 Android 系统自行通过启发式判断该视图是否对自动填充重要。
- `no`：此视图对自动填充不重要。
- `noExcludeDescendants`：此视图及其所有子视图对自动填充都不重要。
- `yes`：此视图对自动填充很重要。
- `yesExcludeDescendants`：此视图对自动填充重要，但其子视图不重要。

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

若有内联图片，设置图片与文本输入框之间的内边距。

| Type   |
| ------ |
| number |

---

### `inputAccessoryViewID` <div class="label ios">iOS</div>

一个可选的标识符，用来将自定义的 [InputAccessoryView](inputaccessoryview.md) 绑定到当前输入框。当该输入框获得焦点时，这个 InputAccessoryView 会显示在键盘上方。

| Type   |
| ------ |
| string |

---

### `inputAccessoryViewButtonLabel` <div class="label ios">iOS</div>

可选的按钮文案，用来覆盖默认 [InputAccessoryView](inputaccessoryview.md) 上的按钮标签。

默认情况下，这个按钮标签不会做本地化处理，可以通过此属性提供一份本地化后的文案。

| Type   |
| ------ |
| string |

---

### `inputMode`

行为类似 HTML 中的 `inputmode` 属性，用来决定打开哪种键盘（如 `numeric`），并且优先级高于 `keyboardType`。

支持以下取值：

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

设置键盘的配色风格。

| Type                             |
| -------------------------------- |
| enum('default', 'light', 'dark') |

---

### `keyboardType`

决定弹出何种软键盘类型，譬如`numeric`（纯数字键盘）。

所有键盘类型的示意图可参考这里：[链接](https://davidl.fr/blog/keyboard-react-native-ios-android#all-react-native-keyboard-type-examples-i-os-on-the-left-android-on-the-right)。

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

指定在启用 `allowFontScaling` 时字体可放大的最大倍数。可选取值：

- `null/undefined`（默认）：继承父节点或全局默认值（0）
- `0`：不限制最大值，忽略父级/全局默认
- `>= 1`：将当前节点的 `maxFontSizeMultiplier` 设置为该数值

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

:::note
`numberOfLines` 在 iOS 上仅在[新架构](/architecture/landing-page)中可用。
:::

设置 `TextInput` 的最大行数。通常配合 `multiline={true}` 一起使用，以便填满指定的行数。

| Type   |
| ------ |
| number |

---

### `onBlur`

当文本框失去焦点的时候调用此回调函数。

:::note
如果你尝试从 `nativeEvent` 中读取 `text`，要注意该值可能为 `undefined`，从而导致一些意料之外的错误。如果你需要拿到 TextInput 的最终值，更推荐使用在编辑完成时触发的 [`onEndEditing`](textinput#onendediting) 事件。
:::

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

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

当文本输入内容的尺寸发生变化时调用。仅在多行输入框上触发。

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

当按压开始时调用的回调。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressOut`

当按压结束（手指抬起）时调用的回调。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onFocus`

当文本框获得焦点的时候调用此回调函数。

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

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

在尚未输入任何文字之前显示的占位字符串。

| Type   |
| ------ |
| string |

---

### `placeholderTextColor`

占位字符串的文字颜色。

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `readOnly`

如果为 `true`，则文本不可编辑。默认值为 `false`。

| Type |
| ---- |
| bool |

---

### `returnKeyLabel` <div class="label android">Android</div>

设置“回车”键上显示的文字。优先级高于 `returnKeyType`。

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

如果为 `true`，允许 TextInput 将触摸事件传递给父组件。这样像 SwipeableListView 这样的组件就可以在 iOS 上从 TextInput 开始滑动（Android 默认就是这种行为）。如果为 `false`，则 TextInput 会始终请求自己处理输入事件（除非被禁用）。默认值为 `true`。

| Type |
| ---- |
| bool |

---

### `rows` <div class="label android">Android</div>

设置 `TextInput` 的行数。通常配合 `multiline={true}` 一起使用，以便填满对应的行数。

| Type   |
| ------ |
| number |

---

### `scrollEnabled` <div class="label ios">iOS</div>

如果为 `false`，将禁用文本视图的滚动。默认值为 `true`。仅在 `multiline={true}` 时生效。

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

### `selectionHandleColor` <div class="label android">Android</div>

设置选择句柄（光标两端拖拽小圆点）的颜色。与 `selectionColor` 不同，它允许单独定制选择句柄的颜色，而不影响选区高亮的颜色。

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

当为 `false` 时，在输入框获得焦点时将阻止软键盘弹出。默认值为 `true`。

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

### `smartInsertDelete` <div class="label ios">iOS</div>

如果为 `false`，iOS 系统在粘贴操作后不会自动插入额外空格，在剪切或删除操作后也不会自动删除一个或两个空格。

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `textAlign`

控制输入文字在输入框中的对齐方式，可选值为左对齐、居中或右对齐：

- `left`
- `center`
- `right`

| Type                            |
| ------------------------------- |
| enum('left', 'center', 'right') |

---

### `textContentType` <div class="label ios">iOS</div>

向键盘和系统提供用户输入内容的语义信息，让系统更好地理解该字段的用途。

:::note
[`autoComplete`](#autocomplete) 提供了相同的能力，并且适用于所有平台。你可以结合 [`Platform.select`](/docs/next/platform#select) 来实现不同平台上的差异化行为。

建议避免同时使用 `textContentType` 和 `autoComplete`。出于向后兼容考虑，当两者都设置时，以 `textContentType` 为准。
:::

你可以将 `textContentType` 设置为 `username` 或 `password` 来启用从设备钥匙串自动填充登录信息。

`newPassword` 可用于标记一个“新密码”输入框，方便用户将其保存在钥匙串中；`oneTimeCode` 可用于标记验证码输入框，以便从短信中自动填充一次性验证码。

若要禁用自动填充，将 `textContentType` 设为 `none`。

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

当在 iOS 上将 `textContentType` 设置为 `newPassword` 时，可以告诉系统密码的最小要求，以便系统为你生成一个满足条件的密码。如何编写合法的 `PasswordRules` 字符串，请参考 [Apple 文档](https://developer.apple.com/password-rules/)。

> 如果没有看到系统弹出的密码生成对话框，请检查：
> - 是否开启了自动填充：**设置** → **密码与账户** → 打开 **自动填充密码**；
> - 是否启用了 iCloud 钥匙串：**设置** → **Apple ID** → **iCloud** → **钥匙串** → 打开 **iCloud 钥匙串**。

| Type   |
| ------ |
| string |

---

### `style`

注意：并不是所有 Text 相关样式都对 `TextInput` 有效，下面是不完全的“不支持列表”：

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

在 Android API Level 23+ 上设置文本换行策略，可选值有 `simple`、`highQuality`、`balanced`，默认值为 `highQuality`。

| Type                                      |
| ----------------------------------------- |
| enum('simple', 'highQuality', 'balanced') |

---

### `underlineColorAndroid` <div class="label android">Android</div>

`TextInput` 下划线的颜色。

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `value`

要在输入框中显示的值。`TextInput` 是一个受控组件，这意味着如果提供了 `value`，原生输入框的内容会被强制与该值保持一致。大多数情况下这都很好用，但在某些场景下可能会导致闪烁——常见原因是通过保持 `value` 不变来阻止用户编辑。除了维持同样的 `value` 之外，更好的做法是将 `editable` 设为 `false`，或者设置/更新 `maxLength` 来避免不希望的编辑，同时不产生闪烁。

| Type   |
| ------ |
| string |

---

### `lineBreakStrategyIOS` <div class="label ios">iOS</div>

在 iOS 14+ 上设置换行策略。可选值有 `none`、`standard`、`hangul-word` 和 `push-out`。

| Type                                                        | Default  |
| ----------------------------------------------------------- | -------- |
| enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` |

---

### `lineBreakModeIOS` <div class="label ios">iOS</div>

在 iOS 上设置换行模式。可选值有：`wordWrapping`、`char`、`clip`、`head`、`middle` 和 `tail`。

| Type                                                                       | Default          |
| -------------------------------------------------------------------------- | ---------------- |
| enum(`'wordWrapping'`, `'char'`, `'clip'`, `'head'`, `'middle'`, `'tail'`) | `'wordWrapping'` |

## Methods

### `.focus()`

```tsx
focus();
```

使原生输入框请求获得焦点。

### `.blur()`

```tsx
blur();
```

使原生输入框失去焦点。

### `clear()`

```tsx
clear();
```

清空 `TextInput` 中的所有文本。

---

### `isFocused()`

```tsx
isFocused(): boolean;
```

如果当前输入框处于焦点状态，则返回 `true`，否则返回 `false`。

# 已知问题

- [react-native#19096](https://github.com/facebook/react-native/issues/19096)：不支持 Android 的 `onKeyPreIme`。
- [react-native#19366](https://github.com/facebook/react-native/issues/19366)：在通过返回键关闭 Android 键盘之后调用 `.focus()` 无法再次唤起键盘。
- [react-native#26799](https://github.com/facebook/react-native/issues/26799)：在 `keyboardType="email-address"` 或 `keyboardType="phone-pad"` 时，不支持 Android 上的 `secureTextEntry`。

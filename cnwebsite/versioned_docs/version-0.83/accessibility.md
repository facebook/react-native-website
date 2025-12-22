---
id: accessibility
title: 无障碍功能
---

**译注**：accessibility 一词常见多种译法：可访问性、无障碍性、辅助功能等等，其中文意思都不太能准确表达其功能的本质——即为残障人士提供便利。本文主要采用“无障碍功能”和“辅助技术/服务”的说法。如果你或你的公司暂时没有资源和精力去服务这些用户，那么你可以跳过本文。但是，`译者个人希望借本文档，呼吁有能力有资源的商业公司/组织/个人，重视残障人士使用智能手机的权利`。

iOS 和 Android 都提供了便于残障人士无障碍使用 App 的 API。此外，两个平台都提供了整套的辅助技术，比如都有针对视力受损人士的读屏软件（iOS 的 VoiceOver 和 Android 的 TalkBack）。同样地，在 React Native 中我们也封装了对应的 API，使开发者能够在 App 中集成无障碍功能。

> 注意：iOS 与 Android 在具体方法上会有所区别，因此 React Native 的实现也会因平台而异。

## 无障碍功能属性

### `accessible`

设置为`true`时表示当前视图是一个“无障碍元素”（accessibility element）。无障碍元素会将其所有子组件视为一整个可以选中的组件。默认情况下，所有可点击的组件（Touchable 系列组件）都是无障碍元素。

在 Android 上，React Native 视图的`accessible={true}`属性会被转译为原生视图对应的`focusable={true}`属性。

```jsx
<View accessible={true}>
  <Text>text one</Text>
  <Text>text two</Text>
</View>
```

在上面这个例子中，当父视图开启无障碍属性后，我们就无法单独选中'text one'和'text two'，而只能选中整个父视图。

### `accessibilityLabel`

当一个视图启用无障碍属性后，最好再加上一个 accessibilityLabel（无障碍标签），这样可以让使用 VoiceOver 的人们清楚地知道自己选中了什么。VoiceOver 会读出选中元素的无障碍标签。

设定`accessibilityLabel`属性并赋予一个字符串内容即可在 View、Text 或是 Touchable 中启用无障碍标签：

```jsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Tap me!"
  onPress={this._onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Press me!</Text>
  </View>
</TouchableOpacity>
```

在上面这段示例代码中，如果不在 TouchableOpacity 上设置无障碍标签，那么其默认值就会是"Press me!"（即 Text 子组件的文本值）。此时无障碍标签是通过自动取所有 Text 子节点的值，然后用空格连起来生成。

### `accessibilityLabelledBy` <div class="label android">Android</div>

引用另一个元素[nativeID](view.md#nativeid)来构建复杂的表单。
`accessibilityLabelledBy`的值应该与相关元素的`nativeID`匹配：

```jsx
<View>
  <Text nativeID="formLabel">用于输入字段标签的编辑框</Text>
  <TextInput
    accessibilityLabel="输入"
    accessibilityLabelledBy="formLabel"
  />
</View>
```

在上面的例子中，当焦点位于 TextInput 上时，屏幕阅读器会提示`输入，用于输入字段标签的编辑框`。

### `accessibilityHint`

无障碍提示用于帮助用户理解操作可能导致什么后果，尤其是当这些后果并不能从无障碍标签中清楚地了解时。

要启用无障碍提示只需在需要设置的元素上设置`accessibilityHint`属性，并赋予用于解释的文本：

```jsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="返回"
  accessibilityHint="返回到上一个页面"
  onPress={this._onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>返回</Text>
  </View>
</TouchableOpacity>
```

在上面这个例子里，iOS 的 VoiceOver 会在标签后读取提示，如果用户在设备的VoiceOver设置中启用了提示。有关accessibilityHint指南的更多信息，请阅读[iOS开发者文档](https://developer.apple.com/documentation/objectivec/nsobject/1615093-accessibilityhint)。

在上面这个例子里，Android 的 Talkback将在标签后读取提示。目前，Android 上无法关闭提示。

### `accessibilityLanguage` <div class="label ios">iOS</div>

通过使用 `accessibilityLanguage` 属性，屏幕阅读器将了解在阅读元素的 **标签**、**值** 和 **提示** 时要使用哪种语言。提供的字符串值必须遵循 [BCP 47 规范](https://www.rfc-editor.org/info/bcp47)。

```tsx
<View
  accessible={true}
  accessibilityLabel="Pizza"
  accessibilityLanguage="it-IT">
  <Text>🍕</Text>
</View>
```

### `accessibilityIgnoresInvertColors` <div class="label ios">iOS</div>

反转屏幕颜色是一项辅助功能，它使得 iPhone 和 iPad 对于某些对亮度敏感的人更加舒适，对于某些色盲患者更容易区分，对于视力低下的人来说更容易识别。然而，有时您会查看照片等视图，并不希望其被反转。在这种情况下，您可以将此属性设置为 false，以便这些特定视图不会反转其颜色。

### `accessibilityLiveRegion` <div class="label android">Android</div>

组件发生动态变化时，我们希望 TalkBack 能够提醒用户。这一行为可以通过设置`accessibilityLiveRegion`属性来实现。具体值可以设置为`none`，`polite`以及`assertive`：

- **none** 辅助服务不应该提醒用户当前视图的变化。
- **polite** 辅助服务应该提醒用户当前视图的变化。
- **assertive** 辅助服务应该立即打断当前的语音会话，提醒用户当前视图的变化。

```jsx
<TouchableWithoutFeedback onPress={this._addOne}>
  <View style={styles.embedded}>
    <Text>Click me</Text>
  </View>
</TouchableWithoutFeedback>
<Text accessibilityLiveRegion="polite">
  Clicked {this.state.count} times
</Text>
```

上面这个例子中，\_addOne 方法会改变 state.count 这个变量。那么只要用户点击了 TouchableWithoutFeedback，TalkBack 就会读出 Text 组件中的值，因为它设置了`accessibilityLiveRegion="polite"`属性。

### `accessibilityRole`

`accessibilityRole` 通知辅助技术用户组件的用途。

`accessibilityRole` 可以是以下之一：

- **adjustable** 元素具有可调整的特性（比如一个滑块）。
- **alert** 当元素包含重要文本以供用户查看时使用。
- **button** 具有按钮特性。
- **checkbox** 当元素表示可选中、未选中或混合选中状态的复选框时使用。
- **combobox** 当元素表示组合框，允许用户在多个选项中进行选择时使用。
- **header** 作为内容区域的头部（比如导航栏的标题）。
- **image** 具有图片特性。可以与按钮或链接等一起使用。
- **imagebutton** 当元素应被视为按钮并且还是图像时使用。
- **keyboardkey** 元素作为虚拟键盘的一个按键使用。
- **link** 具有链接特性。
- **menu** 当组件是一组选择菜单时使用。
- **menubar** 当组件是多个菜单的容器时使用。
- **menuitem** 用于表示菜单中的一个项目。
- **none** 无特性元素。
- **progressbar** 用于表示任务进度的组件。
- **radio** 用于表示单选按钮。
- **radiogroup** 用于表示一组单选按钮。
- **scrollbar** 用于表示滚动条。
- **search** 用作搜索框的文本框。
- **spinbutton** 用于表示打开选项列表的按钮。
- **summary** 在 App 冷启动（指完全退出后台后再进入）时提供当前的简要总结信息的元素。比如当天气应用冷启动时，显示当前天气情况的元素就会被标记为**summary**。
- **switch** 用于表示可切换开关。
- **tab** 用于表示选项卡。
- **tablist** 用于表示选项卡列表。
- **text** 具有不可编辑文本的特性。
- **timer** 用于表示计时器。
- **togglebutton** 用于表示切换按钮。应与辅助状态 accessibilityState checked 一起使用，指示按钮是否处于打开或关闭状态。
- **toolbar** 用于表示工具栏（操作按钮或组件的容器）。

### 无障碍状态 `accessibilityState`

向辅助技术的用户描述组件的当前状态。

`accessibilityState` 是一个对象。它包含以下字段：

| 名称     | 描述                                                                                                                                  | 类型               | 必需 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---- |
| disabled | 指示元素是否已禁用                                                                                    | boolean            | 否   |
| selected | 指示可选择元素当前是否已选中。                                                                 | boolean            | 否   |
| checked  | 指示可检查元素的状态。此字段可以采用布尔值或 "mixed" 字符串表示混合选择框。 | boolean or 'mixed' | 否   |
| busy     | 指示元素当前是否忙碌。                                                                               | boolean            | 否   |
| expanded | 指示可展开元素当前是否已展开或折叠。                                                           | boolean            | 否   |

要使用，请将 `accessibilityState` 设置为具有特定定义的对象。

### 无障碍值 `accessibilityValue`

表示组件的当前值。它可以是组件值的文本描述，或者对于基于范围的组件，如滑块和进度条，它包含范围信息（最小值、当前值和最大值）。

`accessibilityValue` 是一个对象。它包含以下字段：

| 名称 | 描述                                                                                           | 类型    | 必需                      |
| ---- | ---------------------------------------------------------------------------------------------- | ------- | ------------------------- |
| min  | 该组件范围的最小值。                                                   | integer | Required if `now` is set. |
| max  | 该组件范围的最大值。                                                   | integer | Required if `now` is set. |
| now  | 该组件范围的当前值。                                                | integer | 否                        |
| text | 该组件值的文本描述。如果设置，将覆盖 `min`、`now` 和 `max`。 | string  | 否                        |

### `accessibilityViewIsModal` <div class="label ios">iOS</div>

一个布尔值，指示VoiceOver是否应忽略接收者的同级视图中的元素。

例如，在包含同级视图`A`和`B`的窗口中，在视图`B`上将`accessibilityViewIsModal`设置为`true`会导致VoiceOver忽略视图`A`中的元素。另一方面，如果视图`B`包含子视图`C`，并且在视图`C`上将`accessibilityViewIsModal`设置为`true`，VoiceOver不会忽略视图`A`中的元素。

### `accessibilityElementsHidden` <div class="label ios">iOS</div>

一个布尔值，指示此辅助功能元素内包含的辅助功能元素是否已隐藏。

例如，在包含兄弟视图 `A` 和 `B` 的窗口中，在视图 `B` 上将 `accessibilityElementsHidden` 设置为 `true` 会导致VoiceOver忽略视图 `B` 中的元素。这类似于Android属性 `importantForAccessibility="no-hide-descendants"`。

### 无障碍功能优先级 `importantForAccessibility` <div class="label android">Android</div>

如果有两个 UI 组件同时层叠覆盖在父视图之上，那么默认的无障碍功能的焦点位置就可能难以预料。`importantForAccessibility`属性解决了这一问题，它可以控制某个视图是否触发无障碍功能事件，以及是否将其报告给辅助服务。具体值可以设置为`auto`，`yes`，`no`和`no-hide-descendants`（最后一个值会强制辅助服务忽略当前组件及其所有子组件）。

```jsx
<View style={styles.container}>
  <View
    style={{
      position: 'absolute',
      left: 10,
      top: 10,
      right: 10,
      height: 100,
      backgroundColor: 'green'
    }}
    importantForAccessibility="yes">
    <Text> First layout </Text>
  </View>
  <View
    style={{
      position: 'absolute',
      left: 10,
      top: 10,
      right: 10,
      height: 100,
      backgroundColor: 'yellow'
    }}
    importantForAccessibility="no-hide-descendant">
    <Text> Second layout </Text>
  </View>
</View>
```

上面这个例子里，第二个 View 的组件对于 TalkBack 和其他一些辅助服务来说是完全不可见的。这样我们就可以把两个视图覆盖到同一个父容器上，而不用担心影响 TalkBack 服务。

### `onAccessibilityEscape` <div class="label ios">iOS</div>

将此属性分配给一个自定义函数，该函数将在某人执行“逃脱”手势时被调用，这是一个双指Z形手势。逃脱函数应该在用户界面中向上或向后层次移动。这可能意味着在导航层次中向上移动或返回，或者关闭模态用户界面。如果所选元素没有“onAccessibilityEscape”函数，则系统将尝试沿视图层次向上遍历，直到找到一个具有此函数的视图，或者发出提示表示无法找到一个。

### 无障碍元素的点击事件 `onAccessibilityTap`

使用这一属性来绑定一个自定义的事件处理函数，这一函数会在当用户双击某个已经选中的无障碍元素时调用。

### 双指双击事件 `onMagicTap` <div class="label ios">iOS</div>

使用这一属性来绑定一个自定义的事件处理函数，这一函数会在当用户执行"magic tap"操作（即使用两个指头来双击）时调用。magic tap 的事件处理函数应该做与当前组件相关性最高的操作，比如在电话应用中，magic tap 的操作就应该接通电话，或是挂断已经接通的电话。如果当前选中的元素并没有`onMagicTap`函数，则系统会自动遍历视图层，直到找到一个可以响应此操作的。

## 无障碍操作 Accessibility Actions

辅助功能操作允许辅助技术以编程方式调用组件的操作。为了支持辅助功能操作，组件必须执行两项任务：

- 通过 `accessibilityActions` 属性定义其支持的操作列表。
- 实现一个 `onAccessibilityAction` 函数来处理操作请求。

`accessibilityActions` 属性应包含操作对象的列表。每个操作对象应包含以下字段：

| 名称  | 类型   | Required |
| ----- | ------ | -------- |
| 名称  | string | Yes      |
| label | string | No       |

操作可以表示标准操作，如点击按钮或调整滑块，或特定于给定组件的自定义操作，例如删除邮件消息。`name`字段对于标准操作和自定义操作都是必需的，但对于标准操作，`label`是可选的。

在添加对标准操作的支持时，`name`必须是以下之一：

- `'magicTap'` - 仅适用于iOS - 当VoiceOver焦点位于组件上或内部时，用户用两个手指双击。
- `'escape'` - 仅适用于iOS - 当VoiceOver焦点位于组件上或内部时，用户执行双指刷动手势（左，右，左）。
- `'activate'` - 激活组件。通常情况下，当屏幕阅读器用户双击组件时，应执行与用户触摸或单击组件时相同的操作。
- `'increment'` - 增加可调整组件的值。在iOS上，当组件具有`'adjustable'`角色并且用户将焦点放在组件上并向上滑动时，VoiceOver会生成此操作。在Android上，当用户将可访问性焦点放在组件上并按音量增加按钮时，TalkBack会生成此操作。
- `'decrement'` - 减少可调整组件的值。在iOS上，当组件具有`'adjustable'`角色并且用户将焦点放在组件上并向下滑动时，VoiceOver会生成此操作。在Android上，当用户将可访问性焦点放在组件上并按音量减小按钮时，TalkBack会生成此操作。
- `'longpress'` - 仅适用于Android - 当用户将可访问性焦点放在组件上并双击并长按屏幕上的一个手指时，会生成此操作。通常情况下，这应执行与用户在不使用辅助技术时按住组件上的一个手指时相同的操作。

`label`字段对于标准操作是可选的，通常不被辅助技术使用。对于自定义操作，它是一个包含要呈现给用户的操作描述的本地化字符串。

要处理操作请求，组件必须实现一个`onAccessibilityAction`函数。此函数的唯一参数是包含要执行的操作名称的事件。以下示例来自RNTester，展示了如何创建一个定义和处理多个自定义操作的组件。

```jsx
<View
  accessible={true}
  accessibilityActions={[
    { name: 'cut', label: 'cut' },
    { name: 'copy', label: 'copy' },
    { name: 'paste', label: 'paste' }
  ]}
  onAccessibilityAction={(event) => {
    switch (event.nativeEvent.actionName) {
      case 'cut':
        Alert.alert('Alert', 'cut action success');
        break;
      case 'copy':
        Alert.alert('Alert', 'copy action success');
        break;
      case 'paste':
        Alert.alert('Alert', 'paste action success');
        break;
    }
  }}
/>
```

## 查看读屏应用是否已开启

`AccessibilityInfo`可以用于查询读屏应用是否已开启。请查看[AccessibilityInfo 的文档](accessibilityinfo.md)来了解具体用法。

## 发送无障碍功能的相关事件 <div class="label android">Android</div>

有时候需要在 UI 组件上主动触发一个无障碍功能的事件（比如当某个自定义的视图出现在屏幕上或是某个自定义的单选框被选中）。为此 UIManager 模块提供了一个`sendAccessibilityEvent`方法。它接受两个参数：view 标签和事件类型。支持的事件类型有`typeWindowStateChanged`, `typeViewFocused` 和 `typeViewClicked`。

```jsx
import { Platform, UIManager, findNodeHandle } from 'react-native';

if (Platform.OS === 'android') {
    UIManager.sendAccessibilityEvent(
      findNodeHandle(this),
      UIManager.AccessibilityEventTypes.typeViewFocused);
  }
}
```

在上面这个例子里我们创建了一个自定义的单选框（CustomRadioButton），并且使其具有了和原生单选框一样的无障碍功能。具体来说，也就是 TalkBack 可以正确地通知用户当前选项的变更了。

## 测试 TalkBack 支持 <div class="label android">Android</div>

要启用 TalkBack，请转到您的 Android 设备或模拟器上的设置应用程序。点击“辅助功能”，然后选择TalkBack。切换“使用服务”开关以启用或禁用它。

附注：默认情况下，Android 模拟器不具备 TalkBack 功能。若要安装它：

1. 在此处下载 TalkBack 文件：https://google-talkback.en.uptodown.com/android
2. 将下载的`.apk`文件拖入模拟器中

您可以使用音量键快捷方式来切换 TalkBack。要启用音量键快捷方式，请转到设置应用程序，然后选择“辅助功能”。在顶部，打开音量键快捷方式。

要使用音量键快捷方式，请同时按住两个音量键3秒，以启动辅助工具。

另外，如果您愿意，您可以通过命令行来切换 TalkBack：

```
# disable
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService
 # enable
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
```

## 测试 VoiceOver <div class="label ios">iOS</div>

要开启 VoiceOver 功能，先打开 iOS 设备的设置选项（注意模拟器上没法测试）。点击“通用”，然后是“辅助选项”，你会看到很多为残障人群使用手机减少障碍的工具，比如更大的字体、更高的对比度以及 VoiceOver。

在“视觉”菜单下点击 VoiceOver，将开关置为打开状态即可启用。

在辅助选项的最底部，有一个“辅助选项快捷键”，开启之后可以通过点击三次 Home 按钮来快速关闭或打开 VoiceOver 工具。

## 更多资料

- [Making React Native Apps Accessible](https://engineering.fb.com/ios/making-react-native-apps-accessible/)

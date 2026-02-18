---
id: accessibility
title: 无障碍功能
description: 使用 React Native 面向 Android 和 iOS 的无障碍 API，构建可被辅助技术访问的移动应用。
---

import ExperimentalAPIWarning from './_experimental-api-warning.mdx';

Android 和 iOS 都提供了与辅助技术集成的能力，例如系统自带的读屏器 VoiceOver（iOS）和 TalkBack（Android）。React Native 提供了配套 API，帮助你的应用更好地服务所有用户。

:::info
Android 与 iOS 在无障碍实现方式上有差异，因此 React Native 的具体行为也可能因平台而不同。
:::

## 无障碍属性

### `accessible`

当值为 `true` 时，表示该视图可被读屏器、硬件键盘等辅助技术发现。注意：可发现不一定等于一定会被 VoiceOver / TalkBack 聚焦；例如 VoiceOver 不允许嵌套无障碍元素，或 TalkBack 可能优先聚焦父元素。

默认情况下，所有可触摸元素（Touchable 系列）都具有无障碍能力。

在 Android 上，`accessible` 会映射为原生 [`focusable`](<https://developer.android.com/reference/android/view/View#setFocusable(boolean)>)；在 iOS 上会映射为原生 [`isAccessibilityElement`](https://developer.apple.com/documentation/uikit/uiaccessibilityelement/isaccessibilityelement?language=objc)。

```tsx
<View>
  <View accessible={true} />
  <View />
</View>
```

以上示例中，只有第一个子视图（设置了 `accessible`）可获得无障碍焦点；父视图和未设置 `accessible` 的兄弟视图不可获得焦点。

### `accessibilityLabel`

当一个视图被标记为可访问时，建议同时设置 `accessibilityLabel`，让 VoiceOver / TalkBack 用户知道当前选中了什么。被选中时，读屏器会朗读该文本。

可在 View、Text、Touchable 上设置 `accessibilityLabel`：

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Tap me!"
  onPress={onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Press me!</Text>
  </View>
</TouchableOpacity>
```

在上例中，如果不显式设置 `accessibilityLabel`，TouchableOpacity 的标签默认会是 "Press me!"（由其所有 Text 子节点用空格拼接而成）。

### `accessibilityLabelledBy` <div className="label android">Android</div>

用于引用另一个元素的 [nativeID](view.md#nativeid)，常用于复杂表单。
`accessibilityLabelledBy` 的值应与对应元素的 `nativeID` 一致：

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput
    accessibilityLabel="input"
    accessibilityLabelledBy="formLabel"
  />
</View>
```

上例中，读屏器聚焦 TextInput 时会朗读：`Input, Edit Box for Label for Input Field`。

### `accessibilityHint`

当仅凭 `accessibilityLabel` 仍不足以说明操作结果时，可使用无障碍提示（hint）补充上下文。

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Go back"
  accessibilityHint="Navigates to the previous screen"
  onPress={onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Back</Text>
  </View>
</TouchableOpacity>
```

<div className="label ios basic">iOS</div>

如果用户在设备 VoiceOver 设置中启用了提示，VoiceOver 会在 label 之后朗读 hint。更多建议请见 [iOS Developer Docs](https://developer.apple.com/documentation/objectivec/nsobject/1615093-accessibilityhint)。

<div className="label android basic">Android</div>

TalkBack 会在 label 后朗读 hint；当前 Android 不支持关闭 hint。

### `accessibilityLanguage` <div className="label ios">iOS</div>

通过 `accessibilityLanguage` 指定读屏器朗读 **label**、**value**、**hint** 所使用的语言。值必须符合 [BCP 47 规范](https://www.rfc-editor.org/info/bcp47)。

```tsx
<View
  accessible={true}
  accessibilityLabel="Pizza"
  accessibilityLanguage="it-IT">
  <Text>🍕</Text>
</View>
```

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

iOS / iPadOS 提供“反转颜色”辅助功能，帮助色弱、低视力等用户。若某些视图（如照片）不希望在开启该设置时被反色，可将此属性设为 `true`。

### `accessibilityLiveRegion` <div className="label android">Android</div>

当组件内容动态变化时，可通过 `accessibilityLiveRegion` 让 TalkBack 及时播报：`none`、`polite`、`assertive`。

- **none** 不应播报该视图变化。
- **polite** 应播报该视图变化。
- **assertive** 立即打断当前语音并播报该视图变化。

```tsx
<TouchableWithoutFeedback onPress={addOne}>
  <View style={styles.embedded}>
    <Text>Click me</Text>
  </View>
</TouchableWithoutFeedback>
<Text accessibilityLiveRegion="polite">
  Clicked {count} times
</Text>
```

上例中，`addOne` 会更新 `count`。触发 TouchableWithoutFeedback 后，TalkBack 会因 `accessibilityLiveRegion="polite"` 朗读 Text 的变化。

### `accessibilityRole`

`accessibilityRole` 用来向辅助技术说明组件用途。

可选值：

- **adjustable** 可调整元素（如滑块）。
- **alert** 需要呈现给用户的重要文本。
- **button** 按钮。
- **checkbox** 复选框（选中/未选中/混合）。
- **combobox** 组合框。
- **header** 内容区标题（如导航栏标题）。
- **image** 图片（可与 button/link 组合）。
- **imagebutton** 图片按钮。
- **keyboardkey** 键盘按键。
- **link** 链接。
- **menu** 菜单。
- **menubar** 菜单栏容器。
- **menuitem** 菜单项。
- **none** 无角色。
- **progressbar** 进度条。
- **radio** 单选项。
- **radiogroup** 单选组。
- **scrollbar** 滚动条。
- **search** 搜索输入框。
- **spinbutton** 打开选项列表的按钮。
- **summary** 应用首次启动时用于概述当前状态。
- **switch** 开关。
- **tab** 标签页。
- **tablist** 标签页列表。
- **text** 静态文本。
- **timer** 计时器。
- **togglebutton** 切换按钮（应结合 accessibilityState.checked 使用）。
- **toolbar** 工具栏容器。
- **grid** 与 ScrollView / VirtualizedList / FlatList / SectionList 结合，表示网格，并为 Android GridView 增加进出网格播报。

### `accessibilityShowsLargeContentViewer` <div className="label ios">iOS</div>

布尔值。是否在用户对元素长按时显示 large content viewer。

iOS 13.0+ 可用。

### `accessibilityLargeContentTitle` <div className="label ios">iOS</div>

large content viewer 显示时使用的标题文本。

要求 `accessibilityShowsLargeContentViewer={true}`。

```tsx
<View
  accessibilityShowsLargeContentViewer={true}
  accessibilityLargeContentTitle="Home Tab">
  <Text>Home</Text>
</View>
```

### `accessibilityState`

向辅助技术用户描述组件当前状态。

`accessibilityState` 是对象，包含：

| Name     | Description                                                                                                                           | Type               | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| disabled | 元素是否禁用。                                                                                                                         | boolean            | No       |
| selected | 可选元素当前是否选中。                                                                                                                 | boolean            | No       |
| checked  | 可勾选元素状态。可为布尔值，或字符串 `"mixed"`（混合状态）。                                                                           | boolean or 'mixed' | No       |
| busy     | 元素当前是否忙碌。                                                                                                                     | boolean            | No       |
| expanded | 可展开元素当前是展开还是折叠。                                                                                                         | boolean            | No       |

使用时，将 `accessibilityState` 设为符合上述结构的对象。

### `accessibilityValue`

表示组件当前值。可为文本描述；对于范围型组件（如滑块、进度条），可包含范围信息（最小、当前、最大）。

`accessibilityValue` 是对象，包含：

| Name | Description                                                                                    | Type    | Required                  |
| ---- | ---------------------------------------------------------------------------------------------- | ------- | ------------------------- |
| min  | 范围最小值。                                                                                     | integer | Required if `now` is set. |
| max  | 范围最大值。                                                                                     | integer | Required if `now` is set. |
| now  | 当前值。                                                                                         | integer | No                        |
| text | 值的文本描述。若设置该字段，会覆盖 `min`、`now`、`max`。                                           | string  | No                        |

### `accessibilityViewIsModal` <div className="label ios">iOS</div>

布尔值。指示 VoiceOver 是否应忽略与当前视图同级的其他视图中的元素。

例如窗口中有同级视图 `A`、`B`：若在 `B` 上设为 `true`，VoiceOver 会忽略 `A` 内元素；若 `B` 内有子视图 `C`，并在 `C` 上设为 `true`，则 VoiceOver 不会忽略 `A`。

### `accessibilityElementsHidden` <div className="label ios">iOS</div>

布尔值。指示当前无障碍元素及其包含的无障碍元素是否被隐藏。

例如窗口中有同级视图 `A`、`B`：在 `B` 上设 `accessibilityElementsHidden={true}` 时，VoiceOver 会忽略 `B` 及其子元素。其效果类似 Android 的 `importantForAccessibility="no-hide-descendants"`。

### `aria-valuemax`

表示范围型组件（如滑块、进度条）的最大值。

### `aria-valuemin`

表示范围型组件（如滑块、进度条）的最小值。

### `aria-valuenow`

表示范围型组件（如滑块、进度条）的当前值。

### `aria-valuetext`

表示组件值的文本描述。

### `aria-busy`

表示元素正在被修改，辅助技术可能应在变更完成后再通知用户。

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-checked`

表示可勾选元素状态。可为布尔值或 `"mixed"`（混合状态）。

| Type             | Default |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

### `aria-disabled`

表示元素可被感知但处于禁用状态，不可编辑或不可操作。

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-expanded`

表示可展开元素当前为展开还是折叠。

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-hidden`

表示元素是否对辅助技术隐藏。

例如窗口中有同级视图 `A`、`B`：若将 `B` 设为 `aria-hidden`，VoiceOver 会忽略 `B` 及其子元素。

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-label`

定义可用于命名元素的字符串。

| Type   |
| ------ |
| string |

### `aria-labelledby` <div className="label android">Android</div>

用于标识为当前元素提供标签的元素。其值应与相关元素的 [`nativeID`](view.md#nativeid) 一致：

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput aria-label="input" aria-labelledby="formLabel" />
</View>
```

| Type   |
| ------ |
| string |

### `aria-live` <div className="label android">Android</div>

表示该元素会更新，并描述用户代理、辅助技术及用户可预期的更新播报方式。

- **off** 不播报变化。
- **polite** 播报变化。
- **assertive** 立即打断当前语音并播报。

| Type                                     | Default |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div className="label ios">iOS</div>

布尔值。指示 VoiceOver 是否应忽略与当前视图同级的其他视图中的元素。

| Type    | Default |
| ------- | ------- |
| boolean | false   |

### `aria-selected`

表示可选元素当前是否被选中。

| Type    |
| ------- |
| boolean |

### `experimental_accessibilityOrder`

<ExperimentalAPIWarning />

:::note
为简化示例，下文省略布局代码。默认聚焦顺序受布局影响，这里假定文档顺序与布局顺序一致。
:::

`experimental_accessibilityOrder` 允许你定义辅助技术聚焦后代组件的顺序。它是一个 [`nativeID`](view.md#nativeid) 数组，指定需要控制顺序的组件。例如：

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
</View>
```

辅助技术会按 `B`、`C`、`A` 的顺序聚焦。

`experimental_accessibilityOrder` 不会替引用到的组件“自动开启”无障碍，仍需组件本身可访问。例如把上面 `C` 的 `accessible={true}` 去掉：

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C"/>
</View>
```

新的顺序会是 `B`、`A`；虽然 `C` 在数组中，但它本身不可访问。

另一方面，`experimental_accessibilityOrder` 会“排除”未被引用的可访问组件：

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
  <View accessible={true} nativeID="D"/>
</View>
```

顺序为 `B`、`C`、`A`，`D` 永远不会被聚焦。也就是说它是“穷举式（exhaustive）”的。

某些情况下，把不可访问组件放进 `experimental_accessibilityOrder` 仍有意义。比如：

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C">
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

顺序会是 `B`、`D`、`E`、`F`、`A`。虽然后代 `D/E/F` 没被直接引用，但 `C` 被直接引用，并且 `C` 是一个无障碍容器（自身不可访问，但包含可访问元素）。当容器被引用时，其内部元素按默认顺序参与聚焦，即它是“可嵌套（nestable）”的。

`experimental_accessibilityOrder` 也可以引用另一个也设置了 `experimental_accessibilityOrder` 的组件：

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C" experimental_accessibilityOrder={['F', 'E', 'D']}>
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

顺序会是 `B`、`F`、`E`、`D`、`A`。

组件不能同时既是无障碍容器又是无障碍元素（`accessible={true}`）。例如：

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C" experimental_accessibilityOrder={['F', 'E', 'D']}>
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

顺序将是 `B`、`C`、`A`。`D/E/F` 不再处于容器中，因此会被穷举规则排除。

### `importantForAccessibility` <div className="label android">Android</div>

当同一父级下有重叠 UI 时，默认无障碍焦点可能不可预测。`importantForAccessibility` 可控制视图是否触发无障碍事件，以及是否上报给无障碍服务。可选：`auto`、`yes`、`no`、`no-hide-descendants`（最后一个会强制忽略当前组件及其全部子组件）。

```tsx
<View style={styles.container}>
  <View
    style={[styles.layout, {backgroundColor: 'green'}]}
    importantForAccessibility="yes">
    <Text>First layout</Text>
  </View>
  <View
    style={[styles.layout, {backgroundColor: 'yellow'}]}
    importantForAccessibility="no-hide-descendants">
    <Text>Second layout</Text>
  </View>
</View>
```

上例中，黄色布局及其后代对 TalkBack 和其他无障碍服务完全不可见，因此可在重叠视图场景下避免焦点混乱。

### `onAccessibilityEscape` <div className="label ios">iOS</div>

绑定一个自定义函数，当用户执行“escape”手势（双指画 Z）时调用。该函数通常应执行层级返回操作：如返回上一级页面、回退导航层级或关闭模态界面。若当前选中元素未实现该函数，系统会沿视图层级向上查找；若仍找不到则发出失败提示音。

### `onAccessibilityTap` <div className="label ios">iOS</div>

绑定一个自定义函数。当用户选中该无障碍元素后执行双击时触发。

### `onMagicTap` <div className="label ios">iOS</div>

绑定一个自定义函数，当用户执行“magic tap”（双指双击）时触发。该函数应执行该场景下最相关的操作。比如 iPhone 电话应用中，magic tap 会接听来电或结束当前通话。若当前元素未实现该函数，系统会沿视图层级向上查找。

### `role`

`role` 用于说明组件用途，并且其优先级高于 [`accessibilityRole`](accessibility#accessibilityrole)。

`role` 可选值：

- **alert** 显示重要提示文本。
- **button** 按钮。
- **checkbox** 复选框（选中/未选中/混合）。
- **combobox** 组合框。
- **grid** 与 ScrollView / VirtualizedList / FlatList / SectionList 结合表示网格，并为 Android GridView 增加进出网格播报。
- **heading** 内容区标题。
- **img** 图片（可与按钮或链接组合）。
- **link** 链接。
- **list** 列表。
- **listitem** 列表项。
- **menu** 菜单。
- **menubar** 菜单栏容器。
- **menuitem** 菜单项。
- **none** 无角色。
- **presentation** 无角色。
- **progressbar** 进度条。
- **radio** 单选项。
- **radiogroup** 单选组。
- **scrollbar** 滚动条。
- **searchbox** 搜索输入框。
- **slider** 可调整元素（如滑块）。
- **spinbutton** 打开选项列表的按钮。
- **summary** 应用首次启动时用于快速概述当前状态。
- **switch** 开关。
- **tab** 标签页。
- **tablist** 标签页列表。
- **timer** 计时器。
- **toolbar** 工具栏容器。

## 无障碍操作（Accessibility Actions）

无障碍操作允许辅助技术以编程方式触发组件动作。要支持它，组件需要：

- 通过 `accessibilityActions` 定义支持的动作列表；
- 实现 `onAccessibilityAction` 处理动作请求。

`accessibilityActions` 是动作对象数组，每项字段如下：

| Name  | Type   | Required |
| ----- | ------ | -------- |
| name  | string | Yes      |
| label | string | No       |

动作既可表示标准动作（如点击、调节），也可表示组件特有的自定义动作（如删除邮件）。
`name` 对标准与自定义动作都必填；`label` 对标准动作可选。

支持标准动作时，`name` 可为：

- `'magicTap'` - iOS only - VoiceOver 焦点在组件上/内部时，用户双指双击。
- `'escape'` - iOS only - VoiceOver 焦点在组件上/内部时，用户执行双指擦拭手势（左、右、左）。
- `'activate'` - 激活动作。应与普通（非辅助技术）操作保持一致；读屏用户双击组件时触发。
- `'increment'` - 增加可调整组件值。iOS 上，当角色为 `'adjustable'` 且用户上滑时触发；Android 上，当用户聚焦后按音量加键触发。
- `'decrement'` - 减少可调整组件值。iOS 上，当角色为 `'adjustable'` 且用户下滑时触发；Android 上，当用户聚焦后按音量减键触发。
- `'longpress'` - Android only - 用户聚焦后双击并按住触发；应与普通长按行为一致。
- `'expand'` - Android only - 展开组件，TalkBack 会播报“已展开”提示。
- `'collapse'` - Android only - 折叠组件，TalkBack 会播报“已折叠”提示。

`label` 对标准动作通常不会被辅助技术使用；对自定义动作，`label` 应是本地化字符串，用于向用户描述该动作。

处理动作请求时，实现 `onAccessibilityAction`，其参数事件中包含动作名。示例：

```tsx
<View
  accessible={true}
  accessibilityActions={[
    {name: 'cut', label: 'cut'},
    {name: 'copy', label: 'copy'},
    {name: 'paste', label: 'paste'},
  ]}
  onAccessibilityAction={event => {
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

## 检查读屏器是否开启

`AccessibilityInfo` API 可用于判断读屏器当前是否激活。详见 [AccessibilityInfo 文档](accessibilityinfo)。

## 发送无障碍事件 <div className="label android">Android</div>

有时你需要主动在某个 UI 组件上触发无障碍事件（例如自定义视图出现，或希望将无障碍焦点移到某个视图）。原生 `UIManager` 模块提供了 `sendAccessibilityEvent` 方法，接收两个参数：视图 tag 与事件类型。支持事件类型：`typeWindowStateChanged`、`typeViewFocused`、`typeViewClicked`。

```tsx
import {Platform, UIManager, findNodeHandle} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.sendAccessibilityEvent(
    findNodeHandle(this),
    UIManager.AccessibilityEventTypes.typeViewFocused,
  );
}
```

## 测试 TalkBack 支持 <div className="label android">Android</div>

在 Android 设备或模拟器中，打开“设置”→“无障碍”→“TalkBack”，切换“使用服务”开关即可启用或停用。

Android 模拟器默认不一定预装 TalkBack。你可通过 Google Play 商店安装 TalkBack。请确保选择带 Google Play 的模拟器镜像（可在 Android Studio 中创建）。

你也可使用音量键快捷方式切换 TalkBack：在“设置”→“无障碍”中开启“音量键快捷方式”，随后同时按住两侧音量键 3 秒启动无障碍工具。

另外，也可通过命令行切换 TalkBack：

```shell
# disable
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService

# enable
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
```

## 测试 VoiceOver 支持 <div className="label ios">iOS</div>

在 iOS / iPadOS 设备中，进入“设置”应用，点“通用”→“辅助功能”，即可找到 VoiceOver 等多种可访问性工具。进入“视觉”下的 VoiceOver 并开启顶部开关即可启用。

在辅助功能设置底部可看到“辅助功能快捷键”，可通过三击 Home 键快速切换 VoiceOver。

模拟器不提供 VoiceOver，但可以使用 Xcode 的 Accessibility Inspector 通过 macOS VoiceOver 对应用进行辅助测试。注意：仍建议优先在真机测试，因为 macOS VoiceOver 的体验可能与 iOS 设备不同。

## 更多资源

- [Making React Native Apps Accessible](https://engineering.fb.com/ios/making-react-native-apps-accessible/)

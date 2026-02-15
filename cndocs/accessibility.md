---
id: accessibility
title: 无障碍功能
description: 使用 React Native 提供的一整套无障碍 API 来创建面向辅助技术的移动应用，兼容 Android 和 iOS。
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

iOS 和 Android 都提供了便于残障人士无障碍使用 App 的 API，比如都有针对视力受损人士的读屏软件（iOS 的 VoiceOver 和 Android 的 TalkBack）。React Native 也提供了相应的 API，使开发者能够在 App 中集成无障碍功能。

:::info
Android 和 iOS 在具体方法上会有所区别，因此 React Native 的实现也会因平台而异。
:::

## 无障碍功能属性

### `accessible`

设置为 `true` 时表示当前视图可被辅助技术（如读屏软件和硬件键盘）发现。注意，这并不一定意味着视图会被 VoiceOver 或 TalkBack 聚焦。有多种原因可能导致无法聚焦，例如 VoiceOver 不允许嵌套的无障碍元素，或者 TalkBack 选择聚焦某个父元素。

默认情况下，所有可点击的组件（Touchable 系列组件）都是无障碍元素。

在 Android 上，`accessible` 会被转译为原生的 [`focusable`](<https://developer.android.com/reference/android/view/View#setFocusable(boolean)>) 属性。在 iOS 上，它会被转译为原生的 [`isAccessibilityElement`](https://developer.apple.com/documentation/uikit/uiaccessibilityelement/isaccessibilityelement?language=objc) 属性。

```tsx
<View>
  <View accessible={true} />
  <View />
</View>
```

在上面这个例子中，只有第一个设置了 `accessible` 属性的子视图可以获得无障碍焦点，而父视图和没有设置 `accessible` 的兄弟视图则不能。

### `accessibilityLabel`

当一个视图启用无障碍属性后，最好再加上一个 `accessibilityLabel`（无障碍标签），这样可以让使用 VoiceOver 或 TalkBack 的人们清楚地知道自己选中了什么。读屏软件会读出选中元素的无障碍标签。

设定 `accessibilityLabel` 属性并赋予一个字符串内容即可在 View、Text 或 Touchable 中启用无障碍标签：

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

在上面这段示例代码中，如果不在 TouchableOpacity 上设置无障碍标签，那么其默认值就会是"Press me!"（即 Text 子组件的文本值）。此时无障碍标签是通过自动取所有 Text 子节点的值，然后用空格连起来生成。

### `accessibilityLabelledBy` <div className="label android">Android</div>

引用另一个元素的 [nativeID](view.md#nativeid) 来构建复杂的表单。`accessibilityLabelledBy` 的值应该与相关元素的 `nativeID` 匹配：

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput
    accessibilityLabel="input"
    accessibilityLabelledBy="formLabel"
  />
</View>
```

在上面的例子中，当焦点位于 TextInput 上时，屏幕阅读器会提示 `Input, Edit Box for Label for Input Field`。

### `accessibilityHint`

无障碍提示用于帮助用户理解操作可能导致什么后果，尤其是当这些后果并不能从无障碍标签中清楚地了解时。

要启用无障碍提示只需在需要设置的元素上设置 `accessibilityHint` 属性，并赋予用于解释的文本：

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

在上面这个例子里，iOS 的 VoiceOver 会在标签后读取提示，前提是用户在设备的 VoiceOver 设置中启用了提示。有关 `accessibilityHint` 指南的更多信息，请阅读 [iOS 开发者文档](https://developer.apple.com/documentation/objectivec/nsobject/1615093-accessibilityhint)。

<div className="label android basic">Android</div>

在上面这个例子里，Android 的 TalkBack 将在标签后读取提示。目前，Android 上无法关闭提示。

### `accessibilityLanguage` <div className="label ios">iOS</div>

通过使用 `accessibilityLanguage` 属性，屏幕阅读器将了解在阅读元素的**标签**、**值**和**提示**时要使用哪种语言。提供的字符串值必须遵循 [BCP 47 规范](https://www.rfc-editor.org/info/bcp47)。

```tsx
<View
  accessible={true}
  accessibilityLabel="Pizza"
  accessibilityLanguage="it-IT">
  <Text>🍕</Text>
</View>
```

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

反转屏幕颜色是 iOS 和 iPadOS 中的一项辅助功能，可帮助色盲、低视力或视力障碍人士。如果你不想让某个视图（比如照片）在该设置开启时被反转，可以将此属性设置为 `true`。

### `accessibilityLiveRegion` <div className="label android">Android</div>

组件发生动态变化时，我们希望 TalkBack 能够提醒用户。这一行为可以通过设置 `accessibilityLiveRegion` 属性来实现。具体值可以设置为 `none`、`polite` 以及 `assertive`：

- **none** 辅助服务不应该提醒用户当前视图的变化。
- **polite** 辅助服务应该提醒用户当前视图的变化。
- **assertive** 辅助服务应该立即打断当前的语音会话，提醒用户当前视图的变化。

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

上面这个例子中，`addOne` 方法会改变 `count` 这个状态变量。只要用户点击了 TouchableWithoutFeedback，TalkBack 就会读出 Text 组件中的值，因为它设置了 `accessibilityLiveRegion="polite"` 属性。

### `accessibilityRole`

`accessibilityRole` 用于告知辅助技术用户当前组件的用途。

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
- **summary** 在 App 冷启动（指完全退出后台后再进入）时提供当前的简要总结信息的元素。
- **switch** 用于表示可切换开关。
- **tab** 用于表示选项卡。
- **tablist** 用于表示选项卡列表。
- **text** 具有不可编辑文本的特性。
- **timer** 用于表示计时器。
- **togglebutton** 用于表示切换按钮。应与 accessibilityState checked 一起使用，指示按钮是否处于打开或关闭状态。
- **toolbar** 用于表示工具栏（操作按钮或组件的容器）。
- **grid** 与 ScrollView、VirtualizedList、FlatList 或 SectionList 一起使用以表示网格。在 Android 的 GridView 上添加进入/离开网格的播报。

### `accessibilityShowsLargeContentViewer` <div className="label ios">iOS</div>

一个布尔值，用于确定当用户对该元素长按时是否显示大内容查看器。

在 iOS 13.0 及以上版本可用。

### `accessibilityLargeContentTitle` <div className="label ios">iOS</div>

一个字符串，当大内容查看器显示时将用作其标题。

需要将 `accessibilityShowsLargeContentViewer` 设置为 `true`。

```tsx
<View
  accessibilityShowsLargeContentViewer={true}
  accessibilityLargeContentTitle="Home Tab">
  <Text>Home</Text>
</View>
```

### `accessibilityState`

向辅助技术的用户描述组件的当前状态。

`accessibilityState` 是一个对象。它包含以下字段：

| 名称     | 描述                                                                                       | 类型               | 必需 |
| -------- | ------------------------------------------------------------------------------------------ | ------------------ | ---- |
| disabled | 指示元素是否已禁用。                                                                       | boolean            | 否   |
| selected | 指示可选择元素当前是否已选中。                                                             | boolean            | 否   |
| checked  | 指示可选元素的状态。此字段可以采用布尔值或 "mixed" 字符串表示混合选择框。                   | boolean or 'mixed' | 否   |
| busy     | 指示元素当前是否忙碌。                                                                     | boolean            | 否   |
| expanded | 指示可展开元素当前是否已展开或折叠。                                                       | boolean            | 否   |

要使用，请将 `accessibilityState` 设置为具有特定定义的对象。

### `accessibilityValue`

表示组件的当前值。它可以是组件值的文本描述，或者对于基于范围的组件（如滑块和进度条），它包含范围信息（最小值、当前值和最大值）。

`accessibilityValue` 是一个对象。它包含以下字段：

| 名称 | 描述                                                                       | 类型    | 必需                  |
| ---- | -------------------------------------------------------------------------- | ------- | --------------------- |
| min  | 该组件范围的最小值。                                                       | integer | 设置了 `now` 时必需。 |
| max  | 该组件范围的最大值。                                                       | integer | 设置了 `now` 时必需。 |
| now  | 该组件范围的当前值。                                                       | integer | 否                    |
| text | 该组件值的文本描述。如果设置，将覆盖 `min`、`now` 和 `max`。              | string  | 否                    |

### `accessibilityViewIsModal` <div className="label ios">iOS</div>

一个布尔值，指示 VoiceOver 是否应忽略接收者的同级视图中的元素。

例如，在包含同级视图 `A` 和 `B` 的窗口中，在视图 `B` 上将 `accessibilityViewIsModal` 设置为 `true` 会导致 VoiceOver 忽略视图 `A` 中的元素。另一方面，如果视图 `B` 包含子视图 `C`，并且在视图 `C` 上将 `accessibilityViewIsModal` 设置为 `true`，VoiceOver 不会忽略视图 `A` 中的元素。

### `accessibilityElementsHidden` <div className="label ios">iOS</div>

一个布尔值，指示此辅助功能元素及其包含的所有辅助功能元素是否已隐藏。

例如，在包含兄弟视图 `A` 和 `B` 的窗口中，在视图 `B` 上将 `accessibilityElementsHidden` 设置为 `true` 会导致 VoiceOver 忽略视图 `B` 及其包含的所有元素。这类似于 Android 属性 `importantForAccessibility="no-hide-descendants"`。

### `aria-valuemax`

表示基于范围的组件（如滑块和进度条）的最大值。

### `aria-valuemin`

表示基于范围的组件（如滑块和进度条）的最小值。

### `aria-valuenow`

表示基于范围的组件（如滑块和进度条）的当前值。

### `aria-valuetext`

表示组件的文本描述。

### `aria-busy`

指示元素正在被修改，辅助技术可能需要等待更改完成后再通知用户。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

### `aria-checked`

指示可选元素的状态。此字段可以采用布尔值或 "mixed" 字符串表示混合选择框。

| 类型             | 默认值 |
| ---------------- | ------ |
| boolean, 'mixed' | false  |

### `aria-disabled`

指示元素虽然可感知但已被禁用，因此不可编辑或无法操作。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

### `aria-expanded`

指示可展开元素当前是否已展开或折叠。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

### `aria-hidden`

指示元素是否对辅助技术隐藏。

例如，在包含兄弟视图 `A` 和 `B` 的窗口中，在视图 `B` 上将 `aria-hidden` 设置为 `true` 会导致 VoiceOver 忽略视图 `B` 及其子元素。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

### `aria-label`

定义一个字符串值，可用于为元素命名。

| 类型   |
| ------ |
| string |

### `aria-labelledby` <div className="label android">Android</div>

标识为其所应用元素提供标签的元素。`aria-labelledby` 的值应该与相关元素的 [`nativeID`](view.md#nativeid) 匹配：

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput aria-label="input" aria-labelledby="formLabel" />
</View>
```

| 类型   |
| ------ |
| string |

### `aria-live` <div className="label android">Android</div>

指示元素将会被更新，并描述用户代理、辅助技术和用户可以从实时区域获得的更新类型。

- **off** 辅助服务不应该提醒用户当前视图的变化。
- **polite** 辅助服务应该提醒用户当前视图的变化。
- **assertive** 辅助服务应该立即打断当前的语音会话，提醒用户当前视图的变化。

| 类型                                     | 默认值  |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div className="label ios">iOS</div>

一个布尔值，指示 VoiceOver 是否应忽略接收者的同级视图中的元素。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

### `aria-selected`

指示可选择元素当前是否已选中。

| 类型    |
| ------- |
| boolean |

### `experimental_accessibilityOrder`

<ExperimentalAPIWarning />

:::note
为简洁起见，以下示例中省略了布局（layout），即使布局决定了默认的焦点顺序。假设文档顺序与布局顺序一致。
:::

`experimental_accessibilityOrder` 允许你定义辅助技术聚焦后代组件的顺序。它是一个 [`nativeIDs`](view.md#nativeid) 数组，设置在你要控制顺序的组件上。例如：

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
</View>
```

辅助技术将先聚焦 `nativeID` 为 `B` 的 View，然后是 `C`，最后是 `A`。

`experimental_accessibilityOrder` 不会"开启"它引用的组件的无障碍功能，这仍然需要单独设置。因此，如果我们像下面这样移除 `C` 上的 `accessible={true}`：

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C"/>
</View>
```

那么新的顺序将是 `B` 然后 `A`，即使 `C` 仍然在 `experimental_accessibilityOrder` 中。

但是，`experimental_accessibilityOrder` 会"关闭"它未引用的组件的无障碍功能。

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
  <View accessible={true} nativeID="D"/>
</View>
```

上面示例的顺序将是 `B`、`C`、`A`。`D` 永远不会获得焦点。从这个意义上说，`experimental_accessibilityOrder` 是_穷举的_。

在 `experimental_accessibilityOrder` 中包含非无障碍组件仍然有合理的理由。考虑以下情况：

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

焦点顺序将是 `B`、`D`、`E`、`F`、`A`。即使 `D`、`E` 和 `F` 没有直接在 `experimental_accessibilityOrder` 中被引用，但 `C` 被直接引用了。在这种情况下，`C` 是一个_无障碍容器_——它包含无障碍元素，但它本身不是无障碍元素。如果无障碍容器在 `experimental_accessibilityOrder` 中被引用，则其包含的元素将按默认顺序排列。从这个意义上说，`experimental_accessibilityOrder` 是_可嵌套的_。

`experimental_accessibilityOrder` 也可以引用另一个设置了 `experimental_accessibilityOrder` 的组件：

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

焦点顺序将是 `B`、`F`、`E`、`D`、`A`。

一个组件不能同时是无障碍容器和无障碍元素（`accessible={true}`）。因此，如果我们有：

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

焦点顺序将是 `B`、`C`、`A`。`D`、`E` 和 `F` 不再在容器中，因此 `experimental_accessibilityOrder` 的穷举特性意味着它们将被排除。

### `importantForAccessibility` <div className="label android">Android</div>

如果有两个 UI 组件同时层叠覆盖在父视图之上，那么默认的无障碍功能的焦点位置就可能难以预料。`importantForAccessibility` 属性解决了这一问题，它可以控制某个视图是否触发无障碍功能事件，以及是否将其报告给辅助服务。具体值可以设置为 `auto`、`yes`、`no` 和 `no-hide-descendants`（最后一个值会强制辅助服务忽略当前组件及其所有子组件）。

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

上面这个例子里，`yellow` 布局及其后代对于 TalkBack 和其他所有辅助服务来说是完全不可见的。这样我们就可以把两个视图覆盖到同一个父容器上，而不用担心影响 TalkBack 服务。

### `onAccessibilityEscape` <div className="label ios">iOS</div>

将此属性分配给一个自定义函数，该函数将在用户执行"逃脱"手势时被调用，这是一个双指 Z 形手势。逃脱函数应该在用户界面中向上或向后层次移动。这可能意味着在导航层次中向上移动或返回，或者关闭模态界面。如果所选元素没有 `onAccessibilityEscape` 函数，系统将尝试沿视图层次向上遍历，直到找到一个具有此函数的视图，或者发出提示表示无法找到。

### `onAccessibilityTap` <div className="label ios">iOS</div>

使用这一属性来绑定一个自定义的事件处理函数，这一函数会在当用户双击某个已经选中的无障碍元素时调用。

### `onMagicTap` <div className="label ios">iOS</div>

使用这一属性来绑定一个自定义的事件处理函数，这一函数会在当用户执行"magic tap"操作（即使用两个指头来双击）时调用。magic tap 的事件处理函数应该做与当前组件相关性最高的操作，比如在电话应用中，magic tap 的操作就应该接通电话，或是挂断已经接通的电话。如果当前选中的元素并没有 `onMagicTap` 函数，则系统会自动遍历视图层，直到找到一个可以响应此操作的。

### `role`

`role` 用于告知辅助技术用户组件的用途，它的优先级高于 [`accessibilityRole`](accessibility#accessibilityrole) 属性。

`role` 可以是以下之一：

- **alert** 当元素包含重要文本以供用户查看时使用。
- **button** 具有按钮特性。
- **checkbox** 当元素表示可选中、未选中或混合选中状态的复选框时使用。
- **combobox** 当元素表示组合框，允许用户在多个选项中进行选择时使用。
- **grid** 与 ScrollView、VirtualizedList、FlatList 或 SectionList 一起使用以表示网格。在 Android 的 GridView 上添加进入/离开网格的播报。
- **heading** 作为内容区域的头部（比如导航栏的标题）。
- **img** 具有图片特性。可以与按钮或链接等组合使用。
- **link** 具有链接特性。
- **list** 用于标识项目列表。
- **listitem** 用于标识列表中的一个项目。
- **menu** 当组件是一组选择菜单时使用。
- **menubar** 当组件是多个菜单的容器时使用。
- **menuitem** 用于表示菜单中的一个项目。
- **none** 无特性元素。
- **presentation** 无特性元素。
- **progressbar** 用于表示任务进度的组件。
- **radio** 用于表示单选按钮。
- **radiogroup** 用于表示一组单选按钮。
- **scrollbar** 用于表示滚动条。
- **searchbox** 用作搜索框的文本框。
- **slider** 元素具有可调整的特性（比如一个滑块）。
- **spinbutton** 用于表示打开选项列表的按钮。
- **summary** 在 App 冷启动时提供当前的简要总结信息的元素。
- **switch** 用于表示可切换开关。
- **tab** 用于表示选项卡。
- **tablist** 用于表示选项卡列表。
- **timer** 用于表示计时器。
- **toolbar** 用于表示工具栏（操作按钮或组件的容器）。

## 无障碍操作 {#accessibility-actions}

辅助功能操作允许辅助技术以编程方式调用组件的操作。为了支持辅助功能操作，组件必须执行两项任务：

- 通过 `accessibilityActions` 属性定义其支持的操作列表。
- 实现一个 `onAccessibilityAction` 函数来处理操作请求。

`accessibilityActions` 属性应包含操作对象的列表。每个操作对象应包含以下字段：

| 名称  | 类型   | 必需 |
| ----- | ------ | ---- |
| name  | string | 是   |
| label | string | 否   |

操作可以表示标准操作（如点击按钮或调整滑块），或特定于给定组件的自定义操作（例如删除邮件消息）。`name` 字段对于标准操作和自定义操作都是必需的，但对于标准操作，`label` 是可选的。

在添加对标准操作的支持时，`name` 必须是以下之一：

- `'magicTap'` - 仅适用于 iOS - 当 VoiceOver 焦点位于组件上或内部时，用户用两个手指双击。
- `'escape'` - 仅适用于 iOS - 当 VoiceOver 焦点位于组件上或内部时，用户执行双指刷动手势（左，右，左）。
- `'activate'` - 激活组件。无论是否使用辅助技术，都应执行相同的操作。当屏幕阅读器用户双击组件时触发。
- `'increment'` - 增加可调整组件的值。在 iOS 上，当组件具有 `'adjustable'` 角色并且用户将焦点放在组件上并向上滑动时，VoiceOver 会生成此操作。在 Android 上，当用户将无障碍焦点放在组件上并按音量增加按钮时，TalkBack 会生成此操作。
- `'decrement'` - 减少可调整组件的值。在 iOS 上，当组件具有 `'adjustable'` 角色并且用户将焦点放在组件上并向下滑动时，VoiceOver 会生成此操作。在 Android 上，当用户将无障碍焦点放在组件上并按音量减小按钮时，TalkBack 会生成此操作。
- `'longpress'` - 仅适用于 Android - 当用户将无障碍焦点放在组件上，然后双击并长按屏幕时生成此操作。无论是否使用辅助技术，都应执行相同的操作。
- `'expand'` - 仅适用于 Android - 此操作"展开"组件，使 TalkBack 播报"已展开"提示。
- `'collapse'` - 仅适用于 Android - 此操作"折叠"组件，使 TalkBack 播报"已折叠"提示。

`label` 字段对于标准操作是可选的，通常不被辅助技术使用。对于自定义操作，它是一个包含要呈现给用户的操作描述的本地化字符串。

要处理操作请求，组件必须实现一个 `onAccessibilityAction` 函数。此函数的唯一参数是包含要执行的操作名称的事件。以下示例来自 RNTester，展示了如何创建一个定义和处理多个自定义操作的组件。

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

## 查看读屏应用是否已开启

`AccessibilityInfo` 可以用于查询读屏应用是否已开启。请查看 [AccessibilityInfo 的文档](accessibilityinfo)来了解具体用法。

## 发送无障碍功能的相关事件 <div className="label android">Android</div>

有时候需要在 UI 组件上主动触发一个无障碍功能的事件（比如当某个自定义的视图出现在屏幕上或者需要将无障碍焦点设置到某个视图上）。为此 UIManager 模块提供了一个 `sendAccessibilityEvent` 方法。它接受两个参数：view 标签和事件类型。支持的事件类型有 `typeWindowStateChanged`、`typeViewFocused` 和 `typeViewClicked`。

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

要启用 TalkBack，请转到您的 Android 设备或模拟器上的设置应用程序。点击"辅助功能"，然后选择 TalkBack。切换"使用服务"开关以启用或禁用它。

默认情况下，Android 模拟器未安装 TalkBack。你可以通过 Google Play 商店在模拟器上安装 TalkBack。请确保选择安装了 Google Play 商店的模拟器，这些可以在 Android Studio 中找到。

你可以使用音量键快捷方式来切换 TalkBack。要启用音量键快捷方式，请转到设置应用程序，然后选择"辅助功能"。在顶部，打开音量键快捷方式。

要使用音量键快捷方式，请同时按住两个音量键 3 秒，以启动辅助工具。

另外，如果你愿意，你可以通过命令行来切换 TalkBack：

```shell
# disable
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService

# enable
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
```

## 测试 VoiceOver <div className="label ios">iOS</div>

要开启 VoiceOver 功能，先打开 iOS 或 iPadOS 设备的设置选项。点击"通用"，然后是"辅助功能"。你会看到很多为残障人群使用手机减少障碍的工具，包括 VoiceOver。要启用 VoiceOver，点击"视觉"下的 VoiceOver，然后切换顶部的开关。

在辅助功能设置的最底部，有一个"辅助功能快捷键"。开启之后可以通过点击三次 Home 按钮来快速关闭或打开 VoiceOver 工具。

VoiceOver 在模拟器上不可用，但你可以使用 Xcode 的 Accessibility Inspector，通过 macOS 的 VoiceOver 来检查应用。请注意，最好使用真机测试，因为 macOS 的 VoiceOver 可能会产生不同的体验。

## 更多资料

- [Making React Native Apps Accessible](https://engineering.fb.com/ios/making-react-native-apps-accessible/)
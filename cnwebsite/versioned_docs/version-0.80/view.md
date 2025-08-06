---
id: view
title: View
---

作为构建 UI 的最基础组件，`View` 是一个支持 [flexbox 布局](flexbox.md)、[样式](style.md)、[一些触摸处理](handling-touches.md)和[无障碍](accessibility.md)控制的容器。`View` 直接映射到 React Native 运行的任何平台上的原生视图等价物，无论是 `UIView`、`<div>`、`android.view` 等。

`View` 被设计为可以嵌套在其他视图内，并且可以有 0 到多个任何类型的子组件。

本例创建了一个 `View`，在一行中包裹了两个有颜色的方块和一个文本组件，并带有内边距。

```SnackPlayer name=View%20Example
import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ViewBoxesWithColorAndText = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{height: 100, flexDirection: 'row'}}>
        <View style={{backgroundColor: 'blue', flex: 0.2}} />
        <View style={{backgroundColor: 'red', flex: 0.4}} />
        <Text>Hello World!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ViewBoxesWithColorAndText;
```

> `View` 被设计为与 [`StyleSheet`](style.md) 一起使用以获得清晰性和性能，尽管也支持内联样式。

### 合成触摸事件

对于 `View` 响应者 props（例如 `onResponderMove`），传递给它们的合成触摸事件采用 [PressEvent](pressevent) 的形式。

---

# 文档

## Props

---

### `accessibilityActions`

无障碍操作允许辅助技术以编程方式调用组件的操作。`accessibilityActions` 属性应包含操作对象列表。每个操作对象应包含字段 name 和 label。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessibility-actions)。

| 类型  |
| ----- |
| array |

---

### `accessibilityElementsHidden` <div class="label ios">iOS</div>

一个值，指示此无障碍元素中包含的无障碍元素是否隐藏。默认值为 `false`。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessibilityelementshidden-ios)。

| 类型 |
| ---- |
| bool |

---

### `accessibilityHint`

无障碍提示帮助用户了解当结果从无障碍标签中不清楚时，他们对无障碍元素执行操作时会发生什么。

| 类型   |
| ------ |
| string |

---

### `accessibilityLanguage` <div class="label ios">iOS</div>

一个值，指示当用户与元素交互时屏幕阅读器应使用哪种语言。它应遵循 [BCP 47 规范](https://www.rfc-editor.org/info/bcp47)。

有关更多信息，请参阅 [iOS `accessibilityLanguage` 文档](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage)。

| 类型   |
| ------ |
| string |

---

### `accessibilityIgnoresInvertColors` <div class="label ios">iOS</div>

一个值，指示当开启颜色反转时，此视图是否应该被反转。值为 `true` 会告诉视图即使开启了颜色反转也不要被反转。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessibilityignoresinvertcolors)。

| 类型 |
| ---- |
| bool |

---

### `accessibilityLabel`

覆盖屏幕阅读器在用户与元素交互时读取的文本。默认情况下，标签是通过遍历所有子组件并累积所有用空格分隔的 `Text` 节点来构建的。

| 类型   |
| ------ |
| string |

---

### `accessibilityLiveRegion` <div class="label android">Android</div>

向无障碍服务指示当此视图发生更改时是否应通知用户。仅适用于 Android API >= 19。可能的值：

- `'none'` - 无障碍服务不应宣布对此视图的更改。
- `'polite'`- 无障碍服务应宣布对此视图的更改。
- `'assertive'` - 无障碍服务应中断正在进行的语音以立即宣布对此视图的更改。

参考 [Android `View` 文档](https://developer.android.com/reference/android/view/View.html#attr_android:accessibilityLiveRegion)。

| 类型                                |
| ----------------------------------- |
| enum('none', 'polite', 'assertive') |

---

### `accessibilityRole`

`accessibilityRole` 向辅助技术的用户传达组件的用途。

`accessibilityRole` 可以是以下之一：

- `'none'` - 当元素没有角色时使用。
- `'button'` - 当元素应被视为按钮时使用。
- `'link'` - 当元素应被视为链接时使用。
- `'search'` - 当文本字段元素也应被视为搜索字段时使用。
- `'image'` - 当元素应被视为图像时使用。例如，可以与按钮或链接结合使用。
- `'keyboardkey'` - 当元素充当键盘键时使用。
- `'text'` - 当元素应被视为无法更改的静态文本时使用。
- `'adjustable'` - 当元素可以"调整"时使用（例如滑块）。
- `'imagebutton'` - 当元素应被视为按钮并且也是图像时使用。
- `'header'` - 当元素充当内容部分的标题时使用（例如导航栏的标题）。
- `'summary'` - 当元素可用于在应用首次启动时提供应用中当前条件的快速摘要时使用。
- `'alert'` - 当元素包含要呈现给用户的重要文本时使用。
- `'checkbox'` - 当元素表示可以选中、取消选中或具有混合选中状态的复选框时使用。
- `'combobox'` - 当元素表示允许用户从多个选择中选择的组合框时使用。
- `'menu'` - 当组件是选择菜单时使用。
- `'menubar'` - 当组件是多个菜单的容器时使用。
- `'menuitem'` - 用于表示菜单中的项目。
- `'progressbar'` - 用于表示指示任务进度的组件。
- `'radio'` - 用于表示单选按钮。
- `'radiogroup'` - 用于表示一组单选按钮。
- `'scrollbar'` - 用于表示滚动条。
- `'spinbutton'` - 用于表示打开选择列表的按钮。
- `'switch'` - 用于表示可以打开和关闭的开关。
- `'tab'` - 用于表示选项卡。
- `'tablist'` - 用于表示选项卡列表。
- `'timer'` - 用于表示计时器。
- `'toolbar'` - 用于表示工具栏（操作按钮或组件的容器）。
- `'grid'` - 与 ScrollView、VirtualizedList、FlatList 或 SectionList 一起使用以表示网格。向 android GridView 添加进入/退出网格公告。

| 类型   |
| ------ |
| string |

---

### `accessibilityState`

向辅助技术用户描述组件的当前状态。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessibilitystate-ios-android)。

| 类型                                                                                             |
| ------------------------------------------------------------------------------------------------ |
| object: `{disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool}` |

---

### `accessibilityValue`

表示组件的当前值。它可以是组件值的文本描述，或者对于基于范围的组件（如滑块和进度条），它包含范围信息（最小值、当前值和最大值）。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessibilityvalue-ios-android)。

| 类型                                                            |
| --------------------------------------------------------------- |
| object: `{min: number, max: number, now: number, text: string}` |

---

### `accessibilityViewIsModal` <div class="label ios">iOS</div>

一个值，指示 VoiceOver 是否应忽略接收器同级视图中的元素。默认值为 `false`。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessibilityviewismodal-ios)。

| 类型 |
| ---- |
| bool |

---

### `accessible`

当为 `true` 时，表示该视图是无障碍元素，可被屏幕阅读器和硬件键盘等辅助技术发现。默认情况下，所有可触摸元素都是可访问的。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessible)。

---

### `aria-busy`

指示正在修改元素，辅助技术可能希望等到更改完成后再将更新通知用户。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-checked`

指示可选中元素的状态。此字段可以采用布尔值或"mixed"字符串来表示混合复选框。

| 类型             | 默认值 |
| ---------------- | ------ |
| boolean, 'mixed' | false  |

---

### `aria-disabled`

指示元素是可感知的但已禁用，因此它不可编辑或无法操作。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-expanded`

指示可展开元素当前是展开还是折叠。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-hidden`

指示此无障碍元素中包含的无障碍元素是否隐藏。

例如，在包含同级视图 `A` 和 `B` 的窗口中，在视图 `B` 上将 `aria-hidden` 设置为 `true` 会导致 VoiceOver 忽略视图 `B` 中的元素。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-label`

定义标记交互元素的字符串值。

| 类型   |
| ------ |
| string |

---

### `aria-labelledby` <div class="label android">Android</div>

标识标记应用它的元素的元素。`aria-labelledby` 的值应与相关元素的 [`nativeID`](view.md#nativeid) 匹配：

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput aria-label="input" aria-labelledby="formLabel" />
</View>
```

| 类型   |
| ------ |
| string |

---

### `aria-live` <div class="label android">Android</div>

指示将更新元素，并描述用户代理、辅助技术和用户可以从实时区域期望的更新类型。

- **off** 无障碍服务不应宣布对此视图的更改。
- **polite** 无障碍服务应宣布对此视图的更改。
- **assertive** 无障碍服务应中断正在进行的语音以立即宣布对此视图的更改。

| 类型                                     | 默认值  |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div class="label ios">iOS</div>

布尔值，指示 VoiceOver 是否应忽略接收器同级视图中的元素。优先于 [`accessibilityViewIsModal`](#accessibilityviewismodal-ios) prop。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | false  |

---

### `aria-selected`

指示可选择元素当前是否被选中。

| 类型    |
| ------- |
| boolean |

### `aria-valuemax`

表示基于范围的组件（如滑块和进度条）的最大值。优先于 `accessibilityValue` prop 中的 `max` 值。

| 类型   |
| ------ |
| number |

---

### `aria-valuemin`

表示基于范围的组件（如滑块和进度条）的最小值。优先于 `accessibilityValue` prop 中的 `min` 值。

| 类型   |
| ------ |
| number |

---

### `aria-valuenow`

表示基于范围的组件（如滑块和进度条）的当前值。优先于 `accessibilityValue` prop 中的 `now` 值。

| 类型   |
| ------ |
| number |

---

### `aria-valuetext`

表示组件的文本描述。优先于 `accessibilityValue` prop 中的 `text` 值。

| 类型   |
| ------ |
| string |

---

### `collapsable`

仅用于布局其子组件或不绘制任何内容的视图可能会作为优化自动从原生层次结构中删除。将此属性设置为 `false` 以禁用此优化并确保此 `View` 存在于原生视图层次结构中。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | true   |

---

### `collapsableChildren`

设置为 false 可防止视图的直接子组件从原生视图层次结构中删除，类似于在每个子组件上设置 `collapsable={false}` 的效果。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | true   |

---

### `focusable` <div class="label android">Android</div>

此 `View` 是否应该可以通过非触摸输入设备获得焦点，例如通过硬件键盘接收焦点。

| 类型    |
| ------- |
| boolean |

---

### `hitSlop`

这定义了触摸事件可以从视图开始的距离。典型的界面指南建议触摸目标至少为 30 - 40 点/密度独立像素。

例如，如果可触摸视图的高度为 20，则可以使用 `hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}` 将可触摸高度扩展到 40

> 触摸区域永远不会超出父视图边界，如果触摸命中两个重叠的视图，同级视图的 Z 索引始终优先。

| 类型                                                                 |
| -------------------------------------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` |

---

### `id`

用于从原生类定位此视图。优先于 `nativeID` prop。

> 这会禁用此视图的"仅布局视图删除"优化！

| 类型   |
| ------ |
| string |

---

### `importantForAccessibility` <div class="label android">Android</div>

控制视图对无障碍的重要性，即它是否触发无障碍事件以及是否报告给查询屏幕的无障碍服务。仅适用于 Android。

可能的值：

- `'auto'` - 系统确定视图对无障碍是否重要 - 默认值（推荐）。
- `'yes'` - 视图对无障碍很重要。
- `'no'` - 视图对无障碍不重要。
- `'no-hide-descendants'` - 视图对无障碍不重要，其任何后代视图也不重要。

参考 [Android `importantForAccessibility` 文档](https://developer.android.com/reference/android/R.attr.html#importantForAccessibility)。

| 类型                                             |
| ------------------------------------------------ |
| enum('auto', 'yes', 'no', 'no-hide-descendants') |

---

### `nativeID`

用于从原生类定位此视图。

> 这会禁用此视图的"仅布局视图删除"优化！

| 类型   |
| ------ |
| string |

---

### `needsOffscreenAlphaCompositing`

此 `View` 是否需要离屏渲染并与 alpha 合成以保持 100% 正确的颜色和混合行为。默认值（`false`）回退到使用应用于用于绘制每个元素的画笔的 alpha 来绘制组件及其子组件，而不是离屏渲染完整组件并使用 alpha 值将其合成回来。在您设置不透明度的 `View` 具有多个重叠元素（例如多个重叠的 `View` 或文本和背景）的情况下，此默认值可能是明显的和不希望的。

离屏渲染以保持正确的 alpha 行为极其昂贵且对非原生开发人员来说难以调试，这就是为什么默认情况下不打开它。如果您确实需要为动画启用此属性，请考虑将其与 renderToHardwareTextureAndroid 结合使用，如果视图**内容**是静态的（即每帧不需要重绘）。如果启用了该属性，此 View 将离屏渲染一次，保存在硬件纹理中，然后每帧使用 alpha 合成到屏幕上，而无需在 GPU 上切换渲染目标。

| 类型 |
| ---- |
| bool |

---

### `nextFocusDown` <div class="label android">Android</div>

指定用户向下导航时接收焦点的下一个视图。参见 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown)。

| 类型   |
| ------ |
| number |

---

### `nextFocusForward` <div class="label android">Android</div>

指定用户向前导航时接收焦点的下一个视图。参见 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward)。

| 类型   |
| ------ |
| number |

---

### `nextFocusLeft` <div class="label android">Android</div>

指定用户向左导航时接收焦点的下一个视图。参见 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft)。

| 类型   |
| ------ |
| number |

---

### `nextFocusRight` <div class="label android">Android</div>

指定用户向右导航时接收焦点的下一个视图。参见 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight)。

| 类型   |
| ------ |
| number |

---

### `nextFocusUp` <div class="label android">Android</div>

指定用户向上导航时接收焦点的下一个视图。参见 [Android 文档](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp)。

| 类型   |
| ------ |
| number |

---

### `onAccessibilityAction`

当用户执行无障碍操作时调用。此函数的唯一参数是包含要执行的操作名称的事件。

有关更多信息，请参阅[无障碍指南](accessibility.md#accessibility-actions)。

| 类型     |
| -------- |
| function |

---

### `onAccessibilityEscape` <div class="label ios">iOS</div>

当 `accessible` 为 `true` 时，系统将在用户执行转义手势时调用此函数。

| 类型     |
| -------- |
| function |

---

### `onAccessibilityTap` <div class="label ios">iOS</div>

当 `accessible` 为 true 时，系统将在用户执行无障碍点击手势时尝试调用此函数。

| 类型     |
| -------- |
| function |

---

### `onLayout`

在挂载和布局更改时调用。

一旦计算出布局，就会立即触发此事件，但在收到事件时，新布局可能尚未反映在屏幕上，特别是如果布局动画正在进行中。

| 类型                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onMagicTap` <div class="label ios">iOS</div>

当 `accessible` 为 `true` 时，系统将在用户执行魔术点击手势时调用此函数。

| 类型     |
| -------- |
| function |

---

### `onMoveShouldSetResponder`

此视图是否想要"声明"触摸响应性？当它不是响应者时，会为 `View` 上的每个触摸移动调用此方法。

| 类型                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onMoveShouldSetResponderCapture`

如果父 `View` 想要阻止子 `View` 在移动时成为响应者，它应该有这个返回 `true` 的处理程序。

| 类型                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onResponderGrant`

View 现在正在响应触摸事件。这是高亮显示并向用户显示正在发生的事情的时候。

在 Android 上，从此回调返回 true 以防止任何其他原生组件成为响应者，直到此响应者终止。

| 类型                                                              |
| ----------------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void ｜ boolean` |

---

### `onResponderMove`

用户正在移动他们的手指。

| 类型                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderReject`

另一个响应者已经处于活动状态，不会将其释放给请求成为响应者的 `View`。

| 类型                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderRelease`

在触摸结束时触发。

| 类型                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminate`

响应者已从 `View` 中移除。可能在调用 `onResponderTerminationRequest` 后被其他视图移除，或者可能被操作系统在不询问的情况下移除（例如，在 iOS 上发生控制中心/通知中心）

| 类型                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminationRequest`

其他一些 `View` 想要成为响应者并要求此 `View` 释放其响应者。返回 `true` 允许其释放。

| 类型                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onStartShouldSetResponder`

此视图是否想要在触摸开始时成为响应者？

| 类型                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onStartShouldSetResponderCapture`

如果父 `View` 想要阻止子 `View` 在触摸开始时成为响应者，它应该有这个返回 `true` 的处理程序。

| 类型                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `pointerEvents`

控制 `View` 是否可以成为触摸事件的目标。

- `'auto'`：View 可以成为触摸事件的目标。
- `'none'`：View 永远不是触摸事件的目标。
- `'box-none'`：View 永远不是触摸事件的目标，但其子视图可以是。它的行为就像视图在 CSS 中具有以下类：

```css
.box-none {
  pointer-events: none;
}
.box-none * {
  pointer-events: auto;
}
```

- `'box-only'`：视图可以是触摸事件的目标，但其子视图不能。它的行为就像视图在 CSS 中具有以下类：

```css
.box-only {
  pointer-events: auto;
}
.box-only * {
  pointer-events: none;
}
```

| 类型                                         |
| -------------------------------------------- |
| enum('box-none', 'none', 'box-only', 'auto') |

---

### `removeClippedSubviews`

这是由 `RCTView` 公开的保留性能属性，当有许多子视图时对滚动内容很有用，其中大多数都在屏幕外。为了使此属性有效，它必须应用于包含许多扩展到其边界之外的子视图的视图。子视图还必须具有 `overflow: hidden`，包含视图（或其超级视图之一）也应该如此。

| 类型 |
| ---- |
| bool |

---

### `renderToHardwareTextureAndroid` <div class="label android">Android</div>

此 `View` 是否应将自身（及其所有子项）渲染到 GPU 上的单个硬件纹理中。

在 Android 上，这对于仅修改不透明度、旋转、平移和/或缩放的动画和交互很有用：在这些情况下，视图不必重绘，显示列表不需要重新执行。纹理可以用不同的参数重复使用和重新合成。缺点是这可能会用完有限的视频内存，因此应在交互/动画结束时将此 prop 设置回 false。

| 类型 |
| ---- |
| bool |

---

### `role`

`role` 向辅助技术用户传达组件的用途。优先于 [`accessibilityRole`](view#accessibilityrole) prop。

| 类型                       |
| -------------------------- |
| [Role](accessibility#role) |

---

### `shouldRasterizeIOS` <div class="label ios">iOS</div>

此 `View` 是否应在合成之前呈现为位图。

在 iOS 上，这对于不修改此组件尺寸或其子组件的动画和交互很有用；例如，在平移静态视图的位置时，光栅化允许渲染器重用静态视图的缓存位图并在每帧期间快速合成它。

光栅化会产生离屏绘制过程，位图会消耗内存。使用此属性时请测试和测量。

| 类型 |
| ---- |
| bool |

---

### `style`

| 类型                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `tabIndex` <div class="label android">Android</div>

此 `View` 是否应该可以通过非触摸输入设备获得焦点，例如通过硬件键盘接收焦点。
支持以下值：

- `0` - View 可获得焦点
- `-1` - View 不可获得焦点

| 类型        |
| ----------- |
| enum(0, -1) |

---

### `testID`

用于在端到端测试中定位此视图。

> 这会禁用此视图的"仅布局视图删除"优化！

| 类型   |
| ------ |
| string |

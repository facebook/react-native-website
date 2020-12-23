---
id: version-0.59-view
title: View
original_id: view
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(91.59%), [yahoo.007](https://github.com/search?q=yahoo.007%40163.com+in%3Aemail&type=Users)(8.41%)

作为创建 UI 时最基础的组件，View 是一个支持 Flexbox 布局、样式、一些触摸处理、和一些无障碍功能的容器，并且它可以放到其它的视图里，也可以有任意多个任意类型的子视图。不论在什么平台上，View 都会直接对应一个平台的原生视图，无论它是 UIView、div还是 android.view.View。下面的例子创建了一个 View，包含了两个有颜色的方块和一个自定义的组件，并且设置了一个内边距：

```jsx
class ViewColoredBoxesWithText extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20
        }}
      >
        <View style={{ backgroundColor: "blue", flex: 0.3 }} />
        <View style={{ backgroundColor: "red", flex: 0.5 }} />
        <Text>Hello World!</Text>
      </View>
    );
  }
}
```

> View 的设计初衷是和 StyleSheet 搭配使用，这样可以使代码更清晰并且获得更高的性能。尽管内联样式也同样可以使用。

### 合成触摸事件

用于 `View` 响应属性 (例如, `onResponderMove`), 合成触摸事件采用以下的格式:

* `nativeEvent`
  * `changedTouches` - 从上一次事件以来的触摸事件数组。
  * `identifier` - 触摸事件的 ID。
  * `locationX` - 触摸事件相对元素位置的 X 坐标。
  * `locationY` - 触摸事件相对元素位置的 Y 坐标。
  * `pageX` - 触摸事件相对根元素位置的 X 坐标。
  * `pageY` - 触摸事件相对根元素位置的 Y 坐标。
  * `target` - 接收触摸事件的元素 ID.
  * `timestamp` - 触摸事件的时间标记，用来计算速度.
  * `touches` - 屏幕上所有当前触摸事件的数组.

### 查看 Props

* [`onStartShouldSetResponder`](view.md#onstartshouldsetresponder)
* [`accessibilityLabel`](view.md#accessibilitylabel)
* [`accessibilityHint`](view.md#accessibilityhint)
* [`hitSlop`](view.md#hitslop)
* [`nativeID`](view.md#nativeid)
* [`onAccessibilityTap`](view.md#onaccessibilitytap)
* [`onLayout`](view.md#onlayout)
* [`onMagicTap`](view.md#onmagictap)
* [`onAccessibilityEscape`](view.md#onaccessibilityescape)
* [`onMoveShouldSetResponder`](view.md#onmoveshouldsetresponder)
* [`onMoveShouldSetResponderCapture`](view.md#onmoveshouldsetrespondercapture)
* [`onResponderGrant`](view.md#onrespondergrant)
* [`onResponderMove`](view.md#onrespondermove)
* [`onResponderReject`](view.md#onresponderreject)
* [`onResponderRelease`](view.md#onresponderrelease)
* [`onResponderTerminate`](view.md#onresponderterminate)
* [`onResponderTerminationRequest`](view.md#onresponderterminationrequest)
* [`accessible`](view.md#accessible)
* [`onStartShouldSetResponderCapture`](view.md#onstartshouldsetrespondercapture)
* [`pointerEvents`](view.md#pointerevents)
* [`removeClippedSubviews`](view.md#removeclippedsubviews)
* [`style`](view.md#style)
* [`testID`](view.md#testid)
* [`accessibilityLiveRegion`](view.md#accessibilityliveregion)
* [`collapsable`](view.md#collapsable)
* [`importantForAccessibility`](view.md#importantforaccessibility)
* [`needsOffscreenAlphaCompositing`](view.md#needsoffscreenalphacompositing)
* [`renderToHardwareTextureAndroid`](view.md#rendertohardwaretextureandroid)
* [`accessibilityRole`](view.md#accessibilityrole)
* [`accessibilityStates`](view.md#accessibilitystates)
* [`accessibilityViewIsModal`](view.md#accessibilityviewismodal)
* [`accessibilityElementsHidden`](view.md#accessibilityElementsHidden)
* [`accessibilityIgnoresInvertColors`](view.md#accessibilityIgnoresInvertColors)
* [`shouldRasterizeIOS`](view.md#shouldrasterizeios)

---

# 文档

## Props

### `onStartShouldSetResponder`

设置这个视图是否要响应 touch start 事件。

View.props.onStartShouldSetResponder: (event) => [true | false], 其中 event 是一个合成触摸事件。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `accessibilityHint`

An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not obvious from the accessibility label.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `accessibilityLabel`

设置当用户与此元素交互时，“读屏器”（对视力障碍人士的辅助功能）阅读的文字。默认情况下，这个文字会通过遍历所有的子元素并累加所有的文本标签来构建。

| 类型 | 必填 |
| ---- | ---- |
| node | 否   |

---


### `hitSlop`

定义触摸事件在距离视图多远以内时可以触发的。典型的接口规范建议触摸目标至少要 30-40 点/密度-独立像素。

例如，一个可触摸的视图有 20 单位高，那么设置`hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}`则可触摸高度会扩展到 40 单位。

> 触摸范围不会扩展到父视图之外，另外如果触摸到两个重叠的视图，Z-index 高的元素会优先。

| 类型                                                               | 必填 |
| ------------------------------------------------------------------ | ---- |
| object: {top: number, left: number, bottom: number, right: number} | 否   |

---

### `nativeID`

用来从原生类定位这个视图

> 这个设置关闭了视图的'layout-only view removal'优化

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `onAccessibilityTap`

当 accessible 为 true 时，如果用户对一个已选中的无障碍元素做了一个双击手势时，系统会调用此函数。（译注：此事件是针对残障人士，并非是一个普通的点击事件。如果要为 View 添加普通点击事件，请直接使用 Touchable 系列组件替代 View，然后添加 onPress 函数）。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLayout`

当组件挂载或者布局变化的时候调用，参数为：:

`{nativeEvent: { layout: {x, y, width, height}}}`

这个事件会在布局计算完成后立即调用一次，不过收到此事件时新的布局可能还没有在屏幕上呈现，尤其是一个布局动画正在进行中的时候。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onMagicTap`

当 accessible 为 true 时，如果用户做了一个双指轻触(Magic tap)手势，系统会调用此函数。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onAccessibilityEscape`

When `accessible` is `true`, the system will invoke this function when the user performs the escape gesture.

| 类型     | 必填 |
| -------- | ---- |
| function | No   |

---

### `onMoveShouldSetResponder`

这个视图想要“认领”这个 touch move 事件吗？每当有 touch move 事件在这个视图中发生，并且这个视图没有被设置为这个 touch move 的响应时，这个函数就会被调用。

`View.props.onMoveShouldSetResponder: (event) => [true | false]`, 其中 event 是一个合成触摸事件。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onMoveShouldSetResponderCapture`

如果父视图想要阻止子视图响应 touch move 事件时，它就应该设置这个方法并返回 `true`
`View.props.onMoveShouldSetResponderCapture: (event) => [true | false]`, 其中 event 是一个合成触摸事件。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onResponderGrant`

这个视图开始响应触摸事件。此时需要高亮告诉用户正在响应。（译者注：对于大部分的触摸处理，你只需要用 TouchableHighlight 或 TouchableOpacity 包装你的组件。阅读 Touchable.js。）

`View.props.onResponderGrant: (event) => {}`,其中 event 是一个合成触摸事件。
| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onResponderMove`

当用户正在屏幕上移动手指时调用这个函数。

`View.props.onResponderMove: (event) => {}`, 其中 event 是一个合成触摸事件。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onResponderReject`

有一个响应器正处于活跃状态，并且不会向另一个要求响应这个事件的视图释放这个事件。

`View.props.onResponderReject: (event) => {}`, 其中 event 是一个合成触摸事件。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onResponderRelease`

在整个触摸事件结束时调用这个函数。

`View.props.onResponderRelease: (event) => {}`, 其中 event 是一个合成触摸事件。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onResponderTerminate`

响应被从这个视图上“劫走”了。可能是在调用了 onResponderTerminationRequest 之后，被另一个视图“劫走”了（见 onresponderterminationrequest), 也可能是由于 OS 无条件终止了响应（比如说被 iOS 上的控制中心／消息中心）

`View.props.onResponderTerminate: (event) => {}`, 其中 event 是一个合成触摸事件。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onResponderTerminationRequest`

其他某个视图想要成为事件的响应者，并要求这个视图放弃对事件的响应时，就会调用这个函数。如果允许释放响应，就返回`true`。

`View.props.onResponderTerminationRequest: (event) => {}`, 其中 event 是一个合成触摸事件。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `accessible`

当此属性为 true 时，表示此视图是一个启用了无障碍功能的元素。默认情况下，所有可触摸操作的元素都是无障碍功能元素。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `onStartShouldSetResponderCapture`

如果父视图想要阻止子视图响应 touch start 事件，它就应该设置这个方法并返回 true。

`View.props.onStartShouldSetResponderCapture: (event) => [true | false]`, 其中 event 是一个合成触摸事件。
| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `pointerEvents`

用于控制当前视图是否可以作为触控事件的目标。

* auto：视图可以作为触控事件的目标。
* none：视图不能作为触控事件的目标。
* box-none：视图自身不能作为触控事件的目标，但其子视图可以。类似于你在 CSS 中这样设置:

```
.box-none {
     pointer-events: none;
}
.box-none * {
     pointer-events: all;
}
```

* `'box-only'`:视图自身可以作为触控事件的目标，但其子视图不能。类似于你在 CSS 中这样设置:

```
.box-only {
     pointer-events: all;
}
.box-only * {
     pointer-events: none;
}
```

> 因为`pointerEvents` 不影响布局和外观，我们选择不将`pointerEvents`放到`style`中。不管如何，在某些平台，我们需要实现一个`className`类。是否使用`style`是一个平台的实现细节。

| 类型                                         | 必填 |
| -------------------------------------------- | ---- |
| enum('box-none', 'none', 'box-only', 'auto') | 否   |

---

### `removeClippedSubviews`

这是一个特殊的性能相关的属性，由 RCTView 导出。在制作滑动控件时，如果控件有很多不在屏幕内的子视图，会非常有用。

要让此属性生效，首先要求视图有很多超出范围的子视图，并且子视图和容器视图（或它的某个祖先视图）都应该有样式 overflow: hidden。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `style`

| 类型                               | 必填 |
| ---------------------------------- | ---- |
| [view styles](view-style-props.md) | 否   |

---

### `testID`

用来在端到端测试中定位这个视图。

> 这个设置关闭了视图的'layout-only view removal'优化。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `accessibilityLiveRegion`

告知无障碍服务当此视图更新时，是否要通知用户。只对 Android API >= 19 的设备有效。可用的值为:

* `'none'` - 无障碍服务不应该通知.
* `'polite'`- 无障碍服务应该通知.
* `'assertive'` - 无障碍服务应该打断当前的播报然立即通知用户.

可以阅读[Android `View` docs](http://developer.android.com/reference/android/view/View.html#attr_android:accessibilityLiveRegion) 了解更多信息。

| 类型                                | 必填 | 平台    |
| ----------------------------------- | ---- | ------- |
| enum('none', 'polite', 'assertive') | 否   | Android |

---

### `collapsable`

如果一个 View 只用于布局它的子组件，则它可能会为了优化而从原生布局树中移除。 把此属性设为 false 可以禁用这个优化，以确保对应视图在原生结构中存在。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `importantForAccessibility`

控制一个视图在无障碍功能中有多重要：它是否产生一个辅助功能事件，以及它是否能被请求屏幕内容的无障碍服务知晓。只对 Android 平台生效。

可用的值:

* `'auto'` - 系统来决定这个视图对于辅助功能是否重要 - 默认(推荐)。
* `'yes'` - 这个视图对于辅助功能而言重要。
* `'no'` - 这个视图对辅助功能不重要。
* `'no-hide-descendants'` - 这个视图，以及所有的后代视图，都对于辅助功能不重要。

了解更多信息，可以阅读 [Android `importantForAccessibility` docs](http://developer.android.com/reference/android/R.attr.html#importantForAccessibility)。

| 类型                                             | 必填 | 平台    |
| ------------------------------------------------ | ---- | ------- |
| enum('auto', 'yes', 'no', 'no-hide-descendants') | 否   | Android |

---

### `needsOffscreenAlphaCompositing`

决定这个视图是否要先离屏渲染再进行半透明度处理，来确保颜色和混合效果正确。默认值(false)会在渲染组件和它的所有子节点的时候直接应用透明通道，而不会先离屏渲染整个组件再将它附加一个透明通道后渲染到屏幕上。有时候当你给视图设置了一个透明度，且其中有较多元素层叠在一起的时候，默认的设置就会导致看起来不太正常（会比正常显得更加不透明）。

为了正确的透明表现而进行离屏渲染会带来极大的开销，而且对于非原生开发者来说很难调试。这就是为啥它被默认关闭。如果你需要在一个动画中启用这个属性，考虑与 renderToHardwareTextureAndroid 组合使用，前提是视图的内容不会发生变化（即：它不需要每帧重绘一次）。如果开启了 renderToHardwareTextureAndroid，则视图只会离屏渲染一次之后保存为一个硬件纹理，然后以正确的透明度绘制到屏幕上，这样就不会导致 GPU 频繁切换渲染目标（GPU 切换渲染目标会带来极大的开销）。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `renderToHardwareTextureAndroid`

决定这个视图是否要把它自己（以及所有的子视图）渲染到一个 GPU 上的硬件纹理中。

在 Android 上，这对于只修改不透明度、旋转、位移、或缩放的动画和交互十分有用：在这些情况下，视图不必每次都重新绘制，显示列表也不需要重新执行。纹理可以被重用于不同的参数。负面作用是这会大量消耗显存，所以当交互/动画结束后应该把此属性设置回 false。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `accessibilityRole`

Tells the screen reader to treat the currently focused on element as having a specific role.

Possible values for `AccessibilityRole` is one of:

* `'none'` - The element has no role.
* `'button'` - The element should be treated as a button.
* `'link'` - The element should be treated as a link.
* `'header'` - The element is a header that divides content into sections.
* `'search'` - The element should be treated as a search field.
* `'image'` - The element should be treated as an image.
* `'key'` - The element should be treated like a keyboard key.
* `'text'` - The element should be treated as text.
* `'summary'` - The element provides app summary information.
* `'imagebutton'` - The element has the role of both an image and also a button.
* `'adjustable'` - The element allows adjustment over a range of values.

On iOS, these roles map to corresponding Accessibility Traits. Image button has the same functionality as if the trait was set to both 'image' and 'button'.
See the [Accessibility guide](accessibility.md#accessibilitytraits-ios) for more information.

On Android, these roles have similar functionality on TalkBack as adding Accessibility Traits does on Voiceover in iOS

| 类型              | 必填 |
| ----------------- | ---- |
| AccessibilityRole | 否   |

---

### `accessibilityStates`

Tells the screen reader to treat the currently focused on element as being in a specific state.

You can provide one state, no state, or both states. The states must be passed in through an array.
Ex: ['selected'] or ['selected', 'disabled']

Possible values for `AccessibilityStates` are:
* `'selected'` - The element is in a selcted state.
* `'disabled'` - The element is in a disabled state.

| 类型                        | 必填 |
| --------------------------- | ---- |
| array of AccessibilitStates | 否   |

---

### `accessibilityViewIsModal`

指示语音辅助是否应该忽略视图中接收者的兄弟元素。默认为`false`.

阅读[Accessibility guide](accessibility.md#accessibilitytraits-ios) 获取更多信息。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `accessibilityElementsHidden`

指示该无障碍元素中包含的无障碍元素是否被隐藏。默认为`false`.

阅读[Accessibility guide](accessibility.md#accessibilityelementshidden-ios)获取更多信息。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `accessibilityIgnoresInvertColors`

A value indicating this view should or should not be inverted when color inversion is turned on. A value of `true` will tell the view to not be inverted even if color inversion is turned on.

See the [Accessibility guide](accessibility.md#accessibilityignoresinvertcolors) for more information.

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `shouldRasterizeIOS`

决定这个视图是否需要在被混合之前绘制到一个位图上。

在 iOS 上，这对于不会修改组件和子视图尺寸的动画和交互十分有用。举例来说，当我们移动一个静态视图的位置的时候，预渲染允许渲染器重用一个缓存了静态视图的位图，并快速合成。

预渲染会产生一个离屏的渲染过程，并且位图会消耗内存。所以使用此属性需要进行充分的测试和评估。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

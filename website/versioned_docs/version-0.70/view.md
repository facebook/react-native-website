---
id: view
title: View
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

The most fundamental component for building a UI, `View` is a container that supports layout with [flexbox](flexbox.md), [style](style.md), [some touch handling](handling-touches.md), and [accessibility](accessibility.md) controls. `View` maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a `UIView`, `<div>`, `android.view`, etc.

`View` is designed to be nested inside other views and can have 0 to many children of any type.

This example creates a `View` that wraps two boxes with color and a text component in a row with padding.

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=View%20Function%20Component%20Example
import React from "react";
import { View, Text } from "react-native";

const ViewBoxesWithColorAndText = () => {
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
};

export default ViewBoxesWithColorAndText;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=View%20Class%20Component%20Example
import React, { Component } from "react";
import { View, Text } from "react-native";

class App extends Component {
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

export default App;
```

</TabItem>
</Tabs>

> `View`s are designed to be used with [`StyleSheet`](style.md) for clarity and performance, although inline styles are also supported.

### Synthetic Touch Events

For `View` responder props (e.g., `onResponderMove`), the synthetic touch event passed to them are in form of [PressEvent](pressevent).

---

# Reference

## Props

---

### `accessibilityActions`

Accessibility actions allow an assistive technology to programmatically invoke the actions of a component. The `accessibilityActions` property should contain a list of action objects. Each action object should contain the field name and label.

See the [Accessibility guide](accessibility.md#accessibility-actions) for more information.

| Type  |
| ----- |
| array |

---

### `accessibilityElementsHidden` <div class="label ios">iOS</div>

A value indicating whether the accessibility elements contained within this accessibility element are hidden. Default is `false`.

See the [Accessibility guide](accessibility.md#accessibilityelementshidden-ios) for more information.

| Type |
| ---- |
| bool |

---

### `accessibilityHint`

An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not clear from the accessibility label.

| Type   |
| ------ |
| string |

---

### `accessibilityLanguage` <div class="label ios">iOS</div>

A value indicating which language should be used by the screen reader when the user interacts with the element. It should follow the [BCP 47 specification](https://www.rfc-editor.org/info/bcp47).

See the [iOS `accessibilityLanguage` doc](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage) for more information.

| Type   |
| ------ |
| string |

---

### `accessibilityIgnoresInvertColors` <div class="label ios">iOS</div>

A value indicating this view should or should not be inverted when color inversion is turned on. A value of `true` will tell the view to not be inverted even if color inversion is turned on.

See the [Accessibility guide](accessibility.md#accessibilityignoresinvertcolors) for more information.

| Type |
| ---- |
| bool |

---

### `accessibilityLabel`

Overrides the text that's read by the screen reader when the user interacts with the element. By default, the label is constructed by traversing all the children and accumulating all the `Text` nodes separated by space.

| Type   |
| ------ |
| string |

---

### `accessibilityLiveRegion` <div class="label android">Android</div>

Indicates to accessibility services whether the user should be notified when this view changes. Works for Android API >= 19 only. Possible values:

- `'none'` - Accessibility services should not announce changes to this view.
- `'polite'`- Accessibility services should announce changes to this view.
- `'assertive'` - Accessibility services should interrupt ongoing speech to immediately announce changes to this view.

See the [Android `View` docs](http://developer.android.com/reference/android/view/View.html#attr_android:accessibilityLiveRegion) for reference.

| Type                                |
| ----------------------------------- |
| enum('none', 'polite', 'assertive') |

---

### `accessibilityRole`

`accessibilityRole` communicates the purpose of a component to the user of an assistive technology.

`accessibilityRole` can be one of the following:

- `'none'` - Used when the element has no role.
- `'button'` - Used when the element should be treated as a button.
- `'link'` - Used when the element should be treated as a link.
- `'search'` - Used when the text field element should also be treated as a search field.
- `'image'` - Used when the element should be treated as an image. Can be combined with button or link, for example.
- `'keyboardkey'` - Used when the element acts as a keyboard key.
- `'text'` - Used when the element should be treated as static text that cannot change.
- `'adjustable'` - Used when an element can be "adjusted" (e.g. a slider).
- `'imagebutton'` - Used when the element should be treated as a button and is also an image.
- `'header'` - Used when an element acts as a header for a content section (e.g. the title of a navigation bar).
- `'summary'` - Used when an element can be used to provide a quick summary of current conditions in the app when the app first launches.
- `'alert'` - Used when an element contains important text to be presented to the user.
- `'checkbox'` - Used when an element represents a checkbox which can be checked, unchecked, or have mixed checked state.
- `'combobox'` - Used when an element represents a combo box, which allows the user to select among several choices.
- `'menu'` - Used when the component is a menu of choices.
- `'menubar'` - Used when a component is a container of multiple menus.
- `'menuitem'` - Used to represent an item within a menu.
- `'progressbar'` - Used to represent a component which indicates progress of a task.
- `'radio'` - Used to represent a radio button.
- `'radiogroup'` - Used to represent a group of radio buttons.
- `'scrollbar'` - Used to represent a scroll bar.
- `'spinbutton'` - Used to represent a button which opens a list of choices.
- `'switch'` - Used to represent a switch which can be turned on and off.
- `'tab'` - Used to represent a tab.
- `'tablist'` - Used to represent a list of tabs.
- `'timer'` - Used to represent a timer.
- `'toolbar'` - Used to represent a tool bar (a container of action buttons or components).

| Type   |
| ------ |
| string |

---

### `accessibilityState`

Describes the current state of a component to the user of an assistive technology.

See the [Accessibility guide](accessibility.md#accessibilitystate-ios-android) for more information.

| Type                                                                                           |
| ---------------------------------------------------------------------------------------------- |
| object: {disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool} |

---

### `accessibilityValue`

Represents the current value of a component. It can be a textual description of a component's value, or for range-based components, such as sliders and progress bars, it contains range information (minimum, current, and maximum).

See the [Accessibility guide](accessibility.md#accessibilityvalue-ios-android) for more information.

| Type                                                          |
| ------------------------------------------------------------- |
| object: {min: number, max: number, now: number, text: string} |

---

### `accessibilityViewIsModal` <div class="label ios">iOS</div>

A value indicating whether VoiceOver should ignore the elements within views that are siblings of the receiver. Default is `false`.

See the [Accessibility guide](accessibility.md#accessibilityviewismodal-ios) for more information.

| Type |
| ---- |
| bool |

---

### `accessible`

When `true`, indicates that the view is an accessibility element. By default, all the touchable elements are accessible.

---

### `collapsable` <div class="label android">Android</div>

Views that are only used to layout their children or otherwise don't draw anything may be automatically removed from the native hierarchy as an optimization. Set this property to `false` to disable this optimization and ensure that this `View` exists in the native view hierarchy.

| Type |
| ---- |
| bool |

---

### `focusable` <div class="label android">Android</div>

Whether this `View` should be focusable with a non-touch input device, eg. receive focus with a hardware keyboard.

| Type    |
| ------- |
| boolean |

---

### `hitSlop`

This defines how far a touch event can start away from the view. Typical interface guidelines recommend touch targets that are at least 30 - 40 points/density-independent pixels.

For example, if a touchable view has a height of 20 the touchable height can be extended to 40 with `hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}`

> The touch area never extends past the parent view bounds and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.

| Type                                                               |
| ------------------------------------------------------------------ |
| object: {top: number, left: number, bottom: number, right: number} |

---

### `importantForAccessibility` <div class="label android">Android</div>

Controls how view is important for accessibility which is if it fires accessibility events and if it is reported to accessibility services that query the screen. Works for Android only.

Possible values:

- `'auto'` - The system determines whether the view is important for accessibility - default (recommended).
- `'yes'` - The view is important for accessibility.
- `'no'` - The view is not important for accessibility.
- `'no-hide-descendants'` - The view is not important for accessibility, nor are any of its descendant views.

See the [Android `importantForAccessibility` docs](http://developer.android.com/reference/android/R.attr.html#importantForAccessibility) for reference.

| Type                                             |
| ------------------------------------------------ |
| enum('auto', 'yes', 'no', 'no-hide-descendants') |

---

### `nativeID`

Used to locate this view from native classes.

> This disables the 'layout-only view removal' optimization for this view!

| Type   |
| ------ |
| string |

---

### `needsOffscreenAlphaCompositing`

Whether this `View` needs to rendered offscreen and composited with an alpha in order to preserve 100% correct colors and blending behavior. The default (`false`) falls back to drawing the component and its children with an alpha applied to the paint used to draw each element instead of rendering the full component offscreen and compositing it back with an alpha value. This default may be noticeable and undesired in the case where the `View` you are setting an opacity on has multiple overlapping elements (e.g. multiple overlapping `View`s, or text and a background).

Rendering offscreen to preserve correct alpha behavior is extremely expensive and hard to debug for non-native developers, which is why it is not turned on by default. If you do need to enable this property for an animation, consider combining it with renderToHardwareTextureAndroid if the view **contents** are static (i.e. it doesn't need to be redrawn each frame). If that property is enabled, this View will be rendered off-screen once, saved in a hardware texture, and then composited onto the screen with an alpha each frame without having to switch rendering targets on the GPU.

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div class="label android">Android</div>

Designates the next view to receive focus when the user navigates down. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div class="label android">Android</div>

Designates the next view to receive focus when the user navigates forward. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div class="label android">Android</div>

Designates the next view to receive focus when the user navigates left. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div class="label android">Android</div>

Designates the next view to receive focus when the user navigates right. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div class="label android">Android</div>

Designates the next view to receive focus when the user navigates up. See the [Android documentation](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp).

| Type   |
| ------ |
| number |

---

### `onAccessibilityAction`

Invoked when the user performs the accessibility actions. The only argument to this function is an event containing the name of the action to perform.

See the [Accessibility guide](accessibility.md#accessibility-actions) for more information.

| Type     |
| -------- |
| function |

---

### `onAccessibilityEscape` <div class="label ios">iOS</div>

When `accessible` is `true`, the system will invoke this function when the user performs the escape gesture.

| Type     |
| -------- |
| function |

---

### `onAccessibilityTap`

When `accessible` is true, the system will try to invoke this function when the user performs accessibility tap gesture.

| Type     |
| -------- |
| function |

---

### `onLayout`

Invoked on mount and on layout changes.

This event is fired immediately once the layout has been calculated, but the new layout may not yet be reflected on the screen at the time the event is received, especially if a layout animation is in progress.

| Type                                                  |
| ----------------------------------------------------- |
| ({ nativeEvent: [LayoutEvent](layoutevent) }) => void |

---

### `onMagicTap` <div class="label ios">iOS</div>

When `accessible` is `true`, the system will invoke this function when the user performs the magic tap gesture.

| Type     |
| -------- |
| function |

---

### `onMoveShouldSetResponder`

Does this view want to "claim" touch responsiveness? This is called for every touch move on the `View` when it is not the responder.

| Type                                                   |
| ------------------------------------------------------ |
| ({ nativeEvent: [PressEvent](pressevent) }) => boolean |

---

### `onMoveShouldSetResponderCapture`

If a parent `View` wants to prevent a child `View` from becoming responder on a move, it should have this handler which returns `true`.

| Type                                                   |
| ------------------------------------------------------ |
| ({ nativeEvent: [PressEvent](pressevent) }) => boolean |

---

### `onResponderGrant`

The View is now responding for touch events. This is the time to highlight and show the user what is happening.

| Type                                                |
| --------------------------------------------------- |
| ({ nativeEvent: [PressEvent](pressevent) }) => void |

---

### `onResponderMove`

The user is moving their finger.

| Type                                                |
| --------------------------------------------------- |
| ({ nativeEvent: [PressEvent](pressevent) }) => void |

---

### `onResponderReject`

Another responder is already active and will not release it to that `View` asking to be the responder.

| Type                                                |
| --------------------------------------------------- |
| ({ nativeEvent: [PressEvent](pressevent) }) => void |

---

### `onResponderRelease`

Fired at the end of the touch.

| Type                                                |
| --------------------------------------------------- |
| ({ nativeEvent: [PressEvent](pressevent) }) => void |

---

### `onResponderTerminate`

The responder has been taken from the `View`. Might be taken by other views after a call to `onResponderTerminationRequest`, or might be taken by the OS without asking (e.g., happens with control center/ notification center on iOS)

| Type                                                |
| --------------------------------------------------- |
| ({ nativeEvent: [PressEvent](pressevent) }) => void |

---

### `onResponderTerminationRequest`

Some other `View` wants to become responder and is asking this `View` to release its responder. Returning `true` allows its release.

| Type                                                |
| --------------------------------------------------- |
| ({ nativeEvent: [PressEvent](pressevent) }) => void |

---

### `onStartShouldSetResponder`

Does this view want to become responder on the start of a touch?

| Type                                                   |
| ------------------------------------------------------ |
| ({ nativeEvent: [PressEvent](pressevent) }) => boolean |

---

### `onStartShouldSetResponderCapture`

If a parent `View` wants to prevent a child `View` from becoming responder on a touch start, it should have this handler which returns `true`.

| Type                                                   |
| ------------------------------------------------------ |
| ({ nativeEvent: [PressEvent](pressevent) }) => boolean |

---

### `pointerEvents`

Controls whether the `View` can be the target of touch events.

- `'auto'`: The View can be the target of touch events.
- `'none'`: The View is never the target of touch events.
- `'box-none'`: The View is never the target of touch events but its subviews can be. It behaves like if the view had the following classes in CSS:

```
.box-none {
     pointer-events: none;
}
.box-none * {
     pointer-events: auto;
}
```

- `'box-only'`: The view can be the target of touch events but its subviews cannot be. It behaves like if the view had the following classes in CSS:

```
.box-only {
     pointer-events: auto;
}
.box-only * {
     pointer-events: none;
}
```

> Since `pointerEvents` does not affect layout/appearance, and we are already deviating from the spec by adding additional modes, we opt to not include `pointerEvents` on `style`. On some platforms, we would need to implement it as a `className` anyways. Using `style` or not is an implementation detail of the platform.

| Type                                         |
| -------------------------------------------- |
| enum('box-none', 'none', 'box-only', 'auto') |

---

### `removeClippedSubviews`

This is a reserved performance property exposed by `RCTView` and is useful for scrolling content when there are many subviews, most of which are offscreen. For this property to be effective, it must be applied to a view that contains many subviews that extend outside its bound. The subviews must also have `overflow: hidden`, as should the containing view (or one of its superviews).

| Type |
| ---- |
| bool |

---

### `renderToHardwareTextureAndroid` <div class="label android">Android</div>

Whether this `View` should render itself (and all of its children) into a single hardware texture on the GPU.

On Android, this is useful for animations and interactions that only modify opacity, rotation, translation, and/or scale: in those cases, the view doesn't have to be redrawn and display lists don't need to be re-executed. The texture can be re-used and re-composited with different parameters. The downside is that this can use up limited video memory, so this prop should be set back to false at the end of the interaction/animation.

| Type |
| ---- |
| bool |

---

### `shouldRasterizeIOS` <div class="label ios">iOS</div>

Whether this `View` should be rendered as a bitmap before compositing.

On iOS, this is useful for animations and interactions that do not modify this component's dimensions nor its children; for example, when translating the position of a static view, rasterization allows the renderer to reuse a cached bitmap of a static view and quickly composite it during each frame.

Rasterization incurs an off-screen drawing pass and the bitmap consumes memory. Test and measure when using this property.

| Type |
| ---- |
| bool |

---

### `style`

| Type                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `testID`

Used to locate this view in end-to-end tests.

> This disables the 'layout-only view removal' optimization for this view!

| Type   |
| ------ |
| string |

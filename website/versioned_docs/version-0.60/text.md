---
id: version-0.60-text
title: Text
original_id: text
---

A React component for displaying text.

`Text` supports nesting, styling, and touch handling.

In the following example, the nested title and body text will inherit the `fontFamily` from `styles.baseText`, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines:

```SnackPlayer name=Text
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class TextInANest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bird's Nest",
      bodyText: 'This is not really a bird nest.'
    };
  }

  render() {
    return (
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.titleText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}
        </Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
```

## Nested text

Both Android and iOS allow you to display formatted text by annotating ranges of a string with specific formatting like bold or colored text (`NSAttributedString` on iOS, `SpannableString` on Android). In practice, this is very tedious. For React Native, we decided to use web paradigm for this where you can nest text to achieve the same effect.

```SnackPlayer name=Nested
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class BoldAndBeautiful extends Component {
  render() {
    return (
      <Text style={{fontWeight: 'bold'}}>
        I am bold
        <Text style={{color: 'red'}}>
          and red
        </Text>
      </Text>
    );
  }
}
```

Behind the scenes, React Native converts this to a flat `NSAttributedString` or `SpannableString` that contains the following information:

```jsx
"I am bold and red"
0-9: bold
9-17: bold, red
```

## Containers

The `<Text>` element is unique relative to layout: everything inside is no longer using the flexbox layout but using text layout. This means that elements inside of a `<Text>` are no longer rectangles, but wrap when they see the end of the line.

```jsx
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text container: the text will be inline if the space allowed it
// |First part and second part|

// otherwise, the text will flow as if it was one
// |First part |
// |and second |
// |part       |

<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View container: each text is its own block
// |First part and|
// |second part   |

// otherwise, the text will flow in its own block
// |First part |
// |and        |
// |second part|
```

## Limited Style Inheritance

On the web, the usual way to set a font family and size for the entire document is to take advantage of inherited CSS properties like so:

```css
html {
  font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
  font-size: 11px;
  color: #141823;
}
```

All elements in the document will inherit this font unless they or one of their parents specifies a new rule.

In React Native, we are more strict about it: **you must wrap all the text nodes inside of a `<Text>` component**. You cannot have a text node directly under a `<View>`.

```jsx
// BAD: will raise exception, can't have a text node as child of a <View>
<View>
  Some text
</View>

// GOOD
<View>
  <Text>
    Some text
  </Text>
</View>
```

You also lose the ability to set up a default font for an entire subtree. Meanwhile, `fontFamily` only accepts a single font name, which is different from `font-family` in CSS. The recommended way to use consistent fonts and sizes across your application is to create a component `MyAppText` that includes them and use this component across your app. You can also use this component to make more specific components like `MyAppHeaderText` for other kinds of text.

```jsx
<View>
  <MyAppText>
    Text styled with the default font for the entire application
  </MyAppText>
  <MyAppHeaderText>Text styled as a header</MyAppHeaderText>
</View>
```

Assuming that `MyAppText` is a component that only renders out its children into a `Text` component with styling, then `MyAppHeaderText` can be defined as follows:

```jsx
class MyAppHeaderText extends Component {
  render() {
    return (
      <MyAppText>
        <Text style={{fontSize: 20}}>{this.props.children}</Text>
      </MyAppText>
    );
  }
}
```

Composing `MyAppText` in this way ensures that we get the styles from a top-level component, but leaves us the ability to add / override them in specific use cases.

React Native still has the concept of style inheritance, but limited to text subtrees. In this case, the second part will be both bold and red.

```jsx
<Text style={{fontWeight: 'bold'}}>
  I am bold
  <Text style={{color: 'red'}}>and red</Text>
</Text>
```

We believe that this more constrained way to style text will yield better apps:

- (Developer) React components are designed with strong isolation in mind: You should be able to drop a component anywhere in your application, trusting that as long as the props are the same, it will look and behave the same way. Text properties that could inherit from outside of the props would break this isolation.

- (Implementor) The implementation of React Native is also simplified. We do not need to have a `fontFamily` field on every single element, and we do not need to potentially traverse the tree up to the root every time we display a text node. The style inheritance is only encoded inside of the native Text component and doesn't leak to other components or the system itself.

---

# Reference

## Props

### `accessible`

When `true`, indicates that the view is an accessibility element. By default, all the touchable elements are accessible.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `accessibilityLabel`

Overrides the text that's read by the screen reader when the user interacts with the element. By default, the label is constructed by traversing all the children and accumulating all the `Text` nodes separated by space.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `accessibilityHint`

An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not clear from the accessibility label.

| Type   | Required |
| ------ | -------- |
| string | No       |

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

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `accessibilityState`

Describes the current state of a component to the user of an assistive technology.

See the [Accessibility guide](accessibility.md#accessibilitystate-ios-android) for more information.

| Type                                                                                           | Required |
| ---------------------------------------------------------------------------------------------- | -------- |
| object: {disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool} | No       |

---

### `adjustsFontSizeToFit`

Specifies whether fonts should be scaled down automatically to fit given style constraints.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `allowFontScaling`

Specifies whether fonts should scale to respect Text Size accessibility settings. The default is `true`.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `dataDetectorType`

Determines the types of data converted to clickable URLs in the text element. By default no data types are detected.

You can provide only one type.

Possible values for `dataDetectorType` are:

- `'phoneNumber'`
- `'link'`
- `'email'`
- `'none'`
- `'all'`

| Type                                                | Required | Platform |
| --------------------------------------------------- | -------- | -------- |
| enum('phoneNumber', 'link', 'email', 'none', 'all') | No       | Android  |

---

### `disabled`

Specifies the disabled state of the text view for testing purposes

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `ellipsizeMode`

When `numberOfLines` is set, this prop defines how text will be truncated. `numberOfLines` must be set in conjunction with this prop.

This can be one of the following values:

- `head` - The line is displayed so that the end fits in the container and the missing text at the beginning of the line is indicated by an ellipsis glyph. e.g., "...wxyz"
- `middle` - The line is displayed so that the beginning and end fit in the container and the missing text in the middle is indicated by an ellipsis glyph. "ab...yz"
- `tail` - The line is displayed so that the beginning fits in the container and the missing text at the end of the line is indicated by an ellipsis glyph. e.g., "abcd..."
- `clip` - Lines are not drawn past the edge of the text container.

The default is `tail`.

| Type                                   | Required |
| -------------------------------------- | -------- |
| enum('head', 'middle', 'tail', 'clip') | No       |

---

### `maxFontSizeMultiplier`

Specifies largest possible scale a font can reach when `allowFontScaling` is enabled. Possible values:

- `null/undefined` (default): inherit from the parent node or the global default (0)
- `0`: no max, ignore parent/global default
- `>= 1`: sets the `maxFontSizeMultiplier` of this node to this value

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `minimumFontScale`

Specifies smallest possible scale a font can reach when adjustsFontSizeToFit is enabled. (values 0.01-1.0).

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `nativeID`

Used to locate this view from native code.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `numberOfLines`

Used to truncate the text with an ellipsis after computing the text layout, including line wrapping, such that the total number of lines does not exceed this number.

This prop is commonly used with `ellipsizeMode`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `onLayout`

Invoked on mount and layout changes with

`{nativeEvent: {layout: {x, y, width, height}}}`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLongPress`

This function is called on long press.

e.g., `onLongPress={this.increaseSize}>`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onMoveShouldSetResponder`

Does this view want to "claim" touch responsiveness? This is called for every touch move on the `View` when it is not the responder.

`View.props.onMoveShouldSetResponder: (event) => [true | false]`, where `event` is a synthetic touch event as described above.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onPress`

This function is called on press.

e.g., `onPress={() => console.log('1st')}`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onResponderGrant`

The View is now responding for touch events. This is the time to highlight and show the user what is happening.

`View.props.onResponderGrant: (event) => {}`, where `event` is a synthetic touch event as described above.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onResponderMove`

The user is moving their finger.

`View.props.onResponderMove: (event) => {}`, where `event` is a synthetic touch event as described above.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onResponderRelease`

Fired at the end of the touch.

`View.props.onResponderRelease: (event) => {}`, where `event` is a synthetic touch event as described above.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onResponderTerminate`

The responder has been taken from the `View`. Might be taken by other views after a call to `onResponderTerminationRequest`, or might be taken by the OS without asking (e.g., happens with control center/ notification center on iOS)

`View.props.onResponderTerminate: (event) => {}`, where `event` is a synthetic touch event as described above.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onResponderTerminationRequest`

Some other `View` wants to become responder and is asking this `View` to release its responder. Returning `true` allows its release.

`View.props.onResponderTerminationRequest: (event) => {}`, where `event` is a synthetic touch event as described above.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onStartShouldSetResponderCapture`

If a parent `View` wants to prevent a child `View` from becoming responder on a touch start, it should have this handler which returns `true`.

`View.props.onStartShouldSetResponderCapture: (event) => [true | false]`, where `event` is a synthetic touch event as described above.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onTextLayout`

TODO.

### `pressRetentionOffset`

When the scroll view is disabled, this defines how far your touch may move off of the button, before deactivating the button. Once deactivated, try moving it back and you'll see that the button is once again reactivated! Move it back and forth several times while the scroll view is disabled. Ensure you pass in a constant to reduce memory allocations.

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

---

### `selectable`

Lets the user select text, to use the native copy and paste functionality.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `selectionColor`

The highlight color of the text.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | Android  |

---

### `style`

| Type  | Required |
| ----- | -------- |
| style | No       |

- [View Style Props...](view-style-props.md#style)

- **`textShadowOffset`**: object: {width: number,height: number}

- **`color`**: [color](colors.md)

- **`fontSize`**: number

- **`fontStyle`**: enum('normal', 'italic')

- **`fontWeight`**: enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')

  Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

- **`lineHeight`**: number

- **`textAlign`**: enum('auto', 'left', 'right', 'center', 'justify')

  Specifies text alignment. On Android, the value 'justify' is only supported on Oreo (8.0) or above (API level >= 26). The value will fallback to `left` on lower Android versions.

- **`textDecorationLine`**: enum('none', 'underline', 'line-through', 'underline line-through')

- **`textShadowColor`**: [color](colors.md)

- **`fontFamily`**: string

- **`textShadowRadius`**: number

- **`includeFontPadding`**: bool (_Android_)

  Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders. With some fonts, this padding can make text look slightly misaligned when centered vertically. For best results also set `textAlignVertical` to `center`. Default is true.

* **`textAlignVertical`**: enum('auto', 'top', 'bottom', 'center') (_Android_)

* **`fontVariant`**: array of enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums') (_iOS_)

* **`letterSpacing`**: number

  Increase or decrease the spacing between characters. The default is 0, for no extra letter spacing.

  iOS: The additional space will be rendered after each glyph.

  Android: Only supported since Android 5.0 - older versions will ignore this attribute. Please note that additional space will be added _around_ the glyphs (half on each side), which differs from the iOS rendering. It is possible to emulate the iOS rendering by using layout attributes, e.g. negative margins, as appropriate for your situation.

* **`textDecorationColor`**: [color](colors.md) (_iOS_)

* **`textDecorationStyle`**: enum('solid', 'double', 'dotted', 'dashed') (_iOS_)

* **`textTransform`**: enum('none', 'uppercase', 'lowercase', 'capitalize')

* **`writingDirection`**: enum('auto', 'ltr', 'rtl') (_iOS_)

---

### `suppressHighlighting`

When `true`, no visual change is made when text is pressed down. By default, a gray oval highlights the text on press down.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `textBreakStrategy`

Set text break strategy on Android API Level 23+, possible values are `simple`, `highQuality`, `balanced` The default value is `highQuality`.

| Type                                      | Required | Platform |
| ----------------------------------------- | -------- | -------- |
| enum('simple', 'highQuality', 'balanced') | No       | Android  |

# Known issues

- [react-native#22811](https://github.com/facebook/react-native/issues/22811): Nested Text elements do not support `numberOfLines` attribute

---
id: version-0.55-text
title: Text
original_id: text
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

一个用于显示文本的React组件，并且它也支持嵌套、样式，以及触摸处理。

在下面的例子里，嵌套的标题和正文文字会继承来自`styles.baseText`的`fontFamily`字体样式，不过标题上还附加了它自己额外的样式。标题和文本会在顶部依次堆叠，并且被代码中内嵌的换行符分隔开。

```ReactNativeWebPlayer
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

## 嵌套文本

在iOS和Android中显示格式化文本的方法类似，都是提供你想显示的文本内容，然后使用范围标注来指定一些格式（在iOS上是用`NSAttributedString`，Android上则是`SpannableString`）。这种用法非常繁琐。在React Native中，我们决定采用和Web一致的设计，这样你可以把相同格式的文本嵌套包裹起来：

```ReactNativeWebPlayer
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

而实际上在框架内部，这会生成一个扁平结构的`NSAttributedString`或是`SpannableString`，包含以下信息：

```jsx
"I am bold and red"
0-9: bold
9-17: bold, red
```

## 嵌套视图（仅限iOS）

On iOS, you can nest views within your Text component. Here's an example:

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class BlueIsCool extends Component {
  render() {
    return (
      <Text>
        There is a blue square
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
        in between my text.
      </Text>
    );
  }
}
```

> In order to use this feature, you must give the view a `width` and a `height`.

## 容器

`<Text>`元素在布局上不同于其它组件：在Text内部的元素不再使用flexbox布局，而是采用文本布局。这意味着`<Text>`内部的元素不再是一个个矩形，而可能会在行末进行折叠。

```jsx
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text container: all the text flows as if it was one
// |First part |
// |and second |
// |part       |

<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View container: each text is its own block
// |First part |
// |and        |
// |second part|
```

## 样式继承限制

在Web上，要想指定整个文档的字体和大小，我们只需要写：

```css
/* 这段代码是CSS, *不是*React Native */
html {
  font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
  font-size: 11px;
  color: #141823;
}
```

当浏览器尝试渲染一个文本节点的时候，它会在树中一路向上查询，直到根节点，来找到一个具备`font-size`属性的元素。这个系统一个不好的地方在于**任何**节点都可能会有`font-size`属性，包括`<div>`标签。这个设计为了方便而设计，但实际上语义上并不太正确。

在React Native中，我们把这个问题设计的更加严谨：**你必须把你的文本节点放在`<Text>`组件内**。你不能直接在`<View>`下放置一段文本。

```jsx
// 错误的做法：会导致一个错误。<View>下不能直接放一段文本。
<View>
  一些文本
</View>

// 正确的做法
<View>
  <Text>
    一些文本
  </Text>
</View>
```

并且你也不能直接设置一整颗子树的默认样式。使用一个一致的文本和尺寸的推荐方式是创建一个包含相关样式的组件`MyAppText`，然后在你的App中反复使用它。你还可以创建更多特殊的组件譬如`MyAppHeaderText`来表达不同样式的文本。

```jsx
<View>
  <MyAppText>这个组件包含了一个默认的字体样式，用于整个应用的文本</MyAppText>
  <MyAppHeaderText>这个组件包含了用于标题的样式</MyAppHeaderText>
</View>
```

Assuming that `MyAppText` is a component that simply renders out its children into a `Text` component with styling, then `MyAppHeaderText` can be defined as follows:

```jsx
class MyAppHeaderText extends Component {
  render() {
    <MyAppText>
      <Text style={{ fontSize: 20 }}>{this.props.children}</Text>
    </MyAppText>;
  }
}
```

Composing `MyAppText` in this way ensures that we get the styles from a top-level component, but leaves us the ability to add / override them in specific use cases.

React Native实际上还是有一部分样式继承的实现，不过仅限于文本标签的子树。在下面的代码里，第二部分会在加粗的同时又显示为红色：

```jsx
<Text style={{ fontWeight: "bold" }}>
  I am bold
  <Text style={{ color: "red" }}>and red</Text>
</Text>
```

我们相信这种看起来不太舒服的给文本添加样式的方法反而会帮助我们生产更好的App：

- (对开发者来说) React组件在概念上被设计为强隔离性的：你应当可以在应用的任何位置放置一个组件，而且只要属性相同，其外观和表现都将完全相同。文本如果能够继承外面的样式属性，将会打破这种隔离性。

- (对实现者来说) React Native的实现也被简化了。我们不需要在每个元素上都添加一个`fontFamily`字段，并且我们也不需要隐含地在显示文本的时候向上遍历树。唯一的样式继承在原生Text组件中编码，也不会影响到其它组件或者系统本身。

### 查看Props

* [`selectable`](text.md#selectable)
* [`accessible`](text.md#accessible)
* [`ellipsizeMode`](text.md#ellipsizemode)
* [`nativeID`](text.md#nativeid)
* [`numberOfLines`](text.md#numberoflines)
* [`onLayout`](text.md#onlayout)
* [`onLongPress`](text.md#onlongpress)
* [`onPress`](text.md#onpress)
* [`pressRetentionOffset`](text.md#pressretentionoffset)
* [`allowFontScaling`](text.md#allowfontscaling)
* [`style`](text.md#style)
* [`testID`](text.md#testid)
* [`disabled`](text.md#disabled)
* [`selectionColor`](text.md#selectioncolor)
* [`textBreakStrategy`](text.md#textbreakstrategy)
* [`adjustsFontSizeToFit`](text.md#adjustsfontsizetofit)
* [`minimumFontScale`](text.md#minimumfontscale)
* [`suppressHighlighting`](text.md#suppresshighlighting)

---

# 文档

## Props

### `selectable`

决定用户是否可以长按选择文本，以便复制和粘贴。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `accessible`

When set to `true`, indicates that the view is an accessibility element. The default value for a `Text` element is `true`.

See the [Accessibility guide](accessibility.md#accessible-ios-android) for more information.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `ellipsizeMode`

When `numberOfLines` is set, this prop defines how text will be truncated. `numberOfLines` must be set in conjunction with this prop.

This can be one of the following values:

* `head` - The line is displayed so that the end fits in the container and the missing text at the beginning of the line is indicated by an ellipsis glyph. e.g., "...wxyz"
* `middle` - The line is displayed so that the beginning and end fit in the container and the missing text in the middle is indicated by an ellipsis glyph. "ab...yz"
* `tail` - The line is displayed so that the beginning fits in the container and the missing text at the end of the line is indicated by an ellipsis glyph. e.g., "abcd..."
* `clip` - Lines are not drawn past the edge of the text container.

The default is `tail`.

> `clip` is working only for iOS

| 类型                                   | 必填 |
| -------------------------------------- | ---- |
| enum('head', 'middle', 'tail', 'clip') | 否   |

---

### `nativeID`

Used to locate this view from native code.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `numberOfLines`

用来当文本过长的时候裁剪文本。包括折叠产生的换行在内，总的行数不会超过这个属性的限制。

This prop is commonly used with `ellipsizeMode`.

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `onLayout`

在加载时或者布局变化以后调用，参数为如下的内容：

`{nativeEvent: {layout: {x, y, width, height}}}`

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onLongPress`

当文本被长按以后调用此回调函数。

例如：`onLongPress={this.increaseSize}>`

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onPress`

当文本被点击以后调用此回调函数。

例如：`onPress={() => console.log('1st')}`

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `pressRetentionOffset`

When the scroll view is disabled, this defines how far your touch may move off of the button, before deactivating the button. Once deactivated, try moving it back and you'll see that the button is once again reactivated! Move it back and forth several times while the scroll view is disabled. Ensure you pass in a constant to reduce memory allocations.

| 类型                                                               | 必填 |
| ------------------------------------------------------------------ | ---- |
| object: {top: number, left: number, bottom: number, right: number} | 否   |

---

### `allowFontScaling`

控制字体是否要根据系统的“字体大小”辅助选项来进行缩放。默认值为`true`。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `style`

| 类型  | 必填 |
| ----- | ---- |
| style | 否   |

* [View Style Props...](view-style-props.md#style)

* **`textShadowOffset`**: object: {width: number,height: number}

* **`color`**: [color](colors.md)

* **`fontSize`**: number

* **`fontStyle`**: enum('normal', 'italic')

* **`fontWeight`**: enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')

  指定字体的粗细。大多数字体都支持'normal'和'bold'值。并非所有字体都支持所有的数字值。如果某个值不支持，则会自动选择最接近的值。

* **`lineHeight`**: number

* **`textAlign`**: enum('auto', 'left', 'right', 'center', 'justify')

  指定文本的对齐方式。其中'justify'值仅iOS支持，在Android上会变为`left`。

* **`textDecorationLine`**: enum('none', 'underline', 'line-through', 'underline line-through')

* **`textShadowColor`**: [color](colors.md)

* **`fontFamily`**: string

* **`textShadowRadius`**: number

* **`includeFontPadding`**: bool (_Android_)

  Android在默认情况下会为文字额外保留一些padding，以便留出空间摆放上标或是下标的文字。对于某些字体来说，这些额外的padding可能会导致文字难以垂直居中。如果你把`textAlignVertical`设置为`center`之后，文字看起来依然不在正中间，那么可以尝试将本属性设置为`false`。默认值为true。

- **`textAlignVertical`**: enum('auto', 'top', 'bottom', 'center') (_Android_)

- **`fontVariant`**: array of enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums') (_iOS_)

- **`letterSpacing`**: number

Increase or decrease the spacing between characters. The default is 0, for no extra letter spacing.

iOS: The additional space will be rendered after each glyph.

Android: Only supported since Android 5.0 - older versions will ignore this attribute. Please note that additional space will be added _around_ the glyphs (half on each side), which differs from the iOS rendering. It is possible to emulate the iOS rendering by using layout attributes, e.g. negative margins, as appropriate for your situation.

* **`textDecorationColor`**: [color](colors.md) (_iOS_)

* **`textDecorationStyle`**: enum('solid', 'double', 'dotted', 'dashed') (_iOS_)

* **`writingDirection`**: enum('auto', 'ltr', 'rtl') (_iOS_)

---

### `testID`

用来在端到端测试中定位此视图。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `disabled`

Specifies the disabled state of the text view for testing purposes

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `selectionColor`

The highlight color of the text.

| 类型               | 必填 | 平台    |
| ------------------ | ---- | ------- |
| [color](colors.md) | 否   | Android |

---

### `textBreakStrategy`

Set text break strategy on Android API Level 23+, possible values are `simple`, `highQuality`, `balanced` The default value is `highQuality`.

| 类型                                      | 必填 | 平台    |
| ----------------------------------------- | ---- | ------- |
| enum('simple', 'highQuality', 'balanced') | 否   | Android |

---

### `adjustsFontSizeToFit`

指定字体是否随着给定样式的限制而自动缩放。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `minimumFontScale`

当adjustsFontSizeToFit开启时，指定最小的缩放比（即不能低于这个值）。可设定的值为0.01 - 1.

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| number | 否   | iOS  |

---

### `suppressHighlighting`

设为true时，当文本被按下会没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

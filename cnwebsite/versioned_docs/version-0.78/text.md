---
id: text
title: Text
---

一个用于显示文本的 React 组件，并且它也支持嵌套、样式，以及触摸处理。

在下面的例子里，嵌套的标题和正文文字会继承来自`styles.baseText`的`fontFamily`字体样式，不过标题上还附加了它自己额外的样式。标题和文本会在顶部依次堆叠，并且被代码中内嵌的换行符分隔开。

```SnackPlayer name=Text%20Functional%20Component%20Example
import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';

const TextInANest = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText} onPress={onPressTitle}>
        {titleText}
        {'\n'}
        {'\n'}
      </Text>
      <Text numberOfLines={5}>{bodyText}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TextInANest;
```

## 嵌套文本

在 iOS 和 Android 中显示格式化文本的方法类似，都是提供你想显示的文本内容，然后使用范围标注来指定一些格式（在 iOS 上是用`NSAttributedString`，Android 上则是`SpannableString`）。这种用法非常繁琐。在 React Native 中，我们决定采用和 Web 一致的设计，这样你可以把相同格式的文本嵌套包裹起来：

```SnackPlayer name=Nested%20Text%20Example
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BoldAndBeautiful = () => {
  return (
    <Text style={styles.baseText}>
      I am bold
      <Text style={styles.innerText}> and red</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold'
  },
  innerText: {
    color: 'red'
  }
});

export default BoldAndBeautiful;
```

而实际上在框架内部，这会生成一个扁平结构的`NSAttributedString`或是`SpannableString`，包含以下信息：

```jsx
"I am bold and red"
0-9: bold
9-17: bold, red
```

## 容器

`<Text>`元素在布局上不同于其它组件：在 Text 内部的元素不再使用 flexbox 布局，而是采用文本布局。这意味着`<Text>`内部的元素不再是一个个矩形，而可能会在行末进行折叠。

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

// the text will flow in its own block
// |First part |
// |and        |
// |second part|
```

## 样式继承限制

在 Web 上，要想指定整个文档的字体和大小，我们只需要写：

```css
/* 这段代码是CSS, *不是*React Native */
html {
  font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
  font-size: 11px;
  color: #141823;
}
```

当浏览器尝试渲染一个文本节点的时候，它会在树中一路向上查询，直到根节点，来找到一个具备`font-size`属性的元素。这个系统一个不好的地方在于**任何**节点都可能会有`font-size`属性，包括`<div>`标签。这个设计为了方便而设计，但实际上语义上并不太正确。

在 React Native 中，我们把这个问题设计的更加严谨：**你必须把你的文本节点放在`<Text>`组件内**。你不能直接在`<View>`下放置一段文本。

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

并且你也不能直接设置一整颗子树的默认样式。此外，`fontFamily`样式只接受一种字体名称，这一点和 CSS 也不一样。使用一个一致的文本和尺寸的推荐方式是创建一个包含相关样式的组件`MyAppText`，然后在你的 App 中反复使用它。你还可以创建更多特殊的组件譬如`MyAppHeaderText`来表达不同样式的文本。

```jsx
<View>
  <MyAppText>
    这个组件包含了一个默认的字体样式，用于整个应用的文本
  </MyAppText>
  <MyAppHeaderText>这个组件包含了用于标题的样式</MyAppHeaderText>
</View>
```

假设`MyAppText`是一个组件，它简单地将其子元素渲染到一个带有样式的`Text`组件中，那么可以如下定义`MyAppHeaderText`：

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

以这种方式编写`MyAppText`确保我们能够从顶层组件获取样式，但同时也让我们有能力在特定用例中添加/覆盖它们。

React Native 实际上还是有一部分样式继承的实现，不过仅限于文本标签的子树。在下面的代码里，第二部分会在加粗的同时又显示为红色：

```jsx
<Text style={{fontWeight: 'bold'}}>
  I am bold
  <Text style={{color: 'red'}}>and red</Text>
</Text>
```

我们相信这种看起来不太舒服的给文本添加样式的方法反而会帮助我们生产更好的 App：

- (对开发者来说) React 组件在概念上被设计为强隔离性的：你应当可以在应用的任何位置放置一个组件，而且只要属性相同，其外观和表现都将完全相同。文本如果能够继承外面的样式属性，将会打破这种隔离性。

- (对实现者来说) React Native 的实现也被简化了。我们不需要在每个元素上都添加一个`fontFamily`字段，并且我们也不需要隐含地在显示文本的时候向上遍历树。唯一的样式继承在原生 Text 组件中编码，也不会影响到其它组件或者系统本身。

---

# 文档

## Props

### `accessibilityHint`

无障碍提示有助于用户理解在执行辅助功能元素上的操作时将会发生什么，尤其当这个结果在辅助功能标签中不明确时。

| Type   |
| ------ |
| string |

---

### `accessibilityLanguage` <div class="label ios">iOS</div>

指示当用户与元素交互时屏幕阅读器应该使用哪种语言。它应该遵循[BCP 47 规范](https://www.rfc-editor.org/info/bcp47)。

更多信息请参阅[iOS `accessibilityLanguage`文档](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage)。

| Type   |
| ------ |
| string |

---

### `accessibilityLabel`

覆盖当用户与元素交互时屏幕阅读器读取的文本。默认情况下，标签是通过遍历所有子节点并累积所有的`Text`节点（以空格分隔）来构建的。

| Type   |
| ------ |
| string |

---

### `accessibilityRole`

告诉屏幕阅读器将当前聚焦的元素视为具有特定角色。

在 iOS 上，这些角色映射到相应的辅助功能特征。图像按钮的功能与将特征设置为“图像”和“按钮”相同。有关更多信息，请查看[辅助功能指南](accessibility.md#accessibilitytraits-ios)。

在 Android 上，这些角色在 TalkBack 上的类似功能就像在 iOS 的 Voiceover 上添加辅助功能特征一样。

| Type                                                 |
| ---------------------------------------------------- |
| [AccessibilityRole](accessibility#accessibilityrole) |

---

### `accessibilityState`

告诉屏幕阅读器将当前聚焦的元素视为处于特定状态。

您可以提供一个状态，没有状态，或者多个状态。这些状态必须通过一个对象传递进来。例如：`{selected: true, disabled: true}`。

| Type                                                   |
| ------------------------------------------------------ |
| [AccessibilityState](accessibility#accessibilitystate) |

---

### `accessibilityActions`

无障碍操作允许辅助技术以编程方式调用组件的动作。`accessibilityActions`属性应包含动作对象的列表。每个动作对象都应包含字段名称和标签。

更多信息请参阅[无障碍指南](accessibility.md#accessibility-actions)。

| Type  | Required |
| ----- | -------- |
| array | No       |

---

### `onAccessibilityAction`

当用户执行辅助功能操作时调用。此函数唯一的参数是一个包含要执行的操作名称的事件。

有关详细信息，请参阅 [辅助功能指南](accessibility.md#accessibility-actions)。

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `accessible`

当设置为 `true` 时，表示该视图是一个辅助功能元素。

更多信息请参阅 [辅助功能指南](accessibility#accessible-ios-android)。

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `adjustsFontSizeToFit` <div class="label ios">iOS</div>

指定字体是否随着给定样式的限制而自动缩放。

| 类型    | 默认值  |
| ------- | ------- |
| boolean | `false` |

---

### `selectable`

决定用户是否可以长按选择文本，以便复制和粘贴。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `ellipsizeMode`

这个属性通常和下面的 `numberOfLines` 属性配合使用，表示当 Text 组件无法全部显示需要显示的字符串时如何用省略号进行修饰。

该属性有如下 4 种取值:

- `head` - 从文本内容头部截取显示省略号。例如： "...efg"
- `middle` - 在文本内容中间截取显示省略号。例如： "ab...yz"
- `tail` - 从文本内容尾部截取显示省略号。例如： "abcd..."
- `clip` - 不显示省略号，直接从尾部截断。

默认值为 `tail`.

| 类型                                   | 必需 |
| -------------------------------------- | ---- |
| enum('head', 'middle', 'tail', 'clip') | 否   |

---

### `nativeID`

用于在原生端定位此视图。

| Type   |
| ------ |
| string |

---

### `numberOfLines`

用来当文本过长的时候裁剪文本。包括折叠产生的换行在内，总的行数不会超过这个属性的限制。

此属性一般和`ellipsizeMode`搭配使用。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `onLayout`

在加载时或者布局变化以后调用。

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onLongPress`

当文本被长按以后调用此回调函数。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPress`

在用户按下后调用的函数，在`onPressOut`触发之后被触发。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressIn`

在触摸开始时立即调用，早于`onPressOut`和`onPress`。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressOut`

当触摸释放时调用。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderGrant`

| 类型                                                              |
| ----------------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void ｜ boolean` |

---

### `onResponderMove`

用户正在移动手指。

| 类型                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderRelease`

触摸结束时触发。

| 类型                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminate`

响应器已从`View`中移除。在调用`onResponderTerminationRequest`后可能会被其他视图获取，或者可能在没有询问的情况下被操作系统获取（例如，在 iOS 上发生在控制中心/通知中心）。

| 类型                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminationRequest`

其他某个`View`想要成为响应者，并请求该`View`释放其响应者身份。返回`true`允许释放。

| 类型                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onStartShouldSetResponderCapture`

如果父级 `View` 希望阻止子级 `View` 在触摸开始时成为响应者，则应该具有此处理程序，它返回 `true`。

| 类型                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onTextLayout`

在文本布局更改时调用。

| 类型                                                 |
| ---------------------------------------------------- |
| ([`TextLayoutEvent`](text#textlayoutevent)) => mixed |

---

### `pressRetentionOffset`

当滚动视图被禁用时，这定义了您的触摸可以在按钮上移动多远，然后才会停用该按钮。一旦停用，请尝试将其移回，并且您会看到按钮再次被激活！在禁用滚动视图时来回移动它几次。确保传入一个常量以减少内存分配。

| Type                 |
| -------------------- |
| [Rect](rect), number |

---

### `allowFontScaling`

控制字体是否要根据系统的“字体大小”辅助选项来进行缩放。默认值为`true`。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `style`

| Type                                                                 |
| -------------------------------------------------------------------- |
| [Text Style](text-style-props), [View Style Props](view-style-props) |

---

### `testID`

用来在端到端测试中定位此视图。

| 类型   | 必需 |
| ------ | ---- |
| string | 否   |

---

### `selectionColor` <div class="label android">Android</div>

文本的高亮颜色。

| Type            |
| --------------- |
| [color](colors) |

---

### `textBreakStrategy` <div class="label android">Android</div>

在 Android API 级别 23 及以上，设置文本换行策略，可能的值有`simple`、`highQuality`、`balanced`。

| Type                                            | Default       |
| ----------------------------------------------- | ------------- |
| enum(`'simple'`, `'highQuality'`, `'balanced'`) | `highQuality` |

---

### `lineBreakStrategyIOS` <div class="label ios">iOS</div>

在 iOS 14+上设置换行策略。可能的值有`none`、`standard`、`hangul-word`和`push-out`。

| Type                                                        | Default  |
| ----------------------------------------------------------- | -------- |
| enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` |

---

### `minimumFontScale`

当 adjustsFontSizeToFit 开启时，指定最小的缩放比（即不能低于这个值）。可设定的值为 0.01 - 1.

| 类型   | 必需 | 平台 |
| ------ | ---- | ---- |
| number | 否   | iOS  |

---

### `suppressHighlighting` <div class="label ios">iOS</div>

设为 true 时，当文本被按下会没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `android_hyphenationFrequency` <div class="label android">Android</div>

设置在 Android API 级别 23+上确定单词断点时使用的自动连字符频率。

| Type                                | Default  |
| ----------------------------------- | -------- |
| enum(`'none'`, `'normal'`,`'full'`) | `'none'` |

---

### `dataDetectorType` <div class="label android">Android</div>

确定文本元素中转换为可点击 URL 的数据类型。默认情况下，不检测任何数据类型。

您只能提供一种类型。

| Type                                                          | Default  |
| ------------------------------------------------------------- | -------- |
| enum(`'phoneNumber'`, `'link'`, `'email'`, `'none'`, `'all'`) | `'none'` |

---

### `disabled` <div class="label android">Android</div>

指定文本视图的禁用状态，用于测试目的。

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `dynamicTypeRamp` <div class="label ios">iOS</div>

在 iOS 上应用于此元素的[动态类型](https://developer.apple.com/documentation/uikit/uifont/scaling_fonts_automatically)坡度。

| Type                                                                                                                                                     | Default  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum(`'caption2'`, `'caption1'`, `'footnote'`, `'subheadline'`, `'callout'`, `'body'`, `'headline'`, `'title3'`, `'title2'`, `'title1'`, `'largeTitle'`) | `'body'` |

---

### `maxFontSizeMultiplier`

指定当`allowFontScaling`启用时，字体可能达到的最大尺寸。可能的值包括：

- `null/undefined`：从父节点或全局默认继承（0）
- `0`：无最大值，忽略父级/全局默认
- `>= 1`：将此节点的`maxFontSizeMultiplier`设置为此值

| Type   | Default     |
| ------ | ----------- |
| number | `undefined` |

## 类型定义

### TextLayout

`TextLayout` 对象是 [`TextLayoutEvent`](text#textlayoutevent) 回调的一部分，包含了 `Text` 行的测量数据。

#### 示例

```js
{
    capHeight: 10.496,
    ascender: 14.624,
    descender: 4,
    width: 28.224,
    height: 18.624,
    xHeight: 6.048,
    x: 0,
    y: 0
}
```

#### 属性

| 名称      | 类型   | 可选性 | 描述                                   |
| --------- | ------ | ------ | -------------------------------------- |
| ascender  | number | No     | 文本布局变化后的行上升高度。           |
| capHeight | number | No     | 大写字母基线以上的部分的高度。         |
| descender | number | No     | 文本布局变化后的行下降高度。           |
| height    | number | No     | 文本布局变化后的行高。                 |
| width     | number | No     | 宽度文本布局变化后的线条宽度。         |
| x         | number | No     | 线条在 Text 组件内的 X 坐标。          |
| xHeight   | number | No     | 基线与中线之间的距离（小写字母大小）。 |
| y         | number | No     | 线条在 Text 组件内的 Y 坐标。          |

### TextLayoutEvent

`TextLayoutEvent` 对象作为组件布局变化的结果在回调中返回。它包含一个名为 `lines` 的键，其值是一个数组，包含了对应于每一行渲染文本的 [`TextLayout`](text#textlayout) 对象。

#### 示例

```js
{
  lines: [
    TextLayout,
    TextLayout,
    // ...
  ];
  target: 1127;
}
```

#### 属性

| 名称   | 类型                              | 可选 | 描述                               |
| ------ | --------------------------------- | ---- | ---------------------------------- |
| lines  | [TextLayout](text#textlayout)数组 | 否   | 提供了每行渲染的 TextLayout 数据。 |
| target | 数字                              | 否   | 元素的节点 ID。                    |

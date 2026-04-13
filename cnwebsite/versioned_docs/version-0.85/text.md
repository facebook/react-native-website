---
id: text
title: Text
---

一个用于显示文本的 React 组件。

`Text`支持嵌套、样式，以及触摸处理。

在下面的例子里，嵌套的标题和正文文字会继承来自`styles.baseText`的`fontFamily`字体样式，不过标题上还附加了它自己额外的样式。标题和文本会在顶部依次堆叠，并且被代码中内嵌的换行符分隔开：

```SnackPlayer name=Text%20Function%20Component%20Example
import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInANest = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={onPressTitle}>
            {titleText}
            {'\n'}
            {'\n'}
          </Text>
          <Text numberOfLines={5}>{bodyText}</Text>
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const BoldAndBeautiful = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
});

export default BoldAndBeautiful;
```

而实际上在框架内部，这会生成一个扁平结构的`NSAttributedString`或是`SpannableString`，包含以下信息：

```
"I am bold and red"
0-9: bold
9-17: bold, red
```

## 容器

`<Text>`元素在布局上不同于其它组件：在 Text 内部的元素不再使用 flexbox 布局，而是采用文本布局。这意味着`<Text>`内部的元素不再是一个个矩形，而可能会在行末进行折叠。

```tsx
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text container: the text will be inline, if the space allows it
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

## 样式继承限制

在 Web 上，要想指定整个文档的字体和大小，我们只需要写：

```css
html {
  font-family:
    'lucida grande', tahoma, verdana, arial, sans-serif;
  font-size: 11px;
  color: #141823;
}
```

当浏览器尝试渲染一个文本节点的时候，它会在树中一路向上查询，直到根节点，来找到一个具备`font-size`属性的元素。这个系统一个不好的地方在于**任何**节点都可能会有`font-size`属性，包括`<div>`标签。这个设计为了方便而设计，但实际上语义上并不太正确。

在 React Native 中，我们把这个问题设计的更加严谨：**你必须把你的文本节点放在`<Text>`组件内**。你不能直接在`<View>`下放置一段文本。

```tsx
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

并且你也不能直接设置一整颗子树的默认样式。此外，`fontFamily`样式只接受一种字体名称，这一点和 CSS 也不一样。使用一个一致的文本和尺寸的推荐方式是创建一个包含相关样式的组件`MyAppText`，然后在你的 App 中反复使用它。你还可以创建更多特殊的组件譬如`MyAppHeaderText`来表达不同样式的文本。

```tsx
<View>
  <MyAppText>
    Text styled with the default font for the entire application
  </MyAppText>
  <MyAppHeaderText>Text styled as a header</MyAppHeaderText>
</View>
```

假设`MyAppText`是一个组件，它简单地将其子元素渲染到一个带有样式的`Text`组件中，那么可以如下定义`MyAppHeaderText`：

```tsx
const MyAppHeaderText = ({children}) => {
  return (
    <MyAppText>
      <Text style={{fontSize: 20}}>{children}</Text>
    </MyAppText>
  );
};
```

以这种方式编写`MyAppText`确保我们能够从顶层组件获取样式，但同时也让我们有能力在特定用例中添加/覆盖它们。

React Native 实际上还是有一部分样式继承的实现，不过仅限于文本标签的子树。在下面的代码里，第二部分会在加粗的同时又显示为红色：

```tsx
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

### `accessibilityLanguage` <div className="label ios">iOS</div>

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

在 iOS 上，这些角色映射到相应的辅助功能特征。图像按钮的功能与将特征设置为"图像"和"按钮"相同。有关更多信息，请查看[辅助功能指南](accessibility.md#accessibilitytraits-ios)。

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

有关详细信息，请参阅[辅助功能指南](accessibility.md#accessibility-actions)。

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `accessible`

当设置为 `true` 时，表示该视图是一个辅助功能元素。

更多信息请参阅[辅助功能指南](accessibility#accessible-ios-android)。

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `adjustsFontSizeToFit`

指定字体是否随着给定样式的限制而自动缩放。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `allowFontScaling`

控制字体是否要根据系统的"字体大小"辅助选项来进行缩放。

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `android_hyphenationFrequency` <div className="label android">Android</div>

设置在 Android API 级别 23+上确定单词断点时使用的自动连字符频率。

| Type                                | Default  |
| ----------------------------------- | -------- |
| enum(`'none'`, `'normal'`,`'full'`) | `'none'` |

---

### `aria-busy`

表示某个元素正在被修改，辅助技术可能需要等待更改完成后再通知用户更新。

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-checked`

表示可选中元素的状态。此字段可以接受布尔值或字符串 "mixed" 来表示混合复选框。

| Type             | Default |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

---

### `aria-disabled`

表示该元素是可感知的但被禁用，因此它不可编辑或不可操作。

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-expanded`

表示一个可展开的元素当前是展开还是折叠状态。

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-label`

定义一个用于标记交互元素的字符串值。

| Type   |
| ------ |
| string |

---

### `aria-selected`

表示一个可选择的元素当前是否被选中。

| Type    |
| ------- |
| boolean |

### `dataDetectorType` <div className="label android">Android</div>

确定文本元素中转换为可点击 URL 的数据类型。默认情况下，不检测任何数据类型。

您只能提供一种类型。

| Type                                                          | Default  |
| ------------------------------------------------------------- | -------- |
| enum(`'phoneNumber'`, `'link'`, `'email'`, `'none'`, `'all'`) | `'none'` |

---

### `disabled` <div className="label android">Android</div>

指定文本视图的禁用状态，用于测试目的。

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `dynamicTypeRamp` <div className="label ios">iOS</div>

在 iOS 上应用于此元素的[动态类型](https://developer.apple.com/documentation/uikit/uifont/scaling_fonts_automatically)坡度。

| Type                                                                                                                                                     | Default  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum(`'caption2'`, `'caption1'`, `'footnote'`, `'subheadline'`, `'callout'`, `'body'`, `'headline'`, `'title3'`, `'title2'`, `'title1'`, `'largeTitle'`) | `'body'` |

---

### `ellipsizeMode`

当设置了`numberOfLines`时，此属性定义文本将如何被截断。`numberOfLines`必须与此属性一起设置。

该属性有如下 4 种取值:

- `head` - 从文本内容头部截取显示省略号。例如： "...wxyz"
- `middle` - 在文本内容中间截取显示省略号。例如： "ab...yz"
- `tail` - 从文本内容尾部截取显示省略号。例如： "abcd..."
- `clip` - 不显示省略号，直接从尾部截断。

:::note
在 Android 上，当`numberOfLines`设置为大于`1`的值时，只有`tail`值才能正确工作。
:::

| Type                                           | Default |
| ---------------------------------------------- | ------- |
| enum(`'head'`, `'middle'`, `'tail'`, `'clip'`) | `tail`  |

---

### `id`

用于从原生代码定位此视图。优先于`nativeID`属性。

| Type   |
| ------ |
| string |

---

### `maxFontSizeMultiplier`

指定当`allowFontScaling`启用时，字体可能达到的最大尺寸。可能的值包括：

- `null/undefined`：从父节点或全局默认继承（0）
- `0`：无最大值，忽略父级/全局默认
- `>= 1`：将此节点的`maxFontSizeMultiplier`设置为此值

| Type   | Default     |
| ------ | ----------- |
| number | `undefined` |

---

### `minimumFontScale`

当`adjustsFontSizeToFit`开启时，指定字体可能达到的最小缩放比（值为 0.01-1.0）。

| Type   |
| ------ |
| number |

---

### `nativeID`

用于在原生端定位此视图。

| Type   |
| ------ |
| string |

---

### `numberOfLines`

用来当文本过长的时候裁剪文本。包括折叠产生的换行在内，总的行数不会超过这个属性的限制。设置此属性为`0`将取消此限制，意味着不会应用行数限制。

此属性一般和`ellipsizeMode`搭配使用。

| Type   | Default |
| ------ | ------- |
| number | `0`     |

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

### `onMoveShouldSetResponder`

此视图是否要"声明"触摸响应权？当该`View`不是响应者时，每次触摸移动都会调用此方法。

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

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

该视图现在正在响应触摸事件。此时应该高亮显示，向用户表明正在发生什么。

在 Android 上，从此回调返回 true 可以阻止任何其他原生组件成为响应者，直到此响应者终止。

| Type                                                              |
| ----------------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void ｜ boolean` |

---

### `onResponderMove`

用户正在移动手指。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderRelease`

触摸结束时触发。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminate`

响应器已从`View`中移除。在调用`onResponderTerminationRequest`后可能会被其他视图获取，或者可能在没有询问的情况下被操作系统获取（例如，在 iOS 上发生在控制中心/通知中心）。

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminationRequest`

其他某个`View`想要成为响应者，并请求该`View`释放其响应者身份。返回`true`允许释放。

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onStartShouldSetResponderCapture`

如果父级`View`希望阻止子级`View`在触摸开始时成为响应者，则应该具有此处理程序，它返回`true`。

| Type                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onTextLayout`

在文本布局更改时调用。

| Type                                                 |
| ---------------------------------------------------- |
| ([`TextLayoutEvent`](text#textlayoutevent)) => mixed |

---

### `pressRetentionOffset`

当滚动视图被禁用时，这定义了您的触摸可以在按钮上移动多远，然后才会停用该按钮。一旦停用，请尝试将其移回，并且您会看到按钮再次被激活！在禁用滚动视图时来回移动它几次。确保传入一个常量以减少内存分配。

| Type                 |
| -------------------- |
| [Rect](rect), number |

---

### `ref`

一个 ref 设置器，在挂载时会被赋值一个[元素节点](element-nodes)。

注意`Text`组件不提供文本节点，就像 Web 上的段落元素（`<p>`）是元素节点而不是文本节点一样。文本节点可以作为其子节点找到。

---

### `role`

`role`向辅助技术的用户传达组件的用途。优先于[`accessibilityRole`](text#accessibilityrole)属性。

| Type                       |
| -------------------------- |
| [Role](accessibility#role) |

---

### `selectable`

决定用户是否可以选择文本，以使用原生的复制和粘贴功能。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `selectionColor` <div className="label android">Android</div>

文本的高亮颜色。

| Type            |
| --------------- |
| [color](colors) |

---

### `style`

| Type                                                                 |
| -------------------------------------------------------------------- |
| [Text Style](text-style-props), [View Style Props](view-style-props) |

---

### `suppressHighlighting` <div className="label ios">iOS</div>

设为`true`时，当文本被按下会没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `testID`

用来在端到端测试中定位此视图。

| Type   |
| ------ |
| string |

---

### `textBreakStrategy` <div className="label android">Android</div>

在 Android API 级别 23 及以上，设置文本换行策略，可能的值有`simple`、`highQuality`、`balanced`。

| Type                                            | Default       |
| ----------------------------------------------- | ------------- |
| enum(`'simple'`, `'highQuality'`, `'balanced'`) | `highQuality` |

---

### `lineBreakStrategyIOS` <div className="label ios">iOS</div>

在 iOS 14+上设置换行策略。可能的值有`none`、`standard`、`hangul-word`和`push-out`。

| Type                                                        | Default  |
| ----------------------------------------------------------- | -------- |
| enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` |

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

| Name      | Type   | Optional | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| ascender  | number | No       | 文本布局变化后的行上升高度。           |
| capHeight | number | No       | 大写字母基线以上的部分的高度。         |
| descender | number | No       | 文本布局变化后的行下降高度。           |
| height    | number | No       | 文本布局变化后的行高。                 |
| width     | number | No       | 文本布局变化后的线条宽度。             |
| x         | number | No       | 线条在 Text 组件内的 X 坐标。          |
| xHeight   | number | No       | 基线与中线之间的距离（小写字母大小）。 |
| y         | number | No       | 线条在 Text 组件内的 Y 坐标。          |

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

| Name   | Type                                    | Optional | Description                        |
| ------ | --------------------------------------- | -------- | ---------------------------------- |
| lines  | array of [TextLayout](text#textlayout)s | No       | 提供了每行渲染的 TextLayout 数据。 |
| target | number                                  | No       | 元素的节点 ID。                    |

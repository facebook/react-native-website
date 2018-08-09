---
id: version-0.56-accessibility
title: 无障碍功能
original_id: accessibility
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

## iOS 与 Android 原生 App 的无障碍功能(accessibility)

**译注**：accessibility 一词常见多种译法：可访问性、无障碍性、辅助功能等等，其中文意思都不太能准确表达其功能的本质——即为残障人士提供便利。本文主要采用“无障碍功能”和“辅助技术/服务”的说法。如果你或你的公司暂时没有资源和精力去服务这些用户，那么你可以跳过本文。但是，`译者个人希望借本文档，呼吁有能力有资源的商业公司/组织/个人，重视残障人士使用智能手机的权利`。

iOS 和 Android 都提供了便于残障人士无障碍使用 App 的 API。此外，两个平台都提供了整套的辅助技术，比如都有针对视力受损人士的读屏软件（iOS 的 VoiceOver 和 Android 的 TalkBack）。同样地，在 React Native 中我们也封装了对应的 API，使开发者能够在 App 中集成无障碍功能。注意：iOS 与 Android 在具体方法上会有所区别，因此 React Native 的实现也会因平台而异。

除了本文，你还可以阅读这篇[英文博客](https://code.facebook.com/posts/435862739941212/making-react-native-apps-accessible/)了解更多信息。

## 使 App 能够无障碍使用

### 无障碍功能属性

#### accessible (iOS, Android)

设置为`true`时表示当前视图是一个“无障碍元素”（accessibility element）。无障碍元素会将其所有子组件视为一整个可以选中的组件。默认情况下，所有可点击的组件（Touchable 系列组件）都是无障碍元素。

在 Android 上，React Native 视图的`accessible={true}`属性会被转译为原生视图对应的`focusable={true}`属性。

```javascript
<View accessible={true}>
  <Text>text one</Text>
  <Text>text two</Text>
</View>
```

在上面这个例子中，当父视图开启无障碍属性后，我们就无法单独选中'text one'和'text two'，而只能选中整个父视图。

#### 无障碍标签 accessibilityLabel (iOS, Android)

当一个视图启用无障碍属性后，最好再加上一个 accessibilityLabel（无障碍标签），这样可以让使用 VoiceOver 的人们清楚地知道自己选中了什么。VoiceOver 会读出选中元素的无障碍标签。

设定`accessibilityLabel`属性并赋予一个字符串内容即可在视图中启用无障碍标签：

```javascript
<TouchableOpacity
  accessible={true}
  accessibilityLabel={"Tap me!"}
  onPress={this._onPress}
>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Press me!</Text>
  </View>
</TouchableOpacity>
```

在上面这段示例代码中，如果不在 TouchableOpacity 上设置无障碍标签，那么其默认值就会是"Press me!"（即 Text 子组件的文本值）。此时无障碍标签是通过自动取所有 Text 子节点的值，然后用空格连起来生成。

#### 无障碍元素特性 accessibilityTraits (iOS)

无障碍元素特性可以使 VoiceOver 的用户知道自己选中的是什么类型的元素。是文本标签？是按钮？还是头部？`accessibilityTraits`回答了这一问题。

设定`accessibilityTraits`属性并赋予以下一个或多个（以数组的形式）特性字符串即可启用无障碍元素特性：

* **none** 无特性元素。
* **button** 具有按钮特性。
* **link** 具有链接特性。
* **header** 作为内容区域的头部（比如导航栏的标题）。
* **search** 用作搜索框的文本框。
* **image** 具有图片特性。可以和按钮或链接等连用。
* **selected** 元素被选中时使用。比如表格中被选中的一行或是[segmented control](segmentedcontrolios.html)中被选中的一个按钮。
* **plays** 在元素被点击后播放音效时使用。
* **key** 元素作为虚拟键盘的一个键使用。
* **text** 具有不可修改的文本的特性。
* **summary** 在 App 冷启动（指完全退出后台后再进入）时提供当前的简要总结信息的元素。比如当天气应用冷启动时，显示当前天气情况的元素就会被标记为**summary**。
* **disabled** 在元素被禁用，不接受用户输入时使用。
* **frequentUpdates** 有些元素会频繁更新其标签或值，但我们又不希望太频繁地接受到通知，那么就使用这一特性标记。这一特性标记会使无障碍功能的客户端隔一段时间后再去检查变化（避免频繁打扰用户）。秒表就是个典型的例子。
* **startsMedia** 在元素启动一个多媒体会话时使用（比如播放电影或是录音），此时不应该被 VoiceOver 这样的辅助技术打断。
* **adjustable** 元素具有可调整的特性（比如一个滑块）。
* **allowsDirectInteraction** 在元素可以接受 VoiceOver 用户的直接触摸交互时使用（比如展示钢琴键盘的视图）。
* **pageTurn** 用于通知 VoiceOver 当前页面已经阅读完毕，可以滚动到下一个页面了。

#### accessibilityViewIsModal (iOS)

A Boolean value indicating whether VoiceOver should ignore the elements within views that are siblings of the receiver.

For example, in a window that contains sibling views `A` and `B`, setting `accessibilityViewIsModal` to `true` on view `B` causes VoiceOver to ignore the elements in the view `A`. On the other hand, if view `B` contains a child view `C` and you set `accessibilityViewIsModal` to `true` on view `C`, VoiceOver does not ignore the elements in view `A`.

#### accessibilityElementsHidden (iOS)

A Boolean value indicating whether the accessibility elements contained within this accessibility element are hidden.

For example, in a window that contains sibling views `A` and `B`, setting `accessibilityElementsHidden` to `true` on view `B` causes VoiceOver to ignore the elements in the view `B`. This is similar to the Android property `importantForAccessibility="no-hide-descendants"`.

#### 无障碍元素的点击事件 onAccessibilityTap (iOS)

使用这一属性来绑定一个自定义的事件处理函数，这一函数会在当用户双击某个已经选中的无障碍元素时调用。

#### 双指双击事件 onMagicTap (iOS)

使用这一属性来绑定一个自定义的事件处理函数，这一函数会在当用户执行"magic tap"操作（即使用两个指头来双击）时调用。magic tap 的事件处理函数应该做与当前组件相关性最高的操作，比如在电话应用中，magic tap 的操作就应该接通电话，或是挂断已经接通的电话。如果当前选中的元素并没有`onMagicTap`函数，则系统会自动遍历视图层，直到找到一个可以响应此操作的。

#### 无障碍组件类型 accessibilityComponentType (Android)

在某些情况下，我们也希望告知用户他选中的组件的类型（比如是个按钮）。如果我们使用的是原生按钮，这一行为会自动进行。但既然我们主要是使用 javascript，则还需要为 Android 的 TalkBack 技术提供更多信息。要实现这一点，就必须为所有 UI 组件指定`accessibilityComponentType`属性。比如可以指定`button`，`radiobutton_checked`以及`radiobutton_unchecked`等值。

```javascript
<TouchableWithoutFeedback accessibilityComponentType=”button”
  onPress={this._onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Press me!</Text>
  </View>
</TouchableWithoutFeedback>
```

上面这个例子里，TouchableWithoutFeedback 在 TalkBack 中被声明为一个原生按钮。

#### 无障碍的动态区域 accessibilityLiveRegion (Android)

组件发生动态变化时，我们希望 TalkBack 能够提醒用户。这一行为可以通过设置`accessibilityLiveRegion`属性来实现。具体值可以设置为`none`，`polite`以及`assertive`：

* **none** 辅助服务不应该提醒用户当前视图的变化。
* **polite** 辅助服务应该提醒用户当前视图的变化。
* **assertive** 辅助服务应该立即打断当前的语音会话，提醒用户当前视图的变化。

```javascript
<TouchableWithoutFeedback onPress={this._addOne}>
  <View style={styles.embedded}>
    <Text>Click me</Text>
  </View>
</TouchableWithoutFeedback>
<Text accessibilityLiveRegion="polite">
  Clicked {this.state.count} times
</Text>
```

上面这个例子中，\_addOne 方法会改变 state.count 这个变量。那么只要用户点击了 TouchableWithoutFeedback，TalkBack 就会读出 Text 组件中的值，因为它设置了`accessibilityLiveRegion=”polite”`属性。

#### 无障碍功能优先级 importantForAccessibility (Android)

如果有两个 UI 组件同时层叠覆盖在父视图之上，那么默认的无障碍功能的焦点位置就可能难以预料。`importantForAccessibility`属性解决了这一问题，它可以控制某个视图是否触发无障碍功能事件，以及是否将其报告给辅助服务。具体值可以设置为`auto`，`yes`，`no`和`no-hide-descendants`（最后一个值会强制辅助服务忽略当前组件及其所有子组件）。

```javascript
<View style={styles.container}>
  <View style={{position: 'absolute', left: 10, top: 10, right: 10, height: 100,
    backgroundColor: 'green'}} importantForAccessibility=”yes”>
    <Text> First layout </Text>
  </View>
  <View style={{position: 'absolute', left: 10, top: 10, right: 10, height: 100,
    backgroundColor: 'yellow'}} importantForAccessibility=”no-hide-descendant”>
    <Text> Second layout </Text>
  </View>
</View>
```

上面这个例子里，第二个 View 的组件对于 TalkBack 和其他一些辅助服务来说是完全不可见的。这样我们就可以轻易地把两个视图覆盖到同一个父容器上，而不用担心影响 TalkBack 服务。

### 查看读屏应用是否已开启

`AccessibilityInfo`可以用于查询读屏应用是否已开启。请查看[AccessibilityInfo 的文档](accessibilityinfo.md)来了解具体用法。

### 发送无障碍功能的相关事件 (Android)

有时候需要在 UI 组件上主动触发一个无障碍功能的事件（比如当某个自定义的视图出现在屏幕上或是某个自定义的单选框被选中）。为此 UIManager 模块提供了一个`sendAccessibilityEvent`方法。它接受两个参数：view 标签和事件类型。

```javascript
import { UIManager, findNodeHandle } from 'react-native';

_onPress: function() {
  const radioButton = this.state.radioButton === 'radiobutton_checked' ?
    'radiobutton_unchecked' : 'radiobutton_checked'

  this.setState({
    radioButton: radioButton
  });

  if (radioButton === 'radiobutton_checked') {
    UIManager.sendAccessibilityEvent(
      findNodeHandle(this),
      UIManager.AccessibilityEventTypes.typeViewClicked);
  }
}

<CustomRadioButton
  accessibleComponentType={this.state.radioButton}
  onPress={this._onPress}/>
```

在上面这个例子里我们创建了一个自定义的单选框（CustomRadioButton），并且使其具有了和原生单选框一样的无障碍功能。具体来说，也就是 TalkBack 可以正确地通知用户当前选项的变更了。

## 测试 VoiceOver (iOS)

要开启 VoiceOver 功能，先打开 iOS 设备的设置选项。点击“通用”，然后是“辅助选项”，你会看到很多为残障人群使用手机减少障碍的工具，比如更大的字体、更高的对比度以及 VoiceOver。

在“视觉”菜单下点击 VoiceOver，将开关置为打开状态即可启用。

在辅助选项的最底部，有一个“辅助选项快捷键”，开启之后可以通过点击三次 Home 按钮来快速关闭或打开 VoiceOver 工具。

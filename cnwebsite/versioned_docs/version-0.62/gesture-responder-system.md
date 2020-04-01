---
id: version-0.62-gesture-responder-system
title: 手势响应系统
original_id: gesture-responder-system
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

移动设备上的手势识别要比在 web 上复杂得多。用户的一次触摸操作的真实意图是什么，App 要经过好几个阶段才能判断。比如 App 需要判断用户的触摸到底是在滚动页面，还是滑动一个 widget，或者只是一个单纯的点击。甚至随着持续时间的不同，这些操作还会转化。此外，还有多点同时触控的情况。

手势响应系统可以使组件在不关心父组件或子组件的前提下自行处理触摸交互。

### 最佳实践

用户之所以会觉得 web app 和原生 app 在体验上有巨大的差异，触摸响应是一大关键因素。用户的每一个操作都应该具有下列属性：

反馈/高亮 —— 让用户看到他们到底按到了什么东西，以及松开手后会发生什么。取消功能 —— 当用户正在触摸操作时，应该是可以通过把手指移开来终止操作。这些特性使得用户在使用 App 时体验更好，因为它们可以让用户大胆试用，而不必担心点错了什么。

### TouchableHighlight 与 Touchable 系列组件

响应系统用起来可能比较复杂。所以我们提供了一个抽象的`Touchable`实现，用来做“可触控”的组件。这一实现利用了响应系统，使得你可以简单地以声明的方式来配置触控处理。如果要做一个按钮或者网页链接，那么使用`TouchableHighlight`就可以。

## 响应者的生命周期

一个 View 只要实现了正确的协商方法，就可以成为触摸事件的响应者。我们通过两个方法去“询问”一个 View 是否愿意成为响应者：

* `View.props.onStartShouldSetResponder: (evt) => true,` - 在用户开始触摸的时候（手指刚刚接触屏幕的瞬间），是否愿意成为响应者？
* `View.props.onMoveShouldSetResponder: (evt) => true,` - 如果 View 不是响应者，那么在每一个触摸点开始移动（没有停下也没有离开屏幕）时再询问一次：是否愿意响应触摸交互呢？

如果 View 返回 true，并开始尝试成为响应者，那么会触发下列事件之一:

* `View.props.onResponderGrant: (evt) => {}` - View 现在要开始响应触摸事件了。这也是需要做高亮的时候，使用户知道他到底点到了哪里。
* `View.props.onResponderReject: (evt) => {}` - 响应者现在“另有其人”而且暂时不会“放权”，请另作安排。

如果 View 已经开始响应触摸事件了，那么下列这些处理函数会被一一调用：

* `View.props.onResponderMove: (evt) => {}` - 用户正在屏幕上移动手指时（没有停下也没有离开屏幕）。
* `View.props.onResponderRelease: (evt) => {}` - 触摸操作结束时触发，比如"touchUp"（手指抬起离开屏幕）。
* `View.props.onResponderTerminationRequest: (evt) => true` - 有其他组件请求接替响应者，当前的 View 是否“放权”？返回 true 的话则释放响应者权力。
* `View.props.onResponderTerminate: (evt) => {}` - 响应者权力已经交出。这可能是由于其他 View 通过`onResponderTerminationRequest`请求的，也可能是由操作系统强制夺权（比如 iOS 上的控制中心或是通知中心）。

`evt`是一个合成事件，它包含以下结构：

* `nativeEvent`
  * `changedTouches` - 在上一次事件之后，所有发生变化的触摸事件的数组集合（即上一次事件后，所有移动过的触摸点）
  * `identifier` - 触摸点的 ID
  * `locationX` - 触摸点相对于当前元素的横坐标
  * `locationY` - 触摸点相对于当前元素的纵坐标
  * `pageX` - 触摸点相对于根元素的横坐标
  * `pageY` - 触摸点相对于根元素的纵坐标
  * `target` - 触摸点所在的元素 ID
  * `timestamp` - 触摸事件的时间戳，可用于移动速度的计算
  * `touches` - 当前屏幕上的所有触摸点的集合

### 捕获 ShouldSet 事件处理

`onStartShouldSetResponder`与`onMoveShouldSetResponder`是以冒泡的形式调用的，即嵌套最深的节点最先调用。这意味着当多个 View 同时在`*ShouldSetResponder`中返回 true 时，最底层的 View 将优先“夺权”。在多数情况下这并没有什么问题，因为这样可以确保所有控件和按钮是可用的。

但是有些时候，某个父 View 会希望能先成为响应者。我们可以利用“捕获期”来解决这一需求。响应系统在从最底层的组件开始冒泡之前，会首先执行一个“捕获期”，在此期间会触发`on*ShouldSetResponderCapture`系列事件。因此，如果某个父 View 想要在触摸操作开始时阻止子组件成为响应者，那就应该处理`onStartShouldSetResponderCapture`事件并返回 true 值。

* `View.props.onStartShouldSetResponderCapture: (evt) => true,`
* `View.props.onMoveShouldSetResponderCapture: (evt) => true,`

### PanResponder

要使用更高级的手势功能，请参看[PanResponder](panresponder.md).

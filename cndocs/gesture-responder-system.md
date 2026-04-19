---
id: gesture-responder-system
title: 手势响应系统
---

手势响应系统用于管理应用中手势的生命周期。一次触摸会经历多个阶段，应用会在这个过程中判断用户的意图。例如，应用需要判断这次触摸是在滚动、在某个组件上滑动，还是在点击。而且这种判断在触摸持续期间还可能发生变化。此外，还可能存在多个同时发生的触摸。

触摸响应系统的作用，是让组件在不额外了解其父组件或子组件的前提下，协商如何处理这些触摸交互。

### 最佳实践

为了让你的应用拥有更好的体验，每一次交互都应具备以下特性：

- 反馈 / 高亮 —— 告诉用户当前是哪个元素在响应他们的触摸，以及松开手指后会发生什么。
- 可取消性 —— 当用户正在执行某个操作时，应该能够通过将手指拖离来中止它。

这些特性会让用户在使用应用时更加安心，因为它们允许人们大胆尝试和交互，而不必担心误操作。

### TouchableHighlight 与 Touchable 系列组件

响应系统用起来可能比较复杂。因此，我们为那些需要“可点按”行为的场景提供了一个抽象的 `Touchable` 实现。它基于响应系统，并允许你以声明式的方式配置点击交互。在任何你会在 Web 上使用按钮或链接的地方，都可以使用 `TouchableHighlight`。

## 响应者的生命周期

一个 View 只要实现了正确的协商方法，就可以成为触摸事件的响应者。我们通过两个方法去“询问”一个 View 是否愿意成为响应者：

- `View.props.onStartShouldSetResponder: evt => true,` - 这个 View 是否希望在触摸开始时成为响应者？
- `View.props.onMoveShouldSetResponder: evt => true,` - 当这个 View 还不是响应者时，每次触摸在其上移动都会调用此函数：这个 View 是否想要“接管”触摸响应？

如果 View 返回 true 并尝试成为响应者，则会发生以下情况之一：

- `View.props.onResponderGrant: evt => {}` - 这个 View 现在开始响应触摸事件了。此时通常应该高亮界面，让用户知道发生了什么。
- `View.props.onResponderReject: evt => {}` - 当前已有别的响应者，并且它不会释放响应权。

如果 View 正在响应触摸，则可能会调用以下处理函数：

- `View.props.onResponderMove: evt => {}` - 用户正在移动手指。
- `View.props.onResponderRelease: evt => {}` - 在触摸结束时触发，也就是“touchUp”。
- `View.props.onResponderTerminationRequest: evt => true` - 有别的元素想要成为响应者。这个 View 是否应该释放响应权？返回 true 表示允许释放。
- `View.props.onResponderTerminate: evt => {}` - 响应权已从该 View 转移走。可能是在调用 `onResponderTerminationRequest` 之后被其他 View 接管，也可能是在未询问的情况下被操作系统接管（例如 iOS 上打开控制中心或通知中心时）。

`evt` 是一个合成触摸事件，结构如下：

- `nativeEvent`
  - `changedTouches` - 自上一次事件以来发生变化的所有触摸事件数组
  - `identifier` - 触摸点的 ID
  - `locationX` - 触摸点相对于当前元素的 X 坐标
  - `locationY` - 触摸点相对于当前元素的 Y 坐标
  - `pageX` - 触摸点相对于根元素的 X 坐标
  - `pageY` - 触摸点相对于根元素的 Y 坐标
  - `target` - 接收触摸事件的元素节点 ID
  - `timestamp` - 触摸时间标识，可用于速度计算
  - `touches` - 当前屏幕上的所有触摸点数组

### 捕获 ShouldSet 事件处理

`onStartShouldSetResponder` 和 `onMoveShouldSetResponder` 采用冒泡顺序调用，最深层的节点会最先收到调用。这意味着当多个 View 在 `*ShouldSetResponder` 处理函数中都返回 true 时，最深层的组件会成为响应者。在大多数场景下，这正是我们想要的效果，因为它能确保所有控件和按钮都可用。

但有时父级组件会希望确保自己成为响应者。这时可以使用捕获阶段。在响应系统从最深层组件开始冒泡之前，会先执行一次捕获阶段，并触发 `on*ShouldSetResponderCapture`。因此，如果父级 View 想在触摸开始时阻止子组件成为响应者，它就应该在 `onStartShouldSetResponderCapture` 处理函数中返回 true。

- `View.props.onStartShouldSetResponderCapture: evt => true,`
- `View.props.onMoveShouldSetResponderCapture: evt => true,`

### PanResponder

如果你需要更高层级的手势解释能力，请参阅 [PanResponder](panresponder.md)。

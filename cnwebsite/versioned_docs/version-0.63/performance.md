---
id: version-0.63-performance
title: 性能综述
original_id: performance
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(98.98%), [280215110](https://github.com/search?q=280215110%40qq.com&type=Users)(1.02%)

使用 React Native 替代基于 WebView 的框架来开发 App 的一个强有力的理由，就是为了使 App 可以达到每秒 60 帧（足够流畅），并且能有类似原生 App 的外观和手感。因此我们也尽可能地优化 React Native 去实现这一目标，使开发者能集中精力处理 App 的业务逻辑，而不用费心考虑性能。但是，总还是有一些地方有所欠缺，以及在某些场合 React Native 还不能够替你决定如何进行优化（用原生代码写也无法避免），因此人工的干预依然是必要的。

本文的目的是教给你一些基本的知识，来帮你排查性能方面的问题，以及探讨这些问题产生的原因和推荐的解决方法。

## 关于“帧”你所需要知道的

老一辈人常常把电影称为“移动的画”，是因为视频中逼真的动态效果其实是一种幻觉，这种幻觉是由一组静态的图片以一个稳定的速度快速变化所产生的。我们把这组图片中的每一张图片叫做一帧，而每秒钟显示的帧数直接的影响了视频（或者说用户界面）的流畅度和真实感。iOS 设备提供了每秒 60 的帧率，这就留给了开发者和 UI 系统大约 16.67ms 来完成生成一张静态图片（帧）所需要的所有工作。如果在这分派的 16.67ms 之内没有能够完成这些工作，就会引发‘丢帧’的后果，使界面表现的不够流畅。

下面要讲的事情可能更为复杂：请先调出你应用的开发菜单，打开`Show FPS Monitor`. 你会注意到有两个不同的帧率.

![](assets/PerfUtil.png)

### JS 帧率(JavaScript 线程)

对大多数 React Native 应用来说，业务逻辑是运行在 JavaScript 线程上的。这是 React 应用所在的线程，也是发生 API 调用，以及处理触摸事件等操作的线程。更新数据到原生支持的视图是批量进行的，并且在事件循环每进行一次的时候被发送到原生端，这一步通常会在一帧时间结束之前处理完（如果一切顺利的话）。如果 JavaScript 线程有一帧没有及时响应，就被认为发生了一次丢帧。 例如，你在一个复杂应用的根组件上调用了`this.setState`，从而导致一次开销很大的子组件树的重绘，可想而知，这可能会花费 200ms 也就是整整 12 帧的丢失。此时，任何由 JavaScript 控制的动画都会卡住。只要卡顿超过 100ms，用户就会明显的感觉到。

这种情况经常发生在老的`Navigator`导航器的切换过程中：当你 push 一个新的路由时，JavaScript 需要绘制新场景所需的所有组件，以发送正确的命令给原生端去创建视图。由于切换是由 JavaScript 线程所控制，因此经常会占用若干帧的时间，引起一些卡顿。有的时候，组件会在`componentDidMount`函数中做一些额外的事情，这甚至可能会导致页面切换过程中多达一秒的卡顿。

另一个例子是老的触摸事件的响应：如果你正在 JavaScript 线程处理一个跨越多个帧的工作，你可能会注意到`TouchableOpacity`的响应被延迟了。这是因为 JavaScript 线程太忙了，不能够处理主线程发送过来的原始触摸事件，结果`TouchableOpacity`就不能及时响应这些事件并命令主线程的页面去调整透明度了。

### UI 帧率(主线程)

很多人会注意到，`NavigatorIOS`的性能要比老的纯 JS 实现的`Navigator`好的多。原因就是它的切换动画是完全在主线程上执行的，因此不会被 JavaScript 线程上的掉帧所影响。

同样，当 JavaScript 线程卡住的时候，你仍然可以欢快的上下滚动`ScrollView`，因为`ScrollView`运行在主线程之上（尽管滚动事件会被分发到 JS 线程，但是接收这些事件对于滚动这个动作来说并不必要）。

## 性能问题的常见原因

### 开发模式 (`dev=true`)

JavaScript 线程的性能在开发模式下是很糟糕的。这是不可避免的，因为有许多工作需要在运行的时候去做，譬如使你获得良好的警告和错误信息，又比如验证属性类型（propTypes）以及产生各种其他的警告。请务必注意在[release 模式](running-on-device.md#发布应用)下去测试性能。

### console.log 语句

在运行打好了离线包的应用时，控制台大量打印语句可能会拖累 JavaScript 线程。注意有些第三方调试库也可能包含控制台打印语句，比如[redux-logger](https://github.com/evgenyrodionov/redux-logger)，所以在发布应用前请务必仔细检查，确保全部移除。

> 有个[babel 插件](https://babeljs.io/docs/plugins/transform-remove-console/)可以帮你移除所有的`console.*`调用。首先需要使用`yarn add --dev babel-plugin-transform-remove-console`来安装，然后在项目根目录下编辑（或者是新建）一个名为·.babelrc`的文件，在其中加入：

```json
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

这样在打包发布时，所有的控制台语句就会被自动移除，而在调试时它们仍然会被正常调用。

### `ListView` 首次渲染缓慢或者由于列表很大导致滑动很慢

用新的[`FlatList`](flatlist)或者[`SectionList`](sectionlist)组件替代。除了简化了 API，这些新的列表组件在性能方面都有了极大的提升, 其中最主要的一个是无论列表有多少行，它的内存使用都是常数级的。

如果你的[`FlatList`](flatlist)渲染得很慢, 请确保你使用了[`getItemLayout`](flatlist.md#getitemlayout)，它通过跳过对 items 的处理来优化你的渲染速度。

### 在重绘一个几乎没有什么变化的页面时，JS 帧率严重降低

你可以实现`shouldComponentUpdate`函数来指明在什么样的确切条件下，你希望这个组件得到重绘。如果你编写的是纯粹的组件（界面完全由 props 和 state 所决定），你可以利用`PureComponent`来为你做这个工作。再强调一次，不可变的数据结构（immutable，即对于引用类型数据，不修改原值，而是复制后修改并返回新值）在提速方面非常有用 —— 当你不得不对一个长列表对象做一个深度的比较，它会使重绘你的整个组件更加快速，而且代码量更少。

### Dropping JS thread FPS because of doing a lot of work on the JavaScript thread at the same time

"Slow Navigator transitions" is the most common manifestation of this, but there are other times this can happen. Using InteractionManager can be a good approach, but if the user experience cost is too high to delay work during an animation, then you might want to consider LayoutAnimation.

The Animated API currently calculates each keyframe on-demand on the JavaScript thread unless you [set `useNativeDriver: true`](/blog/2017/02/14/using-native-driver-for-animated.html#how-do-i-use-this-in-my-app), while LayoutAnimation leverages Core Animation and is unaffected by JS thread and main thread frame drops.

One case where I have used this is for animating in a modal (sliding down from top and fading in a translucent overlay) while initializing and perhaps receiving responses for several network requests, rendering the contents of the modal, and updating the view where the modal was opened from. See the Animations guide for more information about how to use LayoutAnimation.

Caveats:

- LayoutAnimation only works for fire-and-forget animations ("static" animations) -- if it must be interruptible, you will need to use `Animated`.

### 在屏幕上移动视图（滚动，切换，旋转）时，UI 线程掉帧

当具有透明背景的文本位于一张图片上时，或者在每帧重绘视图时需要用到透明合成的任何其他情况下，这种现象尤为明显。设置`shouldRasterizeIOS`或者`renderToHardwareTextureAndroid`属性可以显著改善这一现象。注意不要过度使用该特性，否则你的内存使用量将会飞涨。在使用时，要评估你的性能和内存使用情况。如果你没有需要移动这个视图的需求，请关闭这一属性。

### 使用动画改变图片的尺寸时，UI 线程掉帧

在 iOS 上，每次调整 Image 组件的宽度或者高度，都需要重新裁剪和缩放原始图片。这个操作开销会非常大，尤其是大的图片。比起直接修改尺寸，更好的方案是使用`transform: [{scale}]`的样式属性来改变尺寸。比如当你点击一个图片，要将它放大到全屏的时候，就可以使用这个属性。

### Touchable 系列组件不能很好的响应

有些时候，如果我们有一项操作与点击事件所带来的透明度改变或者高亮效果发生在同一帧中，那么有可能在`onPress`函数结束之前我们都看不到这些效果。比如在`onPress`执行了一个`setState`的操作，这个操作需要大量计算工作并且导致了掉帧。对此的一个解决方案是将`onPress`处理函数中的操作封装到`requestAnimationFrame`中：

```jsx
handleOnPress() {
  requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```

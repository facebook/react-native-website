---
id: version-0.49-android-ui-performance
title: 调试Android UI性能
original_id: android-ui-performance
---

我们尽最大的努力来争取使UI组件的性能如丝般顺滑，但有的时候这根本不可能做到。要知道，Android有超过一万种不同型号的手机，而在框架底层进行软件渲染的时候是统一处理的，这意味着你没办法像iOS那样自由。不过有些时候，你还是可以想办法提升应用的性能（有的时候问题根本不是出在原生代码上！）

要想解决应用的性能问题，第一步就是搞明白在每个16毫秒的帧中，时间都去哪儿了。为此，我们会使用一个标准的Android性能分析工具`systrace`，不过在此之前……

> 请先确定JS的开发者模式已经关闭！
>
> 你应该在应用的日志里看到`__DEV__ === false, development-level warning are OFF, performance optimizations are ON`等字样（你可以通过adb logcat来查看应用日志）

## 使用Systrace进行性能分析

Systrace是一个标准的基于标记的Android性能分析工具（如果你安装了Android platform-tool包，它也会一同安装）。被调试的代码段在开始和结束处加上标记，在执行的过程中标记会被记录，最后会以图表形式展现统计结果。包括Android SDK自己和React Native框架都已经提供了标准的标记供你查看。

### 收集一次数据

> 注意:
>
> Systrace从React Native `v0.15`版本开始支持。你需要在此版本下构建项目才能收集相应的性能数据。

首先，把你想分析的、运行不流畅的设备使用USB线链接到电脑上，然后操作应用来到你想分析的导航/动画之前，接着这样运行systrace：

```
$ <AndroidSDK所在目录>/platform-tools/systrace/systrace.py --time=10 -o trace.html sched gfx view -a <你的应用包名>
```

对于此命令做一个简单的说明：

- `time`参数控制本次数据收集的持续时间，单位是秒。
- `schd`, `gfx`, 和`view`是我们所关心的Android SDK内置的tag（标记的集合）：`schd`提供了你的设备的每个CPU核心正在做什么的信息，`gfx`提供了你的图形相关信息，譬如每帧的时间范围，而`view`提供了一些关于视图布局和渲染相关性能的信息。
- `-a <你的应用包名>`启用了针对应用的过滤。在这里填写你用React Native创建的应用包名。`你的应用包名`可以在你应用中的`AndroidManifest.xml`里找到，形如`com.example.app`

_译注_：实际上，AndroidManifest.xml里的应用包名会被`app/build.gradle`里的`applicationId`取代。如果二者不一致，应当以`app/build.gradle`里的为准。

一旦systrace开始收集数据，你可以操作应用执行你所关心的动画和操作。在收集结束后，systrace会给你提供一个链接，你可以在浏览器中打开这个链接来查看数据收集的结果。

## 查看性能数据

在浏览器中打开数据页面（建议使用Chrome），你应该能看到类似这样的结果：

![Example](img/SystraceExample.png)

**提示**: 你可以使用WSAD键来滚动和缩放性能数据图表。

### 启用垂直同步高亮

接下来你首先应该启用16毫秒帧区间的高亮。在屏幕顶端点击对应的复选框：

![Enable VSync Highlighting](img/SystraceHighlightVSync.png)

然后你应该能在屏幕上看到类似上图的斑马状条纹。如果你无法看到这样的条纹，可以尝试换一台设备来进行分析：部分三星手机显示垂直同步高亮存在已知问题，而Nexus系列大部分情况都相当可靠。

### 找到你的进程

滚动图表直到你找到你的应用包名。在上面的例子里，我正在分析`com.facebook.adsmanager`，由于内核的线程名字长度限制，它会显示成`book.adsmanager`。

在左侧，你应该能看到一系列线程对应着右边的时间轴。有3到4个线程是我们必须关注的：UI线程(名字可能是`UI Thread`或者是你的包名), `mqt_js`和`mqt_native_modules`。如果你在Android 5.0以上版本运行，我们还需要关注`Render`（渲染）线程。

### UI 线程

标准的Android布局和绘制都在UI线程里发生。右侧显示的线程名字会是你的包名(在我的例子里是book.adsmanager)或者UI Thread.你在这个线程里看到的事件可能会是一些`Choreographer`, `traversals`或者`DispatchUI`：

![UI Thread Example](img/SystraceUIThreadExample.png)

### JS线程

这是用于执行JavaScript代码的线程。根据Android系统版本或者设备的不同，线程名可能是`mqt_js`或者`<...>`。如果看不到对应的名字的话，寻找类似`JSCall`，`Bridge.executeJSCall`这样的事件。

![JS Thread Example](img/SystraceJSThreadExample.png)

### 原生模块线程

这里是用于原生模块执行代码(譬如`UIManager`)的线程，线程名可能是`mqt_native_modules`或`<...>`。在后一种情况下，寻找类似`NativeCall`, `CallJavaModuleMethod`, 还有`onBatchComplete`这样的事件名：

![Native Modules Thread Example](img/SystraceNativeModulesThreadExample.png)

### 额外的：渲染线程

如果你在使用Android L(5.0)或者更高版本，你应该还会在你的应用里看到一个渲染线程。这个线程真正生成OpenGL渲染序列来渲染你的UI。这个线程的名字可能为`RenderThread`或者`<...>`，在后一种情况下，寻找类似`DrawFrame`或`queueBuffer`这样的事件：

![Render Thread Example](img/SystraceRenderThreadExample.png)

## 寻找导致卡顿的罪魁祸首

一个流畅的动画应该看起来像这样：

![Smooth Animation](img/SystraceWellBehaved.png)

每个背景颜色不同的部分我们称作“一帧”——记住要渲染一个流畅的帧，我们所有的界面工作都需要在16毫秒内完成。注意没有任何一个线程在靠近帧的边界处工作。类似这样的一个应用程序就正在60FPS(帧每秒)的情况下流畅表现。

如果你发现一些起伏的地方，譬如这样：

![Choppy Animation from JS](img/SystraceBadJS.png)

注意在上图中JS线程基本上一直在执行，并且超越了帧的边界。这个应用就没法以60FPS渲染了。在这种情况下，**问题出在JS中**。

你还有可能会看到一些类似这样的东西：

![Choppy Animation from UI](img/SystraceBadUI.png)

在这种情况下，UI和渲染线程有一些重负荷的工作，以至于超越了帧的边界。这可能是由于我们每帧试图渲染的UI太多了导致的。在这种情况下，**问题出在需要渲染的原生视图上**。

并且，你还应该能看到一些可以指导接下来优化工作的有用的信息。

## JS的问题

如果你发现问题出在JS上，在你正在执行的JS代码中寻找线索。在上面的图中，我们会发现`RCTEventEmitter`每帧被执行了很多次。这是上面的数据统计放大后的内容：

![Too much JS](img/SystraceBadJS2.png)

这看起来不是很正常，为什么事件被调用的如此频繁？它们是不同的事件吗？具体的答案取决于你的产品的代码。在许多情况下，你可能需要看看[shouldComponentUpdate](https://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate)的介绍。

> **TODO**: 我们还在准备更多的JS性能分析的工具，会在将来的版本中加入。

## 原生UI问题

如果你发现问题出在原生UI上，有两种常见的情况：

1. 你每帧在渲染的UI给GPU带来了太重的负载，或者：
2. 你在动画、交互的过程中不断创建新的UI对象（譬如在scroll的过程中加载新的内容）

### GPU负担过重

在第一种情况下，你应该能看到UI线程的图表类似这样：

![Overloaded GPU](img/SystraceBadUI.png)

注意`DrawFrame`花费了很多时间，超越了帧的边界。这些时间用来等待GPU获取它的操作缓存。

要缓解这个问题，你应该：

- 检查`renderToHardwareTextureAndroid`的使用，有这个属性的View的子节点正在进行动画或变形会导致性能大幅下降(譬如`Navigator`提供的滑动、淡入淡出动画)。
- 确保你**没有**使用`needsOffscreenAlphaCompositing`，这个默认是关闭的，因为它在大部分情况下都会带来GPU消耗的大幅提升。

如果这还不能帮你解决问题，你可能需要更深入的探索GPU到底在做什么。参见[Tracer for OpenGL ES](http://developer.android.com/tools/help/gltracer.html)。

### 在UI线程创建大量视图

如果是第二种情况，你可能会看到类似这样的结果：

![Creating Views](img/SystraceBadCreateUI.png)

注意一开始JS线程工作了很久，然后你看到原生模块线程干了些事情，最后带来了UI线程的巨大开销。

这个问题并没有什么简单直接的优化办法，除非你能把创建UI的步骤推迟到交互结束以后去进行，或者你能直接简化你所要创建的UI。React Native小组正在架构层设法提供一个方案，使得新的UI视图可以在主线程之外去创建和配置，这样就可以使得交互变得更加流畅。

## 还是没搞定？

如果你还是很迷惑或者不知如何进展，你可以在[Stack Overflow的react-native标签下](http://stackoverflow.com/tags/react-native)提交一个问题。如果你在这里得不到响应，或者找到了一个核心组件的问题，你可以[提交一个Github issue](https://github.com/facebook/react-native/issues)给我们。

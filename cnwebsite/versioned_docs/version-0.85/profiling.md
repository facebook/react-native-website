---
id: profiling
title: 性能分析
---

性能分析是分析应用程序的性能、资源使用情况和行为以识别潜在瓶颈或低效率的过程。使用性能分析工具来确保您的应用在不同设备和条件下流畅运行是非常值得的。

对于 iOS，Instruments 是一个非常宝贵的工具，而在 Android 上，您应该学习使用 [Android Studio Profiler](profiling.md#profiling-android-ui-performance-with-system-tracing)。

但首先，[**确保开发模式已关闭！**](performance.md#running-in-development-mode-devtrue)

## 使用系统跟踪分析 Android UI 性能

Android 支持 10k+ 不同的手机，并被泛化以支持软件渲染：框架架构和需要跨多个硬件目标泛化的需求不幸意味着相对于 iOS，您获得的免费优化较少。但有时，您可以改进一些东西 —— 而且很多时候根本不是原生代码的问题！

调试这种卡顿的第一步是回答一个基本问题：在每个 16ms 帧期间，您的时间花在哪里。为此，我们将使用 [Android Studio 中内置的系统跟踪分析器](https://developer.android.com/studio/profile)。

### 1. 收集跟踪

首先，通过 USB 将表现出您想要调查的卡顿的设备连接到计算机。在 Android Studio 中打开项目的 `android` 文件夹，在右上方窗格中选择您的设备，然后[以可分析模式运行您的项目](https://developer.android.com/studio/profile#build-and-run)。

当您的应用以可分析模式构建并在设备上运行时，将应用调整到您想要分析的导航/动画之前的位置，然后在 Android Studio Profiler 窗格中启动["捕获系统活动"任务](https://developer.android.com/studio/profile#start-profiling)。

一旦跟踪开始收集，执行您关心的动画或交互。然后按"停止录制"。您现在可以[直接在 Android Studio 中检查跟踪](https://developer.android.com/studio/profile/jank-detection)。或者，您可以在"过去的录制"窗格中选择它，按"导出录制"，然后在 [Perfetto](https://perfetto.dev/) 等工具中打开它。

### 2. 阅读跟踪

在 Android Studio 或 Perfetto 中打开跟踪后，您应该会看到类似这样的内容：

![示例](/docs/assets/SystraceExample.png)

:::note 提示
使用 WASD 键进行平移和缩放。
:::

具体的 UI 可能不同，但无论您使用哪种工具，以下说明都适用。

:::info 启用 VSync 高亮
勾选屏幕右上角的此复选框以突出显示 16ms 帧边界：

![启用 VSync 高亮](/docs/assets/SystraceHighlightVSync.png)

您应该看到如上面屏幕截图中的斑马条纹。如果没有看到，请尝试在不同设备上进行分析：众所周知，三星在显示 vsyncs 方面存在问题，而 Nexus 系列通常相当可靠。
:::

### 3. 查找您的进程

滚动直到您看到包名称的（部分）。在这种情况下，我正在分析 `com.facebook.adsmanager`，它显示为 `book.adsmanager`，因为内核中愚蠢的线程名称限制。

在左侧，您将看到一组线程，它们对应于右侧的时间线行。有几个我们关心的线程：UI 线程（具有您的包名称或名称 UI Thread）、`mqt_js` 和 `mqt_native_modules`。如果您在 Android 5+ 上运行，我们还关心 Render Thread。

- **UI Thread（UI 线程）。** 这是标准 Android 测量/布局/绘制发生的地方。右侧的线程名称将是您的包名称（在我的例子中是 book.adsmanager）或 UI Thread。您在此线程上看到的事件应该看起来像这样，并且与 `Choreographer`、`traversals` 和 `DispatchUI` 有关：

  ![UI 线程示例](/docs/assets/SystraceUIThreadExample.png)

- **JS Thread（JS 线程）。** 这是执行 JavaScript 的地方。线程名称将是 `mqt_js` 或 `<...>`，具体取决于设备上的内核有多配合。如果它没有名称，要识别它，请查找 `JSCall`、`Bridge.executeJSCall` 等：

  ![JS 线程示例](/docs/assets/SystraceJSThreadExample.png)

- **Native Modules Thread（原生模块线程）。** 这是执行原生模块调用（例如 `UIManager`）的地方。线程名称将是 `mqt_native_modules` 或 `<...>`。要在后一种情况下识别它，请查找 `NativeCall`、`callJavaModuleMethod` 和 `onBatchComplete` 等：

  ![原生模块线程示例](/docs/assets/SystraceNativeModulesThreadExample.png)

- **额外：Render Thread（渲染线程）。** 如果您使用的是 Android L (5.0) 及更高版本，您的应用程序中还将有一个渲染线程。此线程生成用于绘制 UI 的实际 OpenGL 命令。线程名称将是 `RenderThread` 或 `<...>`。要在后一种情况下识别它，请查找 `DrawFrame` 和 `queueBuffer` 等：

  ![渲染线程示例](/docs/assets/SystraceRenderThreadExample.png)

## 识别罪魁祸首

流畅的动画应该看起来像下面这样：

![流畅动画](/docs/assets/SystraceWellBehaved.png)

每次颜色变化都是一帧 —— 请记住，为了显示一帧，我们所有的 UI 工作都需要在 16ms 期间结束之前完成。请注意，没有线程在接近帧边界的地方工作。像这样渲染的应用程序以 60 FPS 渲染。

但是，如果您注意到卡顿，您可能会看到如下内容：

![JS 导致的卡顿动画](/docs/assets/SystraceBadJS.png)

请注意，JS 线程几乎一直在执行，并且跨越了帧边界！此应用程序未以 60 FPS 渲染。在这种情况下，**问题出在 JS 中**。

您也可能看到如下内容：

![UI 导致的卡顿动画](/docs/assets/SystraceBadUI.png)

在这种情况下，UI 和渲染线程是跨越帧边界的工作线程。我们试图在每一帧上渲染的 UI 需要完成太多工作。在这种情况下，**问题出在正在渲染的原生视图中**。

此时，您将获得一些非常有用的信息来指导您的下一步。

## 解决 JavaScript 问题

如果您发现了 JS 问题，请在您正在执行的特定 JS 中寻找线索。在上面的场景中，我们看到 `RCTEventEmitter` 每帧被调用多次。这是上面跟踪中 JS 线程的放大图：

![太多 JS](/docs/assets/SystraceBadJS2.png)

这似乎不对。为什么它被调用得如此频繁？它们实际上是不同的事件吗？这些问题的答案可能取决于您的产品代码。很多时候，您需要查看 [shouldComponentUpdate](https://react.dev/reference/react/Component#shouldcomponentupdate)。

## 解决原生 UI 问题

如果您发现了原生 UI 问题，通常有两种情况：

1. 您试图在每一帧上绘制的 UI 涉及 GPU 上的太多工作，或
2. 您在动画/交互期间构造新的 UI（例如，在滚动期间加载新内容）。

### GPU 工作过多

在第一种情况下，您将看到一个跟踪，其中 UI 线程和/或渲染线程看起来像这样：

![GPU 过载](/docs/assets/SystraceBadUI.png)

注意在 `DrawFrame` 中花费的大量时间跨越了帧边界。这是等待 GPU 从上一帧排空其命令缓冲区所花费的时间。

要缓解这个问题，您应该：

- 调查对正在进行动画/转换的复杂静态内容使用 `renderToHardwareTextureAndroid`（例如 `Navigator` 滑动/alpha 动画）
- 确保您**没有**使用 `needsOffscreenAlphaCompositing`，它默认是禁用的，因为在大多数情况下，它会大大增加 GPU 的每帧负载。

### 在 UI 线程上创建新视图

在第二种情况下，您将看到更像这样的内容：

![创建视图](/docs/assets/SystraceBadCreateUI.png)

注意首先 JS 线程思考了一会儿，然后您会看到在原生模块线程上完成的一些工作，然后是 UI 线程上的一个昂贵的遍历。

除非您能够推迟在交互之后创建新 UI，或者您能够简化正在创建的 UI，否则没有快速的方法来缓解这个问题。React Native 团队正在开发一个基础设施级解决方案，该方案将允许在主线程之外创建和配置新 UI，从而允许交互继续顺畅进行。

### 查找原生 CPU 热点

如果问题似乎在原生端，您可以使用 [CPU 热点分析器](https://developer.android.com/studio/profile/record-java-kotlin-methods)获取有关正在发生的事情的更多详细信息。打开 Android Studio Profiler 面板并选择"查找 CPU 热点（Java/Kotlin 方法录制）"。

:::info 选择 Java/Kotlin 录制

确保选择"查找 CPU 热点 **（Java/Kotlin 录制）**"而不是"查找 CPU 热点（调用栈采样）"。它们具有相似的图标但执行不同的操作。
:::

执行交互并按"停止录制"。录制是资源密集型的，因此保持交互简短。然后，您可以在 Android Studio 中检查生成的跟踪，或将其导出并在 [Firefox Profiler](https://profiler.firefox.com/) 等在线工具中打开它。

与系统跟踪不同，CPU 热点分析速度很慢，因此不会给您准确的测量结果。但是，它应该让您了解正在调用哪些原生方法，以及在每一帧期间时间按比例花在哪里。

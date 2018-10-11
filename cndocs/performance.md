---
id: performance
title: 性能
---

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

在运行打好了离线包的应用时，控制台打印语句可能会极大地拖累 JavaScript 线程。注意有些第三方调试库也可能包含控制台打印语句，比如[redux-logger](https://github.com/evgenyrodionov/redux-logger)，所以在发布应用前请务必仔细检查，确保全部移除。

> 这里有个小技巧可以在发布时屏蔽掉所有的`console.*`调用。React Native 中有一个全局变量`__DEV__`用于指示当前运行环境是否是开发环境。我们可以据此在正式环境中替换掉系统原先的 console 实现。

```js
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  };
}
```

这样在打包发布时，所有的控制台语句就会被自动替换为空函数，而在调试时它们仍然会被正常调用。

> 还有个[babel 插件](https://babeljs.io/docs/plugins/transform-remove-console/)可以帮你移除所有的`console.*`调用。首先需要使用`yarn add --dev babel-plugin-transform-remove-console`来安装，然后在项目根目录下编辑（或者是新建）一个名为·.babelrc`的文件，在其中加入：

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

用新的[`FlatList`](flatlist.md)或者[`SectionList`](sectionlist.md)组件替代。除了简化了API，这些新的列表组件在性能方面都有了极大的提升, 其中最主要的一个是无论列表有多少行，它的内存使用都是常数级的。

如果你的[`FlatList`](flatlist.md)渲染得很慢, 请确保你使用了[`getItemLayout`](flatlist.md#getitemlayout)，它通过跳过对items的处理来优化你的渲染速度。

### 在重绘一个几乎没有什么变化的页面时，JS 帧率严重降低

你可以实现`shouldComponentUpdate`函数来指明在什么样的确切条件下，你希望这个组件得到重绘。如果你编写的是纯粹的组件（界面完全由 props 和 state 所决定），你可以利用`PureComponent`来为你做这个工作。再强调一次，不可变的数据结构（immutable，即对于引用类型数据，不修改原值，而是复制后修改并返回新值）在提速方面非常有用 —— 当你不得不对一个长列表对象做一个深度的比较，它会使重绘你的整个组件更加快速，而且代码量更少。

### 在屏幕上移动视图（滚动，切换，旋转）时，UI 线程掉帧

当具有透明背景的文本位于一张图片上时，或者在每帧重绘视图时需要用到透明合成的任何其他情况下，这种现象尤为明显。设置`shouldRasterizeIOS`或者`renderToHardwareTextureAndroid`属性可以显著改善这一现象。
注意不要过度使用该特性，否则你的内存使用量将会飞涨。在使用时，要评估你的性能和内存使用情况。如果你没有需要移动这个视图的需求，请关闭这一属性。

### 使用动画改变图片的尺寸时，UI 线程掉帧

在 iOS 上，每次调整 Image 组件的宽度或者高度，都需要重新裁剪和缩放原始图片。这个操作开销会非常大，尤其是大的图片。比起直接修改尺寸，更好的方案是使用`transform: [{scale}]`的样式属性来改变尺寸。比如当你点击一个图片，要将它放大到全屏的时候，就可以使用这个属性。

### Touchable 系列组件不能很好的响应

有些时候，如果我们有一项操作与点击事件所带来的透明度改变或者高亮效果发生在同一帧中，那么有可能在`onPress`函数结束之前我们都看不到这些效果。比如在`onPress`执行了一个`setState`的操作，这个操作需要大量计算工作并且导致了掉帧。对此的一个解决方案是将`onPress`处理函数中的操作封装到`requestAnimationFrame`中：

```javascript
handleOnPress() {
  // 谨记在使用requestAnimationFrame、setTimeout以及setInterval时
  // 要使用TimerMixin（其作用是在组件unmount时，清除所有定时器）
  this.requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```

## 分析

你可以利用内置的分析器来同时获取 JavaScript 线程和主线程中代码执行情况的详细信息。

对于 iOS 来说，Instruments 是一个宝贵的工具库，Android 的话可以使用 systrace，具体可以参考下面的`使用 systrace 调试 Android UI 性能`。

But first, [**make sure that Development Mode is OFF!**](performance.md#running-in-development-mode-dev-true) You should see `__DEV__ === false, development-level warning are OFF, performance optimizations are ON` in your application logs.

Another way to profile JavaScript is to use the Chrome profiler while debugging. This won't give you accurate results as the code is running in Chrome but will give you a general idea of where bottlenecks might be. Run the profiler under Chrome's `Performance` tab. A flame graph will appear under `User Timing`. To view more details in tabular format, click at the `Bottom Up` tab below and then select `DedicatedWorker Thread` at the top left menu.

### 使用 systrace 调试 Android UI 性能

Android supports 10k+ different phones and is generalized to support software rendering: the framework architecture and need to generalize across many hardware targets unfortunately means you get less for free relative to iOS. But sometimes, there are things you can improve -- and many times it's not native code's fault at all!

The first step for debugging this jank is to answer the fundamental question of where your time is being spent during each 16ms frame. For that, we'll be using a standard Android profiling tool called `systrace`.

`systrace` is a standard Android marker-based profiling tool (and is installed when you install the Android platform-tools package). Profiled code blocks are surrounded by start/end markers which are then visualized in a colorful chart format. Both the Android SDK and React Native framework provide standard markers that you can visualize.

#### 1. Collecting a trace

First, connect a device that exhibits the stuttering you want to investigate to your computer via USB and get it to the point right before the navigation/animation you want to profile. Run `systrace` as follows:

```
$ <path_to_android_sdk>/platform-tools/systrace/systrace.py --time=10 -o trace.html sched gfx view -a <your_package_name>
```

A quick breakdown of this command:

- `time` is the length of time the trace will be collected in seconds
- `sched`, `gfx`, and `view` are the android SDK tags (collections of markers) we care about: `sched` gives you information about what's running on each core of your phone, `gfx` gives you graphics info such as frame boundaries, and `view` gives you information about measure, layout, and draw passes
- `-a <your_package_name>` enables app-specific markers, specifically the ones built into the React Native framework. `your_package_name` can be found in the `AndroidManifest.xml` of your app and looks like `com.example.app`

Once the trace starts collecting, perform the animation or interaction you care about. At the end of the trace, systrace will give you a link to the trace which you can open in your browser.

#### 2. Reading the trace

After opening the trace in your browser (preferably Chrome), you should see something like this:

![Example](assets/SystraceExample.png)

> **HINT**: Use the WASD keys to strafe and zoom

If your trace .html file isn't opening correctly, check your browser console for the following:

![ObjectObserveError](assets/ObjectObserveError.png)

Since `Object.observe` was deprecated in recent browsers, you may have to open the file from the Google Chrome Tracing tool. You can do so by:

- Opening tab in chrome chrome://tracing
- Selecting load
- Selecting the html file generated from the previous command.

> **Enable VSync highlighting**
>
> Check this checkbox at the top right of the screen to highlight the 16ms frame boundaries:
>
> ![Enable VSync Highlighting](assets/SystraceHighlightVSync.png)
>
> You should see zebra stripes as in the screenshot above. If you don't, try profiling on a different device: Samsung has been known to have issues displaying vsyncs while the Nexus series is generally pretty reliable.

#### 3. Find your process

Scroll until you see (part of) the name of your package. In this case, I was profiling `com.facebook.adsmanager`, which shows up as `book.adsmanager` because of silly thread name limits in the kernel.

On the left side, you'll see a set of threads which correspond to the timeline rows on the right. There are a few threads we care about for our purposes: the UI thread (which has your package name or the name UI Thread), `mqt_js`, and `mqt_native_modules`. If you're running on Android 5+, we also care about the Render Thread.

- **UI Thread.** This is where standard android measure/layout/draw happens. The thread name on the right will be your package name (in my case book.adsmanager) or UI Thread. The events that you see on this thread should look something like this and have to do with `Choreographer`, `traversals`, and `DispatchUI`:

  ![UI Thread Example](assets/SystraceUIThreadExample.png)

- **JS Thread.** This is where JavaScript is executed. The thread name will be either `mqt_js` or `<...>` depending on how cooperative the kernel on your device is being. To identify it if it doesn't have a name, look for things like `JSCall`, `Bridge.executeJSCall`, etc:

  ![JS Thread Example](assets/SystraceJSThreadExample.png)

- **Native Modules Thread.** This is where native module calls (e.g. the `UIManager`) are executed. The thread name will be either `mqt_native_modules` or `<...>`. To identify it in the latter case, look for things like `NativeCall`, `callJavaModuleMethod`, and `onBatchComplete`:

  ![Native Modules Thread Example](assets/SystraceNativeModulesThreadExample.png)

- **Bonus: Render Thread.** If you're using Android L (5.0) and up, you will also have a render thread in your application. This thread generates the actual OpenGL commands used to draw your UI. The thread name will be either `RenderThread` or `<...>`. To identify it in the latter case, look for things like `DrawFrame` and `queueBuffer`:

  ![Render Thread Example](assets/SystraceRenderThreadExample.png)

#### Identifying a culprit

A smooth animation should look something like the following:

![Smooth Animation](assets/SystraceWellBehaved.png)

Each change in color is a frame -- remember that in order to display a frame, all our UI work needs to be done by the end of that 16ms period. Notice that no thread is working close to the frame boundary. An application rendering like this is rendering at 60 FPS.

If you noticed chop, however, you might see something like this:

![Choppy Animation from JS](assets/SystraceBadJS.png)

Notice that the JS thread is executing basically all the time, and across frame boundaries! This app is not rendering at 60 FPS. In this case, **the problem lies in JS**.

You might also see something like this:

![Choppy Animation from UI](assets/SystraceBadUI.png)

In this case, the UI and render threads are the ones that have work crossing frame boundaries. The UI that we're trying to render on each frame is requiring too much work to be done. In this case, **the problem lies in the native views being rendered**.

At this point, you'll have some very helpful information to inform your next steps.

#### Resolving JavaScript issues

If you identified a JS problem, look for clues in the specific JS that you're executing. In the scenario above, we see `RCTEventEmitter` being called multiple times per frame. Here's a zoom-in of the JS thread from the trace above:

![Too much JS](assets/SystraceBadJS2.png)

This doesn't seem right. Why is it being called so often? Are they actually different events? The answers to these questions will probably depend on your product code. And many times, you'll want to look into [shouldComponentUpdate](https://facebook.github.io/react/component-specs.md#updating-shouldcomponentupdate).

#### Resolving native UI Issues

If you identified a native UI problem, there are usually two scenarios:

1.  the UI you're trying to draw each frame involves too much work on the GPU, or
2.  You're constructing new UI during the animation/interaction (e.g. loading in new content during a scroll).

##### Too much GPU work

In the first scenario, you'll see a trace that has the UI thread and/or Render Thread looking like this:

![Overloaded GPU](assets/SystraceBadUI.png)

Notice the long amount of time spent in `DrawFrame` that crosses frame boundaries. This is time spent waiting for the GPU to drain its command buffer from the previous frame.

To mitigate this, you should:

- investigate using `renderToHardwareTextureAndroid` for complex, static content that is being animated/transformed (e.g. the `Navigator` slide/alpha animations)
- make sure that you are **not** using `needsOffscreenAlphaCompositing`, which is disabled by default, as it greatly increases the per-frame load on the GPU in most cases.

If these don't help and you want to dig deeper into what the GPU is actually doing, you can check out [Tracer for OpenGL ES](http://developer.android.com/tools/help/gltracer.html).

##### Creating new views on the UI thread

In the second scenario, you'll see something more like this:

![Creating Views](assets/SystraceBadCreateUI.png)

Notice that first the JS thread thinks for a bit, then you see some work done on the native modules thread, followed by an expensive traversal on the UI thread.

There isn't an easy way to mitigate this unless you're able to postpone creating new UI until after the interaction, or you are able to simplify the UI you're creating. The react native team is working on an infrastructure level solution for this that will allow new UI to be created and configured off the main thread, allowing the interaction to continue smoothly.

## 拆包(RAM bundles)和内联引用

如果你有一个较为庞大的应用程序，你可能要考虑使用`RAM`(Random Access Modules，随机存取模块）格式的 bundle 和内联引用。这对于具有大量页面的应用程序是非常有用的，这些页面在应用程序的典型使用过程中可能不会被打开。通常对于启动后一段时间内不需要大量代码的应用程序来说是非常有用的。例如应用程序包含复杂的配置文件屏幕或较少使用的功能，但大多数会话只涉及访问应用程序的主屏幕更新。我们可以通过使用`RAM`格式来优化`bundle`的加载，并且内联引用这些功能和页面（当它们被实际使用时）。

### 加载 JavaScript

在 react-native 执行 JS 代码之前，必须将代码加载到内存中并进行解析。如果你加载了一个 50MB 的 bundle，那么所有的 50mb 都必须被加载和解析才能被执行。RAM 格式的 bundle 则对此进行了优化，即启动时只加载 50MB 中实际需要的部分，之后再逐渐按需加载更多的包。

### 内联引用

内联引用(require 代替 import)可以延迟模块或文件的加载，直到实际需要该文件。一个基本的例子看起来像这样：

#### 优化前

```
import React, { Component } from 'react';
import { Text } from 'react-native';
// ... import some very expensive modules

// You may want to log at the file level to verify when this is happening
console.log('VeryExpensive component loaded');

export default class VeryExpensive extends Component {
  // lots and lots of code
  render() {
    return <Text>Very Expensive Component</Text>;
  }
}
```

#### 优化后

```
import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

let VeryExpensive = null;

export default class Optimized extends Component {
  state = { needsExpensive: false };

  didPress = () => {
    if (VeryExpensive == null) {
      VeryExpensive = require('./VeryExpensive').default;
    }

    this.setState(() => ({
      needsExpensive: true,
    }));
  };

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={this.didPress}>
          <Text>Load</Text>
        </TouchableOpacity>
        {this.state.needsExpensive ? <VeryExpensive /> : null}
      </View>
    );
  }
}
```

即便不使用 RAM 格式，内联引用也会使启动时间减少，因为优化后的代码只有在第一次 require 时才会执行。

### 启用 RAM 格式

在 iOS 上使用 RAM 格式将创建一个简单的索引文件，React Native 将根据此文件一次加载一个模块。在 Android 上，默认情况下它会为每个模块创建一组文件。你可以像 iOS 一样，强制 Android 只创建一个文件，但使用多个文件可以提高性能，并降低内存占用。

在 Xcode 中启用 RAM 格式，需要编辑 build phase 里的"Bundle React Native code and images"。在`../node_modules/react-native/scripts/react-native-xcode.sh.sh`中添加 `export BUNDLE_COMMAND="ram-bundle"`:

```
export BUNDLE_COMMAND="ram-bundle"
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh.sh
```

在 Android 上启用 RAM 格式，需要编辑 android/app/build.gradle 文件。在`apply from: "../../node_modules/react-native/react.gradle"`之前修改或添加`project.ext.react`：

```
project.ext.react = [
  bundleCommand: "ram-bundle",
]
```

如果在 Android 上，你想使用单个索引文件（如前所述），请在 Android 上使用以下行：

```
project.ext.react = [
  bundleCommand: "ram-bundle",
  extraPackagerArgs: ["--indexed-ram-bundle"]
]
```

### 配置预加载及内联引用

现在我们已经启用了RAM格式，然而调用`require`会造成额外的开销。因为当遇到尚未加载的模块时，`require`需要通过bridge来发送消息。这主要会影响到启动速度，因为在应用程序加载初始模块时可能触发相当大量的请求调用。幸运的是，我们可以配置一部分模块进行预加载。为了做到这一点，你将需要实现某种形式的内联引用。

### 添加 packager 配置文件

在项目中创建一个名为 packager 的文件夹，并创建一个名为 config.js 的文件。添加以下内容：

```
const config = {
  transformer: {
    getTransformOptions: () => {
      return {
        transform: { inlineRequires: true },
      };
    },
  },
};

module.exports = config;
```

在 Xcode 的 Build phase 中添加`export BUNDLE_CONFIG="packager/config.js"`

```
export BUNDLE_COMMAND="ram-bundle"
export BUNDLE_CONFIG="packager/config.js"
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh.sh
```

编辑 android/app/build.gradle 文件，添加`bundleConfig: "packager/config.js",`

```
project.ext.react = [
  bundleCommand: "ram-bundle",
  bundleConfig: "packager/config.js"
]
```

最后，在 package.json 的“scripts”下修改“start”命令来启用配置文件：

`"start": "node node_modules/react-native/local-cli/cli.js start --config ../../../../packager/config.js",`

此时用`npm start`启动你的 packager 服务即会加载配置文件。请注意，如果你仍然通过 xcode 或是 react-native run-android 等方式自动启动 packager 服务，则由于没有使用上面的参数，不会加载配置文件。

### 调试预加载的模块

在您的根文件 (index.(ios|android).js) 中，您可以在初始导入(initial imports)之后添加以下内容：

```
const modules = require.getModules();
const moduleIds = Object.keys(modules);
const loadedModuleNames = moduleIds
  .filter(moduleId => modules[moduleId].isInitialized)
  .map(moduleId => modules[moduleId].verboseName);
const waitingModuleNames = moduleIds
  .filter(moduleId => !modules[moduleId].isInitialized)
  .map(moduleId => modules[moduleId].verboseName);

// make sure that the modules you expect to be waiting are actually waiting
console.log(
  'loaded:',
  loadedModuleNames.length,
  'waiting:',
  waitingModuleNames.length
);

// grab this text blob, and put it in a file named packager/modulePaths.js
console.log(`module.exports = ${JSON.stringify(loadedModuleNames.sort())};`);
```

当你运行你的应用程序时，你可以查看 console 控制台，有多少模块已经加载，有多少模块在等待。你可能想查看 moduleNames，看看是否有任何意外。注意在首次 import 时调用的内联引用。你可能需要检查和重构，以确保只有你想要的模块在启动时加载。请注意，您可以根据需要修改 Systrace 对象，以帮助调试有问题的引用。

```
require.Systrace.beginEvent = (message) => {
  if(message.includes(problematicModule)) {
    throw new Error();
  }
}
```

虽然每个 App 各有不同，但只加载第一个页面所需的模块是有普适意义的。当你满意时，把 loadedModuleNames 的输出放到 packager/modulePaths.js 文件中。

### 更新配置文件

Returning to packager/config.js we should update it to use our newly generated modulePaths.js file.

```
const modulePaths = require('./modulePaths');
const resolve = require('path').resolve;
const fs = require('fs');

// Update the following line if the root folder of your app is somewhere else.
const ROOT_FOLDER = path.resolve(__dirname, '..');

const config = {
  transformer: {
    getTransformOptions: () => {
      const moduleMap = {};
      modulePaths.forEach(path => {
        if (fs.existsSync(path)) {
          moduleMap[resolve(path)] = true;
        }
      });
      return {
        preloadedModules: moduleMap,
        transform: { inlineRequires: { blacklist: moduleMap } },
      };
    },
  },
};

module.exports = config;
```

在启用RAM格式之后，配置文件中的`preloadedModules`条目指示哪些模块需要预加载。当 bundle 被加载时，这些模块立即被加载，甚至在任何 requires 执行之前。blacklist 表明这些模块不应该被要求内联引用，因为它们是预加载的，所以使用内联没有性能优势。实际上每次解析内联引用 JavaScript 都会花费额外的时间。

### 测试和衡量改进

您现在应该准备好使用RAM格式和内联引用来构建您的应用了。保存启动前后的时间，来测试下有多少改进吧！

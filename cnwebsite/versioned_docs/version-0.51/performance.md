---
id: version-0.51-performance
title: 性能
original_id: performance
---

使用React Native替代基于WebView的框架来开发App的一个强有力的理由，就是为了使App可以达到每秒60帧（足够流畅），并且能有类似原生App的外观和手感。因此我们也尽可能地优化React Native去实现这一目标，使开发者能集中精力处理App的业务逻辑，而不用费心考虑性能。但是，总还是有一些地方有所欠缺，以及在某些场合React Native还不能够替你决定如何进行优化（用原生代码写也无法避免），因此人工的干预依然是必要的。
本文的目的是教给你一些基本的知识，来帮你排查性能方面的问题，以及探讨这些问题产生的原因和推荐的解决方法。

## 关于“帧”你所需要知道的

老一辈人常常把电影称为“移动的画”，是因为视频中逼真的动态效果其实是一种幻觉，这种幻觉是由一组静态的图片以一个稳定的速度快速变化所产生的。我们把这组图片中的每一张图片叫做一帧，而每秒钟显示的帧数直接的影响了视频（或者说用户界面）的流畅度和真实感。iOS设备提供了每秒60的帧率，这就留给了开发者和UI系统大约16.67ms来完成生成一张静态图片（帧）所需要的所有工作。如果在这分派的16.67ms之内没有能够完成这些工作，就会引发‘丢帧’的后果，使界面表现的不够流畅。

下面要讲的事情可能更为复杂：请先调出你应用的开发菜单，打开`Show FPS Monitor`. 你会注意到有两个不同的帧率.

### JavaScript 帧率

对大多数React Native应用来说，业务逻辑是运行在JavaScript线程上的。这是React应用所在的线程，也是发生API调用，以及处理触摸事件等操作的线程。更新数据到原生支持的视图是批量进行的，并且在事件循环每进行一次的时候被发送到原生端，这一步通常会在一帧时间结束之前处理完（如果一切顺利的话）。如果JavaScript线程有一帧没有及时响应，就被认为发生了一次丢帧。 例如，你在一个复杂应用的根组件上调用了`this.setState`，从而导致一次开销很大的子组件树的重绘，可想而知，这可能会花费200ms也就是整整12帧的丢失。此时，任何由JavaScript控制的动画都会卡住。只要卡顿超过100ms，用户就会明显的感觉到。

这种情况经常发生在Navigator的切换过程中：当你push一个新的路由时，JavaScript需要绘制新场景所需的所有组件，以发送正确的命令给原生端去创建视图。由于切换是由JavaScript线程所控制，因此经常会占用若干帧的时间，引起一些卡顿。有的时候，组件会在`componentDidMount`函数中做一些额外的事情，这甚至可能会导致页面切换过程中多达一秒的卡顿。

另一个例子是触摸事件的响应：如果你正在JavaScript线程处理一个跨越多个帧的工作，你可能会注意到TouchableOpacity的响应被延迟了。这是因为JavaScript线程太忙了，不能够处理主线程发送过来的原始触摸事件。结果TouchableOpacity就不能及时响应这些事件并命令主线程的页面去调整透明度了。

### 主线程 (也即UI线程) 帧率

很多人会注意到，`NavigatorIOS`的性能要比Navigator好的多。原因就是它的切换动画是完全在主线程上执行的，因此不会被JavaScript线程上的掉帧所影响。（[阅读关于为何你仍然需要使用Navigator](using-navigators.html)）

同样，当JavaScript线程卡住的时候，你仍然可以欢快的上下滚动ScrollView，因为ScrollView运行在主线程之上（尽管滚动事件会被分发到JS线程，但是接收这些事件对于滚动这个动作来说并不必要）。

## 性能问题的常见原因

### console.log语句

在运行打好了离线包的应用时，控制台打印语句可能会极大地拖累JavaScript线程。注意有些第三方调试库也可能包含控制台打印语句，比如[redux-logger](https://github.com/evgenyrodionov/redux-logger)，所以在发布应用前请务必仔细检查，确保全部移除。


> 这里有个小技巧可以在发布时屏蔽掉所有的`console.*`调用。React Native中有一个全局变量`__DEV__`用于指示当前运行环境是否是开发环境。我们可以据此在正式环境中替换掉系统原先的console实现。

```js
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}
```

这样在打包发布时，所有的控制台语句就会被自动替换为空函数，而在调试时它们仍然会被正常调用。


> 还有个[babel插件](https://babeljs.io/docs/plugins/transform-remove-console/)可以帮你移除所有的`console.*`调用。首先需要使用`yarn add --dev babel-plugin-transform-remove-console`来安装，然后在项目根目录下编辑（或者是新建）一个名为·.babelrc`的文件，在其中加入：

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

### 开发模式 (dev=true) 

JavaScript线程的性能在开发模式下是很糟糕的。这是不可避免的，因为有许多工作需要在运行的时候去做，譬如使你获得良好的警告和错误信息，又比如验证属性类型（propTypes）以及产生各种其他的警告。

### 缓慢的导航器(Navigator)切换

如之前说，`Navigator`的动画是由JavaScript线程所控制的。想象一下“从右边推入”这个场景的切换：每一帧中，新的场景从右向左移动，从屏幕右边缘开始（不妨认为是320单位宽的的x轴偏移），最终移动到x轴偏移为0的屏幕位置。切换过程中的每一帧，JavaScript线程都需要发送一个新的x轴偏移量给主线程。如果JavaScript线程卡住了，它就无法处理这项事情，因而这一帧就无法更新，动画就被卡住了。

长远的解决方法，其中一部分是要允许基于JavaScript的动画从主线程分离。同样是上面的例子，我们可以在切换动画开始的时候计算出一个列表，其中包含所有的新的场景需要的x轴偏移量，然后一次发送到主线程以某种优化的方式执行。由于JavaScript线程已经从更新x轴偏移量给主线程这个职责中解脱了出来，因此JavaScript线程中的掉帧就不是什么大问题了 —— 用户将基本上不会意识到这个问题，因为用户的注意力会被流畅的切换动作所吸引。

新的[React Navigation](https://reactnavigation.org/)库的一大目标就是为了解决这个问题。React Navigation中的视图是原生组件，同时用到了运行在原生线程上的`Animated`动画库，因而性能表现十分流畅。

### ListView初始化渲染太慢以及列表过长时滚动性能太差
这是一个频繁出现的问题。因为iOS配备了UITableView，通过重用底层的UIViews实现了非常高性能的体验（相比之下ListView的性能没有那么好）。用React Native实现相同效果的工作仍正在进行中，但是在此之前，我们有一些可用的方法来稍加改进性能以满足我们的需求。

#### initialListSize 

这个属性定义了在首次渲染中绘制的行数。如果我们关注于快速的显示出页面，可以设置`initialListSize`为1，然后我们会发现其他行在接下来的帧中被快速绘制到屏幕上。而每帧所显示的行数由`pageSize`所决定。

#### pageSize 

在初始渲染也就是`initialListSize`被使用之后，ListView将利用`pageSize`来决定每一帧所渲染的行数。默认值为1 —— 但是如果你的页面很小，而且渲染的开销不大的话，你会希望这个值更大一些。稍加调整，你会发现它所起到的作用。

#### scrollRenderAheadDistance 

“在将要进入屏幕区域之前的某个位置，开始绘制一行，距离按像素计算。”

如果我们有一个2000个元素的列表，并且立刻全部渲染出来的话，无论是内存还是计算资源都会显得很匮乏。还很可能导致非常可怕的阻塞。因此`scrollRenderAheadDistance`允许我们来指定一个超过视野范围之外所需要渲染的行数。

#### removeClippedSubviews 

“当这一选项设置为true的时候，超出屏幕的子视图（同时`overflow`值为`hidden`）会从它们原生的父视图中移除。这个属性可以在列表很长的时候提高滚动的性能。默认为false。（0.14版本后默认为true）”

这是一个应用在长列表上极其重要的优化。Android上，`overflow`值总是`hidden`的，所以你不必担心没有设置它。而在iOS上，你需要确保在行容器上设置了`overflow: hidden`。

### 我的组件渲染太慢，我不需要立即显示全部

这在初次浏览ListView时很常见，适当的使用它是获得稳定性能的关键。就像之前所提到的，它可以提供一些手段在不同帧中来分开渲染页面，稍加改进就可以满足你的需求。此外要记住的是，ListView也可以横向滚动。

### 在重绘一个几乎没有什么变化的页面时，JS帧率严重降低

如果你正在使用一个ListView，你必须提供一个`rowHasChanged`函数，它通过快速的算出某一行是否需要重绘，来减少很多不必要的工作。如果你使用了不可变的数据结构，这项工作就只需检查其引用是否相等。

同样的，你可以实现`shouldComponentUpdate`函数来指明在什么样的确切条件下，你希望这个组件得到重绘。如果你编写的是纯粹的组件（返回值完全由props和state所决定），你可以利用`PureComponent`来为你做这个工作。再强调一次，不可变的数据结构在提速方面非常有用 —— 当你不得不对一个长列表对象做一个深度的比较，它会使重绘你的整个组件更加快速，而且代码量更少。

### 由于在JavaScript线程中同时做很多事情，导致JS线程掉帧

“导航切换极慢”是该问题的常见表现。在其他情形下，这种问题也可能会出现。使用`InteractionManager`是一个好的方法，但是如果在动画中，为了用户体验的开销而延迟其他工作并不太能接受，那么你可以考虑一下使用`LayoutAnimation`。

`Animated`的接口一般会在JavaScript线程中计算出所需要的每一个关键帧，而`LayoutAnimation`则利用了`Core Animation`，使动画不会被JS线程和主线程的掉帧所影响。

举一个需要使用这项功能的例子：比如需要给一个模态框做动画（从下往上划动，并在半透明遮罩中淡入），而这个模态框正在初始化，并且可能响应着几个网络请求，渲染着页面的内容，并且还在更新着打开这个模态框的父页面。了解更多有关如何使用LayoutAnimation的信息，请查看[动画指南](/docs/animations.html)。

注意：  
  
 - `LayoutAnimation`只工作在“一次性”的动画上（"静态"动画） -- 如果动画可能会被中途取消，你还是需要使用`Animated`。

### 在屏幕上移动视图（滚动，切换，旋转）时，UI线程掉帧

当具有透明背景的文本位于一张图片上时，或者在每帧重绘视图时需要用到透明合成的任何其他情况下，这种现象尤为明显。设置`shouldRasterizeIOS`或者`renderToHardwareTextureAndroid`属性可以显著改善这一现象。
注意不要过度使用该特性，否则你的内存使用量将会飞涨。在使用时，要评估你的性能和内存使用情况。如果你没有需要移动这个视图的需求，请关闭这一属性。

### 使用动画改变图片的尺寸时，UI线程掉帧

在iOS上，每次调整Image组件的宽度或者高度，都需要重新裁剪和缩放原始图片。这个操作开销会非常大，尤其是大的图片。比起直接修改尺寸，更好的方案是使用`transform: [{scale}]`的样式属性来改变尺寸。比如当你点击一个图片，要将它放大到全屏的时候，就可以使用这个属性。

### Touchable系列组件不能很好的响应 

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

你可以利用内置的分析器来同时获取JavaScript线程和主线程中代码执行情况的详细信息。

对于iOS来说，Instruments是一个宝贵的工具库，Android的话，你可以使用systrace，参见[调试Android UI性能](/docs/android-ui-performance.html#content)。







## Unbundling + inline requires

如果你有一个较为庞大的应用程序，你可能要考虑使用拆分和内联引用。这对于具有大量页面的应用程序是非常有用的，这些页面在应用程序的典型使用过程中可能不会被打开。通常对于启动后一段时间内不需要大量代码的应用程序来说是非常有用的。例如应用程序包含复杂的配置文件屏幕或较少使用的功能，但大多数会话只涉及访问应用程序的主屏幕更新。我们可以通过使用打包器的`unbundle`特性来优化`bundle`的加载，并且内联引用这些功能和页面（当它们被实际使用时）。



### Loading JavaScript 

在 react-native 执行 JS 代码之前，必须将代码加载到内存中并进行解析。如果你加载了一个50MB的bundle，那么所有的50mb都必须被加载和解析才能被执行。

拆分后的优化是，启动时只加载 50MB 中实际需要的部分，并随着需要的部分逐渐加载更多的包。



### Inline Requires 内联引用

内联引用延迟模块或文件的加载，直到实际需要该文件。一个基本的例子看起来像这样：

#### VeryExpensive.js 

```javascript
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

#### Optimized.js 

```javascript
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



即使没有使用 unbundling，内联引用也会使启动时间减少，因为 VeryExpensive.js中的代码只有在第一次 require 时才会执行。

### Enable Unbundling（启动分拆）

在 iOS 上 unbundling 将创建一个简单的索引文件，React Native 将一次加载一个模块。在 Android 上，默认情况下它会为每个模块创建一组文件。你可以像 iOS 一样，强制 Android 只创建一个文件，但使用多个文件可以更高性能，并需要更少的内存。

通过编辑 build phase "Bundle React Native code and images"，在 Xcode 中启用 unbundling。在`../node_modules/react-native/packager/react-native-xcode.sh` 添加 `export BUNDLE_COMMAND="unbundle"`:

```bash
export BUNDLE_COMMAND="unbundle"
export NODE_BINARY=node
../node_modules/react-native/packager/react-native-xcode.sh
```

在Android上，通过编辑你的 android/app/build.gradle 文件启用 unbundling。在`apply from: "../../node_modules/react-native/react.gradle"`之前修改或添加`project.ext.react`块：

```javascript
project.ext.react = [
  bundleCommand: "unbundle",
]
```

如果在Android上，你想使用单个索引文件（如前所述），请在Android上使用以下行：

```javascript
project.ext.react = [
  bundleCommand: "unbundle",
  extraPackagerArgs: ["--indexed-unbundle"]
]
```



### Configure Preloading and Inline Requires

### 配置预加载及内联引用

现在我们已经拆分了我们的代码，调用 require 需要开销。当遇到尚未加载的模块时，需要现在需要通过桥发送消息。这会对启动造成巨大影响，因为在应用程序加载初始模块时可能触发相当大量的请求调用。幸运的是，我们可以配置一部分模块进行预加载。为了做到这一点，你将需要实现某种形式的内联引用。

### Adding a packager config file 添加模块配置文件

在项目中创建一个名为 packager 的文件夹，并创建一个名为 config.js 的文件。添加以下内容：

```javascript
const config = {
  getTransformOptions: () => {
    return {
      transform: { inlineRequires: true },
    };
  },
};

module.exports = config;
```



在Xcode，Build phase 中添加`export BUNDLE_CONFIG="packager/config.js"`

```Bash
export BUNDLE_COMMAND="unbundle"
export BUNDLE_CONFIG="packager/config.js"
export NODE_BINARY=node
../node_modules/react-native/packager/react-native-xcode.sh
```



编辑  android/app/build.gradle 文件，添加`bundleConfig: "packager/config.js",`

```Bash
project.ext.react = [
  bundleCommand: "unbundle",
  bundleConfig: "packager/config.js"
]
```



最后，你可以在你的package.json的“scripts”下更新“start”来使用config：

`"start": "node node_modules/react-native/local-cli/cli.js start --config ../../../../packager/config.js",`

用`npm start`启动你的 package 服务。请注意，当 package 服务 通过 xcode 和 react-native run-android 等自动启动时，它不会使用npm start，所以它不会使用 config。



### Investigating the Loaded Modules

在您的根文件 (index.(ios|android).js) 中，您可以在初始导入(initial imports)之后添加以下内容：

```javascript
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

// grab this text blob, and put it in a file named packager/moduleNames.js
console.log(`module.exports = ${JSON.stringify(loadedModuleNames.sort())};`);

```

当你运行你的应用程序时，你可以查看 console 控制台，有多少模块已经加载，有多少模块在等待。你可能想查看 moduleNames，看看是否有任何意外。注意在首次 import 时调用的内联引用。你可能需要检查和重构，以确保只有你想要的模块在启动时加载。请注意，您可以根据需要修改 Systrace 对象，以帮助调试有问题的引用。

```javascript
require.Systrace.beginEvent = (message) => {
  if(message.includes(problematicModule)) {
    throw new Error();
  }
}
```

虽然每个应用程序各有不同，但只加载第一个页面所需的模块是有普适意义的。当你满意时，把 loadedModuleNames 的输出放到 packager/modulenames.js 文件中。

### Transforming to Module Paths 转化模块路径

The loaded module names get us part of the way there, but we actually need absolute module paths, so the next script will set that up. Add `packager/generateModulePaths.js` to your project with the following:

我们已经得到了需要预加载的模块名，但实际上我们需要的是模块的绝对路径，所以接下来将会搞定它。添加 `packager/generatemodulepaths.js` 文件：

```javascript
// @flow
/* eslint-disable no-console */
const execSync = require('child_process').execSync;
const fs = require('fs');
const moduleNames = require('./moduleNames');

const pjson = require('../package.json');
const localPrefix = `${pjson.name}/`;

const modulePaths = moduleNames.map(moduleName => {
  if (moduleName.startsWith(localPrefix)) {
    return `./${moduleName.substring(localPrefix.length)}`;
  }
  if (moduleName.endsWith('.js')) {
    return `./node_modules/${moduleName}`;
  }
  try {
    const result = execSync(
      `grep "@providesModule ${moduleName}" $(find . -name ${moduleName}\\\\.js) -l`
    )
      .toString()
      .trim()
      .split('\n')[0];
    if (result != null) {
      return result;
    }
  } catch (e) {
    return null;
  }
  return null;
});

const paths = modulePaths
  .filter(path => path != null)
  .map(path => `'${path}'`)
  .join(',\n');

const fileData = `module.exports = [${paths}];`;

fs.writeFile('./packager/modulePaths.js', fileData, err => {
  if (err) {
    console.log(err);
  }

  console.log('Done');
});
```

你可以通过  `node packager/modulePaths.js`运行。

此脚本尝试从模块名称映射到模块路径，但它不是万无一失的。例如，它忽略了平台特定的文件（* ios.js和* .android.js）。然而根据最初的测试，它处理了95％的情况。当它运行一段时间后，它应该完成并输出一个名为`packager/modulePaths.js`的文件。它应该包含相对于你的项目根目录的模块文件路径。您可以将 modulePaths.js 提交到您的代码仓库，以便它可以被传递。

### Updating the config.js 更新 config.js

返回到 packager/config.js 我们应该更新它来使用我们新生成的 modulePaths.js 文件。

```javascript
const modulePaths = require('./modulePaths');
const resolve = require('path').resolve;
const fs = require('fs');

const config = {
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
};

module.exports = config;
```



配置文件中的 preloadedModules 条目指示哪些模块应被标记为由 unbundler 预加载。当 bundle 被加载时，这些模块立即被加载，甚至在任何 requires 执行之前。blacklist 表明这些模块不应该被要求内联。因为它们是预加载的，所以使用内联没有性能优势。实际上 JavaScript 会花费额外的时间来解析内联引用在首次引用的时候。

### Test and Measure Improvements 测试和衡量改进

您现在应该准备好使用分拆和内联引用来构建您的应用程序。确保您保存了测量启动前后的时间。

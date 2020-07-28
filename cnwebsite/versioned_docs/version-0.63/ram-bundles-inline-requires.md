---
id: version-0.63-ram-bundles-inline-requires
title: RAM Bundles 和内联引用优化
original_id: ram-bundles-inline-requires
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

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

在 Xcode 中启用 RAM 格式，需要编辑 build phase 里的"Bundle React Native code and images"。在`../node_modules/react-native/scripts/react-native-xcode.sh`中添加 `export BUNDLE_COMMAND="ram-bundle"`:

```
export BUNDLE_COMMAND="ram-bundle"
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
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

> **_Note_**: If you are using [Hermes JS Engine](https://github.com/facebook/hermes), you do not need RAM bundles. When loading the bytecode, `mmap` ensures that the entire file is not loaded.

### 配置预加载及内联引用

现在我们已经启用了 RAM 格式，然而调用`require`会造成额外的开销。因为当遇到尚未加载的模块时，`require`需要通过 bridge 来发送消息。这主要会影响到启动速度，因为在应用程序加载初始模块时可能触发相当大量的请求调用。幸运的是，我们可以配置一部分模块进行预加载。为了做到这一点，你将需要实现某种形式的内联引用。

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

### 更新配置文件(metro.config.js)

We now need to update `metro.config.js` in the root of the project to use our newly generated `modulePaths.js` file:

```
const modulePaths = require('./packager/modulePaths');
const resolve = require('path').resolve;
const fs = require('fs');

// Update the following line if the root folder of your app is somewhere else.
const ROOT_FOLDER = resolve(__dirname, '..');

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
  projectRoot: ROOT_FOLDER,
};

module.exports = config;
```

在启用 RAM 格式之后，配置文件中的`preloadedModules`条目指示哪些模块需要预加载。当 bundle 被加载时，这些模块立即被加载，甚至在任何 requires 执行之前。blacklist 表明这些模块不应该被要求内联引用，因为它们是预加载的，所以使用内联没有性能优势。实际上每次解析内联引用 JavaScript 都会花费额外的时间。

### 测试和衡量改进

您现在应该准备好使用 RAM 格式和内联引用来构建您的应用了。保存启动前后的时间，来测试下有多少改进吧！

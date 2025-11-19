---
id: optimizing-javascript-loading
title: 优化 JavaScript 加载
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

解析和运行 JavaScript 代码需要内存和时间。因此，随着你的应用程序增长，通常将代码加载延迟到首次需要时是有用的。React Native 自带一些默认开启的标准优化，并且你可以在自己的代码中采用一些技术来帮助 React 更有效地加载你的应用程序。还有一些适合非常大应用程序的高级自动优化（它们也有自己的权衡）。

## 推荐：使用 Hermes

[Hermes](./hermes) 是新 React Native 应用的默认引擎，它对高效代码加载进行了高度优化。在发布版本中，JavaScript 代码会完全提前编译成字节码。字节码按需加载到内存中，并不需要像普通 JavaScript 那样进行解析。

## 推荐：延迟加载大型组件

如果一个包含大量代码/依赖项的组件在最初渲染应用程序时不太可能被使用，您可以使用 React 的 [`lazy`](https://react.dev/reference/react/lazy) API 来推迟加载其代码，直到它首次呈现。通常，您应该考虑延迟加载应用程序中的屏幕级组件，这样添加新屏幕到您的应用程序就不会增加其启动时间。

:::info
阅读更多关于 [带有 Suspense 的延迟加载组件](https://react.dev/reference/react/lazy#suspense-for-code-splitting) 的信息，包括代码示例，在 React 文档中。
:::

### 小贴士：避免模块副作用

如果组件模块（或其依赖项）具有*副作用*，例如修改全局变量或在组件外部订阅事件，则延迟加载组件可能会改变应用程序的行为。React 应用中的大多数模块都不应有任何副作用。

```tsx title="SideEffects.tsx"
import Logger from './utils/Logger';

//  🚩 🚩 🚩 副作用！这必须在 React 开始渲染 SplashScreen 组件之前执行，
// 如果你决定延迟加载 SplashScreen，它可能会意外地破坏应用中其他地方的代码。(比如需要依赖logger的代码)
global.logger = new Logger();

export function SplashScreen() {
  // ...
}
```

## 高级：内联调用 `require`

有时，您可能希望将一些代码的加载推迟到第一次使用时，而不是使用 `lazy` 或异步的 `import()`。您可以通过在文件顶部本来会静态使用 `import` 的地方，改用 [`require()`](https://metrobundler.dev/docs/module-api/#require) 函数来实现这一点。

```tsx title="VeryExpensive.tsx"
import {Component} from 'react';
import {Text} from 'react-native';
// ... import 一些开销非常大的模块

export default function VeryExpensive() {
  // ... 开销非常大的渲染逻辑
  return <Text>Very Expensive Component</Text>;
}
```

```tsx title="Optimized.tsx"
import {useCallback, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
// 一般我们会静态导入某个组件
// import VeryExpensive from './VeryExpensive';
// 但由于这个组件开销非常大，这里我们可以改用 require

let VeryExpensive = null;

export default function Optimize() {
  const [needsExpensive, setNeedsExpensive] = useState(false);
  const didPress = useCallback(() => {
    if (VeryExpensive == null) {
      VeryExpensive = require('./VeryExpensive').default;
    }

    setNeedsExpensive(true);
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity onPress={didPress}>
        <Text>Load</Text>
      </TouchableOpacity>
      {needsExpensive ? <VeryExpensive /> : null}
    </View>
  );
}
```

## 高级：自动内联 `require` 调用

如果您使用 React Native CLI 构建您的应用程序，`require` 调用（但不是 `import`）将会自动为您内联，这既适用于您的代码，也适用于您使用的任何第三方包（`node_modules`）。

```tsx
import {useCallback, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

// This top-level require call will be evaluated lazily as part of the component below.
const VeryExpensive = require('./VeryExpensive').default;

export default function Optimize() {
  const [needsExpensive, setNeedsExpensive] = useState(false);
  const didPress = useCallback(() => {
    setNeedsExpensive(true);
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity onPress={didPress}>
        <Text>Load</Text>
      </TouchableOpacity>
      {needsExpensive ? <VeryExpensive /> : null}
    </View>
  );
}
```

:::info
一些 React Native 框架禁用了这种行为。例如在 Expo 项目中，默认情况下不会内联 `require` 调用。你可以通过编辑项目的 Metro 配置，并在 [`getTransformOptions`](https://metrobundler.dev/docs/configuration#gettransformoptions) 中设置 `inlineRequires: true` 来启用此优化。
:::

### 内联 `require` 的缺陷

内联 `require` 调用会改变模块的评估顺序，甚至可能导致某些模块 _永远不被评估_。这通常可以安全地自动进行，因为 JavaScript 模块通常被编写为无副作用。

如果你的一个模块确实有副作用 - 例如它初始化了某种日志记录机制，或者修补了需要在其他地方调用的全局 API - 那么你可能看到意外的行为甚至崩溃。在这些情况下，你可能想要从这种优化中排除某些模块或完全禁用它。

要 **禁用所有自动内联 `require` 调用：**

更新你的 `metro.config.js` 文件以将 `inlineRequires` transformer 选项设置为 `false`：

```tsx title="metro.config.js"
module.exports = {
  transformer: {
    async getTransformOptions() {
      return {
        transform: {
          inlineRequires: false,
        },
      };
    },
  },
};
```

仅将**某些模块从 `require` 内联中排除**：

有两个相关的转换器选项：`inlineRequires.blockList` 和 `nonInlinedRequires`。请参见代码片段，了解如何使用每个选项的示例。

```tsx title="metro.config.js"
module.exports = {
  transformer: {
    async getTransformOptions() {
      return {
        transform: {
          inlineRequires: {
            blockList: {
              // 在 `DoNotInlineHere.js` 中的 require() 调用将不会被内联。
              [require.resolve('./src/DoNotInlineHere.js')]: true,

              // 其他地方的 require() 调用将被内联，除非它们
              // 与 nonInlinedRequires 中的任何条目匹配（见下文）。
            },
          },
          nonInlinedRequires: [
            // 在任何地方的 require('react') 调用都不会被内联
            'react',
          ],
        },
      };
    },
  },
};
```

查看 Metro 文档中的 [`getTransformOptions`](https://metrobundler.dev/docs/configuration#gettransformoptions) 以获取有关设置和微调内联 `require` 的更多详细信息。

## 高级：使用随机访问模块包（非 Hermes）

:::info
**当 [使用 Hermes](#use-hermes) 时不支持。** Hermes 字节码与 RAM 捆绑包格式不兼容，并且在所有用例中都提供了相同（或更好）的性能。
:::

随机访问模块捆绑包（也称为 RAM bundle）与上述技术一起工作，以限制需要解析并加载到内存中的 JavaScript 代码量。每个模块都被存储为单独的字符串（或文件），只有在需要执行该模块时才进行解析。

RAM bundle 可以物理分割成单独的文件，或者它们可以使用 _索引_ 格式，由单个文件中的多个模块查找表组成。

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms}>
<TabItem value="android">

在 Android 上，通过编辑 `android/app/build.gradle` 文件来启用 RAM 格式。在行 `apply from: "../../node_modules/react-native/react.gradle"` 之前添加或修改 `project.ext.react` 块：

```groovy
project.ext.react = [
    bundleCommand: "ram-bundle",
]
```

如果你想在 Android 上使用单个索引文件，请使用以下行：

```
project.ext.react = [
  bundleCommand: "ram-bundle",
  extraPackagerArgs: ["--indexed-ram-bundle"]
]
```

</TabItem>
<TabItem value="ios">

在 iOS 上，RAM 包总是被索引（=单个文件）。

通过编辑构建阶段 "Bundle React Native code and images" 来在 Xcode 中启用 RAM 格式。在 `../node_modules/react-native/scripts/react-native-xcode.sh` 前面加上 `export BUNDLE_COMMAND="ram-bundle"`：

```
export BUNDLE_COMMAND="ram-bundle"
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

</TabItem>
</Tabs>

查看 Metro 文档中的 [`getTransformOptions`](https://metrobundler.dev/docs/configuration#gettransformoptions) 以获取有关设置和微调您的 RAM bundle 构建的更多详细信息。

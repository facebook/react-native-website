---
id: native-modules-setup
title: 原生模块配置
---

import NativeDeprecated from './the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

原生模块通常作为 npm 包分发，除了常规的 JavaScript 外，它们还会包含每个平台的一些本地代码。要了解更多关于 npm 包的信息，你可能会发现[这个指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)很有用。

为了设置一个原生模块的基本项目结构，我们将使用社区工具[Bob](https://github.com/react-native-community/bob)。你可以继续深入了解该库的工作原理，但对于我们的需求，我们只需要执行基本的`create`脚本：

```sh
npx @react-native-community/bob create react-native-awesome-module
```

`react-native-awesome-module` 是您希望为新模块命名的名称。完成此操作后，在终端进入到 `react-native-awesome-module` 文件夹，并运行以下命令来引导示例项目：

```sh
yarn bootstrap
```

当引导完成后，您可以通过执行以下任一命令启动示例应用程序：

```sh
# Android app
yarn example android
# iOS app
yarn example ios
```

当完成上述所有步骤后，您将能够继续使用 [Android Native Modules](native-modules-android) 或 [iOS Native Modules](native-modules-ios) 指南来添加一些代码。

> 想要一个不那么主观的设置？可查看第三方工具 [create-react-native-module](https://github.com/brodybits/create-react-native-module)。

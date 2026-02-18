---
id: getting-started-without-a-framework
title: 不使用框架开始开发
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import PlatformSupport from '@site/src/theme/PlatformSupport';

<PlatformSupport platforms={['android', 'ios', 'macOS', 'tv', 'watchOS', 'web', 'windows', 'visionOS']} />

如果[框架](/architecture/glossary#react-native-framework)无法很好地满足你的需求，或者你更倾向于自己编写框架，那么你可以在不使用框架的情况下创建 React Native 应用。

为此，你首先需要[搭建开发环境](set-up-your-environment)。环境准备就绪后，继续按以下步骤创建应用并开始开发。

### 第 1 步：创建新项目

你可以使用 [React Native Community CLI](https://github.com/react-native-community/cli) 来生成新项目。让我们创建一个名为 "AwesomeProject" 的 React Native 项目：

```shell
npx @react-native-community/cli@latest init AwesomeProject
```

如果你要将 React Native 集成到现有应用中，或者已经在项目中安装了 [Expo](https://docs.expo.dev/bare/installing-expo-modules/)，又或者要为现有的 React Native 项目添加 Android 支持（参见[集成到现有应用](integration-with-existing-apps.md)），则无需执行此步骤。你也可以使用第三方 CLI 工具来创建 React Native 应用，例如 [Ignite CLI](https://github.com/infinitered/ignite)。

:::info

如果你在 iOS 上遇到问题，可以尝试重新安装依赖：

1. 执行 `cd ios` 进入 `ios` 目录。
2. 执行 `bundle install` 安装 [Bundler](https://bundler.io/)。
3. 执行 `bundle exec pod install` 安装由 CocoaPods 管理的 iOS 依赖。

:::

#### [可选] 使用特定版本或模板

如果你想使用特定版本的 React Native 来创建项目，可以使用 `--version` 参数：

```shell
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X
```

你也可以使用 `--template` 参数基于自定义模板创建项目，详情请参阅[这里](https://github.com/react-native-community/cli/blob/main/docs/init.md#initializing-project-with-custom-template)。

### 第 2 步：启动 Metro

[**Metro**](https://metrobundler.dev/) 是 React Native 的 JavaScript 构建工具。要启动 Metro 开发服务器，请在项目目录中执行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start
```

</TabItem>
</Tabs>

:::note
如果你熟悉 Web 开发，Metro 类似于 Vite 和 webpack 等打包工具，但它是专为 React Native 端到端设计的。例如，Metro 使用 [Babel](https://babel.dev/) 将 JSX 等语法转换为可执行的 JavaScript。
:::

### 第 3 步：启动应用

让 Metro Bundler 在自己的终端窗口中继续运行。在 React Native 项目目录下打开一个新的终端，然后执行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

如果一切配置正确，你应该很快就能在 Android 模拟器中看到新应用运行起来了。

这只是运行应用的方式之一——你也可以直接从 Android Studio 中运行。

:::tip
如果无法正常运行，请参阅[问题排查](troubleshooting.md)页面。
:::

### 第 4 步：修改你的应用

既然你已经成功运行了应用，接下来让我们来修改它。

- 用你喜欢的文本编辑器打开 `App.tsx`，编辑其中的代码。
- 按两下 <kbd>R</kbd> 键或者在开发者菜单（<kbd>Ctrl</kbd> + <kbd>M</kbd>）中选择 `Reload` 来查看修改效果！

### 大功告成！

恭喜！你已经成功运行并修改了你的第一个 React Native 应用。

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

### 接下来做什么？

- 如果你想将 React Native 代码集成到现有应用中，请查阅[集成指南](integration-with-existing-apps.md)。
- 如果你想进一步了解 React Native，请查阅 [React Native 简介](getting-started)。

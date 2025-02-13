---
id: new-architecture-app-intro
title: 在应用中启用的预备工作
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';

<NewArchitectureWarning/>

在启用新架构之前，应先满足一些先决条件。

## 更新至最新版 React Native

React Native 在 0.68.0 版本中发布了对新架构的支持。

本指南的撰写是基于你使用的是 [**最新发布**的 React Native 版本](https://github.com/facebook/react-native/releases/latest)。

你可以在[升级到新版本](/docs/upgrading)页面找到升级说明。

升级后记得重新安装依赖(运行`npm install`或`yarn`)。

:::info

每当你需要重命名`ios`文件夹中的某些文件时，请**使用 Xcode 重命名它们**。这可确保 Xcode 工程中的文件引用也会更新。你可能需要先清理构建文件夹(**Project**→**Clean Build Folder**或<kbd>Cmd ⌘</kbd> + <kbd>Shift ⇪</kbd> + <kbd>K</kbd>)，然后重新构建应用。如果文件是在 Xcode 之外重命名的，你可能需要点击旧的`.m`文件引用，并定位到新文件。

:::

## Android - 启用新架构

如果你已成功将项目更新到最新版本的 React Native，那么你**已经满足**在 Android 上使用新架构的所有先决条件。

你只需要按如下方式更新`android/gradle.properties`文件:

```diff
# 使用此属性启用对新架构的支持。
# 这将允许你在应用中使用TurboModules和Fabric渲染器。
# 如果你想编写自定义TurboModules/Fabric组件或使用提供它们的库，
# 你应该启用此标志。
-newArchEnabled=false
+newArchEnabled=true
```

## iOS - 启用新架构

如果你已成功将项目更新到最新版 React Native，那么你**已经满足**在 iOS 上使用新架构的所有先决条件。

你只需通过运行带有正确标志的`pod install`来重新安装 pods:

```bash
# 运行带标志的pod install:
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

## 运行应用

现在是时候运行应用以验证一切正常了:

<Tabs groupId="run-app" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers} >
<TabItem value="yarn">

```bash
# 运行Android
yarn android

# 运行iOS
yarn ios
```

</TabItem>
<TabItem value="npm">

```bash
# 运行Android
npm run android

# 运行iOS
npm run ios
```

</TabItem>
</Tabs>

在你的 Metro 终端日志中，你现在会看到以下日志，确认 Fabric 正在正确运行:

```
BUNDLE ./App.tsx
LOG Running "App" with {"fabric":true，"initialProps":{"concurrentRoot": "true"}，"rootTag":1}
```

## 高级 - 在互操作层中传递你的组件

如果你按照前面的步骤操作，但你的应用使用了一些尚未完全迁移到新架构的自定义本地组件，你会看到一些红色/粉色框，说明该组件与 Fabric 不兼容。这是因为为旧架构编写的自定义本地组件无法在新架构中原封不动地运行。

从**React Native 0.72.0**开始，我们在互操作层上做了一些工作，让你不需要等待它们迁移到新架构的情况下，就可以在新架构中使用遗留组件。

你可以阅读更多关于互操作层及如何使用它的内容[这里](https://github.com/reactwg/react-native-new-architecture/discussions/135)。按照该指南注册你的组件，然后使用以下命令重新运行应用:

<Tabs groupId="run-app" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers} >
<TabItem value="yarn">

```bash
# To run android
yarn android

# To run iOS
yarn ios
```

</TabItem>
<TabItem value="npm">

```bash
# To run android
npm run android

# To run iOS
npm run ios
```

</TabItem>
</Tabs>

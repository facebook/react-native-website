---
id: upgrading
title: 更新
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

时刻将 React Native 更新到最新的版本，可以获得更多 API、视图、开发者工具以及其他一些好东西（译注：官方开发任务繁重，人手紧缺，几乎不会对旧版本提供维护支持，所以即便更新可能带来一些兼容上的变更，但建议开发者还是尽一切可能第一时间更新）。由于一个完整的 React Native 项目是由 Android 项目、iOS 项目和 JavaScript 项目组成的，且都打包在一个 npm 包中，所以升级可能会有一些麻烦。我们会尽量简化这一流程。你可以在项目目录下使用`npx react-native info`命令查看当前的版本。

> 译注：[英文更新日志点这里查看](https://github.com/facebook/react-native/releases)。

## Expo 项目

升级你的 Expo 项目到新版本的 React Native 需要更新 `package.json` 文件中的 `react-native`、`react` 和 `expo` 包版本。Expo 建议逐步升级 SDK 版本，一次一个。这样做将帮助你找出升级过程中出现的错误和问题。有关升级项目的最新信息，请参阅 [Upgrading Expo SDK Walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)。

## React Native 项目

因为典型的 React Native 项目本质上是由一个 Android 项目、一个 iOS 项目和一个 JavaScript 项目组成的，所以升级可能会相当麻烦。[Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) 是一个网页工具，可以帮助你通过提供任何两个版本之间的所有变更来升级你的应用。它还显示了特定文件的评论，以帮助理解为什么需要进行该变更。

### 1. 选择版本

首先，你需要从和到哪个版本进行升级，默认情况下会选中最新的主要版本。选择后，可以点击 "Show me how to upgrade" 按钮。

💡 重大更新会在顶部显示一个 "useful content" 部分，其中包含一些链接，以帮助你升级。

### 2. 升级依赖

首先显示的文件是 `package.json`，更新其中的依赖是个不错的选择。例如，如果 `react-native` 和 `react` 出现在变更中，你可以通过运行以下命令来安装它们：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
npm install react-native@{{VERSION}}
npm install react@{{REACT_VERSION}}
```

</TabItem>
<TabItem value="yarn">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
yarn add react-native@{{VERSION}}
yarn add react@{{REACT_VERSION}}
```

</TabItem>
</Tabs>

### 3. 升级项目文件

新版本可能包含更新了其他文件，这些文件是在你运行 `npx react-native init` 时生成的，这些文件列在 [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) 页面的 `package.json` 之后。如果没有其他变更，你只需要重新构建项目即可继续开发。如果有变更，你需要手动应用它们到你的项目中。

### 常见问题

#### 我已经完成了所有变更，但我的应用仍在使用旧版本

这些错误通常与缓存有关，建议安装 [react-native-clean-project](https://github.com/pmadruga/react-native-clean-project) 来清除所有项目的缓存，然后重新运行。

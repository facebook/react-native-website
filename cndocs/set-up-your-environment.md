---
id: set-up-your-environment
title: 搭建开发环境
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';

import GuideLinuxAndroid from './\_getting-started-linux-android.md';
import GuideMacOSAndroid from './\_getting-started-macos-android.md';
import GuideWindowsAndroid from './\_getting-started-windows-android.md';
import GuideMacOSIOS from './\_getting-started-macos-ios.md';

本指南将帮助你搭建开发环境，以便使用 Android Studio 和 Xcode 运行你的项目。这样你就可以使用 Android 模拟器和 iOS 模拟器进行开发、在本地构建应用等。

:::info
本指南需要安装 Android Studio 或 Xcode。如果你已经安装了其中一个，通常几分钟内即可上手。如果尚未安装，预计需要大约一个小时来完成安装和配置。

<details>
<summary>搭建环境是必须的吗？</summary>

如果你使用的是[框架](/architecture/glossary#react-native-framework)，则不需要搭建开发环境。使用 React Native 框架时，框架会自动为你构建原生应用，无需你手动安装 Android Studio 或 Xcode。

如果你有特殊限制无法使用框架，或者你希望编写自己的框架，那么搭建本地环境是必需的。环境搭建完成后，请参阅[不使用框架开始开发](getting-started-without-a-framework)。

</details>
:::

#### 开发操作系统

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

#### 目标操作系统

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'macOS, Android'

<GuideMacOSAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'macOS, iOS'

<GuideMacOSIOS/>

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windows">

#### 目标操作系统

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Windows, Android'

<GuideWindowsAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Windows, iOS'

## 不支持

:::info
构建 iOS 原生代码项目需要 Mac。你可以使用 [Expo](environment-setup#start-a-new-react-native-project-with-expo) 提供的 [Expo Go](https://expo.dev/go) 在你的 iOS 设备上开发应用。
:::

</TabItem>
</Tabs>

</TabItem>
<TabItem value="linux">

#### 目标操作系统

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Linux, Android'

<GuideLinuxAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Linux, iOS'

## 不支持

:::info
构建 iOS 原生代码项目需要 Mac。你可以使用 [Expo](environment-setup#start-a-new-react-native-project-with-expo) 提供的 [Expo Go](https://expo.dev/go) 在你的 iOS 设备上开发应用。
:::

</TabItem>
</Tabs>

</TabItem>
</Tabs>

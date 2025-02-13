---
id: use-app-template
title: 创建启用新架构的应用
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import RemoveGlobalCLI from '.././\_remove-global-cli.md';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

本文档将帮助你从头创建一个启用了新架构的 React Native 应用。

## 开发环境

在继续之前，请确保你已经完成[搭建开发环境](getting-started.md)中的**完整原生环境**中的所有步骤。

如果正在按照指南搭建，当配置到**运行你的 React Native 应用程序**部分时停止，然后继续按照本指南进行。

:::caution 注意
如果你正在使用 Expo，则目前无法启用新架构，必须等待 Expo 的未来版本。
:::

## 创建新应用

<RemoveGlobalCLI />

If you already have your development environment set up, create a new React Native project from the template:

```shell
npx react-native init AwesomeProject
```

:::caution 注意
The New Architecture is available in React Native version 0.68 or later.
:::

## 配置

按照以下步骤，启用新架构并构建应用程序。

### 启用 Hermes

Hermes is an open-source JavaScript engine optimized for React Native. [Hermes will be the default engine in the future](https://github.com/reactwg/react-native-new-architecture/discussions/4), and we highly recommend you use it.

Please [follow the instructions on the React Native website](hermes.md) in order to enable Hermes in your application.

### 启用新架构

#### Target OS

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="ios">

Navigate to the `ios` directory and run the following:

```shell
# from `ios` directory
bundle install && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

Then build and run the app as usual:

```shell
yarn ios
```

:::note 备注
You will need to run `pod install` each time a dependency with native code changes. Make this command easier to run by adding it to `scripts` to your project's `package.json` file:

```
"scripts": {
  "pod-install": "RCT_NEW_ARCH_ENABLED=1 bundle exec pod install"
}
```

and run it with `yarn pod-install`. Note that `bundle install` does not need to run a second time, as long as the Gemfile has not changed.
:::

#### 常见问题

##### `react-native run-ios` fails

If you see a build failure from `react-native run-ios`, there may be cached files from a previous build with the old architecture. Clean the build cache and try again:

1. Open the project `ios/project.xcworkspace` in Xcode
2. In XCode, choose Product > Clean Build Folder
3. In the project directory, remove the `ios/Podfile.lock` file and `ios/Pods` directory: `rm -rf ios/Podfile.lock ios/Pods`
4. Re-run `yarn pod-install` and `yarn ios`

</TabItem>
<TabItem value="android">

Set the `newArchEnabled` property to `true` by **either**:

- Changing the corresponding line in `android/gradle.properties`
- Setting the environment variable `ORG_GRADLE_PROJECT_newArchEnabled=true`

Then build and run the app as usual:

```shell
yarn android
```

:::note 备注
You may notice longer build times with the New Architecture, due to additional step of C++ compilation with the Android NDK. To improve your build time, see [Speeding Up Your Build Phase](build-speed.md).
:::

</TabItem>
</Tabs>

### Confirming the New Architecture is in use

After you build and run the app, when Metro serves the JavaScript bundle, you should see `"fabric": true` in the Metro logs:

<img src="/docs/assets/metro-new-arch.png" alt="Metro shows fabric: true" width="600" />

### Want to know more?

If you'd like to view the code changes relevant for the New Architecture, take a look at the [upgrade helper from version 0.67.4 to 0.68.0](https://react-native-community.github.io/upgrade-helper/?from=0.67.4&to=0.68.0). Files that were added for the New Architecture are marked with a yellow banner.

For further explanations of what each file is doing, check out these guides to walk through the changes step-by-step:

#### Android

- [Enabling TurboModules on Android](new-architecture-app-modules-android.md)
- [Enabling Fabric on Android](new-architecture-app-renderer-android.md)

#### iOS

- [Enabling TurboModules on iOS](new-architecture-app-modules-ios.md)
- [Enabling Fabric on iOS](new-architecture-app-renderer-ios.md)

---
id: navigation
title: 使用导航器跳转页面
---

移动应用基本不会只由一个页面组成。管理多个页面的呈现和切换通常由导航器（navigator）来完成。

本文介绍了 React Native 中可用的各种导航方案。如果你刚开始接触导航功能，推荐使用 [React Navigation](navigation.md#react-navigation)。React Navigation 提供了简洁易用的导航方案，支持在 Android 和 iOS 上实现常见的堆栈导航和标签导航模式。

如果你要将 React Native 集成到已有原生导航管理的应用中，或者想寻找 React Navigation 的替代方案，可以考虑以下库——它在两个平台上都提供了原生导航支持：[react-native-navigation](https://github.com/wix/react-native-navigation)。

## React Navigation

React Navigation 是社区维护的独立导航库，只需几行代码就能配置好应用的页面。

### 快速开始模板

如果你要新建项目，可以使用 React Navigation 模板配合 [Expo](https://expo.dev/) 快速创建：

```shell
npx create-expo-app@latest --template react-navigation/template
```

请参阅项目的 `README.md` 了解更多入门信息。

### 安装与配置

首先在项目中安装所需依赖：

```shell
npm install @react-navigation/native @react-navigation/native-stack
```

接下来安装所需的对等依赖。根据你的项目类型（Expo 托管项目或纯 React Native 项目），需要执行不同的命令：

- 如果是 Expo 托管项目，使用 `expo` 安装依赖：

  ```shell
  npx expo install react-native-screens react-native-safe-area-context
  ```

- 如果是纯 React Native 项目，使用 `npm` 安装依赖：

  ```shell
  npm install react-native-screens react-native-safe-area-context
  ```

  对于纯 React Native 项目的 iOS 端，请确保已安装 [CocoaPods](https://cocoapods.org/)。然后执行以下命令安装 Pod 依赖：

  ```shell
  cd ios
  pod install
  cd ..
  ```

安装并配置好依赖后，就可以开始在项目中使用 React Navigation 了。

使用 React Navigation 时，你需要在应用中配置[导航器](https://reactnavigation.org/docs/glossary-of-terms#navigator)。导航器负责处理应用中页面之间的切换，并提供头部栏、标签栏等 UI 组件。

现在你可以在设备/模拟器上构建并运行应用了。

### 使用方法

下面是一个包含首页和个人资料页的示例：

```tsx
import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```

在此示例中，`RootStack` 是通过 `createNativeStackNavigator` 创建的导航器，其 `screens` 属性中定义了 2 个页面（`Home` 和 `Profile`）。你可以按同样的方式定义任意数量的页面。

每个页面可以在 `options` 属性中指定配置项，例如页面标题。每个页面定义还需要一个 `screen` 属性，值为 React 组件或另一个导航器。

在页面组件内部，可以使用 `useNavigation` Hook 获取 `navigation` 对象，该对象提供了跳转到其他页面的各种方法。例如，使用 `navigation.navigate` 跳转到 `Profile` 页面：

```tsx
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
}

function ProfileScreen({route}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}
```

这个 `native-stack` 导航器使用了原生 API：iOS 上的 `UINavigationController` 和 Android 上的 `Fragment`，因此使用 `createNativeStackNavigator` 构建的导航在行为和性能表现上与基于这些 API 原生构建的应用一致。

React Navigation 还提供了标签导航、抽屉导航等不同类型的导航器包。你可以使用它们在应用中实现各种导航模式。

要全面了解 React Navigation，请参阅 [React Navigation 入门指南](https://reactnavigation.org/docs/getting-started)。

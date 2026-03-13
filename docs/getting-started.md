---
id：环境设置
从 '@site/src/theme/BoxLink' 导入 BoxLink；
隐藏内容表：true
---

从“@site/src/theme/PlatformSupport”导入 PlatformSupport；
从 '@site/src/theme/BoxLink' 导入 BoxLink；

同时，原生开发者可以使用React Native通过一次编写通用功能来获得原生平台之间的平价。

我们相信体验 React Native 的最佳方式是通过我们相信体验 React Native 的最佳方式是通过框架**，一个包含所有必要 API 的工具箱，可让您构建生产就绪的应用程序。

世博会[您也可以在没有框架的情况下使用 React Native，但是我们发现大多数开发人员受益于使用 React Native 框架，例如](https://expo.dev)。 

<细节>
<概括>我可以在没有框架的情况下使用 React Native 吗？</概括>

是的。**但是，如果您正在使用 React Native 构建新应用程序，我们建议使用框架。**

简而言之，您将能够花时间编写应用程序，而不是除了应用程序之外还自己编写整个框架。

React Native 社区花了数年时间完善导航、访问本机 API、处理本机依赖项等方法。

如果没有框架，您要么必须编写自己的解决方案来实现核心功能，要么必须将一组预先存在的库拼凑在一起以创建框架的骨架。

如果您的应用程序有框架无法很好地满足的异常约束，或者您更喜欢自己解决这些问题，则可以使用 Android Studio、Xcode 制作一个没有框架的 React Native 应用程序。[设置您的环境](设置您的环境)以及如何[无需框架即可开始](无框架入门).

</细节>

##使用 Expo 启动一个新的 React Native 项目

<平台支持平台={[“安卓”、“ios”、“电视”、“网络”]} />

Expo 是一个生产级的 React Native 框架。 

Expo 的框架是免费且开源的，并且有一个活跃的社区[GitHub](https://github.com/expo)和[Discord](https://chat.expo.dev)。 

The team at Expo also provides Expo Application Services (EAS), an optional set of services that complements Expo, the Framework, in each step of the development process.

To create a new Expo project, run the following in your terminal:

```shell
npx create-expo-app@latest
```

Once you’ve created your app, check out the rest of Expo’s getting started guide to start developing your app.

<BoxLink href="https://docs.expo.dev/get-started/set-up-your-environment">Continue with Expo</BoxLink>

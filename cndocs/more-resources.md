---
id: more-resources
title: 其他参考资源
---

如果你耐心的读完并理解了本网站上的所有文档，那么你应该已经可以编写一个像样的 React Native 应用了。但是 React Native 并不全是某一家公司的作品——它汇聚了成千上万开源社区开发者的智慧结晶。如果你想深入研究 React Native，那么建议不要错过下面这些参考资源。

## 常用的第三方库

如果你正在使用 React Native，那你应该已经对[React](https://facebook.github.io/react/)有一定的了解了。React 是基础中的基础所以我其实不太好意思提这个——但是，如果不幸你属于“但是”，那么请一定先了解下 React，它也非常适合编写现代化的网站。

开发实践中的一个常见问题就是如何管理应用的“状态（state）”。这方面目前最流行的库非[Redux](http://redux.js.org/)莫属了。不要被 Redux 中经常出现的类似"reducer"这样的概念术语给吓住了——它其实是个很简单的库，网上也有很多优秀的[视频教程（英文）](https://egghead.io/courses/getting-started-with-redux) 。。

如果你在寻找具有某个特定功能的第三方库，那么可以看看别人[精心整理的资源列表](https://github.com/jondot/awesome-react-native)。这里还有个类似的[中文资源列表](https://github.com/reactnativecn/react-native-guide)。

更重要的技能是学会在 github 上搜索。比如你需要搜索`视频`相关的库，那么可以在 github 中搜索`react native video`。

## 开发工具

[Nuclide](https://nuclide.io/)是 Facebook 内部所使用的 React Native 开发工具。它最大的特点是自带调试功能，并且非常好地支持 flow 语法规则。 [VS Code](https://code.visualstudio.com/)也是目前非常受 JS 开发者欢迎的 IDE 工具。

[Ignite](https://github.com/infinitered/ignite)是一套整合了 Redux 以及一些常见 UI 组件的脚手架。它带有一个命令行可以生成 app、组件或是容器。如果你喜欢它的选择搭配，那么不妨一试。

[App Center](https://appcenter.ms/)是由微软提供的热更新服务。热更新可以使你绕过 AppStore 的审核机制，直接修改已经上架的应用。对于国内用户，我们也推荐由本网站提供的[Pushy](http://update.reactnative.cn)热更新服务，相比 CodePush 来说，提供了全中文的文档和技术支持，服务器部署在国内速度更快，还提供了全自动的差量更新方式，大幅节约更新流量，欢迎朋友们试用和反馈意见！

[Expo](https://docs.expo.io)是一套沙盒开发环境，还带有一个已上架的空应用容器。这样你可以在没有原生开发平台（Xcode 或是 Android Studio）的情况下直接编写 React Native 应用（当然这样你只能写 js 部分代码而没法写原生代码）。

[Yoga](https://yogalayout.com/) is a stand-alone layout engine that extends beyond React Native and allows product engineers to build layouts quickly for multiple platforms with a highly optimized open source layout engine designed with speed, size, and ease of use in mind.

[Bugsnag](https://www.bugsnag.com/), [Microsoft App Center](https://appcenter.ms/), and [Sentry](https://sentry.io/welcome/) all provide excellent crash and error monitoring services for React and React Native apps. These services allow you to proactively monitor crashes and issues occuring on your apps in real time so you can fix them quickly and improve user experience.

## React Native 的交流社区

以下这些都是英文的交流区，我也就不翻译了……

The [React Native Community](https://www.facebook.com/groups/react.native.community) Facebook group has thousands of developers, and it's pretty active. Come there to show off your project, or ask how other people solved similar problems.

[Reactiflux](https://discord.gg/0ZcbPKXt5bZjGY5n) is a Discord chat where a lot of React-related discussion happens, including React Native. Discord is just like Slack except it works better for open source projects with a zillion contributors. Check out the #react-native channel.

The [React Twitter account](https://twitter.com/reactjs) covers both React and React Native. Follow the React Native [Twitter account](https://twitter.com/reactnative) and [blog](/react-native/blog/) to find out what's happening in the world of React Native.

There are a lot of [React Native Meetups](http://www.meetup.com/topics/react-native/) that happen around the world. Often there is React Native content in React meetups as well.

Sometimes we have React conferences. We posted the [videos from React.js Conf 2017](https://www.youtube.com/playlist?list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0) and [React.js Conf 2016](https://www.youtube.com/playlist?list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY), and we'll probably have more conferences in the future, too. Stay tuned. You can also find a list of dedicated React Native conferences [here](http://www.awesome-react-native.com/#conferences).

欢迎朋友们在[论坛分享区](http://bbs.reactnative.cn/category/5/)分享中文教程和资源。

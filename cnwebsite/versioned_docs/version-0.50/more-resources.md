---
id: version-0.50-more-resources
title: 其他参考资源
original_id: more-resources
---

如果你耐心的读完并理解了本网站上的所有文档，那么你应该已经可以编写一个像样的React Native应用了。但是React Native并不全是某一家公司的作品——它汇聚了成千上万开源社区开发者的智慧结晶。如果你想深入研究React Native，那么建议不要错过下面这些参考资源。

## 常用的第三方库

如果你正在使用React Native，那你应该已经对[React](https://facebook.github.io/react/)有一定的了解了。React是基础中的基础所以我其实不太好意思提这个——但是，如果不幸你属于“但是”，那么请一定先了解下React，它也非常适合编写现代化的网站。

开发实践中的一个常见问题就是如何管理应用的“状态（state）”。这方面目前最流行的库非[Redux](http://redux.js.org/)莫属了。不要被Redux中经常出现的类似"reducer"这样的概念术语给吓住了——它其实是个很简单的库，网上也有很多优秀的[视频教程（英文）](https://egghead.io/courses/getting-started-with-redux) 。。

如果你在寻找具有某个特定功能的第三方库，那么可以看看别人[精心整理的资源列表](https://github.com/jondot/awesome-react-native)。这里还有个类似的[中文资源列表](https://github.com/reactnativecn/react-native-guide)。

## 示例应用

在[React Native Playground](https://rnplay.org/apps/picks)网站上有很多示例的代码。这个网站有个很酷的特性：它直接对接了真实设备，可以实时在网页上显示运行效果。当然，对于国内用户来说，可能访问很困难。

另外就是Facebook的F8开发大会有一个对应的app，这个app现在已经[开源](https://github.com/fbsamples/f8app)，其开发者还详细地撰写了[相关教程](http://f8-app.liaohuqiu.net/#content)。如果你想学习一个更实际更有深度的例子，那你应该看看这个。

## 开发工具

[Nuclide](https://nuclide.io/)是Facebook内部所使用的React Native开发工具。它最大的特点是自带调试功能，并且非常好地支持flow语法规则。（译注：然而我们还是推荐webstorm或是sublime text）。

[Ignite](https://github.com/infinitered/ignite)是一套整合了Redux以及一些常见UI组件的脚手架。它带有一个命令行可以生成app、组件或是容器。如果你喜欢它的选择搭配，那么不妨一试。

[CodePush](https://microsoft.github.io/code-push/)是由微软提供的热更新服务。热更新可以使你绕过AppStore的审核机制，直接修改已经上架的应用。对于国内用户，我们也推荐由本网站提供的[Pushy](http://update.reactnative.cn)热更新服务，相比CodePush来说，提供了全中文的文档和技术支持，服务器部署在国内速度更快，还提供了全自动的差量更新方式，大幅节约更新流量，欢迎朋友们试用和反馈意见！

[Exponent](http://docs.getexponent.com/versions/v6.0.0/index.html)是一套开发环境，还带有一个已上架的空应用容器。这样你可以在没有原生开发平台（Xcode或是Android Studio）的情况下直接编写React Native应用（当然这样你只能写js部分代码而没法写原生代码）。 

[Deco](https://www.decosoftware.com/)是一个专为React Native设计的集成开发环境。它可以自动创建新项目、搜索开源组件并插入到项目中。你还可以实时地可视化地调整应用的界面。不过目前还只支持mac。

## React Native的交流社区

以下这些都是英文的交流区，我也就不翻译了……

The [React Native Community](https://www.facebook.com/groups/react.native.community) Facebook group has thousands of developers, and it's pretty active. Come there to show off your project, or ask how other people solved similar problems.

[Reactiflux](https://discord.gg/0ZcbPKXt5bZjGY5n) is a Discord chat where a lot of React-related discussion happens, including React Native. Discord is just like Slack except it works better for open source projects with a zillion contributors. Check out the #react-native channel.

The [React Twitter account](https://twitter.com/reactjs) covers both React and React Native. Following that account is a pretty good way to find out what's happening in the world of React.

There are a lot of [React Native Meetups](http://www.meetup.com/topics/react-native/) that happen around the world. Often there is React Native content in React meetups as well.

Sometimes we have React conferences. We posted the [videos from React.js Conf 2016](https://www.youtube.com/playlist?list=PLb0IAmt7-GS0M8Q95RIc2lOM6nc77q1IY), and we'll probably have more conferences in the future, too. Stay tuned.

欢迎朋友们在下方评论区分享中文教程和资源。
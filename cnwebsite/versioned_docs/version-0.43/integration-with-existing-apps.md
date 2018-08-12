---
id: version-0.43-integration-with-existing-apps
title: 嵌入到现有原生应用
original_id: integration-with-existing-apps
---

<div class="integration-toggler">
<style>
.integration-toggler {
  margin-bottom: 10px;
}
.integration-toggler a {
  display: inline-block;
  padding: 10px 5px;
  margin: 2px;
  border: 1px solid #05A5D1;
  border-radius: 3px;
  text-decoration: none !important;
}
.display-platform-objc .integration-toggler .button-objc,
.display-platform-swift .integration-toggler .button-swift,
.display-platform-android .integration-toggler .button-android {
  background-color: #05A5D1;
  color: white;
}
.md-block { display: none; }
.md-block img { max-width:650px; }
.display-platform-objc .objc,
.display-platform-swift .swift,
.display-platform-android .android {
  display: block;
}
</style>
<span>平台:</span>
<a class="button-objc" onclick="display('platform', 'objc')">Objective-C</a>
<a class="button-swift" onclick="display('platform', 'swift')">Swift</a>
<a class="button-android" onclick="display('platform', 'android')">Android</a>
</div>
<div markdown class="md-block objc swift android">

## 核心概念

如果你正准备从头开始制作一个新的应用，那么 React Native 会是个非常好的选择。但如果你只想给现有的原生应用中添加一两个视图或是业务流程，React Native 也同样不在话下。只需简单几步，你就可以给原有应用加上新的基于 React Native 的特性、画面和视图等。

</div>
<div markdown class="md-block objc swift">

把 React Native 组件植入到 iOS 应用中有如下几个主要步骤：

1.  首先当然要了解你要植入的 React Native 组件。
2.  创建一个`Podfile`，在其中以`subspec`的形式填写所有你要植入的 React Native 的组件。
3.  创建 js 文件，编写 React Native 组件的 js 代码。
4.  添加一个事件处理函数，用于创建一个`RCTRootView`。这个`RCTRootView`正是用来承载你的 React Native 组件的，而且它必须对应你在`index.ios.js`中使用`AppRegistry`注册的模块名字。
5.  启动 React Native 的 Packager 服务，运行应用。
6.  根据需要添加更多 React Native 的组件。
7.  [调试](debugging.html)。
8.  准备[部署发布](running-on-device-ios.html) （比如可以利用`react-native-xcode.sh`脚本）。
9.  发布应用，升职加薪，走向人生巅峰！😘

</div>
<div markdown class="md-block android">

把 React Native 组件植入到 Android 应用中有如下几个主要步骤：

1.  首先当然要了解你要植入的 React Native 组件。
2.  在 Android 项目根目录中使用 npm 来安装`react-native` ，这样同时会创建一个`node_modules/`的目录。
3.  创建 js 文件，编写 React Native 组件的 js 代码。
4.  在`build.gradle`文件中添加`com.facebook.react:react-native:+`，以及一个指向`node_nodules/`目录中的`react-native`预编译库的`maven`路径。
5.  创建一个 React Native 专属的`Activity`，在其中再创建`ReactRootView`。
6.  启动 React Native 的 Packager 服务，运行应用。
7.  根据需要添加更多 React Native 的组件。
8.  在真机上[运行](running-on-device-android.html)、[调试](debugging.html)。
9.  [打包](signed-apk-android.html)。
10. 发布应用，升职加薪，走向人生巅峰！😘

</div>
<div markdown class="md-block objc swift android">

## 开发环境准备

</div>
<div markdown class="md-block android">

首先按照[开发环境搭建教程](getting-started.html)来安装 React Native 在安卓平台上所需的一切依赖软件（比如`npm`）。

</div>
<div markdown class="md-block objc swift">

### 基础环境

首先按照[开发环境搭建教程](getting-started.html)来安装 React Native 在 iOS 平台上所需的一切依赖软件（比如`npm`）。

### CocoaPods

[CocoaPods](http://cocoapods.org)是针对 iOS 和 Mac 开发的包管理工具。我们用它来把 React Native 框架的代码下载下来并添加到你当前的项目中。

```bash
$ sudo gem install cocoapods
```

> 从技术上来讲，我们完全可以跳过 CocoaPods，但是这样一来我们就需要手工来完成很多配置项。CocoaPods 可以帮我们完成这些繁琐的工作。

## 示例 App

</div>
<div markdown class="md-block objc">

在本教程中我们用于[示范的 app](https://github.com/JoelMarcey/iOS-2048)是一个[2048](https://en.wikipedia.org/wiki/2048_(video_game)类型的游戏。 下面是这个游戏还没有植入 React Native 时的主界面：

</div>
<div markdown class="md-block swift">

在本教程中我们用于[示范的 app](https://github.com/JoelMarcey/swift-2048)是一个[2048](https://en.wikipedia.org/wiki/2048_(video_game)类型的游戏。下面是这个游戏还没有植入React Native 时的主界面：

</div>
<div markdown class="md-block objc swift">

![Before RN Integration](/img/react-native-existing-app-integration-ios-before.png)

## 依赖包

React Native 的植入过程同时需要 React 和 React Native 两个 node 依赖包。

### `package.json`

我们把具体的依赖包记录在`package.json`文件中。如果项目根目录中没有这个文件，那就自己创建一个。

> 对于一个典型的 React Native 项目来说，一般`package.json`和`index.ios.js`等文件会放在项目的根目录下。而 iOS 相关的原生代码会放在一个名为`ios/`的子目录中,这里也同时放着你的 Xcode 项目文件（`.xcodeproj`）。

下面是一个最简单的`package.json`的内容示例。

> 示例中的`version`字段没有太大意义（除非你要把你的项目发布到 npm 仓库）。`scripts`中是用于启动 packager 服务的命令。`dependencies`中的 react 和 react-native 的版本取决于你的具体需求。一般来说我们推荐使用最新版本。你可以使用`npm info react`和`npm info react-native`来查看当前的最新版本。另外，react-native 对 react 的版本有严格要求，高于或低于某个范围都不可以。本文无法在这里列出所有 react native 和对应的 react 版本要求，只能提醒读者先尝试执行 npm install，然后注意观察安装过程中的报错信息，例如`require react@某.某.某版本, but none was installed`，然后根据这样的提示，执行`npm i -S react@某.某.某版本`。

</div><div markdown class="md-block objc">

```bash
{
  "name": "NumberTileGame",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start"
  },
  "dependencies": {
    "react": "15.4.1",
    "react-native": "0.39.2"
  }
}
```

</div><div markdown class="md-block swift">

```bash
{
  "name": "swift-2048",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start"
  },
  "dependencies": {
    "react": "15.4.1",
    "react-native": "0.39.2"
  }
}
```

</div><div markdown class="md-block objc swift">

### 安装依赖包

使用 npm（node 包管理器，Node package manager）来安装 React 和 React Native 模块。这些模块会被安装到项目根目录下的`node_modules/`目录中。
在包含有 package.json 文件的目录（一般也就是项目根目录）中运行下列命令来安装：

```bash
$ npm install
```

## React Native 框架

React Native 框架整体是作为 node 模块安装到项目中的。下一步我们需要在 CocoaPods 的`Podfile`中指定我们所需要使用的组件。

### Subspecs

在你开始把 React Native 植入到你的应用中之前，首先要决定具体整合的是 React Native 框架中的哪些部分。而这就是`subspec`要做的工作。在创建`Podfile`文件的时候，需要指定具体安装哪些 React Native 的依赖库。所指定的每一个库就称为一个`subspec`。

可用的`subspec`都列在[`node_modules/react-native/React.podspec`](https://github.com/facebook/react-native/blob/master/React.podspec)中，基本都是按其功能命名的。一般来说你首先需要添加`Core`，这一`subspec`包含了必须的`AppRegistry`、`StyleSheet`、`View`以及其他的一些 React Native 核心库。如果你想使用 React Native 的`Text`库（即`<Text>`组件），那就需要添加`RCTText`的`subspec`。同理，`Image`需要加入`RCTImage`，等等。

#### Podfile

在 React 和 React Native 模块成功安装到`node_modules`目录之后，你就可以开始创建`Podfile`以便选择所需的组件安装到应用中。

创建`Podfile`的最简单的方式就是在 iOS 原生代码所在的目录中使用 CocoaPods 的`init`命令：

```bash
## 在iOS原生代码所在的目录中（也就是`.xcodeproj`文件所在的目录）执行：
$ pod init
```

`Podfile`会创建在执行命令的目录中。你需要调整其内容以满足你的植入需求。调整后的`Podfile`的内容看起来类似下面这样：

</div><div markdown class="md-block objc">

```
# target的名字一般与你的项目名字相同
target 'NumberTileGame' do

  # 'node_modules'目录一般位于根目录中
  # 但是如果你的结构不同，那你就要根据实际路径修改下面的`:path`
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # 这个模块是用于调试功能的
    # 在这里继续添加你所需要的模块
  ]
  # 如果你的RN版本 >= 0.42.0，请加入下面这行
  pod "Yoga", :path => "../node_modules/react-native/ReactCommon/yoga"

end
```

</div><div markdown class="md-block swift">

```
source 'https://github.com/CocoaPods/Specs.git'

# 对于Swift应用来说下面两句是必须的
platform :ios, '8.0'
use_frameworks!

# target的名字一般与你的项目名字相同
target 'swift-2048' do

  # 'node_modules'目录一般位于根目录中
  # 但是如果你的结构不同，那你就要根据实际路径修改下面的`:path`
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # 这个模块是用于调试功能的
    # 在这里继续添加你所需要的模块
  ]
  # 如果你的RN版本 >= 0.42.0，请加入下面这行
  pod "Yoga", :path => "../node_modules/react-native/ReactCommon/yoga"

end
```

</div><div markdown class="md-block objc swift">

#### Pod 安装

创建好了`Podfile`后，就可以开始安装 React Native 的 pod 包了。

```bash
$ pod install
```

然后你应该可以看到类似下面的输出(译注：同样由于众所周知的网络原因，pod install 的过程在国内非常不顺利，请自行配备稳定的翻墙工具，或是尝试一些[镜像源](https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&ch=2&tn=98010089_dg&wd=cocoapods%20%E9%95%9C%E5%83%8F&oq=cocoapods%E9%95%9C%E5%83%8F&rsv_pq=8fe4602600052d40&rsv_t=5d9fNEvNrqwcBS3rvMCKw0Cc%2FoW6XdW%2Bm4zks2nF3BxZ6cyWtJx1g%2F39Id6cUzeRTLM&rqlang=cn&rsv_enter=0&inputT=809&rsv_sug3=9&rsv_sug1=7&rsv_sug7=100&prefixsug=cocoapods%20%E9%95%9C%E5%83%8F&rsp=0&rsv_sug4=1010))：

```bash
Analyzing dependencies
Fetching podspec for `React` from `../node_modules/react-native`
Downloading dependencies
Installing React (0.26.0)
Generating Pods project
Integrating client project
Sending stats
Pod installation complete! There are 3 dependencies from the Podfile and 1 total pod installed.
```

</div><div markdown class="md-block swift">

> 如果你看到类似"_The `swift-2048 [Debug]` target overrides the `FRAMEWORK_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-swift-2048/Pods-swift-2048.debug.xcconfig`. This can lead to problems with the CocoaPods installation_"的警告，请查看 Xcode 的`Build Settings`中的`Framework Search Paths`选项，确保其中的`Debug`和`Release`都只包含`$(inherited)`。

</div><div markdown class="md-block objc swift">

## 代码集成

现在我们已经准备好了所有依赖，可以开始着手修改原生代码来把 React Native 真正植入到应用中了。在我们的 2048 示例中，首先尝试添加一个显示有"High Score"（得分排行榜）的 React Native 页面。

### React Native 组件

我们首先要写的是"High Score"（得分排行榜）的 JavaScript 端的代码。

#### 创建一个`index.ios.js`文件

首先创建一个空的`index.ios.js`文件。一般来说我们把它放置在项目根目录下。

> `index.ios.js`是 React Native 应用在 iOS 上的入口文件。而且它是不可或缺的！它可以是个很简单的文件，简单到可以只包含一行`require/import`导入语句。本教程中为了简单示范，把全部的代码都写到了`index.ios.js`里（当然实际开发中我们并不推荐这样做）。

```bash
# 在项目根目录执行以下命令创建文件：
$ touch index.ios.js
```

#### 添加你自己的 React Native 代码

在`index.ios.js`中添加你自己的组件。这里我们只是简单的添加一个`<Text>`组件，然后用一个带有样式的`<View>`组件把它包起来。

```js
"use strict";

import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

class RNHighScores extends React.Component {
  render() {
    var contents = this.props["scores"].map(score => (
      <Text key={score.name}>
        {score.name}:{score.value}
        {"\n"}
      </Text>
    ));
    return (
      <View style={styles.container}>
        <Text style={styles.highScoresTitle}>2048 High Scores!</Text>
        <Text style={styles.scores}>{contents}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  scores: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

// 整体js模块的名称
AppRegistry.registerComponent("RNHighScores", () => RNHighScores);
```

> `RNHighScores`是整体 js 模块（即你所有的 js 代码）的名称。你在 iOS 原生代码中添加 React Native 视图时会用到这个名称。

## The Magic: `RCTRootView`

现在我们已经在`index.ios.js`中创建了 React Native 组件，下一步就是把这个组件添加给一个新的或已有的`ViewController`。 The easiest path to take is to optionally create an event path to your component and then add that component to an existing `ViewController`.

We will tie our React Native component with a new native view in the `ViewController` that will actually host it called `RCTRootView` .

### Create an Event Path

You can add a new link on the main game menu to go to the "High Score" React Native page.

![Event Path](/img/react-native-add-react-native-integration-link.png)

#### 事件处理

We will now add an event handler from the menu link. A method will be added to the main `ViewController` of your application. This is where `RCTRootView` comes into play.

When you build a React Native application, you use the React Native packager to create an `index.ios.bundle` that will be served by the React Native server. Inside `index.ios.bundle` will be our `RNHighScore` module. So, we need to point our `RCTRootView` to the location of the `index.ios.bundle` resource (via `NSURL`) and tie it to the module.

We will, for debugging purposes, log that the event handler was invoked. Then, we will create a string with the location of our React Native code that exists inside the `index.ios.bundle`. Finally, we will create the main `RCTRootView`. Notice how we provide `RNHighScores` as the `moduleName` that we created [above](#the-react-native-component) when writing the code for our React Native component.

</div><div markdown class="md-block objc">

首先导入`RCTRootView`的头文件。

```
#import "RCTRootView.h"
```

> 这里的`initialProperties` are here for illustration purposes so we have some data for our high score screen. In our React Native component, we will use `this.props` to get access to that data.

```
- (IBAction)highScoreButtonPressed:(id)sender {
    NSLog(@"High Score Button Pressed");
    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];
    RCTRootView *rootView =
      [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                           moduleName        : @"RNHighScores"
                           initialProperties :
                             @{
                               @"scores" : @[
                                 @{
                                   @"name" : @"Alex",
                                   @"value": @"42"
                                  },
                                 @{
                                   @"name" : @"Joel",
                                   @"value": @"10"
                                 }
                               ]
                             }
                           launchOptions    : nil];
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
    [self presentViewController:vc animated:YES completion:nil];
}
```

> Note that `RCTRootView initWithURL` starts up a new JSC VM. To save resources and simplify the communication between RN views in different parts of your native app, you can have multiple views powered by React Native that are associated with a single JS runtime. To do that, instead of using `[RCTRootView alloc] initWithURL`, use [`RCTBridge initWithBundleURL`](https://github.com/facebook/react-native/blob/master/React/Base/RCTBridge.h#L93) to create a bridge and then use `RCTRootView initWithBridge`.

</div><div markdown class="md-block swift">

首先`import`导入`React`库。

```
import React
```

> The `initialProperties` are here for illustration purposes so we have some data for our high score screen. In our React Native component, we will use `this.props` to get access to that data.

```
@IBAction func highScoreButtonTapped(sender : UIButton) {
  NSLog("Hello")
  let jsCodeLocation = URL(string: "http://localhost:8081/index.ios.bundle?platform=ios")
  let mockData:NSDictionary = ["scores":
      [
          ["name":"Alex", "value":"42"],
          ["name":"Joel", "value":"10"]
      ]
  ]

  let rootView = RCTRootView(
      bundleURL: jsCodeLocation,
      moduleName: "RNHighScores",
      initialProperties: mockData as [NSObject : AnyObject],
      launchOptions: nil
  )
  let vc = UIViewController()
  vc.view = rootView
  self.present(vc, animated: true, completion: nil)
}
```

> 注意`RCTRootView bundleURL` starts up a new JSC VM. To save resources and simplify the communication between RN views in different parts of your native app, you can have multiple views powered by React Native that are associated with a single JS runtime. To do that, instead of using `RCTRootView bundleURL`, use [`RCTBridge initWithBundleURL`](https://github.com/facebook/react-native/blob/master/React/Base/RCTBridge.h#L93) to create a bridge and then use `RCTRootView initWithBridge`.

</div><div markdown class="md-block objc">

> When moving your app to production, the `NSURL` can point to a pre-bundled file on disk via something like `[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];`. You can use the `react-native-xcode.sh` script in `node_modules/react-native/packager/` to generate that pre-bundled file.

</div><div markdown class="md-block swift">

> When moving your app to production, the `NSURL` can point to a pre-bundled file on disk via something like `let mainBundle = NSBundle(URLForResource: "main" withExtension:"jsbundle")`. You can use the `react-native-xcode.sh` script in `node_modules/react-native/packager/` to generate that pre-bundled file.

</div><div markdown class="md-block objc swift">

#### Wire Up

Wire up the new link in the main menu to the newly added event handler method.

![Event Path](/img/react-native-add-react-native-integration-wire-up.png)

> One of the easier ways to do this is to open the view in the storyboard and right click on the new link. Select something such as the `Touch Up Inside` event, drag that to the storyboard and then select the created method from the list provided.

## 测试植入结果

You have now done all the basic steps to integrate React Native with your current application. Now we will start the React Native packager to build the `index.ios.bundle` packager and the server running on `localhost` to serve it.

### App Transport Security

Apple has blocked implicit cleartext HTTP resource loading. So we need to add the following our project's `Info.plist` (or equivalent) file.

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>localhost</key>
        <dict>
            <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
```

### 运行 Packager

```bash
# From the root of your project, where the `node_modules` directory is located.
$ npm start
```

### 运行应用

如果你使用的是 Xcode，那么照常编译和运行应用即可。如果你没有使用 Xcode（但是你仍然必须安装 Xcode），则可以在命令行中使用以下命令来运行应用：

```bash
# 在项目的根目录中执行：
$ react-native run-ios
```

In our sample application, you should see the link to the "High Scores" and then when you click on that you will see the rendering of your React Native component.

Here is the _native_ application home screen:

![Home Screen](/img/react-native-add-react-native-integration-example-home-screen.png)

Here is the _React Native_ high score screen:

![High Scores](/img/react-native-add-react-native-integration-example-high-scores.png)

> If you are getting module resolution issues when running your application please see [this GitHub issue](https://github.com/facebook/react-native/issues/4968) for information and possible resolution. [This comment](https://github.com/facebook/react-native/issues/4968#issuecomment-220941717) seemed to be the latest possible resolution.

### 看一下完整的代码变更

</div><div markdown class="md-block objc">

你可以在这个[GitHub 提交记录](https://github.com/JoelMarcey/iOS-2048/commit/9ae70c7cdd53eb59f5f7c7daab382b0300ed3585)里查看一次完整的植入过程具体有哪些代码/文件变更。

</div><div markdown class="md-block swift">

你可以在这个[GitHub 提交记录](https://github.com/JoelMarcey/swift-2048/commit/13272a31ee6dd46dc68b1dcf4eaf16c1a10f5229)里查看一次完整的植入过程具体有哪些代码/文件变更。

</div><div markdown class="md-block android">

## 在应用中添加 JS 代码

在项目的根目录中运行：

    $ npm init
    $ npm install --save react react-native
    $ curl -o .flowconfig https://raw.githubusercontent.com/facebook/react-native/master/.flowconfig

`npm init`创建了一个空的 node 模块（其实就是创建了一个 package.json 描述文件），而`npm install`则创建了 node_modules 目录并把 react 和 react-native 下载到了其中。至于第三步 curl 命令，其实质是`下载`.flowconfig 配置文件，这个文件用于约束 js 代码的写法。这一步非必需，可跳过。下面我们打开新创建的`package.json`文件，然后在其`scripts`字段中加入:

    "start": "node node_modules/react-native/local-cli/cli.js start"

现在你的`package.json`内容应该类似这样：

```bash
{
  "name": "NumberTileGame",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start"
  },
  "dependencies": {
    "react": "15.4.1",
    "react-native": "0.39.2"
  }
}
```

> 示例中的`version`字段没有太大意义（除非你要把你的项目发布到 npm 仓库）。`scripts`中是用于启动 packager 服务的命令。`dependencies`中的 react 和 react-native 的版本取决于你的具体需求。一般来说我们推荐使用最新版本。你可以使用`npm info react`和`npm info react-native`来查看当前的最新版本。另外，react-native 对 react 的版本有严格要求，高于或低于某个范围都不可以。本文无法在这里列出所有 react native 和对应的 react 版本要求，只能提醒读者先尝试执行 npm install，然后注意观察安装过程中的报错信息，例如`require react@某.某.某版本, but none was installed`，然后根据这样的提示，执行`npm i -S react@某.某.某版本`。

接下来在项目根目录中创建`index.android.js`文件，然后将下面的代码复制粘贴进来：

```js
"use strict";

import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

class HelloWorld extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello, World</Text>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  hello: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

AppRegistry.registerComponent("HelloWorld", () => HelloWorld);
```

## 准备工作

在你的 app 中 `build.gradle` 文件中添加 React Native 依赖:

```
 dependencies {
     ...
     compile "com.facebook.react:react-native:+" // From node_modules.
 }
```

> 你想要指定构建时的 React Native 版本，请用 `npm` 已下载的本地 React Native 的版本号替换 `+` 。

在项目的 `build.gradle` 文件中为 React Native 添加一个 maven 依赖的入口，必须写在 "allprojects" 代码块中:

```
allprojects {
    repositories {
        ...
        maven {
            // All of React Native (JS, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
    ...
}
```

> 确保依赖路径的正确！以免在 Android Studio 运行 Gradle 同步构建时抛出 “Failed to resolve: com.facebook.react:react-native:0.x.x" 异常。

接着，在 `AndroidManifest.xml` 清单文件中声明网络权限:

    <uses-permission android:name="android.permission.INTERNET" />

如果需要访问 `DevSettingsActivity` 界面，也需要在 `AndroidManifest.xml` 中声明:

    <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />

This is only really used in dev mode when reloading JavaScript from the development server, so you can strip this in release builds if you need to.

## 添加原生代码

想要通过原生代码调用 React Native ，就像这样，我们需要在一个 `Activity` 中创建一个 `ReactRootView` 对象，将它关联一个 React application 并设为界面的主视图。

> 如果你想在安卓 5.0 以下的系统上运行，请用 `com.android.support:appcompat` 包中的 `AppCompatActivity` 代替 `Activity` 。

```java
public class MyReactActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        // 注意这里的HelloWorld必须对应“index.android.js”中的
        // “AppRegistry.registerComponent()”的第一个参数
        mReactRootView.startReactApplication(mReactInstanceManager, "HelloWorld", null);

        setContentView(mReactRootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

> 如果你的项目名字不是叫“HelloWorld”，则需要将“index.android.js”中的“AppRegistry.registerComponent()”方法中的第一个参数替换为对应的名字。

如果你使用的是 Android Studio , 可以使用`Alt + Enter`快捷键来自动为 MyReactActivity 类补上缺失的 import 语句。注意引入的`BuildConfig`应该是在你自己的包中，而不是在`...facebook...`的包中。

我们需要把 `MyReactActivity` 的主题设定为 `Theme.AppCompat.Light.NoActionBar` ，因为里面有许多组件都使用了这一主题。

```xml
<activity
  android:name=".MyReactActivity"
  android:label="@string/app_name"
  android:theme="@style/Theme.AppCompat.Light.NoActionBar">
</activity>
```

> 一个`ReactInstanceManager`可以在多个 activities 或 fragments 间共享。 You will want to make your own `ReactFragment` or `ReactActivity` and have a singleton _holder_ that holds a `ReactInstanceManager`. When you need the `ReactInstanceManager` (e.g., to hook up the `ReactInstanceManager` to the lifecycle of those Activities or Fragments) use the one provided by the singleton.

下一步我们需要把一些 activity 的生命周期回调传递给`ReactInstanceManager`：

```java
@Override
protected void onPause() {
    super.onPause();

    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostPause(this);
    }
}

@Override
protected void onResume() {
    super.onResume();

    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostResume(this, this);
    }
}

@Override
protected void onDestroy() {
    super.onDestroy();

    if (mReactInstanceManager != null) {
        mReactInstanceManager.onHostDestroy();
    }
}
```

We also need to pass back button events to React Native:

```java
@Override
 public void onBackPressed() {
    if (mReactInstanceManager != null) {
        mReactInstanceManager.onBackPressed();
    } else {
        super.onBackPressed();
    }
}
```

This allows JavaScript to control what happens when the user presses the hardware back button (e.g. to implement navigation). When JavaScript doesn't handle a back press, your `invokeDefaultOnBackPressed` method will be called. By default this simply finishes your `Activity`.

Finally, we need to hook up the dev menu. By default, this is activated by (rage) shaking the device, but this is not very useful in emulators. So we make it show when you press the hardware menu button (use `Ctrl + M` if you're using Android Studio emulator):

```java
@Override
public boolean onKeyUp(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
        mReactInstanceManager.showDevOptionsDialog();
        return true;
    }
    return super.onKeyUp(keyCode, event);
}
```

现在 activity 已就绪，可以运行一些 JavaScript 代码了。

### 配置权限以便开发中的红屏错误能正确显示

如果你的应用会运行在 Android 6.0（API level 23）或更高版本，请确保你在开发版本中有打开`悬浮窗(overlay)`权限。If your app is targeting the Android `API level 23` or greater, make sure you have the `overlay` permission enabled for the development build. You can check it with `Settings.canDrawOverlays(this);`. This is required in dev builds because react native development errors must be displayed above all the other windows. Due to the new permissions system introduced in the API level 23, the user needs to approve it. This can be acheived by adding the following code to the Activity file in the onCreate() method. OVERLAY_PERMISSION_REQ_CODE is a field of the class which would be responsible for passing the result back to the Activity.

```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    if (!Settings.canDrawOverlays(this)) {
        Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                                   Uri.parse("package:" + getPackageName()));
        startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
    }
}
```

Finally, the `onActivityResult()` method (as shown in the code below) has to be overridden to handle the permission Accepted or Denied cases for consistent UX.

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                // SYSTEM_ALERT_WINDOW permission not granted...
            }
        }
    }
}
```

## 运行你的应用

运行应用首先需要启动开发服务器（Packager）。你只需在项目根目录中执行以下命令即可：

    $ npm start

保持 packager 的窗口运行不要关闭，然后像往常一样编译运行你的 Android 应用(在命令行中执行`./gradlew installDebug`或是在 Android Studio 中编译运行)。

> 如果你是使用 Android Studio 来编译运行，有可能会导致 packger 报错退出。这种情况下你需要安装[watchman](https://facebook.github.io/watchman/)。但是 watchman 目前没有稳定的 Windows 版本，所以在 Windows 下这种崩溃情况暂时没有特别好的解决方案。

编译执行一切顺利进行之后，在进入到 MyReactActivity 时应该就能立刻从 packager 中读取 JavaScript 代码并执行和显示：

![Screenshot](/img/EmbeddedAppAndroid.png)

## 在 Android Studio 中打包

你也可以使用 Android Studio 来打 release 包！其步骤基本和原生应用一样，只是在每次编译打包之前需要先执行 js 文件的打包(即生成离线的 jsbundle 文件)。具体的 js 打包命令如下：

    $ react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/com/your-company-name/app-package-name/src/main/assets/index.android.bundle --assets-dest android/com/your-company-name/app-package-name/src/main/res/

注意把上述命令中的路径替换为你实际项目的路径。如果 assets 目录不存在，需要提前自己创建一个。

然后在 Android Studio 中正常生成 release 版本即可！

</div>
<script>
window.display = function (type, value) {
  var container = document.querySelector('.md-block').parentNode;
  container.className = 'display-' + type + '-' + value + ' ' +
    container.className.replace(RegExp('display-' + type + '-[a-z]+ ?'), '');
}
// If we are coming to the page with a hash in it (i.e. from a search, for example), try to get
// us as close as possible to the correct platform and dev os using the hashtag and block walk up.
var foundHash = false;
if (window.location.hash !== '' && window.location.hash !== 'content') { // content is default
  var hashLinks = document.querySelectorAll('a.hash-link');
  for (var i = 0; i < hashLinks.length && !foundHash; ++i) {
    if (hashLinks[i].hash === window.location.hash) {
      var parent = hashLinks[i].parentElement;
      while (parent) {
        if (parent.tagName === 'BLOCK') {
          var targetPlatform = null;
          // Could be more than one target platform, but just choose some sort of order
          // of priority here.
          // Target Platform
          if (parent.className.indexOf('objc') > -1) {
            targetPlatform = 'objc';
          } else if (parent.className.indexOf('swift') > -1) {
            targetPlatform = 'swift';
          } else if (parent.className.indexOf('android') > -1) {
            targetPlatform = 'android';
          } else {
            break; // assume we don't have anything.
          }
          // We would have broken out if both targetPlatform and devOS hadn't been filled.
          display('platform', targetPlatform);
          foundHash = true;
          break;
        }
        parent = parent.parentElement;
      }
    }
  }
}
// Do the default if there is no matching hash
if (!foundHash) {
  var isMac = navigator.platform === 'MacIntel';
  display('platform', isMac ? 'objc' : 'android');
}
</script>

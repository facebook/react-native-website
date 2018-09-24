---
id: version-0.57-integration-with-existing-apps
title: 集成到现有原生应用
original_id: integration-with-existing-apps
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

<style>
  .toggler li {
    display: inline-block;
    position: relative;
    top: 1px;
    padding: 10px;
    margin: 0px 2px 0px 2px;
    border: 1px solid #05A5D1;
    border-bottom-color: transparent;
    border-radius: 3px 3px 0px 0px;
    color: #05A5D1;
    background-color: transparent;
    font-size: 0.99em;
    cursor: pointer;
  }
  .toggler li:first-child {
    margin-left: 0;
  }
  .toggler li:last-child {
    margin-right: 0;
  }
  .toggler ul {
    width: 100%;
    display: inline-block;
    list-style-type: none;
    margin: 0;
    border-bottom: 1px solid #05A5D1;
    cursor: default;
  }
  @media screen and (max-width: 960px) {
    .toggler li,
    .toggler li:first-child,
    .toggler li:last-child {
      display: block;
      border-bottom-color: #05A5D1;
      border-radius: 3px;
      margin: 2px 0px 2px 0px;
    }
    .toggler ul {
      border-bottom: 0;
    }
  }
  .toggler a {
    display: inline-block;
    padding: 10px 5px;
    margin: 2px;
    border: 1px solid #05A5D1;
    border-radius: 3px;
    text-decoration: none !important;
  }
  .display-language-objc .toggler .button-objc,
  .display-language-swift .toggler .button-swift,
  .display-language-android .toggler .button-android {
    background-color: #05A5D1;
    color: white;
  }
  block { display: none; }
  .display-language-objc .objc,
  .display-language-swift .swift,
  .display-language-android .android {
    display: block;
  }
</style>

如果你正准备从头开始制作一个新的应用，那么 React Native 会是个非常好的选择。但如果你只想给现有的原生应用中添加一两个视图或是业务流程，React Native 也同样不在话下。只需简单几步，你就可以给原有应用加上新的基于 React Native 的特性、画面和视图等。

具体的步骤根据你所开发的目标平台不同而不同。

<div class="toggler">
  <ul role="tablist" >
    <li id="objc" class="button-objc" aria-selected="false" role="tab" tabindex="0" aria-controls="objctab" onclick="displayTab('language', 'objc')">
      iOS (Objective-C)
    </li>
    <li id="swift" class="button-swift" aria-selected="false" role="tab" tabindex="0" aria-controls="swifttab" onclick="displayTab('language', 'swift')">
      iOS (Swift)
    </li>
    <li id="android" class="button-android" aria-selected="false" role="tab" tabindex="0" aria-controls="androidtab" onclick="displayTab('language', 'android')">
      Android (Java)
    </li>
  </ul>
</div>

<block class="objc swift android" />

## 核心概念

<block class="objc swift" />

把 React Native 组件集成到 iOS 应用中有如下几个主要步骤：

1.  配置好 React Native 依赖和项目结构。
2.  了解你要集成的 React Native 组件。
3.  使用 CocoaPods 把这些组件以依赖的形式加入到项目中。
4.  创建 js 文件，编写 React Native 组件的 js 代码。
5.  在应用中添加一个`RCTRootView`。这个`RCTRootView`正是用来承载你的 React Native 组件的容器。
6.  启动 React Native 的 Packager 服务，运行应用。
7.  验证这部分组件是否正常工作。

<block class="android" />

把 React Native 组件集成到 Android 应用中有如下几个主要步骤：

1.  配置好 React Native 依赖和项目结构。
2.  创建 js 文件，编写 React Native 组件的 js 代码。
3.  在应用中添加一个`RCTRootView`。这个`RCTRootView`正是用来承载你的 React Native 组件的容器。
4.  启动 React Native 的 Packager 服务，运行应用。
5.  验证这部分组件是否正常工作。

<block class="objc swift android" />

## 开发环境准备

<block class="objc swift" />

首先按照[开发环境搭建教程](getting-started.md)来安装 React Native 在 iOS 平台上所需的一切依赖软件。

### 1. 配置项目目录结构

首先创建一个空目录用于存放 React Native 项目，然后在其中创建一个`/ios`子目录，把你现有的 iOS 项目拷贝到`/ios`子目录中。

<block class="android" />

首先按照[开发环境搭建教程](getting-started.md)来安装 React Native 在 Android 平台上所需的一切依赖软件。

### 1. 配置项目目录结构

首先创建一个空目录用于存放 React Native 项目，然后在其中创建一个`/android`子目录，把你现有的 Android 项目拷贝到`/android`子目录中。

<block class="objc swift android" />

### 2. 安装 JavaScript 依赖包

在项目根目录下创建一个名为`package.json`的空文本文件，然后填入以下内容：

```
{
  "name": "MyReactNativeApp",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start"
  }
}
```

> 示例中的`version`字段没有太大意义（除非你要把你的项目发布到 npm 仓库）。`scripts`中是用于启动 packager 服务的命令。

接下来我们使用 yarn 或 npm（两者都是 node 的包管理器）来安装 React 和 React Native 模块。请打开一个终端/命令提示行，进入到项目目录中（即包含有 package.json 文件的目录），然后运行下列命令来安装：

```
$ yarn add react-native
```

这样默认会安装最新版本的 React Native，同时会打印出类似下面的警告信息（你可能需要滚动屏幕才能注意到）：

> warning "react-native@0.52.2" has unmet peer dependency "react@16.2.0".

这是正常现象，意味着我们还需要安装指定版本的 React：

```
$ yarn add react@16.2.0
```

注意必须严格匹配警告信息中所列出的版本，高了或者低了都不可以。

> 如果你使用多个第三方依赖，可能这些第三方各自要求的 react 版本有所冲突，此时应优先满足`react-native`所需要的`react`版本。其他第三方能用则用，不能用则只能考虑选择其他库。

所有 JavaScript 依赖模块都会被安装到项目根目录下的`node_modules/`目录中（这个目录我们原则上不复制、不移动、不修改、不上传，随用随装）。

把`node_modules/`目录记录到`.gitignore`文件中（即不上传到版本控制系统，只保留在本地）。

<block class="objc swift" />

### 3. 安装 CocoaPods

[CocoaPods](http://cocoapods.org)是针对 iOS 和 Mac 开发的包管理工具。我们用它来把 React Native 框架的代码下载下来并添加到你当前的项目中。

我们建议使用[Homebrew](http://brew.sh/)来安装 CocoaPods。

```
$ brew install cocoapods
```

> 从技术上来讲，我们完全可以跳过 CocoaPods，但是这样一来我们就需要手工来完成很多配置项。CocoaPods 可以帮我们完成这些繁琐的工作。

<block class="objc swift" />

## 把 React Native 添加到你的应用中

<block class="objc" />

在本教程中我们用于[示范的 app](https://github.com/JoelMarcey/iOS-2048)是一个[2048](https://en.wikipedia.org/wiki/2048_(video_game)类型的游戏。下面是这个游戏还没有集成React Native 时的主界面：

<block class="swift" />

在本教程中我们用于[示范的 app](https://github.com/JoelMarcey/swift-2048)是一个[2048](https://en.wikipedia.org/wiki/2048_(video_game)类型的游戏。下面是这个游戏还没有集成React Native 时的主界面：

<block class="objc swift" />

![Before RN Integration](assets/react-native-existing-app-integration-ios-before.png)

### Xcode 命令行工具

安装 Xcode 命令行工具。 Choose "Preferences..." in the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

![Xcode Command Line Tools](assets/GettingStartedXcodeCommandLineTools.png)

### 配置 CocoaPods 的依赖

React Native 框架整体是作为 node 模块安装到项目中的。下一步我们需要在 CocoaPods 的`Podfile`中指定我们所需要使用的"subspecs"。

可用的`subspec`都列在[`node_modules/react-native/React.podspec`](https://github.com/facebook/react-native/blob/master/React.podspec)中，基本都是按其功能命名的。一般来说你首先需要添加`Core`，这一`subspec`包含了必须的`AppRegistry`、`StyleSheet`、`View`以及其他的一些 React Native 核心库。如果你想使用 React Native 的`Text`库（即`<Text>`组件），那就需要添加`RCTText`的`subspec`。同理，`Image`需要加入`RCTImage`，等等。

我们需要在`Podfile`文件中指定所需的`subspec`。创建`Podfile`的最简单的方式就是在`/ios`子目录中使用 CocoaPods 的`init`命令：

```
$ pod init
```

`Podfile`会创建在执行命令的目录中。你需要调整其内容以满足你的集成需求。调整后的`Podfile`的内容看起来类似下面这样：

<block class="objc" />

```
# target的名字一般与你的项目名字相同
target 'NumberTileGame' do

  # 'node_modules'目录一般位于根目录中
  # 但是如果你的结构不同，那你就要根据实际路径修改下面的`:path`
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # 如果RN版本 >= 0.47则加入此行
    'DevSupport', # 如果RN版本 >= 0.43，则需要加入此行才能开启开发者菜单
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # 调试功能需要此模块
    'RCTAnimation', # FlatList和原生动画功能需要此模块
    # 在这里继续添加你所需要的其他RN模块
  ]
  # 如果你的RN版本 >= 0.42.0，则加入下面这行
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

  # 如果RN版本 >= 0.45则加入下面三个第三方编译依赖
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

end
```

<block class="swift" />

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
    'CxxBridge', # 如果RN版本 >= 0.47则加入此行
    'DevSupport', # 如果RN版本 >= 0.43，则需要加入此行才能开启开发者菜单
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # 调试功能需要此模块
    'RCTAnimation', # FlatList和原生动画功能需要此模块
    # 在这里继续添加你所需要的其他RN模块
  ]
  # 如果你的RN版本 >= 0.42.0，则加入下面这行
  pod "yoga", :path => "../node_modules/react-native/ReactCommon/yoga"

  # 如果RN版本 >= 0.45则加入下面三个第三方编译依赖
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

end
```

<block class="objc swift" />

创建好了`Podfile`后，就可以开始安装 React Native 的 pod 包了。

```
$ pod install
```

然后你应该可以看到类似下面的输出(译注：同样由于众所周知的网络原因，pod install 的过程在国内非常不顺利，请自行配备稳定的翻墙工具，或是尝试一些[镜像源](https://www.baidu.com/s?wd=cocoapods%20%E9%95%9C%E5%83%8F&oq=cocoapods%E9%95%9C%E5%83%8F))：

```
Analyzing dependencies
Fetching podspec for `React` from `../node_modules/react-native`
Downloading dependencies
Installing React (0.26.0)
Generating Pods project
Integrating client project
Sending stats
Pod installation complete! There are 3 dependencies from the Podfile and 1 total pod installed.
```

> If this fails with errors mentioning `xcrun`, make sure that in Xcode in Preferences > Locations the Command Line Tools are assigned.

<block class="swift" />

> 如果你看到类似"_The `swift-2048 [Debug]` target overrides the `FRAMEWORK_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-swift-2048/Pods-swift-2048.debug.xcconfig`. This can lead to problems with the CocoaPods installation_"的警告，请查看 Xcode 的`Build Settings`中的`Framework Search Paths`选项，确保其中的`Debug`和`Release`都只包含`$(inherited)`。

<block class="objc swift" />

### 代码集成

现在我们已经准备好了所有依赖，可以开始着手修改原生代码来把 React Native 真正集成到应用中了。在我们的 2048 示例中，首先尝试添加一个显示有"High Score"（得分排行榜）的 React Native 页面。

#### React Native 组件

我们首先要写的是"High Score"（得分排行榜）的 JavaScript 端的代码。

##### 1. 创建一个`index.js`文件

首先在项目根目录下创建一个空的`index.js`文件。（注意在 0.49 版本之前是 index.ios.js 文件）

`index.js`是 React Native 应用在 iOS 上的入口文件。而且它是不可或缺的！它可以是个很简单的文件，简单到可以只包含一行`require/import`导入语句。本教程中为了简单示范，把全部的代码都写到了`index.js`里（当然实际开发中我们并不推荐这样做）。

##### 2. 添加你自己的 React Native 代码

在`index.js`中添加你自己的组件。这里我们只是简单的添加一个`<Text>`组件，然后用一个带有样式的`<View>`组件把它包起来。

```javascript
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

#### 掌握核心科技： `RCTRootView`

现在我们已经在`index.js`中创建了 React Native 组件，下一步就是把这个组件添加给一个新的或已有的`ViewController`。 The easiest path to take is to optionally create an event path to your component and then add that component to an existing `ViewController`.

We will tie our React Native component with a new native view in the `ViewController` that will actually host it called `RCTRootView` .

##### 1. Create an Event Path

You can add a new link on the main game menu to go to the "High Score" React Native page.

![Event Path](assets/react-native-add-react-native-integration-link.png)

##### 2. 事件处理

We will now add an event handler from the menu link. A method will be added to the main `ViewController` of your application. This is where `RCTRootView` comes into play.

When you build a React Native application, you use the React Native packager to create an `index.bundle` that will be served by the React Native server. Inside `index.bundle` will be our `RNHighScore` module. So, we need to point our `RCTRootView` to the location of the `index.bundle` resource (via `NSURL`) and tie it to the module.

We will, for debugging purposes, log that the event handler was invoked. Then, we will create a string with the location of our React Native code that exists inside the `index.bundle`. Finally, we will create the main `RCTRootView`. Notice how we provide `RNHighScores` as the `moduleName` that we created [above](#the-react-native-component) when writing the code for our React Native component.

<block class="objc" />

首先导入`RCTRootView`的头文件。

```objectivec
#import <React/RCTRootView.h>
```

> 这里的`initialProperties`注入了一些演示用的数据。在 React Native 的根组件中，我们可以使用`this.props`来获取到这些数据。

```objectivec
- (IBAction)highScoreButtonPressed:(id)sender {
    NSLog(@"High Score Button Pressed");
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];

    RCTRootView *rootView =
      [[RCTRootView alloc] initWithBundleURL: jsCodeLocation
                                  moduleName: @"RNHighScores"
                           initialProperties:
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
                               launchOptions: nil];
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
    [self presentViewController:vc animated:YES completion:nil];
}
```

> Note that `RCTRootView initWithURL` starts up a new JSC VM. To save resources and simplify the communication between RN views in different parts of your native app, you can have multiple views powered by React Native that are associated with a single JS runtime. To do that, instead of using `[RCTRootView alloc] initWithURL`, use [`RCTBridge initWithBundleURL`](https://github.com/facebook/react-native/blob/master/React/Base/RCTBridge.h#L93) to create a bridge and then use `RCTRootView initWithBridge`.

<block class="swift" />

首先`import`导入`React`库。

```javascript
import React
```

> 这里的`initialProperties`注入了一些演示用的数据。在 React Native 的根组件中，我们可以使用`this.props`来获取到这些数据。

```swift
@IBAction func highScoreButtonTapped(sender : UIButton) {
  NSLog("Hello")
  let jsCodeLocation = URL(string: "http://localhost:8081/index.bundle?platform=ios")
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

> Note that `RCTRootView bundleURL` starts up a new JSC VM. To save resources and simplify the communication between RN views in different parts of your native app, you can have multiple views powered by React Native that are associated with a single JS runtime. To do that, instead of using `RCTRootView bundleURL`, use [`RCTBridge initWithBundleURL`](https://github.com/facebook/react-native/blob/master/React/Base/RCTBridge.h#L89) to create a bridge and then use `RCTRootView initWithBridge`.

<block class="objc" />

> When moving your app to production, the `NSURL` can point to a pre-bundled file on disk via something like `[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];`. You can use the `react-native-xcode.sh` script in `node_modules/react-native/scripts/` to generate that pre-bundled file.

<block class="swift" />

> When moving your app to production, the `NSURL` can point to a pre-bundled file on disk via something like `let mainBundle = NSBundle(URLForResource: "main" withExtension:"jsbundle")`. You can use the `react-native-xcode.sh` script in `node_modules/react-native/scripts/` to generate that pre-bundled file.

<block class="objc swift" />

##### 3. Wire Up

Wire up the new link in the main menu to the newly added event handler method.

![Event Path](assets/react-native-add-react-native-integration-wire-up.png)

> One of the easier ways to do this is to open the view in the storyboard and right click on the new link. Select something such as the `Touch Up Inside` event, drag that to the storyboard and then select the created method from the list provided.

### 测试集成结果

You have now done all the basic steps to integrate React Native with your current application. Now we will start the React Native packager to build the `index.bundle` package and the server running on `localhost` to serve it.

##### 1. 添加 App Transport Security 例外

Apple 现在默认会阻止读取不安全的 HTTP 链接。所以我们需要把本地运行的 Packager 服务添加到`Info.plist`的例外中，以便能正常访问 Packager 服务：

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

> App Transport Security 对于用户来说是有利的。所以最好记得在发布之前重新启用这些安全限制。

##### 2. 运行 Packager

要运行应用，首先需要启动开发服务器（即 Packager，它负责实时监测 js 文件的变动并实时打包，输出给客户端运行）。具体只需简单进入到项目根目录中，然后运行：

```
$ npm start
```

##### 3. 运行应用

如果你使用的是 Xcode，那么照常编译和运行应用即可。如果你没有使用 Xcode（但是你仍然必须安装 Xcode），则可以在命令行中使用以下命令来运行应用：

```
# 在项目的根目录中执行：
$ react-native run-ios
```

In our sample application, you should see the link to the "High Scores" and then when you click on that you will see the rendering of your React Native component.

Here is the _native_ application home screen:

![Home Screen](assets/react-native-add-react-native-integration-example-home-screen.png)

Here is the _React Native_ high score screen:

![High Scores](assets/react-native-add-react-native-integration-example-high-scores.png)

> If you are getting module resolution issues when running your application please see [this GitHub issue](https://github.com/facebook/react-native/issues/4968) for information and possible resolution. [This comment](https://github.com/facebook/react-native/issues/4968#issuecomment-220941717) seemed to be the latest possible resolution.

### 看一下完整的代码变更

<block class="objc" />

你可以在这个[GitHub 提交记录](https://github.com/JoelMarcey/iOS-2048/commit/9ae70c7cdd53eb59f5f7c7daab382b0300ed3585)里查看一次完整的集成过程具体有哪些代码/文件变更。

<block class="swift" />

你可以在这个[GitHub 提交记录](https://github.com/JoelMarcey/swift-2048/commit/13272a31ee6dd46dc68b1dcf4eaf16c1a10f5229)里查看一次完整的集成过程具体有哪些代码/文件变更。

<block class="android" />

## 把 React Native 添加到你的应用中

### 配置 maven

在你的 app 中 `build.gradle` 文件中添加 React Native 依赖:

```
dependencies {
    compile 'com.android.support:appcompat-v7:23.0.1'
    ...
    compile "com.facebook.react:react-native:+" // From node_modules
}
```

> 如果想要指定特定的 React Native 版本，可以用具体的版本号替换 `+`，当然前提是你从 npm 里下载的是这个版本。

在项目的 `build.gradle` 文件中为 React Native 添加一个 maven 依赖的入口，必须写在 "allprojects" 代码块中:

```
allprojects {
    repositories {
        maven {
            // All of React Native (JS, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
        ...
    }
    ...
}
```

> 确保依赖路径的正确！以免在 Android Studio 运行 Gradle 同步构建时抛出 “Failed to resolve: com.facebook.react:react-native:0.x.x" 异常。

### 配置权限

接着，在 `AndroidManifest.xml` 清单文件中声明网络权限:

    <uses-permission android:name="android.permission.INTERNET" />

如果需要访问 `DevSettingsActivity` 界面（即开发者菜单），则还需要在 `AndroidManifest.xml` 中声明:

    <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />

开发者菜单一般仅用于在开发时从 Packager 服务器刷新 JavaScript 代码，所以在正式发布时你可以去掉这一权限。

### 代码集成

Now we will actually modify the native Android application to integrate React Native.

#### React Native 组件

我们首先要写的是"High Score"（得分排行榜）的 JavaScript 端的代码。

##### 1. 创建一个`index.js`文件

首先在项目根目录中创建一个空的`index.js`文件。(注意在 0.49 版本之前是 index.android.js 文件)

`index.js`是 React Native 应用在 Android 上的入口文件。而且它是不可或缺的！它可以是个很简单的文件，简单到可以只包含一行`require/import`导入语句。本教程中为了简单示范，把全部的代码都写到了`index.js`里（当然实际开发中我们并不推荐这样做）。

##### 2. 添加你自己的 React Native 代码

在`index.js`中添加你自己的组件。这里我们只是简单的添加一个`<Text>`组件，然后用一个带有样式的`<View>`组件把它包起来。

```javascript
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

AppRegistry.registerComponent("MyReactNativeApp", () => HelloWorld);
```

##### 3. 配置权限以便开发中的红屏错误能正确显示

如果你的应用会运行在 Android 6.0（API level 23）或更高版本，请确保你在开发版本中有打开`悬浮窗(overlay)`权限。你可以在代码中使用`Settings.canDrawOverlays(this);`来检查。之所以需要这一权限，是因为我们会把开发中的报错显示在悬浮窗中（仅在开发阶段需要）。在 Android 6.0（API level 23）中用户需要手动同意授权。具体请求授权的做法是在`onCreate()`中添加如下代码。其中`OVERLAY_PERMISSION_REQ_CODE`是用于回传授权结果的字段。

```java
private final int OVERLAY_PERMISSION_REQ_CODE = 1;  // 任写一个值

...

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
                // SYSTEM_ALERT_WINDOW permission not granted
            }
        }
    }
}
```

#### 掌握核心科技：`ReactRootView`

我们还需要添加一些原生代码来启动 React Native 的运行时环境并让它开始渲染。首先需要在一个`Activity`中创建一个`ReactRootView`对象，然后在这个对象之中启动 React Native 应用，并将它设为界面的主视图。

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
                .setJSMainModulePath("index")
                .addPackage(new MainReactPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        // 注意这里的MyReactNativeApp必须对应“index.js”中的
        // “AppRegistry.registerComponent()”的第一个参数
        mReactRootView.startReactApplication(mReactInstanceManager, "MyReactNativeApp", null);

        setContentView(mReactRootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

> If you are using a starter kit for React Native, replace the "HelloWorld" string with the one in your index.js file (it’s the first argument to the `AppRegistry.registerComponent()` method).

如果你使用的是 Android Studio , 可以使用`Alt + Enter`快捷键来自动为 MyReactActivity 类补上缺失的 import 语句。注意`BuildConfig`应该是在你自己的包中自动生成，无需额外引入。千万不要从`com.facebook...`的包中引入！

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
        mReactInstanceManager.onHostDestroy(this);
    }
    if (mReactRootView != null) {
        mReactRootView.unmountReactApplication();
    }
}
```

我们还需要把后退按钮事件传递给 React Native：

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

This allows JavaScript to control what happens when the user presses the hardware back button (e.g. to implement navigation). When JavaScript doesn't handle the back button press, your `invokeDefaultOnBackPressed` method will be called. By default this simply finishes your `Activity`.

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

### 测试集成结果

You have now done all the basic steps to integrate React Native with your current application. Now we will start the React Native packager to build the `index.bundle` package and the server running on localhost to serve it.

##### 1. 运行 Packager

运行应用首先需要启动开发服务器（Packager）。你只需在项目根目录中执行以下命令即可：

```
$ yarn start
```

##### 2. 运行你的应用

保持 packager 的窗口运行不要关闭，然后像往常一样编译运行你的 Android 应用(在命令行中执行`./gradlew installDebug`或是在 Android Studio 中编译运行)。

编译执行一切顺利进行之后，在进入到 MyReactActivity 时应该就能立刻从 packager 中读取 JavaScript 代码并执行和显示：

![Screenshot](assets/EmbeddedAppAndroid.png)

### 在 Android Studio 中打包

你也可以使用 Android Studio 来打 release 包！其步骤基本和原生应用一样，只是在每次编译打包之前需要先执行 js 文件的打包(即生成离线的 jsbundle 文件)。具体的 js 打包命令如下：

```
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/com/your-company-name/app-package-name/src/main/assets/index.android.bundle --assets-dest android/com/your-company-name/app-package-name/src/main/res/
```

> 注意把上述命令中的路径替换为你实际项目的路径。如果 assets 目录不存在，则需要提前自己创建一个。

然后在 Android Studio 中正常生成 release 版本即可！

<block class="objc swift android" />

### 然后呢？

然后就可以开发啦~可是我完全不会 React Native 怎么办？

我们建议你先通读本站的所有文档，看看博客，看看论坛。如果觉得知识太零散，不够系统，那么你也可以考虑下购买我们的[入门课程](https://ke.qq.com/course/197101)（链接里有目录，目录里有一些免费试听内容）。

<script>
  function displayTab(type, value) {
    var container = document.getElementsByTagName('block')[0].parentNode;
    container.className = 'display-' + type + '-' + value + ' ' +
      container.className.replace(RegExp('display-' + type + '-[a-z]+ ?'), '');
  }
  function convertBlocks() {
    // Convert <div>...<span><block /></span>...</div>
    // Into <div>...<block />...</div>
    var blocks = document.querySelectorAll('block');
    for (var i = 0; i < blocks.length; ++i) {
      var block = blocks[i];
      var span = blocks[i].parentNode;
      var container = span.parentNode;
      container.insertBefore(block, span);
      container.removeChild(span);
    }
    // Convert <div>...<block />content<block />...</div>
    // Into <div>...<block>content</block><block />...</div>
    blocks = document.querySelectorAll('block');
    for (var i = 0; i < blocks.length; ++i) {
      var block = blocks[i];
      while (
        block.nextSibling &&
        block.nextSibling.tagName !== 'BLOCK'
      ) {
        block.appendChild(block.nextSibling);
      }
    }
  }
  function guessPlatformAndOS() {
    if (!document.querySelector('block')) {
      return;
    }
    // If we are coming to the page with a hash in it (i.e. from a search, for example), try to get
    // us as close as possible to the correct platform and dev os using the hashtag and block walk up.
    var foundHash = false;
    if (
      window.location.hash !== '' &&
      window.location.hash !== 'content'
    ) {
      // content is default
      var hashLinks = document.querySelectorAll(
        'a.hash-link'
      );
      for (
        var i = 0;
        i < hashLinks.length && !foundHash;
        ++i
      ) {
        if (hashLinks[i].hash === window.location.hash) {
          var parent = hashLinks[i].parentElement;
          while (parent) {
            if (parent.tagName === 'BLOCK') {
              // Could be more than one target os and dev platform, but just choose some sort of order
              // of priority here.
              // Dev OS
              if (parent.className.indexOf('mac') > -1) {
                displayTab('os', 'mac');
                foundHash = true;
              } else if (
                parent.className.indexOf('linux') > -1
              ) {
                displayTab('os', 'linux');
                foundHash = true;
              } else if (
                parent.className.indexOf('windows') > -1
              ) {
                displayTab('os', 'windows');
                foundHash = true;
              } else {
                break;
              }
              // Target Platform
              if (parent.className.indexOf('ios') > -1) {
                displayTab('platform', 'ios');
                foundHash = true;
              } else if (
                parent.className.indexOf('android') > -1
              ) {
                displayTab('platform', 'android');
                foundHash = true;
              } else {
                break;
              }
              // Guide
              if (parent.className.indexOf('native') > -1) {
                displayTab('guide', 'native');
                foundHash = true;
              } else if (
                parent.className.indexOf('quickstart') > -1
              ) {
                displayTab('guide', 'quickstart');
                foundHash = true;
              } else {
                break;
              }
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
      var isWindows = navigator.platform === 'Win32';
      displayTab('platform', isMac ? 'ios' : 'android');
      displayTab(
        'os',
        isMac ? 'mac' : isWindows ? 'windows' : 'linux'
      );
      displayTab('guide', 'quickstart');
      displayTab('language', 'objc');
    }
  }
  convertBlocks();
  guessPlatformAndOS();
</script>

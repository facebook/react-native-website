## 核心概念

把 React Native 组件集成到 iOS 应用中有如下几个主要步骤：

1.  配置好 React Native 依赖和项目结构。
2.  了解你要集成的 React Native 组件。
3.  使用 CocoaPods 把这些组件以依赖的形式加入到项目中。
4.  创建 js 文件，编写 React Native 组件的 js 代码。
5.  在应用中添加一个`RCTRootView`。这个`RCTRootView`正是用来承载你的 React Native 组件的容器。
6.  启动 React Native 的 Packager 服务，运行应用。
7.  验证这部分组件是否正常工作。

## 开发环境准备

首先按照[开发环境搭建教程](environment-setup)来安装 React Native 在 iOS 平台上所需的一切依赖软件。

### 1. 配置项目目录结构

首先创建一个空目录用于存放 React Native 项目，然后在其中创建一个`/ios`子目录，把你现有的 iOS 项目拷贝到`/ios`子目录中。

### 2. 安装 JavaScript 依赖包

在项目根目录下创建一个名为`package.json`的空文本文件，然后填入以下内容：

```
{
  "name": "MyReactNativeApp",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "yarn react-native start"
  }
}
```

> 示例中的`version`字段没有太大意义（除非你要把你的项目发布到 npm 仓库）。`scripts`中是用于启动 Metro 服务的命令。

接下来我们使用 yarn 或 npm（两者都是 node 的包管理器）来安装 React 和 React Native 模块。请打开一个终端/命令提示行，进入到项目目录中（即包含有 package.json 文件的目录），然后运行下列命令来安装：

```shell
$ yarn add react-native
```

这样默认会安装最新版本的 React Native，同时会打印出类似下面的警告信息（你可能需要滚动屏幕才能注意到）：

> warning "react-native@0.52.2" has unmet peer dependency "react@16.2.0".

这是正常现象，意味着我们还需要安装指定版本的 React：

```shell
$ yarn add react@16.2.0
```

注意必须严格匹配警告信息中所列出的版本，高了或者低了都不可以。

> 如果你使用多个第三方依赖，可能这些第三方各自要求的 react 版本有所冲突，此时应优先满足`react-native`所需要的`react`版本。其他第三方能用则用，不能用则只能考虑选择其他库。

所有 JavaScript 依赖模块都会被安装到项目根目录下的`node_modules/`目录中（这个目录我们原则上不复制、不移动、不修改、不上传，随用随装）。

把`node_modules/`目录记录到`.gitignore`文件中（即不上传到版本控制系统，只保留在本地）。

### 3. 安装 CocoaPods

[CocoaPods](http://cocoapods.org)是针对 iOS 和 Mac 开发的包管理工具。我们用它来把 React Native 框架的代码下载下来并添加到你当前的项目中。

我们建议使用[Homebrew](http://brew.sh/)来安装 CocoaPods。

```shell
$ brew install cocoapods
```

## 把 React Native 添加到你的应用中

在本教程中我们用于[示范的 app](https://github.com/JoelMarcey/swift-2048)是一个[2048](https://en.wikipedia.org/wiki/2048_%28video_game%29)类型的游戏。下面是这个游戏还没有集成 React Native 时的主界面：

![Before RN Integration](/docs/assets/react-native-existing-app-integration-ios-before.png)

### 配置 CocoaPods 的依赖

> 提示，此部分说明可能落后于最新版本。建议使用`npx react-native init NewProject`创建一个最新版本的纯 RN 项目，去参考其 Podfile 的配置。

React Native 框架整体是作为 node 模块安装到项目中的。下一步我们需要在 CocoaPods 的`Podfile`中指定我们所需要使用的"subspecs"。

可用的`subspec`都列在[`node_modules/react-native/React.podspec`](https://github.com/facebook/react-native/blob/master/React.podspec)中，基本都是按其功能命名的。一般来说你首先需要添加`Core`，这一`subspec`包含了必须的`AppRegistry`、`StyleSheet`、`View`以及其他的一些 React Native 核心库。如果你想使用 React Native 的`Text`库（即`<Text>`组件），那就需要添加`RCTText`的`subspec`。同理，`Image`需要加入`RCTImage`，等等。

我们需要在`Podfile`文件中指定所需的`subspec`。创建`Podfile`的最简单的方式就是在`/ios`子目录中使用 CocoaPods 的`init`命令：

```shell
$ pod init
```

`Podfile`会创建在执行命令的目录中。你需要调整其内容以满足你的集成需求。调整后的`Podfile`的内容看起来类似下面这样（也可以用`npx react-native init 项目名`命令创建一个纯 RN 项目，然后去参考其 ios 目录中的 Podfile 文件）：

```
source 'https://github.com/CocoaPods/Specs.git'

# 对于Swift应用来说下面两句是必须的
platform :ios, '8.0'
use_frameworks!

# target的名字一般与你的项目名字相同
target 'swift-2048' do

  # 'node_modules'目录一般位于根目录中
  # 但是如果你的结构不同，那你就要根据实际路径修改下面的`:path
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # Include this for RN >= 0.47
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # needed for debugging
    # Add any other subspecs you want to use in your project
  ]
  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod "Yoga", :path => "../node_modules/react-native/ReactCommon/yoga"

  # Third party deps podspec link
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

end
```

创建好了`Podfile`后，就可以开始安装 React Native 的 pod 包了。

```shell
$ pod install
```

然后你应该可以看到类似下面的输出(译注：同样由于众所周知的网络原因，pod install 的过程在国内非常不顺利，请自行配备稳定的代理软件。)

```
Analyzing dependencies
Fetching podspec for `React` from `../node_modules/react-native`
Downloading dependencies
Installing React (0.62.0)
Generating Pods project
Integrating client project
Sending stats
Pod installation complete! There are 3 dependencies from the Podfile and 1 total pod installed.
```

> If this fails with errors mentioning `xcrun`, make sure that in Xcode in **Preferences > Locations** the Command Line Tools are assigned.

> 如果你看到类似"_The `swift-2048 [Debug]` target overrides the `FRAMEWORK_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-swift-2048/Pods-swift-2048.debug.xcconfig`. This can lead to problems with the CocoaPods installation_"的警告，请查看 Xcode 的`Build Settings`中的`Framework Search Paths`选项，确保其中的`Debug`和`Release`都只包含`$(inherited)`。

### 代码集成

现在我们已经准备好了所有依赖，可以开始着手修改原生代码来把 React Native 真正集成到应用中了。在我们的 2048 示例中，首先尝试添加一个显示有"High Score"（得分排行榜）的 React Native 页面。

#### React Native 组件

我们首先要写的是"High Score"（得分排行榜）的 JavaScript 端的代码。

##### 1. 创建一个`index.js`文件

首先在项目根目录下创建一个空的`index.js`文件。（注意在 0.49 版本之前是 index.ios.js 文件）

`index.js`是 React Native 应用在 iOS 上的入口文件。而且它是不可或缺的！它可以是个很简单的文件，简单到可以只包含一行`require/import`导入语句。本教程中为了简单示范，把全部的代码都写到了`index.js`里（当然实际开发中我们并不推荐这样做）。

##### 2. 添加你自己的 React Native 代码

在`index.js`中添加你自己的组件。这里我们只是简单的添加一个`<Text>`组件，然后用一个带有样式的`<View>`组件把它包起来。

```jsx
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

#### 核心组件：`RCTRootView`

现在我们已经在`index.js`中创建了 React Native 组件，下一步就是把这个组件添加给一个新的或已有的`ViewController`。 The easiest path to take is to optionally create an event path to your component and then add that component to an existing `ViewController`.

We will tie our React Native component with a new native view in the `ViewController` that will actually contain it called `RCTRootView` .

##### 1. Create an Event Path

You can add a new link on the main game menu to go to the "High Score" React Native page.

![Event Path](/docs/assets/react-native-add-react-native-integration-link.png)

##### 2. 事件处理

现在我们将从菜单链接中添加一个事件处理程序。一个方法将被添加到你的应用程序的主`ViewController`中。这就是`RCTRootView`发挥作用的地方。

当你构建一个 React Native 应用时，需要使用 Metro（以前叫做 react packager）来创建一个`index.bundle`。`index.bundle`里面包含了我们的`RNHighScore`模块。因此，我们需要将`RCTRootView`指向`index.bundle`资源的位置（通过`NSURL`），并将其与模块绑定。

为了便于调试，我们将在事件处理程序被调用时输出日志。然后创建一个 URL 字符串，指向`index.bundle`的位置。最后，我们将创建主`RCTRootView`。请注意我们需要把[上面](#the-react-native-component)创建的`moduleName`填进去，也就是`RNHighScores`。

首先`import`导入`React`库。

```swift
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

> When moving your app to production, the `NSURL` can point to a pre-bundled file on disk via something like `let mainBundle = NSBundle(URLForResource: "main" withExtension:"jsbundle")`. You can use the `react-native-xcode.sh` script in `node_modules/react-native/scripts/` to generate that pre-bundled file.

##### 3. Wire Up

Wire up the new link in the main menu to the newly added event handler method.

![Event Path](/docs/assets/react-native-add-react-native-integration-wire-up.png)

> One of the easier ways to do this is to open the view in the storyboard and right click on the new link. Select something such as the `Touch Up Inside` event, drag that to the storyboard and then select the created method from the list provided.

### 测试集成结果

You have now done all the basic steps to integrate React Native with your current application. Now we will start the [Metro bundler][metro] to build the `index.bundle` package and the server running on `localhost` to serve it.

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

##### 2. 运行 Metro

要运行应用，首先需要启动开发服务器（即 Metro，它负责实时监测 js 文件的变动并实时打包，输出给客户端运行）。具体只需简单进入到项目根目录中，然后运行：

```shell
$ npm start
```

##### 3. 运行应用

如果你使用的是 Xcode，那么照常编译和运行应用即可。如果你没有使用 Xcode（但是你仍然必须安装 Xcode），则可以在命令行中使用以下命令来运行应用：

```sh
# 在项目的根目录中执行：
$ npx react-native run-ios
```

In our sample application, you should see the link to the "High Scores" and then when you click on that you will see the rendering of your React Native component.

Here is the _native_ application home screen:

![Home Screen](/docs/assets/react-native-add-react-native-integration-example-home-screen.png)

Here is the _React Native_ high score screen:

![High Scores](/docs/assets/react-native-add-react-native-integration-example-high-scores.png)

> If you are getting module resolution issues when running your application please see [this GitHub issue](https://github.com/facebook/react-native/issues/4968) for information and possible resolution. [This comment](https://github.com/facebook/react-native/issues/4968#issuecomment-220941717) seemed to be the latest possible resolution.

### 完整代码

你可以在这个[GitHub 提交记录](https://github.com/JoelMarcey/swift-2048/commit/13272a31ee6dd46dc68b1dcf4eaf16c1a10f5229)里查看一次完整的集成过程具体有哪些代码/文件变更。

### 然后呢？

然后就可以开发啦~可是我完全不会 React Native 怎么办？

我们建议你先通读本站的所有文档，看看博客，看看论坛。如果觉得知识太零散，不够系统，那么你也可以考虑下购买我们的[付费咨询服务](/about#技术支持与商务合作)。

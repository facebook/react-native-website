import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 关键概念

将 React Native 组件集成到 iOS 应用程序中的关键步骤是：

1. 设置正确的目录结构。
2. 安装必要的 NPM 依赖项。
3. 在 Podfile 配置中添加 React Native。
4. 为你的第一个 React Native 屏幕编写 TypeScript 代码。
5. 使用`RCTRootView`将 React Native 与你的 iOS 代码集成。
6. 通过运行打包器并查看应用程序运行情况来测试你的集成。

## 使用社区模板

在您遵循本指南时，我们建议您参考[React Native 社区模板](https://github.com/react-native-community/template/)。该模板包含一个**最小化的 iOS 应用**，将帮助您理解如何将 React Native 集成到现有的 iOS 应用中。

## 准备工作

请按照[设置开发环境](getting-started)指南指南来配置您的开发环境，以便构建 iOS 平台的 React Native 应用。
本指南还假设您熟悉 iOS 开发的基础知识，如创建`UIViewController`和编辑`Podfile`文件。

### 1. 设置目录结构

为确保顺利体验，请为您的集成 React Native 项目创建一个新文件夹，然后**将现有的 iOS 项目移动到** `/ios` 子文件夹中。

## 2. 安装 NPM 依赖

进入根目录并运行以下命令：

```
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.78-stable/template/package.json
```

这将从[社区模板](https://github.com/react-native-community/template/blob/0.78-stable/template/package.json) 复制 `package.json` 文件到您的项目中。

接下来，运行以下命令安装 NPM 包：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install
```

</TabItem>
<TabItem value="yarn">

```shell
yarn install
```

</TabItem>
</Tabs>

安装过程创建了一个新的 `node_modules` 文件夹。该文件夹存储了构建项目所需的 JavaScript 依赖项。

将 `node_modules/` 添加到您的 `.gitignore` 文件中（[社区默认文件](https://github.com/react-native-community/template/blob/0.78-stable/template/_gitignore)）。

### 3. 安装开发工具

### Xcode 命令行工具

安装命令行工具。选择 Xcode 菜单中的 **Settings...（或 Preferences...）**。转到位置面板，并安装工具，方法是选择命令行工具下拉菜单中最新的版本。

![Xcode Command Line Tools](/docs/assets/GettingStartedXcodeCommandLineTools.png)

### CocoaPods

[CocoaPods](https://cocoapods.org) 是 iOS 和 macOS 开发的包管理工具。我们使用它将实际的 React Native 框架代码添加到您的当前项目中。

我们建议使用 [Homebrew](https://brew.sh/) 安装 CocoaPods：

```shell
brew install cocoapods
```

## 4. 将 React Native 添加到您的应用

### 配置 CocoaPods

要配置 CocoaPods，我们需要两个文件：

- 一个 **Gemfile** 文件，定义了我们需要的 Ruby 依赖项。
- 一个 **Podfile** 文件，定义了如何正确安装我们的依赖项。

对于 **Gemfile**，请进入您的项目根目录并运行以下命令：

```sh
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.78-stable/template/Gemfile
```

这将下载 Gemfile 文件。
对于 **Podfile**，请进入您的项目 `ios` 文件夹并运行以下命令：

```sh
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.78-stable/template/ios/Podfile
```

请使用社区模板 作为 [Gemfile](https://github.com/react-native-community/template/blob/0.78-stable/template/Gemfile) 和 [Podfile](https://github.com/react-native-community/template/blob/0.78-stable/template/ios/Podfile) 的参考。

:::note
请记住更改 [Podfile](https://github.com/react-native-community/template/blob/0.78-stable/template/ios/Podfile#L17) 中的这行，以匹配您的应用名称。
:::

现在，我们需要运行一些额外的命令来安装 Ruby Gem 和 Pods。
进入 `ios` 文件夹并运行以下命令：

```sh
bundle install
bundle exec pod install
```

第一个命令将安装 Ruby 依赖项，第二个命令将实际将 React Native 代码集成到您的应用程序中，以便您的 iOS 文件可以导入 React Native 头文件。

## 5. 编写 TypeScript 代码

现在我们将修改原生 iOS 应用程序以集成 React Native。

我们将编写的第一个代码片段是实际的 React Native 代码，该代码将集成到我们的应用程序中。

### 创建一个 `index.js` 文件

首先，在 React Native 项目的根目录中创建一个空的 `index.js` 文件。

`index.js` 是 React Native 应用程序的起点，并且总是需要。它可以是一个小文件，该文件 `import` 其他文件，这些文件是您的 React Native 组件或应用程序的一部分，或者它可以包含所有需要的代码。

我们的 `index.js` 文件应如下所示（[社区模板文件](https://github.com/react-native-community/template/blob/0.78-stable/template/index.js) 作为参考）：

```js
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('HelloWorld', () => App);
```

### 创建一个 `App.tsx` 文件

让我们创建一个 `App.tsx` 文件。这是一个 [TypeScript](https://www.typescriptlang.org/) 文件，可以包含 [JSX](<https://en.wikipedia.org/wiki/JSX_(JavaScript)>) 表达式。它包含我们要集成到 iOS 应用程序中的根 React Native 组件（[链接](https://github.com/react-native-community/template/blob/0.78-stable/template/App.tsx)）：

```tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode
              ? Colors.black
              : Colors.white,
            padding: 24,
          }}>
          <Text style={styles.title}>Step One</Text>
          <Text>
            Edit <Text style={styles.bold}>App.tsx</Text> to
            change this screen and see your edits.
          </Text>
          <Text style={styles.title}>See your changes</Text>
          <ReloadInstructions />
          <Text style={styles.title}>Debug</Text>
          <DebugInstructions />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

[社区模板文件](https://github.com/react-native-community/template/blob/0.78-stable/template/App.tsx) 作为参考

## 5. 与 iOS 代码集成

我们现在需要添加一些原生代码，以便启动 React Native 运行时并告诉它渲染我们的 React 组件。

### 准备工作

React Native 的初始化与 iOS 应用的其他部分无关。

React Native 可以通过一个名为 `RCTReactNativeFactory` 的类来初始化，该类负责处理 React Native 的生命周期。

一旦类被初始化，您可以启动一个 React Native 视图，提供一个 `UIWindow` 对象，或者您可以要求工厂生成一个 `UIView`，您可以在任何 `UIViewController` 中加载它。

在以下示例中，我们将创建一个可以加载 React Native 视图的 ViewController。

#### 创建一个 ReactViewController

从模板创建一个新文件 (<kbd>⌘</kbd>+<kbd>N</kbd>) 并选择 Cocoa Touch Class 模板。

确保选择 `UIViewController` 作为 "Subclass of" 字段。

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

现在打开 `ReactViewController.m` 文件并应用以下更改

```diff title="ReactViewController.m"
#import "ReactViewController.h"
+#import <React/RCTBundleURLProvider.h>
+#import <RCTReactNativeFactory.h>
+#import <RCTDefaultReactNativeFactoryDelegate.h>
+#import <RCTAppDependencyProvider.h>


@interface ReactViewController ()

@end

+@interface ReactNativeFactoryDelegate: RCTDefaultReactNativeFactoryDelegate
+@end

-@implementation ReactViewController
+@implementation ReactViewController {
+  RCTReactNativeFactory *_factory;
+  id<RCTReactNativeFactoryDelegate> _factoryDelegate;
+}

 - (void)viewDidLoad {
     [super viewDidLoad];
     // Do any additional setup after loading the view.
+    _factoryDelegate = [ReactNativeFactoryDelegate new];
+    _factoryDelegate.dependencyProvider = [RCTAppDependencyProvider new];
+    _factory = [[RCTReactNativeFactory alloc] initWithDelegate:_factoryDelegate];
+    self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
 }

@end

+@implementation ReactNativeFactoryDelegate
+
+- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
+{
+  return [self bundleURL];
+}
+
+- (NSURL *)bundleURL
+{
+#if DEBUG
+  return [RCTBundleURLProvider.sharedSettings jsBundleURLForBundleRoot:@"index"];
+#else
+  return [NSBundle.mainBundle URLForResource:@"main" withExtension:@"jsbundle"];
+#endif
+}

@end

```

</TabItem>
<TabItem value="swift">

现在打开 `ReactViewController.swift` 文件并应用以下更改

```diff title="ReactViewController.swift"
import UIKit
+import React
+import React_RCTAppDelegate
+import ReactAppDependencyProvider

class ReactViewController: UIViewController {
+  var reactNativeFactory: RCTReactNativeFactory?
+  var reactNativeFactoryDelegate: RCTReactNativeFactoryDelegate?

  override func viewDidLoad() {
    super.viewDidLoad()
+    reactNativeFactoryDelegate = ReactNativeDelegate()
+    reactNativeFactoryDelegate!.dependencyProvider = RCTAppDependencyProvider()
+    reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeFactoryDelegate!)
+    view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld")

  }
}

+class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
+    override func sourceURL(for bridge: RCTBridge) -> URL? {
+      self.bundleURL()
+    }
+
+    override func bundleURL() -> URL? {
+      #if DEBUG
+      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
+      #else
+      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
+      #endif
+    }
+
+}
```

</TabItem>
</Tabs>

#### 在 rootViewController 中展示 React Native 视图

最后，我们可以展示我们的 React Native 视图。为此，我们需要一个可以承载视图的新视图控制器，我们可以在其中加载 JS 内容。

1. 从 Xcode 中，创建一个新 `UIViewController`（我们称之为 `ReactViewController`）。
2. 让初始 `ViewController` 展示 `ReactViewController`。有几种方法可以做到这一点，具体取决于您的应用程序。对于此示例，我们假设您有一个按钮，用于模态展示 React Native。

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

```diff title="ViewController.m"
#import "ViewController.h"
+#import "ReactViewController.h"

@interface ViewController ()

@end

- @implementation ViewController
+@implementation ViewController {
+  ReactViewController *reactViewController;
+}

 - (void)viewDidLoad {
   [super viewDidLoad];
   // Do any additional setup after loading the view.
   self.view.backgroundColor = UIColor.systemBackgroundColor;
+  UIButton *button = [UIButton new];
+  [button setTitle:@"Open React Native" forState:UIControlStateNormal];
+  [button setTitleColor:UIColor.systemBlueColor forState:UIControlStateNormal];
+  [button setTitleColor:UIColor.blueColor forState:UIControlStateHighlighted];
+  [button addTarget:self action:@selector(presentReactNative) forControlEvents:UIControlEventTouchUpInside];
+  [self.view addSubview:button];

+  button.translatesAutoresizingMaskIntoConstraints = NO;
+  [NSLayoutConstraint activateConstraints:@[
+    [button.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
+    [button.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
+    [button.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
+    [button.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
+  ]];
 }

+- (void)presentReactNative
+{
+  if (reactViewController == NULL) {
+    reactViewController = [ReactViewController new];
+  }
+  [self presentViewController:reactViewController animated:YES completion:nil];
+}

@end
```

</TabItem>
<TabItem value="swift">

```diff title="ViewController.swift"
import UIKit

class ViewController: UIViewController {

+  var reactViewController: ReactViewController?

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    self.view.backgroundColor = .systemBackground

+    let button = UIButton()
+    button.setTitle("Open React Native", for: .normal)
+    button.setTitleColor(.systemBlue, for: .normal)
+    button.setTitleColor(.blue, for: .highlighted)
+    button.addAction(UIAction { [weak self] _ in
+      guard let self else { return }
+      if reactViewController == nil {
+       reactViewController = ReactViewController()
+      }
+      present(reactViewController!, animated: true)
+    }, for: .touchUpInside)
+    self.view.addSubview(button)
+
+    button.translatesAutoresizingMaskIntoConstraints = false
+    NSLayoutConstraint.activate([
+      button.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
+      button.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
+      button.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
+      button.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
+    ])
  }
}
```

</TabItem>
</Tabs>

确保禁用沙盒脚本。为此，在 Xcode 中，点击您的应用，然后点击构建设置。过滤脚本并设置 `User Script Sandboxing` 为 `NO`。这一步是为了在调试和发布版本之间正确切换 [Hermes 引擎](https://github.com/facebook/hermes/blob/main/README.md)。

![Disable Sandboxing](/docs/assets/disable-sandboxing.png);

最后，确保在您的 `Info.plist` 文件中添加 `UIViewControllerBasedStatusBarAppearance` 键，值为 `NO`。

![Disable UIViewControllerBasedStatusBarAppearance](/docs/assets/disable-UIViewControllerBasedStatusBarAppearance.png)

## 6. 测试您的集成

您已经完成了将 React Native 与您的应用程序集成所需的所有基本步骤。现在我们将启动 [Metro bundler](https://metrobundler.dev/) 来构建您的 TypeScript 应用程序代码。Metro 的 HTTP 服务器从您的开发环境共享 bundle 到模拟器或设备。这允许 [热重载](https://reactnative.dev/blog/2016/03/24/introducing-hot-reloading)。

首先，您需要在项目根目录中创建一个 `metro.config.js` 文件，如下所示：

```js
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

您可以查看[社区模板文件](https://github.com/react-native-community/template/blob/0.78-stable/template/metro.config.js) 作为参考。

Then, you need to create a `.watchmanconfig` file in the root of your project. The file must contain an empty json object:

```sh
echo {} > .watchmanconfig
```

一旦您有了配置文件，您可以运行 bundler。在项目根目录下运行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start
```

</TabItem>
</Tabs>

现在，像往常一样构建和运行您的 iOS 应用。

一旦您到达您的 React 驱动的 Activity 中，它应该从开发服务器加载 JavaScript 代码并显示：

<center><img src="/docs/assets/EmbeddedAppIOSVideo.gif" width="300" /></center>

### 在 Xcode 中创建发布版本

您可以使用 Xcode 创建您的发布版本！唯一的额外步骤是添加一个脚本，当应用程序构建时，将您的 JS 和图像打包到 iOS 应用程序中。

1. 在 Xcode 中，选择您的应用
2. 点击 `Build Phases`
3. 点击左上角的 `+` 并选择 `New Run Script Phase`
4. 点击 `Run Script` 行并重命名脚本为 `Bundle React Native code and images`
5. 在文本框中粘贴以下脚本

```sh title="Build React Native code and image"
set -e

WITH_ENVIRONMENT="$REACT_NATIVE_PATH/scripts/xcode/with-environment.sh"
REACT_NATIVE_XCODE="$REACT_NATIVE_PATH/scripts/react-native-xcode.sh"

/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

6. 将脚本拖放到名为 `[CP] Embed Pods Frameworks` 的脚本之前。

现在，如果您为发布版本构建您的应用，它将按预期工作。

## 7. 将初始属性传递给 React Native 视图

在某些情况下，您可能希望从原生应用传递一些信息到 JavaScript。例如，您可能希望传递当前登录用户的用户 ID 和令牌，以便从数据库中检索信息。

这可以通过使用 `RCTReactNativeFactory` 类的 `view(withModuleName:initialProperty)` 重载的 `initialProperties` 参数来实现。以下步骤展示了如何实现。

### 更新 App.tsx 文件以读取初始属性

打开 `App.tsx` 文件并添加以下代码：

```diff title="App.tsx"
import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

-function App(): React.JSX.Element {
+function App(props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
-       <View
-         style={{
-           backgroundColor: isDarkMode
-             ? Colors.black
-             : Colors.white,
-           padding: 24,
-         }}>
-         <Text style={styles.title}>Step One</Text>
-         <Text>
-           Edit <Text style={styles.bold}>App.tsx</Text> to
-           change this screen and see your edits.
-         </Text>
-         <Text style={styles.title}>See your changes</Text>
-         <ReloadInstructions />
-         <Text style={styles.title}>Debug</Text>
-         <DebugInstructions />
+         <Text style={styles.title}>UserID: {props.userID}</Text>
+         <Text style={styles.title}>Token: {props.token}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
+   marginLeft: 20,
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

这些更改将告诉 React Native 您的 App 组件现在接受一些属性。`RCTreactNativeFactory` 将负责在组件渲染时将它们传递给它。

### 更新原生代码以将初始属性传递给 JavaScript。

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

修改 `ReactViewController.mm` 以将初始属性传递给 JavaScript。

```diff title="ReactViewController.mm"
 - (void)viewDidLoad {
   [super viewDidLoad];
   // Do any additional setup after loading the view.

   _factoryDelegate = [ReactNativeFactoryDelegate new];
   _factoryDelegate.dependencyProvider = [RCTAppDependencyProvider new];
   _factory = [[RCTReactNativeFactory alloc] initWithDelegate:_factoryDelegate];
-  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
+  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld" initialProperties:@{
+    @"userID": @"12345678",
+    @"token": @"secretToken"
+  }];
}
```

</TabItem>
<TabItem value="swift">

修改 `ReactViewController.swift` 以将初始属性传递给 React Native 视图。

```diff title="ReactViewController.swift"
  override func viewDidLoad() {
    super.viewDidLoad()
    reactNativeFactoryDelegate = ReactNativeDelegate()
    reactNativeFactoryDelegate!.dependencyProvider = RCTAppDependencyProvider()
    reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeFactoryDelegate!)
-   view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld")
+   view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld" initialProperties: [
+     "userID": "12345678",
+     "token": "secretToken"
+])

  }
}
```

</TabItem>
</Tabs>

3. 再次运行您的应用。您应该在展示 `ReactViewController` 后看到以下屏幕：

<center>
  <img src="/docs/assets/brownfield-with-initial-props.png" width="30%" height="30%"/>
</center>

### 现在呢？

此时，您可以继续像往常一样开发您的应用。请参阅我们的[调试](debugging)和[部署](running-on-device)文档，了解更多关于使用 React Native 的信息。

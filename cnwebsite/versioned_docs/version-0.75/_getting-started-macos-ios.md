import RemoveGlobalCLI from './\_remove-global-cli.md';

## 安装依赖

必须安装的依赖有：Node、Watchman、Xcode 和 CocoaPods。

虽然你可以使用`任何编辑器`来开发应用（编写 js 代码），但你仍然必须安装 Xcode 来获得编译 iOS 应用所需的工具和环境。

### Node & Watchman

我们推荐使用[Homebrew](http://brew.sh/)来安装 Node 和 Watchman。在命令行中执行下列命令安装（如安装较慢可以尝试阿里云的[镜像源](https://developer.aliyun.com/mirror/homebrew)）：

```
brew install node@18
brew install watchman
```

如果你已经安装了 Node，请检查其版本是否在 18 以上。安装完 Node 后建议设置 npm 镜像（淘宝源）以加速后面的过程（或使用科学上网工具）。

> 注意：强烈建议始终选择 Node 当前的 LTS （长期维护）版本，一般是偶数版本，不要选择偏实验性质的奇数版本。

> 注意：不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！

```
# 使用nrm工具切换淘宝源
npx nrm use taobao

# 如果之后需要切换回官方源可使用
npx nrm use npm
```

[Watchman](https://facebook.github.io/watchman)则是由 Facebook 提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager 可以快速捕捉文件的变化从而实现实时刷新）。

### Yarn

[Yarn](https://classic.yarnpkg.com)是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。

```
npm install -g yarn
```

安装完 yarn 之后就可以用 yarn 代替 npm 了，例如用`yarn`代替`npm install`命令，用`yarn add 某第三方库名`代替`npm install 某第三方库名`。

### Xcode

React Native 目前需要[Xcode](https://developer.apple.com/xcode/downloads/) 14.1 或更高版本。你可以通过 App Store 或是到[Apple 开发者官网](https://developer.apple.com/xcode/downloads/)上下载。这一步骤会同时安装 Xcode IDE、Xcode 的命令行工具和 iOS 模拟器。

#### Xcode 的命令行工具

启动 Xcode，并在`Xcode | Preferences | Locations`菜单中检查一下是否装有某个版本的`Command Line Tools`。Xcode 的命令行工具中包含一些必须的工具，比如`git`等。

![Xcode Command Line Tools](/docs/assets/GettingStartedXcodeCommandLineTools.png)

#### 在 Xcode 中安装 iOS 模拟器

安装模拟器只需打开 <strong>Xcode > Preferences...</strong> 菜单，然后选择 <strong>Components</strong> 选项，即可看到各种可供安装的不同的 iOS 版本的模拟器。

#### CocoaPods

[CocoaPods](https://cocoapods.org/)是用 Ruby 编写的包管理器（可以理解为针对 iOS 的 npm）。从 0.60 版本开始 react native 的 iOS 版本需要使用 CocoaPods 来管理依赖。你可以使用下面的命令来安装 CocoaPods。CocoaPods 的版本需要 1.10 以上。

> 当然安装可能也不顺利，请使用代理软件。

```sh
sudo gem install cocoapods
```

或者可以使用 brew 来安装

```sh
brew install cocoapods
```

要了解更多信息，可以访问[CocoaPods 的官网](https://guides.cocoapods.org/using/getting-started.html)。

## 创建新项目

<RemoveGlobalCLI />

使用 React Native 内建的命令行工具来创建一个名为"AwesomeProject"的新项目。这个命令行工具不需要安装，可以直接用 node 自带的`npx`命令来使用（注意 init 命令默认会创建最新的版本）：

```shell
npx react-native@latest init AwesomeProject
```

> **注意一**：请`不要`在目录、文件名中使用中文、空格等特殊符号。请`不要`单独使用常见的关键字作为项目名（如 class, native, new, package 等等）。请`不要`使用与核心模块同名的项目名（如 react, react-native 等）。

> **注意二**：0.60 及以上版本的原生依赖是通过 CocoaPods 集成安装的。CocoaPods 的源必须使用代理访问（镜像源也无效）。如果在 CocoaPods 的依赖安装步骤卡住（命令行停在 Installing CocoaPods dependencies 很久，或各种网络超时重置报错，或在 ios 目录中无法生成.xcworkspace 文件），请务必检查确定你的代理配置是否对命令行有效。

如果你是想把 React Native 集成到现有的原生项目中，则步骤完全不同，请参考[集成到现有原生应用](integration-with-existing-apps.md)。

### [可选参数] 指定版本或项目模板

你可以使用`--version`参数（注意是`两`个杠）创建指定版本的项目。注意版本号必须精确到两个小数点。

```shell
npx react-native@X.XX.X init AwesomeProject --version X.XX.X
```

还可以使用`--template`来使用一些社区提供的模板。

### [可选文件] Xcode 的环境配置文件

从 React Native 版本 0.69 开始，可以使用模板提供的 `.xcode.env` 文件来配置 Xcode 环境。

`.xcode.env` 文件中包含一个环境变量示例，用于在 `NODE_BINARY` 变量中导出 `node` 执行文件的路径。这是将构建基础结构与`node`系统版本解耦的**推荐做法**。如果与默认值不同，则应使用您自己的路径或您自己的`node`版本管理器来自定义此变量。

此外，您还可以在构建脚本阶段中添加任何其他环境变量并导入 `.xcode.env` 文件。如果您需要运行需要特定环境的脚本，这也是将构建阶段与特定环境解耦的**推荐做法**。

## 编译并运行 React Native 应用

在你的项目目录中运行`yarn ios`或者`yarn react-native run-ios`：

```sh
cd AwesomeProject
yarn ios
# 或者
yarn react-native run-ios
```

此命令会对项目的原生部分进行编译，同时在另外一个命令行中启动`Metro`服务对 js 代码进行实时打包处理（类似 webpack）。`Metro`服务也可以使用`yarn start`命令单独启动。

> 提示：如果此命令无法正常运行，请使用 Xcode 运行来查看具体错误（run-ios 的报错没有任何具体信息）。注意 0.60 版本之后的主项目文件是`.xcworkspace`，不是`.xcodeproj`！

很快就应该能看到 iOS 模拟器自动启动并运行你的项目。

在正常编译完成后，开发期间请保持`Metro`命令行窗口运行而不要关闭。以后需要再次运行项目时，如果没有修改过 ios 目录中的任何文件，则只需单独启动`yarn start`命令。如果对 ios 目录中任何文件有修改，则需要再次运行`yarn ios`命令完成原生部分的编译。

![AwesomeProject on iOS](/docs/assets/GettingStartediOSSuccess.png)

`yarn ios`只是运行应用的方式之一。你也可以在 Xcode 中直接运行应用。注意 0.60 版本之后的主项目文件是`.xcworkspace`，不是`.xcodeproj`。

> 如果你无法正常运行，先回头`仔细对照文档检查`，然后可以看看[讨论区](https://github.com/reactnativecn/react-native-website/issues)。

### 在真机上运行

上面的命令会自动在 iOS 模拟器上运行应用，如果你想在真机上运行，则请阅读[在设备上运行](running-on-device.md)这篇文档。

### 修改项目

现在你已经成功运行了项目，我们可以开始尝试动手改一改了：

- 使用你喜欢的编辑器打开`App.js`并随便改上几行。
- 在 iOS 模拟器中按下`⌘-R`就可以刷新 APP 并看到你的最新修改！（如果没有反应，请检查模拟器的 Hardware 菜单中，connect hardware keyboard 选项是否选中开启）

### 完成了！

恭喜！你已经成功运行并修改了你的第一个 React Native 应用。

<center><img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

## 接下来？

如果你想把 React Native 集成到现有的原生项目中，则请参考[集成到现有原生应用](integration-with-existing-apps.md)。

如果你想从头开始学习 React Native 开发，可以从[简介](getting-started.md)文档开始。

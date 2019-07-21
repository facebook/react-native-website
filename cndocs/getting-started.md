---
id: getting-started
title: 搭建开发环境
---

欢迎使用 React Native！这篇文档会帮助你搭建基本的 React Native 开发环境。如果你已经搭好了环境，那么可以尝试一下[编写 Hello World](tutorial.md)。

<div class="toggler">
  <ul role="tablist" id="toggle-guide">
    <li id="native" class="button-native" aria-selected="false" role="tab" tabindex="0" aria-controls="nativetab" onclick="displayTab('guide', 'native')">
      完整原生环境
    </li>
    <li id="quickstart" class="button-quickstart" aria-selected="false" role="tab" tabindex="0" aria-controls="quickstarttab" onclick="displayTab('guide', 'quickstart')">
      简易沙盒环境
    </li>
  </ul>
</div>

<block class="quickstart mac windows linux ios android" />

译注：沙盒环境大量依赖于国外网络环境，也不能直接发布应用，只是用于学习、演示、试验等目的。不建议国内用户使用。

[Create React Native App](https://github.com/react-community/create-react-native-app) is the easiest way to start building a new React Native application. It allows you to start a project without installing or configuring any tools to build native code - no Xcode or Android Studio installation required (see [Caveats](getting-started.md#caveats)).

Assuming that you have [Node](https://nodejs.org/en/download/) installed, you can use npm to install the `create-react-native-app` command line utility:

```
npm install -g create-react-native-app
```

Then run the following commands to create a new React Native project called "AwesomeProject":

```
create-react-native-app AwesomeProject

cd AwesomeProject
npm start
```

This will start a development server for you, and print a QR code in your terminal.

## Running your React Native application

Install the [Expo](https://expo.io) client app on your iOS or Android phone and connect to the same wireless network as your computer. Using the Expo app, scan the QR code from your terminal to open your project.

### Modifying your app

Now that you have successfully run the app, let's modify it. Open `App.js` in your text editor of choice and edit some lines. The application should reload automatically once you save your changes.

### That's it!

Congratulations! You've successfully run and modified your first React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

## Now what?

- Create React Native App also has a [user guide](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md) you can reference if you have questions specific to the tool.

- If you can't get this to work, see the [Troubleshooting](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md#troubleshooting) section in the README for Create React Native App.

If you're curious to learn more about React Native, continue on to the [Tutorial](tutorial.md).

### Running your app on a simulator or virtual device

Create React Native App makes it really easy to run your React Native app on a physical device without setting up a development environment. If you want to run your app on the iOS Simulator or an Android Virtual Device, please refer to the instructions for building projects with native code to learn how to install Xcode and set up your Android development environment.

Once you've set these up, you can launch your app on an Android Virtual Device by running `npm run android`, or on the iOS Simulator by running `npm run ios` (macOS only).

### Caveats

Because you don't build any native code when using Create React Native App to create a project, it's not possible to include custom native modules beyond the React Native APIs and components that are available in the Expo client app.

If you know that you'll eventually need to include your own native code, Create React Native App is still a good way to get started. In that case you'll just need to "[eject](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md#ejecting-from-create-react-native-app)" eventually to create your own native builds. If you do eject, the "Building Projects with Native Code" instructions will be required to continue working on your project.

Create React Native App configures your project to use the most recent React Native version that is supported by the Expo client app. The Expo client app usually gains support for a given React Native version about a week after the React Native version is released as stable. You can check [this document](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) to find out what versions are supported.

If you're integrating React Native into an existing project, you'll want to skip Create React Native App and go directly to setting up the native build environment. Select "Building Projects with Native Code" above for instructions on configuring a native build environment for React Native.

<block class="native mac windows linux ios android" />

<p>Follow these instructions if you need to build native code in your project. For example, if you are integrating React Native into an existing application, or if you "ejected" from <a href="getting-started.html" onclick="displayTab('guide', 'quickstart')">Create React Native App</a>, you'll need this section.</p>

根据你所使用的操作系统、针对的目标平台不同，具体步骤有所不同。如果想同时开发 iOS 和 Android 也没问题，你只需要先选一个平台开始，另一个平台的环境搭建只是稍有不同。

如果`阅读完本文档`后还碰到很多环境搭建的问题，我们建议你还可以再看看由本站提供的`环境搭建视频教程`([macOS iOS](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220865928921581&vid=a1417i5op7k)、[macOS Android](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220870223888877&vid=z1417kmxask)、[windows Android](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220874518856173&vid=d1417tgg1ez))、[windows 环境搭建文字教程](http://bbs.reactnative.cn/topic/10)、以及[常见问题](http://bbs.reactnative.cn/topic/130)。注意！视频教程或者其他网络上的博客和文章可能和本文档有所出入，请以最新版本的本文档所述为准！

<div class="toggler">
  <span>开发平台：</span>
  <span role="tablist" id="toggle-os">
    <button role="tab" class="button-mac" onclick="displayTab('os', 'mac')">macOS</button>
    <button role="tab" class="button-linux" onclick="displayTab('os', 'linux')">Linux</a>
    <button role="tab" class="button-windows" onclick="displayTab('os', 'windows')">Windows</button>
  </span>
</div>

<div class="toggler">
  <span>目标平台：</span>
  <span role="tablist" id="toggle-platform">
    <button role="tab" class="button-ios" onclick="displayTab('platform', 'ios')">iOS</a>
    <button role="tab" class="button-android" onclick="displayTab('platform', 'android')">Android</a>
  </span>
</div>

<div class="toggler">
  <span>开发平台：</span>
  <a href="javascript:void(0);" class="button-mac" onclick="displayTab('os', 'mac')">macOS</a>
  <a href="javascript:void(0);" class="button-windows" onclick="displayTab('os', 'windows')">Windows</a>
  <a href="javascript:void(0);" class="button-linux" onclick="displayTab('os', 'linux')">Linux</a>
  <span>目标平台：</span>
  <a href="javascript:void(0);" class="button-ios" onclick="displayTab('platform', 'ios')">iOS</a>
  <a href="javascript:void(0);" class="button-android" onclick="displayTab('platform', 'android')">Android</a>
</div>

<block class="native linux windows ios" />

## 暂不支持

<blockquote><p>苹果公司目前只允许在Mac电脑上开发iOS应用。如果你没有Mac电脑，那么只能考虑使用<a href="getting-started.html" onclick="displayTab('guide', 'quickstart')">沙盒环境</a>，或者先开发Android应用了。</blockquote>

<block class="native mac ios" />

## 安装依赖

必须安装的依赖有：Node、Watchman 和 React Native 命令行工具以及 Xcode。

虽然你可以使用`任何编辑器`来开发应用（编写 js 代码），但你仍然必须安装 Xcode 来获得编译 iOS 应用所需的工具和环境。

<block class="native mac android" />

## 安装依赖

必须安装的依赖有：Node、Watchman 和 React Native 命令行工具以及 JDK 和 Android Studio。

<block class="native linux android" />

## 安装依赖

必须安装的依赖有：Node、React Native 命令行工具以及 JDK 和 Android Studio。

<block class="native windows android" />

## 安装依赖

必须安装的依赖有：Node、React Native 命令行工具、Python2 以及 JDK 和 Android Studio。

<block class="native mac windows linux android" />

虽然你可以使用`任何编辑器`来开发应用（编写 js 代码），但你仍然必须安装 Android Studio 来获得编译 Android 应用所需的工具和环境。

<block class="native mac ios android" />

### Node, Watchman

我们推荐使用[Homebrew](http://brew.sh/)来安装 Node 和 Watchman。在命令行中执行下列命令安装：

```
brew install node
brew install watchman
```

如果你已经安装了 Node，请检查其版本是否在 v10 以上。安装完 Node 后建议设置 npm 镜像以加速后面的过程（或使用科学上网工具）。

> 注意：不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！

```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

[Watchman](https://facebook.github.io/watchman)则是由 Facebook 提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager 可以快速捕捉文件的变化从而实现实时刷新）。

<block class="native linux android" />

### Node

参照 Node 官方的[Linux 安装指南](https://nodejs.org/en/download/package-manager/)来安装 Node 10 以上的版本。

<block class='native windows android' />

### Node, Python2, JDK

我们建议直接使用搜索引擎搜索下载 Node 、Python2 和[Java SE Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

注意 Node 的版本必须大于等于 10，Python 的版本必须为 2.x（不支持 3.x），而 JDK 的版本必须是 1.8（目前不支持 1.9 及更高版本）。安装完 Node 后建议设置 npm 镜像以加速后面的过程（或使用科学上网工具）。

> 注意：不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！

```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

<block class="native mac ios android" />

### Yarn、React Native 的命令行工具（react-native-cli）

[Yarn](http://yarnpkg.com)是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。React Native 的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

```
npm install -g yarn react-native-cli
```

安装完 yarn 后同理也要设置镜像源：

```
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

安装完 yarn 之后就可以用 yarn 代替 npm 了，例如用`yarn`代替`npm install`命令，用`yarn add 某第三方库名`代替`npm install 某第三方库名`。

<block class="native windows linux android" />

### Yarn、React Native 的命令行工具（react-native-cli）

[Yarn](http://yarnpkg.com)是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。React Native 的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

```
npm install -g yarn react-native-cli
```

安装完 yarn 后同理也要设置镜像源：

```
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

安装完 yarn 之后就可以用 yarn 代替 npm 了，例如用`yarn`代替`npm install`命令，用`yarn add 某第三方库名`代替`npm install 某第三方库名`。

<block class="native mac ios" />

### Xcode

React Native 目前需要[Xcode](https://developer.apple.com/xcode/downloads/) 9.4 或更高版本。你可以通过 App Store 或是到[Apple 开发者官网](https://developer.apple.com/xcode/downloads/)上下载。这一步骤会同时安装 Xcode IDE、Xcode 的命令行工具和 iOS 模拟器。

#### Xcode 的命令行工具

启动 Xcode，并在`Xcode | Preferences | Locations`菜单中检查一下是否装有某个版本的`Command Line Tools`。Xcode 的命令行工具中包含一些必须的工具，比如`git`等。

![Xcode Command Line Tools](assets/GettingStartedXcodeCommandLineTools.png)

<block class="native mac linux android" />

### Java Development Kit

React Native 需要 Java Development Kit [JDK] 1.8（暂不支持 1.9 及更高版本）。你可以在命令行中输入

> `javac -version`来查看你当前安装的 JDK 版本。如果版本不合要求，则可以到 [官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)上下载。

<block class="native mac linux windows android" />

### Android 开发环境

如果你之前没有接触过 Android 的开发环境，那么请做好心理准备，这一过程相当繁琐。请`万分仔细`地阅读下面的说明，严格对照文档进行配置操作。

> 译注：请注意！！！国内用户`必须必须必须`有稳定的翻墙工具，否则在下载、安装、配置过程中会不断遭遇链接超时或断开，无法进行开发工作。某些翻墙工具可能只提供浏览器的代理功能，或只针对特定网站代理等等，请自行研究配置或更换其他软件。总之如果报错中出现有网址，那么 99% 就是无法正常翻墙。

<block class="native mac windows linux android" />

#### 1. 安装 Android Studio

[首先下载和安装 Android Studio](https://developer.android.com/studio/index.html)，国内用户可能无法打开官方链接，请自行使用搜索引擎搜索可用的下载链接。安装界面中选择"Custom"选项，确保选中了以下几项：

<block class="native mac windows android" />

- `Android SDK`
- `Android SDK Platform`
- `Performance (Intel ® HAXM)` ([AMD 处理器看这里](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html))
- `Android Virtual Device`

<block class="native linux android" />

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

<block class="native mac windows linux android" />

然后点击"Next"来安装选中的组件。

> 如果选择框是灰的，你也可以先跳过，稍后再来安装这些组件。

安装完成后，看到欢迎界面时，就可以进行下面的操作了。

#### 2. 安装 Android SDK

Android Studio 默认会安装最新版本的 Android SDK。目前编译 React Native 应用需要的是`Android 9 (Pie)`版本的 SDK（注意 SDK 版本不等于终端系统版本，RN 目前支持 android4.1 以上设备）。你可以在 Android Studio 的 SDK Manager 中选择安装各版本的 SDK。

你可以在 Android Studio 的欢迎界面中找到 SDK Manager。点击"Configure"，然后就能看到"SDK Manager"。

<block class="native mac android" />

![Android Studio Welcome](assets/GettingStartedAndroidStudioWelcomeMacOS.png)

<block class="native windows android" />

![Android Studio Welcome](assets/GettingStartedAndroidStudioWelcomeWindows.png)

<block class="native mac windows linux android" />

> SDK Manager 还可以在 Android Studio 的"Preferences"菜单中找到。具体路径是**Appearance & Behavior** → **System Settings** → **Android SDK**。

在 SDK Manager 中选择"SDK Platforms"选项卡，然后在右下角勾选"Show Package Details"。展开`Android 9 (Pie)`选项，确保勾选了下面这些组件（重申你必须使用稳定的翻墙工具，否则可能都看不到这个界面）：

- `Android SDK Platform 28`
- `Intel x86 Atom_64 System Image`（官方模拟器镜像文件，使用非官方模拟器不需要安装此组件）

然后点击"SDK Tools"选项卡，同样勾中右下角的"Show Package Details"。展开"Android SDK Build-Tools"选项，确保选中了 React Native 所必须的`28.0.3`版本。你可以同时安装多个其他版本。

最后点击"Apply"来下载和安装这些组件。

#### 3. 配置 ANDROID_HOME 环境变量

React Native 需要通过环境变量来了解你的 Android SDK 装在什么路径，从而正常进行编译。

<block class="native mac linux android" />

具体的做法是把下面的命令加入到`~/.bash_profile`文件中：

<block class="native mac android" />

> 译注：~表示用户目录，即`/Users/你的用户名/`，而小数点开头的文件在 Finder 中是隐藏的，并且这个文件有可能并不存在。可在终端下使用`vi ~/.bash_profile`命令创建或编辑。如不熟悉 vi 操作，请点击[这里](http://www.eepw.com.cn/article/48018.htm)学习。

```
# 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚。
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

<block class="native linux android" />

```
# 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚。
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

<block class="native mac linux android" />

> 如果你的命令行不是 bash，而是例如 zsh 等其他，请使用对应的配置文件。

使用`source $HOME/.bash_profile`命令来使环境变量设置立即生效（否则重启后才生效）。可以使用`echo $ANDROID_HOME`检查此变量是否已正确设置。

> 请确保你正常指定了 Android SDK 路径。你可以在 Android Studio 的"Preferences"菜单中查看 SDK 的真实路径，具体是**Appearance & Behavior** → **System Settings** → **Android SDK**。

<block class="native windows android" />

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` -> `高级` -> `环境变量` -> `新建`，创建一个名为`ANDROID_HOME`的环境变量（系统或用户变量均可），指向你的 Android SDK 所在的目录（具体的路径可能和下图不一致，请自行确认）：

![ANDROID_HOME Environment Variable](assets/GettingStartedAndroidEnvironmentVariableANDROID_HOME.png)

SDK 默认是安装在下面的目录：

```powershell
c:\Users\你的用户名\AppData\Local\Android\Sdk
```

你可以在 Android Studio 的"Preferences"菜单中查看 SDK 的真实路径，具体是**Appearance & Behavior** → **System Settings** → **Android SDK**。

你需要关闭现有的命令符提示窗口然后重新打开，这样新的环境变量才能生效。

#### 4. 把 platform-tools 目录添加到环境变量 Path 中

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` -> `高级` -> `环境变量`，选中**Path**变量，然后点击**编辑**。点击**新建**然后把 platform-tools 目录路径添加进去。

此目录的默认路径为：

```powershell
c:\Users\你的用户名\AppData\Local\Android\Sdk\platform-tools
```

 <block class="native linux android" />

<block class="native linux android" />

### Watchman

参照[Watchman 的安装说明](https://facebook.github.io/watchman/docs/install.html#buildinstall)来从源码来编译和安装 Watchman。

> [Watchman](https://facebook.github.io/watchman/docs/install.html)是由 Facebook 提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager 可以快速捕捉文件的变化从而实现实时刷新）。

<block class="native mac ios" />

## 创建新项目

使用 React Native 命令行工具来创建一个名为"AwesomeProject"的新项目：

**！！！注意！！！**：init 命令默认会创建最新的版本，而目前最新的 0.45 及以上版本需要下载 boost 等几个第三方库编译。这些库在国内即便翻墙也很难下载成功，导致很多人`无法运行iOS项目`！！！中文网在论坛中提供了这些库的[国内下载链接](http://bbs.reactnative.cn/topic/4301/)。如果你嫌麻烦，又没有对新版本的需求，那么可以暂时创建`0.44.3`的版本。

```
react-native init AwesomeProject
```

> 提示：你可以使用`--version`参数（注意是`两`个杠）创建指定版本的项目。例如`react-native init MyApp --version 0.44.3`。注意版本号必须精确到两个小数点。

如果你是想把 React Native 集成到现有的原生项目中，则步骤完全不同，请参考[集成到现有原生应用](integration-with-existing-apps.md)。

<block class="native mac windows linux android" />

## 创建新项目

使用 React Native 命令行工具来创建一个名为"AwesomeProject"的新项目：

```
react-native init AwesomeProject
```

> 提示：你可以使用`--version`参数（注意是`两`个杠）创建指定版本的项目。例如`react-native init MyApp --version 0.44.3`。注意版本号必须精确到两个小数点。

**Windows 用户请注意，请不要在某些权限敏感的目录例如 System32 目录中 init 项目！会有各种权限限制导致不能运行！**

如果你是想把 React Native 集成到现有的原生项目中，则步骤完全不同，请参考[集成到现有原生应用](integration-with-existing-apps.md)。

<block class="native mac windows linux android" />

## 准备 Android 设备

你需要准备一台 Android 设备来运行 React Native Android 应用。这里所指的设备既可以是真机，也可以是模拟器。后面我们所有的文档除非特别说明，并不区分真机或者模拟器。Android 官方提供了名为 Android Virtual Device（简称 AVD）的模拟器。此外还有很多第三方提供的模拟器如[Genymotion](https://www.genymotion.com/download)、BlueStack 等。一般来说官方模拟器免费、功能完整，但性能较差。第三方模拟器性能较好，但可能需要付费，或带有广告。

### 使用 Android 真机

你也可以使用 Android 真机来代替模拟器进行开发，只需用 usb 数据线连接到电脑，然后遵照[在设备上运行](running-on-device.md)这篇文档的说明操作即可。

### 使用 Android 模拟器

你可以使用 Android Studio 打开项目下的"android"目录，然后可以使用"AVD Manager"来查看可用的虚拟设备，它的图标看起来像下面这样：

![Android Studio AVD Manager](assets/GettingStartedAndroidStudioAVD.png)

如果你刚刚才安装 Android Studio，那么可能需要先[创建一个虚拟设备](https://developer.android.com/studio/run/managing-avds.html)。点击"Create Virtual Device..."，然后选择所需的设备类型并点击"Next"，然后选择**Pie** API Level 28 image.

> 译注：请不要轻易点击 Android Studio 中可能弹出的建议更新项目中某依赖项的建议，否则可能导致无法运行。

<block class="native linux android" />

> 建议先开启[虚拟加速技术](https://developer.android.com/studio/run/emulator-acceleration.html#vm-linux)以提高模拟器性能。

<block class="native windows android" />

> 如果你还没有安装 HAXM（Intel 虚拟硬件加速驱动），则先点击"Install HAXM"或是按这篇[文档说明](https://software.intel.com/en-us/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-windows)来进行安装。

<block class="native mac android" />

> 如果你还没有安装 HAXM（Intel 虚拟硬件加速驱动），则先按这篇[文档说明](https://software.intel.com/en-us/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-mac-os-x)来进行安装。

<block class="native mac windows linux android" />

然后点击"Next"和"Finish"来完成虚拟设备的创建。现在你应该可以点击虚拟设备旁的绿色三角按钮来启动它了，启动完后我们可以尝试运行应用。

<block class="native mac ios" />

## 编译并运行 React Native 应用

在你的项目目录中运行`react-native run-ios`：

```
cd AwesomeProject
react-native run-ios
```

> 提示：如果 run-ios 无法正常运行，请使用 Xcode 运行来查看具体错误（run-ios 的报错没有任何具体信息）。

很快就应该能看到 iOS 模拟器自动启动并运行你的项目。

![AwesomeProject on iOS](assets/GettingStartediOSSuccess.png)

`react-native run-ios`只是运行应用的方式之一。你也可以在 Xcode 或是[Nuclide](https://nuclide.io/)中直接运行应用。

> 如果你无法正常运行，先回头`仔细对照文档检查`，然后可以看看论坛的[求助专区](http://bbs.reactnative.cn/category/4)。

### 在真机上运行

上面的命令会自动在 iOS 模拟器上运行应用，如果你想在真机上运行，则请阅读[在设备上运行](running-on-device.md)这篇文档。

<block class="native mac windows linux android" />

## 编译并运行 React Native 应用

确保你先运行了模拟器或者连接了真机，然后在你的项目目录中运行`react-native run-android`：

```
cd AwesomeProject
react-native run-android
```

如果配置没有问题，你应该可以看到应用自动安装到设备上并开始运行。注意第一次运行时需要下载大量编译依赖，耗时可能数十分钟。此过程`严重依赖稳定的翻墙工具`，否则将频繁遭遇链接超时和断开，导致无法运行。

如果你的设备的 Android 版本低于 5.0，则可能在运行时看到红屏，请阅读[在设备上运行](running-on-device.md)这篇文档来按照步骤解决。

<block class="native mac android" />

![AwesomeProject on Android](assets/GettingStartedAndroidSuccessMacOS.png)

<block class="native windows android" />

![AwesomeProject on Android](assets/GettingStartedAndroidSuccessWindows.png)

<block class="native mac windows linux android" />

`react-native run-android`只是运行应用的方式之一。你也可以在 Android Studio 或是[Nuclide](https://nuclide.io/)中直接运行应用。

> 译注：建议在`run-android`成功后再尝试使用 Android Studio 启动。请不要轻易点击 Android Studio 中可能弹出的建议更新项目中某依赖项的建议，否则可能导致无法运行。

> 如果你无法正常运行，遇到奇奇怪怪的红屏错误，先回头`仔细对照文档检查`，然后可以看看论坛的[求助专区](http://bbs.reactnative.cn/category/4)。不同时期不同版本可能会碰到不同的问题，我们会在论坛中及时解答更新。但请注意**_千万不要_**执行 bundle 命令，那样会导致代码完全无法刷新。

<block class="native mac ios android" />

### 修改项目

现在你已经成功运行了项目，我们可以开始尝试动手改一改了：

<block class="native mac ios" />

- 使用你喜欢的编辑器打开`App.js`并随便改上几行。
- 在 iOS 模拟器中按下`⌘-R`就可以刷新 APP 并看到你的最新修改！（如果没有反应，请检查模拟器的 Hardware 菜单中，connect hardware keyboard 选项是否选中开启）

<block class="native mac android" />

- 使用你喜欢的文本编辑器打开`App.js`并随便改上几行
- 按两下 R 键，或是用 Menu 键（通常是 F2，在 Genymotion 模拟器中是`⌘+M`）打开开发者菜单，然后选择 _Reload JS_ 就可以看到你的最新修改。

<block class="native windows linux android" />

### 修改项目

现在你已经成功运行了项目，我们可以开始尝试动手改一改了：

- 使用你喜欢的文本编辑器打开`App.js`并随便改上几行
- 按两下 R 键，或是在开发者菜单中选择 _Reload JS_，就可以看到你的最新修改。

<block class="native mac ios android" />

### 完成了！

恭喜！你已经成功运行并修改了你的第一个 React Native 应用。

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<block class="native windows linux android" />

### 完成了！

恭喜！你已经成功运行并修改了你的第一个 React Native 应用。

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<block class="native mac ios" />

## 接下来？

- 试着在开发者菜单中打开[Live Reload](debugging.md#自动刷新)，现在你只要一保存代码应用就会自动完整刷新。

- 如果你想把 React Native 集成到现有的原生项目中，则请参考[集成到现有原生应用](integration-with-existing-apps.md)。

如果你想从头开始学习 React Native 开发，可以从尝试[编写 Hello World](tutorial.md)开始。

<block class="native windows linux mac android" />

## 接下来？

- 试着在开发者菜单中打开[Live Reload](debugging.md#自动刷新)，现在你只要一保存代码应用就会自动完整刷新。

- 如果你想把 React Native 集成到现有的原生项目中，则请参考[集成到现有原生应用](integration-with-existing-apps.md)。

如果你想从头开始学习 React Native 开发，可以从尝试[编写 Hello World](tutorial.md)开始。

import RemoveGlobalCLI from './\_remove-global-cli.md';

## 安装依赖

必须安装的依赖有：Node、JDK 和 Android Studio。

虽然你可以使用`任何编辑器`来开发应用（编写 js 代码），但你仍然必须安装 Android Studio 来获得编译 Android 应用所需的工具和环境。

### Node & Watchman

我们推荐使用[Homebrew](http://brew.sh/)来安装 Node 和 Watchman。在命令行中执行下列命令安装（如安装较慢可以尝试阿里云的[镜像源](https://developer.aliyun.com/mirror/homebrew)）：

```shell
brew install node@18
brew install watchman
```

如果你已经安装了 Node，请检查其版本是否在 18 以上。安装完 Node 后建议设置 npm 镜像（淘宝源）以加速后面的过程（或使用科学上网工具）。

> 注意：强烈建议始终选择 Node 当前的 LTS （长期维护）版本，一般是偶数版本，不要选择偏实验性质的奇数版本。

> 注意：不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！

```shell
# 使用nrm工具切换淘宝源
npx nrm use taobao

# 如果之后需要切换回官方源可使用
npx nrm use npm
```

[Watchman](https://facebook.github.io/watchman)则是由 Facebook 提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager 可以快速捕捉文件的变化从而实现实时刷新）。

### Yarn

[Yarn](http://yarnpkg.com)是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。

```
npm install -g yarn
```

安装完 yarn 之后就可以用 yarn 代替 npm 了，例如用`yarn`代替`npm install`命令，用`yarn add 某第三方库名`代替`npm install 某第三方库名`。

### Java Development Kit

我们推荐使用[Homebrew](http://brew.sh/)来安装由 Azul 提供的 名为 **Zulu** 的 OpenJDK 发行版。此发行版**同时为 Intel 和 M1 芯片提供支持**。在 M1 芯片架构的 Mac 上相比其他 JDK 在编译时有明显的性能优势。

```shell
brew install --cask zulu@17

# Get path to where cask was installed to double-click installer
brew info --cask zulu@17
```

安装 JDK 后，请更新 `JAVA_HOME` 环境变量。如果你是按照上述步骤操作，JDK 很可能位于 `/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`

React Native 当前需要 Java Development Kit [JDK] 17，不建议使用更高版本或更低版本，可能会碰到问题。你可以在命令行中输入
`javac -version`（请注意是 javac，不是 java）来查看你当前安装的 JDK 版本。

> 低于 0.73 版本的 React Native 需要 JDK 11 版本，而低于 0.67 的需要 JDK 8 版本。

### Android 开发环境

如果你之前没有接触过 Android 的开发环境，那么请做好心理准备，这一过程相当繁琐。请`万分仔细`地阅读下面的说明，严格对照文档进行配置操作。

> 译注：请注意！！！国内用户`必须必须必须`有稳定的代理软件，否则在下载、安装、配置过程中会不断遭遇链接超时或断开，无法进行开发工作。某些代理软件可能只提供浏览器的代理功能，或只针对特定网站代理等等，请自行研究配置或更换其他软件。总之如果报错中出现有网址，那就是因为链接源仓库的网络链接被阻断了，这一阻断现象可能因时间、地区、运营商而不同。

> 也可以尝试参考这里的做法[设置阿里云的 maven 镜像源](https://github.com/scwang90/SmartRefreshLayout/issues/1376#issuecomment-938422964)，但这个做法可能随 gradle 或者 rn 版本的不同而失效。

<h4 id="android-studio">1. 安装 Android Studio</h4>

[首先下载和安装 Android Studio](https://developer.android.google.cn/studio/)，国内用户可能无法打开官方链接，请自行使用搜索引擎搜索可用的下载链接。安装界面中选择"Custom"选项，确保选中了以下几项：

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

然后点击"Next"来安装选中的组件。

> 如果选择框是灰的，你也可以先跳过，稍后再来安装这些组件。

安装完成后，看到欢迎界面时，就可以进行下面的操作了。

<h4 id="android-sdk">2. 安装 Android SDK</h4>

Android Studio 默认会安装最新版本的 Android SDK。目前编译 React Native 应用需要的是`Android 14 (UpsideDownCake)`版本的 SDK（注意 SDK 版本不等于终端系统版本，RN 目前支持 android 6 以上设备）。你可以在 Android Studio 的 SDK Manager 中选择安装各版本的 SDK。

你可以在 Android Studio 的欢迎界面中找到 SDK Manager。点击"Configure"，然后就能看到"SDK Manager"。

![Android Studio Welcome](/docs/assets/GettingStartedAndroidStudioWelcomeMacOS.png)

> SDK Manager 还可以在 Android Studio 的"Preferences"菜单中找到。具体路径是**Appearance & Behavior** → **System Settings** → **Android SDK**。

在 SDK Manager 中选择"SDK Platforms"选项卡，然后在右下角勾选"Show Package Details"。展开`Android 14 (UpsideDownCake)`选项，确保勾选了下面这些组件（如果看不到这个界面，则需要使用稳定的代理软件）：

- `Android SDK Platform 34`
- `Intel x86 Atom_64 System Image`（官方模拟器镜像文件，使用非官方模拟器不需要安装此组件）或是`Google APIs ARM 64 v8a System Image`（针对 Apple Silicon 系列机型）

然后点击"SDK Tools"选项卡，同样勾中右下角的"Show Package Details"。展开"Android SDK Build-Tools"选项，确保选中了 React Native 所必须的`34.0.0`版本。你可以同时安装多个其他版本。

点击"Apply"来下载和安装选中的这些组件。

#### 3. 配置 ANDROID_HOME 环境变量

React Native 需要通过环境变量来了解你的 Android SDK 装在什么路径，从而正常进行编译。

具体的做法是把下面的命令加入到 shell 的配置文件中。如果你的 shell 是 zsh，则配置文件为`~/.zshrc`，如果是 bash 则为`~/.bash_profile`（可以使用`echo $0`命令查看你所使用的 shell。）：

```shell
# 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

> 译注：~表示用户目录，即`/Users/你的用户名/`，而小数点开头的文件在 Finder 中是隐藏的，并且这个文件有可能并不存在。可在终端下使用`vi ~/.zshrc`命令创建或编辑。如不熟悉 vi 操作，请点击[这里](http://www.eepw.com.cn/article/48018.htm)学习。

使用`source $HOME/.zshrc`命令来使环境变量设置立即生效（否则重启后才生效）。可以使用`echo $ANDROID_HOME`检查此变量是否已正确设置。

> 请确保你正确指定了 Android SDK 路径。你可以在 Android Studio 的"Preferences"菜单中查看 SDK 的真实路径，具体是**Appearance & Behavior** → **System Settings** → **Android SDK**。

<h2>创建新项目</h2>

<RemoveGlobalCLI />

使用 React Native 内建的命令行工具来创建一个名为"AwesomeProject"的新项目。这个命令行工具不需要安装，可以直接用 node 自带的`npx`命令来使用：

> **必须要看的注意事项**：请`不要`单独使用常见的关键字作为项目名（如 class, native, new, package 等等）。请`不要`使用与核心模块同名的项目名（如 react, react-native 等）。请`不要`在目录、文件名中使用中文、空格等特殊符号。

```shell
npx react-native@latest init AwesomeProject
```

如果你是想把 React Native 集成到现有的原生项目中，则步骤完全不同，请参考[集成到现有原生应用](integration-with-existing-apps.md)。

<h3>[可选参数] 指定版本或项目模板</h3>

你可以使用`--version`参数（注意是`两`个杠）创建指定版本的项目。例如：

```shell
npx react-native@X.XX.X init AwesomeProject --version X.XX.X
```

还可以使用`--template`参数来使用一些社区提供的模板。

## 准备 Android 设备

你需要准备一台 Android 设备来运行 React Native Android 应用。这里所指的设备既可以是真机，也可以是模拟器。后面我们所有的文档除非特别说明，并不区分真机或者模拟器。Android 官方提供了名为 Android Virtual Device（简称 AVD）的模拟器。此外还有很多第三方提供的模拟器如[Genymotion](https://www.genymotion.com/download)、BlueStack 等。一般来说官方模拟器免费、功能完整，但性能较差。第三方模拟器性能较好，但可能需要付费，或带有广告。

### 使用 Android 真机

你也可以使用 Android 真机来代替模拟器进行开发，只需用 usb 数据线连接到电脑，然后遵照[在设备上运行](running-on-device.md)这篇文档的说明操作即可。

### 使用 Android 模拟器

你可以使用 Android Studio 打开项目下的"android"目录，然后可以使用"AVD Manager"来查看可用的虚拟设备，它的图标看起来像下面这样：

![Android Studio AVD Manager](/docs/assets/GettingStartedAndroidStudioAVD.png)

如果你刚刚才安装 Android Studio，那么可能需要先[创建一个虚拟设备](https://developer.android.com/studio/run/managing-avds.html)。点击"Create Virtual Device..."，然后选择所需的设备类型并点击"Next"，然后选择**Tiramisu** API Level 33 image.

> 译注：请不要轻易点击 Android Studio 中可能弹出的建议更新项目中某依赖项的建议，否则可能导致无法运行。

## 编译并运行 React Native 应用

确保你先运行了模拟器或者连接了真机，然后在你的项目目录中运行`yarn android`或者`yarn react-native run-android`：

```
cd AwesomeProject
yarn android
# 或者
yarn react-native run-android
```

此命令会对项目的原生部分进行编译，同时在另外一个命令行中启动`Metro`服务对 js 代码进行实时打包处理（类似 webpack）。`Metro`服务也可以使用`yarn start`命令单独启动。

如果配置没有问题，你应该可以看到应用自动安装到设备上并开始运行。注意第一次运行时需要下载大量编译依赖，耗时可能数十分钟。此过程`严重依赖稳定的代理软件`，否则将频繁遭遇链接超时和断开，导致无法运行。

`npx react-native run-android`只是运行应用的方式之一。你也可以在 Android Studio 中直接运行应用。

> 译注：建议在`run-android`成功后再尝试使用 Android Studio 启动。请不要轻易点击 Android Studio 中可能弹出的建议更新项目中某依赖项的建议，否则可能导致无法运行。

> 如果你无法正常运行，遇到奇奇怪怪的红屏错误，先回头`仔细对照文档检查`，然后可以看看[问题讨论区](https://github.com/reactnativecn/react-native-website/issues)。不同时期不同版本可能会碰到不同的问题，我们会在论坛中及时解答更新。但请注意**_千万不要_**执行 bundle 命令，那样会导致代码完全无法刷新。

### 修改项目

现在你已经成功运行了项目，我们可以开始尝试动手改一改了：

- 使用你喜欢的文本编辑器打开`App.js`并随便改上几行
- 按两下 R 键，或是在开发者菜单中选择 _Reload_，就可以看到你的最新修改。

### 完成了！

恭喜！你已经成功运行并修改了你的第一个 React Native 应用

<center><img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

## 接下来？

如果你想把 React Native 集成到现有的原生项目中，则请参考[集成到现有原生应用](integration-with-existing-apps.md)。

如果你想从头开始学习 React Native 开发，可以从[简介](getting-started.md)文档开始。

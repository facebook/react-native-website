---
id: version-0.48-getting-started
title: 搭建开发环境
original_id: getting-started
---

欢迎使用React Native！这篇文档会帮助你搭建基本的React Native开发环境。如果你已经搭好了环境，那么可以尝试一下[编写Hello World](tutorial.html)。

根据你所使用的操作系统、针对的目标平台不同，具体步骤有所不同。如果想同时开发iOS和Android也没问题，你只需要先选一个平台开始，另一个平台的环境搭建只是稍有不同。

如果`阅读完本文档`后还碰到很多环境搭建的问题，我们建议你还可以再看看由本站提供的`环境搭建视频教程`([macOS iOS](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220865928921581&vid=a1417i5op7k)、[macOS Android](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220870223888877&vid=z1417kmxask)、[windows Android](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220874518856173&vid=d1417tgg1ez))、[windows环境搭建文字教程](http://bbs.reactnative.cn/topic/10)、以及[常见问题](http://bbs.reactnative.cn/topic/130)。

<div class="toggler">
<style>
.toggler {
  margin-bottom: 10px;
}
.toggler a {
  cursor: pointer;
  display: inline-block;
  padding: 10px 5px;
  margin: 2px;
  border: 1px solid #05A5D1;
  border-radius: 3px;
  text-decoration: none !important;
}
.display-os-mac .toggler .button-mac,
.display-os-linux .toggler .button-linux,
.display-os-windows .toggler .button-windows,
.display-platform-ios .toggler .button-ios,
.display-platform-android .toggler .button-android {
  background-color: #05A5D1;
  color: white;
}
.md-block { display: none; }
.md-block img { max-width:650px; }
.display-platform-ios.display-os-mac .ios.mac,
.display-platform-ios.display-os-linux .ios.linux,
.display-platform-ios.display-os-windows .ios.windows,
.display-platform-android.display-os-mac .android.mac,
.display-platform-android.display-os-linux .android.linux,
.display-platform-android.display-os-windows .android.windows {
  display: block;
}
</style>
<span>目标平台：</span>
<a class="button-ios" onclick="display('platform', 'ios')">iOS</a>
<a class="button-android" onclick="display('platform', 'android')">Android</a>
<span>开发平台：</span>
<a class="button-mac" onclick="display('os', 'mac')">macOS</a>
<a class="button-linux" onclick="display('os', 'linux')">Linux</a>
<a class="button-windows" onclick="display('os', 'windows')">Windows</a>
</div>

<!-- ######### LINUX AND WINDOWS for iOS ##################### -->

<div markdown class="md-block linux windows ios">

## 暂不支持

苹果公司目前只允许在Mac电脑上开发iOS应用。如果你没有Mac电脑，那么只能考虑先开发Android应用了。

![](img/react-native-sorry-not-supported.png)


<!-- ######### MAC for iOS ##################### -->

</div><div markdown class="md-block mac ios android" >

## 安装

### 必需的软件

#### Homebrew

[Homebrew](http://brew.sh/), Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件。

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

译注：在Max OS X 10.11（El Capitan)版本中，homebrew在安装软件时可能会碰到`/usr/local`目录不可写的权限问题。可以使用下面的命令修复：  

```bash
sudo chown -R `whoami` /usr/local
```

#### Node

使用Homebrew来安装[Node.js](https://nodejs.org/).

> React Native目前需要NodeJS 5.0或更高版本。本文发布时Homebrew默认安装的是最新版本，一般都满足要求。 

```
brew install node
```

安装完node后建议设置npm镜像以加速后面的过程（或使用科学上网工具）。注意：不要使用cnpm！cnpm安装的模块路径比较奇怪，packager不能正常识别！

```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

#### Yarn、React Native的命令行工具（react-native-cli）

[Yarn](http://yarnpkg.com)是Facebook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

```
npm install -g yarn react-native-cli
```

安装完yarn后同理也要设置镜像源：

```
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

如果你看到`EACCES: permission denied`这样的权限报错，那么请参照上文的homebrew译注，修复`/usr/local`目录的所有权：  

```bash
sudo chown -R `whoami` /usr/local
```


安装完yarn之后就可以用yarn代替npm了，例如用`yarn`代替`npm install`命令，用`yarn add 某第三方库名`代替`npm install --save 某第三方库名`。

> 注意：目前npm5（发文时最新版本为5.0.4）存在安装新库时会删除其他库的问题，导致项目无法正常运行。请尽量使用yarn代替npm操作。

</div><div markdown class="md-block mac ios">

#### Xcode

React Native目前需要[Xcode](https://developer.apple.com/xcode/downloads/) 8.0 或更高版本。你可以通过App Store或是到[Apple开发者官网](https://developer.apple.com/xcode/downloads/)上下载。这一步骤会同时安装Xcode IDE和Xcode的命令行工具。

> 虽然一般来说命令行工具都是默认安装了，但你最好还是启动Xcode，并在`Xcode | Preferences | Locations`菜单中检查一下是否装有某个版本的`Command Line Tools`。Xcode的命令行工具中也包含一些必须的工具，比如`git`等。

</div><div markdown class="md-block mac android" >

#### Android Studio

React Native目前需要[Android Studio](http://developer.android.com/sdk/index.html)2.0或更高版本。

> Android Studio需要Java Development Kit [JDK] 1.8或更高版本。你可以在命令行中输入
> `javac -version`来查看你当前安装的JDK版本。如果版本不合要求，则可以到
> [官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)上下载。

Android Studio包含了运行和测试React Native应用所需的Android SDK和模拟器。

> 除非特别注明，请不要改动安装过程中的选项。比如Android Studio默认安装了
> `Android Support Repository`，而这也是React Native必须的（否则在react-native run-android时会报appcompat-v7包找不到的错误）。

安装过程中有一些需要改动的选项：

- 选择`Custom`选项：

![custom installation](img/react-native-android-studio-custom-install.png)

- 勾选`Performance`和`Android Virtual Device`

![additional installs](img/react-native-android-studio-additional-installs.png)

- 安装完成后，在Android Studio的启动欢迎界面中选择`Configure | SDK Manager`。

![configure sdk](img/react-native-android-studio-configure-sdk.png)

- 在`SDK Platforms`窗口中，选择`Show Package Details`，然后在`Android 6.0 (Marshmallow)`中勾选`Google APIs`、`Android SDK Platform 23`、`Intel x86 Atom System Image`、`Intel x86 Atom_64 System Image`以及`Google APIs Intel x86 Atom_64 System Image`。

![platforms](img/react-native-android-studio-android-sdk-platforms.png)

- 在`SDK Tools`窗口中，选择`Show Package Details`，然后在`Android SDK Build Tools`中勾选`Android SDK Build-Tools 23.0.1`（必须是这个版本）。然后还要勾选最底部的`Android Support Repository`.

![build tools](img/react-native-android-studio-android-sdk-build-tools.png)

#### ANDROID_HOME环境变量

确保`ANDROID_HOME`环境变量正确地指向了你安装的Android SDK的路径。具体的做法是把下面的命令加入到`~/.bash_profile`文件中：(__译注__：~表示用户目录，即`/Users/你的用户名/`，而小数点开头的文件在Finder中是隐藏的，并且这个文件有可能并不存在。请在终端下使用`vi ~/.bash_profile`命令创建或编辑。如不熟悉vi操作，请点击[这里](http://www.eepw.com.cn/article/48018.htm)学习）  

```
# 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚。
export ANDROID_HOME=~/Library/Android/sdk
```  

然后使用下列命令使其立即生效（否则重启后才生效）：  

```bash
source ~/.bash_profile
```

可以使用`echo $ANDROID_HOME`检查此变量是否已正确设置。

</div>
<div markdown class="md-block mac ios android">

### 推荐安装的工具

#### Watchman

[Watchman](https://facebook.github.io/watchman/docs/install.html)是由Facebook提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager可以快速捕捉文件的变化从而实现实时刷新）。

```
brew install watchman
```

#### Flow

[Flow](http://www.flowtype.org)是一个静态的JS类型检查工具。译注：你在很多示例中看到的奇奇怪怪的冒号问号，以及方法参数中像类型一样的写法，都是属于这个flow工具的语法。这一语法并不属于ES标准，只是Facebook自家的代码规范。所以新手可以直接跳过（即不需要安装这一工具，也不建议去费力学习flow相关语法）。


```
brew install flow
```

</div><div markdown class="md-block mac android">

#### 将Android SDK的Tools目录添加到`PATH`变量中

你可以把Android SDK的tools和platform-tools目录添加到`PATH`变量中，以便在终端中运行一些Android工具，例如`android avd`或是`adb logcat`等。具体做法仍然是在`~/.bash_profile`中添加：

```
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### 其他可选的安装项

#### Git

Git版本控制。如果你已经安装过[Xcode](https://developer.apple.com/xcode/)，则Git也已经一并安装了。如若没有，则使用下列命令安装：

```
brew install git
```

</div><div markdown class="md-block mac ios android">

#### Nuclide

[Nuclide](http://nuclide.io)（此链接需要科学上网）是由Facebook提供的基于atom的集成开发环境，可用于编写、[运行](http://nuclide.io/docs/platforms/react-native/#running-applications)和
[调试](http://nuclide.io/docs/platforms/react-native/#debugging)React Native应用。

点击这里阅读[Nuclide的入门文档](http://nuclide.io/docs/quick-start/getting-started/)。

译注：我们更推荐使用[WebStorm](https://www.jetbrains.com/webstorm/)或[Sublime Text](http://www.sublimetext.com/)来编写React Native应用。

</div><div markdown class="md-block mac android">

#### Genymotion

比起Android Studio自带的原装模拟器，Genymotion是一个性能更好的选择，但它只对个人用户免费。

1. 下载和安装[Genymotion](https://www.genymotion.com/download)（genymotion需要依赖VirtualBox虚拟机，下载选项中提供了包含VirtualBox和不包含的选项，请按需选择）。
2. 打开Genymotion。如果你还没有安装VirtualBox，则此时会提示你安装。
3. 创建一个新模拟器并启动。
4. 启动React Native应用后，可以按下⌘+M来打开开发者菜单。

</div>
<div markdown class="md-block linux windows android">

## 安装

### 必需的软件

</div><div markdown class="md-block windows android">

#### Chocolatey

[Chocolatey](https://chocolatey.org)是一个Windows上的包管理器，类似于linux上的`yum`和
`apt-get`。 你可以在其[官方网站](https://chocolatey.org)上查看具体的使用说明。一般的安装步骤应该是下面这样：

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

> 一般来说，使用Chocolatey来安装软件的时候，需要以管理员的身份来运行命令提示符窗口。译注：chocolatey的网站可能在国内访问困难，导致上述安装命令无法正常完成。请使用稳定的翻墙工具。
> 如果你实在装不上这个工具，也不要紧。下面所需的python2和nodejs你可以分别单独去对应的官方网站下载安装即可。

#### Python 2

打开命令提示符窗口，使用Chocolatey来安装Python 2.

> 注意目前不支持Python 3版本。

```
choco install python2
```

</div><div markdown class="md-block linux windows android">

#### Node

</div><div markdown class="md-block linux android">

打开终端窗口，输入下面的命令来安装NodeJS:

```
sudo apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
```


</div><div markdown class="md-block windows android">

打开命令提示符窗口，使用Chocolatey来安装NodeJS。

```
choco install nodejs.install
```

安装完node后建议设置npm镜像以加速后面的过程（或使用科学上网工具）。注意：不要使用cnpm！cnpm安装的模块路径比较奇怪，packager不能正常识别！

```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

</div><div markdown class="md-block windows linux android">

#### Yarn、React Native的命令行工具（react-native-cli）

[Yarn](http://yarnpkg.com)是Facebook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

```
npm install -g yarn react-native-cli
```

安装完yarn后同理也要设置镜像源：

```
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

> 如果你遇到`EACCES: permission denied`权限错误，可以尝试运行下面的命令（限linux系统）：
> `sudo npm install -g yarn react-native-cli`.

安装完yarn之后就可以用yarn代替npm了，例如用`yarn`代替`npm install`命令，用`yarn add 某第三方库名`代替`npm install --save 某第三方库名`。

> 注意：目前npm5（发文时最新版本为5.0.4）存在安装新库时会删除其他库的问题，导致项目无法正常运行。请尽量使用yarn代替npm操作。


#### Android Studio

React Native目前需要[Android Studio](http://developer.android.com/sdk/index.html)2.0或更高版本。

> Android Studio需要Java Development Kit [JDK] 1.8或更高版本。你可以在命令行中输入
> `javac -version`来查看你当前安装的JDK版本。如果版本不合要求，则可以到
> [官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)上下载。
> 或是使用包管理器来安装（比如`choco install jdk8`或是
> `apt-get install default-jdk`）

Android Studio包含了运行和测试React Native应用所需的Android SDK和模拟器。

> 除非特别注明，请不要改动安装过程中的选项。比如Android Studio默认安装了
> `Android Support Repository`，而这也是React Native必须的（否则在react-native run-android时会报appcompat-v7包找不到的错误）。

</div><div markdown class="md-block linux android">

安装过程中有一些需要改动的选项：

- 选择`Custom`选项：

![custom installation](img/react-native-android-studio-custom-install-linux.png)

- 选择`Android Virtual Device`

![additional installs](img/react-native-android-studio-additional-installs-linux.png)

</div><div markdown class="md-block windows android">

- 确定所有安装都勾选了，尤其是`Android SDK`和`Android Device Emulator`。

- 在初步安装完成后，选择`Custom`安装项：

![custom installation](img/react-native-android-studio-custom-install-windows.png)

- 检查已安装的组件，尤其是模拟器和HAXM加速驱动。

![verify installs](img/react-native-android-studio-verify-installs-windows.png)

</div><div markdown class="md-block windows linux android">

- 安装完成后，在Android Studio的欢迎界面中选择`Configure | SDK Manager`。

</div><div markdown class="md-block linux android">

![configure sdk](img/react-native-android-studio-configure-sdk-linux.png)

</div><div markdown class="md-block windows android">

![configure sdk](img/react-native-android-studio-configure-sdk-windows.png)

</div><div markdown class="md-block windows linux android">

- 在`SDK Platforms`窗口中，选择`Show Package Details`，然后在`Android 6.0 (Marshmallow)`中勾选`Google APIs`、`Android SDK Platform 23`、`Intel x86 Atom System Image`、`Intel x86 Atom_64 System Image`以及`Google APIs Intel x86 Atom_64 System Image`。

</div><div markdown class="md-block linux android">

![platforms](img/react-native-android-studio-android-sdk-platforms-linux.png)

</div><div markdown class="md-block windows android">

![platforms](img/react-native-android-studio-android-sdk-platforms-windows.png)

</div><div markdown class="md-block windows linux android">

- 在`SDK Tools`窗口中，选择`Show Package Details`，然后在`Android SDK Build Tools`中勾选`Android SDK Build-Tools 23.0.1`（必须是这个版本）。然后还要勾选最底部的`Android Support Repository`.

</div><div markdown class="md-block linux android">

![build tools](img/react-native-android-studio-android-sdk-build-tools-linux.png)

</div><div markdown class="md-block windows android">

![build tools](img/react-native-android-studio-android-sdk-build-tools-windows.png)

</div><div markdown class="md-block windows linux android">


#### ANDROID_HOME环境变量

确保`ANDROID_HOME`环境变量正确地指向了你安装的Android SDK的路径。

</div><div markdown class="md-block linux android">

具体的做法是把下面的命令加入到`~/.bashrc`、`~/.bash_profile`文件中。如果你使用的是其他的shell，则选择对应的配置文件:

```
# 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚。
export ANDROID_HOME=~/Library/Android/sdk
```

然后使用下列命令使其立即生效（否则重启后才生效）：  

```bash
source ~/.bash_profile
```

可以使用`echo $ANDROID_HOME`检查此变量是否已正确设置。

</div><div markdown class="md-block windows android">

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` ->
`高级` -> `环境变量` -> `新建`

> 具体的路径可能和下图不一致，请自行确认。

![env variable](img/react-native-android-sdk-environment-variable-windows.png)

> 你需要关闭现有的命令符提示窗口然后重新打开，这样新的环境变量才能生效。

</div><div markdown class="md-block linux windows android">

### 推荐安装的工具

</div><div markdown class="md-block linux android">

#### Watchman

[Watchman](https://facebook.github.io/watchman/docs/install.html)是由Facebook提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager可以快速捕捉文件的变化从而实现实时刷新）。

> 安装watchman还可以避免node的一个与文件监视有关的bug。

在终端中输入以下命令来编译并安装watchman:

```
git clone https://github.com/facebook/watchman.git
cd watchman
git checkout v4.5.0  # 这是本文发布时的最新版本
./autogen.sh
./configure
make
sudo make install
```

#### Flow

[Flow](http://www.flowtype.org)是一个静态的JS类型检查工具。译注：你在很多示例中看到的奇奇怪怪的冒号问号，以及方法参数中像类型一样的写法，都是属于这个flow工具的语法。这一语法并不属于ES标准，只是Facebook自家的代码规范。所以新手可以直接跳过（即不需要安装这一工具，也不建议去费力学习flow相关语法）。

在终端中输入以下命令来安装flow:

```
npm install -g flow-bin
```

</div>
<div markdown class="md-block mac windows linux android">

#### Gradle Daemon

开启[Gradle Daemon](https://docs.gradle.org/2.9/userguide/gradle_daemon.html)可以极大地提升java代码的增量编译速度。

</div>
<div markdown class="md-block mac linux android">

```
touch ~/.gradle/gradle.properties && echo "org.gradle.daemon=true" >> ~/.gradle/gradle.properties
```

</div>
<div markdown class="md-block windows android">

```
(if not exist "%USERPROFILE%/.gradle" mkdir "%USERPROFILE%/.gradle") && (echo org.gradle.daemon=true >> "%USERPROFILE%/.gradle/gradle.properties")
```

</div>
<div markdown class="md-block linux android">

#### Android模拟器加速器

在安装Android Studio时你可能会看到下面这样的提示：

![accelerator](img/react-native-android-studio-kvm-linux.png)

如果你的系统支持KVM，那就应该安装[Intel的Android模拟器加速器](https://software.intel.com/en-us/android/articles/speeding-up-the-android-emulator-on-intel-architecture#_Toc358213272)。

</div><div markdown class="md-block windows linux android">

#### 将Android SDK的Tools目录添加到`PATH`变量中

你可以把Android SDK的tools和platform-tools目录添加到`PATH`变量中，以便在终端中运行一些Android工具，例如`android avd`或是`adb logcat`等。

</div><div markdown class="md-block linux android">

在`~/.bashrc`或是`~/.bash_profile`文件中添加：

```
# 你的具体路径可能有所不同，请自行确认。
PATH="~/Android/Sdk/tools:~/Android/Sdk/platform-tools:${PATH}"
export PATH
```

</div><div markdown class="md-block windows android">

打开`控制面板` -> `系统和安全` -> `系统` -> `高级系统设置` ->
`高级` -> `环境变量` -> 选中`PATH` -> 双击进行编辑

> 注意你的具体路径可能和下图不同

![env variable](img/react-native-android-tools-environment-variable-windows.png)

</div><div markdown class="md-block windows linux android">

### 可选的安装项

#### Git

</div><div markdown class="md-block linux android">

[使用包管理器](https://git-scm.com/download/linux)来安装Git
(例如`sudo apt-get install git-all`).

</div><div markdown class="md-block windows android">

你可以使用Chocolatey来安装`git`:

```
choco install git
```

另外你也可以直接去下载[Git for Windows](https://git-for-windows.github.io/)。
在安装过程中注意勾选"Run Git from Windows Command Prompt"，这样才会把`git`命令添加到`PATH`环境变量中。

</div><div markdown class="md-block linux android">

#### Nuclide

[Nuclide](http://nuclide.io)（此链接需要科学上网）是由Facebook提供的基于atom的集成开发环境，可用于编写、[运行](http://nuclide.io/docs/platforms/react-native/#running-applications)和
[调试](http://nuclide.io/docs/platforms/react-native/#debugging)React Native应用。

点击这里阅读[Nuclide的入门文档](http://nuclide.io/docs/quick-start/getting-started/)。

译注：我们更推荐使用[WebStorm](https://www.jetbrains.com/webstorm/)或[Sublime Text](http://www.sublimetext.com/)来编写React Native应用。

</div><div markdown class="md-block linux windows android">

#### Genymotion

比起Android Studio自带的原装模拟器，Genymotion是一个性能更好的选择，但它只对个人用户免费。

1. 下载和安装[Genymotion](https://www.genymotion.com/download)（genymotion需要依赖VirtualBox虚拟机，下载选项中提供了包含VirtualBox和不包含的选项，请按需选择）。
2. 打开Genymotion。如果你还没有安装VirtualBox，则此时会提示你安装。
3. 创建一个新模拟器并启动。
4. 启动React Native应用后，可以按下F1来打开开发者菜单。

</div><div markdown class="md-block windows android">

#### Visual Studio Emulator for Android

[Visual Studio Emulator for Android](https://www.visualstudio.com/zh-cn/features/msft-android-emulator-vs.aspx#中国 (简体中文))是利用了Hyper-V技术进行硬件加速的免费android模拟器。也是Android Studio自带的原装模拟器之外的一个很好的选择。而且你并不需要安装Visual Studio。
在用于React Native开发前，需要先在注册表中进行一些修改：

1. 打开运行命令（按下Windows+R键）
2. 输入`regedit.exe`然后回车
3. 在注册表编辑器中找到`HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Android SDK Tools`条目
4. 右键点击`Android SDK Tools`，选择`新建 > 字符串值`
5. 名称设为`Path`
6. 双击`Path`，将其值设为你的Android SDK的路径。（例如`C:\Program Files\Android\sdk`）

</div>
<div markdown class="md-block mac ios android">

## 测试安装

</div><div markdown class="md-block mac ios">


**注意**：init命令默认会创建最新的版本，而目前最新的0.45及以上版本需要下载boost库编译。此库体积庞大，在国内即便翻墙也很难下载成功，导致很多人**无法正常运行iOS项目**，中文网在论坛中提供了这些库的[国内下载链接](http://bbs.reactnative.cn/topic/4301/)。如果你嫌麻烦，又没有对新版本的需求，那么可以暂时创建`0.44.3`的版本。

> 提示：你可以使用`--version`参数（注意是`两`个杠）创建指定版本的项目。例如`react-native init MyApp --version 0.44.3`。注意版本号必须精确到两个小数点。

```
react-native init AwesomeProject
cd AwesomeProject
react-native run-ios
```

> 提示：如果run-ios无法正常运行，请使用Xcode运行来查看具体错误（run-ios的报错没有任何具体信息）。

你也可以在[Nuclide](http://nuclide.io)中打开[`AwesomeProject`](http://nuclide.io/docs/quick-start/getting-started/#adding-a-project)文件夹
然后[运行](http://nuclide.io/docs/platforms/react-native/#command-line)，或是双击`ios/AwesomeProject.xcodeproj`文件然后在Xcode中点击`Run`按钮。

</div><div markdown class="md-block mac android">

```
react-native init AwesomeProject
cd AwesomeProject
react-native run-android
```

> 提示：你可以使用`--version`参数创建指定版本的项目。例如`react-native init MyApp --version 0.39.2`。注意版本号必须精确到两个小数点。
 
你也可以在[Nuclide](http://nuclide.io)中打开[`AwesomeProject`](http://nuclide.io/docs/quick-start/getting-started/#adding-a-project)文件夹然后[运行](http://nuclide.io/docs/platforms/react-native/#command-line)。

</div><div markdown class="md-block mac ios android">

### 修改项目

现在你已经成功运行了项目，我们可以开始尝试动手改一改了：

</div><div markdown class="md-block mac ios">

- 使用你喜欢的编辑器打开`index.ios.js`并随便改上几行。
- 在iOS Emulator中按下`⌘-R`就可以刷新APP并看到你的最新修改！

</div><div markdown class="md-block mac android">

- 使用你喜欢的文本编辑器打开`index.android.js`并随便改上几行
- 按两下R键，或是用Menu键（通常是F2，在Genymotion模拟器中是`⌘+M`）打开开发者菜单，然后选择 *Reload JS* 就可以看到你的最新修改。
- 在终端下运行`adb logcat *:S ReactNative:V ReactNativeJS:V`可以看到你的应用的日志。

</div><div markdown class="md-block mac ios android">

### 完成了！

恭喜！你已经成功运行并修改了你的第一个React Native应用。

![](img/react-native-congratulations.png)

</div><div markdown class="md-block windows linux android">

## 测试安装

```
react-native init AwesomeProject
cd AwesomeProject
react-native run-android
```

> 提示：你可以使用`--version`参数创建指定版本的项目。例如`react-native init MyApp --version 0.44.3`。注意版本号必须精确到两个小数点。

__Windows用户请注意，请不要在命令行默认的System32目录中init项目！会有各种权限限制导致不能运行！__
</div>
<div markdown class="md-block windows linux android">

### 修改项目

现在你已经成功运行了项目，我们可以开始尝试动手改一改了：

- 使用你喜欢的文本编辑器打开`index.android.js`并随便改上几行
- 按两下R键，或是用Menu键（通常是F2，在Genymotion模拟器中是`⌘+M`）打开开发者菜单，然后选择 *Reload JS* 就可以看到你的最新修改。
- 在终端下运行`adb logcat *:S ReactNative:V ReactNativeJS:V`可以看到你的应用的日志。

### 完成了！

恭喜！你已经成功运行并修改了你的第一个React Native应用。

![](img/react-native-congratulations.png)

</div><div markdown class="md-block mac ios android">

## 接下来

</div><div markdown class="md-block mac ios">

- 如果你想要在真机上运行应用，请参阅[在设备上运行](running-on-device-ios.html#content)。

</div><div markdown class="md-block mac android">

- 如果你想要在真机上运行应用，请参阅[在设备上运行](running-on-device-android.html#content)。

</div><div markdown class="md-block mac ios android">

- 如果你碰到了一些问题，请参阅[常见问题](http://bbs.reactnative.cn/topic/130)。


</div><div markdown class="md-block windows linux android">

## 接下来

- 如果你想要在真机上运行应用，请参阅[在设备上运行](running-on-device-android.html#content)。

- 如果你碰到了一些问题，请参阅[常见问题](http://bbs.reactnative.cn/topic/130)。

</div>
<script class="markdown-script">
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
          var devOS = null;
          var targetPlatform = null;
          // Could be more than one target os and dev platform, but just choose some sort of order
          // of priority here.

          // Dev OS
          if (parent.className.indexOf('mac') > -1) {
            devOS = 'mac';
          } else if (parent.className.indexOf('linux') > -1) {
            devOS = 'linux';
          } else if (parent.className.indexOf('windows') > -1) {
            devOS = 'windows';
          } else {
            break; // assume we don't have anything.
          }

          // Target Platform
          if (parent.className.indexOf('ios') > -1) {
            targetPlatform = 'ios';
          } else if (parent.className.indexOf('android') > -1) {
            targetPlatform = 'android';
          } else {
            break; // assume we don't have anything.
          }
          // We would have broken out if both targetPlatform and devOS hadn't been filled.
          display('os', devOS);
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
  var isWindows = navigator.platform === 'Win32';
  display('os', isMac ? 'mac' : (isWindows ? 'windows' : 'linux'));
  display('platform', isMac ? 'ios' : 'android');
}
</script>

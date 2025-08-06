---
id: running-on-device
title: 在设备上运行
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

在真机上仔细测试 app 后再发布给用户总是不会错的。本文档将指导你通过必须的步骤在设备上运行 React Native app，为生产做准备。

如果使用 Expo 沙盒环境来建立工程，可以通过 Expo App 扫描 QR 代码在设备上预览 app。为了在设备上编译和运行 app，需要“弹出”(eject)并参照[搭建开发环境](getting-started.md)文档搭建原生环境。

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

## 在 Android 设备上运行应用

> 下文所指的设备包括 Android 手机和模拟器。

#### 开发平台

<Tabs groupId="os" defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

[//]: # 'macOS, Android'

### 1. 开启 USB 调试

在默认情况下 Android 设备只能从应用市场来安装应用。你需要开启 USB 调试才能自由安装开发版本的 APP。

首先，确定[你已经打开设备的 USB 调试开关](https://www.baidu.com/s?wd=打开usb调试)。

### 2. 通过 USB 数据线连接设备

现在我们设置一个 Android 设备来运行我们的 React Native 项目，通过 USB 将你的设备插入开发机器以继续。

下面检查你的设备是否能正确连接到 ADB（Android Debug Bridge），使用`adb devices`命令：

```sh
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

在右边那列看到**device**说明你的设备已经被正确连接了。注意，你每次只应当**连接一个设备**。

> 译注：如果你连接了多个设备（包含模拟器在内），后续的一些操作可能会失败。拔掉不需要的设备，或者关掉模拟器，确保 adb devices 的输出只有一个是连接状态。

### 3. 运行应用

现在你可以运行下面的命令来在设备上安装并启动应用了。

```shell
$ npx react-native run-android
```

> 如果你收到"bridge configuration isn't available"错误，请参阅[使用adb reverse](running-on-device.md#android-50-及以上使用-adb-reverse-命令-1)。

> 提示：你还可以运行`npx react-native run-android --variant=release`来安装 release 版的应用。当然你需要[先配置好签名](signed-apk-android)，且此时无法再开启开发者菜单。注意在 debug 和 release 版本间来回切换安装时可能会报错签名不匹配，此时需要先卸载前一个版本再尝试安装。

<h2>从设备上访问开发服务器</h2>

在启用开发服务器（官方名称 metro，但我们更常称之为 Packager）的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。按照下面描述的任意一种方法来使你的设备可以访问到运行在电脑上的开发服务器。

> 译注：默认情况下模拟器可以自动探测宿主机 ip 并连接，只有 Android 5.0 以下版本的手机需要按下文说明来手动操作。但某些情形下可能也无法正常连接，请注意去[讨论区](https://github.com/reactnativecn/react-native-website/issues)查看是否有人遭遇同类型的问题（不同时期不同版本可能是不同的问题）。有些文章会提到`react-native bundle`命令，这个命令会把 js 文件打包内置到应用中，从而不需要连接 metro，但这`并没有解决问题`。我们在开发中必须使用到 metro，否则无法刷新代码。

### (Android 5.0 及以上)使用 adb reverse 命令

> 注意，这个选项只能在 5.0 以上版本(API 21+)的安卓设备上使用。

首先把你的设备通过 USB 数据线连接到电脑上，并开启 USB 调试（关于如何开启 USB 调试，参见上面的章节）。

1.  运行`adb reverse tcp:8081 tcp:8081`
2.  不需要更多配置，你就可以使用`Reload JS`和其它的开发选项了。

### (Android 5.0 以下)通过 Wi-Fi 连接你的本地开发服务器

你还可以通过 Wi-Fi 连接到开发服务器。你首先需要使用 USB 在你的设备上安装该应用程序，完成之后便可以按照这些说明进行无线调试。在继续之前，你需要知道开发机器的当前 IP 地址。

你可以在**System Preferences** → **Network**中找到 IP 地址。

<!-- alex ignore host -->

1.  首先确保你的电脑和手机设备在**同一个 Wi-Fi 环境**下。
2.  在设备上运行你的 React Native 应用。和打开其它 App 一样操作。
3.  你应该会看到一个“红屏”错误提示。这是正常的，下面的步骤会解决这个报错。
4.  摇晃设备，或者运行`adb shell input keyevent 82`，可以打开**开发者菜单**。
5.  点击`Dev Settings` -> `Debug server host for device`。
6.  输入你电脑的 IP 地址和端口号（譬如 10.0.1.1:8081）。**在 Mac 上**，你可以在系统设置/网络里找查询你的 IP 地址。**在 Windows 上**，打开命令提示符并输入`ipconfig`来查询你的 IP 地址。**在 Linux 上**你可以在终端中输入`ifconfig`来查询你的 IP 地址。
7.  回到**开发者菜单**然后选择`Reload JS`。

你现在可以从[开发者菜单](debugging.md#accessing-the-in-app-developer-menu)启用实时重新加载。只要你的 JavaScript 代码发生更改，应用就会重新加载。

## 为生产编译 app

你已经使用 React Native 构建了一个很棒的应用程序，现在你渴望在 Play Store 中发布它。该过程与任何其他原生 Android 应用程序相同，但需要考虑一些其他注意事项。按照[生成签名 APK](signed-apk-android.md)的指南了解更多信息。

</TabItem>
<TabItem value="windows">

[//]: # 'Windows, Android'

### 1. 开启 USB 调试

在默认情况下 Android 设备只能从应用市场来安装应用。你需要开启 USB 调试才能自由安装开发版本的 APP。

首先，确定[你已经打开设备的 USB 调试开关](https://www.baidu.com/s?wd=打开usb调试)。

### 2. 通过 USB 数据线连接设备

现在我们设置一个 Android 设备来运行我们的 React Native 项目，通过 USB 将你的设备插入开发机器以继续。

下面检查你的设备是否能正确连接到 ADB（Android Debug Bridge），使用`adb devices`命令：

```sh
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

在右边那列看到**device**说明你的设备已经被正确连接了。注意，你每次只应当**连接一个设备**。

> 译注：如果你连接了多个设备（包含模拟器在内），后续的一些操作可能会失败。拔掉不需要的设备，或者关掉模拟器，确保 adb devices 的输出只有一个是连接状态。

### 3. 运行应用

现在你可以运行下面的命令来在设备上安装并启动应用了。

```shell
$ npx react-native run-android
```

> 如果你收到"bridge configuration isn't available"错误，请参阅[使用adb reverse](running-on-device.md#android-50-及以上使用-adb-reverse-命令-1)。

> 提示：你还可以运行`npx react-native run-android --variant=release`来安装 release 版的应用。当然你需要[先配置好签名](signed-apk-android)，且此时无法再开启开发者菜单。注意在 debug 和 release 版本间来回切换安装时可能会报错签名不匹配，此时需要先卸载前一个版本再尝试安装。

<h2>从设备上访问开发服务器</h2>

在启用开发服务器（官方名称 metro，但我们更常称之为 Packager）的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。按照下面描述的任意一种方法来使你的设备可以访问到运行在电脑上的开发服务器。

> 译注：默认情况下模拟器可以自动探测宿主机 ip 并连接，只有 Android 5.0 以下版本的手机需要按下文说明来手动操作。但某些情形下可能也无法正常连接，请注意去[讨论区](https://github.com/reactnativecn/react-native-website/issues)查看是否有人遭遇同类型的问题（不同时期不同版本可能是不同的问题）。有些文章会提到`react-native bundle`命令，这个命令会把 js 文件打包内置到应用中，从而不需要连接 metro，但这`并没有解决问题`。我们在开发中必须使用到 metro，否则无法刷新代码。

### (Android 5.0 及以上)使用 adb reverse 命令

> 注意，这个选项只能在 5.0 以上版本(API 21+)的安卓设备上使用。

首先把你的设备通过 USB 数据线连接到电脑上，并开启 USB 调试（关于如何开启 USB 调试，参见上面的章节）。

1.  运行`adb reverse tcp:8081 tcp:8081`
2.  不需要更多配置，你就可以使用`Reload JS`和其它的开发选项了。

### (Android 5.0 以下)通过 Wi-Fi 连接你的本地开发服务器

你还可以通过 Wi-Fi 连接到开发服务器。你首先需要使用 USB 在你的设备上安装该应用程序，完成之后便可以按照这些说明进行无线调试。在继续之前，你需要知道开发机器的当前 IP 地址。

你可以在**System Preferences** → **Network**中找到 IP 地址。

<!-- alex ignore host -->

1.  首先确保你的电脑和手机设备在**同一个 Wi-Fi 环境**下。
2.  在设备上运行你的 React Native 应用。和打开其它 App 一样操作。
3.  你应该会看到一个“红屏”错误提示。这是正常的，下面的步骤会解决这个报错。
4.  摇晃设备，或者运行`adb shell input keyevent 82`，可以打开**开发者菜单**。
5.  点击`Dev Settings` -> `Debug server host for device`。
6.  输入你电脑的 IP 地址和端口号（譬如 10.0.1.1:8081）。**在 Mac 上**，你可以在系统设置/网络里找查询你的 IP 地址。**在 Windows 上**，打开命令提示符并输入`ipconfig`来查询你的 IP 地址。**在 Linux 上**你可以在终端中输入`ifconfig`来查询你的 IP 地址。
7.  回到**开发者菜单**然后选择`Reload JS`。

你现在可以从[开发者菜单](debugging.md#accessing-the-in-app-developer-menu)启用实时重新加载。只要你的 JavaScript 代码发生更改，应用就会重新加载。

## 为生产编译 app

你已经使用 React Native 构建了一个很棒的应用程序，现在你渴望在 Play Store 中发布它。该过程与任何其他原生 Android 应用程序相同，但需要考虑一些其他注意事项。按照[生成签名 APK](signed-apk-android.md)的指南了解更多信息。

</TabItem>
<TabItem value="linux">

[//]: # 'Linux, Android'

### 1. 开启 USB 调试

在默认情况下 Android 设备只能从应用市场来安装应用。你需要开启 USB 调试才能自由安装开发版本的 APP。

首先，确定[你已经打开设备的 USB 调试开关](https://www.baidu.com/s?wd=打开usb调试)。

### 2. 通过 USB 数据线连接设备

现在我们设置一个 Android 设备来运行我们的 React Native 项目，通过 USB 将你的设备插入开发机器以继续。

下面检查你的设备是否能正确连接到 ADB（Android Debug Bridge），使用`adb devices`命令：

```sh
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

在右边那列看到**device**说明你的设备已经被正确连接了。注意，你每次只应当**连接一个设备**。

> 译注：如果你连接了多个设备（包含模拟器在内），后续的一些操作可能会失败。拔掉不需要的设备，或者关掉模拟器，确保 adb devices 的输出只有一个是连接状态。

### 3. 运行应用

现在你可以运行下面的命令来在设备上安装并启动应用了。

```shell
$ npx react-native run-android
```

> 如果你收到"bridge configuration isn't available"错误，请参阅[使用adb reverse](running-on-device.md#android-50-及以上使用-adb-reverse-命令-1)。

> 提示：你还可以运行`npx react-native run-android --variant=release`来安装 release 版的应用。当然你需要[先配置好签名](signed-apk-android)，且此时无法再开启开发者菜单。注意在 debug 和 release 版本间来回切换安装时可能会报错签名不匹配，此时需要先卸载前一个版本再尝试安装。

<h2>从设备上访问开发服务器</h2>

在启用开发服务器（官方名称 metro，但我们更常称之为 Packager）的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。按照下面描述的任意一种方法来使你的设备可以访问到运行在电脑上的开发服务器。

> 译注：默认情况下模拟器可以自动探测宿主机 ip 并连接，只有 Android 5.0 以下版本的手机需要按下文说明来手动操作。但某些情形下可能也无法正常连接，请注意去[讨论区](https://github.com/reactnativecn/react-native-website/issues)查看是否有人遭遇同类型的问题（不同时期不同版本可能是不同的问题）。有些文章会提到`react-native bundle`命令，这个命令会把 js 文件打包内置到应用中，从而不需要连接 metro，但这`并没有解决问题`。我们在开发中必须使用到 metro，否则无法刷新代码。

### (Android 5.0 及以上)使用 adb reverse 命令

> 注意，这个选项只能在 5.0 以上版本(API 21+)的安卓设备上使用。

首先把你的设备通过 USB 数据线连接到电脑上，并开启 USB 调试（关于如何开启 USB 调试，参见上面的章节）。

1.  运行`adb reverse tcp:8081 tcp:8081`
2.  不需要更多配置，你就可以使用`Reload JS`和其它的开发选项了。

### (Android 5.0 以下)通过 Wi-Fi 连接你的本地开发服务器

你还可以通过 Wi-Fi 连接到开发服务器。你首先需要使用 USB 在你的设备上安装该应用程序，完成之后便可以按照这些说明进行无线调试。在继续之前，你需要知道开发机器的当前 IP 地址。

你可以在**System Preferences** → **Network**中找到 IP 地址。

<!-- alex ignore host -->

1.  首先确保你的电脑和手机设备在**同一个 Wi-Fi 环境**下。
2.  在设备上运行你的 React Native 应用。和打开其它 App 一样操作。
3.  你应该会看到一个“红屏”错误提示。这是正常的，下面的步骤会解决这个报错。
4.  摇晃设备，或者运行`adb shell input keyevent 82`，可以打开**开发者菜单**。
5.  点击`Dev Settings` -> `Debug server host for device`。
6.  输入你电脑的 IP 地址和端口号（譬如 10.0.1.1:8081）。**在 Mac 上**，你可以在系统设置/网络里找查询你的 IP 地址。**在 Windows 上**，打开命令提示符并输入`ipconfig`来查询你的 IP 地址。**在 Linux 上**你可以在终端中输入`ifconfig`来查询你的 IP 地址。
7.  回到**开发者菜单**然后选择`Reload JS`。

你现在可以从[开发者菜单](debugging.md#accessing-the-in-app-developer-menu)启用实时重新加载。只要你的 JavaScript 代码发生更改，应用就会重新加载。

## 为生产编译 app

你已经使用 React Native 构建了一个很棒的应用程序，现在你渴望在 Play Store 中发布它。该过程与任何其他原生 Android 应用程序相同，但需要考虑一些其他注意事项。按照[生成签名 APK](signed-apk-android.md)的指南了解更多信息。

</TabItem>
</Tabs>

</TabItem>
<TabItem value="ios">

## 在 iOS 设备上运行应用

#### 开发平台

<Tabs groupId="os" defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

[//]: # 'macOS, iOS'

### 1. 通过 USB 数据线连接设备

使用 USB 闪电数据线连接 iOS 设备到 Mac。导航到工程的`ios`文件夹，然后用 Xcode 打开`.xcworkspace`文件，如果是 0.60 以前的版本则打开`.xcodeproj`文件。

如果这是第一次在 iOS 设备上运行 app，需要注册开发设备。从 Xcode 菜单栏打开**Product**菜单，然后前往**Destination**。从列表中查找并选择设备。Xcode 将注册为开发设备。

### 2. 配置代码签名

如果没有[Apple developer account](https://developer.apple.com/)，先注册。

在 Xcode Project 导航中选择 project，然后选择 main target（它应该和 project 共享同样的名字）。查找"General"标签。前往"Signing"并确保在"Team"下拉下选择了开发者账号或团队。tests target（以 Tests 结尾，在 main target 下面）也需要重复同样的操作。

![](assets/RunningOnDeviceCodeSigning.png)

### 3. 编译并运行应用

如果一切设置正确，设备会在 Xcode toolbar 中被列为 build target，也会出现在设备面板里(`⇧⌘2`)。现在可以按下 **Build and run** 按钮(`⌘R`)或从**Product**菜单中选择**Run**。app 会立刻启动在设备上。

![](assets/RunningOnDeviceReady.png)

> If you run into any issues, please take a look at Apple's [Launching Your App on a Device](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4) docs.

<h2>从设备上访问开发服务器</h2>

在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。只需要在和电脑同样的 Wi-Fi 网络。摇晃设备打开[Developer menu](debugging.md#accessing-the-in-app-developer-menu)，然后 enable Live Reload。当 JavaScript 代码改变时 app 会重载。

![](assets/DeveloperMenu.png)

### 常见问题

> If you have any issues, ensure that your Mac and device are on the same network and can reach each other. Many open wireless networks with captive portals are configured to prevent devices from reaching other devices on the network. You may use your device's Personal Hotspot feature in this case.

当尝试连接到开发服务器时，可能得到一个[红屏报错](debugging.md#in-app-errors-and-warnings)说：

> Connection to `http://localhost:8081/debugger-proxy?role=client` timed out. Are you running node proxy? If you are running on the device, check if you have the right IP address in `RCTWebSocketExecutor.m`.

解决这个问题检查以下几点。

#### 1. Wi-Fi 网络

确保笔记本电脑和电话在**同一个**Wi-Fi 网络。

#### 2. IP 地址

确保编译脚本正确检测到机器的 IP 地址(e.g. 10.0.1.123)。

![](assets/XcodeBuildIP.png)

打开**Report navigator**标签，选择最近的**Build**然后搜索`IP=`。搜索到的 IP 地址字符串应该和你电脑的 IP 地址一致。

## 为生产编译 app

已经用 React Native 编译了一个伟大的 app，现在渴望在 App Store 发布。Follow the guide for [publishing to the Apple App Store](publishing-to-app-store.md) to learn more.

</TabItem>
<TabItem value="windows">

[//]: # 'Windows, iOS'

> A Mac is required in order to build your app for iOS devices. Alternatively, you can refer to our [environment setup guide](environment-setup) to learn how to build your app using Expo CLI, which will allow you to run your app using the Expo client app.

</TabItem>
<TabItem value="linux">

[//]: # 'Linux, iOS'

> A Mac is required in order to build your app for iOS devices. Alternatively, you can refer to our [environment setup guide](environment-setup) to learn how to build your app using Expo CLI, which will allow you to run your app using the Expo client app.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

---
id: running-on-device
title: 在设备上运行
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

在真机上仔细测试应用后再发布给用户总是不会错的。本文档将指导你通过必须的步骤在设备上运行 React Native 应用，为生产做准备。

:::tip
如果你使用 `create-expo-app` 来创建项目，可以通过 Expo Go 扫描运行 `npm start` 时显示的二维码来在设备上预览应用。更多信息请参阅 Expo 的[在设备上运行项目](https://docs.expo.dev/get-started/expo-go/)指南。
:::

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

## 在 Android 设备上运行应用

#### 开发平台

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

[//]: # 'macOS, Android'

### 1. 开启 USB 调试

在默认情况下 Android 设备只能从应用市场来安装应用。你需要开启 USB 调试才能自由安装开发版本的 APP。

要开启 USB 调试，首先需要在 **设置** → **关于手机** → **软件信息** 中连续点击底部的`版本号`七次来启用"开发者选项"菜单。然后回到 **设置** → **开发者选项** 中开启"USB 调试"。

### 2. 通过 USB 数据线连接设备

现在我们设置一个 Android 设备来运行我们的 React Native 项目，通过 USB 将你的设备插入开发机器以继续。

下面检查你的设备是否能正确连接到 ADB（Android Debug Bridge），使用`adb devices`命令：

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

在右边那列看到 `device` 说明你的设备已经被正确连接了。注意，你每次只应当**连接一个设备**。

:::note
如果你在列表中看到 `unauthorized`，需要运行 `adb reverse tcp:8081 tcp:8081` 并在设备上允许 USB 调试。
:::

### 3. 运行应用

在项目根目录下运行以下命令来在设备上安装并启动应用：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

:::note
如果你收到"bridge configuration isn't available"错误，请参阅[使用 adb reverse](running-on-device.md#method-1-using-adb-reverse-recommended)。
:::

:::tip
你还可以使用 `React Native CLI` 来生成和运行 `release` 版本（例如在项目根目录下：`yarn android --mode release`）。
:::

<h2>从设备上访问开发服务器</h2>

在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。有多种方式可以实现，取决于你是否有 USB 数据线或 Wi-Fi 网络。

### Method 1: Using adb reverse (recommended)

如果你的设备运行 Android 5.0（Lollipop）或更新版本，且已开启 USB 调试并通过 USB 连接到开发机器，你可以使用此方法。

在命令行中运行：

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

要查找设备名称，运行以下 adb 命令：

```shell
$ adb devices
```

现在你可以从[开发者菜单](debugging.md#opening-the-dev-menu)启用快速刷新（Fast Refresh）。每当你的 JavaScript 代码发生更改，应用就会重新加载。

### Method 2: Connect via Wi-Fi

你还可以通过 Wi-Fi 连接到开发服务器。你首先需要使用 USB 在设备上安装应用，完成之后便可以按照以下说明进行无线调试。在继续之前，你需要知道开发机器的当前 IP 地址。

你可以在 **系统设置（或系统偏好设置）** → **网络** 中找到 IP 地址。

1. 确保你的电脑和手机在**同一个** Wi-Fi 网络中。
2. 在设备上打开 React Native 应用。
3. 你会看到一个[红屏错误提示](debugging.md#logbox)。这是正常的，下面的步骤会解决。
4. 打开应用内的[开发者菜单](debugging.md#opening-the-dev-menu)。
5. 前往 **Dev Settings** → **Debug server host & port for device**。
6. 输入你电脑的 IP 地址和端口号（例如 `10.0.1.1:8081`）。
7. 回到**开发者菜单**然后选择 **Reload JS**。

现在你可以从[开发者菜单](debugging.md#opening-the-dev-menu)启用快速刷新。每当你的 JavaScript 代码发生更改，应用就会重新加载。

## 为生产编译应用

你已经使用 React Native 构建了一个很棒的应用，现在你渴望在 Play Store 中发布它。该过程与任何其他原生 Android 应用相同，但需要考虑一些额外的注意事项。按照[生成签名 APK](signed-apk-android.md)的指南了解更多信息。

</TabItem>
<TabItem value="windows">

[//]: # 'Windows, Android'

### 1. 开启 USB 调试

在默认情况下 Android 设备只能从应用市场来安装应用。你需要开启 USB 调试才能自由安装开发版本的 APP。

要开启 USB 调试，首先需要在 **设置** → **关于手机** → **软件信息** 中连续点击底部的`版本号`七次来启用"开发者选项"菜单。然后回到 **设置** → **开发者选项** 中开启"USB 调试"。

### 2. 通过 USB 数据线连接设备

现在我们设置一个 Android 设备来运行我们的 React Native 项目，通过 USB 将你的设备插入开发机器以继续。

下面检查你的设备是否能正确连接到 ADB（Android Debug Bridge），使用`adb devices`命令：

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

在右边那列看到 `device` 说明你的设备已经被正确连接了。注意，你每次只应当**连接一个设备**。

### 3. 运行应用

在项目根目录下运行以下命令来在设备上安装并启动应用：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

:::tip
你还可以使用 `React Native CLI` 来生成和运行 `release` 版本（例如在项目根目录下：`yarn android --mode release`）。
:::

<h2>从设备上访问开发服务器</h2>

在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。有多种方式可以实现，取决于你是否有 USB 数据线或 Wi-Fi 网络。

### Method 1: Using adb reverse (recommended)

如果你的设备运行 Android 5.0（Lollipop）或更新版本，且已开启 USB 调试并通过 USB 连接到开发机器，你可以使用此方法。

在命令行中运行：

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

要查找设备名称，运行以下 adb 命令：

```shell
$ adb devices
```

现在你可以从[开发者菜单](debugging.md#opening-the-dev-menu)启用快速刷新。每当你的 JavaScript 代码发生更改，应用就会重新加载。

### Method 2: Connect via Wi-Fi

你还可以通过 Wi-Fi 连接到开发服务器。你首先需要使用 USB 在设备上安装应用，完成之后便可以按照以下说明进行无线调试。在继续之前，你需要知道开发机器的当前 IP 地址。

打开命令提示符并输入 `ipconfig` 来查找你电脑的 IP 地址（[更多信息](https://windows.microsoft.com/en-us/windows/using-command-line-tools-networking-information)）。

1. 确保你的电脑和手机在**同一个** Wi-Fi 网络中。
2. 在设备上打开 React Native 应用。
3. 你会看到一个[红屏错误提示](debugging.md#logbox)。这是正常的，下面的步骤会解决。
4. 打开应用内的[开发者菜单](debugging.md#opening-the-dev-menu)。
5. 前往 **Dev Settings** → **Debug server host & port for device**。
6. 输入你电脑的 IP 地址和端口号（例如 `10.0.1.1:8081`）。
7. 回到**开发者菜单**然后选择 **Reload JS**。

现在你可以从[开发者菜单](debugging.md#opening-the-dev-menu)启用快速刷新。每当你的 JavaScript 代码发生更改，应用就会重新加载。

## 为生产编译应用

你已经使用 React Native 构建了一个很棒的应用，现在你渴望在 Play Store 中发布它。该过程与任何其他原生 Android 应用相同，但需要考虑一些额外的注意事项。按照[生成签名 APK](signed-apk-android.md)的指南了解更多信息。

</TabItem>
<TabItem value="linux">

[//]: # 'Linux, Android'

### 1. 开启 USB 调试

在默认情况下 Android 设备只能从应用市场来安装应用。你需要开启 USB 调试才能自由安装开发版本的 APP。

要开启 USB 调试，首先需要在 **设置** → **关于手机** → **软件信息** 中连续点击底部的`版本号`七次来启用"开发者选项"菜单。然后回到 **设置** → **开发者选项** 中开启"USB 调试"。

### 2. 通过 USB 数据线连接设备

现在我们设置一个 Android 设备来运行我们的 React Native 项目，通过 USB 将你的设备插入开发机器以继续。

接下来，使用 `lsusb` 检查制造商代码（在 Mac 上需要先[安装 lsusb](https://github.com/jlhonora/lsusb)）。`lsusb` 的输出类似这样：

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 22b8:2e76 Motorola PCS
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

这些行代表了当前连接到你电脑的 USB 设备。

你需要找到代表你手机的那一行。如果你不确定，可以先拔掉手机再运行一次命令：

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

你会看到拔掉手机后，包含手机型号的那一行（本例中的"Motorola PCS"）从列表中消失了。

`Bus 001 Device 003: ID 22b8:2e76 Motorola PCS`

从上面这行中，你需要的是设备 ID 的前四位数字：

`22b8:2e76`

本例中是 `22b8`，这是 Motorola 的标识符。

你需要将此标识符输入到 udev 规则中：

```shell
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

请将 `22b8` 替换为你上面获得的标识符。

现在检查你的设备是否能正确连接到 ADB（Android Debug Bridge），使用`adb devices`命令：

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

在右边那列看到 `device` 说明你的设备已经被正确连接了。注意，你每次只应当**连接一个设备**。

### 3. 运行应用

在项目根目录下运行以下命令来在设备上安装并启动应用：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

:::note
如果你收到"bridge configuration isn't available"错误，请参阅[使用 adb reverse](running-on-device.md#method-1-using-adb-reverse-recommended).
:::

:::tip
你还可以使用 `React Native CLI` 来生成和运行 `release` 版本（例如在项目根目录下：`yarn android --mode release`）。
:::

<h2>从设备上访问开发服务器</h2>

在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。有多种方式可以实现，取决于你是否有 USB 数据线或 Wi-Fi 网络。

### Method 1: Using adb reverse (recommended)

如果你的设备运行 Android 5.0（Lollipop）或更新版本，且已开启 USB 调试并通过 USB 连接到开发机器，你可以使用此方法。

在命令行中运行：

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

要查找设备名称，运行以下 adb 命令：

```shell
$ adb devices
```

现在你可以从[开发者菜单](debugging.md#opening-the-dev-menu)启用快速刷新。每当你的 JavaScript 代码发生更改，应用就会重新加载。

### Method 2: Connect via Wi-Fi

你还可以通过 Wi-Fi 连接到开发服务器。你首先需要使用 USB 在设备上安装应用，完成之后便可以按照以下说明进行无线调试。在继续之前，你需要知道开发机器的当前 IP 地址。

打开终端并输入 `/sbin/ifconfig` 来查找你电脑的 IP 地址。

1. 确保你的电脑和手机在**同一个** Wi-Fi 网络中。
2. 在设备上打开 React Native 应用。
3. 你会看到一个[红屏错误提示](debugging.md#logbox)。这是正常的，下面的步骤会解决。
4. 打开应用内的[开发者菜单](debugging.md#opening-the-dev-menu)。
5. 前往 **Dev Settings** → **Debug server host & port for device**。
6. 输入你电脑的 IP 地址和端口号（例如 `10.0.1.1:8081`）。
7. 回到**开发者菜单**然后选择 **Reload JS**。

现在你可以从[开发者菜单](debugging.md#opening-the-dev-menu)启用快速刷新。每当你的 JavaScript 代码发生更改，应用就会重新加载。

## 为生产编译应用

你已经使用 React Native 构建了一个很棒的应用，现在你渴望在 Play Store 中发布它。该过程与任何其他原生 Android 应用相同，但需要考虑一些额外的注意事项。按照[生成签名 APK](signed-apk-android.md)的指南了解更多信息。

</TabItem>
</Tabs>

</TabItem>
<TabItem value="ios">

## 在 iOS 设备上运行应用

#### 开发平台

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

[//]: # 'macOS, iOS'

### 1. 通过 USB 数据线连接设备

使用 USB 转 Lightning 或 USB-C 数据线将 iOS 设备连接到 Mac。导航到工程的`ios`文件夹，然后用 Xcode 打开`.xcodeproj`文件，如果使用了 CocoaPods 则打开`.xcworkspace`文件。

如果这是第一次在 iOS 设备上运行应用，你可能需要注册设备用于开发。从 Xcode 菜单栏打开 **Product** 菜单，然后前往 **Destination**。从列表中查找并选择你的设备。Xcode 将注册你的设备用于开发。

### 2. 配置代码签名

如果还没有 [Apple 开发者账号](https://developer.apple.com/)，先注册一个。

在 Xcode Project 导航中选择你的 project，然后选择 main target（它应该和 project 同名）。查找"General"标签，前往"Signing"并确保在"Team"下拉菜单下选择了你的 Apple 开发者账号或团队。对 tests target（名称以 Tests 结尾，在 main target 下面）也**重复**同样的操作。

![](/docs/assets/RunningOnDeviceCodeSigning.png)

### 3. 编译并运行应用

如果一切设置正确，你的设备将出现在 Xcode 工具栏中作为构建目标，也会出现在设备面板（<kbd>Shift ⇧</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>2</kbd>）中。现在可以按下 **Build and run** 按钮（<kbd>Cmd ⌘</kbd> + <kbd>R</kbd>）或从 **Product** 菜单中选择 **Run**。应用将很快在你的设备上启动。

![](/docs/assets/RunningOnDeviceReady.png)

:::note
如果你遇到任何问题，请查看 Apple 的[在设备上启动应用](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4)文档。
:::

<h2>从设备上访问开发服务器</h2>

你还可以利用开发服务器在设备上快速迭代。只需要确保在和电脑同一个 Wi-Fi 网络中即可。摇晃设备打开[开发者菜单](debugging.md#opening-the-dev-menu)，然后启用快速刷新。每当你的 JavaScript 代码发生更改，应用就会重新加载。

![](/docs/assets/debugging-dev-menu-083.jpg)

### 常见问题

:::tip
如果你遇到任何问题，请确保你的 Mac 和设备在同一个网络中并且可以互相访问。许多使用强制门户的开放无线网络会阻止设备访问网络上的其他设备。此时你可以使用设备的个人热点功能。你也可以通过 USB 将 Mac 的互联网（Wi-Fi/以太网）连接共享给设备，然后通过此隧道连接到 bundler 以获得更高的传输速度。
:::

尝试连接到开发服务器时，你可能会看到一个[红屏错误](debugging.md#logbox)：

:::note
Connection to `http://localhost:8081/debugger-proxy?role=client` timed out. Are you running node proxy? If you are running on the device, check if you have the right IP address in `RCTWebSocketExecutor.m`.
:::

要解决此问题，请检查以下几点。

#### 1. Wi-Fi 网络

确保你的电脑和手机在**同一个** Wi-Fi 网络中。

#### 2. IP 地址

确保构建脚本正确检测到了你电脑的 IP 地址（例如 `10.0.1.123`）。

![](/docs/assets/XcodeBuildIP.png)

打开 **Report navigator** 标签，选择最近的 **Build** 然后搜索 `IP=` 后跟 IP 地址。嵌入到应用中的 IP 地址应该与你电脑的 IP 地址一致。

## 为生产编译应用

你已经使用 React Native 构建了一个很棒的应用，现在你渴望在 App Store 中发布它。该过程与任何其他原生 iOS 应用相同，但需要考虑一些额外的注意事项。按照[发布到 Apple App Store](publishing-to-app-store.md)的指南了解更多信息。

</TabItem>
<TabItem value="windows">

[//]: # 'Windows, iOS'

:::info
构建 iOS 应用需要一台 Mac。或者你可以参考我们的[环境搭建指南](environment-setup)，了解如何使用 Expo CLI 构建应用，这将允许你使用 Expo 客户端应用来运行你的应用。
:::

</TabItem>
<TabItem value="linux">

[//]: # 'Linux, iOS'

:::info
构建 iOS 应用需要一台 Mac。或者你可以参考我们的[环境搭建指南](environment-setup)，了解如何使用 Expo CLI 构建应用，这将允许你使用 Expo 客户端应用来运行你的应用。
:::

</TabItem>
</Tabs>

</TabItem>
</Tabs>

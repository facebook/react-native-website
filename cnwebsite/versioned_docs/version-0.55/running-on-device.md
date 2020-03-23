---
id: version-0.55-running-on-device
title: 在设备上运行
original_id: running-on-device
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)


It's always a good idea to test your app on an actual device before releasing it to your users. This document will guide you through the necessary steps to run your React Native app on a device and to get it ready for production.

If you used Create React Native App to set up your project, you can preview your app on a device by scanning the QR code with the Expo app. In order to build and run your app on a device, you will need to eject and install the native code dependencies from the [Getting Started guide](getting-started.md).

<div class="toggler">

  <ul role="tablist" >
    <li id="ios" class="button-ios" aria-selected="false" role="tab" tabindex="0" aria-controls="iostab" onclick="displayTab('platform', 'ios')">
      iOS
    </li>
    <li id="android" class="button-android" aria-selected="false" role="tab" tabindex="-1" aria-controls="androidtab" onclick="displayTab('platform', 'android')">
      Android
    </li>
  </ul>
</div>

<block class="linux windows mac ios" />

## 在 iOS 设备上运行应用

<block class="linux windows mac android" />

## 在 Android 设备上运行应用

<block class="linux windows mac ios android" />

<div class="toggler">
<span>开发平台：</span>
<a href="javascript:void(0);" class="button-mac" onclick="displayTab('os', 'mac')">macOS</a>
<a href="javascript:void(0);" class="button-linux" onclick="displayTab('os', 'linux')">Linux</a>
<a href="javascript:void(0);" class="button-windows" onclick="displayTab('os', 'windows')">Windows</a>
</div>

<block class="linux windows ios" />

A Mac is required in order to build your app for iOS devices. Alternatively, you can refer to the [Quick Start instructions](getting-started.md) to learn how to build your app using Create React Native App, which will allow you to run your app using the Expo client app.

<block class="mac ios" />

### 1. Plug in your device via USB

Connect your iOS device to your Mac using a USB to Lightning cable. Navigate to the `ios` folder in your project, then open the `.xcodeproj` file within it using Xcode.

If this is your first time running an app on your iOS device, you may need to register your device for development. Open the **Product** menu from Xcode's menubar, then go to **Destination**. Look for and select your device from the list. Xcode will then register your device for development.

### 2. Configure code signing

Register for an [Apple developer account](https://developer.apple.com/) if you don't have one yet.

Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown.

![](assets/RunningOnDeviceCodeSigning.png)

Repeat this step for the Tests target in your project.

### 3. Build and Run your app

If everything is set up correctly, your device will be listed as the build target in the Xcode toolbar, and it will also appear in the Devices pane (`⇧⌘2`). You can now press the **Build and run** button (`⌘R`) or select **Run** from the **Product** menu. Your app will launch on your device shortly.

![](assets/RunningOnDeviceReady.png)

> If you run into any issues, please take a look at Apple's [Launching Your App on a Device](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4) docs.

<block class="mac windows linux android" />

### 1. 开启 USB 调试

Most Android devices can only install and run apps downloaded from Google Play, by default. 你需要开启 USB 调试才能在你的设备上安装你的开发版本的 APP。

首先，确定[你已经打开设备的 USB 调试开关](https://www.baidu.com/s?wd=打开usb调试)。

### 2. 通过 USB 数据线连接你的设备

Let's now set up an Android device to run our React Native projects. Go ahead and plug in your device via USB to your development machine.

<block class="linux android" />

然后使用`lsusb`来查看制造商代码（在 mac 上则必须先[安装 lsusb](https://github.com/jlhonora/lsusb)）。这一命令的运行结果看起来是这样的：

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

以上这些行代码代表了目前连接在你电脑上的 USB 设备。

那么如何找到代表你的手机的那一行呢？此时试着拔掉你的手机，再运行这一命令：

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

可以看到在拔掉手机之后，对应的那一行就不见了（上面这个例子里是"Motorola PCS"）。那就是我们要找的。

`Bus 001 Device 003: ID 22b8:2e76 Motorola PCS`

上面这一行里，我们需要的是设备 ID 中的前四个字符：

`22b8:2e76`

也就是`22b8`—— 对应的就是 Motorola。

你需要把这个写入 udev rule 才能正常使用：

```sh
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

记得把上面的`22b8`替换为你的设备的制造商代码。

<block class="mac windows linux android" />

下面检查你的设备是否能正确连接到 ADB（Android Debug Bridge），使用`adb devices`命令：

```
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

在右边那列看到**device**说明你的设备已经被正确连接了。注意，你每次只应当**连接一个设备**。

> 译注：如果你连接了多个设备（包含模拟器在内），后续的一些操作可能会失败。拔掉不需要的设备，或者关掉模拟器，确保 adb devices 的输出只有一个是连接状态。

### 3. 运行应用

现在你可以运行`react-native run-android`来在设备上安装并启动应用了。

> If you get a "bridge configuration isn't available" error, see [Using adb reverse](running-on-device.md#method-1-using-adb-reverse-recommended).

> 提示
>
> 你还可以运行`react-native run-android --variant=release`来安装 release 版的应用。当然你需要[先配置好签名](signed-apk-android.html)，且此时无法再开启开发者菜单。注意在 debug 和 release 版本间来回切换安装时可能会报错签名不匹配，此时需要先卸载前一个版本再尝试安装。

<block class="mac windows linux android ios" />

<block class="mac ios" />

## 从设备上访问开发服务器

在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。You only have to be on the same Wi-Fi network as your computer. Shake your device to open the [Developer menu](debugging.md#accessing-the-in-app-developer-menu), then enable Live Reload. Your app will reload whenever your JavaScript code has changed.

![](assets/DeveloperMenu.png)

### Troubleshooting

> If you have any issues, ensure that your Mac and device are on the same network and can reach each other. Many open wireless networks with captive portals are configured to prevent devices from reaching other devices on the network. You may use your device's Personal Hotspot feature in this case.

When trying to connect to the development server you might get a [red screen with an error](debugging.md#in-app-errors-and-warnings) saying:

> Connection to [http://localhost:8081/debugger-proxy?role=client]() timed out. Are you running node proxy? If you are running on the device, check if you have the right IP address in `RCTWebSocketExecutor.m`.

To solve this issue check the following points.

#### 1. Wi-Fi network.

Make sure your laptop and your phone are on the **same** Wi-Fi network.

#### 2. IP address

Make sure that the build script detected the IP address of your machine correctly (e.g. 10.0.1.123).

![](assets/XcodeBuildIP.png)

Open the **Report navigator** tab, select the last **Build** and search for `xip.io`. The IP address which gets embedded in the app should match your machines IP address plus the domain `.xip.io` (e.g. 10.0.1.123.xip.io)

#### 3. Network/router configuration

React Native uses the wildcard DNS service **xip.io** to address your device, as Apple ATS prohibits URLs with IP addresses instead of domain names, and developers' networks are often not set up to resolve local hostnames. Some routers have security features to prevent DNS Servers from resolving to anything in the local IP range.

Now check if you are able to resolve the xip.io address, by running `nslookup`.

```bash
$ nslookup 10.0.1.123.xip.io
```

If it doesn't resolve your local IP address either the **xip.io** service is down or more likely your router prevents it.

To still use xip.io behind your router:

- configure your phone to use Google DNS (8.8.8.8)
- disable the appropriate security feature in your router

<block class="mac windows linux android" />

## 从设备上访问开发服务器

在启用开发服务器（官方名称 metro，但我们更常称之为 Packager）的情况下，你可以快速的迭代修改应用，然后在设备上查看结果。按照下面描述的任意一种方法来使你的运行在电脑上的开发服务器可以从设备上访问到。

> 译注：默认情况下模拟器可以自动探测宿主机 ip 并连接，只有 Android 5.0 以下版本的手机需要按下文说明来手动操作。但某些情形下可能也无法正常连接，请注意去[论坛的求助专区](http://bbs.reactnative.cn/category/4/)查看是否有人遭遇同类型的问题（不同时期不同版本可能是不同的问题）。有些文章会提到`react-native bundle`命令，这个命令会把 js 文件打包内置到应用中，从而不需要连接 Packager，但这`并没有解决问题`。我们在开发中必须使用到 Packager，否则无法刷新代码。

### (Android 5.0 及以上)使用 adb reverse 命令

<block class="mac windows linux android" />

> 注意，这个选项只能在 5.0 以上版本(API 21+)的安卓设备上使用。

首先把你的设备通过 USB 数据线连接到电脑上，并开启 USB 调试（关于如何开启 USB 调试，参见上面的章节）。

<block class="mac windows linux android" />

1.  运行`adb reverse tcp:8081 tcp:8081`
2.  不需要更多配置，你就可以使用`Reload JS`和其它的开发选项了。

### (Android 5.0 以下)通过 Wi-Fi 连接你的本地开发服务器

You can also connect to the development server over Wi-Fi. You'll first need to install the app on your device using a USB cable, but once that has been done you can debug wirelessly by following these instructions. You'll need your development machine's current IP address before proceeding.

<block class="mac android" />

You can find the IP address in **System Preferences** → **Network**.

<block class="windows android" />

Open the command prompt and type `ipconfig` to find your machine's IP address ([more info](http://windows.microsoft.com/en-us/windows/using-command-line-tools-networking-information)).

<block class="linux android" />

Open a terminal and type `/sbin/ifconfig` to find your machine's IP address.

<block class="mac windows linux android" />

1.  首先确保你的电脑和手机设备在**同一个 Wi-Fi 环境**下。
2.  在设备上运行你的 React Native 应用。和打开其它 App 一样操作。
3.  你应该会看到一个“红屏”错误提示。这是正常的，下面的步骤会解决这个报错。
4.  摇晃设备，或者运行`adb shell input keyevent 82`，可以打开**开发者菜单**。
5.  点击`Dev Settings` -> `Debug server host for device`。
6.  输入你电脑的 IP 地址和端口号（譬如 10.0.1.1:8081）。**在 Mac 上**，你可以在系统设置/网络里找查询你的 IP 地址。**在 Windows 上**，打开命令提示符并输入`ipconfig`来查询你的 IP 地址。**在 Linux 上**你可以在终端中输入`ifconfig`来查询你的 IP 地址。
7.  回到**开发者菜单**然后选择`Reload JS`。

You can now enable Live reloading from the [Developer menu](debugging.md#accessing-the-in-app-developer-menu). Your app will reload whenever your JavaScript code has changed.

<block class="mac ios" />

## Building your app for production

You have built a great app using React Native, and you are now itching to release it in the App Store. The process is the same as any other native iOS app, with some additional considerations to take into account.

### 1. Enable App Transport Security

App Transport Security is a security feature introduced in iOS 9 that rejects all HTTP requests that are not sent over HTTPS. This can result in HTTP traffic being blocked, including the developer React Native server. ATS is disabled for `localhost` by default in React Native projects in order to make development easier.

You should re-enable ATS prior to building your app for production by removing the `localhost` entry from the `NSExceptionDomains` dictionary in your `Info.plist` file in the `ios/` folder. You can also re-enable ATS from within Xcode by opening your target properties under the Info pane and editing the App Transport Security Settings entry.

> If your application needs to access HTTP resources on production, see [this post](http://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/) to learn how to configure ATS on your project.

### 2. Configure release scheme

Building an app for distribution in the App Store requires using the `Release` scheme in Xcode. Apps built for `Release` will automatically disable the in-app Developer menu, which will prevent your users from inadvertently accessing the menu in production. It will also bundle the JavaScript locally, so you can put the app on a device and test whilst not connected to the computer.

To configure your app to be built using the `Release` scheme, go to **Product** → **Scheme** → **Edit Scheme**. Select the **Run** tab in the sidebar, then set the Build Configuration dropdown to `Release`.

![](assets/ConfigureReleaseScheme.png)

### 3. Configure app to use static bundle

During the development process, React Native has loaded your JavaScript code dynamically at runtime. For a production build, you want to pre-package the JavaScript bundle and distribute it inside your application. Doing this requires a code change in your code so that it knows to load the static bundle.

In `AppDelegate.m`, change the default `jsCodeLocation` to point to the static bundle that is built in Release.

```objc
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

This will now reference the `main.jsbundle` resource file that is created during the `Bundle React Native code and images` Build Phase in Xcode.

> Note: The static bundle is built every time you target a physical device, even in Debug. If you want to save time, turn off bundle generation in Debug by adding the following to your shell script in the Xcode Build Phase `Bundle React Native code and images`:

```shell
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi
```

#### Pro Tip

As your App Bundle grows in size, you may start to see a white screen flash between your splash screen and the display of your root application view. If this is the case, you can add the following code to `AppDelegate.m` in order to keep your splash screen displayed during the transition.

```objc
  // Place this code after "[self.window makeKeyAndVisible]" and before "return YES;"
  UIView* launchScreenView = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] objectAtIndex:0];
  launchScreenView.frame = self.window.bounds;
  rootView.loadingView = launchScreenView;
```

### 4. Build app for release

You can now build your app for release by tapping `⌘B` or selecting **Product** → **Build** from the menu bar. Once built for release, you'll be able to distribute the app to beta testers and submit the app to the App Store.

> You can also use the `React Native CLI` to perform this operation using the option `--configuration` with the value `Release` (e.g. `react-native run-ios --configuration Release`).

<block class="mac windows linux android" />

## Building your app for production

You have built a great app using React Native, and you are now itching to release it in the Play Store. The process is the same as any other native Android app, with some additional considerations to take into account. Follow the guide for [generating a signed APK](signed-apk-android.md) to learn more.


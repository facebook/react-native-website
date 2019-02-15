---
id: running-on-device
title: 在设备上运行
---

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
  .display-os-mac .toggler .button-mac,
  .display-os-linux .toggler .button-linux,
  .display-os-windows .toggler .button-windows,
  .display-platform-ios .toggler .button-ios,
  .display-platform-android .toggler .button-android {
    background-color: #05A5D1;
    color: white;
  }
  block { display: none; }
  .display-platform-ios.display-os-mac .ios.mac,
  .display-platform-ios.display-os-linux .ios.linux,
  .display-platform-ios.display-os-windows .ios.windows,
  .display-platform-android.display-os-mac .android.mac,
  .display-platform-android.display-os-linux .android.linux,
  .display-platform-android.display-os-windows .android.windows {
    display: block;
  }
</style>

在真机上测试app后再将其发布给用户总是好的。本文档将指导你通过必须的步骤在设备上运行React Native app，为生产做准备。

如果使用Create React Native App来建立工程，可以通过Expo App扫描QR代码在设备上预览app。为了在设备上编译和运行app，需要逐出并从[搭建开发环境](getting-started.md)安装原生代码依赖。

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

### 1. 通过 USB 数据线连接设备

使用USB闪电数据线连接iOS设备到Mac。导航到工程的`ios`文件夹，然后用Xcode打开`.xcodeproj`文件，如果使用CocoaPods打开`.xcworkspace`。


如果这是第一次在iOS设备上运行app，需要注册开发设备。从Xcode菜单栏打开**Product**菜单，然后前往**Destination**。从列表中查找并选择设备。Xcode 将注册为开发设备。



### 2. 配置代码签名

如果没有[Apple developer account](https://developer.apple.com/)，先注册。

在Xcode Project导航中选择project，然后选择main target（它应该和project共享同样的名字）。查找"General"标签。前往"Signing"并确保在"Team"下拉下选择了开发者账号或团队。tests target（以Tests结束，在main target下面）所做相同。

![](assets/RunningOnDeviceCodeSigning.png)

### 3. 编译并运行应用

如果一切设置正确，设备会在Xcode toolbar 中被列为build target，也会出现在设备面板里(`⇧⌘2`)。现在可以按下 **Build and run** 按钮(`⌘R`)或从**Product**菜单中选择**Run**。app会立刻启动在设备上。

![](assets/RunningOnDeviceReady.png)

> If you run into any issues, please take a look at Apple's [Launching Your App on a Device](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4) docs.

<block class="mac windows linux android" />

> 下文所指的设备包括 Android 手机和模拟器。

### 1. 开启 USB 调试

在默认情况下 Android 设备只能从应用市场来安装应用。你需要开启 USB 调试才能自由安装开发版本的 APP。

首先，确定[你已经打开设备的 USB 调试开关](https://www.baidu.com/s?wd=打开usb调试)。

### 2. 通过 USB 数据线连接设备

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

在启用开发服务器的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。只需要在和电脑同样的Wi-Fi网络。摇晃设备打开[Developer menu](debugging.md#accessing-the-in-app-developer-menu)，然后enable Live Reload。当JavaScript代码改变时app会重载。

![](assets/DeveloperMenu.png)

### 常见问题

> If you have any issues, ensure that your Mac and device are on the same network and can reach each other. Many open wireless networks with captive portals are configured to prevent devices from reaching other devices on the network. You may use your device's Personal Hotspot feature in this case.

当尝试连接到开发服务器时，可能得到一个[红屏报错](debugging.md#in-app-errors-and-warnings)说：


> Connection to [http://localhost:8081/debugger-proxy?role=client]() timed out. Are you running node proxy? If you are running on the device, check if you have the right IP address in `RCTWebSocketExecutor.m`.

解决这个问题检查以下几点。

#### 1. Wi-Fi 网络

确保笔记本电脑和电话在**同一个**Wi-Fi网络。

#### 2. IP 地址

确保编译脚本正确检测到机器的IP地址(e.g. 10.0.1.123)。

![](assets/XcodeBuildIP.png)

打开**Report navigator**标签，选择最近的**Build**然后搜索`xip.io`。这个内嵌到app的IP地址应该匹配机器IP地址加上域名 `.xip.io`（例如10.0.1.123.xip.io）


#### 3. 网络/路由配置

React Native 使用通配符DNS服务 **xip.io** 处理设备，用IP地址代替域名作为Apple ATS 禁止URLs，开发者的网络通常不是建立来解析本地主机名的。一些有安全特性的路由器阻止DNS服务器在本地IP范围内解析任何东西。

通过运行`nsloop`检查能否解析xip.io地址。


```bash
$ nslookup 10.0.1.123.xip.io
```

If it doesn't resolve your local IP address either the **xip.io** service is down or more likely your router prevents it.
如果不能解析本地IP地址，则**xip.io**服务器下了或可能是路由器阻止了它。


To still use xip.io behind your router:

- 用Google DNS (8.8.8.8) 配置电话

- 禁用路由器中适当的安全特性


<block class="mac windows linux android" />

## 从设备上访问开发服务器

在启用开发服务器（官方名称 metro，但我们更常称之为 Packager）的情况下，你可以快速的迭代修改应用，然后在设备上立即查看结果。按照下面描述的任意一种方法来使你的设备可以访问到运行在电脑上的开发服务器。

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

## 为生产编译app

已经用React Native编译了一个伟大的app，现在渴望在App Store发布。其过程和任何其它原生iOS app一样，有一些额外的注意事项要考虑。

### 1. Enable App Transport Security

App Transport Security 是iOS 9引入的一项安全特性，拒绝不通过HTTPS发送的所有HTTP请求。这会导致HTTP传输阻塞，包括开发者React Native服务器。为了使开发容易，在React Native projects里ATS默认为`localhost`禁用。

You should re-enable ATS prior to building your app for production by removing the `localhost` entry from the `NSExceptionDomains` dictionary in your `Info.plist` file in the `ios/` folder. You can also re-enable ATS from within Xcode by opening your target properties under the Info pane and editing the App Transport Security Settings entry.

> If your application needs to access HTTP resources on production, see [this post](http://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/) to learn how to configure ATS on your project.

### 2. 配置release scheme

需要在Xcode使用`Release` scheme编译在App Store发布的app。 `Release`编译的Apps将自动禁用app内开发者菜单,这将阻止用户无意地访问生产下的菜单。这也将本地打包JavaScript，所以可以将app安装在设备上，在没有连接电脑的时候测试。


配置app为用`Release` scheme编译，前往**Product** → **Scheme** → **Edit Scheme**。选择侧边栏的**Run**标签，然后设置下拉的Build Configuration为`Release`。


![](assets/ConfigureReleaseScheme.png)

### 3. 配置app使用静态包

在开发过程中，React Native已经在运行时动态地加载了JavaScript代码。对于生产编译，要预先打包JavaScript包并将其分发在应用内。


> Note: The static bundle is built every time you target a physical device, even in Debug. If you want to save time, turn off bundle generation in Debug by adding the following to your shell script in the Xcode Build Phase `Bundle React Native code and images`:

```shell
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi
```

#### 专业技巧

随着App包大小的增长，可能开始在闪屏和根应用视图显示之间看到白屏闪现。如果是这样，为了在转换期间保持闪屏显示，可以添加下列代码到`AppDelegate.m`。


```objc
  // Place this code after "[self.window makeKeyAndVisible]" and before "return YES;"
  UIView* launchScreenView = [[[NSBundle mainBundle] loadNibNamed:@"LaunchScreen" owner:self options:nil] objectAtIndex:0];
  launchScreenView.frame = self.window.bounds;
  rootView.loadingView = launchScreenView;
```

### 4. 编译发布app 

现在可以通过点击`⌘B`或从菜单栏选择 **Product** → **Build** 编译发布app。一旦编译发布，就能够向beta测试者发布app，提交app到App Store。

> You can also use the `React Native CLI` to perform this operation using the option `--configuration` with the value `Release` (e.g. `react-native run-ios --configuration Release`).

<block class="mac windows linux android" />

## Building your app for production

You have built a great app using React Native, and you are now itching to release it in the Play Store. The process is the same as any other native Android app, with some additional considerations to take into account. Follow the guide for [generating a signed APK](signed-apk-android.md) to learn more.

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

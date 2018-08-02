---
id: version-0.51-running-on-device-android
title: 在设备上运行
original_id: running-on-device-android
---

> 本文所指的设备同时包含手机和模拟器

## 前提条件：USB 调试

你需要开启 USB 调试才能在你的设备上安装你的 APP。首先，确定[你已经打开设备的 USB 调试开关](https://www.baidu.com/s?wd=%E5%AE%89%E5%8D%93%E6%89%93%E5%BC%80usb%E8%B0%83%E8%AF%95)

确保你的设备已经**成功连接**。可以输入`adb devices`来查看:

    $ adb devices
    List of devices attached
    emulator-5554 offline   # Google模拟器
    14ed2fcc device         # 真实设备

在右边那列看到**device**说明你的设备已经被正确连接了。注意，你只应当**连接仅仅一个设备**。

**译注**：如果你连接了多个设备（包含模拟器在内），后续的一些操作可能会失败。拔掉不需要的设备，或者关掉模拟器，确保 adb devices 的输出只有一个是连接状态。

现在你可以运行`react-native run-android`来在设备上安装并启动应用了。

**译注**：在真机上运行时可能会遇到白屏的情况，请找到并开启`悬浮窗权限`。比如 miui 系统的设置[在此处](http://jingyan.baidu.com/article/f25ef25466c0fc482d1b824d.html)。

> 提示
>
> 你还可以运行`react-native run-android --variant=release`来安装 release 版的应用。当然你需要[先配置好签名](signed-apk-android.html)，且此时无法再开启开发者菜单。注意在 debug 和 release 版本间来回切换安装时可能会报错签名不匹配，此时需要先卸载前一个版本再尝试安装。

## 从设备上访问开发服务器。

在启用开发服务器（官方名称 metro，但我们更常称之为 Packager）的情况下，你可以快速的迭代修改应用，然后在设备上查看结果。按照下面描述的任意一种方法来使你的运行在电脑上的开发服务器可以从设备上访问到。

> 译注：默认情况下模拟器可以自动探测宿主机 ip 并连接，只有 Android 5.0 以下版本的手机需要按下文说明来手动操作。但某些情形下可能也无法正常连接，请注意去[论坛的求助专区](http://bbs.reactnative.cn/category/4/)查看是否有人遭遇同类型的问题（不同时期不同版本可能是不同的问题）。有些文章会提到`react-native bundle`命令，这个命令会把 js 文件打包内置到应用中，从而不需要连接 Packager，但这`并没有解决问题`。我们在开发中必须使用到 Packager，否则无法刷新代码。

### (Android 5.0 及以上)使用 adb reverse 命令

> 注意，这个选项只能在 5.0 以上版本(API 21+)的安卓设备上使用。

首先把你的设备通过 USB 数据线连接到电脑上，并开启 USB 调试（关于如何开启 USB 调试，参见上面的章节）。

1.  运行`adb reverse tcp:8081 tcp:8081`
2.  不需要更多配置，你就可以使用`Reload JS`和其它的开发选项了。

### (Android 5.0 以下)通过 Wi-Fi 连接你的本地开发服务器

1.  首先确保你的电脑和设备在**同一个 Wi-Fi 环境**下。（模拟器不用检查）
2.  在设备上运行你的 React Native 应用。和打开其它 App 一样操作。
3.  你应该会看到一个“红屏”错误提示。这是正常的，下面的步骤会解决这个报错。
4.  摇晃设备，或者运行`adb shell input keyevent 82`，可以打开**开发者菜单**。
5.  点击进入`Dev Settings`。
6.  点击`Debug server host for device`。
7.  输入你电脑的 IP 地址和端口号（譬如 10.0.1.1:8081）。**在 Mac 上**，你可以在系统设置/网络里找查询你的 IP 地址。**在 Windows 上**，打开命令提示符并输入`ipconfig`来查询你的 IP 地址。**在 Linux 上**你可以在终端中输入`ifconfig`来查询你的 IP 地址。
8.  回到**开发者菜单**然后选择`Reload JS`。

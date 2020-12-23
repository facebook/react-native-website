---
id: version-0.45-running-on-device-ios
title: 在设备上运行
original_id: running-on-device-ios
---


在真机上测试iOS应用需要一台Mac电脑，同时还需要注册一个Apple ID。如果你需要把应用发布到App Store，那么你还需要去苹果开发者网站购买一个开发者账户（在自己手机上测试则不用）。本文档只探讨React Native相关的发布问题。

## 在真机上访问开发服务器（packager）

你可以在真机上访问开发服务器以快速测试和迭代。首先需要确保设备已使用usb连接至电脑，同时和电脑处在同一wifi网络内，然后在Xcode中选择你的设备作为编译目标（左上角运行按钮的右边），然后点击运行按钮即可。  
如果你需要在真机上启用调试功能，则需要打开[RCTWebSocketExecutor.m](https://github.com/facebook/react-native/blob/master/Libraries/WebSocket/RCTWebSocketExecutor.m)文件，然后将其中的"localhost"改为你的电脑的IP地址，最后启用开发者菜单中的"Debug JS Remotely"选项。

> 提示  
摇晃设备就可以打开开发者菜单。

## 发布应用

当你使用React Native做好一个漂亮的应用之后，一定跃跃欲试想要在App Store上发布了吧。发布的流程和其他iOS原生应用完全一样，除了以下一些注意事项。  
在App Store上发布应用首先需要编译一个“发布版本”(release)的应用。具体的做法是在Xcode中选择Product -> Scheme -> Edit Scheme (cmd + <)，然后选择Run选项卡，将Build Configuration设置为release。
Release版本的应用会自动禁用开发者菜单，同时也会将js文件和静态图片打包压缩后内置到包中，这样应用可以在本地读取而无需访问开发服务器（同时这样一来你也无法再调试，需要调试请将Buiid Configuration再改为debug）。  
由于发布版本已经内置了js文件，因而也无法再通过开发服务器来实时更新。面向用户的热更新，请使用专门的[热更新服务](http://update.reactnative.cn)。  
编译完成后，你就可以打包提交到TestFlight进行内测，或是提交到App Store进行发布。相关流程较为复杂，不熟悉原生应用发布流程的同学请自行搜索学习。  

### App Transport Security

**App Transport Security**(简称ATS)是iOS 9中新增的一项安全特性。在默认设置下，只允许HTTPS的请求，而所有HTTP的请求都会被拒绝。详情可参考[这篇帖子](https://segmentfault.com/a/1190000002933776)。
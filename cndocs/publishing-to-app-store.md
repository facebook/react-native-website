---
id: publishing-to-app-store
title: 上架 App Store
---

上架应用的过程和任何其它原生 iOS 应用一样，但有一些额外的注意事项要考虑。

> If you are using Expo then read the Expo Guide for [Building Standalone Apps](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/).

### 1. Enable App Transport Security

App Transport Security 是 iOS 9 引入的一项安全特性，拒绝不通过 HTTPS 发送的所有 HTTP 请求。这会导致 HTTP 传输阻塞，包括开发者 React Native 服务器。为了使开发容易，在 React Native projects 里 ATS 默认为`localhost`禁用。

You should re-enable ATS prior to building your app for production by removing the `localhost` entry from the `NSExceptionDomains` dictionary and setting `NSAllowsArbitraryLoads` to `false` in your `Info.plist` file in the `ios/` folder. You can also re-enable ATS from within Xcode by opening your target properties under the Info pane and editing the App Transport Security Settings entry.

> If your application needs to access HTTP resources on production, see [this post](http://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/) to learn how to configure ATS on your project.

### 2. 配置 release scheme

需要在 Xcode 使用`Release` scheme 编译在 App Store 发布的 app。`Release`版本的应用会自动禁用开发者菜单，同时也会将 js 文件和静态图片打包压缩后内置到包中，这样应用可以在本地读取而无需访问开发服务器（同时这样一来你也无法再调试，需要调试请将 Buiid Configuration 再改为 debug）。  
由于发布版本已经内置了 js 文件，因而也无法再通过开发服务器来实时更新。面向用户的热更新，请使用专门的[热更新服务](https://pushy.reactnative.cn)。

要配置 app 为使用`Release` scheme 编译，请前往**Product** → **Scheme** → **Edit Scheme**。选择侧边栏的**Run**标签，然后设置下拉的 Build Configuration 为`Release`。

![](assets/ConfigureReleaseScheme.png)

#### 关于启动屏的优化技巧

随着 App 包大小的增长，可能开始在启动屏(splash)和根应用视图显示之间看到白屏闪现。如果是这样，为了在转换期间保持启动屏显示，可以添加下列代码到`AppDelegate.m`。

```objectivec
  // Place this code after "[self.window makeKeyAndVisible]" and before "return YES;"
  UIStoryboard *sb = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
  UIViewController *vc = [sb instantiateInitialViewController];
  rootView.loadingView = vc.view;
```

The static bundle is built every time you target a physical device, even in Debug. If you want to save time, turn off bundle generation in Debug by adding the following to your shell script in the Xcode Build Phase `Bundle React Native code and images`:

```sh
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi
```

### 3. 编译发布 app

现在可以通过点击`⌘B`或从菜单栏选择 **Product** → **Build** 编译发布 app。一旦编译发布，就能够向 beta 测试者发布 app，提交 app 到 App Store。

> You can also use the `React Native CLI` to perform this operation using the option `--configuration` with the value `Release` (e.g. `npx react-native run-ios --configuration Release`).

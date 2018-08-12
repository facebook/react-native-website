---
id: version-0.46-debugging
title: 调试
original_id: debugging
---

## 访问App内的开发菜单

你可以通过摇晃设备或是选择iOS模拟器的"Hardware"菜单中的"Shake Gesture"选项来打开开发菜单。另外，如果是在iOS模拟器中运行，还可以按下**`Command`**`⌘` + **`D`** 快捷键，Android模拟器对应的则是**`Command`**`⌘` + **`M`**（windows上可能是F1或者F2）。

![](/img/DeveloperMenu.png)

> 注意：在成品（release/production builds）中开发者菜单会被关闭。

## 刷新JavaScript

传统的原生应用开发中，每一次修改都需要重新编译，但在RN中你只需要刷新一下JavaScript代码，就能立刻看到变化。具体的操作就是在开发菜单中点击"Reload"选项。也可以在iOS模拟器中按下**`Command`**`⌘` + **`R`** ，Android模拟器上对应的则是按两下**`R`**。（注意，某些RN版本可能在windows中reload无效，请等待官方修复）

> 如果在iOS模拟器中按下**`Command`**`⌘` + **`R`**没啥感觉，则注意检查Hardware菜单中，Keyboard选项下的"Connect Hardware Keyboard"是否被选中。

### 自动刷新

选择开发菜单中的"Enable Live Reload"可以开启自动刷新，这样可以节省你开发中的时间。

更神奇的是，你还可以保持应用的当前运行状态，修改后的JavaScript文件会自动注入进来（就好比行驶中的汽车不用停下就能更换新的轮胎）。要实现这一特性只需开启开发菜单中的[Hot Reloading](https://facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html)选项。

> 某些情况下hot reload并不能顺利实施。如果碰到任何界面刷新上的问题，请尝试手动完全刷新。

但有些时候你必须要重新编译应用才能使修改生效：

* 增加了新的资源(比如给iOS的`Images.xcassets`或是Andorid的`res/drawable`文件夹添加了图片)
* 更改了任何的原生代码（objective-c/swift/java）

## 应用内的错误与警告提示（红屏和黄屏）

红屏或黄屏提示都只会在开发版本中显示，正式的离线包中是不会显示的。

### 红屏错误

应用内的报错会以全屏红色显示在应用中（调试模式下），我们称为红屏（red box）报错。你可以使用`console.error()`来手动触发红屏错误。

### 黄屏警告

应用内的警告会以全屏黄色显示在应用中（调试模式下），我们称为黄屏（yellow box）报错。点击警告可以查看详情或是忽略掉。
和红屏报警类似，你可以使用`console.warn()`来手动触发黄屏警告。
在默认情况下，开发模式中启用了黄屏警告。可以通过以下代码关闭：

```javascript
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
```

你也可以通过代码屏蔽指定的警告，像下面这样调用ignoreWarnings方法，参数为一个数组：

```javascript
YellowBox.ignoreWarnings(['Warning: ']);
```

数组中的字符串就是要屏蔽的警告的开头的内容。（例如上面的代码会屏蔽掉所有以Warning开头的警告内容）

> 红屏和黄屏在发布版（release/production）中都是自动禁用的。

## 访问控制台日志

在运行RN应用时，可以在终端中运行如下命令来查看控制台的日志：

```
$ react-native log-ios
$ react-native log-android
```

此外，你也可以在iOS模拟器的菜单中选择`Debug → Open System Log...`来查看。如果是Android应用，无论是运行在模拟器或是真机上，都可以通过在终端命令行里运行`adb logcat *:S ReactNative:V ReactNativeJS:V`命令来查看。

## Chrome开发者工具

在开发者菜单中选择"Debug JS Remotely"选项，即可以开始在Chrome中调试JavaScript代码。点击这个选项的同时会自动打开调试页面 <http://localhost:8081/debugger-ui>.

在Chrome的菜单中选择`Tools → Developer Tools`可以打开开发者工具，也可以通过键盘快捷键来打开（Mac上是**`Command`**`⌘` + **`Option`**`⌥` + **`I`**，Windows上是**`Ctrl`** + **`Shift`** + **`I`**或是F12）。打开[有异常时暂停（Pause On Caught Exceptions）](http://stackoverflow.com/questions/2233339/javascript-is-there-a-way-to-get-chrome-to-break-on-all-errors/17324511#17324511)选项，能够获得更好的开发体验。  

__译注__：Chrome中并不能直接看到App的用户界面，而只能提供console的输出，以及在sources项中断点调试js脚本。


## React Developer Tools
 
With React Native 0.43 or higher, you can use [the standalone version of React Developer Tools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools) to debug the React component hierarchy. To use it, install the `react-devtools` package globally:

```bash
npm install -g react-devtools
```

> 译注：react-devtools依赖于electron，而electron需要到国外服务器下载二进制包，所以国内用户这一步很可能会卡住。此时请在`环境变量`中添加electron专用的国内镜像源：`ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"`，然后再尝试安装react-devtools。

安装完成后在命令行中执行`react-devtools`即可启动此工具：

```bash
react-devtools
```

<img src="https://camo.githubusercontent.com/3226d81c8d40f07f10c1f78876905a1bfc2d6d82/687474703a2f2f692e696d6775722e636f6d2f49586548695a442e706e67" width="700" alt="React DevTools">

It should connect to your simulator within a few seconds.

> Note: if you prefer to avoid global installations, you can add `react-devtools` as a project dependency. With Yarn, you can run `yarn add --dev react-devtools`, and then run `yarn react-devtools` from your project folder to open the DevTools. With npm, you can run `npm install --save-dev react-devtools`, add `"react-devtools": "react-devtools"` to the `scripts` section in your `package.json`, and then run `npm run react-devtools` from your project folder to open the DevTools.

### Integration with React Native Inspector

You can open the [in-app developer menu](#accessing-the-in-app-developer-menu) and choose "Show Inspector". It will bring up an overlay that lets you tap on any UI element and see information about it:

<img src="https://d2ppvlu71ri8gs.cloudfront.net/items/1R1d2x0O3M0C1t071Q0F/Screen%20Recording%202017-05-01%20at%2020.14.gif?v=45691135" alt="Show Inspector" width="300">

However, when `react-devtools` is running, Inspector will enter a special collapsed mode, and instead use the DevTools as primary UI. In this mode, clicking on something in the simulator will bring up the relevant components in the DevTools:

<img src="https://d2ppvlu71ri8gs.cloudfront.net/items/1v031W3O1W322z3G1k15/Screen%20Recording%202017-05-01%20at%2020.16.gif?v=a87eb3f4" alt="Show Inspector with React DevTools" width="700">

You can choose "Hide Inspector" in the same menu to exit this mode.

### 使用Chrome开发者工具来在设备上调试

对于iOS真机来说，需要打开 [`RCTWebSocketExecutor.m`](https://github.com/facebook/react-native/blob/master/Libraries/WebSocket/RCTWebSocketExecutor.m)文件，然后将其中的"localhost"改为你的电脑的IP地址，最后启用开发者菜单中的"Debug JS Remotely"选项。

对于Android 5.0+设备（包括模拟器）来说，将设备通过USB连接到电脑上后，可以使用[`adb`命令行工具](http://developer.android.com/tools/help/adb.html)来设定从设备到电脑的端口转发：

`adb reverse tcp:8081 tcp:8081`

如果设备Android版本在5.0以下，则可以在开发者菜单中选择"Dev Settings - Debug server host for device"，然后在其中填入电脑的”IP地址:端口“。

> 如果在Chrome调试时遇到一些问题，那有可能是某些Chrome的插件引起的。试着禁用所有的插件，然后逐个启用，以确定是否某个插件影响到了调试。

### 使用自定义的JavaScript调试器来调试

如果想用其他的JavaScript调试器来代替Chrome，可以设置一个名为`REACT_DEBUGGER`的环境变量，其值为启动自定义调试器的命令。调试的流程依然是从开发者菜单中的"Debug JS Remotely"选项开始。

被指定的调试器需要知道项目所在的目录（可以一次传递多个目录参数，以空格隔开）。例如，如果你设定了`REACT_DEBUGGER="node /某个路径/launchDebugger.js --port 2345 --type ReactNative"`，那么启动调试器的命令就应该是`node /某个路径/launchDebugger.js --port 2345 --type ReactNative /某个路径/你的RN项目目录`。

> 以这种方式执行的调试器最好是一个短进程（short-lived processes），同时最好也不要有超过200k的文字输出。

### 在Android上使用[Stetho](http://facebook.github.io/stetho/)来调试 

1. 在```android/app/build.gradle```文件中添加：

   ```gradle
   compile 'com.facebook.stetho:stetho:1.3.1'
   compile 'com.facebook.stetho:stetho-okhttp3:1.3.1'
   ```

2. 在```android/app/src/main/java/com/{yourAppName}/MainApplication.java```文件中添加： 

   ```java
   import com.facebook.react.modules.network.ReactCookieJarContainer;
   import com.facebook.stetho.Stetho;
   import okhttp3.OkHttpClient;
   import com.facebook.react.modules.network.OkHttpClientProvider;
   import com.facebook.stetho.okhttp3.StethoInterceptor;
   import java.util.concurrent.TimeUnit;
   ```

3. 在```android/app/src/main/java/com/{yourAppName}/MainApplication.java```文件中添加：
   ```java
   public void onCreate() {
         super.onCreate();
         Stetho.initializeWithDefaults(this);
         OkHttpClient client = new OkHttpClient.Builder()
         .connectTimeout(0, TimeUnit.MILLISECONDS)
         .readTimeout(0, TimeUnit.MILLISECONDS)
         .writeTimeout(0, TimeUnit.MILLISECONDS)
         .cookieJar(new ReactCookieJarContainer())
         .addNetworkInterceptor(new StethoInterceptor())
         .build();
         OkHttpClientProvider.replaceOkHttpClient(client);
   }
   ```

4. 运行```react-native run-android ```

5. 打开一个新的Chrome选项卡，在地址栏中输入```chrome://inspect```并回车。在页面中选择'Inspect device' （标有"Powered by Stetho"字样）。

## 调试原生代码

在和原生代码打交道时（比如编写原生模块），可以直接从Android Studio或是Xcode中启动应用，并利用这些IDE的内置功能来调试（比如设置断点）。这一方面和开发原生应用并无二致。
 
## 性能监测

你可以在开发者菜单中选择"Pref Monitor"选项以开启一个悬浮层，其中会显示应用的当前帧数。

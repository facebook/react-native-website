import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 核心概念

把 React Native 组件集成到 Android 应用中有如下几个主要步骤：

1.  配置好项目结构。
2.  安装必要的 JavaScript 依赖。
3.  在 Gradle 中配置 React Native 依赖。
4.  创建 ts 文件，编写 React Native 组件的 ts 代码。
5.  使用 ReactActivity 来把 React Native 集成到你的 Android 项目代码中。
6.  运行 Metro 服务，验证集成结果。

## 使用社区模板

在跟随本指南时，我们建议你使用 [React Native Community Template](https://github.com/react-native-community/template/) 作为参考。模板包含一个 **精简的 Android app** 并且可以帮助你理解如何将 React Native 集成到现有的 Android 应用中。

## 开发环境准备

首先按照[开发环境搭建教程](environment-setup)来安装 React Native 在 Android 平台上所需的一切依赖软件。

### 1. 配置项目目录结构

首先创建一个空目录用于存放 React Native 项目，然后在其中创建一个`/android`子目录，把你现有的 Android 项目拷贝到`/android`子目录中。

### 2. 安装 JavaScript 依赖包

在根目录下运行以下命令：

```shell
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.75-stable/template/package.json
```

这将把 [React Native 社区模板](https://github.com/react-native-community/template/blob/0.75-stable/template/package.json) 中的 `package.json` 文件复制到你的项目中。

接下来我们使用 yarn 或 npm（两者都是 node 的包管理器）来安装必要的模块。请打开一个终端/命令提示行，进入到项目目录中（即包含有 package.json 文件的目录），然后运行下列命令来安装：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install
```

</TabItem>
<TabItem value="yarn">

```shell
yarn install
```

</TabItem>
</Tabs>

所有 JavaScript 依赖模块都会被安装到项目根目录下的`node_modules/`目录中（这个目录我们原则上不复制、不移动、不修改、不上传，随用随装）。

把`node_modules/`目录记录到`.gitignore`文件中（即不上传到版本控制系统，只保留在本地）。可以参考 [React Native 社区模板](https://github.com/react-native-community/template/blob/0.77-stable/template/_gitignore) 中的`.gitignore`文件。

## 把 React Native 添加到你的应用中

### 配置 Gradle

React Native 使用 React Native Gradle Plugin 来配置您的依赖项和项目设置。

首先，让我们通过添加以下行来编辑您的`settings.gradle`文件：
（请参考 [社区模板](https://github.com/react-native-community/template/blob/0.77-stable/template/android/settings.gradle)）:

```groovy
// 此处配置用于自动链接第三方原生库的 React Native Gradle 插件
pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }
plugins { id("com.facebook.react.settings") }
extensions.configure(com.facebook.react.ReactSettingsExtension){ ex -> ex.autolinkLibrariesFromCommand() }
// 如果使用 .gradle.kts 文件:
// extensions.configure<com.facebook.react.ReactSettingsExtension> { autolinkLibrariesFromCommand() }
includeBuild("../node_modules/@react-native/gradle-plugin")

// 在这里引入你已有的其他 Gradle 模块。
// include(":app")
```

然后你需要打开顶层的 `build.gradle` 文件并添加这一行：

```diff
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.3.1")
+       classpath("com.facebook.react:react-native-gradle-plugin")
    }
}
```

这将确保 React Native Gradle Plugin 在您的项目中可用。
最后，在 `app/build.gradle` 文件中添加以下行（注意它的路径不同于上面，这次是 `app/build.gradle`）：

```diff
apply plugin: "com.android.application"
+apply plugin: "com.facebook.react"

repositories {
    mavenCentral()
}

dependencies {
    // Other dependencies here
+   // 注：我们故意不在这里指定版本号，因为 React Native Gradle Plugin 会自动处理它。
+   // 如果您不使用 React Native Gradle Plugin，则必须手动指定版本。
+   implementation "com.facebook.react:react-android"
+   implementation "com.facebook.react:hermes-android"
}

+react {
+   // 启用自动链接需要添加以下行，参考： https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
+   autolinkLibrariesWithApp()
+}
```

最后，打开应用的 `gradle.properties` 文件并添加以下行（请参考 [社区模板](https://github.com/react-native-community/template/blob/0.77-stable/template/android/gradle.properties)）：

```diff
+reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
+newArchEnabled=true
+hermesEnabled=true
```

### 配置权限

接着，在 `AndroidManifest.xml` 清单文件中声明网络权限:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

+   <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">
    </application>
</manifest>
```

然后你需要在 `AndroidManifest.xml` 中启用 [允许明文传输](https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted) （在`src/debug/AndroidManifest.xml` 中）：

> 从 Android 9 (API level 28)开始，默认情况下明文传输（http 接口）是禁用的，只能访问 https 接口。这将阻止应用程序连接到[Metro bundler](https://facebook.github.io/metro)。下面的更改允许调试版本中的明文通信。

```diff
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
+       android:usesCleartextTraffic="true"
+       tools:targetApi="28"
    />
</manifest>
```

同样可以参考社区模板的 AndroidManifest.xml 文件：[main](https://github.com/react-native-community/template/blob/0.77-stable/template/android/app/src/main/AndroidManifest.xml) 和 [debug](https://github.com/react-native-community/template/blob/0.77-stable/template/android/app/src/debug/AndroidManifest.xml)

如果希望在正式打包后也能继续访问 http 接口，则需要在`src/main/AndroidManifest.xml`中也添加这一选项。

要了解有关网络安全配置和明文通信策略的更多信息，请参阅[此链接](https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted)。

### 代码集成

现在我们将修改原生 Android 应用程序以集成 React Native。

#### React Native 组件

我们首先要写的是"High Score"（得分排行榜）的 JavaScript 端的代码。

### 创建一个`index.js`文件

首先在项目根目录中创建一个空的`index.js`文件。

`index.js`是 React Native 应用在 Android 上的入口文件。而且它是不可或缺的！它可以是个很简单的文件，简单到可以只包含一行`require/import`导入语句。

本教程的`index.js`文件应该如下所示（请参考 [社区模板](https://github.com/react-native-community/template/blob/0.77-stable/template/index.js)）：

```js
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('HelloWorld', () => App);
```

### 创建一个 `App.tsx` 文件

下面我们创建一个 `App.tsx` 文件。这是一个 [TypeScript](https://www.typescriptlang.org/) 文件，可以包含 [JSX](<https://en.wikipedia.org/wiki/JSX_(JavaScript)>) 表达式。它包含了我们将在 Android 应用中集成的根 React Native 组件（请参考 [社区模板](https://github.com/react-native-community/template/blob/0.77-stable/template/App.tsx)）：

```tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode
              ? Colors.black
              : Colors.white,
            padding: 24,
          }}>
          <Text style={styles.title}>Step One</Text>
          <Text>
            Edit <Text style={styles.bold}>App.tsx</Text> to
            change this screen and see your edits.
          </Text>
          <Text style={styles.title}>See your changes</Text>
          <ReloadInstructions />
          <Text style={styles.title}>Debug</Text>
          <DebugInstructions />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

## 5. 集成到 Android 代码中

我们现在需要添加一些原生代码来启动 React Native 运行时，并让它渲染我们的 React 组件。

### 更新你的 Application 类

首先，我们需要更新你的 `Application` 类来正确初始化 React Native，如下所示：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```diff
package <your-package-here>;

import android.app.Application;
+import com.facebook.react.PackageList;
+import com.facebook.react.ReactApplication;
+import com.facebook.react.ReactHost;
+import com.facebook.react.ReactNativeHost;
+import com.facebook.react.ReactPackage;
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
+import com.facebook.react.defaults.DefaultReactHost;
+import com.facebook.react.defaults.DefaultReactNativeHost;
+import com.facebook.soloader.SoLoader;
+import com.facebook.react.soloader.OpenSourceMergedSoMapping
+import java.util.List;

-class MainApplication extends Application {
+class MainApplication extends Application implements ReactApplication {
+ @Override
+ public ReactNativeHost getReactNativeHost() {
+   return new DefaultReactNativeHost(this) {
+     @Override
+     protected List<ReactPackage> getPackages() { return new PackageList(this).getPackages(); }
+     @Override
+     protected String getJSMainModuleName() { return "index"; }
+     @Override
+     public boolean getUseDeveloperSupport() { return BuildConfig.DEBUG; }
+     @Override
+     protected boolean isNewArchEnabled() { return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED; }
+     @Override
+     protected Boolean isHermesEnabled() { return BuildConfig.IS_HERMES_ENABLED; }
+   };
+ }

+ @Override
+ public ReactHost getReactHost() {
+   return DefaultReactHost.getDefaultReactHost(getApplicationContext(), getReactNativeHost());
+ }

  @Override
  public void onCreate() {
    super.onCreate();
+   SoLoader.init(this, OpenSourceMergedSoMapping);
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     DefaultNewArchitectureEntryPoint.load();
+   }
  }
}
```

</TabItem>

<TabItem value="kotlin">

```diff
// package <your-package-here>

import android.app.Application
+import com.facebook.react.PackageList
+import com.facebook.react.ReactApplication
+import com.facebook.react.ReactHost
+import com.facebook.react.ReactNativeHost
+import com.facebook.react.ReactPackage
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
+import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
+import com.facebook.react.defaults.DefaultReactNativeHost
+import com.facebook.soloader.SoLoader
+import com.facebook.react.soloader.OpenSourceMergedSoMapping

-class MainApplication : Application() {
+class MainApplication : Application(), ReactApplication {

+ override val reactNativeHost: ReactNativeHost =
+      object : DefaultReactNativeHost(this) {
+        override fun getPackages(): List<ReactPackage> = PackageList(this).packages
+        override fun getJSMainModuleName(): String = "index"
+        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
+        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
+        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
+      }

+ override val reactHost: ReactHost
+   get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
+   SoLoader.init(this, OpenSourceMergedSoMapping)
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     load()
+   }
  }
}
```

</TabItem>
</Tabs>

同样可以参考 [`MainApplication.kt` 社区模板文件](https://github.com/react-native-community/template/blob/0.77-stable/template/android/app/src/main/java/com/helloworld/MainApplication.kt)。

#### 创建 `ReactActivity`

最后，我们需要创建一个新的 `Activity`，它将继承 `ReactActivity` 并承载 React Native 代码。这个 Activity 将负责启动 React Native 运行时并渲染 React 组件。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
// package <your-package-here>;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MyReactActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "HelloWorld";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(this, getMainComponentName(), DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }
}
```

</TabItem>

<TabItem value="kotlin">

```kotlin
// package <your-package-here>

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MyReactActivity : ReactActivity() {

    override fun getMainComponentName(): String = "HelloWorld"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

</TabItem>
</Tabs>

同样可以参考 [`MainActivity.kt` 社区模板文件](https://github.com/react-native-community/template/blob/0.77-stable/template/android/app/src/main/java/com/helloworld/MainApplication.kt)。

每当创建新的 Activity 时，你需要将其添加到 `AndroidManifest.xml` 文件中。你还需要将 `MyReactActivity` 的主题设置为 `Theme.AppCompat.Light.NoActionBar`（或任何非 ActionBar 主题），否则你的应用会在 React Native 屏幕上方渲染一个 ActionBar：

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">

+     <activity
+       android:name=".MyReactActivity"
+       android:label="@string/app_name"
+       android:theme="@style/Theme.AppCompat.Light.NoActionBar">
+     </activity>
    </application>
</manifest>
```

现在你的 Activity 已准备好运行 JavaScript 代码了。

## 6. 测试集成效果

你已经完成了将 React Native 集成到应用中的所有基本步骤。现在我们将启动 [Metro 打包器](https://metrobundler.dev/) 来将你的 TypeScript 应用代码打包成 bundle。Metro 的 HTTP 服务器会从你开发环境的 `localhost` 上将 bundle 共享给模拟器或设备。这支持[热重载](https://reactnative.dev/blog/2016/03/24/introducing-hot-reloading)。

首先，你需要在项目根目录创建一个 `metro.config.js` 文件，内容如下：

```js
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

你可以参考社区模板中的 [`metro.config.js` 文件](https://github.com/react-native-community/template/blob/0.77-stable/template/metro.config.js)。

配置文件就位后，你就可以运行打包器了。在项目根目录运行以下命令：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start
```

</TabItem>
</Tabs>

像往常一样构建并运行你的 Android 应用。

当你在应用中打开 React 驱动的 Activity 时，它应该会从开发服务器加载 JavaScript 代码并显示：

<center><img src="/docs/assets/EmbeddedAppAndroidVideo.gif" width="300" /></center>

### 在 Android Studio 中创建发布版本

你也可以使用 Android Studio 来创建发布版本！就像创建之前已有的原生 Android 应用的发布版本一样快捷。

React Native Gradle Plugin 会负责将 JS 代码打包到你的 APK/App Bundle 中。

如果你不使用 Android Studio，可以通过以下命令创建发布版本：

```
cd android
# For a Release APK
./gradlew :app:assembleRelease
# For a Release AAB
./gradlew :app:bundleRelease
```

### 接下来？

现在你可以像往常一样继续开发你的应用。参考我们的[调试](debugging)和[部署](running-on-device)文档来了解更多关于使用 React Native 的信息。

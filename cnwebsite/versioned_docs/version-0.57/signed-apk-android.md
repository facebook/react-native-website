---
id: version-0.57-signed-apk-android
title: 打包APK
original_id: signed-apk-android
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

Android 要求所有应用都有一个数字签名才会被允许安装在用户手机上，所以在把应用发布到类似[Google Play store](https://play.google.com/store)这样的应用市场之前，你需要先生成一个签名的 APK 包。Android 开发者官网上的[如何给你的应用签名](https://developer.android.com/tools/publishing/app-signing.html)文档描述了签名的细节。本指南旨在提供一个简化的签名和打包 js 的操作步骤，不会涉及太多理论。

### 生成一个签名密钥

你可以用`keytool`命令生成一个私有密钥。在 Windows 上`keytool`命令放在 JDK 的 bin 目录中（比如`C:\Program Files\Java\jdkx.x.x_x\bin`），你可能需要在命令行中先进入那个目录才能执行此命令。

    $ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

这条命令会要求你输入密钥库（keystore）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做`my-release-key.keystore`的密钥库文件。

在运行上面这条语句之后，密钥库里应该已经生成了一个单独的密钥，有效期为 10000 天。--alias 参数后面的别名是你将来为应用签名时所需要用到的，所以记得记录这个别名。

**注意：请记得妥善地保管好你的密钥库文件，一般不要上传到版本库或者其它的地方。**

### 设置 gradle 变量

1.  把`my-release-key.keystore`文件放到你工程中的`android/app`文件夹下。
2.  编辑`~/.gradle/gradle.properties`（全局配置，对所有项目有效）或是`项目目录/android/gradle.properties`（项目配置，只对所在项目有效）。如果没有`gradle.properties`文件你就自己创建一个，添加如下的代码（注意把其中的`****`替换为相应密码）

**注意：~符号表示用户目录，比如 windows 上可能是`C:\Users\用户名`，而 mac 上可能是`/Users/用户名`。**

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

上面的这些会作为 gradle 的变量，在后面的步骤中可以用来给应用签名。

> **关于密钥库的注意事项:**

> 一旦你在 Play Store 发布了你的应用，如果想修改签名，就必须用一个不同的包名来重新发布你的应用（这样也会丢失所有的下载数和评分）。所以请务必备份好你的密钥库和密码。

提示：如果你不想以明文方式保存密码，同时你使用的是 macOS 系统，那么你也可以把密码[保存到钥匙串（Keychain）中](https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/)。这样一来你就可以省略掉上面配置中的后两行（即 MYAPP_RELEASE_STORE_PASSWORD 和 MYAPP_RELEASE_KEY_PASSWORD）。

### 把签名配置加入到项目的 gradle 配置中

编辑你项目目录下的`android/app/build.gradle`，添加如下的签名配置：

```gradle
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

### 生成发行 APK 包

只需在终端中运行以下命令：

```sh
$ cd android
$ ./gradlew assembleRelease
```

> 译注：`cd android`表示进入 android 目录（如果你已经在 android 目录中了那就不用输入了）。`./gradlew assembleRelease`在 macOS、Linux 或是 windows 的 PowerShell 环境中表示执行当前目录下的名为 gradlew 的脚本文件，且其运行参数为 assembleRelease，注意这个`./`不可省略；而在 windows 的传统 CMD 命令行下则需要去掉`./`。

Gradle 的`assembleRelease`参数会把所有用到的 JavaScript 代码都打包到一起，然后内置到 APK 包中。如果你想调整下这个行为（比如 js 代码以及静态资源打包的默认文件名或是目录结构等），可以看看`android/app/build.gradle`文件，然后琢磨下应该怎么修改以满足你的需求。

> 注意：请确保 gradle.properties 中`没有`包含`_org.gradle.configureondemand=true_`，否则会跳过 js 打包的步骤，导致最终生成的 apk 是一个无法运行的空壳。

生成的 APK 文件位于`android/app/build/outputs/apk/app-release.apk`，它已经可以用来发布了。

### 测试应用的发行版本

在把发行版本提交到 Play Store 之前，你应该做一次最终测试。输入以下命令可以在设备上安装发行版本：

```sh
$ react-native run-android --variant=release
```

注意`--variant=release`参数只能在你完成了上面的签名配置之后才可以使用。
你现在可以关掉运行中的 packager 了，因为你所有的代码和框架依赖已经都被打包到 apk 包中，可以离线运行了。

> 注意：在 debug 和 release 版本间来回切换安装时可能会报错签名不匹配，此时需要先卸载前一个版本再尝试安装。

### 针对不同的 CPU 架构生成 APK 以减小 APK 文件的大小

默认情况下，生成的 APK 会同时包含针对于 x86 和 ARMv7a 两种 CPU 架构的原生代码。这样可以让我们更方便的向其他人分享这个 APK，因为它几乎可以运行在所有的 Android 设备上。但是，这会导致所有设备上都有一些根本不会运行的代码，白白占据了空间。目前安卓设备绝大多数是 ARM 架构，因此对于大部分应用来说可以考虑去掉 x86 架构的支持。

你可以在`android/app/build.gradle`中修改如下代码（false 改为 true）来生成针对不同 CPU 架构的 APK。

```diff
- ndk {
-   abiFilters "armeabi-v7a", "x86"
- }
- def enableSeparateBuildPerCPUArchitecture = false
+ def enableSeparateBuildPerCPUArchitecture = true
```

你可以把这上面打包生成的两个 APK 都上传到支持对用户设备 CPU 架构定位的应用程序商店，例如 Google Play 和 Amazon AppStore，用户将自动获得相应的 APK。如果您想上传到其他市场，例如 APKFiles（不支持一个应用有多个 APK 文件），可以修改下面的代码，来额外生成一个适用不同 CPU 架构的通用 APK。

```diff
- universalApk false
+ universalApk true  // 额外生成一个适用不同CPU架构的通用APK
```

### Enabling Proguard to reduce the size of the APK (optional)

Proguard 是一个 Java 字节码混淆压缩工具，它可以移除掉 React Native Java（和它的依赖库中）中没有被使用到的部分，最终有效的减少 APK 的大小。

**重要**：启用 Proguard 之后，你必须再次全面地测试你的应用。Proguard 有时候需要为你引入的每个原生库做一些额外的配置。参见`app/proguard-rules.pro`文件。

要启用 Proguard，修改`android/app/build.gradle`文件：

```gradle
/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
```

---
id: signed-apk-android
title: 发布到 Google Play Store
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Android 要求所有应用都有一个数字签名才会被允许安装在用户手机上。要通过 [Google Play 商店](https://play.google.com/store)发布你的 Android 应用，需要使用一个发布密钥对其进行签名，此后所有的更新也需要使用同一个密钥。自 2017 年起，借助 [Google Play 应用签名](https://developer.android.com/studio/publish/app-signing#app-signing-google-play)功能，Google Play 可以自动管理签名发布。但在将应用二进制文件上传到 Google Play 之前，仍需要使用上传密钥进行签名。Android 开发者官网上的[应用签名](https://developer.android.com/tools/publishing/app-signing.html)文档描述了签名的细节。本指南旨在提供一个简化的签名和打包流程，以及打包 JavaScript 代码所需的步骤。

:::info
如果你使用的是 Expo，请阅读 Expo 的[发布到应用商店](https://docs.expo.dev/distribution/app-stores/)指南来构建和提交应用到 Google Play 商店。此指南适用于任何 React Native 应用，可以自动化部署流程。
:::

## 生成上传密钥

你可以用`keytool`命令生成一个私有签名密钥。

### Windows

在 Windows 上`keytool`命令需要在`C:\Program Files\Java\jdkx.x.x_x\bin`目录下以管理员身份运行。

```shell
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

这条命令会要求你输入密钥库（keystore）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做`my-upload-key.keystore`的密钥库文件。

在运行上面这条语句之后，密钥库里应该已经生成了一个单独的密钥，有效期为 10000 天。--alias 参数后面的别名是你将来为应用签名时所需要用到的，所以记得记录这个别名。

### macOS

在 macOS 上，如果你不确定 JDK bin 目录的位置，可以执行以下命令来查找：

```shell
/usr/libexec/java_home
```

它会输出 JDK 的目录，类似这样：

```shell
/Library/Java/JavaVirtualMachines/jdkX.X.X_XXX.jdk/Contents/Home
```

使用 `cd /your/jdk/path` 命令进入该目录，然后使用 sudo 权限执行 keytool 命令：

```shell
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

:::caution
请记得妥善保管好你的密钥库文件，不要上传到版本库或其他公开的地方。如果你丢失了上传密钥或密钥被泄露，请[按照这些说明操作](https://support.google.com/googleplay/android-developer/answer/7384423#reset)。
:::

## 设置 Gradle 变量

1. 把`my-upload-key.keystore`文件放到你工程中的`android/app`文件夹下。
2. 编辑`~/.gradle/gradle.properties`（全局配置，对所有项目有效）或是`android/gradle.properties`（项目配置，只对所在项目有效），添加如下的代码（注意把其中的`*****`替换为相应密码）：

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

上面的这些会作为全局 Gradle 变量，在后面的步骤中可以用来给应用签名。

:::note 关于使用 git 的说明
将上述 Gradle 变量保存在 `~/.gradle/gradle.properties` 而非 `android/gradle.properties` 中，可以防止它们被提交到 git。你可能需要先在用户主目录下创建 `~/.gradle/gradle.properties` 文件。
:::

:::note 关于安全性的说明
如果你不想以明文方式保存密码，且你使用的是 macOS 系统，你也可以把密码[保存到钥匙串（Keychain）中](https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/)。这样一来你就可以省略掉 `~/.gradle/gradle.properties` 中的后两行。
:::

## 在应用的 Gradle 配置中添加签名配置

最后一步是配置 release 构建使用上传密钥进行签名。编辑你项目目录下的`android/app/build.gradle`，添加签名配置：

```groovy
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
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

## 生成发行 AAB 包

在终端中运行以下命令：

```shell
npx react-native build-android --mode=release
```

此命令底层使用 Gradle 的`bundleRelease`任务，会把所有用到的 JavaScript 代码都打包到 AAB（[Android App Bundle](https://developer.android.com/guide/app-bundle)）中。如果你需要调整 JavaScript 代码包和/或 drawable 资源的打包方式（比如修改了默认的文件/文件夹名称或项目的整体结构），请查看`android/app/build.gradle`来了解如何更新配置。

:::note
请确保 gradle.properties 中**没有**包含`org.gradle.configureondemand=true`，否则会跳过 JS 打包的步骤，导致最终生成的是一个无法运行的空壳。
:::

生成的 AAB 文件位于`android/app/build/outputs/bundle/release/app-release.aab`，可以直接上传到 Google Play。

要让 Google Play 接受 AAB 格式，需要在 Google Play Console 中为应用配置 Google Play 应用签名。如果你正在更新一个尚未使用 Google Play 应用签名的现有应用，请查看[迁移指南](#迁移旧版-android-react-native-应用到-google-play-应用签名)了解如何进行配置更改。

## 测试应用的发行版本

在将发行版本上传到 Play Store 之前，请确保彻底测试。首先卸载已安装的所有该应用的旧版本，然后在项目根目录下使用以下命令安装到设备：

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android -- --mode="release"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android --mode release
```

</TabItem>
</Tabs>

注意`--mode release`参数只能在你完成了上面的签名配置之后才可以使用。

你现在可以关掉运行中的 bundler 了，因为你所有的框架和 JavaScript 代码已经都被打包到 APK 的 assets 中了。

## 发布到其他商店

默认情况下，生成的 APK 会同时包含 `x86`、`x86_64`、`ARMv7a` 和 `ARM64-v8a` CPU 架构的原生代码。这使得分享可以在几乎所有 Android 设备上运行的 APK 更加方便。但是，这意味着在任何设备上都会有一些未使用的原生代码，导致 APK 不必要地变大。

你可以在`android/app/build.gradle`中添加如下代码来为每种 CPU 架构生成单独的 APK：

```diff
android {

    splits {
        abi {
            reset()
            enable true
            universalApk false
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
        }
    }

}
```

你可以把这些文件上传到支持设备定位的商店，如 [Amazon AppStore](https://developer.amazon.com/docs/app-submission/device-filtering-and-compatibility.html) 或 [F-Droid](https://f-droid.org/en/)，用户将自动获得适当的 APK。如果你想上传到其他不支持单个应用多个 APK 的商店（如 [APKFiles](https://www.apkfiles.com/)），请将 `universalApk false` 改为 `true`，以生成包含所有 CPU 架构的通用 APK。

请注意，你还需要配置不同的版本代码，如官方 Android 文档[此页面](https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions)所建议的。

## 启用 Proguard 来减少 APK 的大小（可选）

Proguard 是一个 Java 字节码混淆压缩工具，它可以移除掉 React Native Java（和它的依赖库中）未被使用到的部分，从而有效地减少 APK 的大小。

:::caution 重要
启用 Proguard 之后，你必须再次全面地测试你的应用。Proguard 有时候需要为你引入的每个原生库做一些额外的配置。参见`app/proguard-rules.pro`文件。
:::

要启用 Proguard，修改`android/app/build.gradle`文件：

```groovy
/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
```

## 迁移旧版 Android React Native 应用到 Google Play 应用签名

如果你是从旧版 React Native 迁移过来的，你的应用很可能还没有使用 Google Play 应用签名功能。我们建议你启用该功能以利用自动应用拆分等优势。要从旧的签名方式迁移，你需要先[生成新的上传密钥](#生成上传密钥)，然后将 `android/app/build.gradle` 中的发布签名配置替换为使用上传密钥（参见[添加签名配置到 Gradle](#在应用的-gradle-配置中添加签名配置)）。完成后，请按照 [Google Play 帮助网站的说明](https://support.google.com/googleplay/android-developer/answer/7384423)将你的原始发布密钥发送给 Google Play。

## 默认权限

默认情况下，`INTERNET` 权限会被添加到你的 Android 应用中，因为几乎所有应用都需要使用它。`SYSTEM_ALERT_WINDOW` 权限在 debug 模式下会添加到 APK 中，但在 production 构建中会被移除。

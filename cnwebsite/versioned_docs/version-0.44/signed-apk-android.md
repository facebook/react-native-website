---
id: version-0.44-signed-apk-android
title: 打包APK
original_id: signed-apk-android
---

Android要求所有应用都有一个数字签名才会被允许安装在用户手机上，所以在把应用发布到类似[Google Play store](https://play.google.com/store)这样的应用市场之前，你需要先生成一个签名的APK包。Android开发者官网上的[如何给你的应用签名](https://developer.android.com/tools/publishing/app-signing.html)文档描述了签名的细节。本指南旨在提供一个简化的签名和打包js的操作步骤，不会涉及太多理论。

### 生成一个签名密钥

你可以用`keytool`命令生成一个私有密钥。在Windows上`keytool`命令放在JDK的bin目录中（比如`C:\Program Files\Java\jdkx.x.x_x\bin`），你可能需要在命令行中先进入那个目录才能执行此命令。

    $ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

这条命令会要求你输入密钥库（keystore）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做`my-release-key.keystore`的密钥库文件。

在运行上面这条语句之后，密钥库里应该已经生成了一个单独的密钥，有效期为10000天。--alias参数后面的别名是你将来为应用签名时所需要用到的，所以记得记录这个别名。

**注意：请记得妥善地保管好你的密钥库文件，不要上传到版本库或者其它的地方。**

### 设置gradle变量

1. 把`my-release-key.keystore`文件放到你工程中的`android/app`文件夹下。
2. 编辑`~/.gradle/gradle.properties`（没有这个文件你就创建一个），添加如下的代码（注意把其中的`****`替换为相应密码）

**注意：~表示用户目录，比如windows上可能是`C:\Users\用户名`，而mac上可能是`/Users/用户名`。**

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

上面的这些会作为全局的gradle变量，我们在后面的步骤中可以用来给应用签名。


> __关于密钥库的注意事项:__

> 一旦你在Play Store发布了你的应用，如果想修改签名，就必须用一个不同的包名来重新发布你的应用（这样也会丢失所有的下载数和评分）。所以请务必备份好你的密钥库和密码。

提示：如果你不想以明文方式保存密码，同时你使用的是macOS系统，那么你也可以把密码[保存到钥匙串（Keychain）中](https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/)。这样一来你就可以省略掉上面配置中的后两行（即MYAPP_RELEASE_STORE_PASSWORD和MYAPP_RELEASE_KEY_PASSWORD）。


### 添加签名到项目的gradle配置文件

编辑你项目目录下的`android/app/build.gradle`，添加如下的签名配置：

```gradle
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
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

### 生成发行APK包

只需在终端中运行以下命令：

```sh
$ cd android && ./gradlew assembleRelease
```

译注：cd android表示进入android目录（如果你已经在android目录中了那就不用输入了）。`./gradlew assembleRelease`在macOS和Linux系统中表示执行当前目录下的名为gradlew的脚本文件，运行参数为assembleRelease，注意这个`./`不可省略；而在windows命令行下则需要去掉`./`。

Gradle的`assembleRelease`参数会把所有用到的JavaScript代码都打包到一起，然后内置到APK包中。如果你想调整下这个行为（比如js代码以及静态资源打包的默认文件名或是目录结构等），可以看看`android/app/build.gradle`文件，然后琢磨下应该怎么修改以满足你的需求。 

生成的APK文件位于`android/app/build/outputs/apk/app-release.apk`，它已经可以用来发布了。


### 测试应用的发行版本

在把发行版本提交到Play Store之前，你应该做一次最终测试。输入以下命令可以在设备上安装发行版本：

```sh
$ cd android && ./gradlew installRelease
```

注意`installRelease`参数只能在你完成了上面的签名配置之后才可以使用。
你现在可以关掉运行中的packager了，因为你所有的代码和框架依赖已经都被打包到apk包中，可以离线运行了。

> 在debug和release版本间来回切换安装时可能会报错签名不匹配，此时需要先卸载前一个版本再尝试安装。

### 启用Proguard代码混淆来缩小APK文件的大小（可选）

Proguard是一个Java字节码混淆压缩工具，它可以移除掉React Native Java（和它的依赖库中）中没有被使用到的部分，最终有效的减少APK的大小。

**重要**：启用Proguard之后，你必须再次全面地测试你的应用。Proguard有时候需要为你引入的每个原生库做一些额外的配置。参见`app/proguard-rules.pro`文件。

要启用Proguard，设置`minifyEnabled`选项为`true`：

```gradle
/**
 * 在release发行版中启用Proguard来减小 to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
```

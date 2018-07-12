---
id: version-0.40-android-building-from-source
title: 从源代码编译React Native
original_id: android-building-from-source
---

如果你想使用新的功能，获得官方的修复补丁，尝试还没发布的最新特性，或者维护你自己的不能合并到核心版本的补丁，你可能需要自己从源代码编译React Native。

# 预备条件

如果你已经安装了安卓SDK，那么运行`android`命令打开安卓SDK管理器。

确保你已经安装了以下模块：

* Android SDK version 23 (编译SDK版本号在[build.gradle](https://github.com/facebook/react-native/blob/master/ReactAndroid/build.gradle)中可以找到)
* SDK build tools version 23.0.1(编译工具版本号在[build.gradle](https://github.com/facebook/react-native/blob/master/ReactAndroid/build.gradle)中可以找到)
* Android Support Repository >= 17 
* Android NDK(下载及解压指南看[这里](http://developer.android.com/ndk/downloads/index.html))

将Gradle指向你的安卓SDK: 设置`$ANDROID_SDK`和`$ANDORID_NDK`为对应的目录，或者按照以下内容在react-native根目录下创建local.properties文件（注意：windows下需要使用反双斜杠）。

```
sdk.dir=指向android sdk目录的绝对路径
ndk.dir=指向android ndk目录的绝对路径
``` 
例如：

```
sdk.dir=/Users/your_unix_name/android-sdk-macosx
ndk.dir=/Users/your_unix_name/android-ndk/android-ndk-r10e
```
# 从下载链接安装Android NDK

1. Mac OS (64-bit) - http://dl.google.com/android/repository/android-ndk-r10e-darwin-x86_64.zip
2. Linux (64-bit) - http://dl.google.com/android/repository/android-ndk-r10e-linux-x86_64.zip
3. Windows (64-bit) - http://dl.google.com/android/repository/android-ndk-r10e-windows-x86_64.zip
4. Windows (32-bit) - http://dl.google.com/android/repository/android-ndk-r10e-windows-x86.zip

更多参考您可以访问官网NDK界面 [official page](http://developer.android.com/ndk/downloads/index.html).

__译注__:建议安装r10e版本，否则在编译过程可能会出错
# 编译源代码：

## 1.在你的分支代码中进行安装

首先，在你的分支代码中安装react-native。例如从官方地址安装主干版本：

```
npm install --save github:facebook/react-native#master
```

或者，你也可以把仓库克隆到你的`node_modules`目录，然后运行`npm install`进行安装

## 2.添加gradle依赖

在`android/build.gradle`中添加`gradle-download-task`依赖

```
...
    dependencies {
        classpath 'com.android.tools.build:gradle:1.3.1'
        classpath 'de.undercouch:gradle-download-task:3.1.2'

        // 注意：不要把你的应用的依赖放在这里；
        // 它们应该放在各自模块的build.gradle文件中
    }
...
```

## 添加`:ReactAndroid `项目

在`android/settings.gradle`中添加`:ReactAndroid`项目

```
...
include ':ReactAndroid'

project(':ReactAndroid').projectDir = new File(rootProject.projectDir, '../node_modules/react-native/ReactAndroid')
...
```

修改你的`android/app/build.gradle`文件，使用`:ReactAndroid`替换预编译库。例如用`compile project(':ReactAndroid'):`替换`compile 'com.facebook.react:react-native:0.16.+'`

```
...
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:23.0.1'

    compile project(':ReactAndroid')

    ...
}
...
```

## 让第三方模块使用你的分支
如果你使用第三方的React Native模块，你需要重写它们的依赖以避免它们仍然打包官方的预编译库。否则当你编译时会报错-`Error: more than one library with package name 'com.facebook.react'.`（错误：有几个重名的'com.facebook.react'的包）

修改你的`android/app/build.gradle`文件，添加如下内容：

```
configurations.all {
    exclude group: 'com.facebook.react', module: 'react-native'
}
```

# 在Android Studio中构建您的项目

在Android Studio欢迎页中选择`Import project`，随后选择您应用所在的文件夹。

您还需要使用_Run_按钮(__译注__：Android Studio中绿色的运行按钮)来在设备上运行您的app，此外Android Studio不会自动开启服务，你还需要通过`npm start`来启动。

# 其他注意事项
从源码进行编译将会花费很长时间，尤其是第一次编译，需要下载接近200M的文件然后编译原生代码。每次你在自己的仓库更新`react-native`版本时，构建的目录可能会被删除，所有的文件都需要重新下载。为了避免构建目录被删，你需要编辑`~/.gradle/init.gradle`文件来修改构建目录路径。

```
gradle.projectsLoaded {
    rootProject.allprojects {
        buildDir = "/path/to/build/directory/${rootProject.name}/${project.name}"
    }
}
```

---
id: building-from-source
title: 从源代码编译React Native
---

如果你想提前合并官方的修复补丁，尝试还没发布的最新特性，或者添加一些你自己的原生代码，那么就需要自己从源代码编译 React Native。

## Android

### 预备条件

在 Android Studio 的 SDK Manager 中安装以下组件：

- Android SDK version 26 (编译 SDK 版本号在[build.gradle](https://github.com/facebook/react-native/blob/master/ReactAndroid/build.gradle)中可以找到)
- SDK build tools version 26.0.3(编译工具版本号在[build.gradle](https://github.com/facebook/react-native/blob/master/ReactAndroid/build.gradle)中可以找到)
- Android Support Repository >= 26
- Android NDK(下载及安装指南请看后文)

#### 将 Gradle 指向你的安卓 SDK：

**第一步：** 在命令行配置文件中设置环境变量。

注意： 对于不同的 shell 命令行，配置文件有所不同，请根据具体情况选择，例如：

- bash: `.bash_profile` 或 `.bashrc`
- zsh: `.zprofile` 或 `.zshrc`
- ksh: `.profile` 或 `$ENV`

在配置文件中加入：

```
export ANDROID_SDK=/Users/your_unix_name/android-sdk-macosx
export ANDROID_NDK=/Users/your_unix_name/android-ndk/android-ndk-r17b
```

**第二步：** 在项目目录的 android 目录下创建`local.properties`文件。添加以下内容：（注意：windows 下路径需要使用反双斜杠）

```
ndk.dir=指向android ndk目录的绝对路径
```

#### Android NDK r17b 的下载链接（0.57 之前使用 r10e 版本）

1.  Mac OS (64-bit) - http://dl.google.com/android/repository/android-ndk-r17b-darwin-x86_64.zip
2.  Linux (64-bit) - http://dl.google.com/android/repository/android-ndk-r17b-linux-x86_64.zip
3.  Windows (64-bit) - http://dl.google.com/android/repository/android-ndk-r17b-windows-x86_64.zip
4.  Windows (32-bit) - http://dl.google.com/android/repository/android-ndk-r17b-windows-x86.zip

安装说明请参考[官方文档](https://developer.android.com/ndk/index.html)。

### 编译源代码

#### 1. 下载 react-native 源代码

首先，在你的分支代码中安装 react-native。例如从官方地址安装主干版本：

```sh
npm install --save github:facebook/react-native#master
```

或者，你也可以把仓库克隆到你的`node_modules`目录，然后运行`npm install`进行安装

#### 2. 添加 gradle 依赖

在`android/build.gradle`中添加`gradle-download-task`依赖

```gradle
...
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.4'
        classpath 'de.undercouch:gradle-download-task:3.1.2'

        // 注意：不要把你的应用的依赖放在这里；
        // 它们应该放在各自模块的build.gradle文件中
    }
...
```

#### 3. 添加`:ReactAndroid`项目

在`android/settings.gradle`中添加`:ReactAndroid`项目

```gradle
...
include ':ReactAndroid'

project(':ReactAndroid').projectDir = new File(
    rootProject.projectDir, '../node_modules/react-native/ReactAndroid')
...
```

修改你的`android/app/build.gradle`文件，使用`:ReactAndroid`替换预编译库。例如用`implementation project(':ReactAndroid')`替换`implementation 'com.facebook.react:react-native:+'`

```gradle
...
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}'

    implementation project(':ReactAndroid')

    ...
}
...
```

#### 4. 让第三方模块使用你的分支

如果你使用第三方的 React Native 模块，你需要重写它们的依赖以避免它们仍然打包官方的预编译库。否则当你编译时会报错-`Error: more than one library with package name 'com.facebook.react'.`（错误：有几个重名的'com.facebook.react'的包）

修改你的`android/app/build.gradle`文件，添加如下内容：

```gradle
configurations.all {
    exclude group: 'com.facebook.react', module: 'react-native'
}
```

### 在 Android Studio 中编译

在 Android Studio 欢迎页中选择`Import project`，随后选择您应用所在的文件夹。

您还需要使用*Run*按钮(**译注**：Android Studio 中绿色的运行按钮)来在设备上运行您的 app，此外 Android Studio 不会自动开启服务，你还需要通过`npm start`来启动开发服务。

### 其他注意事项

从源码进行编译将会花费很长时间，尤其是第一次编译，需要下载接近 200M 的文件然后编译原生代码。每次你在自己的仓库更新`react-native`版本时，构建的目录可能会被删除，所有的文件都需要重新下载。为了避免构建目录被删，你需要编辑`~/.gradle/init.gradle`文件来修改构建目录路径。

```gradle
gradle.projectsLoaded {
    rootProject.allprojects {
        buildDir = "/path/to/build/directory/${rootProject.name}/${project.name}"
    }
}
```

### 针对 Maven/Nexus 部署的编译

If you find that you need to push up a locally compiled React Native .aar and related files to a remote Nexus repository, you can.

Start by following the `Point Gradle to your Android SDK` section of this page. Once you do this, assuming you have Gradle configured properly, you can then run the following command from the root of your React Native checkout to build and package all required files:

```
./gradlew ReactAndroid:installArchives
```

This will package everything that would typically be included in the `android` directory of your `node_modules/react-native/` installation in the root directory of your React Native checkout.

### Troubleshooting

Gradle build fails in `ndk-build`. See the section about `local.properties` file above.

## Testing your Changes

If you made changes to React Native and submit a pull request, all tests will run on your pull request automatically. To run the tests locally, see [Running Tests](testing.md).

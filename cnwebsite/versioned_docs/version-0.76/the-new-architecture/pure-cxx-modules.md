# 纯 C++ Turbo 原生模块

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

编写 C++ 模块是跨 Android 和 iOS 共享平台无关代码的最佳方式。使用纯 C++ 模块，您只需编写一次逻辑，即可在所有平台上重用它，而无需编写平台特定的代码。

在本指南中，我们将介绍创建纯 C++ Turbo 原生模块的过程：

1. 创建 JS 规范
2. 配置 Codegen 以生成脚手架
3. 实现原生逻辑
4. 在 Android 和 iOS 应用中注册模块
5. 在 JS 中测试更改

本指南假设您已通过以下命令创建了应用：

```shell
npx @react-native-community/cli@latest init SampleApp --version 0.76.0
```

## 1. 创建 JS 规范

纯 C++ Turbo 原生模块是 Turbo 原生模块。它们需要一个规范文件（也称为规范文件），以便 Codegen 为我们生成脚手架代码。规范文件也是我们用来在 JS 中访问 Turbo 原生模块的方式。

规范文件需要用一种类型化的 JS 方言编写。React Native 目前支持 Flow 或 TypeScript。

1. 在应用的根目录下创建一个名为 `specs` 的新文件夹。
2. 创建一个名为 `NativeSampleModule.ts` 的新文件

:::warning
所有原生 Turbo 模块规范文件必须以 `Native` 开头，否则 Codegen 会忽略它们。
:::

<Tabs groupId="tnm-specs" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```ts
// @flow
import type {TurboModule} from 'react-native'
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
<TabItem value="typescript">

```ts
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
</Tabs>

## 2. Configure Codegen

下一步是在 `package.json` 中配置 [Codegen](what-is-codegen.md) 。

1. 打开 `package.json` 文件
2. 修改如下：

```diff
{
  "name": "SampleApp",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint .",
    "start": "react-native start",
    "test": "jest"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-native": "0.76.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@babel/preset-env": "^7.25.3",
    "@babel/runtime": "^7.25.0",
    "@react-native-community/cli": "15.0.0",
    "@react-native-community/cli-platform-android": "15.0.0",
    "@react-native-community/cli-platform-ios": "15.0.0",
    "@react-native/babel-preset": "0.76.0",
    "@react-native/eslint-config": "0.76.0",
    "@react-native/metro-config": "0.76.0",
    "@react-native/typescript-config": "0.76.0",
    "@types/react": "^18.2.6",
    "@types/react-test-renderer": "^18.0.0",
    "babel-jest": "^29.6.3",
    "eslint": "^8.19.0",
    "jest": "^29.6.3",
    "prettier": "2.8.8",
    "react-test-renderer": "18.3.1",
    "typescript": "5.0.4"
  },
  "engines": {
    "node": ">=18"
  },
+  "codegenConfig": {
+    "name": "AppSpecs",
+    "type": "modules",
+    "jsSrcsDir": "specs",
+    "android": {
+      "javaPackageName": "com.sampleapp.specs"
+    }
+  },
  "packageManager": "yarn@3.6.4"
}
```

此配置告诉 Codegen 在 `specs` 文件夹中查找规范文件。它还指示 Codegen 仅生成 `modules` 的代码，并将生成的代码命名空间为 `AppSpecs`。

## 3. 编写原生代码

编写 C++ Turbo 原生模块允许您在 Android 和 iOS 之间共享代码。因此，我们将编写一次代码，然后查看需要对平台进行哪些更改，以便可以拾取 C++ 代码。

1. 在 `android` 和 `ios` 文件夹的同一级别创建一个名为 `shared` 的新文件夹。
2. 在 `shared` 文件夹中，创建一个名为 `NativeSampleModule.h` 的新文件。

   ```cpp
   #pragma once

   #include <AppSpecsJSI.h>

   #include <memory>
   #include <string>

   namespace facebook::react {

   class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
   public:
     NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

     std::string reverseString(jsi::Runtime& rt, std::string input);
   };

   } // namespace facebook::react

   ```

3. 在 `shared` 文件夹中，创建一个名为 `NativeSampleModule.cpp` 的新文件。

   ```cpp
   #include "NativeSampleModule.h"

   namespace facebook::react {

   NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
       : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

   std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
     return std::string(input.rbegin(), input.rend());
   }

   } // namespace facebook::react
   ```

让我们看看我们创建的两个文件。

`NativeSampleModule.h` 文件是纯 C++ TurboModule 的头文件。`include` 语句确保我们包含 Codegen 将创建的规范文件，该文件包含我们要实现的接口和基类。

模块位于 `facebook::react` 命名空间中，以访问该命名空间中的所有类型。

类 `NativeSampleModule` 是实际的 Turbo 原生模块类，它扩展了 `NativeSampleModuleCxxSpec` 类，该类包含一些粘合代码和样板代码，以使此类作为 Turbo 原生模块运行。

最后，我们有一个构造函数，它接受一个指向 `CallInvoker` 的指针，以便在需要时与 JS 通信，并实现我们声明的函数原型。

`NativeSampleModule.cpp` 文件是我们的 Turbo 原生模块的实际实现，并实现了我们在规范中声明的构造函数和方法。

## 4. 在平台中注册模块

接下来的步骤将让我们在平台中注册模块。这是暴露原生代码给 JS 的步骤，以便 React Native 应用可以最终从 JS 层调用原生方法。

这是我们唯一需要编写一些平台特定代码的时候。

### Android

为了确保 Android 应用可以有效地构建 C++ Turbo 原生模块，我们需要：

1. 创建一个 `CMakeLists.txt` 以访问我们的 C++ 代码
2. 修改 `build.gradle` 以指向新创建的 `CMakeLists.txt` 文件
3. 在我们的 Android 应用中创建一个 `OnLoad.cpp` 文件以注册新的 Turbo 原生模块

#### 1. 创建 `CMakeLists.txt` 文件

Android 使用 CMake 来构建。CMake 需要访问我们在 `shared` 文件夹中定义的文件，以便能够构建它们。

1. 创建一个名为 `SampleApp/android/app/src/main/jni` 的新文件夹。`jni` 文件夹是 Android 的 C++ 部分所在的位置
2. 创建一个 `CMakeLists.txt` 文件并添加以下内容

```shell
cmake_minimum_required(VERSION 3.13)

# 在这里定义库的名称。
project(appmodules)

# 这个文件包括了所有必要的文件，以便你可以构建你的 React Native 应用
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# 定义附加源代码所在的位置。我们需要从 `jni`、`main`、`src`、`app`、`android` 文件夹回溯
target_sources(${CMAKE_PROJECT_NAME} PRIVATE ../../../../../shared/NativeSampleModule.cpp)

# 定义附加头文件所在的位置。我们需要从 `jni`、`main`、`src`、`app`、`android` 文件夹回溯
target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC ../../../../../shared)
```

CMake 文件做了以下几件事：

- 定义 `appmodules` 库，其中将包含所有应用的 C++ 代码。
- 加载 React Native 的基 CMake 文件
- 添加我们要构建的模块 C++ 源代码，使用 `target_sources` 指令。默认情况下，React Native 将已经用默认源填充 `appmodules` 库，这里我们包括我们的自定义源。您可以看到我们需要从 `jni` 文件夹回溯到 `shared` 文件夹，其中我们的 C++ TM 位于那里。
- 指定 CMake 可以找到模块头文件的位置。同样，在这种情况下，我们需要从 `jni` 文件夹回溯。

#### 2. 修改 `build.gradle` 以包含自定义的 C++ 代码

Gradle 是协调 Android 构建的工具。我们需要告诉它可以在哪里找到 `CMake` 文件来构建 Turbo 原生模块。

1. 打开 `SampleApp/android/app/build.gradle` 文件
2. 将以下块添加到 Gradle 文件中的现有 `android` 块中：

```diff
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }

+   externalNativeBuild {
+       cmake {
+           path "src/main/jni/CMakeLists.txt"
+       }
+   }
}
```

此块告诉 Gradle 文件在哪里查找 CMake 文件。路径相对于包含 `build.gradle` 文件的文件夹，因此我们需要添加到 `jni` 文件夹中的 `CMakeLists.txt` 文件的路径。

#### 3. 注册新的 Turbo 原生模块

最后一步是在运行时注册新的 C++ Turbo 原生模块，以便当 JS 需要 C++ Turbo 原生模块时，应用知道在哪里找到它并可以返回它。

1. 从 `SampleApp/android/app/src/main/jni` 文件夹中运行以下命令：

```sh
curl -O https://raw.githubusercontent.com/facebook/react-native/v0.76.0/packages/react-native/ReactAndroid/cmake-utils/default-app-setup/OnLoad.cpp
```

2. Then, modify this file as it follows:

```diff
#include <DefaultComponentsRegistry.h>
#include <DefaultTurboModuleManagerDelegate.h>
#include <autolinking.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <rncore.h>

+ // Include the NativeSampleModule header
+ #include <NativeSampleModule.h>

//...

std::shared_ptr<TurboModule> cxxModuleProvider(
    const std::string& name,
    const std::shared_ptr<CallInvoker>& jsInvoker) {
  // Here you can provide your CXX Turbo Modules coming from
  // either your application or from external libraries. The approach to follow
  // is similar to the following (for a module called `NativeCxxModuleExample`):
  //
  // if (name == NativeCxxModuleExample::kModuleName) {
  //   return std::make_shared<NativeCxxModuleExample>(jsInvoker);
  // }

+  // This code register the module so that when the JS side asks for it, the app can return it
+  if (name == NativeSampleModule::kModuleName) {
+    return std::make_shared<NativeSampleModule>(jsInvoker);
+  }

  // And we fallback to the CXX module providers autolinked
  return autolinking_cxxModuleProvider(name, jsInvoker);
}

// 离开文件的其余部分
```

这些步骤从 React Native 下载了原始的 `OnLoad.cpp` 文件，以便我们可以安全地覆盖它以在应用中加载 C++ Turbo 原生模块。

一旦我们下载了文件，我们可以通过以下方式修改它：

- 包含指向我们模块的头文件
- 注册 Turbo 原生模块，以便当 JS 需要它时，应用可以返回它。

现在，您可以运行 `yarn android` 从项目根目录成功构建应用。

### iOS

为了确保 iOS 应用可以有效地构建 C++ Turbo 原生模块，我们需要：

1. 安装 pods 并运行 Codegen。
2. 将 `shared` 文件夹添加到 iOS 项目中。
3. 在应用中注册 C++ Turbo 原生模块。

#### 1. 安装 Pods 并运行 Codegen。

我们首先需要运行的步骤是每次准备 iOS 应用时通常运行的步骤。CocoaPods 是我们用来设置 React Native 依赖项的工具，作为过程的一部分，它还会为我们运行 Codegen。

1. 导航到 `ios` 文件夹
2. 运行 `bundle install` 安装 Ruby bundler
3. 运行 `bundle exec pod install` 安装依赖项并运行 Codegen

#### 2. 将 `shared` 文件夹添加到 iOS 项目中

这些步骤将 `shared` 文件夹添加到项目中，以便 Xcode 可以访问它。

1. 打开 `SampleApp.xcworkspace` 文件
2. 点击左侧的 `SampleApp` 项目
3. 选择 `Add files to "Sample App"...`
4. 选择 `shared` 文件夹并点击 `Add`

这些图片展示了如何将文件夹添加到项目中：

![Add Files to Sample App...](/docs/assets/AddFilesToXcode1.png)

![Add Files to Sample App...](/docs/assets/AddFilesToXcode2.png)

如果一切正确，您的项目左侧应如下所示：

![Xcode Project](/docs/assets/CxxTMGuideXcodeProject.png)

#### 3. 在应用中注册 Cxx Turbo 原生模块。

通过此最后一步，我们将告诉 iOS 应用在哪里查找纯 C++ Turbo 原生模块。

1. 在 Xcode 中，打开 `AppDelegate.mm` 文件
2. 修改如下：

```diff
#import <React/RCTBundleURLProvider.h>
+ #import <RCTAppDelegate+Protected.h>
+ #import "NativeSampleModule.h"

// ...
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

+- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
+                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
+{
+  if (name == "NativeSampleModule") {
+    return std::make_shared<facebook::react::NativeSampleModule>(jsInvoker);
+  }
+
+  return [super getTurboModule:name jsInvoker:jsInvoker];
+}

@end
```

这些更改做了几件事：

1. 导入 `RCTAppDelegate+Protected` 头文件，以便 AppDelegate 知道它遵循 `RCTTurboModuleManagerDelegate` 协议。
2. 导入纯 C++ 原生 Turbo 模块接口 `NativeSampleModule.h`
3. 重写 `getTurboModule` 方法，以便当 JS 侧请求名为 `NativeSampleModule` 的模块时，应用知道返回哪个模块。

如果现在从 Xcode 构建应用，应该能够成功构建。

## 5. 测试代码

现在可以访问我们的 C++ Turbo 原生模块了。为此，我们需要修改 `App.tsx` 文件以导入 Turbo 原生模块并在代码中调用它。

1. 打开 `App.tsx` 文件
2. 用以下代码替换模板内容

```ts
import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SampleTurboModule from './specs/NativeSampleModule';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState('');
  const [reversedValue, setReversedValue] = React.useState('');

  const onPress = () => {
    const revString = SampleTurboModule.reverseString(value);
    setReversedValue(revString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here he text you want to revert</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});

export default App;
```

此应用中有些需要注意的行：

- `import SampleTurboModule from './specs/NativeSampleModule';`: 这行代码导入 Turbo 原生模块
- `const revString = SampleTurboModule.reverseString(value);` 在 `onPress` 回调中：这是如何在应用中使用 Turbo 原生模块的方法。

:::warning
为了这个例子和保持它的简短，我们直接在我们的应用中导入规范文件。
最佳实践在这种情况下是创建一个单独的文件来包装规范，并将该文件用于应用。
这将使你能够为规范准备输入，并给你更多的控制权。
:::

恭喜，你已经完成了一个 C++ Turbo 原生模块！

| <center>Android</center>                                                                             | <center>iOS</center>                                                                          |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| <center><img src="/docs/assets/CxxGuideAndroidVideo.gif" alt="Android Video" height="600"/></center> | <center><img src="/docs/assets/CxxGuideIOSVideo.gif" alt="iOS video" height="600" /></center> |

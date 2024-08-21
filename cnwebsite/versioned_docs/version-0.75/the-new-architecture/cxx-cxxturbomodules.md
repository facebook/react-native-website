---
id: cxx-cxxturbomodules
title: C++ Turbo 原生模块
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

本指南将向您展示如何仅使用 C++ 实现 Turbo 原生模块，以便与任何支持的平台（Android、iOS、macOS 或 Windows）共享相同的实现。

在继续本指南之前，请阅读[Turbo Native Modules](./pillars-turbomodule.md)部分。作为进一步参考，我们为 RNTester 应用准备了一个示例（[NativeCxxModuleExample](https://github.com/facebook/react-native/tree/main/packages/rn-tester/NativeCxxModuleExample)），并在我们的社区代码库中提供了另一个示例（[run/pure-cxx-module](https://github.com/react-native-community/RNNewArchitectureApp/tree/run/pure-cxx-module)）。

:::caution 注意
使用 C++ Turbo 原生模块需要启用**新架构**。
要迁移到**新架构**，请按照[迁移指南](../new-architecture-intro)进行操作。
:::

## 如何创建 C++ Turbo 原生模块

要创建 C++ Turbo 原生模块，您需要：

1. 定义 JavaScript 规范。
2. 配置 Codegen 以生成脚手架。
3. 注册本地模块。
4. 编写原生代码来完成模块的实现。

### 为新架构设置一个测试应用

第一步，创建一个新的应用程序：

```sh
npx react-native init CxxTurboModulesGuide
cd CxxTurboModulesGuide
yarn install
```

在 Android 上通过修改 `android/gradle.properties` 文件来启用新架构：

```diff
- newArchEnabled=false
+ newArchEnabled=true
```

在 iOS 上，在 `ios` 文件夹中运行 `pod install` 时启用新架构：

```sh
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

### Turbo 模块文件夹设置

在项目中创建一个`tm`文件夹。它将包含您的应用程序的所有 C++ Turbo 模块。最终结果应该如下所示：

```sh
CxxTurboModulesGuide
├── android
├── ios
├── js
└── tm
```

## 1. JavaScript 规范

在 `tm` 文件夹中创建以下规范：

<Tabs groupId="turbomodule-specs" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="NativeSampleModule.ts"
import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
// import type {TurboModule} from 'react-native'; in future versions
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
<TabItem value="flow">

```js title="NativeSampleModule.js"
// @flow
import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
// import type {TurboModule} from 'react-native'; in future versions
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
): Spec);
```

</TabItem>
</Tabs>

## 2. Codegen 配置

接下来，您需要为 [**Codegen**](pillars-codegen.md) 添加一些配置。

# 应用

请在您的应用的 `package.json` 文件中更新以下条目：

```json title="package.json"
{
  // ...
  "description": "React Native with Cxx Turbo Native Modules",
  "author": "<Your Name> <your_email@your_provider.com> (https://github.com/<your_github_handle>)",
  "license": "MIT",
  "homepage": "https://github.com/<your_github_handle>/#readme",
  // ...
  "codegenConfig": {
    "name": "AppSpecs",
    "type": "all",
    "jsSrcsDir": "tm",
    "android": {
      "javaPackageName": "com.facebook.fbreact.specs"
    }
  }
}
```

它添加了必要的属性，我们将在 iOS 的 `podspec` 文件中重新使用，并配置 **Codegen** 在 `tm` 文件夹内搜索规范。

:::caution 注意
C++ Turbo 原生模块不会自动链接，需要按照下面描述的步骤手动包含到应用程序中。
:::

### iOS: 创建 `podspec` 文件

在 iOS 上，您需要在`tm`文件夹中创建一个名为`AppTurboModules.podspec`的文件 - 它将如下所示：

```ruby title="AppTurboModules.podspec"
require "json"

package = JSON.parse(File.read(File.join(__dir__, "../package.json")))

Pod::Spec.new do |s|
  s.name            = "AppTurboModules"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "12.4" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }
  s.source_files    = "**/*.{h,cpp}"
  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }
  install_modules_dependencies(s)
end
```

你需要将它作为依赖项添加到你的应用程序中的 `ios/Podfile` 文件中，例如，在 `use_react_native!(...)` 部分之后：

```ruby
if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
  pod 'AppTurboModules', :path => "./../tm"
end
```

### Android: `build.gradle`, `CMakeLists.txt`, `Onload.cpp`

对于 Android，您需要在`tm`文件夹中创建一个名为`CMakeLists.txt`的文件 - 其内容如下：

```cmake
cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

add_compile_options(
        -fexceptions
        -frtti
        -std=c++17)

file(GLOB tm_SRC CONFIGURE_DEPENDS *.cpp)
add_library(tm STATIC ${tm_SRC})

target_include_directories(tm PUBLIC .)
target_include_directories(react_codegen_AppSpecs PUBLIC .)

target_link_libraries(tm
        jsi
        react_nativemodule_core
        react_codegen_AppSpecs)
```

它将`tm`文件夹定义为原生代码的来源，并设置了必要的依赖项。

您需要将其添加为应用程序的依赖项，例如在`android/app/build.gradle`文件的末尾：

```kotlin title="build.gradle"
android {
   externalNativeBuild {
       cmake {
           path "src/main/jni/CMakeLists.txt"
       }
   }
}
```

:::note 备注
确保选择正确的 **android/app/build.gradle** 文件，而不是 android/build.gradle。
:::

## 3. 注册模块

### iOS

要在您的应用程序中注册一个 C++ Turbo 原生模块，您需要在`ios/CxxTurboModulesGuide/AppDelegate.mm`文件中更新以下条目：

```diff
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
+ #import <React/CoreModulesPlugins.h>
+ #import <ReactCommon/RCTTurboModuleManager.h>
+ #import <NativeSampleModule.h>

+ @interface AppDelegate () <RCTTurboModuleManagerDelegate> {}
+ @end

// ...

᠆ (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

+ #pragma mark RCTTurboModuleManagerDelegate

+ - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
+                                                       jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
+ {
+   if (name == "NativeSampleModule") {
+     return std::make_shared<facebook::react::NativeSampleModule>(jsInvoker);
+   }
+   return nullptr;
+ }
```

这将实例化一个与之前在我们的 JavaScript 规范文件中定义的名称为`NativeSampleModule`的`NativeSampleModule`相关联的对象。

### Android

Android 应用默认情况下没有设置原生代码编译。

1. 创建文件夹 `android/app/src/main/jni`
2. 从[node_modules/react-native/ReactAndroid/cmake-utils/default-app-setup](https://github.com/facebook/react-native/tree/main/packages/react-native/ReactAndroid/cmake-utils/default-app-setup)复制`CMakeLists.txt`和`Onload.cpp`到 `android/app/src/main/jni` 文件夹中。

使用以下条目更新 `Onload.cpp`:

```diff
// ...

#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <rncli.h>
+ #include <NativeSampleModule.h>

// ...

std::shared_ptr<TurboModule> cxxModuleProvider(
    const std::string &name,
    const std::shared_ptr<CallInvoker> &jsInvoker) {
+ if (name == "NativeSampleModule") {
+   return std::make_shared<facebook::react::NativeSampleModule>(jsInvoker);
+ }
  return nullptr;
}

// ...
```

更新`CMakeLists.txt`文件，添加以下条目，例如，在该文件的末尾处：

```diff
// ...

# This file includes all the necessary to let you build your application with the New Architecture.
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

+ # App needs to add and link against tm (TurboModules) folder
+ add_subdirectory(${REACT_ANDROID_DIR}/../../../tm/ tm_build)
+ target_link_libraries(${CMAKE_PROJECT_NAME} tm)
```

这将实例化一个与之前在我们的 JavaScript 规范文件中定义的名称为`NativeSampleModule`的`NativeSampleModule`相关联的对象。

## 4. C++ 原生代码

在最后一步中，您需要编写一些原生代码来连接 JavaScript 端和本地平台。这个过程包括两个主要步骤：

- 运行**Codegen**以查看它生成了什么。
- 编写您的原生代码，实现生成的接口。

### 运行 Codegen

:::info 提示
阅读 [Codegen](./pillars-codegen) 指南获取更多信息。
:::

在 iOS 上，每次在`ios`文件夹中执行时都会运行 Codegen：

```sh
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

您可以检查位于`CxxTurboModulesGuide/ios/build/generated/ios`文件夹内的生成的 `AppSpecsJSI.h` 和 `AppSpecsJSI-generated.cpp` 文件。

这些文件以 `AppSpecs` 为前缀，因为这与之前添加到 `package.json` 的 `codegenConfig.name` 参数匹配。

在 Android 上，每次执行以下命令时都会运行 Codegen：

```sh
yarn android
```

您可以检查位于 `CxxTurboModulesGuide/android/app/build/generated/source/codegen/jni` 文件夹内的生成的 `AppSpecsJSI.h` 和 `AppSpecsJSI-generated.cpp` 文件。

只有当您更改了 JavaScript 规范时才需要重新运行 codegen。

JavaScript 规范文件生成的 C++函数如下：

```cpp
virtual jsi::String reverseString(jsi::Runtime &rt, jsi::String input) = 0;
```

你可以直接使用较低级别的 `jsi::` 类型进行工作，但为了方便起见，C++ Turbo Native 模块会自动将其桥接到 `std::` 类型。

### 实现

现在创建一个名为 `NativeSampleModule.h` 的文件，内容如下：

:::note 备注
由于 CMake 和 CocoaPod 设置的当前差异，我们需要一些技巧来在每个平台上包含正确的 Codegen 头文件。
:::

```cpp
#pragma once

#if __has_include(<React-Codegen/AppSpecsJSI.h>) // CocoaPod headers on Apple
#include <React-Codegen/AppSpecsJSI.h>
#elif __has_include("AppSpecsJSI.h") // CMake headers on Android
#include "AppSpecsJSI.h"
#endif
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

在这种情况下，您可以使用任何与`jsi::String`相对应的 C++类型 - 默认类型或[自定义类型](./cxx-custom-types.md)。但是，您不能指定不兼容的类型，例如`bool`、`float`或者 `std::vector<>`，因为它们无法与 `jsi::String` 进行“桥接”，从而导致编译错误。

现在，请添加一个名为 `NativeSampleModule.cpp` 的文件，并对其进行实现：

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

我们在`ios`文件夹中添加了新的 C++文件，如下所示：

```sh
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

对于 iOS 来说，在 Xcode 中它们会出现在`Pods`目标下的`Development Pods \ TurboModules`子文件夹中。

现在你应该能够同时编译你的 Android 和 iOS 应用程序了。

```sh
CxxTurboModulesGuide
├── android
│   └── app
│       │── src
│       │   └── main
│       │       └── jni
│       │           ├── CMakeLists.txt
│       │           └── OnLoad.cpp
│       └── build.gradle (updated)
├── ios
│   └── CxxTurboModulesGuide
│       └── AppDelegate.mm (updated)
├── js
│   └── App.tsx|jsx (updated)
└── tm
    ├── CMakeLists.txt
    ├── NativeSampleModule.h
    ├── NativeSampleModule.cpp
    ├── NativeSampleModule.ts|js
    └── TurboModules.podspec
```

## 5. 将 C++ Turbo 原生模块添加到您的应用程序

为了演示目的，我们可以在我们的应用程序的`App.tsx|jsx`中更新以下条目：

```diff
//...
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
+ import NativeSampleModule from './tm/NativeSampleModule';
//...
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
+         <Section title="Cxx TurboModule">
+          NativeSampleModule.reverseString(...) ={' '}
+          {NativeSampleModule.reverseString(
+            'the quick brown fox jumps over the lazy dog'
+          )}
+         </Section>;
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
//...
```

运行应用以查看您的 C++ Turbo 原生模块的效果！

## App TurboModuleProvider [可选]

通过声明一个 AppTurboModuleProvider，您可以避免在添加多个 C++ Turbo 原生模块时出现一些代码重复：

```cpp title="AppTurboModuleProvider.h"
#pragma once

#include <ReactCommon/TurboModuleBinding.h>
#include <memory>
#include <string>

namespace facebook::react {

class AppTurboModuleProvider {
 public:
  std::shared_ptr<TurboModule> getTurboModule(
      const std::string& name,
      std::shared_ptr<CallInvoker> jsInvoker) const;
};

} // namespace facebook::react
```

相应实现：

```cpp title="AppTurboModuleProvider.cpp"
#include "AppTurboModuleProvider.h"
#include "NativeSampleModule.h"

namespace facebook::react {

std::shared_ptr<TurboModule> AppTurboModuleProvider::getTurboModule(
    const std::string& name,
    std::shared_ptr<CallInvoker> jsInvoker) const {
  if (name == "NativeSampleModule") {
    return std::make_shared<facebook::react::NativeSampleModule>(jsInvoker);
  }
  // Other C++ Turbo Native Modules for you app
  return nullptr;
}

} // namespace facebook::react
```

然后在 Android 的`OnLoad.cpp`和 iOS 的`AppDelegate.mm`相应的函数中复用它：

```cpp
static facebook::react::AppTurboModuleProvider appTurboModuleProvider;
return appTurboModuleProvider.getTurboModule(name, jsInvoker);
```

## 调用特定操作系统的 API

您仍然可以在编译单元中调用特定于操作系统的函数（例如，在苹果上使用`NS/CF` API 或在 Windows 上使用`Win32/WinRT` API），只要方法签名只使用 `std::` 或 `jsi::` 类型。

对于苹果特定的 API，您需要将实现文件的扩展名从`.cpp`更改为`.mm`，以便能够使用 `NS/CF` API。

## 扩展 C++ Turbo 原生模块

如果您需要支持尚未支持的某些类型，请参阅[此其他指南](./cxx-custom-types.md)。

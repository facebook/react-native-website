---
id: pillars-turbomodules
title: TurboModules
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

如果您使用过 React Native，您可能了解过 [Native Modules](../native-modules-intro.md) 这个概念。它可以通过 React Native 的「Bridge」帮助 JavaScript 和原生代码进行交互，并使用跨平台的数据格式 JSON 进行通讯。

Turbo Native Modules 与 Native Modules 相比，存在以下[优势](./why)：

- 各个平台的强类型接口声明是一致的；
- 您可以使用 C++ 编写模块或迁移其它平台的原生代码，以此避免在跨平台重复实现模块；
- 模块支持懒加载，可以加快 App 启动速度；
- 通过替换 Bridge 为 JSI（使用原生代码编写的 JavaScript 接口），提升 JavaScript 与原生代码的通讯效率。

本文档将指导您如何创建一个兼容 React Native 0.70.0 的基础 Turbo Native Module 。

:::caution 注意
使用 Turbo Native Module 前必须**开启新架构**。若要了解如何将代码迁移到新架构，您可参考此[迁移指南](../new-architecture-intro)。
:::

## 如何创建 TurboModule

创建一个 Turbo Native Module 分为以下步骤：

1.  声明 JavaScript 接口类型；
2.  配置模块以支持 Codegen 自动生成脚手架代码；
3.  编写原生代码完成模块实现。

## 1. 目录配置

为了使模块与 App 保持解耦，有个不错的方案是将模块从 App 抽离出来，并添加为 App 的一个依赖。如果您打算开发一个开源的 Turbo Native Module，您同样也需要这么做。

打开您的 App，创建一个名为 `RTNCalculator` 的目录。**RTN** 的意思是「**R**eac**t** **N**ative」，同时它也是推荐的 React Native 模块前缀命名。

在 `RTNCalculator` 目录中，创建三个子目录：`js`、`ios` 和 `android`。创建后的目录结构是这样的：

```sh
TurboModulesGuide
├── MyApp
└── RTNCalculator
    ├── android
    ├── ios
    └── js
```

## 2. 声明 JavaScript 接口

**新架构**要求必须使用强类型风格语言声明 JavaScript 接口（[Flow](https://flow.org/) 和 [TypeScript](https://www.typescriptlang.org/) 皆可）。`Codegen` 会根据这些接口声明来生成强类型的语言，其中包括 C++、Objective-C 和 Java。

对于声明类型的代码文件必须满足以下两点要求：

1.  文件必须使用 `Native<MODULE_NAME>` 命名，在使用 Flow 时，以 `.js` 或 `.jsx` 为后缀名；在使用 Typescript 时，以 `.ts` 或 `.tsx` 为后缀名。Codegen 只会找到匹配这些命名规则的文件；
2.  代码中必须要输出 `TurboModuleRegistrySpec` 对象

<Tabs groupId="turbomodule-specs" defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```typescript title="NativeCalculator.js"
// @flow
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}
export default (TurboModuleRegistry.get<Spec>(
  'RTNCalculator'
): ?Spec);
```

</TabItem>
<TabItem value="typescript">

```typescript title="NativeCalculator.ts"
import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}

export default TurboModuleRegistry.get<Spec>(
  'RTNCalculator',
) as Spec | null;
```

</TabItem>
</Tabs>

在代码顶部需导入以下两个声明文件：

- 类型 `TurboModule` ：定义 Turbo Native Module 的基础接口
- JS 模块 `TurboModuleRegistry`：包含了用于加载 Turbo Native Module 的函数

代码的第二个部分就是针对 Turbo Native Module 的接口声明。在本例中，接口声明了 `add` 函数，它将用于接受两个数字并返回一个包装数字的 Promise。为声明 Turbo Native Module，此接口**必须**命名为 `Spec`。

最后，调用 `TurboModuleRegistry.get` 并传入模块名，它将在 Turbo Native Module 可用的时候进行加载。

:::caution 注意
当我们在编写 JavaScript 代码时，如果没有配置好对应的模块或依赖安装，就从第三方库导入类型，可能会使的您的 IDE 不能正确载入导入声明，从而显示错误或警告。这种情况是正常的，它不会在您添加模块到 App 的时候出现问题。
:::

## 3. 模块配置

接下来，您需要为 [**Codegen**](pillars-codegen.md) 和自动链接添加一些配置。

有一些配置文件在 iOS 和 Android 平台是通用的，而有的仅能在某一平台使用。

### Shared

shared 是 `package.json` 文件中的一个配置项，它将在 yarn 安装您的模块时被调用。请在 `RTNCalculator` 的根目录创建 `package.json` 文件。

```json title="package.json"
{
  "name": "rtn-calculator",
  "version": "0.0.1",
  "description": "Add numbers with TurboModules",
  "react-native": "js/index",
  "source": "js/index",
  "files": [
    "js",
    "android",
    "ios",
    "rtn-calculator.podspec",
    "!android/build",
    "!ios/build",
    "!**/__tests__",
    "!**/__fixtures__",
    "!**/__mocks__"
  ],
  "keywords": ["react-native", "ios", "android"],
  "repository": "https://github.com/<your_github_handle>/rtn-calculator",
  "author": "<Your Name> <your_email@your_provider.com> (https://github.com/<your_github_handle>)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/<your_github_handle>/rtn-calculator/issues"
  },
  "homepage": "https://github.com/<your_github_handle>/rtn-calculator#readme",
  "devDependencies": {},
  "peerDependencies": {
    "react": "*",
    "react-native": "*"
  },
  "codegenConfig": {
    "name": "RTNCalculatorSpec",
    "type": "modules",
    "jsSrcsDir": "js",
    "android": {
      "javaPackageName": "com.rtncalculator"
    }
  }
}
```

文件上面的内容包含了一些描述性的信息，比如组件名、版本和代码文件。务必记得设置使用 `<>` 包裹的占位符，如替换所有的`<your_github_handle>`、`<Your Name>`、`<your_email@your_provider.com>` 等标记。

接下来是 npm 包的依赖。在本指导中，您会用到 `react` 和 `react-native`。

最后，将 **Codegen** 的配置声明到 `codegenConfig` 字段。`codegenConfig` 是一个用于存放要生成的第三方库的对象数组，每个对象又包含其它三个字段：

- `name`：第三方库的名称。按照惯例，名称应以 `Spec` 为结尾
- `type`：在这个 npm 包里的模块类型。在本例中，我们开发的是 Turbo Native Module，所以值为 `modules`
- `jsSrcsDir`：用于找到 `js` 接口声明文件的相对路径，它将被 **Codegen** 解析
- `android.javaPackageName`：由 **Codegen** 生成的 Java 包名 (需与 AndroidManifest.xml 中包名一致)

### iOS：创建 `podspec` 文件

针对 iOS 平台，您需要创建一个 `rtn-calculator.podspec` 文件，它将您的模块定义为 App 里的一个依赖。文件要放在 `RTNCalculator` 根目录，与 `ios` 目录处于同一个位置。

文件内容如下：

```ruby title="rtn-calculator.podspec"
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name            = "rtn-calculator"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"

  install_modules_dependencies(s)
end
```

这个 `.podspec` 文件需要和 `package.json` 处于同一个目录，并且它的命名应该取自我们在 `package.json` 的 `name` 字段配置的值：`rtn-calculator`。

文件首部分设置了一些在后续会使用到的变量。后面一部分内容是一些用来配置 pod 的信息，比如命名、版本和功能描述等。其余内容是一些在新架构中必须要配置的依赖。

### Android: `build.gradle`, `AndroidManifest.xml`, `ReactPackage` 类

若要在 Android 平台运行 **Codegen**，您需要创建三个文件：

1.  带有 `Codegen` 配置信息的 `build.gradle` 文件
1.  `AndroidManifest.xml`
1.  一个实现 `ReactPackage` 接口的 Java 类

在文件创建完成后，`android` 目录文件结构应该是这样的：

```title="Android Folder Structure"
android
├── build.gradle
└── src
    └── main
        ├── AndroidManifest.xml
        └── java
            └── com
                └── rtncalculator
                    └── CalculatorPackage.java
```

#### `build.gradle`

首先，在 `android` 目录创建 `build.gradle` 文件，并配置以下内容：

```kotlin title="build.gradle"
buildscript {
  ext.safeExtGet = {prop, fallback ->
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
  }
  repositories {
    google()
    gradlePluginPortal()
  }
  dependencies {
    classpath("com.android.tools.build:gradle:7.1.1")
  }
}

apply plugin: 'com.android.library'
apply plugin: 'com.facebook.react'

android {
  compileSdkVersion safeExtGet('compileSdkVersion', 31)
}

repositories {
  maven {
    // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
    url "$projectDir/../node_modules/react-native/android"
  }
  mavenCentral()
  google()
}

dependencies {
  implementation 'com.facebook.react:react-native:+'
}
```

#### `AndroidManifest.xml`

其次，创建 `android/src/main` 目录，然后在这个目录内创建 `AndroidManifest.xml` 文件，并编写以下代码：

```xml title="AndroidManifest.xml"
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.rtncalculator">
</manifest>
```

这个 manifest 文件的用途是声明您开发的模块的 Java 包。

#### `ReactPackage` 类

最后，您需要一个继承 `TurboReactPackage` 接口的类。在运行 **Codegen** 前，您不用完整实现这个类。对于 App 而言，一个没有实现接口的空类就已经能当做一个 React Native 依赖，**Codegen** 会尝试生成其脚手架代码。

创建 `android/src/main/java/com/rtncalculator` 目录，在这个目录内创建 `CalculatorPackage.java` 文件

```java title="CalculatorPackage.java"
package com.rtncalculator;

import androidx.annotation.Nullable;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;

import java.util.Collections;
import java.util.List;

public class CalculatorPackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
          return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
      return null;
  }
}
```

`ReactPackage` 接口的用途是让 React Native 为使用 App 中的 `ViewManager` 和 `Native Modules`，识别出哪些原生类需要在第三方库里导出。

## 4. 原生代码

最后一步是让您的 Turbo Native Module 准备运行，您需要编写一些让 JavaScript 与原生平台交互的代码。这包含两个主要步骤：

- 运行 **Codegen** 并查看其生成的代码；
- 编写原生代码，实现 **Codegen** 生成的接口。

在开发一个使用 Turbo Native Module 的 React Native App 时，将由 App 负责使用 **Codegen** 生成代码。但在开发 TurboModule 第三方库时，我们需要引用 **Codegen** 的生成代码，因此查看生成的代码是很有帮助的。

首先，为生成 iOS 和 Android 平台的代码，本指导将向您展示如何手动执行由 **Codegen** 生成的脚本，以及生成所需要的平台代码。您可以在[这里](pillars-codegen.md)了解到更多关于 **Codegen** 的内容。

:::caution 注意
**Codegen** 生成的代码不该提交到版本管理系统，React Native 会在 App 构建的时候自动生成代码。这是为了确保在 App 内，所有第三方库都正确使用针对某一 React Native 版本的生成代码。
:::

### iOS

#### iOS 的代码生成

为生成 iOS 平台的代码，您需要在 Terminal 执行以下命令：

```sh title="Running Codegen for iOS"
cd MyApp
yarn add ../RTNCalculator
cd ..
node MyApp/node_modules/react-native/scripts/generate-codegen-artifacts .js \
  --path MyApp/ \
  --outputPath RTNCalculator/generated/
```

这脚本首先使用 `yarn add` 将 `RTNCalculator` 模块添加到 App。然后通过 `generate-codegen-artifacts.js` 脚本调用 Codegen。

`--path` 选项用于声明 App 的路径，`--outputPath` 选项用于声明 Codegen 生成代码的存放路径。

命令执行后将呈现以下目录文件结构：

```sh
generated
└── build
    └── generated
        └── ios
            ├── FBReactNativeSpec
            │   ├── FBReactNativeSpec-generated.mm
            │   └── FBReactNativeSpec.h
            ├── RCTThirdPartyFabricComponentsProvider.h
            ├── RCTThirdPartyFabricComponentsProvider.mm
            ├── RTNCalculatorSpec
            │   ├── RTNCalculatorSpec-generated.mm
            │   └── RTNCalculatorSpec.h
            └── react
                └── renderer
                    └── components
                        └── rncore
                            ├── ComponentDescriptors.h
                            ├── EventEmitters.cpp
                            ├── EventEmitters.h
                            ├── Props.cpp
                            ├── Props.h
                            ├── RCTComponentViewHelpers.h
                            ├── ShadowNodes.cpp
                            └── ShadowNodes.h
```

Turbo Native Module 接口的路径为 `generated/build/generated/ios/RTNCalculatorSpec`。

查看 [Codegen](./pillars-codegen) 章节文档可获得更多文件生成相关细节。

:::note 备注
使用 **Codegen** 生成脚手架代码时，iOS 平台中不会自动清空 `build` 目录。假如您需要修改接口声明文件的命名，并重新执行了 **Codegen**，旧的代码会保留下来。如果发生了这种情况，您需要在重新执行 **Codegen** 之前删除 `build` 目录。

```
cd MyApp/ios
rm -rf build
```

:::

#### 编写 iOS 原生代码

现在可以开始为您的 Turbo Native Module 编写原生代码了。在 `RTNCalculator/ios` 目录创建两个文件：

1.  `RTNCalculator.h`：模块的头文件
2.  `RTNCalculator.mm`：实现模块的代码

##### RTNCalculator.h

```objc title="RTNCalculator.h"
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNCalculator : NSObject <RCTBridgeModule>

@end

NS_ASSUME_NONNULL_END
```

此文件定义了 `RTNCalculator` 接口，我们可以在这里添加可被视图触发的方法。在本指引中，我们什么都不用做，所以这个接口是空的。

##### RTNCalculator.mm

```objc title="RTNCalculator.mm"
#import "RTNCalculatorSpec.h"
#import "RTNCalculator.h"

@implementation RTNCalculator

RCT_EXPORT_MODULE(RTNCalculator)

RCT_REMAP_METHOD(add, addA:(NSInteger)a
                      andB:(NSInteger)b
                withResolver:(RCTPromiseResolveBlock) resolve
                withRejecter:(RCTPromiseRejectBlock) reject)
{
    NSNumber *result = [[NSNumber alloc] initWithInteger:a+b];
    resolve(result);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}

@end
```

调用 `RCT_EXPORT_MODULE` 是至关重要的，它将导出模块让 React Native 能够加载此 Turbo Native Module。

然后使用宏定义 `RCT_REMAP_METHOD` 暴露 `add` 方法。

最后，`getTurboModule` 方法将获取 Turbo Native Module 实例，以此使 JavaScript 能够执行模块的方法。这个方法在 `RTNCalculatorSpec.h` 中声明，并且是之前由 Codegen 生成的代码。

:::info 提示
您可以查看 [RCTBridgeModule.h](https://github.com/facebook/react-native/blob/main/React/Base/RCTBridgeModule.h) 代码，了解更多用于导出模块及其方法的宏定义。
:::

### Android

Android 的操作与 iOS 类似，我们需要先生成针对 Android 平台的代码，然后再编写 TurboModule 的原生代码。

#### Android 的代码生成

我们需要手动调用 Codegen 来生成 Android 平台代码。这和我们在 iOS 平台的操作相似：首先向 App 添加 Java 包，然后调用脚本生成代码。

```sh title="Running Codegen for Android"
cd MyApp
yarn add ../RTNCalculator
cd android
./gradlew generateCodegenArtifactsFromSchema
```

这个脚本会向 App 添加 Java 包，然后打开 `android` 目录，创建一个 Gradle 任务来生成代码。

:::note 备注
在运行 **Codegen** 之前，您需要在 Android 中的 App 启动新架构。您可以通过修改 `gradle.properties` 文件中的 `newArchEnabled` 属性，将 `false` 改为 `true`。
:::

生成后的代码保存在 `MyApp/node_modules/rtn-calculator/android/build/generated/source/codegen` 目录，并呈以下结构：

```title="Android 生成代码"
codegen
├── java
│   └── com
│       └── RTNCalculator
│           └── NativeCalculatorSpec.java
├── jni
│   ├── Android.mk
│   ├── RTNCalculator-generated.cpp
│   ├── RTNCalculator.h
│   └── react
│       └── renderer
│           └── components
│               └── RTNCalculator
│                   ├── ComponentDescriptors.h
│                   ├── EventEmitters.cpp
│                   ├── EventEmitters.h
│                   ├── Props.cpp
│                   ├── Props.h
│                   ├── ShadowNodes.cpp
│                   └── ShadowNodes.h
└── schema.json
```

#### 编写 Android 原生代码

Android 平台上 Turbo Native Module 的原生代码需执行如下步骤：

1.  创建用于实现模块的 `CalculatorModule.java`
2.  修改之前生成的 `CalculatorPackage.java`

您的 Android 第三方库目录文件结构应为如下：

```title="Android 目录结构"
android
├── build.gradle
└── src
    └── main
        ├── AndroidManifest.xml
        └── java
            └── com
                └── rtncalculator
                    ├── CalculatorModule.java
                    └── CalculatorPackage.java
```

##### 创建 `CalculatorModule.java`

```java title="CalculatorModule.java"
package com.rtncalculator;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalculatorModule extends NativeCalculatorSpec {

    public static String NAME = "RTNCalculator";

    CalculatorModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public void add(double a, double b, Promise promise) {
        promise.resolve(a + b);
    }
}
```

这个类实现了模块的功能，它继承了 `NativeCalculatorSpec` 类，而这个类是之前从 JavaScript 接口声明文件 `NativeCalculator` 自动生成的。

##### 修改 `CalculatorPackage.java`

```diff title="CalculatorPackage.java"
package com.rtncalculator;

import androidx.annotation.Nullable;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
+ import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;

import java.util.Collections;
import java.util.List;
+ import java.util.HashMap;
+ import java.util.Map;

public class CalculatorPackage extends TurboReactPackage {

  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
+      if (name.equals(CalculatorModule.NAME)) {
+          return new CalculatorModule(reactContext);
+      } else {
          return null;
+      }
  }


  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
-      return null;
+      return () -> {
+          final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
+          moduleInfos.put(
+                  CalculatorModule.NAME,
+                  new ReactModuleInfo(
+                          CalculatorModule.NAME,
+                          CalculatorModule.NAME,
+                          false, // canOverrideExistingModule
+                          false, // needsEagerInit
+                          true, // hasConstants
+                          false, // isCxxModule
+                          true // isTurboModule
+          ));
+          return moduleInfos;
+      };
  }
}
```

这就是 Android 平台原生代码的最后一部分，它定义了 `TurboReactPackage` 对象，这个对象将用于 App 的模块加载。

## 5. 将 Turbo Native Module 添加到 App

现在您可以将 Turbo Native Module 添加到您的 App 中了。

### Shared

首先，您需要将包含模块的 NPM 包添加到您的 App。您可以使用以下命令执行此操作：

```sh
cd MyApp
yarn add ../RTNCalculator
```

此命令会将 `RTNCalculator` 模块添加到 App 内的 `node_modules` 目录。

### iOS

接下来，您需要添加新的依赖到您的 iOS 工程，您也可以通过以下命令执行此操作：

```sh
cd ios
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

此命令会查询 iOS 工程里的所有的依赖，并对它们进行安装。`RCT_NEW_ARCH_ENABLED=1` 的意思是 **Cocoapods** 在执行 **Codegen** 前需要一些额外的操作。

:::note 备注
在使用 `RCT_NEW_ARCH_ENABLED=1` 之前，您可能需要先执行一遍 `bundle install`。后续除非修改了 Rudy 依赖，您不必再次运行 `bundle install`。
:::

### Android

在配置 Android 之前，您需要先开启**新架构**：

1.  打开 `android/gradle.properties`；
2.  滑到文件底部，将 `newArchEnabled` 的值从 `false` 修改为 `true`。

### JavaScript

现在您可以在您的 App 中使用 Turbo Native Module 了！

以下是一个在 App.js 中调用 `add` 方法的例子：

```js title="App.js"
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  Button,
} from 'react-native';
import RTNCalculator from 'rtn-calculator/js/NativeCalculator.js';

const App: () => Node = () => {
  const [result, setResult] = useState<number | null>(null);
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <Text style={{marginLeft: 20, marginTop: 20}}>
        3+7={result ?? '??'}
      </Text>
      <Button
        title="Compute"
        onPress={async () => {
          const value = await RTNCalculator.add(3, 7);
          setResult(value);
        }}
      />
    </SafeAreaView>
  );
};
export default App;
```

快去尝试一下，看看 Turbo Native Module 的运行效果吧！

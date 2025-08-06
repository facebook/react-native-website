---
id: pillars-fabric-components
title: Fabric 组件
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

Fabric 组件是一种使用 [Fabric 渲染器](https://reactnative.dev/architecture/fabric-renderer)渲染并展示在屏幕上的 UI 组件。在**新架构**中，使用 Fabric 组件替代原生组件具有以下[优势](./why)：

- 各个平台的强类型接口声明是一致的；
- 您可以使用 C++ 编写组件或迁移其它平台的原生代码，以此避免在跨平台重复实现组件；
- 通过替换 Bridge 为 JSI（使用原生代码编写的 JavaScript 接口），提升 JavaScript 与原生代码的通讯效率。

在开发 Fabric 组件前，您需要先创建一个 **JavaScript 接口描述文件**。之后 [**Codegen**](./pillars-codegen) 会根据这个文件创建一些 C++ 脚手架代码，用于将部分组件逻辑（比如调用原生平台接口能力）与 React Native 结合起来。C++ 代码在各个平台都是一样的，只要组件能够与生成的 C++ 代码连接起来，就可以导入到 App 并运行。

接下来的内容将一步步指导您针对 React Native 0.70.0 创建一个 Fabric 组件。

:::caution 注意
Fabric 组件仅适用于**新架构**。若您想了解如何将 App 迁移到新架构，可前往[迁移指南](../new-architecture-intro)。
:::

## 如何创建 Fabric 组件

若要创建一个 Fabric 组件，您需要遵循以下步骤：

1. 声明 JavaScript 接口；
2. 配置组件以用于 **Codegen** 生成统一代码，生成的代码可添加为 App 的依赖；
3. 编写所需的原生代码。

完成这些步骤后，组件就可以在 App 里使用了。本指导将向您介绍如何将其添加到 App，并利用*自动链接*使其能在 JavaScript 代码引用。

## 1. 目录配置

为了使组件与 App 保持解耦，有个不错的方案是将组件从 App 抽离出来，并添加为 App 的一个依赖。如果您打算开发一个开源的 Fabric 组件，您同样也需要这么做。

在本指导中，您将开发一个用于在屏幕上将文本居中显示的 Fabric 组件。

在与 App 平级的目录，创建名为 `RTNCenteredText` 的目录。在这个目录中，创建三个子目录：`js`、`ios` 和 `android`。创建后的目录结构是这样的：

```sh
.
├── MyApp
└── RTNCenteredText
    ├── android
    ├── ios
    └── js
```

## 2. 声明 JavaScript 接口

**新架构**要求必须使用强类型风格语言声明 JavaScript 接口（[Flow](https://flow.org/) 和 [TypeScript](https://www.typescriptlang.org/) 皆可）。`Codegen` 会根据这些接口声明来生成强类型的语言，其中包括 C++、Objective-C 和 Java。

对于声明类型的代码文件必须满足以下两点要求：

1.  文件必须使用 `<MODULE_NAME>NativeComponent` 命名，在使用 Flow 时，以 `.js` 或 `.jsx` 为后缀名；在使用 Typescript 时，以 `.ts` 或 `.tsx` 为后缀名。Codegen 只会找到匹配这些命名规则的文件；
2.  代码中必须要输出 `HostComponent` 对象。

以下是使用 Flow 和 TypeScript 声明的 `RTNCenteredText` 组件。在 `js` 目录中，创建一个命名为 `RTNCenteredText` 并带有相应后缀名的文件。

<Tabs groupId="fabric-component-specs" defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value='flow'>

```typescript
// @flow strict-local

import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  text: ?string,
  // add other props here
|}>;

export default (codegenNativeComponent<NativeProps>(
   'RTNCenteredText',
): HostComponent<NativeProps>);
```

</TabItem>
<TabItem value='typescript'>

```typescript
import type {ViewProps} from 'ViewPropTypes';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  text?: string;
  // 添加其它 props
}

export default codegenNativeComponent<NativeProps>(
  'RTNCenteredText',
) as HostComponent<NativeProps>;
```

</TabItem>
</Tabs>

在声明文件的顶部导入了一些内容。以下是开发 Fabric 组件必须要导入的内容：

- `HostComponent` 类型: 导出的组件需要与这个类型保持一致；
- `codegenNativeComponent` 函数：负责将组件注册到 JavaScript 运行时。

声明文件的中间部分包含了组件的 **props**。[Props](https://reactnative.dev/docs/next/intro-react#props)（"properties" 的缩写）是用于自定义 React 组件的参数信息。在本例中，您将需要控制组件的 `text` 属性。

在声明文件的最后部分，导出了泛型函数 `codegenNativeComponent` 的返回值，此函数需要传递组件的名称。

:::caution 注意
当我们在编写 JavaScript 代码时，如果没有配置好对应的模块或依赖安装，就从第三方库导入类型，可能会使的您的 IDE 不能正确载入导入声明，从而显示错误或警告。这些问题会在 Fabric 添加为 App 的依赖后得到解决。
:::

## 3. 组件配置

接下来，您需要为 [**Codegen**](pillars-codegen.md) 和自动链接添加一些配置。

有一些配置文件在 iOS 和 Android 平台是通用的，而有的仅能在某一平台使用。

### Shared

shared 是 `package.json` 文件中的一个配置项，它将在 yarn 安装您的模块时被调用，请在 `RTNCenteredText` 的根目录创建 `package.json` 文件。

```json title="package.json"
{
  "name": "rtn-centered-text",
  "version": "0.0.1",
  "description": "Showcase a Fabric component with a centered text",
  "react-native": "js/index",
  "source": "js/index",
  "files": [
    "js",
    "android",
    "ios",
    "rtn-centered-text.podspec",
    "!android/build",
    "!ios/build",
    "!**/__tests__",
    "!**/__fixtures__",
    "!**/__mocks__"
  ],
  "keywords": ["react-native", "ios", "android"],
  "repository": "https://github.com/<your_github_handle>/rtn-centered-text",
  "author": "<Your Name> <your_email@your_provider.com> (https://github.com/<your_github_handle>)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/<your_github_handle>/rtn-centered-text/issues"
  },
  "homepage": "https://github.com/<your_github_handle>/rtn-centered-text#readme",
  "devDependencies": {},
  "peerDependencies": {
    "react": "*",
    "react-native": "*"
  },
  "codegenConfig": {
    "name": "RTNCenteredTextSpecs",
    "type": "components",
    "jsSrcsDir": "js"
  }
}
```

文件上面的内容包含了一些描述性的信息，比如组件名、版本和代码文件。务必记得设置使用 `<>` 包裹的占位符，如替换所有的`<your_github_handle>`、`<Your Name>`、`<your_email@your_provider.com>` 等标记。

接下来是 npm 包的依赖。在本指导中，您会用到 `react` 和 `react-native`。

最后，将 **Codegen** 的配置声明到 `codegenConfig` 字段。`codegenConfig` 是一个用于存放要生成的第三方库的对象数组，每个对象又包含其它三个字段：

- `name`：第三方库的名称。按照惯例，名称应以 `Spec` 为结尾
- `type`：在这个 npm 包里的模块类型。在本例中，我们开发的是 Fabric 组件，所以值为 `components`
- `jsSrcsDir`：用于找到 `js` 接口声明文件的相对路径，它将被 **Codegen** 解析

### iOS：创建 `podspec` 文件

针对 iOS 平台，您需要创建一个 `rtn-centered-text.podspec` 文件，它将您的模块定义为 App 里的一个依赖。文件要放在 `RTNCenteredText` 根目录，与 `ios` 目录处于同一个位置。

文件内容如下：

```ruby title="rtn-centered-text.podspec"
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

folly_version = '2021.07.22.00'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name            = "rtn-centered-text"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"

  s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
  s.pod_target_xcconfig    = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
    "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }

  s.dependency "React-RCTFabric"
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly", folly_version
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
end
```

这个 `.podspec` 文件需要和 `package.json` 处于同一个目录，并且它的命名应该取自我们在 `package.json` 的 `name` 字段配置的值：`rtn-centered-text`。

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
                └── rtncenteredtext
                    └── RTNCenteredTextPackage.java
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

  defaultConfig {
    minSdkVersion safeExtGet('minSdkVersion', 21)
    targetSdkVersion safeExtGet('targetSdkVersion', 31)
    buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", "true")
  }
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
          package="com.rtncenteredtext">
</manifest>
```

这个 manifest 文件的用途是声明您开发的模块的 Java 包。

#### `ReactPackage`

最后，您需要一个继承 `TurboReactPackage` 接口的类。在运行 **Codegen** 前，您不用完整实现这个类。对于 App 而言，一个没有实现接口的空类就已经能当做一个 React Native 依赖，**Codegen** 会尝试生成其脚手架代码。

创建 `android/src/main/java/com/rtncenteredtext` 目录，在这个目录内创建 `RTNCenteredTextPackage.java` 文件

```java title="RTNCenteredTextPackage"
package com.rtncenteredtext;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

public class RTNCenteredTextPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

}
```

`ReactPackage` 接口的用途是让 React Native 为使用 App 中的 `ViewManager` 和 `Native Modules`，识别出哪些原生类需要在第三方库里导出。

## 4. 原生代码

最后一步需要您编写用于 JavaScript 端的组件与原生平台交互的原生代码，这包含两个主要步骤：

1. 运行 **Codegen** 并查看其生成的代码；
2. 编写原生代码。

在开发一个使用 Fabric 组件 的 React Native App 时，将由 App 负责使用 **Codegen** 生成代码。但在开发 Fabric 组件的第三方库时，我们需要引用 **Codegen** 的生成代码，因此查看生成的代码是很有帮助的。

首先，为生成 iOS 和 Android 平台的代码，本指导将向您展示如何手动执行由 **Codegen** 生成的脚本，以及生成所需要的平台代码。您可以在[这里](./pillars-codegen.md)了解到更多关于 **Codegen** 的内容。

:::caution 注意
**Codegen** 生成的代码不该提交到版本管理系统，React Native 会在 App 构建的时候自动生成代码。这是为了确保在 App 内，所有第三方库都正确使用针对某一 React Native 版本的生成代码。
:::

### iOS

#### iOS 的代码生成

为生成 iOS 平台的代码，您需要在 Terminal 执行以下命令：

```sh
cd MyApp
yarn add ../RTNCenteredText
cd ..
node MyApp/node_modules/react-native/scripts/generate-artifacts.js \
  --path MyApp/ \
  --outputPath RTNCenteredText/generated/
```

这脚本首先使用 `yarn add` 将 `RTNCenteredText` 模块添加到 App。然后通过 `generate-artifacts.js` 脚本调用 Codegen。

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
            └── react
                └── renderer
                    └── components
                        ├── RTNCenteredTextSpecs
                        │   ├── ComponentDescriptors.h
                        │   ├── EventEmitters.cpp
                        │   ├── EventEmitters.h
                        │   ├── Props.cpp
                        │   ├── Props.h
                        │   ├── RCTComponentViewHelpers.h
                        │   ├── ShadowNodes.cpp
                        │   └── ShadowNodes.h
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

生成的组件的路径为 `generated/build/generated/ios/react/renderer/components/RTNCenteredTextSpecs`，此目录包含了您在开发组件时必备的生成代码。

查看 [Codegen](./pillars-codegen) 章节文档可获得更多文件生成相关细节。

:::note 备注
使用 **Codegen** 生成脚手架代码时，iOS 平台中不会自动清空 `build` 目录。假如您需要修改接口声明文件的命名，并重新执行了 **Codegen**，旧的代码会保留下来。如果发生了这种情况，您需要在重新执行 **Codegen** 之前删除 `build` 目录。

```
cd MyApp/ios
rm -rf build
```

:::

#### 编写 iOS 原生代码

现在脚手架代码已生成完毕，是时候为您的 Fabric 组件编写原生代码了。

您需要在 `RTNCenteredText/ios` 目录创建三个文件：

1. `RTNCenteredTextManager.mm`：声明组件导出内容的 Objective-C++ 文件上面的内容包含了一些描述性的信息
2. `RTNCenteredText.h`：原生视图的头文件
3. `RTNCenteredText.mm`：实现原生视图的代码文件

##### RTNCenteredTextManager.mm

```objc title="RTNCenteredTextManager.mm"
#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>

@interface RTNCenteredTextManager : RCTViewManager
@end

@implementation RTNCenteredTextManager

RCT_EXPORT_MODULE(RTNCenteredText)

RCT_EXPORT_VIEW_PROPERTY(text, NSString)

@end
```

这个文件是针对 Fabric 组件的 Manager。React Native 运行时使用 Manager 对象来注册模块、属性及方法，使其能在 JavaScript 调用。

调用 `RCT_EXPORT_MODULE` 是至关重要的，它将导出模块让 Fabric 获取到并进行实例化。

接下来，你需要暴露 `text` 属性给 Fabric 组件，使用宏定义 `RCT_EXPORT_VIEW_PROPERTY` 来声明属性名及其类型。

:::info 提示
您可以查看 [RCTViewManager.h](https://github.com/facebook/react-native/blob/main/React/Base/RCTViewManager.h) 代码，了解更多用于导出属性、Emitter 及其它结构的宏定义。
:::

##### RTNCenteredText.h

```objc title="RTNCenteredText.h"
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNCenteredText : RCTViewComponentView

@end

NS_ASSUME_NONNULL_END
```

此文件定义了 `RTNCenteredText` 的视图接口，我们可以在这里添加可被视图触发的方法。在本指引中，我们什么都不用做，所以这个接口是空的。

##### RTNCenteredText.mm

```cpp title="RTNCenteredText.mm"
#import "RTNCenteredText.h"

#import <react/renderer/components/RTNCenteredTextSpecs/ComponentDescriptors.h>
#import <react/renderer/components/RTNCenteredTextSpecs/EventEmitters.h>
#import <react/renderer/components/RTNCenteredTextSpecs/Props.h>
#import <react/renderer/components/RTNCenteredTextSpecs/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RTNCenteredText () <RCTRTNCenteredTextViewProtocol>
@end

@implementation RTNCenteredText {
  UIView *_view;
  UILabel *_label;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RTNCenteredTextComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RTNCenteredTextProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];
    _view.backgroundColor = [UIColor redColor];

    _label = [[UILabel alloc] init];
    _label.text = @"Initial value";
    [_view addSubview:_label];

    _label.translatesAutoresizingMaskIntoConstraints = false;
    [NSLayoutConstraint activateConstraints:@[
      [_label.leadingAnchor constraintEqualToAnchor:_view.leadingAnchor],
      [_label.topAnchor constraintEqualToAnchor:_view.topAnchor],
      [_label.trailingAnchor constraintEqualToAnchor:_view.trailingAnchor],
      [_label.bottomAnchor constraintEqualToAnchor:_view.bottomAnchor],
    ]];

    _label.textAlignment = NSTextAlignmentCenter;

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<RTNCenteredTextProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<RTNCenteredTextProps const>(props);

  if (oldViewProps.text != newViewProps.text) {
    _label.text = [[NSString alloc] initWithCString:newViewProps.text.c_str() encoding:NSASCIIStringEncoding];
  }

  [super updateProps:props oldProps:oldProps];
}

@end

Class<RCTComponentViewProtocol> RTNCenteredTextCls(void)
{
  return RTNCenteredText.class;
}
```

这个文件包含了视图的实现代码。首先它导入了部分从 **Codegen** 生成代码。组件必须要遵循由 **Codegen** 生成的特定协议，在本例中为 `RCTRTNCenteredTextViewProtocol`。

接下来定义了静态方法 `(ComponentDescriptorProvider)componentDescriptorProvider`，Fabric 将使用此方法来获得组件的 Descriptor Provider，以此实例化组件对象。

之后是视图的构造器 `init` 方法。在这个方法中，使用 **Codegen** 生成的 `RTNCenteredTextProps` 类型创建一个 `defaultProps` 结构对象特别重要。你需要将其赋值给私有属性 `_props` 以正确初始化 Fabric 组件。方法的后续部分是标准的 Objective-C 代码，作用是使用 AutoLayout 布局创建的视图。

最后还有两个方法，分别是 `updateProps` 和 `RTNCenteredTextCls`。

`updateProps` 会在每次 JavaScript 修改 props 时被 Fabric 调用。通过函数参数传入的 props 会被转换为 `RTNCenteredTextProps` 类型，而且它们会在必要的时候更新原生代码。请注意，要在此方法的最后调用超类的 `[super updateProps]` 方法，否则对象 `props` 和 `oldProps` 会一直保持相同的值，因此您将无法用它们进行操作或更新组件。

`RTNCenteredTextCls` 是个另一个静态方法，用于在运行时正确获取实例的类。

:::caution 注意
与原生组件不同的是，Fabric 组件必须手动实现 `updateProps` 方法。单单使用宏定义 `RCT_EXPORT_XXX` 和 `RCT_REMAP_XXX` 还不足以导出组件的属性。
:::

### Android

Android 的操作与 iOS 类似，我们需要先生成代码，然后再编写组件的原生代码。

#### Android 的代码生成

我们需要手动调用 Codegen 来生成 Android 平台代码。这和我们在 iOS 平台的操作相似：首先向 App 添加 Java 包，然后调用脚本生成代码。

```sh title="Android 的代码生成"
cd MyApp
yarn add ../RTNCenteredText
cd android
./gradlew generateCodegenArtifactsFromSchema
```

这个脚本会向 App 添加 Java 包，然后打开 `android` 目录，创建一个 Gradle 任务来生成代码。

:::note 备注
在运行 **Codegen** 之前，您需要在 Android 中的 App 启动新架构。您可以通过修改 `gradle.properties` 文件中的 `newArchEnabled` 属性，将 `false` 改为 `true`。
:::

生成后的代码保存在 `MyApp/node_modules/rtn-centered-text/android/build/generated/source/codegen` 目录，并呈以下结构：

```title="Android 生成代码"
codegen
├── java
│   └── com
│       └── facebook
│           └── react
│               └── viewmanagers
│                   ├── RTNCenteredTextManagerDelegate.java
│                   └── RTNCenteredTextManagerInterface.java
├── jni
│   ├── Android.mk
│   ├── CMakeLists.txt
│   ├── RTNCenteredText-generated.cpp
│   ├── RTNCenteredText.h
│   └── react
│       └── renderer
│           └── components
│               └── RTNCenteredText
│                   ├── ComponentDescriptors.h
│                   ├── EventEmitters.cpp
│                   ├── EventEmitters.h
│                   ├── Props.cpp
│                   ├── Props.h
│                   ├── ShadowNodes.cpp
│                   └── ShadowNodes.h
└── schema.json
```

你会发现 `codegen/jni/react/renderer/components/RTNCenteredTextSpecs` 的内容和 iOS 平台生成的代码差不多。`Android.mk` 和 `CMakeList.txt` 在 App 内用于 Fabric 组件配置，而 `RTNCenteredTextManagerDelegate.java` 和 `RTNCenteredTextManagerInterface.java` 会用在组件的 Manager。

查看 [Codegen](./pillars-codegen) 章节文档可获得更多文件生成相关细节。

#### 编写原生代码

Android 平台中 Fabric 组件的原生代码必须包含以下三个部分：

1. `RTNCenteredText.java` 用于渲染原生视图
2. `RTNCenteredTextManager.java` 用于实例化原生视图
3. 最后，您需要在之前创建的 `RTNCenteredTextPackage.java` 实现具体的逻辑代码

您的 Android 第三方库目录文件结构应为如下：

```title="Android 目录文件结构"
android
├── build.gradle
└── src
    └── main
        ├── AndroidManifest.xml
        └── java
            └── com
                └── rtncenteredtext
                    ├── RTNCenteredText.java
                    ├── RTNCenteredTextManager.java
                    └── RTNCenteredTextPackage.java
```

##### RTNCenteredText.java

```java title="RTNCenteredText"
package com.rtncenteredtext;

import androidx.annotation.Nullable;
import android.content.Context;
import android.util.AttributeSet;
import android.graphics.Color;

import android.widget.TextView;
import android.view.Gravity;

public class RTNCenteredText extends TextView {

    public RTNCenteredText(Context context) {
        super(context);
        this.configureComponent();
    }

    public RTNCenteredText(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        this.configureComponent();
    }

    public RTNCenteredText(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.configureComponent();
    }

    private void configureComponent() {
        this.setBackgroundColor(Color.RED);
        this.setGravity(Gravity.CENTER_HORIZONTAL);
    }
}
```

这个类表示的是原生视图，将由 Android 渲染到屏幕上。它继承了 `TextView` 并且调用私有方法 `configureComponent()` 来配置自身的基本参数。

##### RTNCenteredTextManager.java

```java title="RTNCenteredTextManager.java"
package com.rtncenteredtext;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.RTNCenteredTextManagerInterface;
import com.facebook.react.viewmanagers.RTNCenteredTextManagerDelegate;


@ReactModule(name = RTNCenteredTextManager.NAME)
public class RTNCenteredTextManager extends SimpleViewManager<RTNCenteredText>
        implements RTNCenteredTextManagerInterface<RTNCenteredText> {

    private final ViewManagerDelegate<RTNCenteredText> mDelegate;

    static final String NAME = "RTNCenteredText";

    public RTNCenteredTextManager(ReactApplicationContext context) {
        mDelegate = new RTNCenteredTextManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<RTNCenteredText> getDelegate() {
        return mDelegate;
    }

    @NonNull
    @Override
    public String getName() {
        return RTNCenteredTextManager.NAME;
    }

    @NonNull
    @Override
    protected RTNCenteredText createViewInstance(@NonNull ThemedReactContext context) {
        return new RTNCenteredText(context);
    }

    @Override
    @ReactProp(name = "text")
    public void setText(RTNCenteredText view, @Nullable String text) {
        view.setText(text);
    }
}
```

`RTNCenteredTextManager` 类用于让 React Native 实例化原生组件，它实现了由 **Codegen** 生成的接口（见 `implements` 语句的 `RTNCenteredTextManagerInterface` 接口）并使用了 `RTNCenteredTextManagerDelegate` 类。

它同时负责导出所有 React Native 所需的内容，例如使用 `@ReactModule` 注解的 `RTNCenteredTextManager` 类，及使用 `@ReactProp` 注解的 `setText` 方法。

##### RTNCenteredTextPackage.java

最后，打开 `android/src/main/java/com/rtncenteredtext` 目录的 `RTNCenteredTextPackage.java`，并进行以下修改：

```diff title="RTNCenteredTextPackage update"
package com.rtncenteredtext;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

public class RTNCenteredTextPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
+        return Collections.singletonList(new RTNCenteredTextManager(reactContext));;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

}
```

新增的代码实例化了一个 `RTNCenteredTextManager` 对象，用于让 React Natve 运行时渲染 Fabric 组件。

## 5. 将 Fabric 组件添加到 App

完成最后这一步，您便能将 Fabric 组件运行在 App 上。

### Shared

首先，您需要将包含组件的 NPM 包添加到您的 App。您可以使用以下命令执行此操作：

```sh
cd MyApp
yarn add ../RTNCenteredText
```

此命令会将 `RTNCenteredText` 模块添加到 App 内的 `node_modules` 目录。

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

最后，操作以下步骤，您就可以在 JavaScript 调用组件了。

1. 在 js 文件中导入组件。假设您要在 `App.js` 进行导入，您需要添加这行代码：

   ```js title="App.js"
   import RTNCenteredText from 'rtn-centered-text/js/RTNCenteredTextNativeComponent';
   ```

2. 接下来，在 React Native 组件里进行调用。调用的语法和其它组件相同：
   ```js title="App.js"
   // ... other code
   const App: () => Node = () => {
     // ... other App code ...
     return (
       // ...other React Native elements...
       <RTNCenteredText
         text="Hello World!"
         style={{width: '100%', height: 30}}
       />
       // ...other React Native Elements
     );
   };
   ```

现在，您可以运行 App 并查看在屏幕上显示的组件。

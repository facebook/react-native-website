---
id: backward-compatibility-fabric-components
title: 使 Fabric 组件与传统原生组件兼容
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import BetaTS from './\_markdown_beta_ts_support.mdx';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

:::info 提示
创建向后兼容的 Fabric 原生组件需要了解如何创建传统的原生组件。要回忆这些概念，请查看此[指南](pillars-fabric-components)。

仅当正确设置了新架构时，Fabric 原生组件才能正常工作。如果您已经有一个要迁移到新架构的库，请参阅[迁移指南](../new-architecture-intro)。
:::

创建向后兼容的 Fabric 原生组件可以让用户独立于他们使用的架构继续利用您的库。创建这样一个组件需要以下几个步骤：

1. 配置库，使得依赖项能够为旧和新架构正确设置。
2. 更新代码库，以便在不可用时不编译新架构类型。
3. 统一 JavaScript API，使得用户代码无需更改。

:::info 提示

我们将在本指南中使用以下**术语**：

- **传统原生组件** - 用于指代运行在旧版 React Native 架构上的组件。
- **Fabric 原生组件** - 用于指代已经适配新版原生渲染器 Fabric 的组件。为简洁起见，我们称之为**Fabric 组件**。

:::

<BetaTS />

虽然最后一步对于所有平台都是相同的，但前两步在 iOS 和 Android 上是不同的。

## 配置 Fabric 原生组件依赖

### iOS {#dependencies-ios}

Apple 平台使用 [Cocoapods](https://cocoapods.org) 作为依赖管理器来安装 Fabric 原生组件。

如果您已经在使用[`install_module_dependencies`](https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L198)函数，那么**无需进行任何操作**。该函数已经在启用新架构时自动安装适当的依赖项，并在未启用时避免它们。

否则，您的 Fabric 原生组件的`podspec`应如下所示：

```ruby
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  # Default fields for a valid podspec
  s.name            = "<FC Name>"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"
  # React Native Core dependency
  s.dependency "React-Core"

  # The following lines are required by the New Architecture.
  s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
  s.pod_target_xcconfig    = {
      "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
      "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
      "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }

  s.dependency "React-RCTFabric"
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly"
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
end
```

当启用新架构时，应安装额外的依赖项，并在未启用时避免安装它们。
为了实现这一点，您可以使用 [`install_modules_dependencies`](https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L198)。请按照以下步骤更新 `.podspec` 文件：

```diff
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

- folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  # Default fields for a valid podspec
  s.name            = "<FC Name>"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"
  # React Native Core dependency
+  install_modules_dependencies(s)
-  s.dependency "React-Core"
-  # The following lines are required by the New Architecture.
-  s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
-  s.pod_target_xcconfig    = {
-      "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
-      "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
-      "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
-  }
-
-  s.dependency "React-RCTFabric"
-  s.dependency "React-Codegen"
-  s.dependency "RCT-Folly"
-  s.dependency "RCTRequired"
-  s.dependency "RCTTypeSafety"
-  s.dependency "ReactCommon/turbomodule/core"
end
```

### Android

要创建一个在两种架构中都能使用的原生组件，您需要配置 Gradle 以根据所选架构选择哪些文件需要编译。这可以通过在 Gradle 配置中使用**不同的 sourceSets**来实现。

:::note 注意
请注意，这是目前建议的方法。虽然可能会导致一些代码重复，但它将确保与两种架构的最大兼容性。您将在下一节中了解如何减少重复。
:::

要配置 Fabric 原生组件以选择正确的 sourceSet，您需要按照以下方式更新 `build.gradle` 文件：

```diff title="build.gradle"
+// Add this function in case you don't have it already
+ def isNewArchitectureEnabled() {
+    return project.hasProperty("newArchEnabled") && project.newArchEnabled == "true"
+}
// ... other parts of the build file
defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 21)
        targetSdkVersion safeExtGet('targetSdkVersion', 31)
+        buildConfigField("boolean", "IS_NEW_ARCHITECTURE_ENABLED", isNewArchitectureEnabled().toString())
+    }
+
+    sourceSets {
+        main {
+            if (isNewArchitectureEnabled()) {
+                java.srcDirs += ['src/newarch']
+            } else {
+                java.srcDirs += ['src/oldarch']
+            }
+        }
    }
}
```

这些更改主要做了三个事情：

1. 第一行定义了一个函数，用于返回新架构是否已启用。
2. `buildConfigField` 行定义了一个名为 `IS_NEW_ARCHITECTURE_ENABLED` 的构建配置布尔字段，并使用第一步中声明的函数进行初始化。这允许您在运行时检查用户是否指定了 `newArchEnabled` 属性。
3. 最后几行利用第一步中声明的函数来决定我们需要构建哪些源集，具体取决于所选择的架构。

## 更新代码库

### iOS

第二步是指示 Xcode 在构建旧架构的应用程序时避免编译所有使用新架构类型和文件的行。

Fabric 原生组件需要一个头文件和一个实现文件来将实际的`View`添加到模块中。

例如，`RNMyComponentView.h`头文件可能如下所示：

```objectivec title='RNMyComponentView.h'
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

#ifndef NativeComponentExampleComponentView_h
#define NativeComponentExampleComponentView_h

NS_ASSUME_NONNULL_BEGIN

@interface RNMyComponentView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END

#endif /* NativeComponentExampleComponentView_h */
```

The implementation `RNMyComponentView.mm` file, instead, could look like this:

```objectivec title='RNMyComponentView.mm'
#import "RNMyComponentView.h"

// <react/renderer imports>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNMyComponentView () <RCTMyComponentViewViewProtocol>

@end

@implementation RNMyComponentView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    // ... return the descriptor ...
}

- (instancetype)initWithFrame:(CGRect)frame
{
  // ... initialize the object ...
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  // ... set up the props ...

  [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> MyComponentViewCls(void)
{
  return RNMyComponentView.class;
}

@end
```

为了确保 Xcode 跳过这些文件，我们可以将它们**同时**包含在一些 `#ifdef RCT_NEW_ARCH_ENABLED` 编译指令中。例如，头文件可以按以下方式更改：

```diff
+ #ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

// ... rest of the header file ...

#endif /* NativeComponentExampleComponentView_h */
+ #endif
```

在实现文件中，应将相同的两行代码添加为第一行和最后一行。

上面的片段使用了与前一个[部分](#dependencies-ios)中使用的`RCT_NEW_ARCH_ENABLED`标志相同。当未设置此标志时，Xcode 在编译期间跳过`#ifdef`内的代码，并且不将其包含到已编译二进制文件中。已编译二进制文件将具有 `RNMyComponentView.o` 对象，但它将是一个空对象。

### Android

由于在 Android 上无法使用条件编译块，因此我们将定义两个不同的源集。这将允许创建一个向后兼容的 TurboModule，并根据所使用的架构加载和编译适当的源。

因此，您需要：

1. 在 `src/oldarch` 路径中创建一个传统原生组件。请参阅 [此指南](../native-components-android) 以了解如何创建传统原生组件。
2. 在 `src/newarch` 路径中创建一个 Fabric 原生组件。请参阅 [此指南](pillars-fabric-components) 以了解如何创建 Fabric 原生组件。

然后指示 Gradle 决定选择哪个实现。

一些文件可以在 Legacy 和 Fabric 组件之间共享：这些文件应该被创建或移动到两种架构都加载的文件夹中。这些文件包括：

- `<MyComponentView>.java` 实例化并配置用于两个组件的 Android View 的代码。
- `<MyComponentView>ManagerImpl.java` 文件包含可在传统和 Fabric 组件之间共享的 ViewManager 的逻辑。
- `<MyComponentView>Package.java` 文件用于加载组件。

最终目录结构如下：

```sh
my-component
├── android
│   ├── build.gradle
│   └── src
│       ├── main
│       │   ├── AndroidManifest.xml
│       │   └── java
│       │       └── com
│       │           └── mycomponent
│       │               ├── MyComponentView.java
│       │               ├── MyComponentViewManagerImpl.java
│       │               └── MyComponentViewPackage.java
│       ├── newarch
│       │   └── java
│       │       └── com
│       │           └── MyComponentViewManager.java
│       └── oldarch
│           └── java
│               └── com
│                   └── MyComponentViewManager.java
├── ios
├── js
└── package.json
```

应该放在`MyComponentViewManagerImpl.java`中的代码可以在原生组件和 Fabric 原生组件之间共享，例如：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="example of MyComponentViewManager.java"
package com.mycomponent;

import androidx.annotation.Nullable;
import com.facebook.react.uimanager.ThemedReactContext;

public class MyComponentViewManagerImpl {

    public static final String NAME = "MyComponent";

    public static MyComponentView createViewInstance(ThemedReactContext context) {
        return new MyComponentView(context);
    }

    public static void setFoo(MyComponentView view, String param) {
        // 使用传递的视图和参数实现 foo 函数的逻辑。
    }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="example of MyComponentViewManager.kt"
package com.mycomponent

import com.facebook.react.uimanager.ThemedReactContext

object MyComponentViewManagerImpl {
  const val NAME = "MyComponent"
  fun createViewInstance(context: ThemedReactContext?) = MyComponentView(context)

  fun setFoo(view: MyComponentView, param: String) {
    // 使用传递的视图和参数实现 foo 函数的逻辑。
  }
}
```

</TabItem>
</Tabs>

然后，可以使用共享管理器中声明的函数更新传统原生组件和 Fabric 原生组件。

例如，在传统原生组件中：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Native Component using the ViewManagerImpl"
public class MyComponentViewManager extends SimpleViewManager<MyComponentView> {

    ReactApplicationContext mCallerContext;

    public MyComponentViewManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @Override
    public String getName() {
        // 从共享实现中获取静态名称属性
        return MyComponentViewManagerImpl.NAME;
    }

    @Override
    public MyComponentView createViewInstance(ThemedReactContext context) {
        // 从共享实现中获取静态createViewInstance函数
        return MyComponentViewManagerImpl.createViewInstance(context);
    }

    @ReactProp(name = "foo")
    public void setFoo(MyComponentView view, String param) {
        //// 从共享实现中获取静态自定义函数
        MyComponentViewManagerImpl.setFoo(view, param);
    }

}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Native Component using the ViewManagerImpl"
class MyComponentViewManager(var context: ReactApplicationContext) : SimpleViewManager<MyComponentView>() {
  // 从共享实现中获取静态名称属性
  override fun getName() = MyComponentViewManagerImpl.NAME

  public override fun createViewInstance(context: ThemedReactContext): MyComponentView =
    // 从共享实现中获取静态createViewInstance函数
    MyComponentViewManagerImpl.createViewInstance(context)

  @ReactProp(name = "foo")
  fun setFoo(view: MyComponentView, param: String) {
    // 从共享实现中获取静态自定义函数
    MyComponentViewManagerImpl.setFoo(view, param)
  }
}
```

</TabItem>
</Tabs>

在 Fabric 原生组件中：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Fabric Component using the ViewManagerImpl"
// 从共享实现中获取静态名称属性
@ReactModule(name = MyComponentViewManagerImpl.NAME)
public class MyComponentViewManager extends SimpleViewManager<MyComponentView>
        implements MyComponentViewManagerInterface<MyComponentView> {

    private final ViewManagerDelegate<MyComponentView> mDelegate;

    public MyComponentViewManager(ReactApplicationContext context) {
        mDelegate = new MyComponentViewManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<MyComponentView> getDelegate() {
        return mDelegate;
    }

    @NonNull
    @Override
    public String getName() {
        // 从共享实现中获取静态名称属性
        return MyComponentViewManagerImpl.NAME;
    }

    @NonNull
    @Override
    protected MyComponentView createViewInstance(@NonNull ThemedReactContext context) {
        // 从共享实现中获取静态createViewInstance函数
        return MyComponentViewManagerImpl.createViewInstance(context);
    }

    @Override
    @ReactProp(name = "foo")
    public void setFoo(MyComponentView view, @Nullable String param) {
       // 从共享实现中获取静态自定义函数
        MyComponentViewManagerImpl.setFoo(view, param);
    }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Fabric Component using the ViewManagerImpl"
// 从共享实现中获取静态名称属性
@ReactModule(name = MyComponentViewManagerImpl.NAME)
class MyComponentViewManager(context: ReactApplicationContext) : SimpleViewManager<MyComponentView>(), MyComponentViewManagerInterface<MyComponentView> {
  private val delegate: ViewManagerDelegate<MyComponentView> = MyComponentViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<MyComponentView> = delegate

  // 从共享实现中获取静态名称属性
  override fun getName(): String = MyComponentViewManagerImpl.NAME

  override fun createViewInstance(context: ThemedReactContext): MyComponentView =
    // 从共享实现中获取静态createViewInstance函数
    MyComponentViewManagerImpl.createViewInstance(context)

  @ReactProp(name = "foo")
  override fun setFoo(view: MyComponentView, text: String) {
    // 从共享实现中获取静态自定义函数
    MyComponentViewManagerImpl.setFoo(view, param);
  }
}
```

</TabItem>
</Tabs>

想要了解如何一步步实现这个过程，可以查看[此示范仓库](https://github.com/react-native-community/RNNewArchitectureLibraries/tree/feat/back-fabric-comp)。

## 统一 JavaScript 规范

<BetaTS />

最后一步确保 JavaScript 独立于所选架构。

对于 Fabric 原生组件，关键点是`<YourModule>NativeComponent.js`(或`.ts`)规范文件。应用通过以下方式访问规范文件：

```ts
import MyComponent from 'your-component/src/index';
```

由于 `codegenNativeComponent` 在底层调用了 `requireNativeComponent`，我们需要重新导出组件，以避免多次注册。

<Tabs groupId="fabric-component-backward-compatibility" queryString
      defaultValue={constants.defaultFabricComponentSpecLanguage}
      values={constants.fabricComponentSpecLanguages}>
<TabItem value="Flow">

```ts
// @flow
export default require('./MyComponentNativeComponent').default;
```

</TabItem>
<TabItem value="TypeScript">

```ts
export default require('./MyComponentNativeComponent').default;
```

</TabItem>
</Tabs>

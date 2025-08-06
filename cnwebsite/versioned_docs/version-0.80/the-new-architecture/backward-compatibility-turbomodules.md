---
id: backward-compatibility-turbomodules
title: 使 Turbo 模块与传统原生模块兼容
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import BetaTS from './\_markdown_beta_ts_support.mdx';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

:::info 提示
创建向后兼容的 Turbo 原生模块需要了解如何创建传统的原生模块。要回忆这些概念，请查看此[指南](pillars-turbomodules)。

只有在正确设置新架构时，TurboModules 才能正常工作。如果您已经拥有要迁移到新架构的库，请同时查看[迁移指南](../new-architecture-intro)。
:::

创建向后兼容的 TurboModule 可让您的用户独立于他们使用的架构继续利用您的库。创建这样一个模块需要以下几个步骤：

1. 配置库，使依赖项为旧架构和新架构都正确设置。
2. 更新代码库，以便在不可用时不编译新架构类型。
3. 统一 JavaScript API，以便用户代码无需更改。

:::info 提示

我们将在本指南中使用以下**术语**：

- **传统原生模块** - 用于指代运行在旧版 React Native 架构上的模块。
- **Turbo 原生模块** - 用于指代已经适配新版原生模块系统并能够良好工作的模块。为简洁起见，我们称之为**Turbo 模块**。

:::

<BetaTS />

虽然最后一步对于所有平台都是相同的，但前两步在 iOS 和 Android 上是不同的。

## 配置 Turbo 原生模块依赖

### iOS {#dependencies-ios}

Apple 平台使用[Cocoapods](https://cocoapods.org)作为依赖管理器来安装 Turbo 原生模块。

如果您已经在使用[`install_module_dependencies`](https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L198)函数，那么**无需进行任何操作**。该函数已经在启用新架构时安装了适当的依赖项，并在未启用时避免了它们。

否则，您的 Turbo 原生模块的`podspec`应如下所示：

```ruby
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  # Default fields for a valid podspec
  s.name            = "<TM Name>"
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
      "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }

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

-folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  # Default fields for a valid podspec
  s.name            = "<TM Name>"
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
-
-  # The following lines are required by the New Architecture.
-  s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
-  s.pod_target_xcconfig    = {
-      "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
-      "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
-  }
-
-  s.dependency "React-Codegen"
-  s.dependency "RCT-Folly"
-  s.dependency "RCTRequired"
-  s.dependency "RCTTypeSafety"
-  s.dependency "ReactCommon/turbomodule/core"
end
```

### Android

为了创建一个在两种架构中都可以使用的模块，您需要配置 Gradle 以根据所选架构选择哪些文件需要编译。这可以通过在 Gradle 配置中使用**不同的 sourceSets**来实现。

:::note 备注
请注意，这是目前建议采用的方法。虽然它可能会导致一些代码重复，但它将确保最大程度地兼容两种架构。您将看到如何在下一节中减少重复。
:::

要配置 Turbo 原生模块以选择适当的 sourceSet，您必须按以下方式更新`build.gradle`文件：

```diff title="build.gradle"
+// 如果你还没有这个函数，请添加它。
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

第二步是指示 Xcode 在使用旧架构构建应用程序时避免编译所有使用新架构类型和文件的行。

需要更改两个文件。模块实现文件通常为`<your-module>.mm`，而模块头文件通常为`<your-module>.h`。

该实现文件结构如下：

- 一些 `#import` 语句，其中包括一个 `<GeneratedSpec>.h` 文件。
- 使用各种 `RCT_EXPORT_xxx` 和 `RCT_REMAP_xxx` 宏的模块实现。
- 使用由新架构生成的 `<MyModuleSpecJSI>` 类型的 `getTurboModule:` 函数。

**目标**是确保`Turbo 原生模块`仍然可以使用旧架构进行构建。为了实现这一点，我们可以将 `#import "<GeneratedSpec>.h"` 和 `getTurboModule:` 函数包装到一个 `#ifdef RCT_NEW_ARCH_ENABLED` 编译指令中，如以下示例所示：

```diff
#import "<MyModuleHeader>.h"
+ #ifdef RCT_NEW_ARCH_ENABLED
#import "<GeneratedSpec>.h"
+ #endif

// ... rest of your module

+ #ifdef RCT_NEW_ARCH_ENABLED
 - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
 {
    return std::make_shared<facebook::react::<MyModuleSpecJSI>>(params);
 }
+ #endif

@end
```

头文件也需要进行类似的操作。在模块头部添加以下行：首先导入该头文件，然后（如果启用了新架构）使其符合规范协议。

```diff
#import <React/RCTBridgeModule.h>
+ #ifdef RCT_NEW_ARCH_ENABLED
+ #import <YourModuleSpec/YourModuleSpec.h>
+ #endif

@interface YourModule: NSObject <RCTBridgeModule>

@end

+ #ifdef RCT_NEW_ARCH_ENABLED
+ @interface YourModule () <YourModuleSpec>

+ @end
+ #endif

```

这个代码片段使用了与前面[部分](#dependencies-ios)中相同的`RCT_NEW_ARCH_ENABLED`标志。当未设置此标志时，Xcode 在编译期间跳过`#ifdef`内的行，并且不将它们包含到编译后的二进制文件中。

### Android

由于我们无法在 Android 上使用条件编译块，因此我们将定义两个不同的源集。这将允许创建一个向后兼容的 Turbo 原生模块，具有根据所使用的架构加载和编译的正确源。

因此，您需要：

1. 在`src/oldarch`路径中创建传统原生模块。请参阅[此指南](../native-modules-intro)以了解如何创建传统原生模块。
2. 在`src/newarch`路径中创建 Turbo 原生模块。请参阅[此指南](./pillars-turbomodules)以了解如何创建 Turbo 原生模块。

然后指示 Gradle 决定选择哪个实现。

一些文件可以在传统原生模块和 Turbo 原生模块之间共享：这些文件应该被创建或移动到由两种体系结构加载的文件夹中。这些文件是：

- `<MyModule>Package.java` 文件用于加载模块。
- `<MyTurboModule>Impl.java` 文件，在其中我们可以放置传统原生模块和 Turbo 原生模块都必须执行的代码。

最终文件夹结构如下：

```sh
my-module
├── android
│   ├── build.gradle
│   └── src
│       ├── main
│       │   ├── AndroidManifest.xml
│       │   └── java
│       │       └── com
│       │           └── mymodule
│       │               ├── MyModuleImpl.java
│       │               └── MyModulePackage.java
│       ├── newarch
│       │   └── java
│       │       └── com
│       │           └── MyModule.java
│       └── oldarch
│           └── java
│               └── com
│                   └── MyModule.java
├── ios
├── js
└── package.json
```

应该放在 `MyModuleImpl.java` 中的代码可以被传统原生模块和 Turbo 原生模块共享，例如：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="example of MyModuleImpl.java"
package com.mymodule;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;

public class MyModuleImpl {

    public static final String NAME = "MyModule";

    public void foo(double a, double b, Promise promise) {
        // implement the logic for foo and then invoke promise.resolve or
        // promise.reject.
    }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="example of MyModuleImpl.kt"
package com.mymodule;

import com.facebook.react.bridge.Promise

class MyModuleImpl {
  fun foo(a: Double, b: Double, promise: Promise) {
    // implement the logic for foo and then invoke
    // promise.resolve or promise.reject.
  }

  companion object {
    const val NAME = "MyModule"
  }
}
```

</TabItem>
</Tabs>

接下来，可以通过以下步骤更新传统原生模块和 Turbo 原生模块：

1. 创建 `MyModuleImpl` 类的私有实例。
2. 在模块构造函数中初始化该实例。
3. 在模块方法中使用该私有实例。

例如，对于一个传统原生模块：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Native Module using the Impl module"
public class MyModule extends ReactContextBaseJavaModule {

    // declare an instance of the implementation
    private MyModuleImpl implementation;

    MyModule(ReactApplicationContext context) {
        super(context);
        // initialize the implementation of the module
        implementation = MyModuleImpl();
    }

    @Override
    public String getName() {
        // NAME is a static variable, so we can access it using the class name.
        return MyModuleImpl.NAME;
    }

    @ReactMethod
    public void foo(int a, int b, Promise promise) {
        // Use the implementation instance to execute the function.
        implementation.foo(a, b, promise);
    }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Native Module using the Impl module"
class MyModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
  // declare an instance of the implementation and use it in all the methods
  private var implementation: MyModuleImpl = MyModuleImpl()

  override fun getName(): String = MyModuleImpl.NAME

  @ReactMethod
  fun foo(a: Double, b: Double, promise: Promise) {
    // Use the implementation instance to execute the function.
    implementation.foo(a, b, promise)
  }
}
```

</TabItem>
</Tabs>

对于 Turbo 原生模块：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="TurboModule using the Impl module"
public class MyModule extends MyModuleSpec {
    // declare an instance of the implementation
    private MyModuleImpl implementation;

    MyModule(ReactApplicationContext context) {
        super(context);
        // initialize the implementation of the module
        implementation = MyModuleImpl();
    }

    @Override
    @NonNull
    public String getName() {
        // NAME is a static variable, so we can access it using the class name.
        return MyModuleImpl.NAME;
    }

    @Override
    public void foo(double a, double b, Promise promise) {
        // Use the implementation instance to execute the function.
        implementation.foo(a, b, promise);
    }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="TurboModule using the Impl module"
class MyModule(reactContext: ReactApplicationContext) : MyModuleSpec(reactContext) {
  // declare an instance of the implementation and use it in all the methods
  private var implementation: MyModuleImpl = MyModuleImpl()

  override fun getName(): String = MyModuleImpl.NAME

  override fun foo(a: Double, b: Double, promise: Promise) {
    // Use the implementation instance to execute the function.
    implementation.foo(a, b, promise)
  }
}
```

</TabItem>
</Tabs>

想要了解如何一步步实现这个功能，请查看[此示范代码库](https://github.com/react-native-community/RNNewArchitectureLibraries/tree/feat/back-turbomodule)。

## 统一 JavaScript 规范

<BetaTS />

最后一步确保 JavaScript 独立于所选架构。

对于 Turbo 原生模块，关键点是`Native<MyModule>.js`(或`.ts`)规范文件。应用通过以下方式访问规范文件：

```ts
import MyModule from 'your-module/src/index';
```

由于`TurboModuleRegistry.get`在底层使用了旧的原生模块 API，因此我们需要重新导出我们的模块，以避免多次注册。

<Tabs groupId="turbomodule-backward-compatibility" queryString
      defaultValue={constants.defaultTurboModuleSpecLanguage}
      values={constants.turboModuleSpecLanguages}>
<TabItem value="Flow">

```ts
// @flow
export default require('./Native<MyModule>').default;
```

</TabItem>
<TabItem value="TypeScript">

```ts
export default require('./Native<MyModule>').default;
```

</TabItem>
</Tabs>

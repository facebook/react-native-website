---
id: new-architecture-library-android
title: 在 Android 库中启用
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx'; import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<NewArchitectureWarning/>

一旦您在[先决条件](new-architecture-library-intro)中定义了本机模块的 JavaScript 规范，设置了 CodeGen 配置，并遵循了 Android/Gradle 设置，然后就可以将您的库迁移到新架构。以下是迁移所需的步骤。

## 1. 扩展或实现代码生成的本地接口

您为原生模块或组件定义的 JavaScript 规范将用于为每个支持的平台（即 Android 和 iOS）生成本地接口代码。这些本地接口文件将在构建依赖于您的库的反应应用程序时**生成**。

虽然这种生成的本地接口代码**不会作为您图书馆的一部分进行运输**，但您确实需要确保您的 Java / Kotlin 代码符合这些本地接口文件提供的协议。

您可以调用`generateCodegenArtifactsFromSchema` Gradle 任务来为您的库生成本机接口代码，以便将其用作**参考：**

```bash
./gradlew generateCodegenArtifactsFromSchema
```

The files that are output can be found inside `build/generated/source/codegen` and **should not be committed**, but you’ll need to refer to them to determine what changes you need to make to your native modules in order for them to provide an implementation for each generated interface.

The output of the Codegen for a module called `NativeAwesomeManager` will look like this:

```
app/build/generated/source/codegen
├── java
│   └── com
│       └── example
│           └── samplelibrary
│               └── NativeAwesomeManagerSpec.java
├── jni
│   ├── Android.mk
│   ├── CMakeLists.txt
│   ├── react
│   │   └── renderer
│   │       └── components
│   │           └── samplelibrary
│   │               ├── ComponentDescriptors.h
│   │               ├── EventEmitters.cpp
│   │               ├── EventEmitters.h
│   │               ├── Props.cpp
│   │               ├── Props.h
│   │               ├── ShadowNodes.cpp
│   │               └── ShadowNodes.h
│   ├── samplelibrary-generated.cpp
│   └── samplelibrary.h
└── schema.json
```

### Extends the Abstract Class Provided by the Codegen

Update your native module or component to ensure it **extends the abstract class** that has been code-generated from your JavaScript specs (i.e., the `NativeAwesomeManagerSpec.java` file from the previous example).

Following the example set forth in the previous section, your library might import `NativeAwesomeManagerSpec`, implement the relevant native interface and the necessary methods for it:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
import androidx.annotation.NonNull;

import com.example.samplelibrary.NativeAwesomeManagerSpec;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

public class NativeAwesomeManager extends NativeAwesomeManagerSpec {

    public static final String NAME = "NativeAwesomeManager";

    public NativeAwesomeManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void getString(String id, Promise promise) {
        // Implement this method
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }
}
```

</TabItem>

<TabItem value="kotlin">

```kotlin
import com.example.samplelibrary.NativeAwesomeManagerSpec
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class NativeAwesomeManager(reactContext: ReactApplicationContext) :
    NativeAwesomeManagerSpec(reactContext) {
    override fun getString(id: String, promise: Promise) {
        // Implement this method
    }

    override fun getName() = NAME

    companion object {
        val NAME = "NativeAwesomeManager"
    }
}
```

</TabItem>
</Tabs>

Please note that the **generated abstract class** that you’re now extending (`MyAwesomeSpec` in this example) is itself extending `ReactContextBaseJavaModule`. Therefore you should not lose access to any of the method/fields you were previously using (e.g., the `ReactApplicationContext` and so on). Moreover, the generated class will now also implement the `TurboModule` interface for you.

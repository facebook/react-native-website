---
id: new-architecture-library-android
title: Enabling in Android Library
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx'; import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<NewArchitectureWarning/>

Once you have defined the JavaScript specs for your native modules as part of the [prerequisites](new-architecture-library-intro), setup the configuration of the Codegen, and followed the Android/Gradle setup, you are now ready to migrate your library to the new architecture. Here are the steps you can follow to accomplish this.

## 1. Extend or implement the code-generated native interfaces

The JavaScript spec for your native module or component will be used to generate native interface code for each supported platform (i.e. Android and iOS). These native interface files will be generated **when a React Native application that depends on your library is built**.

While this generated native interface code **will not ship as part of your library**, you do need to make sure your Java/Kotlin code conforms to the protocols provided by these native interface files.

You can invoke the `generateCodegenArtifactsFromSchema` Gradle task to generate your library’s native interface code in order to use them **as a reference:**

```bash
./gradlew generateCodegenArtifactsFromSchema
```

The files that are output can be found inside `build/generated/source/codegen` and **should not be committed**, but you’ll need to refer to them to determine what changes you need to make to your native modules in order for them to provide an implementation for each generated interface.

The output of the codegen for a module called `NativeAwesomeManager` will look like this:

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

### Extends the abstract class provided by the codegen

Update your native module or component to ensure it **extends the abstract class** that has been code-generated from your JavaScript specs (i.e. the `NativeAwesomeManagerSpec.java` file from the previous example).

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

Please note that the **generated abstract class** that you’re now extending (`MyAwesomeSpec` in this example), is itself extending `ReactContextBaseJavaModule`. Therefore you should not use access to any of the method/fields you were previously using (e.g. the `ReactApplicationContext` and so on). Moreover the generated class will now also implement the `TurboModule` interface for you.

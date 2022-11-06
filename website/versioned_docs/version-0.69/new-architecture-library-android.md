---
id: new-architecture-library-android
title: Enabling in Android Library
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

Once you have defined the JavaScript specs for your native modules as part of the [prerequisites](new-architecture-library-intro) and followed the Android/Gradle setup, you are now ready to migrate your library to the new architecture. Here are the steps you can follow to accomplish this.

### 1. Configure Codegen in your Gradle File

You can now configure Codegen by specifying the following in the module-level `build.gradle` file:

```groovy
react {
    libraryName = "samplelibrary"
    codegenJavaPackageName = "com.example.samplelibrary"
    root = rootProject.file("..")
    jsRootDir = rootProject.file("../js/")
    reactNativeDir = rootProject.file("../node_modules/react-native/")
    codegenDir = rootProject.file("../node_modules/react-native-codegen/")
}
```

:::info

Please note that this setup requires you to have the React Gradle Plugin configured in the prerequisite step).

:::

All the arguments are **optional** and provide **default values**, you might want to customize them to follow your setup.

- `libraryName`: A string that identifies your library. By default, the codegen will use a library name that is derived from the name of the module with a `Spec` suffix. E.g. for `:example:project` it will be `ExampleProjectSpec`.
- `codegenJavaPackageName`: A string that represents the Java package your code should use. By default this will be `com.facebook.fbreact.specs` but you might want to customize it.
- `root`: Reference to the root of your project. By default is `..` as Gradle is running inside the `./android` folder.
- `reactNativeDir`: Reference to the `react-native` package root. Usually located inside `../node_modules/react-native`. For third-party NPM libraries that are installed in `node_modules`, this will be `../react-native`.
- `jsRootDir`: Reference to the directory that contains the JavaScript specs for this library. By default is `../js/`.
- `codegenDir`: Reference to the `react-native-codegen` root. Usually located inside `../node_modules/react-native-codegen`.

The generator will write its output inside the **build folder**, specifically inside the `./build/generated/source/codegen` folder.

## 2. Extend or implement the code-generated native interfaces

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

Please note that the **generated abstract class** that you’re now extending (`MyAwesomeSpec` in this example), is itself extending `ReactContextBaseJavaModule`. Therefore you should not use access to any of the method/fields you were previously using (e.g. the `ReactApplicationContext` and so on). Moreover the generated class will now also implement the `TurboModule` interface for you.

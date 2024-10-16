# Pure C++ Turbo Native Modules

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Writing a module in C++ is the best way to share platform-agnostic code between Android and iOS. With pure C++ modules, you can write your logic only once and reuse it right away from all the platform, without the need of writing platform specific code.

In this guide, we will go through the creation of a pure C++ Turbo Native Module:

1. Create the JS specs
2. Configure Codegen to generate the scaffolding
3. Implement the Native logic
4. Register the module in the Android and iOS application
5. Test your changes in JS

The rest of this guide assume that you have created your application running the command:

```shell
npx @react-native-community/cli@latest init SampleApp --version 0.76.0
```

## 1. Create the JS specs

Pure C++ Turbo Native Modules are Turbo Native Modules. They needs a specification file (also called spec file) so that Codegen can create the scaffolding code for us. The specification file is also what we use to access the Turbo Native Module in JS.

Specs files need to be written in a typed JS dialect. React Native currently supports Flow or TypeScript

1. Inside the root folder of your app, create a new folder called `specs`.
2. Create a new file called `NativeSampleModule.ts`

:::warning
All Native Turbo Module spec files must have the prefix `Native`, otherwise Codegen will ignore them.
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

The next step is to configure [Codegen](what-is-codegen.md) in your `package.json`.

1. Open the `package.json` file
2. Modify it as it follows:

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

This configuration tells Codegen to look for specs files in the `specs` folder. It also instruct Codegen to only generate code for `modules` and to namespace the generated code as `AppSpecs`.

## 3. Write the Native Code

Writing a C++ Turbo Native Module allow you to share the code between Android an iOS. Therefore we will be writing the code once, and we will look into what changes we need to apply to the platforms so that the C++ code can be picked up.

1. Create a folder named `shared` at the same level of the `android` and `ios` folders.
2. Inside the `shared` folder, create a new file called `NativeSampleModule.h`.

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

3. Inside the `shared` folder, create a new file called `NativeSampleModule.cpp`.

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

Let's have a look at the two files we created.

The `NativeSampleModule.h` file is the header file for a Pure C++ TurboModule. The `include` statements make sure that we include the specs that will be created by Codegen and that contains the interface and the base class we need to implement.

The module lives in the `facebook::react` namespace to have access to all the types that live in that namespace.

The class `NativeSampleModule` is the actual Turbo Native Mdoule class and it extends the `NativeSampleModuleCxxSpec` class which contains some glue code and boilerplate code to let this class behave as a Turbo Native Module.

Finally, we have the constructor, that accepts a pointer to the `CallInvoker`, to communicate with JS if needed and the function's prototype we have to implement.

The `NativeSampleModule.cpp` files is the actual implementation of our Turbo Native Module and implements the constructor and the method that we declared in the specs.

## 4. Register the Module in the platform

The next steps will let us register the module in the platform. This is the step that exposes the native code to JS so that the React Native application can finally call the native methods from the JS layer.

This is the only time when we will have to write some platform-specific code.

### Android

To make sure that the iOS app can effectively build the C++ Turbo Native Module, we need to:

1. Create a `CMakeLists.txt` to access our C++ code
2. Modify `build.gradle` to point to the newly created `CMakeLists.txt` file.
3. Create an `OnLoad.cpp` file in our Android app to register the new Turbo Native Module.

#### 1. Create the `CMakeLists.txt` file

Android uses CMake to build. CMake needs to access the files we defined in our shared folder, to be able to build them.

1. Create a new folder `SampleApp/android/app/src/main/jni`. The `jni` folder is where the C++ side of Android lives
2. Create a `CMakeLists.txt` file and add this context

```shell
cmake_minimum_required(VERSION 3.13)

# Define the library name here.
project(appmodules)

# This file includes all the necessary to let you build your React Native application
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Define where the additional source code lives. We need to crawl back the jni, main, src, app, android folders
target_sources(${CMAKE_PROJECT_NAME} PRIVATE ../../../../../shared/NativeSampleModule.cpp)

# Define where CMake can find the additional header files. We need to crawl back the jni, main, src, app, android folders
target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC ../../../../../shared)
```

The CMake file does the following things:

- Defines the `appmodules` library, where all the app C++ code will be included.
- Loads the base React Native's CMake file
- Adds the Module C++ source code that we need to build with the `target_sources` directives. By default React Native will already populate the `appmodules` library with default sources, here we include our custom one. You can see that we need to crawl back from the `jni` folder to the `shared` folder where our C++ TM lives.
- Specify where CMake can find the module header files. Also in this case we need to crawl back from the `jni` folder.

#### 2. Modify `build.gradle` to include the custom C++ code

Gradle is the tool that orchestrates the Android build. We need to tell it where it can find the `CMake` files to build the Turbo Native Module.

1. Open the `SampleApp/android/app/build.gradle` file
2. Add the following block into the Gradle file, within the existent `android` block:

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

This block tells the Gradle file where to look for the CMake file. The path is relative to the folder where the `build.gradle` file lives, so we need to add the path to the `CMakeLists.txt` files in the `jni` folder.

#### 3. Register the new Turbo Native Module

The final step is to register the new C++ Turbo Native Module in the runtime, so that when JS requires the C++ Turbo Native Module, the app knows where to find it and can return it.

1. From the folder `SampleApp/android/app/src/main/jni`, run the following command:

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

// leave the rest of the file
```

These steps download the original `OnLoad.cpp` file from React Native, so that we can safely override it to load the C++ Turbo Native Module in the app.

Once we downloaded the file, we can modify it by:

- Including the header file that points to our module
- Registering the Turbo Native Module so that when JS requires it, the app can return it.

Now, you can run `yarn android` from the project root to see your app building successfully.

### iOS

To make sure that the iOS app can effectively build the C++ Turbo Native Module, we need to:

1. Install pods and run Codegen.
2. Add the `shared` folder to our iOS project.
3. Register the C++ Turbo Native Module in the application.

#### 1. Install Pods and Run Codegen.

The first step we need to run is the usual steps we run every time we have to prepare our iOS application. CocoaPods is the tool we use to setup React Native dependencies and, as part of the process, it will also run Codegen for us.

1. Navigate to the `ios` folder
2. Run `bundle install` to install the Ruby bundler
3. Run `bundle exec pod install` to install the dependencies and run Codegen

#### 2. Add the shared folder to the iOS project

This steps adds the `shared` folder to the project to make it visible to xcode.

1. Open the `SampleApp.xcworkspace` file in Xcode.
2. Click on the `SampleApp` project on the left.
3. Select `Add files to "Sample App"...`
4. Select the `shared` folder and click on `Add`

These images shows you how to add the folder to the project:

![Add Files to Sample App...](/docs/assets/AddFilesToXcode1.png)

![Add Files to Sample App...](/docs/assets/AddFilesToXcode2.png)

If you did everything right, your project on the left should look like this:

![Xcode Project](/docs/assets/CxxTMGuideXcodeProject.png)

#### 3. Registering the Cxx Turbo Native Module in your app.

With this last step, we will tell the iOS app where to look for to find the pure C++ Turbo Native Module.

1. In Xcode, open the `AppDelegate.mm` file
2. Modify it as it follows:

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

These changes are doing a few things:

1. Importing the `RCTAppDelegate+Protected` header to make visible to the AppDelegate that it is conforming to the `RCTTurboModuleManagerDelegate` protocol.
2. Importing the Pure C++ Native Turbo Module interface `NativeSampleModule.h`
3. Overriding the `getTurboModule` method for C++ modules so that when the JS side asks for a module called `NativeSampleModule`, the app knows which module has to be returned.

If you now build your application from Xcode, you should be able to build successfully.

## 5. Testing your Code

It's now time to access our C++ Turbo Native Module from JS. To do so, we have to modify the `App.tsx` file to import the Turbo Native Module and to call it in our code.

1. Open the `App.tsx` file
2. Replace the content of the template with the following code

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

The interesting lines in this app are:

- `import SampleTurboModule from './specs/NativeSampleModule';`: this lines imports the Turbo Native Module in the app
- `const revString = SampleTurboModule.reverseString(value);` in the `onPress` callback: this is how you can use the Turbo Native Module in your app.

:::warning
For the sake of this example and to keep it as short as possible, we directly imported the spec file in our app.
The best practice in this case is to create a separate file to wrap the specs and use that file into your application.
This allow you to prepare the input for the specs and gives you more control over then in JS.
:::

Congratulation, you wrote your first C++ Turbo Native Module!

| <center>Android</center>                                                                             | <center>iOS</center>                                                                          |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| <center><img src="/docs/assets/CxxGuideAndroidVideo.gif" alt="Android Video" height="600"/></center> | <center><img src="/docs/assets/CxxGuideIOSVideo.gif" alt="iOS video" height="600" /></center> |

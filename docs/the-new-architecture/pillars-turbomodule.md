---
id: pillars-turbomodules
title: TurboModules
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

If you've worked with React Native, you may be familiar with the concept of Native Modules, which allow JavaScript and platform-native code to communicate over the React Native "bridge", which handles cross-platform serialization via JSON.

TurboModules are the next iteration on Native Modules that provide a few extra [benefits](./why):

- Strongly typed interfaces that are consistent across platforms
- The ability to create shared C++ code for use across platforms
- Lazy loading of modules, allowing for faster app startup
- The use of JSI, a JavaScript interface for native code, which allows for more efficient communication between native and JavaScript code than the bridge

This guide will show you how to create a basic TurboModule.

:::caution
TurboModules only work with the **New Architecture** enabled.
To migrate to the **New Architecture**, follow the [Migration guide](../new-architecture-intro)
:::

## How to Create a TurboModule

To create a TurboModule, we need to:

1. Define a set of JavaScript specifications.
2. Configure the module and inspect the code created by Codegen.
3. Write the native code to finish implementing the module.

## 1. Folder Setup

In order to keep the module decoupled from the app, it's a good idea to define the module separately from the app, and then add it as a dependency to your app later.

Next to your application, create a folder called `RTNCalculator`. (**RTN** stands for "**R**eact**T** **N**ative", and is a standard prefix for React Native modules).

Within `RTNCalculator`, create three subfolders: `js`, `ios`, and `android`.

The final result should look like this:

```sh
TurboModulesGuide
├── MyApp
└── RTNCalculator
    ├── android
    ├── ios
    └── js
```

## 2. JavaScript Specification

The **New Architecture** requires interfaces specified in a typed dialect of JavaScript (either [Flow](https://flow.org/) or [TypeScript](https://www.typescriptlang.org/)). **Codegen** will use these specifications to generate code in strongly-typed languages, including C++, Objective-C++, and Java.

There are two requirements the file containing this specification must meet:

1. The file **must** be named `Native<MODULE_NAME>`, with a `.js` or `.jsx` extension when using Flow, or a `.ts`, or `.tsx` extension when using TypeScript. Codegen will only look for files matching this pattern.
2. The file must export a `TurboModuleRegistrySpec` object.

<Tabs groupId="turbomodule-specs" defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```typescript title="NativeCalculator.js"
// @flow
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface RTNCalculatorSpec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}
export default (TurboModuleRegistry.get<RTNCalculatorSpec>(
  'RTNCalculator'
): ?RTNCalculatorSpec);
```

</TabItem>
<TabItem value="typescript">

```typescript title="NativeCalculator.ts"
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface RTNCalculatorSpec extends TurboModule {
  add(a: number, b: number): Promise<number>;
}

export default (TurboModuleRegistry.get<RTNCalculatorSpec>(
  'RTNCalculator'
) as RTNCalculatorSpec | null);
```

</TabItem>
</Tabs>

At the beginning of the spec files are the imports:

- The `TurboModule` type, which defines the base interface for all TurboModules
- The `TurboModuleRegistry` JavaScript module, which contains functions for loading TurboModules

The second section of the file contains the interface specification for the TurboMOdule. In this case, the interface defines the `add` function which takes two numbers and returns a promise that resolves to a number.

Finally, we invoke `TurboModuleRegistry.get`, passing the module's name, which will load the TurboModule if it's available. 

:::caution
We are writing JavaScript files importing types from libraries, without setting up a proper node module and installing its dependencies. Your IDE will not be able to resolve the import statements and you may see errors and warnings. This is expected and will not cause problems when you add the module to your app.
:::

## 3. Module Configuration

Next, you need to add some configuration for [**Codegen**](/docs/pillars-codegen.md) and auto-linking.

Some of these configuration files are shared between iOS and Android, while the others are platform-specific.

### Shared

The shared configuration is a `package.json` file that will be used by yarn when installing your module. Create the `package.json` file in the root of the `RTNCalculator` directory.

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
  "keywords": [
    "react-native",
    "ios",
    "android"
  ],
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
    "libraries": [
      {
        "name": "RTNCalculatorSpec",
        "type": "modules",
        "jsSrcsDir": "js"
      }
    ]
  }
}
```

### iOS: Create the `podspec` file

For iOS, you'll need to create a `.podspec` file which will define the module as a dependency for your app. It will stay in the root of `RTNCalculator`, alongside the `ios` folder.

The `.podspec` file for the module will look like this:

```ruby title="rnt-calculator.podspec"
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

folly_version = '2021.06.28.00-v2'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

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

  s.dependency "React-Core"

  s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
  s.pod_target_xcconfig    = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
    "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
  }

  s.dependency "React-Codegen"
  s.dependency "RCT-Folly", folly_version
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
end
```

The `.podspec` file has to be a sibling of the `package.json` file and its name is the one we set in the `package.json`'s `name` property: `rtn-calculator`.

The first part of the file prepares some variables we will use throughout the rest of it. Then, there is a section that contains some information used to configure the pod, like its name, version, and description. Finally, we have a set of dependencies that are required by the New Architecture.

### Android: Create the `build.gradle` file

Next, create a `build.gradle` file in the `android` folder, with the following contents:

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

react {
    jsRootDir = file("../js/")
    libraryName = "RTNCalculator"
    codegenJavaPackageName = "com.RTNCalculator"
}
```

Of interest in the `build.gradle` file:

- The `defaultConfig` block, within the `android` block, adds a `buildConfigField` to enable the New Architecture.
- The `react` block configures the CodeGen process. For Android, we need to specify:
  - the `jsRootDir`, which contains the relative path to the JavaScript specs
  - the `libraryName` we will use to link the library in the app.
  - the `codegenJavaPackageName` which corresponds to the name of the Java package we will use for the code generated by **CodeGen**.

## 4. Native Code

For the final step in getting your TurboModule ready to go, you'll need to write some native code to connect the JavaScript side to the native platforms. This process requires two main steps:

- Run **CodeGen** to see what it generates.
- Write your native code, implementing the generated interfaces.

When developing a React Native app that uses a TurboMOdule, it is responsibility of the app to actually generate the code using **CodeGen**. However, when developing a TurboModule as a library, we need to reference the generated code, and it is therefore useful to see what the app will generate.

As first step for both iOS and Android, this guide shows how to execute manually the scripts used by **CodeGen** to generate the required code. Further information on **CodeGen** can be found [here](/docs/pillars-codegen.md)

:::caution
The code generated by the **CodeGen** in this step should not be committed to the versioning system. React Native apps are able to generate the code when the app is built. This allows to avoid any ABI incompatibility and to ensure that a consistent version of the **CodeGen** is used.
:::
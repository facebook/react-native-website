---
id: pillars-fabric-components
title: Fabric Components
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

A Fabric Component is a UI component rendered on the screen using the [Fabric Renderer](https://reactnative.dev/architecture/fabric-renderer).

Using Fabric Components instead of Native Components allows us to reap all the [benefits](./why) of the **New Architecture**. Specifically, we are able to leverage JSI to efficiently connect the Native UI code JavaScript.

A Fabric Component is created starting from a **JavaScript specification**. This, with the help of [**CodeGen**](./pillars-codegen), will create some C++ code, integrated in the platform native layer and shared among all the React Native platforms. The C++ code is boilerplate code that the component-specific logic needs to use to be properly used by React Native. After the component-specific logic has been connected with the generated code, the component can be integrated in the app.

The following section will guide you through the creation of a Fabric Component, step-by-step.

:::caution
Fabric Components only works with the **New Architecture** enabled.
To migrate to the **New Architecture**, follow the [Migration guide](../new-architecture-intro)
:::

## How to Create a Fabric Components

To create a Fabric Component, we have to follow these steps:

- Define a set of JavaScript specifications.
- Configure the component so that it can be consumed by an app.
- Write the native code required to make it work.

Once these steps are done, the component is ready to be consumed by an app. Therefore, the guide shows how to add it to an app, leveraging _autolinking_, and how to reference it from the JavaScript code.

## 1. Folder Setup

The easiest way to create a component is as a separate module we will then import as a dependency for our apps. This keeps the component decoupled from the app, and auto-linking can be used to manage it properly.

For this guide, we are going to create a Fabric Component that centers some text on the screen.

Let's create a new folder at the same level of our app and let's call it `RTNCenteredText`.

In this folder, we are going to create three subfolders: `js`, `ios` and `android`.

The final result should look like this:

<figure>
  <img width="500" alt="Folder Structure for a Fabric Component" src="/docs/assets/NewArchitecture/AppFolderStructure.png"/>
  <figcaption>Initial folder structure for a Fabric Component.</figcaption>
</figure>

## 2. JavaScript Specification

The **New Architecture** requires to specify a single source of truth for your component interfaces, using a typed dialect of JavaScript (either [Flow](https://flow.org/) or [TypeScript](https://www.typescriptlang.org/)). We need a typed dialect because **Codegen** has to generate code in strongly-typed languages, including C++, Objective-C++ and Java.

Another important aspect of the JavaScript specification is the file name. A component filename must end with the `NativeComponent.js` (or `jsx`, `ts`, `tsx`) suffix. For example, if you want to create a `MyFabricComponent` component, the specification file must be named `MyFabricComponentNativeComponent.js` (or any other supported extension). The **Codegen** process will look for files whose name ends with `NativeComponent` to generate the required code.

The following are the specification of our `RTNCenteredText` component in both Flow and TypeScript: let's create a `RTNCenteredText` file with the proper extension in the `js` folder.

<Tabs groupId="fabric-component-specs" defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem label='flow'>

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
<TabItem label='typescript'>

```typescript
import type { ViewProps } from 'ViewPropTypes';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  ...ViewProps,
  text: string | null | undefined,
  // add other props here
}

export default codegenNativeComponent<NativeProps>(
  'RTNCenteredText'
) as HostComponent<NativeProps>;
```

</TabItem>
</Tabs>

Let's break these down a little.

At the beginning of the spec files, there are the imports. Here, we can import what we need from React Native and other dependencies if needed. The most important imports, that are present in all the Fabric Components, are:

- The `HostComponent`, which is the type our exported component needs to conform to;
- The `codegenNativeComponent` function, which is responsible to actually register the component in the JavaScript runtime.

The second section of the files contains the **props** of the component. [Props](https://reactnative.dev/docs/next/intro-react#props) (short for "properties") are component-specific information that let you customize React components. In this case, we want to control the `text` the component will render.

Finally, we invoke the `codegenNativeComponent` generic function, passing the name we want to use for our component. The returned value is then exported by the JavaScript file in order to be used by the app.

:::caution
We are writing JavaScript files importing types from libraries, without setting up a proper node module and installing its dependencies. The outcome of this is that your IDE may have troubles resolving the import statements and you may see errors and warnings.
These will disappear as soon as we add the the Fabric Component as a dependency of our React Native app.
:::

## 3. Component Configuration

The second element we need to properly develop the Fabric Component is a bit of configuration, that will help you setting up:

- all the data the **CodeGen** process requires to run properly
- the files required to link the Fabric Component into the app

Some of these configuration are shared between iOS and Android, while the others are platform-specific.

### Shared

The shared configuration is a `package.json` file that will be used by yarn when installing your component. Create the `package.json` file in the root of the `RTNCenteredText` directory.

```json
{
  "name": "rnt-centered-text",
  "version": "0.0.1",
  "description": "Showcase a Fabric Component with a centered text",
  "react-native": "js/index",
  "source": "js/index",
  "files": [
    "js",
    "android",
    "ios",
    "rnt-centered-text.podspec",
    "!android/build",
    "!ios/build",
    "!**/__tests__",
    "!**/__fixtures__",
    "!**/__mocks__"
  ],
  "keywords": ["react-native", "ios", "android"],
  "repository": "https://github.com/<your_github_handle>/rnt-centered-text",
  "author": "<Your Name> <your_email@your_provider.com> (https://github.com/<your_github_handle>)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/<your_github_handle>/rnt-centered-text/issues"
  },
  "homepage": "https://github.com/<your_github_handle>/rnt-centered-text#readme",
  "devDependencies": {},
  "peerDependencies": {
    "react": "*",
    "react-native": "*"
  },
  "codegenConfig": {
    "libraries": [
      {
        "name": "RTNCenteredTextSpecs",
        "type": "components",
        "jsSrcsDir": "js"
      }
    ]
  }
}
```

Let's break it down.

The upper part of the file contains some descriptive information like the name of the component, its version and what composes it.
Make sure to update the various placeholders which are wrapped in `<>`, so replace all the occurrences of the `<your_github_handle>`, `<Your Name>`, and `<your_email@your_provider.com>` tokens.

Then we have the dependencies for this package, specifically we need `react` and `react-native`, but you can add all the other dependencies you may have.

Finally, the last important bit is the `codegenConfig` field. This configures the **CodeGen** process. It contains an array of libraries, each of which is defined by three fields:

- `name`: The name of the library we are going to generate. By convention, we add the `Specs` suffix.
- `type`: The type of module contained by this package. In this case, we have a component, thus the key to use is `components`.
- `jsSrcsDir`: the relative path to access the `js` specification that will be parsed by the CodeGen.

### iOS: Create the `podspec` file

Now we configure the native component so that we can generate the code necessary for integration with our app. For further information on how the **CodeGen**, have a look [here](/docs/pillars-codegen.md).

For iOS, we need to create a `.podspec` file which will define the component as a dependency. It will stay in the root folder of the `RTNCenteredText` component, outside the `ios` folder.
The `.podspec` file for our component will look like this

```ruby title="rnt-centered-text.podspec"
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

folly_version = '2021.06.28.00-v2'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name            = "rnt-centered-text"
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

The `podspec` file has to be a sibling of the `package.json` file and its name is the one we set in the `package.json`'s `name` property: `rnt-centered-text`.

The first part of the file prepares some variables we will use throughout the rest of it. Then, there is a section that contains some information used to configure the pod, like its name, version, and description. Finally, we have a set of dependencies that are required by the new architecture.

### Android: Create the `build.gradle` file

We need to create a `build.gradle` file in the `android` folder, with the following contents:

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
    libraryName = "RTNCenteredText"
    codegenJavaPackageName = "com.RTNCenteredText"
}
```

The `gradle` contains various section to properly configure the library and to access the required dependencies. The most interesting bits are:

- the `defaultConfig` block within the `android` block, where we add a `buildConfigField` to enable the new architecture.
- the `react` block where we configure the CodeGen process. For Android, we need to specify:
  - The `jsRootDir` which contains the relative path to the JavaScript specs
  - The `libraryName` we will use to link the library to the app.
  - The `codegenJavaPackageName` which corresponds to the name of the Java Package we will use to group the code generated by the **CodeGen**.

## 4. Native Code

The last step requires us to write some native code to connect the JavaScript side of our Component to what is offered by the platforms. This process requires two main steps:

- Run the **CodeGen** to see what would be generated
- Write the native code that will make it work

When developing a React Native app that uses a Fabric Component, it is responsibility of the app to actually generate the code using **CodeGen**. However, when developing a Fabric Component as a library, we need to reference the generated code and it is therefore useful to see what the app will generate.

As first step for both iOS and Android, this guide shows how to execute manually the scripts used by **CodeGen** to generate the required code. Further information on **CodeGen** can be found [here](/docs/pillars-codegen.md)

:::caution
The code generated by the **CodeGen** in this step should not be committed to the versioning system. React Native apps are able to generate the code when the app is built. This allows to avoid any ABI incompatibility and to ensure that a consistent version of the **CodeGen** is used.
:::

### iOS

#### Generate the code - iOS

To run Codegen for the iOS platform, we need to open a terminal and run the following command:

```sh
cd MyApp
yarn add ../RTNCenteredText
cd ..
node MyApp/node_modules/react-native/scripts/generate-artifacts.js \
  --path MyApp/ \
  --outputPath RTNCenteredText/generated/
```

This script first adds the `RTNCenteredText` module to the app with `yarn add`. Then, it invokes Codegen via the `generate-artifacts.js` script.

The `--path` option specifies the path to the app, while the `--outputPath` option tells the script where to output the generated code.

The output of this process is the following folder structure:

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

The relevant path for the Component we are writing is `generated/build/generated/ios/react/renderer/components/RTNCenteredTextSpecs`.
This folder contains all the generated code required by our Component.

See the [CodeGen](./pillars-codegen) section for further details on the generated files.

#### Write the Native iOS Code

Now that we can see the iOS code we need, it's time to write the Native code for our Fabric Component.
We need to create three files in the `RTNCenteredText/ios` folder:

1. The `RTNCenteredTextManager.mm`, an Objective-C++ file that declares what the Component exports.
2. The `RTNCenteredText.h`, a header file for the actual view.
3. The `RTNCenteredText.mm`, the implementation of the view.

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

This file is the manager for the Fabric Component.

The most important call is to the `RCT_EXPORT_MODULE` which is required to export the module so that Fabric can retrieve and instantiate it.

Then, we have to expose the `text` property for the Fabric Component. This is done with the `RCT_EXPORT_VIEW_PROPERTY` macro, specifying a name and a type.

:::info
There are other macros that can be used to export custom properties, emitters and other constructs. You view the code that specifies them [here](https://github.com/facebook/react-native/blob/main/React/Views/RCTViewManager.h)
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

This file defines the interface for the `RTNCenteredText` view. Here, we can add any native method we may want to invoke on the view. For this guide, we don't need anything, therefore the interface is empty.

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

This file contains the actual implementation of the view.

It starts with some import which requires us to read from the files generated by the **CodeGen**.

It has to conform to a specific protocol, in this case `RCTRTNCenteredTextViewProtocol`, which is generated by the **CodeGen**.

It defines a static `(ComponentDescriptorProvider)componentDescriptorProvider` method, which is used by Fabric to retrieve the Descriptor provider to instantiate the object.

Then, we can initialize the view as we usually do with iOS views. In the `init` method, it is important to create a `defaultProps` struct using the `RTNCenteredTextProps` type from the **CodeGen**. We need to assign it to the private `_props` property to correctly initialize the Fabric Component. The remaining part of the initializer is standard Objective-C code to create views and layout them with AutoLayout.

The last two pieces are the `updateProps` method and the `RTNCenteredTextCls` method.

The `updateProps` method is invoked by Fabric every time a prop changes in JavaScript. We can then cast the props passed as parameters to the proper `RTNCenteredTextProps` type and update the native code if it needs to be updated.

Notice that the superclass method `[super updateProps]` must be invoked as the last statement of this method, otherwise the `props` and `oldProps` struct will have the same values.

Finally, the `RTNCenteredTextCls` is another static method used to retrieve the correct instance of the class at runtime.

:::caution
Differently from Native Components, Fabric requires us to manually implement the `updateProps` method. It's not enough to export properties with the `RCT_EXPORT_XXX` and `RCT_REMAP_XXX` macros.
:::

### Android

Android follows some similar steps to iOS. We have to generate the code for Android, and then we have to write some native code to make it works.

#### Generate the Code - Android

To generate the code for Android, we need to manually invoke the CodeGen. This is done similarly to what we did for iOS: first, we need to add the package to the app and then we need to invoke a script.

```sh title="Running CodeGen for Android"
cd MyApp
yarn add ../RTNCenteredText
cd android
./gradlew generateCodegenArtifactsFromSchema --rerun-tasks
```

This script first adds the package to the app, in the same way iOS does. Then, after moving to the `android` folder, it invokes a Gradle task to generate the codegen.

:::note
To run the **CodeGen**, you need to enable the **New Architecture** in the Android app. This can be done by opening the `gradle.properties` files and by switching the `newArchEnabled` property from `false` to `true`.
:::

The generated code is stored in the `MyApp/node_modules/rnt-centered-text/android/build/generated/source/codegen` folder and it has this structure:

```title="Android generated code"
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

You can see that the content of the `codegen/jni/react/renderer/components/RTNCenteredTextSpecs` looks similar to the files created by the iOS counterpart. Other interesting pieces are the `Android.mk` and `CMakeList.txt` files, which we need to configure the Fabric Component in the app, and the `RTNCenteredTextManagerDelegate.java` and `RTNCenteredTextManagerInterface.java` that we need to use in our manager.

See the [CodeGen](./pillars-codegen) section for further details on the generated files.

#### Write the Native Android Code

The native code for the Android side of a Fabric Components requires four pieces:

1. An `AndroidManifest.xml` file.
2. A `RTNCenteredText.java` that represents the actual view.
3. A `RTNCenteredTextManager.java` to instantiate the view.
4. A `RTNCenteredTextPackage.java` that React Native uses to configure the library.

The final structure within the Android library should be like this.

```title="Android Folder Structure"
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

##### AndroidManifest.xml

```xml title="AndroidManifest.xml"
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.rtncenteredtext">
</manifest>
```

This is a small manifest file that defines the package for our module.

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

This class represents the actual view Android is going to represent on screen. It inherit from `TextView` and we configure the basic aspects of it using a private `configureComponent()` function

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

The `RTNCenteredTextManager` is a class used by React Native to instantiate the native component. It is the class that leverage the **CodeGen** in order to implement all the proper interfaces (See the `RTNCenteredTextManagerInterface` interface in the `implements` clause) and it uses the `RTNCenteredTextManagerDelegate`.

It is also responsible to export all the constructs required by ReactNative: the class itself is annotated with `@ReactModule` and the `setText` method is annothated with `@ReactProp`.

##### RTNCenteredTextPackage.java

```java title="RTNCenteredTextPackage"
package com.rtncenteredtext;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RTNCenteredTextPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> viewManagers = new ArrayList<>();
        viewManagers.add(new RTNCenteredTextManager(reactContext));
        return viewManagers;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

}
```

This is the last piece of Native Code for Android. It defines the Package object that will be used by the app to load the manager.

## 5. Adding the Fabric Component To Your App

This is the last step to finally see our Fabric Component running on our app.

### Shared

First of all, we need to add the NPM package which contains the Component to the app. This can be done with the following command:

```sh
cd MyApp
yarn add ../RTNCenteredText
```

This command will add the `RTNCenteredText` Component to the `node_modules` of your app.

### iOS

Then, we need to install the new dependencies in our iOS project. To do so, we need to run these commands:

```sh
cd ios
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

This command will look for all the dependencies of the project and it will install the iOS ones. The `RCT_NEW_ARCH_ENABLED=1` instruct **Cocoapods** that it has to run some additional operations to run the **CodeGen** that is required by **Fabric**.

:::note
You may have to run `bundle install` once before you can use `RCT_NEW_ARCH_ENABLED=1 bundle exec pod install`. You won't need to run `bundle install` anymore, unless you need to change the ruby dependencies.
:::

#### Android

Android configuration requires slightly more steps in order to be able to use our new Component.

First, we need to enable the **New Architecture**, because **Fabric** requires it to run properly. This can be done by:

1. Open the `android/gradle.properties` file
2. Scroll down to the end of the file and switch the `newArchEnabled` property from `false` to `true`.

Then, we need to instruct the `Android.mk` file that it needs to build also the new library.
This can be with these steps:

1. Open the `android/app/src/main/jni/Android.mk` file
1. Add this line to include the library at the beginning of the file:

   ```diff
   include $(REACT_ANDROID_DIR)/Android-prebuilt.mk

   # If you wish to add a custom TurboModule or Fabric component in your app you
   # will have to include the following autogenerated makefile.
   # include $(GENERATED_SRC_DIR)/codegen/jni/Android.mk

   +include $(NODE_MODULES_DIR)/rnt-centered-text/android/build/generated/source/codegen/jni/Android.mk
   include $(CLEAR_VARS)
   ```

1. In the same file, scroll down until you find a list of `libreact` libraries. There, we have to add the the library that has been generated. To do so, we need to add this line:
   ```diff
   libreact_codegen_rncore \
   +libreact_codegen_RTNCenteredText \
   libreact_debug \
   ```

:::note
The name of the library will be `libreact_codegen_<libraryname>` where `<libraryname>` is the value that has been set in the config.
Also, this step won't be necessary anymore as soon as we release a version of React Native which supports autolinking for Android.
:::

Finally, we need to configure the Fabric component registry to load the Fabric Component at runtime. This can be done by:

1. Open the `MyApp/android/app/src/main/jni/MainComponentsRegistry.cpp`
1. Add the following include:

   ```c++
   #include <react/renderer/components/RTNCenteredText/ComponentDescriptors.h>
   ```

1. Update the `sharedProviderRegistry` with this line:

   ```diff
   auto providerRegistry = CoreComponentsRegistry::sharedProviderRegistry();

   +providerRegistry->add(concreteComponentDescriptorProvider<RTNCenteredTextComponentDescriptor>());

   // Custom Fabric Components go here. You can register custom
   ```

### JavaScript

Finally, we can read the Component in our JavaScript application.
To do so, we have to:

1. Import the Component in the js file that uses it. So, if we want to use it in the `App.js`, we need to add this line:

   ```js title="App.js"
   import RTNCenteredText from 'rnt-centered-text/js/RTNCenteredTextNativeComponent';
   ```

2. Then, we need to use it in another React Native component. The syntax is the same as for any other component:
   ```js title="App.js"
   // ... other code
   const App: () => Node = () => {
     // ... other App code ...
     return (
       // ...other React Native elements...
       <RTNCenteredText
         text="Hello World!"
         style={{ width: '100%', height: 30 }}
       />
       // ...other React Native Elements
     );
   };
   ```

Now, we can run the React Native app and see our Component on the screen.

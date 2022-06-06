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

### Folder Setup

The easiest way to create a component is as a separate module we will then import as a dependency for our apps. This keeps the component decoupled from the app, and auto-linking can be used to manage it properly.

For this guide, we are going to create a Fabric Component that centers some text on the screen.

Let's create a new folder at the same level of our app and let's call it `RTNCenteredText`.

In this folder, we are going to create three subfolders: `js`, `ios` and `android`.

The final result should look like this:

<figure>
  <img width="500" alt="Folder Structure for a Fabric Component" src="/docs/assets/NewArchitecture/AppFolderStructure.png"/>
  <figcaption>Initial folder structure for a Fabric Component.</figcaption>
</figure>

### JavaScript Specification

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
- The `codegenNativeComponent` function, which is responsible to actually register the component in the JS runtime.

The second section of the files contains the **props** of the component. [Props](https://reactnative.dev/docs/next/intro-react#props) (short for "properties") are component-specific information that let you customize React components. In this case, we want to control the `text` the component will render.

Finally, we invoke the `codegenNativeComponent` generic function, passing the name we want to use for our component. The returned value is then exported by the JavaScript file in order to be used by the app.

:::caution
We are writing JavaScript files importing types from libraries, without setting up a proper node module and installing its dependencies. The outcome of this is that your IDE may have troubles resolving the import statements and you may see errors and warnings.
These will disappear as soon as we add the the Fabric Component as a dependency of our React Native app.
:::

### Component Configuration

The second element we need to properly develop the Fabric Component is a bit of configuration, that will help you setting up:

- all the data the **CodeGen** process requires to run properly
- the files required to link the Fabric Component into the app

Some of these configuration are shared between iOS and Android, while the others are platform-specific.

#### Shared

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
        "name": "RNTCenteredTextSpecs",
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

#### iOS: Create the `podspec` file

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

#### Android: Create the `build.gradle` file

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

### Native Code

The last step requires us to write some native code to connect the JS side of our Component to what is offered by the platforms. This process requires two main steps:

- Run the **CodeGen** to see what would be generated
- Write the native code that will make it work

When developing a React Native app that uses a Fabric Component, it is responsibility of the app to actually generate the code using **CodeGen**. However, when developing a Fabric Component as a library, we need to reference the generated code and it is therefore useful to see what the app will generate.

As first step for both iOS and Android, this guide shows how to execute manually the scripts used by **CodeGen** to generate the required code. Further information on **CodeGen** can be found [here](/docs/pillars-codegen.md)

:::caution
The code generated by the **CodeGen** in this step should not be committed to the versioning system. React Native apps are able to generate the code when the app is built. This allows to avoid any ABI incompatibility and to ensure that a consistent version of the **CodeGen** is used.
:::

#### iOS

##### Generate the code

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
                        ├── RNTCenteredTextSpecs
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

The relevant path for the Component we are writing is `generated/build/generated/ios/react/renderer/components/RNTCenteredTextSpecs`.
This folder contains all the generated code required by our Component.

See the [CodeGen](./pillars-codegen) section for further details on the generated files.

##### Write the Native iOS Code

Now that we can see the iOS code we need, it's time to write the Native code for our Fabric Component.
We need to create three files in the `RTNCenteredText/ios` folder:

1. The `RNTCenteredTextManager.mm`, an Objective-C++ file that declares what the Component exports.
2. The `RNTCenteredText.h`, a header file for the actual view.
3. The `RNTCenteredText.mm`, the implementation of the view.

###### RNTCenteredTextManager.mm

```objc title="RNTCenteredTextManager.mm"
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

###### RNTCenteredText.h

```objc title="RNTCenteredText.h"
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNCenteredText : RCTViewComponentView

@end

NS_ASSUME_NONNULL_END
```

This file defines the interface for the `RTNCenteredText` view. Here, we can add any native method we may want to invoke on the view. For this guide, we don't need anything, therefore the interface is empty.

###### RNTCenteredText.mm

```cpp title="RNTCenteredText.mm"
#import "RTNCenteredText.h"

#import <react/renderer/components/RNTCenteredTextSpecs/ComponentDescriptors.h>
#import <react/renderer/components/RNTCenteredTextSpecs/EventEmitters.h>
#import <react/renderer/components/RNTCenteredTextSpecs/Props.h>
#import <react/renderer/components/RNTCenteredTextSpecs/RCTComponentViewHelpers.h>

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

The `updateProps` method is invoked by Fabric every time a prop changes in JS. We can then cast the props passed as parameters to the proper `RTNCenteredTextProps` type and update the native code if it needs to be updated.

Notice that the superclass method `[super updateProps]` must be invoked as the last statement of this method, otherwise the `props` and `oldProps` struct will have the same values.

Finally, the `RTNCenteredTextCls` is another static method used to retrieve the correct instance of the class at runtime.

:::caution
Differently from Native Components, Fabric requires us to manually implement the `updateProps` method. It's not enough to export properties with the `RCT_EXPORT_XXX` and `RCT_REMAP_XXX` macros.
:::

#### Android

### Adding the Fabric Component To Your App

This is the last step to finally see our Fabric Component running on our app.

#### iOS

To achieve this in iOS, we need to issue a couple of commands and then we can read the Component from JS.

First of all, we need to add the NPM package which contains the Component to the app. This can be done with the following command:

```sh
cd MyApp
yarn add ../RTNCenteredText
```

This command will add the `RTNCenteredText` Component to the `node_modules` of your app. Then, we need to install the new dependencies in our iOS project. To do so, we need to run these commands:

```sh
cd ios
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

This command will look for all the dependencies of the project and it will install the iOS ones. The `RCT_NEW_ARCH_ENABLED=1` instruct **Cocoapods** that it has to run some additional operations to run the **CodeGen** that is required by **Fabric**.

:::note
You may have to run `bundle install` once before you can use `RCT_NEW_ARCH_ENABLED=1 bundle exec pod install`. You won't need to run `bundle install` anymore, unless you need to change the ruby dependencies.
:::

#### Android

#### JS
Finally, we can read the Component in our JS application.
To do so, we have to:

1. Import the Component in the js file that uses it. So, if we want to use it in the `App.js`, we need to add this line:

   ```js title="App.js"
   import RTNCenteredText from 'rnt-centered-text/js/RNTCenteredTextNativeComponent';
   ```

2. Then, we need to use it in another React Native component. The syntax is the same as for any other component:
   ```js title="App.js"
   // ... other code
   const App: () => Node = () => {
     // ... other App code ...
     return (
       // ...other RN elements...
       <RTNCenteredText
         text="Hello World!"
         style={{ width: '100%', height: 30 }}
       />
       // ...other RN Elements
     );
   };
   ```

Now, we can run the React Native app and see our Component on the screen.

---
id: new-architecture-playbook
title: The New Architecture Playbook
---

# Playbook for Adopting the New Architecture

> NOTE: This documentation is still experimental and details are subject to changes as we iterate. Feel free to share your feedback on the [react-native-website PR](https://github.com/facebook/react-native-website) for this page.

This migration guide is designed for React Native **library authors** and **application developers**. It outlines the steps you need to follow to roll out the new Architecture, composed by the **new NativeModule system (TurboModule) and the new Renderer (Fabric)** to your **Android** and **iOS** libraries and apps.

## Table of Contents

The playbook is divided into three sections:

- **Supporting the New Architecture in your Library**
  - Prerequisites for Supporting the New Architecture in JavaScript
  - Enabling the New Architecture in your Library
    - Android, iOS
- **Supporting the New Architecture in your App**
  - Prerequisites for Supporting the New Architecture in your App
  - Enabling the New NativeModule System (TurboModule) in your App
    - Android, iOS
  - Enabling the New Renderer (Fabric) in your App
    - Android, iOS
- **Appendix**

# Supporting the New Architecture in Your Library

## Prerequisites for Supporting the New Architecture in JavaScript

The following steps will help ensure your modules and components are ready for the new architecture.

### TurboModules: Define Specs in JavaScript

Under the TurboModule system, the JavaScript spec will serve as the source of truth for the methods that are provided by each native module. Without the JavaScript spec, it is up to you to ensure your public method signatures are equivalent on Android and iOS.

As the first step to adopting the new architecture, you will start by creating these specs for your native modules. You can do this, right now, prior to actually migrating your native module library to the new architecture. Your JavaScript spec will be used later on to generate native interface code for all the supported platforms, as a way to enforce uniform APIs across platforms.

#### Writing the JavaScript Spec

The JavaScript spec defines all APIs that are provided by the native module, along with the types of those constants and functions. You will be using Flow to type the input arguments and outputs of your native module’s methods.

By convention, JavaScript spec files are named `Native<MODULE_NAME>.js` and they export a `TurboModuleRegistry` `Spec` object. The following is a basic JavaScript spec template:

```javascript
'use strict';

import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  +getConstants: () => {||};

  // your module methods go here, for example:
  +getString(id: string): Promise<string>;
}

export default (TurboModuleRegistry.get<Spec>('<MODULE_NAME>'): ?Spec);
```

#### Supported Flow Types

You will be using [Flow type annotations](https://flow.org/en/docs/types/) to define your JavaScript spec. Keeping in mind that the goal of defining a JavaScript spec is to ensure the generated native interface code is type safe, the set of supported Flow types will be those that can be mapped one-to-one to a corresponding type on the native platform.

<!-- alex ignore savage -->

In general, this means you can use primitive types (strings, numbers, booleans), as well as function types, object types, and array types. Union types, on the other hand, are not supported. All types must be read-only in Flow: either `+` or `$ReadOnly<>` or `{||}` objects.

> See Appendix [I. Flow Type to Native Type Mapping](#i-flow-type-to-native-type-mapping).

#### Be Consistent Across Platforms and Eliminate Type Ambiguity

Before adopting the new architecture in your native module, you will need to ensure your methods are consistent across platforms. This is something you will realize as you set out to write the JavaScript spec for your native module - remember, that JavaScript spec defines what the methods will look like on all supported platforms.

If your existing native module has methods with the same name on multiple platforms, but with different numbers or types of arguments across platforms, you will need to find a way to make these consistent. If you have methods that can take two or more different types for the same argument, you will also need to find a way to resolve this type ambiguity as type unions are intentionally not supported.

### Make sure _autolinking_ is enabled

<!-- alex ignore master -->

[Autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) is a feature of the React Native CLI that simplifies the installation of third-party React Native libraries. Instructions to enable _autolinking_ are available at https://github.com/react-native-community/cli/blob/master/docs/autolinking.md.

#### Android

On Android, this generally requires you to include `native_modules.gradle` in both your `settings.gradle[.kts]` and `build.gradle[.kts]`.

If you used the default template provided with React Native (i.e. you used `yarn react-native init <Project>`), then you have autolinking already enabled.

You can anyway verify that you have it enabled with:

```bash
$ grep -r "native_modules.gradle" android

android/app/build.gradle:apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
android/settings.gradle:apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
...
```

#### iOS

On iOS, this generally requires your library to provide a Podspec (see [`react-native-webview`](https://github.com/react-native-community/react-native-webview/blob/master/react-native-webview.podspec) for an example).

> To determine if your library is set up for autolinking, check the CocoaPods output after running `pod install` on an iOS project. If you see "auto linking library name", you are all set to go.

### Preparing your JavaScript codebase for the new React Native Renderer (Fabric)

The new renderer also known as Fabric doesn’t use the UIManager so direct calls to UIManager will need to be migrated. Historically, calls to UIManager had some pretty complicated patterns. Fortunately, we’ve created new APIs that are much cleaner. These new APIs are forwards compatible with Fabric so you can migrate your code today and they will work properly when you turn on Fabric!

Fabric will be providing new type safe JS APIs that are much more ergonomic than some of the patterns we've seen in product code today. These APIs require references to the underlying component, no longer using the result of `findNodeHandle`. `findNodeHandle` is used to search the tree for a native component given a class instance. This was breaking the React abstraction model. `findNodeHandle` won’t be compatible with React concurrent mode once we are ready to roll that out. Deprecation of `findNodeHandle` in React Native is similar to the [deprecation of `findDOMNode` in React DOM](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

While we know that all deprecations are a hassle, this guide is intended to help people update components as smoothly as possible. Here are the steps you need to take to get your JS codebase ready for Fabric

1. Migrating findNodeHandle / getting a HostComponent
2. Migrating `.measure*()`
3. Migrating off `setNativeProps`
4. Move the call to `requireNativeComponent` to a separate file
5. Migrating off `dispatchViewManagerCommand`
6. Using `codegenNativeComponent`

#### Migrating `findNodeHandle` / getting a `HostComponent`

<!-- alex ignore host -->

Much of the migration work requires a HostComponent ref to access certain APIs that are only attached to host components (like View, Text, or ScrollView). HostComponents are the return value of calls to `requireNativeComponent`. `findNodeHandle` tunnels through multiple levels of component hierarchy to find the nearest native component.

As a concrete example, this code uses `findNodeHandle` to tunnel from `MyComponent` through to the `View` rendered by `MyJSComponent`.

```javascript
class MyComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof MyJSComponent>;

  render() {
    return <MyJSComponent ref={this._captureRef} onSubmit={this._onSubmit} />
  }

  _captureRef: (ref) => {
    this._ref = ref;
  }

  _onSubmit: () => {
    const nodeHandle = findNodeHandle(this._ref);

    if (nodeHandle) {
      UIManager.measure(nodeHandle, () => {});
    }
  }
}

function MyJSComponent(props) {
  return (
    <View>
      <SubmitButton onSubmit={props.onSubmit} />
    </View>
  );
}
```

We can’t convert this call to `this._ref.measure` because `this._ref` is an instance to `MyJSComponent`, which is not a HostComponent and thus does not have a `measure` function.

`MyJSComponent` renders a View, which is a HostComponent, so we need to get a reference to `View` instead. There are typically two approaches to get what we need. If the component we need to get the ref from is a function component using `forwardRef` is probably the right choice. If it is a class component with other public methods, adding a public method for getting the ref is an option. Here are examples of those two forms:

#### Using `forwardRef`

```javascript
class MyComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof MyJSComponent>;

  render() {
    return <MyJSComponent ref={this._captureRef} onSubmit={this._onSubmit} />
  }

  _captureRef: (ref) => {
    this._ref = ref;
  }

  _onSubmit: () => {
    if (this._ref != null)
      this._ref.measure(() => {});
    }
  }
}

const MyJSComponent = React.forwardRef((props, forwardedRef) => {
  return (
    <View ref={forwardedRef}>
      <SubmitButton onSubmit={props.onSubmit} />
    </View>
  );
});
```

#### Using a getter, (note the addition of `getViewRef`)

```javascript
class MyComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof MyJSComponent>;

  render() {
    return <MyJSComponent ref={this._captureRef} onSubmit={this._onSubmit} />
  }

  _captureRef: (ref) => {
    this._ref = ref;
  }

  _onSubmit: () => {
    if (this._ref != null)
      this._ref.getViewRef().measure(() => {});
    }
  }
}

class MyJSComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof View>;

  render() {
    return (
      <View ref={this._captureRef}>
        <SubmitButton onSubmit={props.onSubmit} />
      </View>
    );
  }

  getViewRef(): ?React.ElementRef<typeof View> {
    return this._ref;
  }

  _captureRef: (ref) => {
    this._ref = ref;
  }
}
```

#### Migrating `.measure*()`

Let’s take a look at an example calling `UIManager.measure`. This code might look something like this

```javascript
if (this._scrollView == null || viewRef == null) {
  return;
}

const viewHandle = ReactNative.findNodeHandle(viewRef);
const scrollViewHandle = ReactNative.findNodeHandle(
  this._scrollView
);
UIManager.measure(scrollViewHandle, (x, y, width, height) => {
  UIManager.measureLayout(
    viewHandle,
    scrollViewHandle,
    emptyFunction,
    successCallback
  );
});
```

In order to call `UIManager.measure*` we need to call `findNodeHandle` first and pass in those handles. With the new API, we instead call `measure` directly on native refs without `findNodeHandle`. The example above with the new API looks like this:

```
if (this._scrollView == null || viewRef == null) {
  return;
}

this._scrollView.measure((x, y, width, height) => {
  viewRef.measureLayout(this._scrollView, successCallback);
})
```

`findNodeHandle` can be called with any component as an argument, but the new `.measure*` can only be called on native refs. If the ref originally passed into `findNodeHandle` is not a native ref to start with, use the strategies above in _getting a HostComponent_ to find the native ref.

#### Migrating off `setNativeProps`

setNativeProps will not be supported in the post-Fabric world. To migrate, move all `setNativeProp` values to component state.

**Example**

```javascript
class MyComponent extends React.Component<Props> {
  _viewRef: ?React.ElementRef<typeof View>;

  render() {
    const {somePropValue} = this.props;
    return <View
       onPress={this._onSubmit}
       ref={this._captureRef}
       someProp={somePropValue}
       style={styles.view} />
  }

  _captureRef: (ref) => {
    this._viewRef = ref;
  }

  _onSubmit: () => {
    this._viewRef.setNativeProps({
       style: styles.submittedView,
       accessibility: true
    });
    // ...other logic for onSubmit
  }
}

const styles = StyleSheet.create({
  view: { backgroundColor: 'white'},
  submittedView: {borderWidth: 1}
});
```

In this example when the View is pressed there is a `setNativeProps` call to update the style and accessibility props of the component. To migrate this component it’s important to understand its current behavior using `setNativeProps`.

#### Pre-Fabric, Component Props Persist

On first render, the component props are those declared in the render function. After the View is pressed `_onSubmit` calls `setNativeProps` with updated prop values.
The resulting component can be represented as such:

```javascript
<View
  accessibility={true}
  onPress={this._onSubmit}
  ref={this._captureRef}
  someProp={somePropValue}
  style={[styles.view, styles.submittedView]}
/>
```

Note that all prop values set in the render function are unchanged even though `setNativeProps` didn’t pass those props. Also, `style` is now the merged value of its value prior to `_onSubmit` and `styles.submittedView`. This is the important takeaway: in our current pre-Fabric world, **component props persist.** The platform view caches the prop values its passed from the JS side. If this wasn’t the case then following the setNativeProps call, React Native would have rendered a component like this:

```javascript
<View accessibility={true} style={styles.submittedView} />
```

The fact that React Native stores some internal state of each component that isn’t explicitly declared in last render is what Fabric intends to fix.

#### Moving `setNativeProps` to state

Taking those caveats into account, a proper migration would look like this:

```javascript
class MyComponent extends React.Component<Props> {
  state = {
    hasSubmitted: false,
    accessibility: false
  };

  render() {
    const {somePropValue} = this.props;
    const submittedStyle = this.state.hasSubmitted ? styles.submittedView: null;
    return <View
       accessibility={this.state.accessibility}
       onPress={this._onSubmit}
       someProp={somePropValue}
       style={[styles.view, submittedStyle]} />
  }

  _onSubmit: () => {
    this.setState(state => ({...state, hasSubmitted: true}));
    // ...other logic for onSubmit
  }
}


const styles = StyleSheet.create({
  view: { backgroundColor: 'white'},
  submittedView: {borderWidth: 1}
});
```

- We are using the `hasSubmitted` flag to represent whether or not we want to apply `styles.submittedView`. If the style was dynamic then it makes sense to store the style object in state
- `accessibility` is now explicitly passed to the View component as a boolean. This differs from the prior implementation where `accessibility` wasn’t passed as a prop in initial render but in this case we know the non-specification of `accessibility` is handled in the same way as `accessibilty={false}`

Be wary of your assumptions as uncaught subtleties can introduce differences in behavior! It’s a good idea to have snapshot tests of your component as they will highlight any differences pre and post your migration.

#### Move the call to `requireNativeComponent` to a separate file

This will prepare for the JS to be ready for the new codegen system for the new architecture. The new file should be named `<ComponentName>NativeComponent.js.`

```javascript
// 1. MyNativeView.js
// Old way
const RNTMyNativeView = requireNativeComponent('RNTMyNativeView');
...
  return <RNTMyNativeView />
// New way
import RNTMyNativeViewNativeComponent from 'RNTMyNativeViewNativeComponent';
...
  return <RNTMyNativeViewNativeComponent />

// RNTMyNativeViewNativeComponent.js
import {requireNativeComponent} from 'react-native';
const RNTMyNativeViewNativeComponent = requireNativeComponent(
  'RNTMyNativeView',
);
export default RNTMyNativeViewNativeComponent;
```

**[Flow users]** If `requireNativeComponent` is not typed, you can temporarily use the `mixed` type to fix the Flow warning, for example:

```javascript
import type { HostComponent } from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
// ...
const RCTWebViewNativeComponent: HostComponent<mixed> =
  requireNativeComponent < mixed > 'RNTMyNativeView';
```

#### Migrating off `dispatchViewManagerCommand`

Similar to one above, in an effort to avoid calling methods on the UIManager, all view manager methods are now called through an instance of `NativeCommands`. `codegenNativeCommands` is a new API to code-generate `NativeCommands` given an interface of your view manager’s commands.

**Before**

```javascript
class MyComponent extends React.Component<Props> {
  _moveToRegion: (region: Region, duration: number) => {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      'moveToRegion',
      [region, duration],
    );
  }

  render() {
    return <MyCustomMapNativeComponent
       onPress={this._moveToRegion} />
  }
}
```

**Creating the NativeCommands with `codegenNativeCommands`**

```javascript
// MyCustomMapNativeComponent.js
import codegeNativeCommands from 'codegenNativeCommands';
...
type Props = {...};

const MyCustomMapNativeComponent: HostComponent<Props> =
   requireNativeComponent<Props>('MyCustomMapNativeComponent');

interface NativeCommands {
  +moveToRegion: (
    ref: React.ElementRef<typeof MyCustomMapNativeComponent>,
    region: MapRegion,
    duration: number,
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['moveToRegion'],
});
```

Note:

- The first argument in the `moveToRegion` command is a HostComponent ref of the native component
- The arguments to the `moveToRegion` command are enumerated in the signature
- The command definition is co-located with the native component. This is an encouraged pattern
- Ensure you have included your command name in `supportedCommands` array

#### Using Your Command

```javascript
import {Commands,...} from './MyCustomMapNativeComponent';

class MyComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof MyCustomMapNativeComponent>;

  _captureRef: (ref) => {
    this._ref = ref;
  }

  _moveToRegion: (region: Region, duration: number) => {
    if (this._ref != null) {
      Commands.moveToRegion(this._ref, region, duration);
    }
  }

  render() {
    return <MyCustomMapNativeComponent
       ref={this._captureRef}
       onPress={this._moveToRegion} />
  }
}
```

#### Updating Native implementation [iOS]

In the example the code-generated `Commands` will dispatch `moveToRegion` call to the native component’s view manager. In addition to writing the JS interface, you’ll need to update your native implementation signatures to match the dispatched method call. See the mapping for [Android argument types](https://facebook.github.io/react-native/docs/native-modules-android#argument-types) and[iOS argument types](https://facebook.github.io/react-native/docs/native-modules-ios#argument-types) for reference.

**iOS**

```objc
RCT_EXPORT_METHOD(moveToRegion:(nonnull NSNumber *)reactTag
                        region:(NSDictionary *)region
                      duration:(double)duration
{
   ...
}
```

**Android**

```java
// receiveCommand signature has changed to receive String commandId
@Override
  public void receiveCommand(
      ReactMapDrawerView view, String commandId, @Nullable ReadableArray args) {
    switch (commandId) {
      case "moveToRegion":
        if (args == null) {
          break;
        }

        ReadableMap region = args.getMap(0);
        int durationMs = args.getInt(1);
        // ... act on the view...
        break;
    }
  }
```

## Enabling the New Architecture in Your Library (Android)

Once you have defined the JavaScript specs for your native modules as part of the [prerequisites](#prerequisites-for-supporting-the-new-architecture-in-your-application) and followed the Android/Gradle setup, you are now ready to migrate your library to the new architecture. Here are the steps you can follow to accomplish this.

#### 1. Configure Codegen in your Gradle File

You can now configure Codegen by specifying the following in the module-level `build.gradle` file:

```groovy
react {
    reactRoot = rootProject.file("../node_modules/react-native/")
    jsRootDir = rootProject.file("../js/")
    codegenDir = rootProject.file("../node_modules/react-native-codegen/")
    libraryName = "samplelibrary"
    codegenJavaPackageName = "com.example.samplelibrary"
}
```

_(Please note that this setup requires you to have the React Gradle Plugin configured in the prerequisite step)._

There are two arguments that are required:

- `reactRoot`: Reference to the `react-native` package root. Usually located inside `../node_modules/react-native`. For third-party NPM libraries that are installed in `node_modules`, this will be `../react-native`.
- `jsRootDir`: Reference to the directory that contains the JavaScript specs for this library.
- `codegenDir`: Reference to the `react-native-codegen` root. Usually located inside `./node_modules/react-native-codegen`

These are optional:

- `libraryName`: Optional. A string that identifies your library. By default, the codegen will use a library name that is derived from the name of the module with a `Spec` suffix. E.g. for `:example:project` it will be `ExampleProjectSpec`).
- `codegenJavaPackageName`: Optional. A string that represents the Java package your code should use. By default this will be `com.facebook.fbreact.specs` but you might want to customize it.

The generator will write its output inside the **build folder**, specifically inside `/build/generated/source/codegen`

### 2. Extend or implement the code-generated native interfaces

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

#### Extends the abstract class provided by the generated

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

## Enabling the New Architecture in your Library (iOS)

You have defined the JavaScript specs for your native modules as part of the [prerequisites](#turbomodules-define-specs-in-javascript) and you are now ready to migrate your library to the new architecture. Here are the steps you can follow to accomplish this.

### 1. Updating your Podspec for the new architecture

The new architecture makes use of CocoaPods.

#### Add Folly and Other Dependencies

We'll need to ensure Folly is configured properly in any projects that consume your library. With CocoaPods, we can use the `compiler_flags` and `dependency` properties to set it up.

Add these to your `Pod::Spec.new` block:

```ruby
# folly_version must match the version used in React Native
# See folly_version in react-native/React/FBReactNativeSpec/FBReactNativeSpec.podspec
folly_version = '2021.06.28.00-v2'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  # ...
  s.compiler_flags  = folly_compiler_flags

  s.pod_target_xcconfig    = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\""
  }

  s.dependency "React"
  s.dependency "React-RCTFabric" # This is for fabric component
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly", folly_version
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
  # ...
end
```

> Note: Currently, the Folly version used here must match the Folly version used by React Native. A version mismatch here may lead to errors when running `pod install`. If CocoaPods flags an issue with your Folly version, then you may have a version mismatch. Check which version is used by the core modules Podspecs (e.g. FBReactNativeSpec.podspec), and try running `pod install` again after editing your podspec with the correct Folly version.

#### Enable codegen in your package.json

At this point, you are now ready to enable code-gen support in your library. In your library’s package.json add the following:

```json
// in package.json
// Please note that this format is subject to change.
"codegenConfig": {
  "libraries": [
    {
      "name": "YourTurboModuleSpec",
      "type": "modules",
      "jsSrcsDir": "Libraries"
    },
    {
      "name": "YourComponentName",
      "type": "components",
      "jsSrcsDir": "Libraries"
    }
  ]
}
```

There's three arguments that are required:

- `name`: A name of your library. This will be used to determine import path for your library.
- `jsSrcsDir`: Path to the directory that contains the JavaScript specs for this library.

These arguments are optional:

- `type`: Optional. A string that determines which types of artifacts will be generated for your library: “modules” or “components”. If left unspecified, both modules and components artifacts will be generated.

### 2. Extend or implement the code-generated native interfaces

The JavaScript spec for your native module or component will be used to generate native interface code for each supported platform (i.e. Android and iOS). These native interface files will be generated when a React Native application that depends on your library is built.

While this generated native interface code will not ship as part of your library, you do need to make sure your Objective-C or Java code conforms to the protocols provided by these native interface files. You can use the code-gen script to generate your library’s native interface code in order to use as reference. The files that are output by the script should not be committed, but you’ll need to refer to them to determine what changes you need to make to your native modules in order for them to provide an implementation for each generated @protocol / native interface.

#### Conform to the protocols provided by the native interface code

Update your native module or component to ensure it implements/extends the native interface that has been code-generated from your JavaScript specs.

Following the example set forth in the previous section, your library might import MyAwesomeSpecs.h, extend the relevant native interface, and implement the necessary methods for this interface:

```objc
#import <MyAwesomeSpecs/MyAwesomeSpecs.h>

@interface MyAwesomeModule () <StringGetterSpec>
@end

RCT_EXPORT_METHOD(getString:(NSString *)string
                   callback:(RCTResponseSenderBlock)callback)
{
  // ...
}
```

For an existing native module, you will likely already have one or more instances of `[RCT_EXPORT_METHOD](https://reactnative.dev/docs/native-modules-ios#export-a-native-method-to-javascript)`. To migrate to the new architecture, you’ll need to make sure the method signature makes use of the structs provided by the codegen output.

# Supporting the New Architecture in Your Application

## Prerequisites for Supporting the New Architecture in your Application

There’s a few prerequisites that should be addressed before the new architecture is enabled in your application.

### Use a React Native nightly release

At this time, you must use a React Native nightly release in order to get access to the most up to date changes. Eventually, we will recommend targeting a minimum stable open source release.

This guide is written with the expectation that you’re using a specific nightly release. As new revisions of the playbook are release, the target nightly release may be updated. The specific nightly version that we will be using throughout the rest of the playbook is version `0.0.0-20211205-2008-583471bc4`.

Before upgrading your app to a specific nightly release, we recommend upgrading your app to the latest open source release. By upgrading to a published open source release first, you will be able to take advantage of tools like the [upgrade helper](https://react-native-community.github.io/upgrade-helper/) to determine what other changes may be required for your project.

As of this writing, the latest stable release is `0.66.3`. Once you have upgraded your project to this version successfully, you may proceed to targeting the `0.0.0-20211102-2008-8fef52035` nightly release. You may target this nightly release the same way you’d target any other version of React Native:

```bash
yarn add react-native@0.0.0-20211205-2008-583471bc4
```

### Install react-native-codegen v0.0.12 or above

Make sure that you have the most recent react-native-codegen package; otherwise, you might see an error like `***TypeError: RNCodegen.generateFromSchemas is not a function.***`

```bash
yarn add react-native-codegen@0.0.12
```

If you are still getting the error, you may have an older version installed under node_modules/react-native/node_modules. You can remove that or reinstall everything in node_modules to fix the problem.

#### Android specifics

Using the new architecture on Android has some prerequisites that you need to meet:

1. Using Gradle 7.x and Android Gradle Plugin 7.x
2. Using the **new React Gradle Plugin**
3. Building `react-native` **from Source**

You can update Gradle by running:

```bash
cd android && ./gradlew wrapper --gradle-version 7.3 --distribution-type=all
```

While the AGP version should be updated inside the **top level** `build.gradle` file at the `com.android.tools.build:gradle` dependency line.

If you’re set with it, let’s now install the new Gradle plugin which is distributed through a NPM package called [**`react-native-gradle-plugin`**](https://www.npmjs.com/package/react-native-gradle-plugin). You can do so with:

```bash
yarn add react-native-gradle-plugin
```

You can control if you have the package already installed by doing:

```bash
ls -la node_modules/react-native-gradle-plugin
```

Now, you can edit your **top level** `settings.gradle` file to include the following line at the end of the file:

```groovy
includeBuild('../node_modules/react-native-gradle-plugin') {
    dependencySubstitution {
        substitute(module("com.facebook.react:react")).using(project(":"))
    }
}
include(":ReactAndroid")
project(":ReactAndroid").projectDir = file('../node_modules/react-native/ReactAndroid')
```

Then, edit your **top-level Gradle file** to include the highlighted lines:

```groovy
buildscript {
    // ...
    dependencies {
        // Make sure that AGP is at least at version 7.x
        classpath("com.android.tools.build:gradle:7.0.1")

        // Add those lines
        classpath("com.facebook.react:react")
        classpath("de.undercouch:gradle-download-task:4.1.2")
    }
}
```

Edit your **module-level** **Gradle file** (usually `app/build.gradle[.kts]`) to include the following:

```groovy
apply plugin: "com.android.application"

// Add this line
apply plugin: "com.facebook.react"
```

Finally, it’s time to update your project to use the `react-native` dependency from source, rather than using a precompiled artifact from the NPM package. This is needed as the later setup will rely on building the native code from source.

Let’s edit your **module level** `build.gradle` (the one inside `app/` folder) and change the following line:

```groovy
dependencies {
  // Replace this:
  implementation "com.facebook.react:react-native:+"  // From node_modules
  // With this:
  implementation project(":ReactAndroid")  // From node_modules
```

### Use Hermes

Hermes is an open-source JavaScript engine optimized for React Native. We highly recommend using Hermes in your application. With Hermes enabled, you will be able to use the JavaScript debugger in Flipper to directly debug your JavaScript code.

Please [follow the instructions on the React Native website](https://reactnative.dev/docs/hermes) in order to enable Hermes in your application.

> iOS: If you opt out of using Hermes, you will need to replace `HermesExecutorFactory` with `JSCExecutorFactory` in any examples used throughout the rest of this playbook.

### iOS: Enable C++17 language feature support

Your Xcode project settings need to be updated to support C++17 language features.

**Instructions**

1. Select your project in the Project navigator on the left (e.g. MyXcodeApp)
2. Then, make sure your project is selected in the center pane (as opposed to a particular target in your project, e.g. MyXcodeApp under Project, not under Targets).
3. Go to Build Settings
4. Search for C++ Language Dialect or CLANG_CXX_LANGUAGE_STANDARD
5. Make sure **C++17** is selected from the dropdown menu (or enter "c++17" directly into the value box).

If done correctly, your diff will show the following changes to your project file:

```ruby
CLANG_CXX_LANGUAGE_STANDARD = "c++17"
```

> Your project should also be configured to support Folly. This should be done automatically once the library dependency is picked up, so no further changes to your project are necessary.

### iOS: Use Objective-C++ (`.mm` extension)

TurboModules can be written using Objective-C or C++. In order to support both cases, any source files that include C++ code should use the `.mm` file extension. This extension corresponds to Objective-C++, a language variant that allows for the use of a combination of C++ and Objective-C in source files.

> Use Xcode to rename existing files to ensure file references persist in your project. You might need to clean the build folder (_Project → Clean Build Folder_) before re-building the app. If the file is renamed outside of Xcode, you may need to click on the old `.m` file reference and Locate the new file.

### iOS: TurboModules: Ensure your App Provides an `RCTCxxBridgeDelegate`

In order to set up the TurboModule system, you will add some code to interact with the bridge in your AppDelegate. Before you start, go ahead and rename your AppDelegate file to use the `.mm` extension.

Now you will have your AppDelegate conform to `RCTCxxBridgeDelegate`. Start by adding the following imports at the top of your AppDelegate file:

```objc
#import <React/HermesExecutorFactory.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTJSIExecutorRuntimeInstaller.h>
```

Then, declare your app delegate as a `RCTCxxBridgeDelegate` provider:

```objc
@interface AppDelegate () <RCTCxxBridgeDelegate> {
  // ...
}
@end
```

To conform to the `RCTCxxBridgeDelegate` protocol, you will need to implement the `jsExecutorFactoryForBridge:` method. Typically, this is where you would return a `JSCExecutorFactory` or `HermesExecutorFactory`, and we will use it to install our TurboModules bindings later on.

You can implement the `jsExecutorFactoryForBridge:` method like this:

```objc
#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  return std::make_unique<HermesExecutorFactory>(RCTJSIExecutorRuntimeInstaller([](jsi::Runtime &runtime) {
      if (!bridge) {
        return;
      }
    })
  );
}

```

## Enabling the New NativeModule System (TurboModule) in Your Android Application

Make sure your application meets all the [prerequisites](#prerequisites-for-supporting-the-new-architecture-in-javascript).

### 1. Enable NDK and the native build

> NOTE: In this iteration of the playbook we’re setting up the project to let you build from source. You might notice an increase in your build time because of this. We’re looking into what would be the preferred approach here so please feel free to share your feedbacks.

The code-gen will output some Java and some C++ code that now we need to build.

Let’s edit your **module level** `build.gradle` to include the **two** `externalNativeBuild` blocks detailed below inside the `android{}` block:

```groovy
android {
    defaultConfig {
        applicationId "com.awesomeproject"
        // ...

        // Add this block
        externalNativeBuild {
            ndkBuild {
                arguments "APP_PLATFORM=android-21",
                        "APP_STL=c++_shared",
                        "NDK_TOOLCHAIN_VERSION=clang",
                        "GENERATED_SRC_DIR=$buildDir/generated/source",
                        "PROJECT_BUILD_DIR=$buildDir",
                        "REACT_ANDROID_DIR=$rootDir/../node_modules/react-native/ReactAndroid",
                        "REACT_ANDROID_BUILD_DIR=$rootDir/../node_modules/react-native/ReactAndroid/build"
                cFlags "-Wall", "-Werror", "-fexceptions", "-frtti", "-DWITH_INSPECTOR=1"
                cppFlags "-std=c++17"
                targets "myapplication_appmodules"
            }
        }
    }

    // Add this block
    externalNativeBuild {
        ndkBuild {
            path "$projectDir/src/main/jni/Android.mk"
        }
    }
}
```

In the same `build.gradle` file, inside the same `android{}` let’s add also the following section:

```groovy
android {
    // ...

    def reactAndroidProjectDir = project(':ReactAndroid').projectDir
    def packageReactNdkLibs = tasks.register("packageReactNdkLibs", Copy) {
        dependsOn(":ReactAndroid:packageReactNdkLibsForBuck")
        dependsOn("generateCodegenArtifactsFromSchema")
        from("$reactAndroidProjectDir/src/main/jni/prebuilt/lib")
        into("$buildDir/react-ndk/exported")
    }

    afterEvaluate {
        preBuild.dependsOn(packageReactNdkLibs)
    }

    packagingOptions {
        pickFirst '**/libhermes.so'
        pickFirst '**/libjsc.so'
    }
}
```

Finally, we need to create a Makefile inside the `src/main/jni` folder called `Android.mk` with the following content:

```makefile
THIS_DIR := $(call my-dir)

include $(REACT_ANDROID_DIR)/Android-prebuilt.mk
include $(GENERATED_SRC_DIR)/codegen/jni/Android.mk

include $(CLEAR_VARS)

LOCAL_PATH := $(THIS_DIR)
LOCAL_MODULE := myapplication_appmodules

LOCAL_C_INCLUDES := $(LOCAL_PATH) $(GENERATED_SRC_DIR)/codegen/jni
LOCAL_SRC_FILES := $(wildcard $(LOCAL_PATH)/*.cpp) $(wildcard $(GENERATED_SRC_DIR)/codegen/jni/*.cpp)
LOCAL_EXPORT_C_INCLUDES := $(LOCAL_PATH) $(GENERATED_SRC_DIR)/codegen/jni

# Please note as one of the library listed is libreact_codegen_samplelibrary
# This name will be generated as libreact_codegen_<library-name>
# where <library-name> is the one you specified in the Gradle configuration
LOCAL_SHARED_LIBRARIES := libjsi libfbjni libglog libfolly_json libyoga libreact_nativemodule_core libturbomodulejsijni librrc_view libreact_render_core libreact_render_graphics libfabricjni libfolly_futures libreact_debug libreact_render_componentregistry libreact_render_debug libruntimeexecutor libreact_codegen_rncore libreact_codegen_samplelibrary

LOCAL_CFLAGS := \
    -DLOG_TAG=\"ReactNative\"
LOCAL_CFLAGS += -fexceptions -frtti -std=c++17 -Wall

include $(BUILD_SHARED_LIBRARY)
```

This setup will run a native build on your project and will compile the C++ files that have been generated by the codegen. You will see the native build running with the Gradle task `:app:externalNativeBuildRelease`

You can now verify that everything works correctly by running your android app:

```bash
yarn react-native run-android
```

### 2. Java - Provide a `ReactPackageTurboModuleManagerDelegate`

Now is time to actually use the TurboModule.
First, we will need to create a `ReactPackageTurboModuleManagerDelegate` subclass, like the following:

```java
package com.awesomeproject;

import com.facebook.jni.HybridData;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactPackageTurboModuleManagerDelegate;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class MyApplicationTurboModuleManagerDelegate extends ReactPackageTurboModuleManagerDelegate {

    private static volatile boolean sIsSoLibraryLoaded;

    protected MyApplicationTurboModuleManagerDelegate(ReactApplicationContext reactApplicationContext, List<ReactPackage> packages) {
        super(reactApplicationContext, packages);
    }

    protected native HybridData initHybrid();

    native boolean canCreateTurboModule(String moduleName);

    public static class Builder extends ReactPackageTurboModuleManagerDelegate.Builder {
        protected MyApplicationTurboModuleManagerDelegate build(
                ReactApplicationContext context, List<ReactPackage> packages) {
            return new MyApplicationTurboModuleManagerDelegate(context, packages);
        }
    }

    @Override
    protected synchronized void maybeLoadOtherSoLibraries() {
        // Prevents issues with initializer interruptions.
        if (!sIsSoLibraryLoaded) {
            SoLoader.loadLibrary("myapplication_appmodules");
            sIsSoLibraryLoaded = true;
        }
    }
}
```

Please note that the `SoLoader.loadLibrary` parameter (in this case `"myapplication_appmodules")` should be the same as the one specified for `LOCAL_MODULE :=` inside the `Android.mk` file you created before.

This class will then be responsible of loading the TurboModules and will take care of loading the native library build with the NDK at runtime.

### 3. Adapt your `ReactNativeHost` to use the `ReactPackageTurboModuleManagerDelegate`

Then, you can provide the class you created to your `ReactNativeHost`. You can locate your `ReactNativeHost` by searching for the `getReactNativeHost()`. The `ReactNativeHost` is usually located inside your `Application` class.

Once you located it, you need to add the `getReactPackageTurboModuleManagerDelegateBuilder` method as from the snippet below:

```java
public class MyApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() { /* ... */ }

                @Override
                protected List<ReactPackage> getPackages() { /* ... */ }

                @Override
                protected String getJSMainModuleName() {/* ... */ }

                @NonNull
                @Override
                protected ReactPackageTurboModuleManagerDelegate.Builder getReactPackageTurboModuleManagerDelegateBuilder() {
                    return new MyApplicationTurboModuleManagerDelegate.Builder();
                }
            };
```

### 4. Extend the `getPackages()` from your `ReactNativeHost` to use the TurboModule

Still on the `ReactNativeHost` , we need to extend the the `getPackages()` method to include the newly created TurboModule. Update the method to include the following:

```java
public class MyApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() { /* ... */ }

                @Override
                protected List<ReactPackage> getPackages() {
                    List<ReactPackage> packages = new PackageList(this).getPackages();

                    // Add those lines
                    packages.add(new TurboReactPackage() {
                        @Nullable
                        @Override
                        public NativeModule getModule(String name, ReactApplicationContext reactContext) {
                            if (name.equals(NativeAwesomeManager.NAME)) {
                                return new NativeAwesomeManager(reactContext);
                            } else {
                                return null;
                            }
                        }

                        @Override
                        public ReactModuleInfoProvider getReactModuleInfoProvider() {
                            return () -> {
                                final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
                                moduleInfos.put(
                                        NativeAwesomeManager.NAME,
                                        new ReactModuleInfo(
                                                NativeAwesomeManager.NAME,
                                                "NativeAwesomeManager",
                                                false, // canOverrideExistingModule
                                                false, // needsEagerInit
                                                true, // hasConstants
                                                false, // isCxxModule
                                                true // isTurboModule
                                        )
                                );
                                return moduleInfos;
                            };
                        }
                    });
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {/* ... */ }

                @NonNull
                @Override
                protected ReactPackageTurboModuleManagerDelegate.Builder getReactPackageTurboModuleManagerDelegateBuilder() {
                    return new MyApplicationTurboModuleManagerDelegate.Builder();
                }
            };
```

### 5. C++ Provide a native implementation for the methods in your `*TurboModuleDelegate` class

If you take a closer look at the class `MyApplicationTurboModuleManagerDelegate` that you created before, you will notice how some of the methods are `native`.

Therefore, you need to provide some C++ classes to implement those methods. Specifically you will need those files, to be added inside the `src/main/jni` folder:

- `MyApplicationTurboModuleManagerDelegate.h` An header file for the TurboModule Delegate.
- `MyApplicationTurboModuleManagerDelegate.cpp` The implementation of the aforementioned header file.
- `MyApplicationModuleProvider.h` A header file for the TurboModule provider, where you can specify which TurboModules you want to load.
- `MyApplicationModuleProvider.cpp` The implementation for the aforementioned header file.
- `OnLoad.cpp` Where the initialisation code will be placed. Specifically TurboModule uses FBJNI so the initialisation for such library lives there.

The content of those files should be the following:

##### MyApplicationTurboModuleManagerDelegate.h

Please note that the `kJavaDescriptor` should be adapted to follow the package name you picked for your project.

```cpp
#include <memory>
#include <string>

#include <ReactCommon/TurboModuleManagerDelegate.h>
#include <fbjni/fbjni.h>

namespace facebook {
namespace react {

class MyApplicationTurboModuleManagerDelegate : public jni::HybridClass<MyApplicationTurboModuleManagerDelegate, TurboModuleManagerDelegate> {
public:
  // Adapt it to the package you used for your Java class.
  static constexpr auto kJavaDescriptor =
      "Lcom/awesomeproject/MyApplicationTurboModuleManagerDelegate;";

  static jni::local_ref<jhybriddata> initHybrid(jni::alias_ref<jhybridobject>);

  static void registerNatives();

  std::shared_ptr<TurboModule> getTurboModule(const std::string name, const std::shared_ptr<CallInvoker> jsInvoker) override;
  std::shared_ptr<TurboModule> getTurboModule(const std::string name, const JavaTurboModule::InitParams &params) override;

  /**
   * Test-only method. Allows user to verify whether a TurboModule can be created
   * by instances of this class.
   */
  bool canCreateTurboModule(std::string name);

private:
  friend HybridBase;
  using HybridBase::HybridBase;

};

} // namespace react
} // namespace facebook
```

##### MyApplicationTurboModuleManagerDelegate.cpp

```cpp
#include "MyApplicationTurboModuleManagerDelegate.h"
#include "MyApplicationModuleProvider.h"

namespace facebook {
namespace react {

jni::local_ref<MyApplicationTurboModuleManagerDelegate::jhybriddata> MyApplicationTurboModuleManagerDelegate::initHybrid(jni::alias_ref<jhybridobject>) {
  return makeCxxInstance();
}

void MyApplicationTurboModuleManagerDelegate::registerNatives() {
  registerHybrid({
    makeNativeMethod("initHybrid", MyApplicationTurboModuleManagerDelegate::initHybrid),
    makeNativeMethod("canCreateTurboModule", MyApplicationTurboModuleManagerDelegate::canCreateTurboModule),
  });
}

std::shared_ptr<TurboModule> MyApplicationTurboModuleManagerDelegate::getTurboModule(const std::string name, const std::shared_ptr<CallInvoker> jsInvoker) {
  // Not implemented yet: provide pure-C++ NativeModules here.
  return nullptr;
}

std::shared_ptr<TurboModule> MyApplicationTurboModuleManagerDelegate::getTurboModule(const std::string name, const JavaTurboModule::InitParams &params) {
  return MyApplicationModuleProvider(name, params);
}

bool MyApplicationTurboModuleManagerDelegate::canCreateTurboModule(std::string name) {
  return getTurboModule(name, nullptr) != nullptr || getTurboModule(name, {.moduleName = name}) != nullptr;
}

} // namespace react
} // namespace facebook
```

##### MyApplicationModuleProvider.h

```cpp
#pragma once

#include <memory>
#include <string>

#include <ReactCommon/JavaTurboModule.h>

namespace facebook {
namespace react {

std::shared_ptr<TurboModule> MyApplicationModuleProvider(const std::string moduleName, const JavaTurboModule::InitParams &params);

} // namespace react
} // namespace facebook
```

##### MyApplicationModuleProvider.cpp

Please adapt the `samplelibrary.h` import to match the same library name you provided when building the apps.
This is the C++ generated file that is created by the codegen.

Here you can also specify more than one provider, should you have more than one TurboModule. Specifically in this example we look for a TurboModule from `samplelibrary` (the one we specified) and we fallback to the `rncore` Module Provider (containing all the Core modules).

```cpp
#include "MyApplicationModuleProvider.h"

#include <rncore.h>
#include <samplelibrary.h>

namespace facebook {
namespace react {

std::shared_ptr<TurboModule> MyApplicationModuleProvider(const std::string moduleName, const JavaTurboModule::InitParams &params) {
    auto module = samplelibrary_ModuleProvider(moduleName, params);
    if (module != nullptr) {
      return module;
    }

    return rncore_ModuleProvider(moduleName, params);
}

} // namespace react
} // namespace facebook
```

##### OnLoad.cpp

```cpp
#include <fbjni/fbjni.h>
#include "MyApplicationTurboModuleManagerDelegate.h"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
  return facebook::jni::initialize(vm, [] {
    facebook::react::MyApplicationTurboModuleManagerDelegate::registerNatives();
  });
}
```

### 6. Enable the `useTurboModules` flag in your Application `onCreate`

Now you can finally enable the `TurboModule `support in your Application. To do so, you need to turn on the `useTurboModule` flag inside your Application `onCreate` method.

```java
public class MyApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        ReactFeatureFlags.useTurboModules = true;
        //...
    }
```

It’s now time to run again your Android app to verify that everything works correctly:

```bash
yarn react-native run-android
```

## Enabling the New NativeModule System (TurboModule) in Your iOS App

Make sure your application meets all the [prerequisites](#prerequisites-for-supporting-the-new-architecture-in-javascript).

### 1. Provide a TurboModuleManager Delegate

Add the following imports at the top of your bridge delegate (e.g. `AppDelegate.mm`):

```objc
#import<ReactCommon/RCTTurboModuleManager.h>
#import<React/CoreModulesPlugins.h>
```

You will also need to declare that your AppDelegate conforms to the `RCTTurboModuleManagerDelegate` protocol, as well as create an instance variable for our Turbo Module manager:

```objc
@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  // ...
  RCTTurboModuleManager *_turboModuleManager;
}
@end
```

To conform to the `RCTTurboModuleManagerDelegate` protocol, you will implement these three methods:

- `getModuleClassFromName:` - This method should return the Class for a native module. You may use the `RCTCoreModulesClassProvider()` method to handle the default, core modules.
- `getTurboModule:jsInvoker:` - This should return `nullptr`. This method may be used later to support C++ TurboModules.
- `getModuleInstanceFromClass:moduleClass:` - This method allows you to perform any side-effects when your TurboModules are initialized. This is the TurboModule analogue to your bridge delegate’s `extraModulesForBridge` method. At this time, you’ll need to initialize the default RCTNetworking and RCTImageLoader modules as indicated below.

##### TurboModuleManagerDelegate Example

Take note of `getModuleInstanceFromClass:` in the following example, as it includes some necessary instantiation of several core modules that you will need to include in your application. Eventually, this may not be required.

```objc
// AppDelegate.mm

// ...

#import <React/RCTDataRequestHandler.h>
#import <React/RCTHTTPRequestHandler.h>
#import <React/RCTFileRequestHandler.h>
#import <React/RCTNetworking.h>
#import <React/RCTImageLoader.h>
#import <React/RCTGIFImageDecoder.h>
#import <React/RCTLocalAssetImageLoader.h>

#import <React/CoreModulesPlugins.h>

#import <ReactCommon/RCTTurboModuleManager.h>

// ...

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  // Set up the default RCTImageLoader and RCTNetworking modules.
  if (moduleClass == RCTImageLoader.class) {
    return [[moduleClass alloc] initWithRedirectDelegate:nil
        loadersProvider:^NSArray<id<RCTImageURLLoader>> *(RCTModuleRegistry * moduleRegistry) {
          return @ [[RCTLocalAssetImageLoader new]];
        }
        decodersProvider:^NSArray<id<RCTImageDataDecoder>> *(RCTModuleRegistry * moduleRegistry) {
          return @ [[RCTGIFImageDecoder new]];
        }];
  } else if (moduleClass == RCTNetworking.class) {
    return [[moduleClass alloc] initWithHandlersProvider:^NSArray<id<RCTURLRequestHandler>> *(RCTModuleRegistry * moduleRegistry) {
      return @[
        [RCTHTTPRequestHandler new],
        [RCTDataRequestHandler new],
        [RCTFileRequestHandler new],
      ];
    }];
  }
  // No custom initializer here.
  return [moduleClass new];
}
```

### 2. Install TurboModuleManager JavaScript Bindings

Next, you will create a `RCTTurboModuleManager` in your bridge delegate’s `jsExecutorFactoryForBridge:` method, and install the JavaScript bindings:

```objc
#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  // Add these lines to create a TurboModuleManager
  if (RCTTurboModuleEnabled()) {
    _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                               delegate:self
                                                              jsInvoker:bridge.jsCallInvoker];

    // Necessary to allow NativeModules to lookup TurboModules
    [bridge setRCTTurboModuleRegistry:_turboModuleManager];

    if (!RCTTurboModuleEagerInitEnabled()) {
      /**
       * Instantiating DevMenu has the side-effect of registering
       * shortcuts for CMD + d, CMD + i,  and CMD + n via RCTDevMenu.
       * Therefore, when TurboModules are enabled, we must manually create this
       * NativeModule.
       */
       [_turboModuleManager moduleForName:"DevMenu"];
    }
  }

  // Add this line...
  __weak __typeof(self) weakSelf = self;

  return std::make_unique<facebook::react::JSCExecutorFactory>(
    facebook::react::RCTJSIExecutorRuntimeInstaller([weakSelf, bridge](facebook::jsi::Runtime &runtime) {
      if (!bridge) {
        return;
      }

      // And add these lines to install the bindings...
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf) {
        facebook::react::RuntimeExecutor syncRuntimeExecutor =
            [&](std::function<void(facebook::jsi::Runtime & runtime_)> &&callback) { callback(runtime); };
        [strongSelf->_turboModuleManager installJSBindingWithRuntimeExecutor:syncRuntimeExecutor];
      }
    }));
}
```

### 3. Enable TurboModule System

Finally, enable TurboModules in your app by executing the following statement before React Native is initialized in your app delegate (e.g. within `didFinishLaunchingWithOptions:`):

```objc
RCTEnableTurboModule(YES);
```

##### Example:

```objc
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTEnableTurboModule(YES);

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self
                                            launchOptions:launchOptions];

  // ...

  return YES;
}
```

## Enabling the New Renderer (Fabric) in Your Android Application

Make sure your application meets all the [prerequisites](#prerequisites-for-supporting-the-new-architecture-in-javascript).

### 1. Provide a `JSIModulePackage` inside your `ReactNativeHost`

In order to enable Fabric in your app, you would need to add a `JSIModulePackage` inside your `ReactNativeHost`. If you followed the TurboModule section of this playbook, you probably already know where to find your `ReactNativeHost`. If not, you can locate your `ReactNativeHost` by searching for the `getReactNativeHost()`. The `ReactNativeHost` is usually located inside your `Application` class.

Once you located it, you need to add the `getJSIModulePackage` method as from the snippet below:

```java
public class MyApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {

                // Add those lines:
                @Nullable
                @Override
                protected JSIModulePackage getJSIModulePackage() {
                    return new JSIModulePackage() {
                        @Override
                        public List<JSIModuleSpec> getJSIModules(
                                final ReactApplicationContext reactApplicationContext,
                                final JavaScriptContextHolder jsContext) {
                            final List<JSIModuleSpec> specs = new ArrayList<>();
                            specs.add(new JSIModuleSpec() {
                                @Override
                                public JSIModuleType getJSIModuleType() {
                                    return JSIModuleType.UIManager;
                                }

                                @Override
                                public JSIModuleProvider<UIManager> getJSIModuleProvider() {
                                    final ComponentFactory componentFactory = new ComponentFactory();
                                    CoreComponentsRegistry.register(componentFactory);
                                    final ReactInstanceManager reactInstanceManager = getReactInstanceManager();

                                    ViewManagerRegistry viewManagerRegistry =
                                            new ViewManagerRegistry(
                                                    reactInstanceManager.getOrCreateViewManagers(
                                                            reactApplicationContext));

                                    return new FabricJSIModuleProvider(
                                            reactApplicationContext,
                                            componentFactory,
                                            new EmptyReactNativeConfig(),
                                            viewManagerRegistry);
                                }
                            });
                            return specs;
                        }
                    };
                }
```

### 2. Make sure your call `setIsFabric` on your Activity’s `ReactRootView`

Inside your `Activity` class, you need to make sure you’re calling `setIsFabric` on the `ReactRootView`.
If you don’t have a `ReactActivityDelegate` you might need to create one.

```java
public class MainActivity extends ReactActivity {

  // Add the Activity Delegate, if you don't have one already.
  public static class MainActivityDelegate extends ReactActivityDelegate {

    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());

      // Make sure to call setIsFabric(true) on your ReactRootView
      reactRootView.setIsFabric(true);
      return reactRootView;
    }
  }

  // Make sure to override the `createReactActivityDelegate()` method.
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }
}
```

The crucial part in this code is the `reactRootView.setIsFabric(true)` which will enable the new renderer for this Activity.

You can now verify that everything works correctly by running your android app:

```bash
yarn react-native run-android
```

In your Metro terminal log, you will now see the following log to confirm that Fabric is running correctly:

```
BUNDLE ./App.js
LOG Running "App" with {"fabric":true,"initialProps":{},"rootTag":1}
```

## Migrating Android ViewManagers

First, make sure you followed the instructions to [Enabling the New Renderer (Fabric) in Your Android Application](#enabling-the-new-renderer-fabric-in-your-android-application). Plus we will also assume that you followed the instructions from [Enabling the New NativeModule System (TurboModule) in Your Android Application](#enabling-the-new-nativemodule-system-turbomodule-in-your-android-application) as the Makefile (`Android.mk`) and other native builds setup steps are presented over there and won’t be repeated here.

### JavaScript changes

1. Make sure your other JS changes are ready to go by following Preparing your JavaScript codebase for the new React Native Renderer (Fabric)
2. Replace the call to `requireNativeComponent` with `codegenNativeComponent`. This tells the JS codegen to start generating the native implementation of the component, consisting of C++ and Java classes. This is how it looks for the WebView component:

```javascript
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
// babel-plugin-codegen will replace the function call to use NativeComponentRegistry
// 'RCTWebView' is interopped by RCTFabricComponentsPlugins
export default (codegenNativeComponent<NativeProps>(
  'RCTWebView',
): HostComponent<NativeProps>);
```

4. **[Flow users]** Make sure your native component has Flow types for its props, since the JS codegen uses these types to generate the type-safe native implementation of the component. The codegen generates C++ classes during the build time, which guarantees that the native implementation is always up-to-date with its JS interface. Use [these c++ compatible types](https://github.com/facebook/react-native/blob/main/Libraries/Types/CodegenTypes.js#L28-L30).

```javascript
// RNTMyNativeViewNativeComponent.js
import type {Int32} from `'react-native/Libraries/Types/CodegenTypes'``;`;
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {HostComponent} from 'react-native';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';

type NativeProps = $ReadOnly<{|
  ...ViewProps, // This is required.
  someNumber: Int32,
  |}>;

...

export default (codegenNativeComponent<NativeProps>(
  'RNTMyNativeView',
): HostComponent<NativeProps>);
```

5. **[TypeScript users]** We are currently investigating a support for TypeScript.

### Native/Java Changes

1. **Update (or Create) your ViewManager to use the generated classes from the Codegen.**

Specifically you will have to implement the generated **ViewManagerInterface** and to pass events to the generated **ViewManagerDelegate.**
Your ViewManager could follow this structure. The MyNativeView class in this example is an Android View implementation (like a subclass of LinearLayout, Button, TextView, etc.)

```java
/** View manager for MyNativeView components. */
@ReactModule(name = MyNativeViewManager.REACT_CLASS)
public class MyNativeViewManager extends SimpleViewManager<MyNativeView>
        implements RNTMyNativeViewManagerInterface<MyNativeView> {

  public static final String REACT_CLASS = "RNTMyNativeView";

  private final ViewManagerDelegate<MyNativeView> mDelegate;

  public MyNativeViewManager() {
    mDelegate = new RNTMyNativeViewManagerDelegate<>(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<MyNativeView> getDelegate() {
    return mDelegate;
  }

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  protected MyNativeView createViewInstance(@NonNull ThemedReactContext reactContext) {
    return new MyNativeView(reactContext);
  }
}
```

1. **Add your ViewManager to one of the Packages loaded by your Application.**

Specifically inside the `ReactNativeHost` , update `getPackages` method to include the following:

```java
public class MyApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() { /* ... */ }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();

      // ... other packages or `TurboReactPackage added` here...

      // Add those lines.
      packages.add(new ReactPackage() {
        @NonNull
        @Override
        public List<NativeModule> createNativeModules(
            @NonNull ReactApplicationContext reactContext) {
          return Collections.emptyList();
        }

        @NonNull
        @Override
        public List<ViewManager> createViewManagers(
            @NonNull ReactApplicationContext reactContext) {
          // Your ViewManager is returned here.
          return Collections.singletonList(new MyNativeViewManager());
        }
      });
      return packages;
    }
```

3. **Add a Fabric Component Registry**

You need to create a new component Registry that will allow you to **register** your components to be discovered by Fabric. Let’s create the `MyComponentsRegistry` file with the following content.

As you can see, some methods are `native()` which we will implement in C++ in the following paragraph.

```java
package com.awesomeproject;

  @DoNotStrip
  public class MyComponentsRegistry {
    static {
      SoLoader.loadLibrary("fabricjni");
    }

    @DoNotStrip private final HybridData mHybridData;

    @DoNotStrip
    private native HybridData initHybrid(ComponentFactory componentFactory);

    @DoNotStrip
    private MyComponentsRegistry(ComponentFactory componentFactory) {
      mHybridData = initHybrid(componentFactory);
    }

    @DoNotStrip
    public static MyComponentsRegistry register(ComponentFactory componentFactory) {
      return new MyComponentsRegistry(componentFactory);
    }
  }
```

4. **Register your custom Fabric Component Registry**

Finally, let’s edit the `getJSIModulePackage` from the `ReactNativeHost` to also register your Component Registry alongside the Core one:

```java
public class MyApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Nullable
    @Override
    protected JSIModulePackage getJSIModulePackage() {
      return new JSIModulePackage() {
        @Override
        public List<JSIModuleSpec> getJSIModules(
                final ReactApplicationContext reactApplicationContext,
                final JavaScriptContextHolder jsContext) {
          final List<JSIModuleSpec> specs = new ArrayList<>();
          specs.add(new JSIModuleSpec() {
            // ...

            @Override
            public JSIModuleProvider<UIManager> getJSIModuleProvider() {
              final ComponentFactory componentFactory = new ComponentFactory();
              CoreComponentsRegistry.register(componentFactory);

              // Add this line just below CoreComponentsRegistry.register
              MyComponentsRegistry.register(componentFactory)

              // ...
            }
          });
          return specs;
        }
      };
    }
```

### Native/C++ Changes

It’s now time to provide an implementation for your `MyComponentsRegistry` in C++:

1. **Create an header file: `MyComponentsRegistry.h`**

The file should be placed inside the `src/main/jni` folder.
Please note that the `kJavaDescriptor` should be adapted to follow the package name you picked for your project.

```cpp
#pragma once

#include <ComponentFactory.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <react/renderer/componentregistry/ComponentDescriptorRegistry.h>

namespace facebook {
namespace react {

class MyComponentsRegistry
    : public facebook::jni::HybridClass<MyComponentsRegistry> {
  public:
  constexpr static auto kJavaDescriptor =
      "Lcom/awesomeproject/MyComponentsRegistry;";

  static void registerNatives();

  MyComponentsRegistry(ComponentFactory *delegate);

  private:
  friend HybridBase;

  static std::shared_ptr<ComponentDescriptorProviderRegistry const>
  sharedProviderRegistry();

  const ComponentFactory *delegate_;

  static jni::local_ref<jhybriddata> initHybrid(
      jni::alias_ref<jclass>,
      ComponentFactory *delegate);
};

} // namespace react
} // namespace facebook
```

2. **Create an implementation file: `MyComponentsRegistry.cpp`**

The file should be placed inside the `src/main/jni` folder alongside `MyComponentsRegistry.h

```cpp
#include "MyComponentsRegistry.h"

#include <CoreComponentsRegistry.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <react/renderer/components/rncore/ComponentDescriptors.h>
#include <react/renderer/components/samplelibrary/ComponentDescriptors.h>

namespace facebook {
namespace react {

MyComponentsRegistry::MyComponentsRegistry(
    ComponentFactory *delegate)
    : delegate_(delegate) {}

std::shared_ptr<ComponentDescriptorProviderRegistry const>
MyComponentsRegistry::sharedProviderRegistry() {
  auto providerRegistry = CoreComponentsRegistry::sharedProviderRegistry();

  providerRegistry->add(concreteComponentDescriptorProvider<
                        RNTMyNativeViewComponentDescriptor>());

  return providerRegistry;
}

jni::local_ref<MyComponentsRegistry::jhybriddata>
MyComponentsRegistry::initHybrid(
    jni::alias_ref<jclass>,
    ComponentFactory *delegate) {
  auto instance = makeCxxInstance(delegate);

  auto buildRegistryFunction =
      [](EventDispatcher::Weak const &eventDispatcher,
          ContextContainer::Shared const &contextContainer)
      -> ComponentDescriptorRegistry::Shared {
    auto registry = MyComponentsRegistry::sharedProviderRegistry()
                        ->createComponentDescriptorRegistry(
                            {eventDispatcher, contextContainer});

    auto mutableRegistry =
        std::const_pointer_cast<ComponentDescriptorRegistry>(registry);

    mutableRegistry->setFallbackComponentDescriptor(
        std::make_shared<UnimplementedNativeViewComponentDescriptor>(
            ComponentDescriptorParameters{
                eventDispatcher, contextContainer, nullptr}));

    return registry;
  };

  delegate->buildRegistryFunction = buildRegistryFunction;
  return instance;
}

void MyComponentsRegistry::registerNatives() {
  registerHybrid({
      makeNativeMethod("initHybrid", MyComponentsRegistry::initHybrid),
  });
}

} // namespace react
} // namespace facebook
```

4. **Load your file in the OnLoad.cpp**

If you followed the TurboModule instructions, you should have a `OnLoad.cpp` file inside the `src/main/jni` folder. There you should add a line to load the `MyComponentsRegistry` class:

```cpp
#include <fbjni/fbjni.h>
#include "MyApplicationTurboModuleManagerDelegate.h"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
  return facebook::jni::initialize(vm, [] {
    facebook::react::MyApplicationTurboModuleManagerDelegate::registerNatives();

    // Add this line
    facebook::react::MyComponentsRegistry::registerNatives();
  });
}
```

You can now verify that everything works correctly by running your android app:

```bash
yarn react-native run-android
```

## Enabling the New Renderer (Fabric) in Your iOS App

This section will go over how to enable the new renderer in your app.

### 1. Enable Fabric in Podfile

Add changes to your Podfile. You can see some examples in [RNTester](https://github.com/facebook/react-native/blob/main/packages/rn-tester/Podfile) and [rn-demo-app](https://github.com/facebook/fbt/blob/rn-demo-app/ios/Podfile).

```ruby
# Add the following line at the top of Podfile.
# Codegen produces files/classes that share names, and it will show the warning.
# deterministic_uuids option surpresses the warning.
install! 'cocoapods', :deterministic_uuids => false

target 'Some App' do
  pods()
end

def pods()
// Get config
config = use_native_modules!

// Use env variables to turn it on/off.
fabric_enabled = ENV['USE_FABRIC']
use_codegen_discovery= ENV['USE_CODEGEN_DISCOVERY']

// Enabled codegen discovery. This will run the codegen at preinstall time.
// Files are generated at {pod installation root}/build/generated/ios/
if use_codegen_discovery
  Pod::UI.puts "[Codegen] Building target with codegen library discovery enabled."
  pre_install do |installer|
    use_react_native_codegen_discovery!({
        react_native_path: config[:reactNativePath],
        # Modify here if your app root path isn't the same as this one.
        app_path: "#{Dir.pwd}/..",
        fabric_enabled: fabric_enabled,
    })
  end
end

// Pass the flag to enable fabric to use_react_native!.
use_react_native!(
  ...
  :fabric_enabled => fabric_enabled
)
```

```bash
$ ~/yourproject/**/ios; pod install
```

### 2. Update your root view

The way to render your app with Fabric depends on your setup. Here is an example of how you can enable Fabric in your app with the RN_FABRIC_ENABLED compiler flag to enable/disable. Refer[RN-Tester’s AppDelegate](https://github.com/facebook/react-native/blob/main/packages/rn-tester/RNTester/AppDelegate.mm) as an example.

```objc
// AppDelegate.mm

#ifdef RN_FABRIC_ENABLED
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <react/config/ReactNativeConfig.h>
#endif

@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
#ifdef RN_FABRIC_ENABLED
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
#endif

// Find a line that define rootView and replace/edit with the following lines.

#ifdef RN_FABRIC_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();

  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);

  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:_bridge contextContainer:_contextContainer];

  _bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;

  UIView *rootView = [[RCTFabricSurfaceHostingProxyRootView alloc] initWithBridge:_bridge
                                                                       moduleName:@"MyTestApp"
                                                                initialProperties:nil];
#else
   // Current implementation to define rootview.
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"MyTestApp"
                                            initialProperties:nil];
#endif
```

### 3. Add Babel Plugins

This will trigger the codegen that will run at the metro building time.

```javascript
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    './node_modules/react-native/packages/babel-plugin-codegen'
  ]
};
```

### 4. Run pod install

```bash
// Run pod install with the flags
USE_FABRIC=1 USE_CODEGEN_DISCOVERY=1 pod install
```

# Appendix

## I. Flow Type to Native Type Mapping

You may use the following table as a reference for which types are supported and what they map to in each platform:

| Flow Type                 | Nullable Support? | Android (Java)                       | iOS                                                            | Note                                                                     |
| ------------------------- | ----------------- | ------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------- | --- | --- | ------------------------------------------------------------------------------ |
| `string`                  | `?string`         | `String`                             | `NSString`                                                     |                                                                          |
| `boolean`                 | `?boolean`        | `Boolean`                            | `NSNumber`                                                     |                                                                          |
| `number`                  | No                | `double`                             | `NSNumber`                                                     |                                                                          |
| `{                        | foo: string, ...  | }`                                   | `?{                                                            | foo: string, ...                                                         | }`                                       |     |     | Object literal. This is recommended over simply using Object, for type safety. |
| `Object`                  | `?Object`         | `ReadableMap`                        | `@{} (untyped dictionary)`                                     | Recommended to use object literal (see above).                           |
| `Array<*>`                | `?Array<*>`       | `ReadableArray`                      | `NSArray` (or `RCTConvertVecToArray` when used inside objects) |                                                                          |
| `Function`                | `?Function`       |                                      |                                                                |                                                                          |
| `Promise<*>`              | `?Promise<*>`     | `com.facebook.react.bridge.Promise`  | `RCTPromiseResolve` and `RCTPromiseRejectBlock`                |                                                                          |
| Type aliases of the above | Yes               |                                      |                                                                |                                                                          |
| Type Unions `'SUCCESS'    | 'FAIL'`           | Only as callbacks.                   |                                                                |                                                                          | Type unions only supported as callbacks. |
| Callbacks: `( ) =>`       | Yes               | `com.facebook.react.bridge.Callback` | `RCTResponseSenderBlock`                                       | Callback functions are not type checked, and are generalized as Objects. |

You may also find it useful to refer to the JavaScript specifications for the core modules in React Native. These are located inside the `Libraries/` directory in the React Native repository.

## II. Invoking the code-gen during development

> This section contains information specific to v0.66 of React Native.

The code-gen is typically invoked at build time, but you may find it useful to generate your native interface code on demand for troubleshooting.

If you wish to invoke the codegen manually, you have two options:

1. Invoking a Gradle task directly (Android).
2. Invoking a script manually.

### Invoking a Gradle task directly

You can trigger the code-gen by invoking the following task:

```bash
./gradlew generateCodegenArtifactsFromSchema --rerun-tasks
```

The extra `--rerun-tasks` flag is added to make sure Gradle is ignoring the `UP-TO-DATE` checks for this task. You should not need it during normal development.

The `generateCodegenArtifactsFromSchema` task normally runs before the `preBuild` task, so you should not need to invoke it manually but it will be triggered before your builds.

### Invoking the script manually

Alternatively, you can invoke the Codegen directly, bypassing the Gradle Plugin or CocoaPods infrastructure.
This can be done with the following commands.

The parameters to provide will look quite familiar to you now that you have already configured the Gradle plugin or CocoaPods library.

#### Generating the schema file

First, you’ll need to generate a schema file from your JavaScript sources. You only need to do this whenever your JavaScript specs change. The script to generate this schema is provided as part of the `react-native-codegen` package. If running this from within your React Native application, you can use the package from `node_modules` directly:

```bash
node node_modules/react-native-codegen/lib/cli/combine/combine-js-to-schema-cli.js \
  <output_file_schema_json> <javascript_sources_dir>
```

> The source for the `react-native-codegen` is available in the React Native repository, under `packages/react-native-codegen`. Run `yarn install` and `yarn build` in that directory to build your own `react-native-codegen` package from source. In most cases, you will not want to do this as the playbook assumes the use of the `react-native-codegen` package version that is associated with the relevant React Native nightly release.

#### Generating the native code artifacts

Once you have a schema file for your native modules or components, you can use a second script to generate the actual native code artifacts for your library. You can use the same schema file generated by the previous script.

```bash
node node_modules/react-native/scripts/generate-specs-cli.js \
  --platform <ios|android> \
  --schemaPath <generated_schema_json_file> \
  --outputDir <output_dir> \
  [--libraryName library_name] \
  [--javaPackageName java_package_name] \
  [--libraryType all(default)|modules|components]
```

> **NOTE:** The output artifacts of the code-gen are inside the build folder and should not be committed.
> They should be considered only for reference.

##### Example

The following is a basic example of invoking the code-gen script to generate native iOS interface code for a library that provides native modules. The JavaScript spec sources for this library are located in a `js/` subdirectory, and this library’s native code expects the native interfaces to be available in the `ios` subdirectory.

```bash
# Generate schema - only needs to be done whenever JS specs change
node node_modules/react-native-codegen/lib/cli/combine/combine-js-to-schema-cli.js /tmp/schema.json ./js

# Generate native code artifacts
node node_modules/react-native/scripts/generate-specs-cli.js \
  --platform ios \
  --schemaPath /tmp/schema.json \
  --outputDir ./ios \
  --libraryName MyLibSpecs \
  --libraryType modules
```

In the above example, the code-gen script will generate several files: `MyLibSpecs.h` and `MyLibSpecs-generated.mm`, as well as a handful of `.h` and `.cpp` files, all located in the `ios` directory.

## III. Note on Existing Apps

The playbook provides instructions for migrating an application that is based on the default app template that is provided by React Native. If your app has deviated from the template, or you are working with an application that was never based off the template, then the following sections might help.

### Finding your bridge delegate

The playbook assumes that the `AppDelegate` is configured as the bridge delegate. If you are not sure which is your bridge delegate, then place a breakpoint in `RCTBridge` and `RCTCxxBridge`, run your app, and inspect `self.delegate`.

## IV. Troubleshooting

### Xcode Build Issues

**Command PhaseScriptExecution failed with a nonzero exit code**

This error indicates that the codegen script that is injected into the Xcode build pipeline has exited early. You may get this for either your own library, or one of the core RN libraries (FBReactNativeSpec, rncore).

Open `~/Library/Developer/Xcode/DerivedData`. and look for a folder named after your Xcode workspace (“RNTesterPods-AAAA” where “AAAA” is a string of characters). Within that folder, go to Build → Intermediates.noindex → Pods.build → Debug-iphonesimulator (or the equivalent for your iOS device, if applicable). Inside, look for the folder named after the codegen library has the script error. The logs for the script phase can be found within the DerivedSources folder, in a file named `codegen-LibraryName.log`. This log output should provide clarity on the source of the error.

### CocoaPods and Node Reset

The CocoaPods integration will see frequent updates at this early stage, and it is possible to end up with your workspace in a broken state after one of these changes. You may clean up any changes related to the codegen by performing some of these steps:

1. Run `pod deintegrate` in your ios directory (or wherever your Podfile is located) and re-run `pod install`.
2. Delete `Podfile.lock` and re-run `pod install`.
3. Delete `node_modules` and re-run `yarn install`.
4. Delete your codegen artifacts and re-run `pod install`, then clean and build your Xcode project.

### Folly Version

As it happens, the Folly version used in your podspec must match whatever version is used in React Native at this time. If you see the following error after running `pod install`:

```
[!] CocoaPods could not find compatible versions for pod "RCT-Folly":
```

...you may have a version-mismatch. Take a look at your `node_modules/react-native/React/FBReactNativeSpec/FBReactNativeSpec.podspec` file and make note of the `folly_version` used there. Go back to your own podspec and set your `folly_version` to match.

---
id: new-architecture-library-intro
title: Prerequisites for Libraries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

The following steps will help ensure your modules and components are ready for the New Architecture.

## Define Specs in JavaScript

The JavaScript specs serve as the source of truth for the methods provided by each native module. They define all APIs provided by the native module, along with the types of those constants and functions.
Using a **typed** spec file allows you to be intentional and declare all the input arguments and outputs of your native module’s methods.

:::info
**TypeScript** support is in beta right now.
:::

To adopt the New Architecture, you start by creating these specs for your native modules and native components. You can do this before migrating to the New Architecture: the specs will be used later on to generate native interface code for all the supported platforms as a way to enforce uniform APIs across platforms.

#### Turbo Native Modules

JavaScript spec files **must** be named `Native<MODULE_NAME>.js`, and they export a `TurboModuleRegistry` `Spec` object. The name convention is important because the Codegen process looks for modules whose `js` (`jsx`, `ts`, or `tsx`) spec file starts with the keyword `Native`.

The following is a basic JavaScript spec template, written using the [Flow](https://flow.org/) and [TypeScript](https://www.typescriptlang.org/) syntax.

<Tabs groupId="fabric-component-backward-compatibility"
      defaultValue={constants.defaultFabricComponentSpecLanguage}
      values={constants.fabricComponentSpecLanguages}>
<TabItem value="Flow">

```ts
// @flow

import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  +getConstants: () => {||};

  // your module methods go here, for example:
  getString(id: string): Promise<string>;
}

export default (TurboModuleRegistry.get<Spec>('<MODULE_NAME>'): ?Spec);
```

</TabItem>
<TabItem value="TypeScript">

```ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getConstants: () => {};

  // your module methods go here, for example:
  getString(id: string): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('<MODULE_NAME>');
```

</TabItem>
</Tabs>

#### Fabric Native Components

JavaScript spec files **must** be named `<FABRIC COMPONENT>NativeComponent.js` (for TypeScript use extension `.ts` or `.tsx`) and they export a `HostComponent` object. The name convention is important: the Codegen process looks for components whose spec file (either JavaScript or TypeScript) ends with the suffix `NativeComponent`.

The following snippet shows a basic JavaScript spec template, written in [Flow](https://flow.org/) as well as [TypeScript](https://www.typescriptlang.org/).

<Tabs groupId="fabric-component-backward-compatibility"
      defaultValue={constants.defaultFabricComponentSpecLanguage}
      values={constants.fabricComponentSpecLanguages}>
<TabItem value="Flow">

```ts
// @flow strict-local

import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  // add other props here
|}>;

export default (codegenNativeComponent<NativeProps>(
   '<FABRIC COMPONENT>',
): HostComponent<NativeProps>);
```

</TabItem>
<TabItem value="TypeScript">

```ts
import type { ViewProps } from 'ViewPropTypes';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  // add other props here
}

export default codegenNativeComponent<NativeProps>(
  '<FABRIC COMPONENT>'
) as HostComponent<NativeProps>;
```

</TabItem>
</Tabs>

### Supported Types

When using Flow or TypeScript, you will be using [type annotations](https://flow.org/en/docs/types/) to define your spec. Keeping in mind that the goal of defining a JavaScript spec is to ensure the generated native interface code is type-safe, the set of supported types will be those that can be mapped one-to-one to a corresponding type on the native platform.

<!-- alex ignore primitive -->

In general, this means you can use primitive types (strings, numbers, booleans), function types, object types, and array types. Union types, on the other hand, are not supported. All types must be read-only. For Flow: either `+` or `$ReadOnly<>` or `{||}` objects. For TypeScript: `readonly` for properties, `Readonly<>` for objects, and `ReadonlyArray<>` for arrays.

> See Appendix [II. Flow Type to Native Type Mapping](new-architecture-appendix#ii-flow-type-to-native-type-mapping).
> See Appendix [III. TypeScript to Native Type Mapping](new-architecture-appendix#iii-typescript-to-native-type-mapping).

### Codegen Helper Types

You can use predefined types for your JavaScript spec, here is a list of them:

- `Double`
- `Float`
- `Int32`
- `WithDefault<Type, Value>` - Sets default value for type
- `BubblingEventHandler<T>` - For bubbling events (eg: `onChange`).
- `DirectEventHandler<T>` - For direct events (eg: `onClick`).

Later on those types are compiled to coresponding equivalents on target platforms.

### Be Consistent Across Platforms and Eliminate Type Ambiguity

Before adopting the New Architecture in your native module, you should ensure your methods are consistent across platforms. You will realize this as you set out to write the JavaScript spec for your native module - remember that JavaScript spec defines what the methods will look like on all supported platforms.

If your existing native module has methods with the same name on multiple platforms, but with different numbers or types of arguments across platforms, you will need to find a way to make these consistent. If you have methods that can take two or more different types for the same argument, then you need to find a way to resolve this type of ambiguity as type unions are intentionally not supported.

## Make Sure _autolinking_ is Enabled

<!-- alex ignore master -->

[Autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) is a feature of the React Native CLI that simplifies the installation of third-party React Native libraries. Instructions to enable _autolinking_ are available in the [React Native CLI docs](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md).

### Android

On Android, this generally requires you to include `native_modules.gradle` in both your `settings.gradle[.kts]` and `build.gradle[.kts]`.

If you used the default template provided with React Native (i.e., `yarn react-native init <Project>`), then autolinking is already enabled.

You can anyway verify that you have it enabled with:

```bash
$ grep -r "native_modules.gradle" android

android/app/build.gradle:apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
android/settings.gradle:apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
...
```

If you don't, open the `settings.gradle` file and add this line:

```diff
rootProject.name = <Your App Name>
+ apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
```

Then, open your `android/app/build.gradle` file and add this line at the end of the file:

```kotlin
apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
```

### iOS

On iOS, make sure that your library provides a Podspec (see [`react-native-webview`](https://github.com/react-native-community/react-native-webview/blob/master/react-native-webview.podspec) for an example).

:::info

To determine if your library is set up for autolinking, check the CocoaPods output after running `pod install` (or `arch -x86_64 pod install` in case of a Mac M1) on an iOS project. If you see "auto linking library name", you are all set to go.

:::

## Configure Codegen

[Codegen](the-new-architecture/pillars-codegen) is a tool that runs when you build an Android app or install the dependencies of an iOS app. It creates some scaffolding code that you won't have to create manually.

Codegen can be configured in the `package.json` file of your Library. Add the following JSON object at the end of it.

```diff
  },
+  "codegenConfig": {
+    "name": "<library name>",
+    "type": "all",
+    "jsSrcsDir": ".",
+    "android": {
+      "javaPackageName": "com.facebook.fbreact.specs"
+    }
+  }
}
```

- The `codegenConfig` is the key used by the Codegen to verify that there is some code to generate.
- The `name` field is the name of the library.
- The `type` field is used to identify the type of module we want to create. We suggest keeping `all` to support libraries that contain both Turbo Native Module and Fabric Native Components.
- The `jsSrcsDir` is the directory where the codegen will start looking for JavaScript specs.
- The `android.javaPackageName` is the name of the package where the generated code ends up.

Android also requires to have the [React Gradle Plugin properly configured](new-architecture-app-intro#android-specifics) in your app.

## Preparing your JavaScript Codebase for the new React Native Renderer (Fabric)

The new renderer, Fabric, doesn’t use the UIManager, so direct calls to UIManager will need to be migrated. Historically, calls to UIManager had some pretty complicated patterns. Fortunately, we’ve created new APIs that are much cleaner. These new APIs are forward compatible with Fabric, so you can migrate your code today, and the APIs will work properly when you turn on Fabric!

Fabric will be providing new type-safe JS APIs that are much more ergonomic than some of the patterns we've seen in product code today. These APIs require references to the underlying component, no longer using the result of `findNodeHandle`. `findNodeHandle` is used to search the tree for a native component given a class instance. This was breaking the React abstraction model. `findNodeHandle` is not compatible with React 18. Deprecation of `findNodeHandle` in React Native is similar to the [deprecation of `findDOMNode` in React DOM](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

While we know that all deprecations are a hassle, this guide is intended to help people update components as smoothly as possible. Here are the steps you need to take to get your JS codebase ready for Fabric:

1. Migrating findNodeHandle / getting a HostComponent
2. Migrating `.measure*()`
3. Migrating off `setNativeProps`
4. Move the call to `requireNativeComponent` to a separate file
5. Migrating off `dispatchViewManagerCommand`
6. Creating NativeCommands with `codegenNativeCommands`

### Migrating `findNodeHandle` / getting a `HostComponent`

Most of the migration work requires a HostComponent ref to access certain APIs that are only attached to host components (like View, Text, or ScrollView). HostComponents are the return value of calls to `requireNativeComponent`. `findNodeHandle` tunnels through multiple levels of component hierarchy to find the nearest native component.

As a concrete example, this code uses `findNodeHandle` to tunnel from `ParentComponent` through to the `View` rendered by `ChildComponent`.

```jsx
class ParentComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof ChildComponent>;

  render() {
    return <ChildComponent ref={this._captureRef} onSubmit={this._onSubmit} />
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

class ChildComponent extends React.Component<Props> {
  render() {
    return (
      <View>
        <SubmitButton onSubmit={props.onSubmit} />
      </View>
    );
  }
}
```

We can’t convert this call to `this._ref.measure` because `this._ref` is an instance to `ChildComponent`, which is not a HostComponent and thus does not have a `measure` function.

`ChildComponent` renders a `View`, which is a HostComponent, so we need to get a reference to `View` instead. There are typically two approaches to getting what we need. If the component we need to get the ref from is a function component, using `forwardRef` is probably the right choice. If it is a class component with other public methods, adding a public method for getting the ref is an option. Here are examples of those two forms:

#### Using `forwardRef`

```jsx
class ParentComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof ChildComponent>;

  render() {
    return <ChildComponent ref={this._captureRef} onSubmit={this._onSubmit} />
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

const ChildComponent = React.forwardRef((props, forwardedRef) => {
  return (
    <View ref={forwardedRef}>
      <SubmitButton onSubmit={props.onSubmit} />
    </View>
  );
});
```

#### Using a getter, (note the addition of `getViewRef`)

```tsx
class ParentComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof ChildComponent>;

  render() {
    return <ChildComponent ref={this._captureRef} onSubmit={this._onSubmit} />
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

class ChildComponent extends React.Component<Props> {
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

### Migrating `.measure*()`

Let’s take a look at an example calling `UIManager.measure`. This code might look something like this

```js
const viewRef: React.ElementRef<typeof View> =  /* ... */;
const viewHandle = ReactNative.findNodeHandle(viewRef);

UIManager.measure(viewHandle, (x, y, width, height) => {
  // Use layout metrics.
});
```

In order to call `UIManager.measure*` we need to call `findNodeHandle` first and pass in those handles. With the new API, we instead call `measure` directly on native refs without `findNodeHandle`. The example above with the new API looks like this:

```js
const viewRef: React.ElementRef<typeof View> = /* ... */;

viewRef.measure((x, y, width, height) => {
  // Use layout metrics.
});
```

`findNodeHandle` can be called with any component as an argument, but the new `.measure*` can only be called on native refs. If the ref originally passed into `findNodeHandle` is not a native ref to start with, use the strategies above in _getting a HostComponent_ to find the native ref.

### Migrating off `setNativeProps`

`setNativeProps` will not be supported in the post-Fabric world. To migrate, move all `setNativeProp` values to component state.

**Example**

```ts
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

In this example, when the View is pressed, there is a `setNativeProps` call to update the style and accessibility props of the component. To migrate this component, it’s important to understand its current behavior using `setNativeProps`.

#### Pre-Fabric, Component Props Persist

On the first render, the component props are those declared in the render function. After the View is pressed `_onSubmit` calls `setNativeProps` with updated prop values.
The resulting component can be represented as such:

```jsx
<View
  accessibility={true}
  onPress={this._onSubmit}
  ref={this._captureRef}
  someProp={somePropValue}
  style={[styles.view, styles.submittedView]}
/>
```

Note that all prop values set in the render function are unchanged even though `setNativeProps` didn’t pass those props. Also, `style` is now the merged value of its value prior to `_onSubmit` and `styles.submittedView`. This is the important takeaway: in our current pre-Fabric world, **component props persist.** The platform view caches the prop values it's passed from the JS side. If this wasn’t the case, then following the setNativeProps call, React Native would have rendered a component like this:

```jsx
<View accessibility={true} style={styles.submittedView} />
```

The fact that React Native stores some internal state of each component that isn’t explicitly declared in the last render is what Fabric intends to fix.

#### Moving `setNativeProps` to state

Taking the above caveats into account, a proper migration would look like this:

```tsx
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
    this.setState(state => ({ ...state, hasSubmitted: true }));
    // ...other logic for onSubmit
  }
}


const styles = StyleSheet.create({
  view: { backgroundColor: 'white'},
  submittedView: {borderWidth: 1}
});
```

- We are using the `hasSubmitted` flag to represent whether or not we want to apply `styles.submittedView`. If the style was dynamic, then it makes sense to store the style object in state.
- `accessibility` is now explicitly passed to the View component as a boolean. This differs from the prior implementation where `accessibility` wasn’t passed as a prop in the initial render, but in this case, we know the non-specification of `accessibility` is handled in the same way as `accessibilty={false}`.

Be wary of your assumptions, as uncaught subtleties can introduce differences in behavior! It’s a good idea to have snapshot tests of your component as they will highlight any differences pre and post your migration.

### Move the call to `requireNativeComponent` to a separate file

This will prepare for the JS to be ready for the new codegen system for the New Architecture. The new file should be named `<ComponentName>NativeComponent.js.`

#### Old way

```js
const RNTMyNativeView = requireNativeComponent('RNTMyNativeView');

[...]

return <RNTMyNativeView />;
```

#### New way

```js title="RNTMyNativeNativeComponent.js"
import RNTMyNativeViewNativeComponent from './RNTMyNativeViewNativeComponent';

[...]

return <RNTMyNativeViewNativeComponent />;
```

```js title="RNTMyNativeViewNativeComponent.js"
import { requireNativeComponent } from 'react-native';

const RNTMyNativeViewNativeComponent = requireNativeComponent(
  'RNTMyNativeView'
);

export default RNTMyNativeViewNativeComponent;
```

#### Flow support

If `requireNativeComponent` is not typed, you can temporarily use the `mixed` type to fix the Flow warning, for example:

```js
import type { HostComponent } from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
// ...
const RCTWebViewNativeComponent: HostComponent<mixed> =
  requireNativeComponent < mixed > 'RNTMyNativeView';
```

#### Later on you can replace `requireNativeComponent`

When you are ready to migrate to Fabric you can replace `requireNativeComponent` with `codegenNativeComponent`:

```ts title="RNTMyNativeViewNativeComponent.js"
export default (codegenNativeComponent<NativeProps>(
   'RNTMyNativeView',
): HostComponent<NativeProps>);
```

And update the main file:

```ts title="RNTMyNativeNativeComponent.js"
export default require('./RNTMyNativeViewNativeComponent')
  .default;
```

### Migrating off `dispatchViewManagerCommand`

Similar to the one above, in an effort to avoid calling methods on the UIManager, all view manager methods are now called through an instance of `NativeCommands`. `codegenNativeCommands` is a new API to code-generate `NativeCommands` given an interface of your view manager’s commands.

**Before**

```tsx
class MyComponent extends React.Component<Props> {
  _moveToRegion: (region: Region, duration: number) => {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      'moveToRegion',
      [region, duration]
    );
  }

  render() {
    return <MyCustomMapNativeComponent onPress={this._moveToRegion} />
  }
}
```

**Creating NativeCommands with `codegenNativeCommands`**

```ts title="MyCustomMapNativeComponent.js"
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type { HostComponent } from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

type MyCustomMapNativeComponentType = HostComponent<NativeProps>;

interface NativeCommands {
  +moveToRegion: (
     viewRef: React.ElementRef<MyCustomMapNativeComponentType>,
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
- Ensure you have included your command name in the `supportedCommands` array

#### Using Your Command

```tsx
import {Commands, ... } from './MyCustomMapNativeComponent';

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

#### Updating Native Implementation

In the example, the code-generated `Commands` will dispatch `moveToRegion` call to the native component’s view manager. In addition to writing the JS interface, you’ll need to update your native implementation signatures to match the dispatched method call. See the mapping for [Android argument types](https://facebook.github.io/react-native/docs/native-modules-android#argument-types) and[iOS argument types](https://facebook.github.io/react-native/docs/native-modules-ios#argument-types) for reference.

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

<Tabs groupId="android-language" defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
    fun receiveCommand(
        view: ReactMapDrawerView?, commandId: String?, args: ReadableArray?
    ) {
        when (commandId) {
            "moveToRegion" -> {
                if (args != null) {
                    val region: ReadableMap = args.getMap(0)
                    val durationMs: Int = args.getInt(1)
                    // ... act on the view...
                }
            }
        }
    }
```

</TabItem>
<TabItem value="java">

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

</TabItem>
</Tabs>

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

<Tabs groupId="fabric-component-backward-compatibility" queryString
      defaultValue={constants.defaultFabricComponentSpecLanguage}
      values={constants.fabricComponentSpecLanguages}>
<TabItem value="Flow">

```js
// @flow strict

import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  +getConstants: () => {||};

  // your module methods go here, for example:
  getString(id: string): Promise<string>;
}

export default (TurboModuleRegistry.get<Spec>(
  '<MODULE_NAME>',
): ?Spec);
```

</TabItem>
<TabItem value="TypeScript">

```tsx
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

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

<Tabs groupId="fabric-component-backward-compatibility" queryString
      defaultValue={constants.defaultFabricComponentSpecLanguage}
      values={constants.fabricComponentSpecLanguages}>
<TabItem value="Flow">

```js
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

```tsx
import type {ViewProps} from 'ViewPropTypes';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface NativeProps extends ViewProps {
  // add other props here
}

export default codegenNativeComponent<NativeProps>(
  '<FABRIC COMPONENT>',
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
- `UnsafeObject`
- `WithDefault<Type, Value>` - Sets default value for type
- `BubblingEventHandler<T>` - For events that are propagated (bubbled) up the component tree from child to parent up to the root (eg: `onStartShouldSetResponder`).
- `DirectEventHandler<T>` - For events that are called only on element recieving the event (eg: `onClick`) and don't bubble.

Later on those types are compiled to coresponding equivalents on target platforms.

### Be Consistent Across Platforms and Eliminate Type Ambiguity

Before adopting the New Architecture in your native module, you should ensure your methods are consistent across platforms. You will realize this as you set out to write the JavaScript spec for your native module - remember that JavaScript spec defines what the methods will look like on all supported platforms.

If your existing native module has methods with the same name on multiple platforms, but with different numbers or types of arguments across platforms, you will need to find a way to make these consistent. If you have methods that can take two or more different types for the same argument, then you need to find a way to resolve this type of ambiguity as type unions are intentionally not supported.

## Make Sure _autolinking_ is Enabled

<!-- alex ignore master -->

[Autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) is a feature of the React Native CLI that simplifies the installation of third-party React Native libraries. Instructions to enable _autolinking_ are available in the [React Native CLI docs](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md).

### Android

On Android, this generally requires you to include `native_modules.gradle` in both your `settings.gradle` and `build.gradle`.

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

## Migrating from `UIManager` JavaScript APIs

In the New Architecture, most `UIManager` methods will become available as instance methods on native component instances obtained via `ref`:

```tsx
function MyComponent(props: Props) {
  const viewRef = useRef(null);

  useEffect(() => {
    viewRef.current.measure(((left, top, width, height, pageX, pageY) => {
      // ...
    });
  }, []);

  return <View ref={viewRef} />;
}
```

This new API design provides several benefits:

- Better developer ergonomics by removing the need for separately importing `UIManager` or calling `findNodeHandle`.
- Better performance by avoiding the node handle lookup step.
- Directionally aligned with [the analogous deprecation of `findDOMNode`](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

We will eventually deprecate `UIManager`. However, we recognize that migrations demand a high cost for many application and library authors. In order to minimize this cost, we plan to continue supporting as many of the methods on `UIManager` as possible in the New Architecture.

**Support for `UIManager` methods in the New Architecture is actively being developed.** While we make progress here, early adopters can still experiment with the New Architecture by following these steps to migrate off common `UIManager` APIs:

1. Migrating off `setNativeProps`
2. Move the call to `requireNativeComponent` to a separate file
3. Migrating off `dispatchViewManagerCommand`
4. Creating NativeCommands with `codegenNativeCommands`

### Migrating off `setNativeProps`

`setNativeProps` will not be supported in the post-Fabric world. To migrate, move all `setNativeProp` values to component state.

**Example**

```tsx
class MyComponent extends React.Component<Props> {
  _viewRef?: React.ElementRef<typeof View>;

  render() {
    const {somePropValue} = this.props;
    return <View
       onPress={this._onSubmit}
       ref={this._captureRef}
       someProp={somePropValue}
       style={styles.view} />
  }

  _captureRef: (ref: React.ElementRef<typeof View>) => {
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
  view: {backgroundColor: 'white'},
  submittedView: {borderWidth: 1}
});
```

In this example, when the View is pressed, there is a `setNativeProps` call to update the style and accessibility props of the component. To migrate this component, it’s important to understand its current behavior using `setNativeProps`.

#### Pre-Fabric, Component Props Persist

On the first render, the component props are those declared in the render function. After the View is pressed `_onSubmit` calls `setNativeProps` with updated prop values.
The resulting component can be represented as such:

```tsx
<View
  accessibility={true}
  onPress={this._onSubmit}
  ref={this._captureRef}
  someProp={somePropValue}
  style={[styles.view, styles.submittedView]}
/>
```

Note that all prop values set in the render function are unchanged even though `setNativeProps` didn’t pass those props. Also, `style` is now the merged value of its value prior to `_onSubmit` and `styles.submittedView`. This is the important takeaway: in our current pre-Fabric world, **component props persist.** The platform view caches the prop values it's passed from the JS side. If this wasn’t the case, then following the setNativeProps call, React Native would have rendered a component like this:

```tsx
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
    this.setState(state => ({...state, hasSubmitted: true}));
    // ...other logic for onSubmit
  }
}


const styles = StyleSheet.create({
  view: {backgroundColor: 'white'},
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
import {requireNativeComponent} from 'react-native';

const RNTMyNativeViewNativeComponent = requireNativeComponent(
  'RNTMyNativeView',
);

export default RNTMyNativeViewNativeComponent;
```

#### Flow support

If `requireNativeComponent` is not typed, you can temporarily use the `mixed` type to fix the Flow warning, for example:

```js
// @flow strict-local

import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';
// ...
const RCTWebViewNativeComponent: HostComponent<mixed> =
  requireNativeComponent<mixed>('RNTMyNativeView');
```

#### Later on you can replace `requireNativeComponent`

When you are ready to migrate to Fabric you can replace `requireNativeComponent` with `codegenNativeComponent`:

```js title="RNTMyNativeViewNativeComponent.js"
// @flow strict-local

export default (codegenNativeComponent<NativeProps>(
  'RNTMyNativeView',
): HostComponent<NativeProps>);
```

And update the main file:

```js title="RNTMyNativeNativeComponent.js"
// @flow strict-local

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

```js title="MyCustomMapNativeComponent.js"
// @flow strict-local

import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import type {HostComponent} from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

type MyCustomMapNativeComponentType = HostComponent<NativeProps>;

interface NativeCommands {
  +moveToRegion: (
    viewRef: React.ElementRef<MyCustomMapNativeComponentType>,
    region: MapRegion,
    duration: number,
  ) => void;
}

export const Commands: NativeCommands =
  codegenNativeCommands<NativeCommands>({
    supportedCommands: ['moveToRegion'],
  });
```

Note:

- The first argument in the `moveToRegion` command is a HostComponent ref of the native component
- The arguments to the `moveToRegion` command are enumerated in the signature
- The command definition is co-located with the native component. This is an encouraged pattern
- Ensure you have included your command name in the `supportedCommands` array

#### Using Your Command

```js
// @flow strict-local

import {Commands, ...} from './MyCustomMapNativeComponent';

class MyComponent extends React.Component<Props> {
  _ref: ?React.ElementRef<typeof MyCustomMapNativeComponent>;

  _captureRef: (ref: React.ElementRef<typeof MyCustomMapNativeComponent>) => {
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

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
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

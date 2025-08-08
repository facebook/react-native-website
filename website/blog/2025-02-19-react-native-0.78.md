---
title: 'React Native 0.78 - React 19 and more'
authors: [vonovak, shubham, fabriziocucci, cipolleschi]
tags: [engineering]
date: 2025-02-19
---

# React Native 0.78 - React 19 and more

Today we are excited to release React Native 0.78!

This release ships React 19 in React Native and some other relevant features like native support for Android Vector drawables and better brownfield integration for iOS.

### Highlights

- [React 19](/blog/2025/02/19/react-native-0.78#react-19)
- [Towards smaller and faster releases](/blog/2025/02/19/react-native-0.78#towards-smaller-and-faster-releases)
- [Opt-in for JavaScript logs in Metro](/blog/2025/02/19/react-native-0.78#opt-in-for-javascript-logs-in-metro)
- [Added support for Android XML drawables](/blog/2025/02/19/react-native-0.78#added-support-for-android-xml-drawables)
- [ReactNativeFactory on iOS](/blog/2025/02/19/react-native-0.78#reactnativefactory-on-ios)

<!--truncate-->

## Highlights

### React 19

React 19 is now available on React Native!

React 19 requires updating your app, as we introduced some changes from React 18. For example, we removed some APIs such as `propTypes`, and you need to adjust your app to make it compatible with the new version of React.

Follow our step-by-step [instructions to upgrade](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) your app to React 19.

After the migration, you’ll be able to leverage all the new features of React, including (non exhaustively):

- **[Actions](https://react.dev/blog/2024/12/05/react-19#actions):** these are functions that use async transitions. Async transitions automatically manage submitting data for you: they handle pending states, optimistic updates, error handling and more.
- **[useActionState](https://react.dev/reference/react/useActionState):** a utility hook built on top of Actions. It takes a function and returns a wrapped Action to call. When the action is called, it will return the last result of the Action and its `pending` state.
- **[useOptimistic](https://react.dev/reference/react/useOptimistic):** a new hook that simplifies showing the final state of an update optimistically while the async request is underway. If the request errors, React will switch back to the previous value automatically.
- **[`use`](https://react.dev/reference/react/use):** this is a new API that allows access to resources during render. You can now read a promise or a context with `use` and React will Suspend until they resolve.
- **[`ref` as `props`](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop):** you can now pass `ref`as a `prop` like you do with any other prop. Function components will no longer need `forwardRef` and you can migrate your components now.
- And many others

For a complete list of the new available features, have a look at the [React 19 release blog post](https://react.dev/blog/2024/12/05/react-19).

#### React Compiler

React Compiler is a build-time tool designed to optimize React applications by automatically applying memoization. While developers can manually use APIs like `useMemo`, `useCallback`, and `React.memo` to prevent unnecessary recomputation of unchanged parts of an app, they could also forget or misuse these optimizations. React Compiler addresses this by leveraging its understanding of JavaScript and of the [Rules of React](https://react.dev/reference/rules) to automatically memoize values or groups of values within components and hooks.

With this release, we simplified the process to enable the React Compiler in your React Native apps. [In previous versions](https://react.dev/learn/react-compiler#using-react-compiler-with-react-17-or-18), you had to install two packages: the compiler and its runtime. After those packages were installed, you had to configure a Babel plugin to enable React Compiler through Metro.

Now, you only need to install the compiler itself and to configure the Babel plugin. To learn how to enable it, you can follow our step-by-step [guide](https://react.dev/learn/react-compiler#usage-with-babel).

To verify that the compiler is running, you can open the React Native DevTools: you should see that the components that are memoized have the `Memo ✨` tag attached to them in the Component Inspector.

If you want to learn more about React Compiler, these are useful resources:

- [React Compiler](https://react.dev/learn/react-compiler) docs
- [React Compiler Deep Dive](https://www.youtube.com/watch?v=uA_PVyZP7AI)

### Towards smaller and faster releases

We’re updating our release process to ship stable React Native releases more frequently in 2025.

It will be easier for you to update the React Native version because we’ll be reducing the number of breaking changes we ship. Faster releases also means that all the bugfixes we ship internally are reaching you earlier, and you can benefit from the latest features we develop inside React Native.

We believe this new model will benefit every developer in the React Native ecosystem, as fewer breaking changes means a more stable framework that everyone can rely on.

### Opt-in for JavaScript logs in Metro

We've added an opt-in to restore JavaScript log streaming via the Metro dev server, [previously removed in 0.77](/blog/2025/01/21/version-0.77#removal-of-consolelog-streaming-in-metro) for Community CLI users. This is in response to user feedback, as well as reviewing where we are with our replacement offerings today.

To opt in, use the new `--client-logs` flag. This can also be aliased via an npm script for convenience.

```sh
npx @react-native-community/cli start --client-logs
```

Log streaming in Metro will still be going away in future and remains off by default. However, we intend to give developers a longer migration period to adapt to this change.

This update will also be made available in the incoming 0.77.1 minor release.

### Added support for Android XML drawables

In React Native 0.78, we’re shipping a new way to load icons, illustrations, and other graphic elements on Android as [XML resources](https://developer.android.com/guide/topics/resources/drawable-resource). This means you can use [vector drawables](https://developer.android.com/develop/ui/views/graphics/vector-drawable-resources) for displaying vector images at any scale without losing quality, or [shape drawables](https://developer.android.com/guide/topics/resources/drawable-resource#Shape) for drawing more basic embellishments. This is all supported by the same `Image` component that you know and love. To use this feature today, you can import XML resources like any other [static resource](/docs/next/images#static-image-resources) by referencing them in the `source` prop. Furthermore, using XML resources rather than bitmaps will also help you reduce your application size and will result in better rendering across screens with different DPI.

```js
// via require
<Image
  source={require('./img/my_icon.xml')}
  style={{width: 40, height: 40}}
/>;

// or via import
import MyIcon from './img/my_icon.xml';
<Image source={MyIcon} style={{width: 40, height: 40}} />;
```

#### Performance & Quality

[Like all other image types](/docs/next/images#off-thread-decoding), Android’s XML resources are loaded and inflated off the main thread so you don’t drop any frames. This means the resource is not guaranteed to display instantly but also does not prevent user input while the resource is loading. Off-thread decoding is especially important when you need to render many icons at the same time. Internal apps realized some significant performance improvements when using Android’s vector drawables.

Utilizing resource types like vector drawables are the perfect way to display images without loss of quality, and can result in smaller APK files since you don't need to include an image type for every screen density. Furthermore, vector drawables are copied from memory once they’re loaded so if you render the same icon more than once they will all display at the same time.

#### Trade-offs

It’s important to note that drawable XML resources are not perfect, and there are constraints to using them:

- They must be referenced at build time of your Android application. These resources are passed into a build step with the [Android Asset Packaging Tool](https://developer.android.com/tools/aapt2) (AAPT) to convert raw XML into binary XML. Android does not support loading raw XML files, [this is a known limitation](https://issuetracker.google.com/issues/62435069).
- They cannot be loaded over the network by Metro. If you change the directory or name of an XML resource, you will need to rebuild your Android application each time.
- They have no dimensions. By default, they will display with a 0x0 size and you need to provide a width and height for them to show up.
- They are not fully customizable at runtime; you can only control dimensions or the overall tint color but you can’t customize individual element attributes _inside_ the resource like stroke widths, border radius, or colors. These types of customizations require different variants of your XML resource.

:::info
Android’s vector drawables are not a 1:1 replacement for libraries like `react-native-svg`. They are designed specifically for Android and do not work for iOS. If you want to have the same SVGs across all platforms, you'll have to continue using `react-native-svg`. Vector drawables merely offer performance benefits at the expense of customization.
:::

### ReactNativeFactory on iOS

With React Native 0.78 we improved the integration of React Native on iOS.

This version introduces a new class called `RCTReactNativeFactory` that allows you to create instances of React Native without the need of an AppDelegate. This should allow you to create a new version of React Native in a ViewController, for example. This simplifies dramatically the integration with Brownfield apps.

Imagine that you want to show a React Native view in a View Controller of your app. Starting from React Native 0.78, what you need to do, after installing all the dependencies as shown in [this guide](/docs/next/integration-with-existing-apps?language=apple#1-set-up-directory-structure), is to add this code:

```diff

+import React
+import React_RCTAppDelegate

public class ViewController {

+  var reactNativeFactory: RCTReactNativeFactory?
+  var reactNativeDelegate: ReactNativeDelegate?

  public func viewdidLoad() {
    super.viewDidLoad()
    // …
+ reactNativeDelegate = ReactNativeDelegate()
+ reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeDelegate!)
+ view = reactNativeFactory.rootViewFactory.view(withModuleName: "<your module name>")
  }

}

+class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {

+  override func sourceURL(for bridge: RCTBridge) -> URL? {
+    self.bundleURL()
+  }
+
+  override func bundleURL() -> URL? {
+    #if DEBUG
+    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
+    #else
+    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
+    #endif
+  }
+}

```

React Native will be loaded in the View Controller as soon as you navigate to it.

This code creates an `RCTReactNativeFactory`, assigns a delegate to it, and asks it to create a `rootView` for a React Native’s view.

The delegate is defined below, and it overrides the `sourceURL` and the `bundleURL` properties to tell React Native where it can find the JS bundle to load in the view.

## Other Breaking Changes

### General

- React Native DevTools
  - Removed FuseboxClient CDP domain
- Codegen
  - Separate component array types and command array types

### Android

- Nullability changes: migrating `RootView` to Kotlin resulted in changes of parameter types from nullable to non nullable.
- The following classes have been moved from public to internal, or removed, and can’t be accessed anymore:
  - `com.facebook.react.bridge.GuardedResultAsyncTask`
  - `com.facebook.react.uimanager.ComponentNameResolver`
  - `com.facebook.react.uimanager.FabricViewStateManager`
  - `com.facebook.react.views.text.frescosupport.FrescoBasedReactTextInlineImageViewManager`

### iOS

- Change Image load event size info from logical size to pixel (This only affects the Old Architecture)

## Acknowledgements

React Native 0.78 contains over 509 commits from 87 contributors. Thanks for all your hard work!

Thanks to all the additional authors that worked on documenting features in this release post:

- [Dream11](https://github.com/dream-sports-labs) team for the thorough testing of React 19 features in React Native
- [Nicola Corti](https://github.com/cortinico) for the work on Faster Releases
- [Alex Hunt](https://github.com/huntie) for the work on the Metro logs opt-in
- [Peter Abbondanzo](https://github.com/Abbondanzo) for the work on Android XML Drawable Support
- [Oskar Kwaśniewski](https://github.com/okwasniewski) for the work on the ReactNativeFactory

## Upgrade to 0.78

Please use the [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) to view code changes between React Native versions for existing projects, in addition to the Upgrading docs.

To create a new project:

```
npx @react-native-community/cli@latest init MyProject --version latest
```

If you use Expo, [React Native 0.78 will be supported in a canary release of the Expo SDK](https://expo.dev/changelog/react-native-78).

:::info
0.78 is now the latest stable version of React Native and 0.75.x moves to unsupported. For more information see [React Native's support policy](https://github.com/reactwg/react-native-releases/blob/main/docs/support.md). We aim to publish a final end-of-life update of 0.75 in the near future.
:::

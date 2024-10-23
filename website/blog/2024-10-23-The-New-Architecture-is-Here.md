---
title: 'The New Architecture is here'
authors: [reactteam]
tags: [announcement]
date: 2024-10-23
---

React Native 0.76 with the New Architecture by default is now available on npm!

In the [0.76 release blog post](/blog/2024/10/23/release-0.76-new-architecture) we shared the list of all the significant changes included in this version. In this post, we want to give an overview of the New Architecture and how it is going to shape the future of React Native.

The New Architecture adds support for modern React features including full support for [Suspense](https://react.dev/blog/2022/03/29/react-v18#new-suspense-features), [Transitions](https://react.dev/blog/2022/03/29/react-v18#new-feature-transitions), [automatic batching](https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching), and [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect). The New Architecture also includes new [native module](/docs/next/fabric-native-modules-introduction) and [native component](/docs/next/turbo-native-modules-introduction) systems that enable writing type-safe modules with direct access to native without a bridge.

The release is possible thanks to a ground up rewrite of React Native we’ve been working on since 2018, and we’ve taken special care to make the New Architecture a gradual migration for most apps. In 2021, we created [the New Architecture Working group](https://github.com/reactwg/react-native-new-architecture/) to work with the community to support the New Architecture and ensure a smooth upgrade experience for the entire React ecosystem.

We expect most apps can adopt the New Architecture with the same effort as any other release. The most popular React Native libraries already include support for the New Architecture, and for libraries that do not support the New Architecture, we developed an automatic interop layer with the old architecture.

<!--truncate-->

In case you missed it, we shared a lot of this vision over the past years:

- [React Native EU 2019 \- The New React Native](https://www.youtube.com/watch?v=52El0EUI6D0)
- [React Conf 2021 \- React 18 Keynote](https://www.youtube.com/watch?v=FZ0cG47msEk)
- [App.js 2022 \- Bringing the New React Native Architecture to the OSS Community](https://www.youtube.com/watch?v=GJxL2aiIX3Q)
- [React Conf 2024 \- Day 2 keynote](https://www.youtube.com/watch?v=Q5SMmKb7qVI)

## What is the New Architecture

The most important change in this release is something most users should not need to think about: how React Native works. We have completely rewritten the major systems of React Native including how components are rendered, how JavaScript communicates with native, and how work is scheduled across different threads. We call all of these architecture improvements the New Architecture.

In the old architecture, React Native communicated with native with an asynchronous bridge. To render a component or call a native function, React Native needed to push native functions calls to a queue in the bridge, and process them asynchronously. This architecture had many benefits. Since all work was done on a background thread, the main thread was never blocked for rendering updates or handling native module function calls.

The approach had major limitations. Some work needs to respond synchronously to user input, potentially interrupting any in progress work, in order to provide the best experience possible to users. Since the old architecture was only asynchronous, we needed to rewrite it to allow for both asynchronous and synchronous updates.

Additionally, in the old architecture, serializing function calls over the bridge quickly became a bottleneck, especially for frequent updates or large objects. This made it hard for apps to achieve 60+ FPS reliably. There were also synchronizing issues: when the JavaScript and native layer got out of sync, it was impossible to reconcile them synchronously, resulting bugs like lists showing frames of empty space and visual UI jumps due to intermediate states rendering.

Finally, since the old architecture kept a single copy of the UI using the native hierarchy, and mutated that copy in place, layout could only be computed on a single thread. This made it impossible to process urgent updates like user inputs, and layout could not be read synchronously, such as reading in a layout effect to update the position of a tooltip.

All of these problems meant that it was not possible to properly support React’s concurrent features. To solve these problems, the New Architecture includes three main parts:

- The New Native Module System
- The New Renderer
- Removal of the Bridge

The New Module system allows the React native renderer to have synchronous access to the native layer, which allows it to handle events, schedule updates, and read layout both asynchronously and synchronously. The new Native Modules are also lazily loaded by default, giving apps a significant performance gain.

The New Renderer can handle multiple in progress trees across multiple threads, which allows React to process multiple concurrent update priorities, either on the main thread or a background thread. It also supports reading layout from multiple threads synchronously, or asynchronously, to support more responsive UIs without jank.

Finally, removing the bridge allows for faster startup and direct communication between JavaScript and native, so that the cost of switching work is minimized. This also allows for better error reporting and debugging, and reduces crashes from undefined behavior.

The New Architecture is now ready to be used in production. It is already used at scale at Meta in the Facebook app and in other products. We successfully used React Native and the New Architecture in the Facebook and Instagram app we developed for our [Quest devices](https://engineering.fb.com/2024/10/02/android/react-at-meta-connect-2024/).

Our partners are already using the New Architecture in production for months now: have a look at these success stories by [Expensify](https://blog.swmansion.com/sunrising-new-architecture-in-the-new-expensify-app-729d237a02f5) and [Kraken](https://blog.kraken.com/product/engineering/how-kraken-fixed-performance-issues-via-incremental-adoption-of-the-react-native-new-architecture), and give [BlueSky](https://github.com/bluesky-social/social-app/releases/tag/1.92.0-na-rc.2) a shot with their new release.

### New Native Modules

The new Native Module System is a major rewrite of how JavaScript and the native platform communicate. It’s written entirely in C++, which unlocks many new capabilities:

- Synchronous access to and from native
- Code sharing across platforms
- Type safety between JavaScript and native
- Lazy module loading by default

In the new Native Module system, JavaScript and the native layer can now synchronously communicate with each other through the JavaScript Interface (JSI), without the need to use an asynchronous bridge. This means your custom native modules can now synchronously call a function, return a value, and pass that value back to another native module function.

In the old architecture, in order to handle a response for native, you needed to provide a callback, and the value returned needed to be serializable:

```ts
// ❌ async callback from native module
nativeModule.getValue(value => {
  // ❌ value cannot reference a native object
  nativeModule.doSomething(value);
});
```

In the New Architecture, you can make synchronous calls to native:

```ts
// ✅ sync response from native module
const value = nativeModule.getValue();

// ✅ value can be a reference to a native object
nativeModule.doSomething(value);
```

With the New Architecture, you can finally leverage the full power of a C++ native implementation, while still accessing it from JavaScript/TypeScript APIs. The New Module System supports [modules written in C++](/docs/next/the-new-architecture/pure-cxx-modules) so you can write your module once and it works across all platforms including Android, iOS, Windows, and MacOS. Implementing modules in C++ allows for more fine-grained memory management and performance optimizations.

Additionally, with [Codegen](/docs/next/the-new-architecture/what-is-codegen) your modules can define a strongly typed contract between the JavaScript layer and the native layer. From our experience, cross-boundary type errors are one of the most common sources of crashes in cross-platform apps. Codegen lets you overcome those problems while also generating boilerplate code for you.

Finally, modules are now lazily loaded: they are loaded in memory only when they’re effectively needed rather than at startup. This reduces the app startup time, and keeps it low as the application grows in complexity.

Popular libraries such as [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) have already seen benefits from migrating to the new Native Modules:

> “The new Native Modules greatly simplified setup, autolinking, and initialization for `react-native-mmkv`. Thanks to the New Architecture, `react-native-mkv` is now a pure C++ Native Module, which allows it to work on any platform. The new Codegen allows MMKV to be fully type-safe, which fixed a long-standing `NullPointerReference` issue by enforcing null-safety, and being able to call Native Module functions synchronously allowed us to replace custom JSI access with the new Native Module API.”
>
> [Marc Rousavy](https://twitter.com/mrousavy), creator of `react-native-mmkv`

### New Renderer

We've also completely rewritten the Native Renderer. The new renderer offers several benefits:

- Updates can be rendered on different threads at different priorities.
- Layout can be read synchronously and across different threads.
- The renderer is written in C++ and shared across all platforms.

The updated Native Renderer now stores the view hierarchy in an immutable tree structure. This means that the UI is stored in a way that cannot be changed directly, allowing for thread-safe processing of updates. This allows it to handle multiple in-progress trees, each representing a different version of the user interface. As a result, updates can be rendered in the background without blocking the UI (such as during transitions) or on the main thread (in response to user input).

By supporting multiple threads, React can interrupt a low-priority update to render an urgent one, such as those generated by user inputs, and then resume the low-priority update as needed. The new renderer can also read layout information synchronously and across different threads. This enables background computation for low-priority updates and synchronous reads when needed, such as repositioning a tooltip with useLayoutEffect.

Finally, rewriting the renderer in C++ allows it to be shared across all platforms. This ensures that the same code runs on iOS, Android, Windows, macOS, and any other React Native-supported platform, providing consistent rendering capabilities without needing re-implementation for each platform.

This is a significant step towards our [Many Platform Vision](/blog/2021/08/26/many-platform-vision). For example, View Flattening was Android only optimisation to avoid deep layout trees. The new renderer, with shared C++ core, [brings this feature to iOS](https://github.com/reactwg/react-native-new-architecture/discussions/110). This optimisation is automatic and does not require a setup, it comes for free with the shared renderer.

With these changes, React Native now fully supports Concurrent React features like Suspense and Transitions, making it easier to build complex user interfaces that respond quickly to user input without jank, delays, or visual jumps. In the future, we will leverage these new capabilities to bring more improvements to built-in components such as FlatList and TextInput.

Popular libraries like [reanimated](https://docs.swmansion.com/react-native-reanimated/) are already taking advantage of the New Renderer:

> “Reanimated 4, currently in development, introduces a new animation engine that works directly with the New Renderer, allowing it to handle animations and manage layout across different threads. The New Renderer’s design is what truly enables these features to be built without relying on numerous workarounds. Moreover, because it’s implemented in C++ and shared across platforms, large portions of Reanimated can be written once, reducing platform-specific issues, minimizing the codebase, and streamlining adoption for out-of-tree platforms.”
>
> [Krzysztof Magiera](https://x.com/kzzzf), creator of [Reanimated](https://docs.swmansion.com/react-native-reanimated/)

### Removing the Bridge

In the New Architecture, we've also fully removed React Native's dependency on the bridge, replacing it with direct, efficient communication between JavaScript and native code using JSI:

![](/blog/assets/0.76-bridge-diagram.png)

Removing the bridge improves startup time by avoiding bridge initialization. For example, in the old architecture, in order to provide global native methods to JavaScript, we would need to initialize a module in JavaScript on startup, causing a small delay in app startup time:

```js
// ❌ Slow initialization
import {NativeTimingModule} from 'NativeTimingModule';
global.setTimeout = timer => {
  NativeTimingModule.setTimeout(timer);
};

// App.js
setTimeout(() => {}, 100);
```

In the New Architecture, we can directly bind native methods from C++:

```cpp
// ✅ Initialize directly in C++
runtime.global().setProperty(runtime, "setTimeout", createTimer);
```

```js
// App.js
setTimeout(() => {}, 100);
```

The rewrite also improves error reporting, particularly for JavaScript crashes at startup, and reducing crashes from undefined behavior. If crashes occur, the new [React Native DevTools](/docs/next/react-native-devtools) simplify debugging and support the New Architecture.

The bridge remains for backward compatibility to support gradual migration to the New Architecture. In the future, we will remove the bridge code completely.

### Gradual Migration

The New Architecture in React Native is a breaking change, but the migration process has been made easier with tools and [interop layers](https://github.com/reactwg/react-native-new-architecture/discussions/135).

The concurrent features of React are [only enabled in parts of the application that use them](https://react.dev/blog/2022/03/29/react-v18#gradually-adopting-concurrent-features), and modules and components can be migrated to be "New Architecture compatible" without requiring modification. However, there are [known limitations](https://github.com/reactwg/react-native-new-architecture/discussions/175) to the interop layers, and some modules and components may need to be [properly migrated](TODO).

The interop layers will be phased out in future releases of React Native. Meanwhile, if you find a bug with them, please [open them using this template](https://github.com/facebook/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2CType%3A+New+Architecture&projects=&template=new_architecture_bug_report.yml).

## New Features

The New Architecture includes full support for React 18, concurrent features, and `useLayoutEffect` in React Native. For a full list of React 18 features, please see the [React 18 blog post](https://react.dev/blog/2021/12/17/react-conf-2021-recap#react-18-and-concurrent-features).

### Transitions

Transitions are a new concept in React 18 to distinguish between urgent and non-urgent updates.

- **Urgent updates** reflect direct interaction, like typing and pressing.
- **Transition updates** transition the UI from one view to another.

Urgent updates need immediate response to match our intuitions about how physical objects behave. However, transitions are different because the user doesn’t expect to see every intermediate value on screen. In the New Architecture, React Native is able to support rendering urgent updates and transition updates separately.

Typically, for the best user experience, a single user input should result in both an urgent update and a non-urgent one. Just like in ReactDOM, events like `press` or `change` are handled as urgent and rendered immediately. You can use the `startTransition` API inside an input event to inform React which updates are “transitions”, and can be deferred to the background:

```jsx
import {startTransition} from 'react';

// Urgent: Show the slider value
setCount(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setNumberOfTiles(input);
});
```

Separating urgent events from transitions allows for a more responsive user interface, and a more intuitive user experience.

Here's a comparison of the old architecture without transitions (left) and the new architecture with transitions (right):

<div className="TwoColumns TwoFigures">
<figure>
 <img src="/img/new-architecture/with-transitions.gif" alt="A video demonstrating an app rendering many views (tiles) according to a slider input. The views are rendered in batches as the slider is quickly adjusted from 0 to 1000. There are less batch renders in comparison to the next video." />
 <figcaption>Rendering tiles with transitions to interrupt in-progress renders of stale state. [See code](https://gist.github.com/lunaleaps/eac391bf3fe4c85953cefeb74031bab0/revisions).</figcaption>
</figure>
<figure>
 <img src="/img/new-architecture/without-transitions.gif" alt="A video demonstrating an app rendering many views (tiles) according to a slider input. The views are rendered in batches as the slider is quickly adjusted from 0 to 1000." />
 <figcaption>Rendering tiles without marking it as a transition. [See code](https://gist.github.com/lunaleaps/eac391bf3fe4c85953cefeb74031bab0/revisions).</figcaption>
</figure>
</div>

### Automatic Batching

When upgrading to the New Architecture, you will benefit from automatic batching from React 18.

Automatic batching allows React Native application to batch together more state updates when rendering to avoid the rendering of intermediate states. This allows React Native to be faster and less susceptible to lags, without any additional code from the developer.

<div className="TwoColumns TwoFigures">
<figure>
 <img src="/img/new-architecture/legacy-renderer.gif" alt="A video demonstrating an app rendering many views according to a slider input. The slider value is adjusted from 0 to 1000 and the UI slowly catches up to rendering 1000 views." />
 <figcaption>Rendering frequent state updates with legacy renderer.</figcaption>
</figure>
<figure>
 <img src="/img/new-architecture/react18-renderer.gif" alt="A video demonstrating an app rendering many views according to a slider input. The slider value is adjusted from 0 to 1000 and the UI resolves to 1000 views faster than the previous example, without as many intermediate states." />
 <figcaption>Rendering frequent state updates with automatic batching.</figcaption>
</figure>
</div>

In the old architecture (left), more intermediate states are rendered, and the UI keeps updating even when the slider stops moving. The New Architecture (right), renders fewer intermediate states and completes the rendering much sooner thanks to automatically batching the updates.

### Full support for Suspense

Suspense lets you declaratively specify the loading state for a part of the component tree if it’s not yet ready to be displayed:

```
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

We introduced a limited version of Suspense several years ago, and React 18 added full support. However, until now React Native was not able to support concurrent rendering for Suspense.

The New Architecture includes full support for Suspense introduced in React 18. This means that you can now use Suspense in React Native to handle loading states for your components, and the suspended content will render in the background while the loading state is displayed, giving higher priority to user input on visible content.

### Event Loop

The New Architecture allowed us to implement a well-defined event loop processing model, as described in this [RFC](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0744-well-defined-event-loop.md).

The RFC follows the specifications described in the [HTML specifications](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model) and it describes how React Native should perform tasks on the JavaScript thread.

Implementing a well-defined event loop helps closing the gaps between web development and native development: the behavior of a React Native application is now closer to the behavior of a React application, allowing you to really learn once, and write anywhere.

The event loop brings many benefits to React Native. Among those, we have:

- A predictable behavior of the framework, that leads to more predictable and performant apps
- A better alignment of React native with the Web
- It enables the implementation of more compliant web specifications
- It lays the foundation for new features like Microtasks, `useLayoutEffect` and others features that will be implemented in the future.

Reading layout in useLayoutEffect
The event loop allowed us to implement the `useLayoutEffect` hooks in React Native. This is the perfect place to retrieve the most accurate measurements of the views in your UI.

In the old architecture, due to its asynchronous nature, we could not have synchronous layouts. To retrieve the latest layout information of a view, we had to wait before the view was actually rendered. With the New Architecture we can now use useLayoutEffect to implement synchronous layouts.

Let’s have a look at this example: rendering a tooltip next to a view that moves on the screen.
With the old architecture, on the left, we had to wait for the view to be completely rendered before we could fetch its layout information and render the tooltip next to it. This leads to a user experience where the tooltip would lag behind the view.
With `useLayoutEffect`, on the right, we can retrieve the layout information right before the view is rendered and we can attach the tooltip in the exact place we need. The final result is a much better user experience:

<div className="TwoColumns TwoFigures">
<figure>
 <img src="/img/new-architecture/async-on-layout.gif" alt="A view that is moving to the corners of the viewport and center with a tooltip rendered either above or below it. The tooltip is rendered after a short delay after the view moves" />
 <figcaption>Asynchronous measurement and render of the ToolTip. [See code](https://gist.github.com/lunaleaps/eabd653d9864082ac1d3772dac217ab9).</figcaption>
</figure>
<figure>
 <img src="/img/new-architecture/sync-use-layout-effect.gif" alt="A view that is moving to the corners of the viewport and center with a tooltip rendered either above or below it. The view and tooltip move in unison." />
 <figcaption>Synchronous measurement and render of the ToolTip. [See code](https://gist.github.com/lunaleaps/148756563999c83220887757f2e549a3).</figcaption>
</figure>
</div>

### useLayoutEffect

Building on the Event Loop and the ability to read layout synchronously, in the New Architecture we added proper support for `useLayoutEffect` in React Native.

In the old architecture, you needed to use the asynchronous `onLayout` event to read layout information of a view (which was also asynchronous). As a result there would be at least one frame where the layout was incorrect until the layout was read and updated, causing issues like tooltip placed in the wrong position:

```tsx
// ❌ async onLayout after commit
const onLayout = React.useCallback(event => {
  // ❌ async callback to read layout
  ref.current?.measureInWindow((x, y, width, height) => {
    setPosition({x, y, width, height});
  });
}, []);

// ...
<ViewWithTooltip
  onLayout={onLayout}
  ref={ref}
  position={position}
/>;
```

The New Architecture fixes this by allowing synchronous access to layout information in `useLayoutEffect`:

```tsx
// ✅ sync layout effect during commit
useLayoutEffect(() => {
  // ✅ sync call to read layout
  const rect = ref.current?.getBoundingClientRect();
  setPosition(rect);
}, []);

// ...
<ViewWithTooltip ref={ref} position={position} />;
```

This change allows you to read layout information synchronously and update the UI in the same frame, allowing you to position elements correctly before they are displayed to the user.

## How to Upgrade

React Native 0.76 is the first version of React Native that leverages the full power of [React 18 and its concurrent features](https://react.dev/blog/2021/12/17/react-conf-2021-recap#react-18-and-concurrent-features).

To migrate your JavaScript code to React 18 and its semantics, follow the [How to Upgrade to React 18](https://react.dev/blog/2022/03/08/react-18-upgrade-guide) guide.

For native migration, 0.76 comes with some breaking changes that you need to consider when upgrading your app. The list of breaking changes are described in the [React Native 0.76 release blogpost post](/blog/2024/10/23/release-0.76-new-architecture#breaking-changes-1) and in the [React Native changelog](https://github.com/facebook/react-native/blob/main/CHANGELOG.md).

Aside from the breaking changes described above, the migration to the New Architecture is transparent.

To migrate to the New Architecture, follow the usual steps as they are illustrated in the [upgrade helper](https://react-native-community.github.io/upgrade-helper/). Once you carry out these steps, your application will run on the New Architecture.

### Libraries

We ensured that all libraries with 200K+ weekly downloads (that's \~10% of React Native weekly downloads) work well with the New Architecture.

We are tracking the compatibility between libraries and React Native in the [reactnative.directory](https://reactnative.directory) website. Make sure that all the libraries you are using in your app are compatible with the new architecture by applying the [“Support the New Architecture” filter](https://reactnative.directory/?newArchitecture=true). More than 850 libraries are already compatible with the New Architecture.

![](/blog/assets/0.76-directory.png)

If some of the libraries your app depends on are not compatible yet, you can:

- Look for alternative libraries with the same features among the compatible ones.
- Open an issue to the library and ask the author to migrate to the New Architecture.
- [Opt-out from the New Architecture](#opt-out) while those libraries are migrated.

In the future, we will publish more tools to help you when you need to install a new library in your app.

### Apps

If your app has custom native modules, custom native components, or both, we expect for them to work fine, thanks to our [interop layers](TODO).

Most advanced use cases might not be supported by them. If that’s the case for you, please follow these guides to migrate your modules and components to the New Architecture:

- [Native Modules](/docs/next/turbo-native-modules-introduction)
- [Native Components](/docs/next/fabric-native-modules-introduction)

### Opt-out

If, for any reason, the New Architecture is not behaving properly in your application, there is always the option to opt-out from it until you are ready to turn it on again.

To opt-out from the New Architecture:

- On Android, modify the `android/gradle.properties` file and turn off the `newArchEnabled` flag

```diff title=”gradle.properties”
-newArchEnabled=true
+newArchEnabled=false
```

- On iOS, you can reinstall the dependencies running the command:

```shell
RCT_NEW_ARCH_ENABLED=0 bundle exec pod install
```

## Thanks

Delivering the New Architecture to the OSS community has been a huge effort which took us several years of research and development. We want to take a moment to thank all the current and past members of the React team that helped us achieve this result.

We are also extremely grateful to all the partners that collaborated with us to make this happen. Specifically, we would like to call out:

- [Expo](https://expo.dev/), for adopting the New Architecture early on, for supporting the work on migrating the most popular libraries.
- [Software Mansion](https://swmansion.com/), for maintaining crucial libraries in the ecosystem, for migrating them to the New Architecture early and for all the help in investigating and fixing various issues.
- [Callstack](https://www.callstack.com/), for maintaining crucial libraries in the ecosystem, for migrating them to the New Architecture early and for the support with the work on the Community CLI.
- [Microsoft](https://opensource.microsoft.com/), for adding the New Architecture implementation for react-native-windows and react-native-macos as well as in several other developers tools.
- [Expensify](https://www.expensify.com/), [Kraken](https://www.kraken.com/), [BlueSky](https://bsky.app/) and [Brigad](https://www.brigad.co/) for pioneering the adoption of the New Architecture, reporting various issues so that we could fix them for everyone else.
- All the independent library maintainers and developers who contributed to the New Architecture by testing it, fixing some of the issues and opening questions on unclear matters so that we could clear them.

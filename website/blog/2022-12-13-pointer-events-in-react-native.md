---
title: Pointer Events in React Native
authors: [lunaleaps, vincentriemer]
tags: [announcement]
date: 2022-12-13
---

# Pointer Events in React Native

Today we are sharing an experimental cross-platform pointer API for React Native. We’ll go over motivations, how it works, and its benefits to React Native users. There are instructions on how to enable and we’re excited to hear your feedback!

It’s been over a year since we shared [our many platform vision](https://reactnative.dev/blog/2021/08/26/many-platform-vision) on the wins of building beyond mobile and how it sets a higher bar for all platforms. During this time, we've increased our investments in React Native for VR, Desktop, and Web. With differences in hardware and interactions on these platforms, it raised the question of how React Native should holistically handle input.

<!--truncate-->

### Going Beyond Touch

Desktop and VR have historically relied on mouse and keyboard input where mobile is primarily touch. That narrative has evolved with touch-screen laptops and growing needs to support interactions via keyboard and pen on mobile. All of which the React Native touch event system is not equipped to handle.

As a result, users of out-of-tree platforms fork React Native and/or create custom native components and modules to support critical features like hover detection or left-click. This divergence leads to prop redundancy with event handlers serving similar purposes but for different platforms. It adds complexity to the framework and makes code-sharing between platforms tedious. For these reasons, the team was motivated to provide a cross-platform pointer API.

React Native aims to provide robust and expressive APIs to build for many platforms while maintaining characteristic platform experiences. Designing such an API is challenging yet thankfully there is prior art in the pointer space that React Native can leverage.

### Looking to Web

Web is a platform with similar challenges in scaling to many platforms while also considering future-proof design. The World Wide Web consortium (W3C) is tasked with setting standards and proposals to build a Web that is interoperable amongst different platforms and browsers.

Most relevant for our needs, the W3C has defined behavior for an abstract form of input, called a pointer. The [Pointer Events](https://www.w3.org/TR/pointerevents3/) specification builds on mouse events and aims to provide a single set of events and interfaces for cross-device pointer input while still allowing for device-specific handling when necessary.

Following the Pointer Events specification provides React Native users many benefits. Beyond addressing the problems mentioned earlier, it raises the capabilities of platforms that haven’t historically had to consider multi-input type interactions. Think attaching a bluetooth mouse to your Android phone or the Apple pencil supporting hover on the iPad M2.

Being spec-complaint also provides opportunity for knowledge sharing between Web and React Native. Education of Web expectations around Pointer Events can doubly serve React Native developers. However, we also recognize that React Native requirements are different than web and our approach to specifications is best effort with well documented deviations so expectations are clear. There is related work of aligning certain Web standards to [reduce API fragmentation](https://github.com/react-native-community/discussions-and-proposals/pull/496) in accessibility and performance APIs.

## Porting Web Platform Tests

While the Pointer Events specification provides interfaces and behavior descriptions of the API, we found it wasn’t specific enough for us to confidently make changes and point to the specification as verification. However, web browsers use another mechanism to ensure compliance and interoperability — the [Web Platform Tests](https://web-platform-tests.org/)!

The Web Platform Tests are written to work against the browser’s imperative DOM APIs — unsupported by React Native as it uses its own view primitives. This means that we aren’t able to code-share the tests with browsers and instead have an analogous testing API for React Native that makes it easier to port those Web Platform Tests.

We implemented a new manual testing framework which we are now using for verifying our implementations through RNTester. These tests are tentatively named the RNTester Platform Tests and are still fairly basic. Our implementation provides an API to construct test cases as components themselves which are rendered and where the results are reported solely through the UI.

![GIF showing a side by side comparison of the "Pointer Events hoverable pointer attributes test" running in React Native (iOS) on the left, and Web (the original implementation) on the right.](/blog/assets/pointer-events-wpt-demo.gif)

These tests will continue to be helpful as we further the completeness of our Pointer Events implementation. These tests will also scale to test Pointer Events implementations on platforms beyond Android and iOS. As the number of tests in our suite increase we will be looking to automate the running of these tests so that we are better equipped to catch regressions in our implementations.

## How it works

Much of our Pointer Events implementation builds off existing infrastructure for dispatching touch events. On Android and iOS we leverage the relevant MotionEvent and UITouch events. The general flow of event dispatching is illustrated below.

![Diagram of code flow for interpreting Android and iOS UI input events into Pointer Events. On Android, input handlers "onTouchEvent" and "onHoverEvent" fire "MotionEvents" that are interpreted into Pointer Events and through JSI are dispatched to the React renderer. iOS takes a similar path with input handlers "touchesBegan", "touchesMoved", "touchesEnded", and "hovering" interpreting "UITouch" and "UIEvent" into Pointer Events.](/blog/assets/pointer-events-code-flow.png)

Using Android as an example, the general approach to leveraging platform events are:

1. Iterate through all pointers of the `MotionEvent` and do a depth-first search to determine the target React view of each pointer and its ancestral path.
2. Map the category of `MotionEvent` to the relevant pointer events. There is a 1-to-many relationship between `MotionEvent` and `PointerEvent`. In the illustration of their relationship, dotted lines indicate fired events if the pointing device does not support hover.

![A diagram illustrating the relationship of types of Android MotionEvents into Pointer Events fired. Some pointer events are conditionally fired if pointing device does not support hover. "ACTION_DOWN" and "ACTION_POINTER_DOWN" fire pointerdown and conditionally fire pointerenter, pointerover. "ACTION_MOVE" and "ACTION_HOVER_MOVE" fire pointerover, pointermove, pointerout, pointerup. "ACTION_UP" and "ACTION_POINTER_UP" fire pointerup and conditionally fire pointerout, pointerleave.](/blog/assets/pointer-events-motionevent-relationship.png)

1. Build the `PointerEvent` interface with platform details from the `MotionEvent` and cached state of previous interactions. (Ex. [the `button` property](https://w3c.github.io/pointerevents/#the-button-property))
2. Dispatch the pointer events from Android to React Native’s [core event queue](https://github.com/facebook/react-native/blob/main/ReactCommon/react/renderer/core/EventQueueProcessor.cpp#L20) and leverage JSI to call the [`dispatchEvent`](https://github.com/facebook/react/blob/main/packages/react-native-renderer/src/ReactFabricEventEmitter.js#L83) method in `react-native-renderer` which iterates through the React tree for the bubble and capture phase of the event.

## Implementation Progress

When it comes to our current progress of implementing the Pointer Events specification we’ve focused on a solid baseline implementation of the most common events that handle things like pressing, hovering, and moving.

### Events

| Implemented    | Work in Progress | Yet to be Implemented |
| -------------- | ---------------- | --------------------- |
| onPointerOver  | onPointerCancel  | onClick               |
| onPointerEnter |                  | onContextMenu         |
| onPointerDown  |                  | onGotPointerCapture   |
| onPointerMove  |                  | onLostPointerCapture  |
| onPointerUp    |                  | onPointerRawUpdate    |
| onPointerOut   |                  |                       |
| onPointerLeave |                  |                       |

:::info

onPointerCancel has been hooked up to the native platform’s "cancel" event but this does not necessarily correspond to when the web platform expects them to fire.

:::

### Event Properties

For each of the events mentioned above we’ve also implemented the majority of the properties expected in the PointerEvent object — though in React Native these are exposed through the `event.nativeEvent` property. You can find an enumeration of all the implemented properties in the [event object’s Flowtype interface definition](https://github.com/facebook/react-native/blob/59ee57352738f030b41589a450209e51e44bbb06/Libraries/Types/CoreEventTypes.js#L175). One notable exception to being completely implemented is the `relatedTarget` property as exposing a native view reference in this ad-hoc manner isn’t trivial.

## Future Work and Exploration

In addition to the events above there are also some other APIs related to Pointer Events. In the future, we plan to be implement these APIs as a part of this effort. These APIs include:

- Pointer Capture API
  - Includes the imperative API exposed on element references including `setPointerCapture()`, `releasePointerCapture()`, and `hasPointerCapture()`.
- `touch-action` style property
  - The web uses this CSS property to declaratively negotiate gestures between the browser and a website’s own event handling code. In React Native this could be used for negotiating the event handling between a View’s pointer event handlers and a parent ScrollView.
- `click`, `contextmenu`, `auxclick`
  - `click` is an abstract definition of interaction that may be triggered through accessibility paradigms or other characteristic platform interactions.

Another benefit of the native Pointer Events implementation is that it will allow us to revisit and improve various forms of gesture handling currently limited only to touch events and handled in JavaScript by the Responder, Pressability, and PanResponder APIs.

Furthermore, we are continuing to explore including an implementation of the `EventTarget` interface for React Native host components (i.e. `add`/`removeEventListener`) which we believe will make possible more user-land abstractions for handling pointer interactions.

## Trying it Out

Our Pointer Events implementation is still experimental but we’re interested in getting feedback from the community on what we’ve shared. If you are interested in trying this API you’ll need to enable a couple feature flags:

### Enable Feature Flags

:::note

Pointer Events are only implemented for the [New Architecture (Fabric)](https://reactnative.dev/docs/the-new-architecture/use-app-template) and are only available for React Native 0.71+ which at the time of writing is a release candidate.

:::

In your entry JavaScript file (index.js in the default React Native app template) you’ll need to enable the `shouldEmitW3CPointerEvents` flag for Pointer Events and `shouldPressibilityUseW3CPointerEventsForHover` to use Pointer Events in `Pressability`.

```js
import ReactNativeFeatureFlags from 'react-native/Libraries/ReactNative/ReactNativeFeatureFlags';

// enable the JS-side of the w3c PointerEvent implementation
ReactNativeFeatureFlags.shouldEmitW3CPointerEvents = () => true;

// enable hover events in Pressibility to be backed by the PointerEvent implementation
ReactNativeFeatureFlags.shouldPressibilityUseW3CPointerEventsForHover =
  () => true;
```

### iOS-specific

In order to ensure that the pointer events are sent from the native iOS renderer you’ll need to flip a native feature flag in your native app’s initialization code (typically `AppDelegate.mm`).

```objc
#import <React/RCTConstants.h>

// ...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    RCTSetDispatchW3CPointerEvents(YES);

    // ...
}
```

Note that to ensure that the Pointer Event implementation can distinguish between mouse and touch pointers on iOS you need to add [`UIApplicationSupportsIndirectInputEvents`](https://developer.apple.com/documentation/bundleresources/information_property_list/uiapplicationsupportsindirectinputevents) to your Xcode project’s `info.plist`.

### Android-specific

Similarly to iOS Android has a feature flag that you’ll need to enable in your app’s initialization — typically your `onCreate` for your root React activity or surface.

```java
import com.facebook.react.config.ReactFeatureFlags;

//... somewhere in initialization

@Override
public void onCreate() {
    ReactFeatureFlags.dispatchPointerEvents = true;
}
```

### JavaScript

```js
function onPointerOver(event) {
  console.log(
    'Over blue box offset: ',
    event.nativeEvent.offsetX,
    event.nativeEvent.offsetY,
  );
}

// ... in some component
<View
  onPointerOver={onPointerOver}
  style={{height: 100, width: 100, backgroundColor: 'blue'}}
/>;
```

## Feedback Welcome

Today Pointer Events are used by our VR platform and powering the Oculus Store, but we're also looking for early community feedback on both our approach and what we have for an implementation so far. We are excited to share our further progress with you and if you have questions or thoughts around this work, join us on the [dedicated discussion on Pointer Events](https://github.com/react-native-community/discussions-and-proposals/discussions/557).

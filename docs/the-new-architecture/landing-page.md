---
id: landing-page
title: About the New Architecture
---

In 2018, the React Native team began work to rewrite the internals of React Native to address design limitations that became apparent after years of usage. In 2024, the rewrite has been rolled out and proven at scale across React Native apps at Meta.

The team is now working to make this the default experience for the React Native open source ecosystem. The term _New Architecture_ refers to both the new framework architecture and the work to bring it to open source.

<<<<<<< HEAD
The New Architecture has been available for experimental opt-in as of [React Native 0.68](/blog/2022/03/30/version-068#opting-in-to-the-new-architecture) with continued improvements. The remaining work is to ensure that most React Native libraries work on the New Architecture out-of-the-box or have a straightforward migration path.
=======
The New Architecture has been available for experimental opt-in as of [React Native 0.68](/blog/2022/03/30/version-068#opting-in-to-the-new-architecture) with continued improvements. The remaining work of the rollout is to ensure that the thousands of React Native libraries that developers depend on work out-of-the-box or have a straightforward migration path.

> > > > > > > 92ff2bee (Update to suggestions)

## Why a New Architecture?

Primarily, the New Architecture is an investment in the future of React Native to write polished app experiences. The New Architecture unlocks capabilities and improvements that were not possible in the legacy architecture.

### Synchronous execution

Prior, calling a native module method required passing a [callback](https://reactnative.dev/docs/next/native-modules-ios#callbacks) function to receive any data from native. Synchronous execution simplifies your native interfacing logic to provide a better experience for your app.

Before the New Architecture, you could not synchronously access layout measurements and apply updates in the same render commit. Synchronous layout of your React views eliminates a class of bugs related to layout jumps and race conditions related to invalid layout data.

<details>
<summary>Example: Rendering a ToolTip</summary>

Measuring and placing a tooltip above a view allows us to showcase what synchronous rendering unlocks. The tooltip needs to know the position of its target view to determine where it should render.

In the legacy architecture, you can use `onLayout` to get layout measurements. `onLayout` is a View callback which is called asynchronously after layout calculation. State updates in `onLayout` may also occur in a separate render. This means that you may see intermediate states or visual jumps when trying to adjust layout after measurement.

```js
function ViewWithToolTip() {
  // ...

  // We get the layout information and pass to ToolTip to position itself
  const onLayout = React.useCallback(event => {
    targetRef.current?.measureInWindow((x, y, width, height) => {
      // This state update is not guaranteed to run in the same commit
      // This results in a visual "jump" as the ToolTip repositions itself
      setTargetRect({x, y, width, height});
    });
  }, []);

  return (
    <>
      <View ref={targetRef} onLayout={onLayout}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

With the New Architecture, we can use `useLayoutEffect` to synchronously measure and apply layout updates in a single commit, avoiding the visual "jump".

```js
function ViewWithToolTip() {
  // ...

  React.useLayoutEffect(() => {
    // The measurement and state update for `targetRect` happens in a single commit
    // allowing ToolTip to position itself without intermediate paints
    targetRef.current?.measureInWindow((x, y, width, height) => {
      setTargetRect({x, y, width, height});
    });
  }, [setTargetRect]);

  return (
    <>
      <View ref={targetRef}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

<div className="two-columns-figure">
 <figure>
  <img src="/img/new-architecture/async-on-layout.gif" alt="A view that is moving to the corners of the viewport and center with a tooltip rendered either above or below it. The tooltip is rendered after a short delay after the view moves" />
  <figcaption>Asynchronous measurement and render of the ToolTip. [See code](https://gist.github.com/lunaleaps/eabd653d9864082ac1d3772dac217ab9).</figcaption>
</figure>
<figure>
  <img src="/img/new-architecture/sync-use-layout-effect.gif" alt="A view that is moving to the corners of the viewport and center with a tooltip rendered either above or below it. The view and tooltip move in unison." />
  <figcaption>Synchronous measurement and render of the ToolTip. [See code](https://gist.github.com/lunaleaps/148756563999c83220887757f2e549a3).</figcaption>
</figure>
</div>

</details>

### Support for React 18

The New Architecture ships with React 18 which introduces [concurrent features](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react) that allow application developers to specify priority in UI updates to ensure a responsive user experience where it matters.

Beyond concurrent APIs, React 18 also ships with out-of-the-box improvements like automatic batching to reduce re-renders.

<details>
<summary>Example: Automatic Batching</summary>

With the New Architecture, you'll get automatic batching with the React 18 renderer.

In this example, a slider specifies how many tiles to render. Dragging the slider from 0 to 1000 will fire off a quick succession of state updates and re-renders.

In comparing the renderers for the [same code](https://gist.github.com/lunaleaps/79bb6f263404b12ba57db78e5f6f28b2), you can visually notice the React 18 renderer provides a smoother UI, with less intermediate UI updates. State updates from native event handlers, like this native Slider component, are now batched.

<div className="two-columns-figure">
 <figure>
  <img src="/img/new-architecture/legacy-renderer.gif" alt="" />
  <figcaption>Rendering frequent state updates with legacy renderer.</figcaption>
</figure>
<figure>
  <img src="/img/new-architecture/react18-renderer.gif" alt="afjekaflaej" />
  <figcaption>Rendering frequent state updates with React 18 renderer.</figcaption>
</figure>
</div>
</details>

### Lower overhead for JS and native interoperability

The New Architecture removes the [asynchronous bridge](https://reactnative.dev/blog/2018/06/14/state-of-react-native-2018#architecture) between JavaScript and native and replaces it with JavaScript Interface (JSI). JSI is an interface that allows JavaScript to hold a reference to a C++ object and vice-versa. With a memory reference, you can directly invoke methods without serialization cost.

[VisionCamera](https://github.com/mrousavy/react-native-vision-camera), a popular camera library for React Native, leverages this technology to allow real-time frame processing in JavaScript by exposing frame buffers through JSI.
Typical frame buffers are 10 MB in size, which amounts to roughly 1 GB of data per second, depending on the frame rate. Passing that amount of data through the legacy messaging queue would simply be impossible, whereas with JSI it has almost no overhead at all. JSI can be used to expose other complex instance-based types such as databases, images, audio samples, and more.

Beyond high-volume data processing with JSI, which many libraries have already adopted, JSI adoption in the New Architecture removes this class of serialization work from all native-JavaScript interop. This includes the initialization and re-rendering of native core components like `View` and `Text`. You can read more about our [investigation in rendering performance](https://github.com/reactwg/react-native-new-architecture/discussions/123) in the New Architecture and the improved benchmarks we measured.

### Learn more

To achieve this, the New Architecture had to refactor multiple parts of the React Native infrastructure. To learn more about the refactor and other benefits it brings, check out the [documentation](https://github.com/reactwg/react-native-new-architecture) in the New Architecture working group.

## Benefits of the New Architecture for you

While the New Architecture enables these features and improvements, using the New Architecture in your app or library does not mean guaranteed performance or user experience wins. Data serialization may not have been a bottleneck for your app's performance and certain features may require intentional adoption from your app or third-party dependencies to see benefit.

Overall, enabling the New Architecture in your app or library is opting into the future of React Native as the framework and ecosystem leverage the new capabilities the New Architecture brings.

## Should I use the New Architecture today?

Today, the New Architecture is considered experimental and we continue to refine backwards compatibility for a better adoption experience.

The team plans to enable the New Architecture by default in an upcoming React Native release by the end of 2024. For most React Native developers, we recommend waiting until that release before enabling the New Architecture.

Our guidance is as follows

- For most production apps, we do _not_ recommend enabling the New Architecture at this time. Waiting for the official release will offer the best experience.
- If you maintain a React Native library, we recommend enabling it and verifying your use-cases are covered. You can find the [instructions here](https://github.com/reactwg/react-native-new-architecture/blob/lunaleaps-move-docs-over/README.md#documentation).

Due to the major refactor, certain conventions and APIs are no longer supported in the New Architecture. To improve the adoption experience, the team is currently working with library authors and early adopters to catch these use-cases and provide suitable interop between the legacy and New Architecture.

If you are interested in dogfooding the New Architecture experience, you can find [instructions](https://github.com/reactwg/react-native-new-architecture/blob/lunaleaps-move-docs-over/README.md#documentation) in our dedicated working group. The [New Architecture working group](https://github.com/reactwg/react-native-new-architecture) is a dedicated space for support and coordination for New Architecture adoption and where the team posts regular updates.

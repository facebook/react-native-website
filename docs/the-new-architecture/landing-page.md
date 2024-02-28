---
id: landing-page
title: About the New Architecture
---

Since 2018, the React Native team has been redesigning core internals of React Native in order to enable developers to create higher quality experiences. As of 2024, this version of React Native has been proven at scale and powers production apps by Meta.

The term _New Architecture_ refers to both the new framework architecture and the work to bring it to open source.

The New Architecture has been available for experimental opt-in as of [React Native 0.68](/blog/2022/03/30/version-068#opting-in-to-the-new-architecture) with continued improvements in every subsequent release. The team is now working to make this the default experience for the React Native open source ecosystem.

## Why a New Architecture?

After many years of building with React Native, the team identified a set of limitations that prevented developers from crafting certain experiences with a high polish. These limitations were fundamental to the existing design of the framework, so the New Architecture started as an investment in the future of React Native.

The New Architecture unlocks capabilities and improvements that were not possible in the legacy architecture.

### Synchronous Layout and Effects

Building adaptive UI experiences often requires measuring the size and position of your views and adjusting layout.

Today, you would use the [`onLayout`](/docs/view#onlayout) event to get the layout information of a view and make any adjustments. However, state updates within the `onLayout` callback may be applied after the previous render is painted. This means that users may see intermediate states or visual jumps between rendering the initial layout and responding to layout measurements.

With the New Architecture, we can avoid this issue entirely with synchronous access to layout information and properly scheduled updates such that no intermediate state is visible to users.

<details>
<summary>Example: Rendering a Tooltip</summary>

Measuring and placing a tooltip above a view allows us to showcase what synchronous rendering unlocks. The tooltip needs to know the position of its target view to determine where it should render.

In the current architecture, we use `onLayout` to get the measurements of the view and then update the positioning of the tooltip based on where the view is positioned.

```js
function ViewWithTooltip() {
  // ...

  // We get the layout information and pass to tooltip to position itself
  const onLayout = useCallback(({layout}) => {
    // This state update is not guaranteed to run in the same commit
    // This results in a visual "jump" as the tooltip repositions itself
    setTargetRect(layout);
  }, []);

  return (
    <>
      <View onLayout={onLayout}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

With the New Architecture, we can use [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect) to synchronously measure and apply layout updates in a single commit, avoiding the visual "jump".

```js
function ViewWithTooltip() {
  // ...

  useLayoutEffect(() => {
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

### Support for Concurrent Renderer and Features

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

### Fast JavaScript/Native Interfacing

The New Architecture removes the [asynchronous bridge](https://reactnative.dev/blog/2018/06/14/state-of-react-native-2018#architecture) between JavaScript and native and replaces it with JavaScript Interface (JSI). JSI is an interface that allows JavaScript to hold a reference to a C++ object and vice-versa. With a memory reference, you can directly invoke methods without serialization cost.

JSI enables [VisionCamera](https://github.com/mrousavy/react-native-vision-camera), a popular camera library for React Native, to process frames in real-time. Typical frame buffers are 10 MB in size, which amounts to roughly 1 GB of data per second, depending on the frame rate. In comparison with serialization costs of the bridge, JSI handles that amount of interfacing data with ease. JSI can be used to expose other complex instance-based types such as databases, images, audio samples, and more.

JSI adoption in the New Architecture removes this class of serialization work from all native-JavaScript interop. This includes the initialization and re-rendering of native core components like `View` and `Text`. You can read more about our [investigation in rendering performance](https://github.com/reactwg/react-native-new-architecture/discussions/123) in the New Architecture and the improved benchmarks we measured.

### Learn more

To achieve this, the New Architecture had to refactor multiple parts of the React Native infrastructure. To learn more about the refactor and other benefits it brings, check out the [documentation](https://github.com/reactwg/react-native-new-architecture) in the New Architecture working group.

## What can I expect from enabling the New Architecture?

While the New Architecture enables these features and improvements, enabling the New Architecture for your app or library may not immediately improve the performance or user experience.

Your code has to be refactored to leverage new capabilities like synchronous layout effects and concurrent features. Although JSI will minimize the overhead between JavaScript and native memory, data serialization may not have been a bottleneck for your app's performance.

Overall, enabling the New Architecture in your app or library is opting into the future of React Native as the framework and ecosystem leverage the new capabilities the New Architecture brings.

Some new capabilities that build on New Architecture include:

- [Updating event loop processing model](https://github.com/rubennorte/discussions-and-proposals/blob/proposal-event-loop/proposals/0744-well-defined-event-loop.md)
- [DOM traversal and layout APIs](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0607-dom-traversal-and-layout-apis.md)
- [Layout conformance with web](https://github.com/facebook/yoga/releases/tag/v2.0.0)

## Should I use the New Architecture today?

Today, the New Architecture is considered experimental and we continue to refine backwards compatibility for a better adoption experience.

The team plans to enable the New Architecture by default in an upcoming React Native release by the end of 2024.

Our guidance is as follows

- For most production apps, we do _not_ recommend enabling the New Architecture at this time. Waiting for the official will offer the best experience.
- If you maintain a React Native library, we recommend enabling it and verifying your use-cases are covered. You can find the [instructions here](https://github.com/reactwg/react-native-new-architecture/blob/lunaleaps-move-docs-over/docs/enable-libraries-prerequisites.md).

If you are interested in dogfooding the New Architecture experience, you can find [instructions](https://github.com/reactwg/react-native-new-architecture/blob/lunaleaps-move-docs-over/docs/enable-apps.md) in our dedicated working group. The [New Architecture working group](https://github.com/reactwg/react-native-new-architecture) is a dedicated space for support and coordination for New Architecture adoption and where the team posts regular updates.

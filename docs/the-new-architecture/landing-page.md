---
id: landing-page
title: About the New Architecture
---

In 2018, the React Native team began work to rewrite the internals of React Native to address design limitations that became apparent after years of usage. Today, the rewrite is complete and powering React Native apps at Meta.

The team is now working to these changes to the React Native ecosystem.

The term _New Architecture_ refers to both the new framework architecture and the work to bring it to open source. The New Architecture has been available for experimental opt-in as of [React Native 0.68](/blog/2022/03/30/version-068#opting-in-to-the-new-architecture), with continued improvements since.

## Why a New Architecture?

Primarily, the New Architecture is an investment of the future of React Native to write polished app experiences. The New Architecture unlocks capabilities and improvements that were not possible in the legacy architecture.

### Synchronous execution

Prior, calling a native module method required passing a [callback](https://reactnative.dev/docs/next/native-modules-ios#callbacks) function to receive any data from native. Synchronous execution simplifies your native interfacing logic to provide a better experience for your app.

In particular, synchronous rendering is a huge experience win for the New Architecture. Synchronous layout of your React views eliminates a class of bugs related to layout jumps and race conditions related to invalid layout data. Long-standing bugs with list positions and virtualization can be fixed holistically.

### Support for React 18 concurrent features

The New Architecture brings support for [concurrent features in React](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react) like interruptible rendering to allow for a better user experience, especially when there are frequent UI updates.

The following compares rendering between the legacy and New Architecture in UI where the state of how many tiles to render is frequently updated.

<figure>
  <img src="/blog/assets/hermes-default-android-video.gif" alt="Android TTI Video" />
</figure>

### Lower overhead for JS and native interoperability

The New Architecture removes the use of a serializing message queue between JavaScript and native and replaces it with JavaScript Interface (JSI). JSI is an interface that allows JavaScript to hold a reference to a C++ object and vice-versa. With a memory reference, you can directly invoke methods without serialization cost.

[VisionCamera](https://github.com/mrousavy/react-native-vision-camera), a React Native library, processes video frames in JavaScript in real-time. A typical video frame can be 10MB in size and can amount to 1GB per second depending on the frame rate. Passing that amount of data through the legacy messaging queue would make this experience unusable.

Beyond high-volume data processing, JSI adoption in the New Architecture removes this class of serialization work from all native-JavaScript interop.

### Learn more

To achieve this, the New Architecture had to refactor multiple parts of the React Native infrastructure. To learn more about the refactor and other benefits it brings, check out the documentation in the New Architecture working group.

## Benefits of the New Architecture for you

While the New Architecture enables these features and improvements, using the New Architecture in your app or library does not mean guaranteed performance or user experience wins. Data serialization may not have been a bottleneck for your app's performance and certain features may require intentional adoption from your app or third-party dependencies to see benefit.

Overall, enabling the New Architecture in your app or library is opting into the future of React Native as the framework and ecosystem leverage the new capabilities the New Architecture brings.

## So, should I use the New Architecture today?

Today, the New Architecture is considered experimental and we continue to refine backwards compatibility for a better adoption experience.

The team plans to enable the New Architecture by default in an upcoming React Native release by the end of 2024. For most React Native developers, we recommend upgrading to that release to enable the New Architecture.

Our guidance is as follows

- For most production apps, we do _not_ recommend enabling the New Architecture at this time. Upgrading to the official release will offer the best exeperience.
- If you maintain a React Native library, we recommend enabling it and verifying your use-cases are covered. You can find the [instructions here](TODO).

Due to the major refactor, certain conventions and APIs are no longer supported in the New Architecture. To improve the adoption experience, the team is currently working with library authors and early adopters to catch these use-cases and provide suitable interop between the legacy and New Architecture.

If you are interested in dogfooding the New Architecture experience, you can find [instructions](TODO) in our dedicated working group. The [New Architecture working group](https://github.com/reactwg/react-native-new-architecture) is a dedicated space for support and coordination for New Architecture adoption and where the team posts regular updates.

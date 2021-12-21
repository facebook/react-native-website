---
id: fabric-renderer
title: Fabric Rendering
---

Fabric is React Native's new rendering system. It is designed to improve interoperability with mobile platforms and to unlock new capabilities. Fabric is a conceptual evolution of the render system currently used by React Native. The core principle is to unify more render logic in C++ versus spread across the different [host platforms](glossary#host-platform).

This documentation provides an overview of the [Fabric renderer](glossary#fabric-render) and its concepts. It avoids platform specifics and doesn’t contain any code snippets or pointers. This documentation covers key concepts, motivation and benefits, and an overview of the render pipeline in Fabric in different scenarios.

## Motivations and Benefits of Fabric

The Fabric render architecture was created to unlock better user experiences that weren’t possible with the legacy architecture. Some examples include:

- With improved interoperablity between [host views](glossary#host-view-tree-and-host-view) and React views, Fabric is able to to measure and render React surfaces synchronously. In the legacy architecture, React Native layout was asynchronous which led to a layout “jump” issue when embedding a React Native rendered view in a host platform view.
- With Fabric’s support of multi-priority and synchronous events, the renderer can prioritize certain user interactions to ensure they are handled in a timely manner.
- [Integration with React Suspense](https://reactjs.org/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html) which allows for more intuitive design of data fetching in React apps.
- Enable React [Concurrent Features](https://github.com/reactwg/react-18/discussions/4) on React Native.
- Easier to implement server side rendering for React Native.

Fabric’s architecture also provides benefits in code quality, performance, and extensibility:

- **Type safety:** Fabric uses code generation to ensure type safety across the JS and mobile platforms. The code generation uses JavaScript component declarations as source of truth to generate C++ structs to hold the props. Mis-match between JavaScript and host component props will trigger a build error.
- **Shared C++ core**: Fabric is implemented in C++ and the core is shared among platforms. This increases consistency and makes it easier to adopt React Native on new platforms.
- **Better Host Platform Interoperability**: Synchronous and thread-safe layout calculation improves user experiences when embedding host components into React Native, which means easier integration with host platform frameworks that require synchronous APIs.
- **Improved Performance**: With the new cross-platform implementation of the renderer system, every platform benefits from performance improvements that may have been motivated by limitations of one platform. For example, view flattening was originally a performance solution for Android and is now provided by default on both Android and iOS.
- **Consistency**: The new render system is cross-platform, it is easier to keep consistency among different platforms.
- **Faster Startup**: Host components are lazily initialized by default.
- **Less serialization of data between JS and host platform**: React used to transfer data between JS and host platform as serialized JSON. The new renderer improves the transfer of data by accessing JS values directly using JavaScript Interfaces (JSI).

---
id: threading-model
title: Threading Model
---

> This document refers to the architecture of the new renderer, [Fabric](fabric-renderer), that is in active roll-out.

#### The React Native renderer distributes the work of the [render pipeline](render-pipeline) across multiple threads.

Here we define the threading model and provide some examples to illustrate thread usage of the render pipeline.

The renderer uses three different threads:

- UI (often called main) thread. The only thread that can manipulate host views.
- JavaScript thread. This is where React’s render phase is executed.
- Background thread. Thread dedicated to layout.

Let’s review the supported scenarios of execution for each phase:
[Image: image.png]

- **Render in a Background Thread**: this is the most common scenario where most of the Render pipeline happens on JavaScript and Background thread.

[Image: Case 1.jpg]

- **Render in the UI Thread**: when there is a high priority event on the UI Thread, Fabric is able to execute all the render pipeline synchronously on the UI thread.

[Image: Case 2.jpg]

- **Default or continuous event interruption**: This scenario shows the interruption of the render phase by a low priority event in the UI thread. React and Fabric are able to interrupt the Render phase and merge its state with a low priority event that is executed on the UI thread. In this case the render process continues executing in the background thread.

[Image: Case 4.jpg]

- **Discrete event interruption**: The render phase is interruptible. This scenario shows the interruption of the render phase by a high priority event in the UI thread. React and Fabric are able to interrupt the render phase and merge its state with a high priority event that was executed on the UI thread. The render phase executes synchronously on the UI thread.

[Image: Case 3.jpg]

- **Background thread batches updates from JavaScript: \*\*** \*\*Before background thread dispatches update to UI thread, it checks if a newer update hasn’t come in from JavaScript. This way, Fabric doesn’t render stale state when it knows a newer state is coming it.

[Image: Case 5.jpg]

- **C++ State update: \*\*** \*\*Update originating on UI thread and skips rendering phase. See [Fabric State Updates](rendering#fabric-state-updates) for more details.

[Image: State update.jpg]
Fabric is designed to be thread safe. At a high level thread safety is guaranteed by using immutable data structures in the internals of the framework (actually enforced by C++ “const correctness” feature). This means that every update in React needs to create or clone new objects in Fabric instead of updating data structures. This allows the framework to expose thread safe and synchronous APIs to React.

---
id: rendering
title: Render, Commit, and Mount
---

The render pipeline is the sequence of work for React logic to render to a host platform. The render pipeline can be broken into three general phases:

1. **Render:** React executes product logic which creates a React Element Tree in JavaScript. From this tree, the Fabric Renderer creates a React Shadow Tree in C++.
2. **Commit**: After a React Shadow Tree is fully created, the Fabric Renderer triggers a commit. This **promotes** both the React Element Tree and the newly created React Shadow Tree as the “next tree” to be mounted. This also schedules calculation of its layout information.
3. **Mount:** The React Shadow Tree, now with the results of layout calculation, is transformed into a _Host View Tree_.

The phases of the render pipeline may occur on different threads. Refer to the [Threading Model](rendering-implementation#threading-model) section for more detail.

[Image: Data flow.jpg]
The render pipeline is executed whenever a render needs to happen occurs in three different scenarios:

- [Initial Render](#initial-render)
- [React State Updates](#react-state-updates)
- [Fabric State Updates](#fabric-state-updates)

### Initial Render

Imagine you want to render the following:

```
function MyComponent() {
  return (
    <View>
      <Text>Hello, World</Text>
    </View>
  );
}
// <MyComponent />
```

In the example above, `<MyComponent />` is a _React Element_. React recursively reduces this _React Element_ to a terminal React Host Component by invoking it (or its `render` method if implemented with a JavaScript class) until every _React Element_ cannot be reduced any further. Now you have a _React Element Tree_ of _React Host Components_.

During this process of element reduction, as each _React Element_ is invoked, the _Fabric Renderer_ also synchronously creates a _React Shadow Node._ This happens only for _React Host Components_, not for _React Composite Components_. In the example above, the `<View>` leads to the creation of a `ViewShadowNode` object, and the
`<Text>` leads to the creation of a `TextShadowNode` object. Notably, there is never a _React Shadow Node_ that directly represents `<MyComponent>`.

Whenever React creates a parent-child relationship between two _React Element Nodes_, the _Fabric Renderer_ creates the same relationship between the corresponding _React Shadow Nodes_. This is how the _React Shadow Tree_ is assembled.

**Additional Details**

- The operations (creation of _React Shadow Node_, creation of parent-child relationship between two _React Shadow Nodes_) are synchronous and thread-safe operations that are executed from React (JavaScript) into Fabric (C++), usually on the JavaScript thread.
- The _React Element Tree_ (and its constituent _React Element Nodes_) do not exist indefinitely. It is a temporal representation materialized by “fibers” in React. Each “fiber” that represents a host component stores a C++ pointer to the _React Shadow Node_, made possible by JSI. [Learn more about “fibers” in this document.](https://github.com/acdlite/react-fiber-architecture#what-is-a-fiber)
- The _React Shadow Tree_ is immutable. In order to update any _React Shadow Node_, the renderer creates a new _React Shadow Tree_. However, Fabric provides cloning operations to make state updates more performant (see for more details).

In the example above, the result of the render phase looks like this:
[Image: image.png]
After the _React Shadow Tree_ is complete, _Fabric Renderer_ triggers a commit of the _React Element Tree_.
The commit phase consists of two operations: _Layout Calculation_ and _Tree Promotion_.

- **Layout Calculation:** This operation calculates the position and size of each _React Shadow Node_. In React Native, this involves invoking Yoga to calculate the layout of each _React Shadow Node_. The actual calculation requires each _React Shadow Node_’s styles which originate from a _React Element_ in JavaScript. It also requires the layout constraints of the root of the _React Shadow Tree_, which determines the amount of available space that the resulting nodes can occupy.

[Image: image.png]

- **Tree Promotion (New Tree → Next Tree):** This operation promotes the new _React Shadow Tree_ as the “next tree” to be mounted. This promotion indicates that the new _React Shadow Tree_ has all the information to be mounted and represents the latest state of the _React Element Tree_. The “next tree” mounts on the next “tick” of the UI Thread.

**Additional Details**

- These operations are asynchronously executed on a background thread.
- Majority of layout calculation executes entirely within C++. However, the layout calculation of some components depend on the host platform (e.g. `Text`, `TextInput`, etc.). Size and position of text is specific to each host platform and needs to be calculated on the host platform layer. For this purpose, Yoga invokes a function defined in the host platform to calculate the component’s layout.

The mount phase transforms the _React Shadow Tree_ (which now contains data from layout calculation) into a _Host_ _View Tree_ with rendered pixels on the screen. As a reminder, the _React Element Tree_ looks like this:

```
<View>
  <Text>Hello, World</Text>
</View>
```

At a high level, Fabric creates a corresponding _Host View_ for each _React Shadow Nod\*\*e_ and mounts it on screen. In the example above, Fabric creates an instance of `android.view.ViewGroup` for the `<View>` and `android.widget.TextView` for `<Text>` and populates it with “Hello World”. Similarly for iOS a `UIView` is created with and text is populated with a call to `NSLayoutManager`. Each host view is then configured to use props from its React Shadow Node, and its size and position is configured using the calculated layout information.
[Image: image.png]In more detail, the mounting phase consists of these three steps:

- **Tree Diffing:** This step computes the diff between the “previously rendered tree” and the “next tree” entirely in C++. The result is a list of atomic mutation operations to be performed on host views (e.g. `createView`, `updateView`, `removeView`, `deleteView`, etc). This step is also where the React Shadow Tree is flattened to avoid creating unnecessary host views. See [View Flattening](rendering-implementation#view-flattening) for details about this algorithm.
- **Tree Promotion (Next Tree → Rendered Tree)**: This step atomically promotes the “next tree” to “previously rendered tree” so that the next mount phase computes a diff against the proper tree.
- **View Mounting**: This step applies the atomic mutation operations onto corresponding host views. This step executes in the host platform on UI thread.

**Additional Details**

- The operations are synchronously executed on UI thread. If the commit phase executes on background thread, the mounting phase is scheduled for the next “tick” of UI thread. On the other hand, if the commit phase executes on UI thread, mounting phase executes synchronously on the same thread.
- Scheduling, implementation, and execution of the mounting phase heavily depends on the host platform. For example, Fabric architecture of the mounting layer currently differs between Android and iOS.
- During the initial render, the “previously rendered tree” is empty. As such, the tree diffing step will result in a list of mutation operations that consists only of creating views, setting props, and adding views to each other. Tree diffing becomes more important for performance when processing [React State Updates](#react-state-updates).
- In current production tests, a _React Shadow Tree_ typically consists of about 600-1000 _React Shadow Nodes_ (before view flattening), the trees get reduced to ~200 nodes after view flattening. On iPad or desktop apps, this quantity may increase 10-fold.

### React State Updates

Let’s explore each phase of the render pipeline when the state of a _React Element Tree_ is updated. Let’s say, you’ve rendered the following component in an initial render:

```
function MyComponent() {
  return (
    <View>
      <View style={{backgroundColor: 'red',  height: 20, width: 20}} />
      <View style={{backgroundColor: 'blue', height: 20, width: 20}} />
    </View>
  );
}
```

Applying what was described in the [Initial Render](#initial-render) section, you would expect the following trees to be created:
[Image: image.png]Notice that **Node 3** maps to a host view with a _red background_, and **Node 4** maps to a host view with a _blue background_. Assume that as the result of a state update in JavaScript product logic, the background of the first nested `<View>` changes from `'red'` to `'yellow'`. This is what the new React Element Tree might look:

```
<View>
  <View style={{backgroundColor: 'yellow', height: 20, width: 20}} />
  <View style={{backgroundColor: 'blue',   height: 20, width: 20}} />
</View>
```

**How is this update processed by React Native?**

When a state update occurs, the renderer needs to conceptually update the _React Element Tree_ in order to update the host views that are already mounted. But in order to preserve thread safety, both the _React Element Tree_ as well as the _React Shadow Tree_ must be immutable. This means that instead of simply mutating the current _React Element Tree_ and _React Shadow Tree_, React must create a new copy of each tree which incorporates the new props, styles, and children.

Let’s explore each phase of the render pipeline during a state update.
When React creates a new _React Element Tree_ that incorporates the new state, it must clone every _React Element_ and _React Shadow Node_ that is impacted by the change. After cloning, the new _React Shadow Tree_ is committed.

Fabric leverages structural sharing to minimize the overhead of immutability. When a _React Element_ is cloned to include the new state, every _React Element_ that is on the path up to the root is cloned. **React will only clone a React Element if it requires an update to its props, style, or children.** Any _React Elements_ that are unchanged by the state update are shared by the old and new trees.

In the above example, React creates the new tree using these operations:

- CloneNode(**Node 3**, {backgroundColor: 'yellow'}) → **Node 3'**
- CloneNode(**Node 2**) → **Node 2'**
- AppendChild(**Node 2'**, **Node 3'**)
- AppendChild(**Node 2'**, **Node 4**)
- CloneNode(**Node 1**) → **Node 1'**
- AppendChild(**Node 1'**, **Node 2'**)

After these operations, **Node 1'** represents the root of the new _React Element Tree_. Let's assign **T** to the “previously rendered tree” and **T'** to the “new tree”:
[Image: image.png]Notice how **T** and **T'** both share **Node 4**. Structural sharing improves performance and reduces memory usage.
After React creates the new _React Element Tree_ and _React Shadow Tree_, it must commit them.

- **Layout Calculation:** Similar to Layout Calculation during [Initial Render](#initial-render). One important difference is that layout calculation may cause shared _React Shadow Nodes_ to be cloned. This can happen because if the parent of a shared _React Shadow Node_ incurs a layout change, the layout of the shared _React Shadow Node_ may also change.
- **Tree Promotion (New Tree → Next Tree):** Similar to Tree Promotion during [Initial Render](#initial-render).

- **Tree Diffing:** This step computes the diff between the “previously rendered tree” (**T**) and the “next tree” (**T'**). The result is a list of atomic mutation operations to be performed on host \*\* views.
  - In the above example, the operations consist of: UpdateView(**Node 3'**, {backgroundColor: '“yellow“})
  - [The differ can be found in Differentiator.cpp](https://fburl.com/code/3mdagy93)
- **Tree Promotion (Next Tree → Rendered Tree)**: This step atomically promotes the “next tree” to “previously rendered tree” so that the next mount phase computes a diff against the proper tree.
  Diffing can diff any currently mounted tree with any new tree (the renderer can skip some intermediate versions of the tree).
- **View Mounting**: This step applies the atomic mutation operations onto corresponding host views. In the above example, only the `backgroundColor` of **View 3** will be updated (to yellow).

[Image: image.png]

### Fabric State Updates

For most information in the _Shadow Tree_, React is the single owner and single source of truth. All data originates from React and there is a single-direction flow of data.

However, there is one exception and important mechanism: components in C++ can contain state that is not directly exposed to JavaScript, and JavaScript is not the source of truth. C++ and _Host Platform_ control this _C++ State_. Generally, this is only relevant if you are developing a complicated _Host Component_ that needs _C++ State_. The vast majority of Host Components do not need this functionality.

For example, `ScrollView` uses this mechanism to let Fabric know what’s the current offset. The update is triggered from the host platform, specifically from the host view that represents the `ScrollView` component. The information about offset is used in an API like [measure](https://reactnative.dev/docs/direct-manipulation#measurecallback). Since this update stems from the host platform, and does not affect the React Element Tree, this state data is held by _C++ State_.

Conceptually, _C++ State_ updates are similar to the React updates described above, with two important differences: (1) they skip the “render phase” since React is not involved, and (2) these updates can originate and happen on any thread, including the main thread.
When performing a _C++ State_ update, a block of code requests an update of a `ShadowNode` (**N**) to set _C++ State_ to value **S**. Fabric will repeatedly attempt to get the latest committed version of **N**, clone it with a new state **S**, and commit **N’** to the tree. If React, or another _C++ State_ update, has performed another commit during this time, the _C++ State_ commit will fail and the renderer will retry the _C++ State_ update many times until a commit succeeds. This prevents source-of-truth collisions and races.

- **Layout Calculation:** Similar to [Layout Calculation during React State Updates](#react-state-updates).
- **Tree Promotion (New Tree → Next Tree):** Similar to [Tree Promotion during Initial Render](#initial-render).

The _Mount Phase_ is practically identical to the [Mount Phase of React State Updates](#react-state-updates). The renderer still needs to recompute layout perform a tree diff, etc. See above sections for details.

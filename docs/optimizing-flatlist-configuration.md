---
id: optimizing-flatlist-configuration
title: Optimizing Flatlist Configuration
---

## Terms

- **VirtualizedList:** The component behind `FlatList` (React Native's implementation of the '[Virtual List](https://bvaughn.github.io/react-virtualized/#/components/List)' concept.)

- **Memory consumption:** How much information about your list is being stored in memory, which could lead to a app crash.

- **Responsiveness:** Application ability to respond to interactions. Low responsiveness, for instance, is when you touch on a component and it waits a bit to respond, instead of responding immediately as expected.

- **Blank areas:** When `VirtualizedList` couldn't render your items fast enough, you enter on a part of your list with non rendered components.

- **Window:** The viewport (the area size in which items should be rendered).

## Props

Here are a list of props that can help to improve the `FlatList`:

### removeClippedSubviews

| Type    | Default Value |
| ------- | ------------- |
| Boolean | False         |

If `true`, unmount components that are off of the window.

**Pros:** This is very memory friendly, as you will always have a little amount of rendered items instead of the whole list.

**Cons:** Be aware that this implementation can have bugs, such as missing content (mainly observed on iOS) if you use it on a component that will not unmount (such as a root navigation scene). It also can be less performant, having choppy scroll animations for big lists with complex items on old devices, as it makes complicated calculations per scroll.

### maxToRenderPerBatch

| Type   | Default Value |
| ------ | ------------- |
| Number | 10            |

It is a `VirtualizedList` prop that can be passed directly to `FlatList`. Control the amount of items rendered per batch, which is the next chunk of items rendered on every scroll.

**Pros:** Setting a bigger number means less visual blank areas when scrolling (a better the fill rate).

**Cons:** More items per batch means less javascript performance, which means less responsiveness (clicking a item and opening the detail). If you have a static and non-interactive list, this could be the way to go.

### updateCellsBatchingPeriod

| Type   | Default Value |
| ------ | ------------- |
| Number | 50            |

While `maxToRenderPerBatch` tells the amount of items rendered per batch, setting `updateCellsBatchingPeriod` tells to your `VirtualizedList` the delay in milliseconds between batch renders (how frequently your component will be rendering the windowed items).

**Pros:** Combining this prop with `maxToRenderPerBatch` gives you the power to, for example, render more items in a less frequent batch, or less items in a more frequent batch.

**Cons:** Less frequent batches may cause blank areas, More frequent batches may cause responsiveness and performance loss.

### initialNumToRender

| Type   | Default Value |
| ------ | ------------- |
| Number | 10            |

The initial amount of items to render.

**Pros:** Define precise number of items that would cover the screen for every device. This can be a big performance boost when rendering the list component.

**Cons:** Setting a low `initialNumToRender` may cause to see blank areas.

### windowSize

| Type   | Default Value |
| ------ | ------------- |
| Number | 21            |

The number passed here is a measurement unit where 1 is equivalent to your viewport height. The default value is 21 (10 viewports above, 10 below, and one in between).

**Pros:** Bigger `windowSize` will result in less blank space while scrolling (more performance). On the other hand, Smaller `windowSize` will result in to render smaller list (less memory consumption).

**Cons:** For a bigger `windowSize`, you will have a bigger memory consumption. For a lower `windowSize`, you will have lower performance and bigger chance of seeing blank areas.

### legacyImplementation

| Type    | Default Value |
| ------- | ------------- |
| Boolean | False         |

Make `FlatList` rely on the older `ListView` instead of `VirtualizedList`.

**Pros:** This will make your list definitely perform better, as it removes virtualization and render all your items at once.

**Cons:** Extra memory consumption and more app crash risk in large lists (100+) with complex items. It also warns that the above tweaks will not work because now it is using `ListView`.

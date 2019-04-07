---
id: version-0.45-virtualizedlist
title: VirtualizedList
original_id: virtualizedlist
---

Base implementation for the more convenient [`<FlatList>`](flatlist.md) and [`<SectionList>`](sectionlist.md) components, which are also better documented. In general, this should only really be used if you need more flexibility than `FlatList` provides, e.g. for use with immutable data instead of plain arrays.

Virtualization massively improves memory consumption and performance of large lists by maintaining a finite render window of active items and replacing all items outside of the render window with appropriately sized blank space. The window adapts to scrolling behavior, and items are rendered incrementally with low-pri (after any running interactions) if they are far from the visible area, or with hi-pri otherwise to minimize the potential of seeing blank space.

Some caveats:

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- This is a `PureComponent` which means that it will not re-render if `props` remain shallow-equal. Make sure that everything your `renderItem` function depends on is passed as a prop (e.g. `extraData`) that is not `===` after updates, otherwise your UI may not update on changes. This includes the `data` prop and parent component state.
- In order to constrain memory and enable smooth scrolling, content is rendered asynchronously offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see blank content. This is a tradeoff that can be adjusted to suit the needs of each application, and we are working on improving it behind the scenes.
- By default, the list looks for a `key` prop on each item and uses that for the React key. Alternatively, you can provide a custom `keyExtractor` prop.

### Props

- [`maxToRenderPerBatch`](virtualizedlist.md#maxtorenderperbatch)
- [`windowSize`](virtualizedlist.md#windowsize)
- [`updateCellsBatchingPeriod`](virtualizedlist.md#updatecellsbatchingperiod)
- [`renderScrollComponent`](virtualizedlist.md#renderscrollcomponent)
- [`renderItem`](virtualizedlist.md#renderitem)
- [`disableVirtualization`](virtualizedlist.md#disablevirtualization)
- [`keyExtractor`](virtualizedlist.md#keyextractor)
- [`getItem`](virtualizedlist.md#getitem)
- [`getItemCount`](virtualizedlist.md#getitemcount)
- [`initialNumToRender`](virtualizedlist.md#initialnumtorender)
- [`onViewableItemsChanged`](virtualizedlist.md#onviewableitemschanged)
- [`horizontal`](virtualizedlist.md#horizontal)
- [`initialScrollIndex`](virtualizedlist.md#initialscrollindex)
- [`extraData`](virtualizedlist.md#extradata)
- [`ListFooterComponent`](virtualizedlist.md#listfootercomponent)
- [`onEndReached`](virtualizedlist.md#onendreached)
- [`onEndReachedThreshold`](virtualizedlist.md#onendreachedthreshold)
- [`onLayout`](virtualizedlist.md#onlayout)
- [`onRefresh`](virtualizedlist.md#onrefresh)
- [`getItemLayout`](virtualizedlist.md#getitemlayout)
- [`refreshing`](virtualizedlist.md#refreshing)
- [`removeClippedSubviews`](virtualizedlist.md#removeclippedsubviews)
- [`debug`](virtualizedlist.md#debug)
- [`data`](virtualizedlist.md#data)
- [`scrollEventThrottle`](virtualizedlist.md#scrolleventthrottle)
- [`ListHeaderComponent`](virtualizedlist.md#listheadercomponent)
- [`viewabilityConfig`](virtualizedlist.md#viewabilityconfig)
- [`ListEmptyComponent`](virtualizedlist.md#listemptycomponent)

### Methods

- [`scrollToEnd`](virtualizedlist.md#scrolltoend)
- [`scrollToIndex`](virtualizedlist.md#scrolltoindex)
- [`scrollToItem`](virtualizedlist.md#scrolltoitem)
- [`scrollToOffset`](virtualizedlist.md#scrolltooffset)
- [`recordInteraction`](virtualizedlist.md#recordinteraction)

### Type Definitions

- [`Props`](virtualizedlist.md#props)

---

# Reference

## Props

### `maxToRenderPerBatch`

The maximum number of items to render in each incremental render batch. The more rendered at once, the better the fill rate, but responsiveness my suffer because rendering content may interfere with responding to button taps or other interactions.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `windowSize`

Determines the maximum number of items rendered outside of the visible area, in units of visible lengths. So if your list fills the screen, then `windowSize={21}` (the default) will render the visible screen area plus up to 10 screens above and 10 below the viewport. Reducing this number will reduce memory consumption and may improve performance, but will increase the chance that fast scrolling may reveal momentary blank areas of unrendered content.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `updateCellsBatchingPeriod`

Amount of time between low-pri item render batches, e.g. for rendering items quite a ways off screen. Similar fill rate/responsiveness tradeoff as `maxToRenderPerBatch`.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `renderScrollComponent`

Render a custom scroll component, e.g. with a differently styled `RefreshControl`.

| Type                                  | Required |
| ------------------------------------- | -------- |
| (props: Object) => React.Element<any> | Yes      |

---

### `renderItem`

| Type                               | Required |
| ---------------------------------- | -------- |
| (info: any) => ?React.Element<any> | Yes      |

---

### `disableVirtualization`

DEPRECATED: Virtualization provides significant performance and memory optimizations, but fully unmounts react instances that are outside of the render window. You should only need to disable this for debugging purposes.

| Type    | Required |
| ------- | -------- |
| boolean | Yes      |

---

### `keyExtractor`

| Type                                  | Required |
| ------------------------------------- | -------- |
| (item: Item, index: number) => string | Yes      |

---

### `getItem`

A generic accessor for extracting an item from any sort of data blob.

| Type                                | Required |
| ----------------------------------- | -------- |
| (data: any, index: number) => ?Item | Yes      |

---

### `getItemCount`

Determines how many items are in the data blob.

| Type                  | Required |
| --------------------- | -------- |
| (data: any) => number | Yes      |

---

### `initialNumToRender`

How many items to render in the initial batch. This should be enough to fill the screen but not much more. Note these items will never be unmounted as part of the windowed rendering in order to improve perceived performance of scroll-to-top actions.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `onViewableItemsChanged`

Called when the viewability of rows changes, as defined by the `viewabilityConfig` prop.

| Type | Required |
| ---- | -------- |


| [(info: { viewableItems: Array<ViewToken>, changed: Array<ViewToken>, }) => void] | No |

---

### `horizontal`

| Type      | Required |
| --------- | -------- |
| [boolean] | No       |

---

### `initialScrollIndex`

Instead of starting at the top with the first item, start at `initialScrollIndex`. This disables the "scroll to top" optimization that keeps the first `initialNumToRender` items always rendered and immediately renders the items starting at this initial index. Requires `getItemLayout` to be implemented.

| Type     | Required |
| -------- | -------- |
| [number] | No       |

---

### `extraData`

A marker property for telling the list to re-render (since it implements `PureComponent`). If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop, stick it here and treat it immutably.

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### `ListFooterComponent`

Rendered at the bottom of all the items. Can be a React Component Class, a render function, or a rendered element.

| Type                                    | Required |
| --------------------------------------- | -------- |
| [ReactClass<any> ‖ ,React.Element<any>] | No       |

---

### `onEndReached`

| Type                                        | Required |
| ------------------------------------------- | -------- |
| [(info: {distanceFromEnd: number}) => void] | No       |

---

### `onEndReachedThreshold`

| Type     | Required |
| -------- | -------- |
| [number] | No       |

---

### `onLayout`

| Type       | Required |
| ---------- | -------- |
| [Function] | No       |

---

### `onRefresh`

If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the `refreshing` prop correctly.

| Type       | Required |
| ---------- | -------- |
| [Function] | No       |

---

### `getItemLayout`

| Type | Required |
| ---- | -------- |


| (data: any, index: number) => {length: number, offset: number, index: number} | No |

---

### `refreshing`

Set this true while waiting for new data from a refresh.

| Type      | Required |
| --------- | -------- |
| [boolean] | No       |

---

### `removeClippedSubviews`

Note: may have bugs (missing content) in some circumstances - use at your own risk.

This may improve scroll performance for large lists.

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### `debug`

`debug` will turn on extra logging and visual overlays to aid with debugging both usage and implementation, but with a significant perf hit.

| Type      | Required |
| --------- | -------- |
| [boolean] | No       |

---

### `data`

The default accessor functions assume this is an Array<{key: string}> but you can override getItem, getItemCount, and keyExtractor to handle any type of index-based data.

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### `scrollEventThrottle`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `ListHeaderComponent`

Rendered at the top of all the items. Can be a React Component Class, a render function, or a rendered element.

| Type                                    | Required |
| --------------------------------------- | -------- |
| [ReactClass<any> ‖ ,React.Element<any>] | No       |

---

### `viewabilityConfig`

| Type              | Required |
| ----------------- | -------- |
| ViewabilityConfig | No       |

---

### `ListEmptyComponent`

Rendered when the list is empty. Can be a React Component Class, a render function, or a rendered element.

| Type                                    | Required |
| --------------------------------------- | -------- |
| [ReactClass<any> ‖ ,React.Element<any>] | No       |

## Methods

### `scrollToEnd()`

```javascript
scrollToEnd(([params]: object));
```

---

### `scrollToIndex()`

```javascript
scrollToIndex((params: object));
```

---

### `scrollToItem()`

```javascript
scrollToItem((params: object));
```

---

### `scrollToOffset()`

```javascript
scrollToOffset((params: object));
```

---

### `recordInteraction()`

```javascript
recordInteraction();
```

## Type Definitions

### Props

| Type                       |
| -------------------------- |
| IntersectionTypeAnnotation |

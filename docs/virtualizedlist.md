---
id: virtualizedlist
title: VirtualizedList
---

Base implementation for the more convenient [`<FlatList>`](flatlist.md) and
[`<SectionList>`](sectionlist.md) components, which are also better documented.
In general, this should only really be used if you need more flexibility than
`FlatList` provides, e.g. for use with immutable data instead of plain arrays.

Virtualization massively improves memory consumption and performance of large
lists by maintaining a finite render window of active items and replacing all
items outside of the render window with appropriately sized blank space. The
window adapts to scrolling behavior, and items are rendered incrementally with
low-pri (after any running interactions) if they are far from the visible area,
or with hi-pri otherwise to minimize the potential of seeing blank space.

Some caveats:

* Internal state is not preserved when content scrolls out of the render window.
  Make sure all your data is captured in the item data or external stores like
  Flux, Redux, or Relay.
* This is a `PureComponent` which means that it will not re-render if `props`
  remain shallow- equal. Make sure that everything your `renderItem` function
  depends on is passed as a prop (e.g. `extraData`) that is not `===` after
  updates, otherwise your UI may not update on changes. This includes the `data`
  prop and parent component state.
* In order to constrain memory and enable smooth scrolling, content is rendered
  asynchronously offscreen. This means it's possible to scroll faster than the
  fill rate ands momentarily see blank content. This is a tradeoff that can be
  adjusted to suit the needs of each application, and we are working on
  improving it behind the scenes.
* By default, the list looks for a `key` prop on each item and uses that for the
  React key. Alternatively, you can provide a custom `keyExtractor` prop.

### Props

* [`last`](virtualizedlist.md#last)
* [`first`](virtualizedlist.md#first)
* [`horizontal`](virtualizedlist.md#horizontal)
* [`initialNumToRender`](virtualizedlist.md#initialnumtorender)
* [`keyExtractor`](virtualizedlist.md#keyextractor)
* [`disableVirtualization`](virtualizedlist.md#disablevirtualization)
* [`maxToRenderPerBatch`](virtualizedlist.md#maxtorenderperbatch)
* [`onEndReachedThreshold`](virtualizedlist.md#onendreachedthreshold)
* [`scrollEventThrottle`](virtualizedlist.md#scrolleventthrottle)
* [`updateCellsBatchingPeriod`](virtualizedlist.md#updatecellsbatchingperiod)
* [`windowSize`](virtualizedlist.md#windowsize)

### Methods

* [`scrollToEnd`](virtualizedlist.md#scrolltoend)
* [`scrollToIndex`](virtualizedlist.md#scrolltoindex)
* [`scrollToItem`](virtualizedlist.md#scrolltoitem)
* [`scrollToOffset`](virtualizedlist.md#scrolltooffset)
* [`recordInteraction`](virtualizedlist.md#recordinteraction)
* [`flashScrollIndicators`](virtualizedlist.md#flashscrollindicators)

### Type Definitions

* [`renderItemType`](virtualizedlist.md#renderitemtype)

---

# Reference

## Props

### `last`

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `first`

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `horizontal`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `initialNumToRender`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `keyExtractor`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `disableVirtualization`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `maxToRenderPerBatch`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `onEndReachedThreshold`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `scrollEventThrottle`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `updateCellsBatchingPeriod`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `windowSize`

| Type | Required |
| ---- | -------- |
|      | No       |

## Methods

### `scrollToEnd()`

```javascript
scrollToEnd([params]);
```

Scrolls to the end of the content. May be janky without `getItemLayout` prop.

**Parameters:**

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| params | object | No       | See below.  |

Valid `params` keys are:

* 'animated' (boolean) - Whether the list should do an animation while
  scrolling. Defaults to `true`.

---

### `scrollToIndex()`

```javascript
scrollToIndex(params);
```

**Parameters:**

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| params | object | Yes      | See below.  |

Valid `params` keys are:

* 'animated' (boolean) - Whether the list should do an animation while
  scrolling. Defaults to `true`.
* 'index' (number) - The index to scroll to. Required.
* 'viewOffset' (number) - A fixed number of pixels to offset the final target
  position. Required.
* 'viewPosition' (number) - A value of `0` places the item specified by index at
  the top, `1` at the bottom, and `0.5` centered in the middle.

---

### `scrollToItem()`

```javascript
scrollToItem(params);
```

Requires linear scan through data - use `scrollToIndex` instead if possible.

> Note: Cannot scroll to locations outside the render window without specifying
> the `getItemLayout` prop.

**Parameters:**

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| params | object | Yes      | See below.  |

Valid `params` keys are:

* 'animated' (boolean) - Whether the list should do an animation while
  scrolling. Defaults to `true`.
* 'item' (object) - The item to scroll to. Required.
* 'viewPosition' (number)

---

### `scrollToOffset()`

```javascript
scrollToOffset(params);
```

Scroll to a specific content pixel offset in the list.

**Parameters:**

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| params | object | Yes      | See below.  |

Valid `params` keys are:

* 'offset' (number) - The offset to scroll to. In case of `horizontal` being
  true, the offset is the x-value, in any other case the offset is the y-value.
  Required.
* 'animated' (boolean) - Whether the list should do an animation while
  scrolling. Defaults to `true`.

---

### `recordInteraction()`

```javascript
recordInteraction();
```

---

### `flashScrollIndicators()`

```javascript
flashScrollIndicators();
```

## Type Definitions

### renderItemType

A `renderItem` function that takes an object and returns a React element.

| Type     |
| -------- |
| function |

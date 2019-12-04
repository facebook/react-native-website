---
id: version-0.44-sectionlist
title: SectionList
original_id: sectionlist
---

A performant interface for rendering sectioned lists, supporting the most handy features:

- Fully cross-platform.
- Configurable viewability callbacks.
- List header support.
- List footer support.
- Item separator support.
- Section header support.
- Section separator support.
- Heterogeneous data and item rendering support.
- Pull to Refresh.
- Scroll loading.

If you don't need section support and want a simpler interface, use [`<FlatList>`](flatlist.md).

If you need _sticky_ section header support, use `ListView` for now.

Examples:

    <SectionList
      renderItem={({item}) => <ListItem title={item.title}}
      renderSectionHeader={({section}) => <H1 title={section.key} />}
      sections={[ // homogenous rendering between sections
        {data: [...], key: ...},
        {data: [...], key: ...},
        {data: [...], key: ...},
      ]}
    />

    <SectionList
      sections={[ // heterogeneous rendering between sections
        {data: [...], key: ..., renderItem: ...},
        {data: [...], key: ..., renderItem: ...},
        {data: [...], key: ..., renderItem: ...},
      ]}
    />

This is a convenience wrapper around [`<VirtualizedList>`](virtualizedlist.md), and thus inherits the following caveats:

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- This is a `PureComponent` which means that it will not re-render if `props` remain shallow-equal. Make sure that everything your `renderItem` function depends on is passed as a prop that is not `===` after updates, otherwise your UI may not update on changes. This includes the `data` prop and parent component state.
- In order to constrain memory and enable smooth scrolling, content is rendered asynchronously offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see blank content. This is a tradeoff that can be adjusted to suit the needs of each application, and we are working on improving it behind the scenes.
- By default, the list looks for a `key` prop on each item and uses that for the React key. Alternatively, you can provide a custom `keyExtractor` prop.

### Props

- [`initialNumToRender`](sectionlist.md#initialnumtorender)
- [`keyExtractor`](sectionlist.md#keyextractor)
- [`renderItem`](sectionlist.md#renderitem)
- [`sections`](sectionlist.md#sections)
- [`onEndReachedThreshold`](sectionlist.md#onendreachedthreshold)
- [`ItemSeparatorComponent`](sectionlist.md#itemseparatorcomponent)
- [`ListHeaderComponent`](sectionlist.md#listheadercomponent)
- [`onEndReached`](sectionlist.md#onendreached)
- [`ListFooterComponent`](sectionlist.md#listfootercomponent)
- [`onRefresh`](sectionlist.md#onrefresh)
- [`onViewableItemsChanged`](sectionlist.md#onviewableitemschanged)
- [`refreshing`](sectionlist.md#refreshing)
- [`SectionSeparatorComponent`](sectionlist.md#sectionseparatorcomponent)
- [`renderSectionHeader`](sectionlist.md#rendersectionheader)
- [`extraData`](sectionlist.md#extradata)
- [`stickySectionHeadersEnabled`](sectionlist.md#stickysectionheadersenabled)

---

# Reference

## Props

### `initialNumToRender`

How many items to render in the initial batch. This should be enough to fill the screen but not much more. Note these items will never be unmounted as part of the windowed rendering in order to improve perceived performance of scroll-to-top actions.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `keyExtractor`

Used to extract a unique key for a given item at the specified index. Key is used for caching and as the react key to track item re-ordering. The default extractor checks `item.key`, then falls back to using the index, like react does.

| Type                                  | Required |
| ------------------------------------- | -------- |
| (item: Item, index: number) => string | Yes      |

---

### `renderItem`

Default renderer for every item in every section. Can be over-ridden on a per-section basis.

| Type                                                       | Required |
| ---------------------------------------------------------- | -------- |
| (info: {item: Item, index: number}) => ?React.Element<any> | Yes      |

---

### `sections`

| Type            | Required |
| --------------- | -------- |
| Array<SectionT> | Yes      |

---

### `onEndReachedThreshold`

How far from the end (in units of visible length of the list) the bottom edge of the list must be from the end of the content to trigger the `onEndReached` callback. Thus a value of 0.5 will trigger `onEndReached` when the end of the content is within half the visible length of the list.

| Type     | Required |
| -------- | -------- |
| [number] | No       |

---

### `ItemSeparatorComponent`

Rendered in between adjacent Items within each section.

| Type              | Required |
| ----------------- | -------- |
| [ReactClass<any>] | No       |

---

### `ListHeaderComponent`

Rendered at the very beginning of the list.

| Type              | Required |
| ----------------- | -------- |
| [ReactClass<any>] | No       |

---

### `onEndReached`

Called once when the scroll position gets within `onEndReachedThreshold` of the rendered content.

| Type                                        | Required |
| ------------------------------------------- | -------- |
| [(info: {distanceFromEnd: number}) => void] | No       |

---

### `ListFooterComponent`

Rendered at the very end of the list.

| Type              | Required |
| ----------------- | -------- |
| [ReactClass<any>] | No       |

---

### `onRefresh`

If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the `refreshing` prop correctly.

| Type         | Required |
| ------------ | -------- |
| [() => void] | No       |

---

### `onViewableItemsChanged`

Called when the viewability of rows changes, as defined by the `viewabilityConfig` prop.

| Type | Required |
| ---- | -------- |


| [(info: { viewableItems: Array<ViewToken>, changed: Array<ViewToken>, }) => void] | No |

---

### `refreshing`

Set this true while waiting for new data from a refresh.

| Type      | Required |
| --------- | -------- |
| [boolean] | No       |

---

### `SectionSeparatorComponent`

Rendered in between each section.

| Type              | Required |
| ----------------- | -------- |
| [ReactClass<any>] | No       |

---

### `renderSectionHeader`

Rendered at the top of each section. Sticky headers are not yet supported.

| Type                                                 | Required |
| ---------------------------------------------------- | -------- |
| [(info: {section: SectionT}) => ?React.Element<any>] | No       |

---

### `extraData`

A marker property for telling the list to re-render (since it implements `PureComponent`). If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop, stick it here and treat it immutably.

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### `stickySectionHeadersEnabled`

Makes section headers stick to the top of the screen until the next one pushes it off. Only enabled by default on iOS because that is the platform standard there.

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---
id: version-0.44-flatlist
title: FlatList
original_id: flatlist
---

A performant interface for rendering simple, flat lists, supporting the most handy features:

- Fully cross-platform.
- Optional horizontal mode.
- Configurable viewability callbacks.
- Header support.
- Footer support.
- Separator support.
- Pull to Refresh.
- Scroll loading.
- ScrollToIndex support.

If you need section support, use [`<SectionList>`](sectionlist.md).

Minimal Example:

    <FlatList
      data={[{key: 'a'}, {key: 'b'}]}
      renderItem={({item}) => <Text>{item.key}</Text>}
    />

More complex example demonstrating `PureComponent` usage for perf optimization and avoiding bugs.

- By binding the `onPressItem` handler, the props will remain `===` and `PureComponent` will prevent wasteful re-renders unless the actual `id`, `selected`, or `title` props change, even if the inner `SomeOtherWidget` has no such optimizations.
- By passing `extraData={this.state}` to `FlatList` we make sure `FlatList` itself will re-render when the `state.selected` changes. Without setting this prop, `FlatList` would not know it needs to re-render any items because it is also a `PureComponent` and the prop comparison will not show any changes.
- `keyExtractor` tells the list to use the `id`s for the react keys.


    class MyListItem extends React.PureComponent {
      _onPress = () => {
        this.props.onPressItem(this.props.id);
      };

      render() {
        return (
          <SomeOtherWidget
            {...this.props}
            onPress={this._onPress}
          />
        )
      }
    }

    class MyList extends React.PureComponent {
      state = {selected: (new Map(): Map<string, boolean>)};

      _keyExtractor = (item, index) => item.id;

      _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
          // copy the map rather than modifying state.
          const selected = new Map(state.selected);
          selected.set(id, !state.get(id)); // toggle
          return {selected};
        });
      };

      _renderItem = ({item}) => (
        <MyListItem
          id={item.id}
          onPressItem={this._onPressItem}
          selected={!!this.state.selected.get(item.id)}
          title={item.title}
        />
      );

      render() {
        return (
          <FlatList
            data={this.props.data}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        );
      }
    }

This is a convenience wrapper around [`<VirtualizedList>`](virtualizedlist.md), and thus inherits it's props that aren't explicitly listed here along with the following caveats:

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- This is a `PureComponent` which means that it will not re-render if `props` remain shallow-equal. Make sure that everything your `renderItem` function depends on is passed as a prop that is not `===` after updates, otherwise your UI may not update on changes. This includes the `data` prop and parent component state.
- In order to constrain memory and enable smooth scrolling, content is rendered asynchronously offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see blank content. This is a tradeoff that can be adjusted to suit the needs of each application, and we are working on improving it behind the scenes.
- By default, the list looks for a `key` prop on each item and uses that for the React key. Alternatively, you can provide a custom `keyExtractor` prop.

### Props

- [`initialNumToRender`](flatlist.md#initialnumtorender)
- [`data`](flatlist.md#data)
- [`keyExtractor`](flatlist.md#keyextractor)
- [`numColumns`](flatlist.md#numcolumns)
- [`renderItem`](flatlist.md#renderitem)
- [`extraData`](flatlist.md#extradata)
- [`getItem`](flatlist.md#getitem)
- [`getItemCount`](flatlist.md#getitemcount)
- [`getItemLayout`](flatlist.md#getitemlayout)
- [`horizontal`](flatlist.md#horizontal)
- [`ListFooterComponent`](flatlist.md#listfootercomponent)
- [`ListHeaderComponent`](flatlist.md#listheadercomponent)
- [`legacyImplementation`](flatlist.md#legacyimplementation)
- [`columnWrapperStyle`](flatlist.md#columnwrapperstyle)
- [`onEndReached`](flatlist.md#onendreached)
- [`onEndReachedThreshold`](flatlist.md#onendreachedthreshold)
- [`onRefresh`](flatlist.md#onrefresh)
- [`onViewableItemsChanged`](flatlist.md#onviewableitemschanged)
- [`refreshing`](flatlist.md#refreshing)
- [`ItemSeparatorComponent`](flatlist.md#itemseparatorcomponent)
- [`viewabilityConfig`](flatlist.md#viewabilityconfig)

### Methods

- [`scrollToEnd`](flatlist.md#scrolltoend)
- [`scrollToIndex`](flatlist.md#scrolltoindex)
- [`scrollToItem`](flatlist.md#scrolltoitem)
- [`scrollToOffset`](flatlist.md#scrolltooffset)
- [`recordInteraction`](flatlist.md#recordinteraction)

---

# Reference

## Props

### `initialNumToRender`

How many items to render in the initial batch. This should be enough to fill the screen but not much more. Note these items will never be unmounted as part of the windowed rendering in order to improve perceived performance of scroll-to-top actions.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `data`

For simplicity, data is just a plain array. If you want to use something else, like an immutable list, use the underlying `VirtualizedList` directly.

| Type           | Required |
| -------------- | -------- |
| [Array<ItemT>] | Yes      |

---

### `keyExtractor`

Used to extract a unique key for a given item at the specified index. Key is used for caching and as the react key to track item re-ordering. The default extractor checks `item.key`, then falls back to using the index, like React does.

| Type                                   | Required |
| -------------------------------------- | -------- |
| (item: ItemT, index: number) => string | Yes      |

---

### `numColumns`

Multiple columns can only be rendered with `horizontal={false}` and will zig-zag like a `flexWrap` layout. Items should all be the same height - masonry layouts are not supported.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `renderItem`

Takes an item from `data` and renders it into the list. Typical usage:

    _renderItem = ({item}) => (
      <TouchableOpacity onPress={() => this._onPress(item)}>
        <Text>{item.title}}</Text>
      </TouchableOpacity>
    );
    ...
    <FlatList data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem} />

Provides additional metadata like `index` if you need it.

| Type                                                        | Required |
| ----------------------------------------------------------- | -------- |
| (info: {item: ItemT, index: number}) => ?React.Element<any> | Yes      |

---

### `extraData`

A marker property for telling the list to re-render (since it implements `PureComponent`). If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop, stick it here and treat it immutably.

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### `getItem`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `getItemCount`

| Type | Required |
| ---- | -------- |
|      | No       |

---

### `getItemLayout`

`getItemLayout` is an optional optimizations that let us skip measurement of dynamic content if you know the height of items a priori. `getItemLayout` is the most efficient, and is easy to use if you have fixed height items, for example:

    getItemLayout={(data, index) => (
      {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    )}

Remember to include separator length (height or width) in your offset calculation if you specify `ItemSeparatorComponent`.

| Type | Required |
| ---- | -------- |


| (data: ?Array<ItemT>, index: number) => {length: number, offset: number, index: number} | No |

---

### `horizontal`

If true, renders items next to each other horizontally instead of stacked vertically.

| Type      | Required |
| --------- | -------- |
| [boolean] | No       |

---

### `ListFooterComponent`

Rendered at the bottom of all the items.

| Type              | Required |
| ----------------- | -------- |
| [ReactClass<any>] | No       |

---

### `ListHeaderComponent`

Rendered at the top of all the items.

| Type              | Required |
| ----------------- | -------- |
| [ReactClass<any>] | No       |

---

### `legacyImplementation`

| Type      | Required |
| --------- | -------- |
| [boolean] | No       |

---

### `columnWrapperStyle`

Optional custom style for multi-item rows generated when numColumns > 1.

| Type     | Required |
| -------- | -------- |
| StyleObj | No       |

---

### `onEndReached`

Called once when the scroll position gets within `onEndReachedThreshold` of the rendered content.

| Type                                        | Required |
| ------------------------------------------- | -------- |
| [(info: {distanceFromEnd: number}) => void] | No       |

---

### `onEndReachedThreshold`

How far from the end (in units of visible length of the list) the bottom edge of the list must be from the end of the content to trigger the `onEndReached` callback. Thus a value of 0.5 will trigger `onEndReached` when the end of the content is within half the visible length of the list.

| Type     | Required |
| -------- | -------- |
| [number] | No       |

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

### `ItemSeparatorComponent`

Rendered in between each item, but not at the top or bottom.

| Type              | Required |
| ----------------- | -------- |
| [ReactClass<any>] | No       |

---

### `viewabilityConfig`

See `ViewabilityHelper` for flow type and further documentation.

| Type              | Required |
| ----------------- | -------- |
| ViewabilityConfig | No       |

## Methods

### `scrollToEnd()`

```javascript
scrollToEnd(([params]: object));
```

Scrolls to the end of the content. May be janky without `getItemLayout` prop.

---

### `scrollToIndex()`

```javascript
scrollToIndex((params: object));
```

Scrolls to the item at a the specified index such that it is positioned in the viewable area such that `viewPosition` 0 places it at the top, 1 at the bottom, and 0.5 centered in the middle.

May be janky without `getItemLayout` prop.

---

### `scrollToItem()`

```javascript
scrollToItem((params: object));
```

Requires linear scan through data - use `scrollToIndex` instead if possible. May be janky without `getItemLayout` prop.

---

### `scrollToOffset()`

```javascript
scrollToOffset((params: object));
```

Scroll to a specific content pixel offset, like a normal `ScrollView`.

---

### `recordInteraction()`

```javascript
recordInteraction();
```

Tells the list an interaction has occured, which should trigger viewability calculations, e.g. if `waitForInteractions` is true and the user has not scrolled. This is typically called by taps on items or by navigation actions.

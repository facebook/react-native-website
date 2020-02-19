---
id: version-0.45-flatlist
title: FlatList
original_id: flatlist
---

A performant interface for rendering basic, flat lists, supporting the most handy features:

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
          selected.set(id, !selected.get(id)); // toggle
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

This is a convenience wrapper around [`<VirtualizedList>`](virtualizedlist.md), and thus inherits its props (as well as those of `ScrollView`) that aren't explicitly listed here, along with the following caveats:

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- This is a `PureComponent` which means that it will not re-render if `props` remain shallow-equal. Make sure that everything your `renderItem` function depends on is passed as a prop (e.g. `extraData`) that is not `===` after updates, otherwise your UI may not update on changes. This includes the `data` prop and parent component state.
- In order to constrain memory and enable smooth scrolling, content is rendered asynchronously offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see blank content. This is a tradeoff that can be adjusted to suit the needs of each application, and we are working on improving it behind the scenes.
- By default, the list looks for a `key` prop on each item and uses that for the React key. Alternatively, you can provide a custom `keyExtractor` prop.

### Props

- [`keyExtractor`](flatlist.md#keyextractor)
- [`data`](flatlist.md#data)
- [`initialNumToRender`](flatlist.md#initialnumtorender)
- [`numColumns`](flatlist.md#numcolumns)
- [`renderItem`](flatlist.md#renderitem)
- [`ItemSeparatorComponent`](flatlist.md#itemseparatorcomponent)
- [`extraData`](flatlist.md#extradata)
- [`getItemLayout`](flatlist.md#getitemlayout)
- [`horizontal`](flatlist.md#horizontal)
- [`ListFooterComponent`](flatlist.md#listfootercomponent)
- [`initialScrollIndex`](flatlist.md#initialscrollindex)
- [`ListEmptyComponent`](flatlist.md#listemptycomponent)
- [`legacyImplementation`](flatlist.md#legacyimplementation)
- [`ListHeaderComponent`](flatlist.md#listheadercomponent)
- [`onEndReached`](flatlist.md#onendreached)
- [`onEndReachedThreshold`](flatlist.md#onendreachedthreshold)
- [`onRefresh`](flatlist.md#onrefresh)
- [`onViewableItemsChanged`](flatlist.md#onviewableitemschanged)
- [`refreshing`](flatlist.md#refreshing)
- [`removeClippedSubviews`](flatlist.md#removeclippedsubviews)
- [`columnWrapperStyle`](flatlist.md#columnwrapperstyle)
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

### `keyExtractor`

Used to extract a unique key for a given item at the specified index. Key is used for caching and as the react key to track item re-ordering. The default extractor checks `item.key`, then falls back to using the index, like React does.

| Type                                   | Required |
| -------------------------------------- | -------- |
| (item: ItemT, index: number) => string | Yes      |

---

### `data`

For simplicity, data is a plain array. If you want to use something else, like an immutable list, use the underlying `VirtualizedList` directly.

| Type                    | Required |
| ----------------------- | -------- |
| [$ReadOnlyArray<ItemT>] | Yes      |

---

### `initialNumToRender`

How many items to render in the initial batch. This should be enough to fill the screen but not much more. Note these items will never be unmounted as part of the windowed rendering in order to improve perceived performance of scroll-to-top actions.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `numColumns`

Multiple columns can only be rendered with `horizontal={false}` and will zig-zag like a `flexWrap` layout. Items should all be the same height - masonry layouts are not supported.

| Type   | Required |
| ------ | -------- |
| number | Yes      |

---

### `renderItem`

Takes an item from `data` and renders it into the list. Example usage:

    <FlatList
      ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (
        <View style={[style.separator, highlighted && {marginLeft: 0}]} />
      )}
      data={[{title: 'Title Text', key: 'item1'}]}
      renderItem={({item, separators}) => (
        <TouchableHighlight
          onPress={() => this._onPress(item)}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}>
          <View style={{backgroundColor: 'white'}}>
            <Text>{item.title}}</Text>
          </View>
        </TouchableHighlight>
      )}
    />

Provides additional metadata like `index` if you need it, as well as a more generic `separators.updateProps` function which let's you set whatever props you want to change the rendering of either the leading separator or trailing separator in case the more common `highlight` and `unhighlight` (which set the `highlighted: boolean` prop) are insufficient for your use-case.

| Type | Required |
| ---- | -------- |


| (info: { item: ItemT, index: number, separators: { highlight: () => void, unhighlight: () => void, updateProps: (select: 'leading' | 'trailing', newProps: Object) => void, }, }) => ?React.Element<any> | Yes |

---

### `ItemSeparatorComponent`

Rendered in between each item, but not at the top or bottom. By default, `highlighted` and `leadingItem` props are provided. `renderItem` provides `separators.highlight`/`unhighlight` which will update the `highlighted` prop, but you can also add custom props with `separators.updateProps`.

| Type              | Required |
| ----------------- | -------- |
| [ReactClass<any>] | No       |

---

### `extraData`

A marker property for telling the list to re-render (since it implements `PureComponent`). If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop, stick it here and treat it immutably.

| Type | Required |
| ---- | -------- |
| any  | No       |

---

### `getItemLayout`

`getItemLayout` is an optional optimizations that let us skip measurement of dynamic content if you know the height of items a priori. `getItemLayout` is efficient if you have fixed height items, for example:

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

Rendered at the bottom of all the items. Can be a React Component Class, a render function, or a rendered element.

| Type                                    | Required |
| --------------------------------------- | -------- |
| [ReactClass<any> ‖ ,React.Element<any>] | No       |

---

### `initialScrollIndex`

Instead of starting at the top with the first item, start at `initialScrollIndex`. This disables the "scroll to top" optimization that keeps the first `initialNumToRender` items always rendered and immediately renders the items starting at this initial index. Requires `getItemLayout` to be implemented.

| Type     | Required |
| -------- | -------- |
| [number] | No       |

---

### `ListEmptyComponent`

Rendered when the list is empty. Can be a React Component Class, a render function, or a rendered element.

| Type                                    | Required |
| --------------------------------------- | -------- |
| [ReactClass<any> ‖ ,React.Element<any>] | No       |

---

### `legacyImplementation`

| Type      | Required |
| --------- | -------- |
| [boolean] | No       |

---

### `ListHeaderComponent`

Rendered at the top of all the items. Can be a React Component Class, a render function, or a rendered element.

| Type                                    | Required |
| --------------------------------------- | -------- |
| [ReactClass<any> ‖ ,React.Element<any>] | No       |

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

### `removeClippedSubviews`

Note: may have bugs (missing content) in some circumstances - use at your own risk.

This may improve scroll performance for large lists.

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### `columnWrapperStyle`

Optional custom style for multi-item rows generated when numColumns > 1.

| Type     | Required |
| -------- | -------- |
| StyleObj | No       |

---

### `viewabilityConfig`

See `ViewabilityHelper` for flow type and further documentation.

| Type              | Required |
| ----------------- | -------- |
| ViewabilityConfig | No       |

## Methods

### `scrollToEnd()`

```jsx
scrollToEnd(([params]: object));
```

Scrolls to the end of the content. May be janky without `getItemLayout` prop.

---

### `scrollToIndex()`

```jsx
scrollToIndex((params: object));
```

Scrolls to the item at a the specified index such that it is positioned in the viewable area such that `viewPosition` 0 places it at the top, 1 at the bottom, and 0.5 centered in the middle. `viewOffset` is a fixed number of pixels to offset the final target position.

Note: cannot scroll to locations outside the render window without specifying the `getItemLayout` prop.

---

### `scrollToItem()`

```jsx
scrollToItem((params: object));
```

Requires linear scan through data - use `scrollToIndex` instead if possible.

Note: cannot scroll to locations outside the render window without specifying the `getItemLayout` prop.

---

### `scrollToOffset()`

```jsx
scrollToOffset((params: object));
```

Scroll to a specific content pixel offset, like a normal `ScrollView`.

---

### `recordInteraction()`

```jsx
recordInteraction();
```

Tells the list an interaction has occured, which should trigger viewability calculations, e.g. if `waitForInteractions` is true and the user has not scrolled. This is typically called by taps on items or by navigation actions.

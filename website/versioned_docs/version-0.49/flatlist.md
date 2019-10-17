---
id: version-0.49-flatlist
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

Also inherets [ScrollView Props](scrollview.md#props), unless it is nested in another FlatList of same orientation.

### Props

- [`numColumns`](flatlist.md#numcolumns)

### Methods

- [`scrollToEnd`](flatlist.md#scrolltoend)
- [`scrollToIndex`](flatlist.md#scrolltoindex)
- [`scrollToItem`](flatlist.md#scrolltoitem)
- [`scrollToOffset`](flatlist.md#scrolltooffset)
- [`recordInteraction`](flatlist.md#recordinteraction)
- [`flashScrollIndicators`](flatlist.md#flashscrollindicators)

---

# Reference

## Props

### `numColumns`

| Type | Required |
| ---- | -------- |
|      | No       |

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

Scrolls to the item at the specified index such that it is positioned in the viewable area such that `viewPosition` 0 places it at the top, 1 at the bottom, and 0.5 centered in the middle. `viewOffset` is a fixed number of pixels to offset the final target position.

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

Scroll to a specific content pixel offset in the list.

Check out [scrollToOffset](virtualizedlist.md#scrolltooffset) of VirtualizedList

---

### `recordInteraction()`

```jsx
recordInteraction();
```

Tells the list an interaction has occured, which should trigger viewability calculations, e.g. if `waitForInteractions` is true and the user has not scrolled. This is typically called by taps on items or by navigation actions.

---

### `flashScrollIndicators()`

```jsx
flashScrollIndicators();
```

Displays the scroll indicators momentarily.

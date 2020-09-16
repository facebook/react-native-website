---
id: flatlist-on-viewable-item-changed
title: What's in view with FlatList using `onViewableItemsChanged`
---

You might want to access just the items in a [`FlatList`](flatlist) that are visible in the viewport. For example: in list of videos, you want to automatically play a video when the video when it appears on the screen for a few seconds.

In iOS, you could use [`visibleCells`](https://developer.apple.com/documentation/uikit/uicollectionview/1618056-visiblecells) in `UITableView`. React Native's `FlatList` component has its own powerful property: `onViewableItemsChanged`. This guide will show you how to use the `onViewableItemsChanged` and how it works under the hood.

## What is `onViewableItemsChanged`

`onViewableItemsChanged` is a prop accessible to both [VirtualizedList](virtualizedlist#onviewableitemschanged) and [FlatList](flatlist#onviewableitemschanged) components. When you scroll one of these lists, only a few list items can be seen on screen at any time. These visible items are the `viewableItems`. When the `onViewableItemsChanged` function is called, it returns with an array of the currently visible items, `viewableItems`, and an array of the items that are no longer visible, `changed` items.

## How to use it

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="single" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      onViewableItemsChanged Example
    </li>
    <li id="pair" class="button-classical" aria-selected="false" role="tab" tabindex="1" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      viewabilityConfigCallbackPairs Example    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=onViewableItemsChanged
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  viewabilityConfig = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 75,
    minimumViewTime: 800,
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  };

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
    </SafeAreaView>
  );
};

const DATA = [
  {
    id: 'bd7acbea',
    title: 'First Item',
  },
  {
    id: '3ac68afc',
    title: 'Second Item',
  },
  {
    id: '58694a0f',
    title: 'Third Item',
  },
   {
    id: 'c60548d3',
    title: 'Forth Item',
  },
  {
    id: '3ad53abb',
    title: 'Fifth Item',
  },
  {
    id: '145571e2',
    title: 'Sixth Item',
  },
  {
    id: '565571e2',
    title: 'Seventh Item',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 25,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

`onViewableItemsChanged` should be used together with [`ViewabilityConfig`](flatlist#viewabilityconfig). `ViewabilityConfig` is the configuration for you to custom when the `onViewableItemsChanged` is called. A `onViewableItemsChanged` is called when its corresponding `ViewabilityConfig`'s conditions are met.

```jsx
 <FlatList
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      {...}
  />
```

```js
viewabilityConfig = {
  waitForInteraction: true,
  itemVisiblePercentThreshold: 75,
  minimumViewTime: 800
};
```

Here [waitForInteractions](flatlist#waitforinteraction) is true, if the user hasn't scrolled or recordInteraction hasn't called, the viewable items aren't be calculated.

```
  waitForInteraction: true,
```

Here, [`minimumViewTime`](flatlist#minimumviewtime) is 800, and [`itemVisiblePercentThreshold`](flatlist#itemvisiblepercentthreshold) is 75. This config means the item is marked as visible only if at least 75% of it is physically viewable for more than 800 milliseconds.

```
  itemVisiblePercentThreshold: 75,
  minimumViewTime: 800,
```

<block class="classical syntax" />

```SnackPlayer name=viewabilityConfigCallbackPairs
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  on60ViewableItemsChanged = ({viewableItems, changed}) => {
    console.log("60% partially Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  };

  on75ViewableItemsChanged = ({viewableItems, changed}) => {
    console.log("75% partially Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  };

  viewabilityConfigCallbackPairs = [
  {
    viewabilityConfig: {
      minimumViewTime: 600,
      itemVisiblePercentThreshold: 60
    },
    onViewableItemsChanged: on60ViewableItemsChanged
  },
  {
    viewabilityConfig: {
      minimumViewTime: 700,
      itemVisiblePercentThreshold: 75
    },
    onViewableItemsChanged: on75ViewableItemsChanged
  }
  ];

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
    </SafeAreaView>
  );
};

const DATA = [
  {
    id: 'bd7acbea',
    title: 'First Item',
  },
  {
    id: '3ac68afc',
    title: 'Second Item',
  },
  {
    id: '58694a0f',
    title: 'Third Item',
  },
   {
    id: 'c60548d3',
    title: 'Forth Item',
  },
  {
    id: '3ad53abb',
    title: 'Fifth Item',
  },
  {
    id: '145571e2',
    title: 'Sixth Item',
  },
  {
    id: '565571e2',
    title: 'Seventh Item',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 25,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;

```

Supposed you have to do different things for items with 60% viewable region and those with 75% viewable region. You can use [`viewabilityConfigCallbackPairs`](flatlist#viewabilityconfigcallbackpairs), which is a list of `ViewabilityConfig`/`onViewableItemsChanged` pairs. Just as the following code, `on60ViewableItemsChanged` will be called when some items are at least 60% viewable for more than 600 milliseconds. In the meanwhile, `on75ViewableItemsChanged` will be called when some items are at least 75% viewable for more than 700 milliseconds.

```js
viewabilityConfigCallbackPairs = [
  {
    viewabilityConfig: {
      minimumViewTime: 600,
      itemVisiblePercentThreshold: 60
    },
    onViewableItemsChanged: on60ViewableItemsChanged
  },
  {
    viewabilityConfig: {
      minimumViewTime: 700,
      itemVisiblePercentThreshold: 75
    },
    onViewableItemsChanged: on75ViewableItemsChanged
  }
];
```

<block class="endBlock syntax" />

## How does `onViewableItemsChanged` works

### Viewable Region

The layout and viewable region information for `VirtualizedList` is stored in a `_scrollMetrics` object. Through the `nativeEvent` in `onScroll` callback, `VirtualizedList` can access this layout information.

```js
const timestamp = e.timeStamp;
let visibleLength = this._selectLength(
  e.nativeEvent.layoutMeasurement
);
let contentLength = this._selectLength(e.nativeEvent.contentSize);
let offset = this._selectOffset(e.nativeEvent.contentOffset);
let dOffset = offset - this._scrollMetrics.offset;

// ... more code here

this._scrollMetrics = {
  contentLength,
  dt,
  dOffset,
  offset,
  timestamp,
  velocity,
  visibleLength
};
```

<img src="/docs/assets/fvc-layout.png" width="640"/>

If it is a vertical `VirtualizedList`, the `layout.layoutMeasurement.height` in the `nativeEvent` is assigned to `visibleLength`, the height of viewable region.

### Overview

<img src="/docs/assets/fvc-overview.png"  witdh="640"/>

#### Different `viewabilityConfig` in one `VirtualizedList`

`_viewabilityTuples` is an array inside `VirtualizedList` to store `ViewabilityHelper/onViewableItemsChanged` pairs. This array is initialized in the `constructor` function.

```js
_viewabilityTuples: Array<ViewabilityHelperCallbackTuple> = [];

type ViewabilityHelperCallbackTuple = {
  viewabilityHelper: ViewabilityHelper,
  onViewableItemsChanged: (info: {
    viewableItems: Array<ViewToken>,
    changed: Array<ViewToken>,
    ...
  }) => void,
  ...
};
```

If you define [viewabilityConfigCallbackPairs](https://facebook.github.io/react-native/docs/flatlist#viewabilityconfigcallbackpairs), each `viewabilityConfig` will be used to initialize a different `ViewabilityHelper` object.

```js
if (this.props.viewabilityConfigCallbackPairs) {
  this._viewabilityTuples = this.props.viewabilityConfigCallbackPairs.map(
    (pair) => ({
      viewabilityHelper: new ViewabilityHelper(
        pair.viewabilityConfig
      ),
      onViewableItemsChanged: pair.onViewableItemsChanged
    })
  );
} else if (this.props.onViewableItemsChanged) {
  this._viewabilityTuples.push({
    viewabilityHelper: new ViewabilityHelper(
      this.props.viewabilityConfig
    ),
    onViewableItemsChanged: this.props.onViewableItemsChanged
  });
}
```

[`ViewabilityHelper`](https://github.com/facebook/react-native/blob/84adc85523770ebfee749a020920e0b216cf69f8/Libraries/Lists/ViewabilityHelper.js#L64) is `a utility class for calculating viewable items based on the viewabilityConfig and metrics, like the scroll position and layout.`

As I mentioned before, in a `VirtualizedList` could has several `ViewabilityHelper` objects in `_viewabilityTuples`, containing different `viewabilityConfig` to handle different viewability conditions. Here are some important props in `ViewabilityHelper`.

```js
class ViewabilityHelper {
  _config: ViewabilityConfig;
  _hasInteracted: boolean = false;
  /* A set of `timeoutID`, used for memory management */
  _timers: Set<number> = new Set();
  // Indexes of the viewable items
  _viewableIndices: Array<number> = [];
  // A map for viewable items
  _viewableItems: Map<string, ViewToken> = new Map();
}
```

#### Items' layout

In the overview graph, you can see a func `_updateViewableItems` called in many scenarios. For example, it is called in `onScroll` callback. Then, It calls `viewabilityHelper.onUpdate` to find out the viewable items, which appear in the viewport for VirtualizedList.

```js
_updateViewableItems(data: any) {
    const {getItemCount} = this.props;

    this._viewabilityTuples.forEach(tuple => {
      tuple.viewabilityHelper.onUpdate(
        getItemCount(data),
        // contentOffset of the list
        this._scrollMetrics.offset,
        // 🌟 viewportHeight
        this._scrollMetrics.visibleLength,
        this._getFrameMetrics,
        this._createViewToken,
        tuple.onViewableItemsChanged,
        this.state,
      );
    });
  }
```

- `this._scrollMetrics.visibleLength` is used as `viewportHeight`
- `this._createViewToken` is used to construct a `ViewToken` object, which contains `item` data, `index`, `key` and `isViewable` flag of the `item`.
- [this.\_getFrameMetrics](1864) is a function to get layout information of the item cell by index. The item layout is from `getItemLayout` prop of `VirtualizedList` or `this._frames` map. `this._frames` stores the itemKey/itemLayout pairs.

```js
// this._frames stores the item cell layout info
{ [cellKey]: {
      // offset of the item cell
      offset: number,
      // length of the item cell. width or height determined by the direction of the VirtualizedList
      length: number,
      index: number,
      inLayout: boolean,
    }
}
```

- By `this.state`, you know the range of the rendered items by `first` and `last` value. `VirtualizedList` updates these two values when the rendered items are changed.

```js
type State = {
  // The range of the rendered items,
  // used for the optimization to reduce the scan size
  first: number,
  last: number,
  ...
};
```

### How to find out viewable items

In `onUpdate` method, it calls `computeViewableItems` to get `viewableIndices`. `viewableIndices` is an array of indexes of the viewable items. So, how does `computeViewableItems` work?

#### How to get the indexes of viewable items

In `computeViewableItems` in the `ViewabilityHelper` class, it iterates items from `${first}` to `${last}`. If an item is viewable, it will be stored in an array named `viewableIndices`.

```js
  for (let idx = first; idx <= last; idx++) {
      const metrics = getFrameMetrics(idx);
      if (!metrics) {
        continue;
      }
      // The top of current item cell, relative to the screen coordinate
      const top = metrics.offset - scrollOffset;
      // The bottom of current item cell, relative to the screen coordinate
      const bottom = top + metrics.length;
      if (top < viewportHeight && bottom > 0) {
        firstVisible = idx;
        if (
          _isViewable(
            viewAreaMode,
            viewablePercentThreshold,
            top,
            bottom,
            viewportHeight,
            metrics.length,
          )
        ) {
          viewableIndices.push(idx);
        }
      } else if (firstVisible >= 0) {
        break;
      }
    }
    return viewableIndices;
  }
```

From the code, you can see the `top` and `bottom` value is related to the screen coordinate. I drew a graph to show the relationship between `metrics.offset`, `scrollOffset`, `metrics.length` , `top` and `bottom`. This graph will help you better understand the above code.

<center><img src="/docs/assets/fvc-item-layout.png" width="400"/></center>

### What kind of item is viewable

An item is said to be viewable when it meets the following conditions for longer than `${minimumViewTime}` milliseconds (after an interaction if `waitForInteraction` is true):

1. the fraction of the item visible in the view area >= `itemVisiblePercentThreshold`. When it comes to the fraction of the item visible in the view area, you need to take care about cases shown in the following graph. RN use `Math.min(bottom, viewportHeight) - Math.max(top, 0)` to calculate the viewable length. <img src="/docs/assets/fvc-viewable-partial-1.png"/> <img src="/docs/assets/fvc-viewable-partial-2.png"/>

1) Entirely visible on screen when the height of a item is bigger than the `viewportHeight`. <img src="/docs/assets/fvc-entire-viewable.png" width="240"/>

```js
function _isViewable(
  viewAreaMode: boolean,
  viewablePercentThreshold: number,
  top: number,
  bottom: number,
  viewportHeight: number,
  itemLength: number
): boolean {
  if (_isEntirelyVisible(top, bottom, viewportHeight)) {
    // Entirely visible
    return true;
  } else {
    // Get viewable height of this item cell
    const pixels = _getPixelsVisible(top, bottom, viewportHeight);
    // Get the viewable percentage of this item cell
    const percent =
      100 *
      (viewAreaMode
        ? pixels / viewportHeight
        : pixels / itemLength);
    return percent >= viewablePercentThreshold;
  }
}

function _getPixelsVisible(
  top: number,
  bottom: number,
  viewportHeight: number
): number {
  const visibleHeight =
    Math.min(bottom, viewportHeight) - Math.max(top, 0);
  return Math.max(0, visibleHeight);
}

function _isEntirelyVisible(
  top: number,
  bottom: number,
  viewportHeight: number
): boolean {
  return top >= 0 && bottom <= viewportHeight && bottom > top;
}
```

[`_isViewable` source code is here](https://github.com/facebook/react-native/blob/84adc85523770ebfee749a020920e0b216cf69f8/Libraries/Lists/ViewabilityHelper.js#L300)

### Timer and Schedule

In [`onUpdate` func in ViewabilityHelper](https://github.com/facebook/react-native/blob/84adc85523770ebfee749a020920e0b216cf69f8/Libraries/Lists/ViewabilityHelper.js#L228), if you define `minimumViewTime` value, the `_onUpdateSync` is scheduled to be called. It is the handler of the `timeout`.

```js
this._viewableIndices = viewableIndices;
if (this._config.minimumViewTime) {
  const handle = setTimeout(() => {
    this._timers.delete(handle);
    // filter out  indices that have gone out of view after minimumViewTime
    // figure out which items are gone, which items are showing
    this._onUpdateSync(
      viewableIndices,
      onViewableItemsChanged,
      createViewToken
    );
  }, this._config.minimumViewTime);
  this._timers.add(handle);
} else {
  this._onUpdateSync(
    viewableIndices,
    onViewableItemsChanged,
    createViewToken
  );
}
```

If some items aren't longer viewable after a few seconds, \${minimumViewTime}, the [\_onUpdateSync](https://github.com/facebook/react-native/blob/84adc85523770ebfee749a020920e0b216cf69f8/Libraries/Lists/ViewabilityHelper.js#L267) func filters out these indices that have gone out of viewport.

```js
// Filter out indices that have gone out of view after `minimumViewTime`
viewableIndicesToCheck = viewableIndicesToCheck.filter((ii) =>
  this._viewableIndices.includes(ii)
);
```

<img src="/docs/assets/fvc-indices.png"/>

In the above graph, at first, the `_viewableIndices` is from 1 to 9. Then the user scrolls the `VirtualizedList` and the `_onUpdateSync` is triggered after `minimumViewTime`. At this moment, the current `_viewableIndices` is from 2 to 10. So the item indexed 1 is filtered out.

### How to get changed items

Comparing with the last time when `onViewableItemsChanged` is triggered, at this time to trigger `onViewableItemsChanged`. Some viewable items will be out of the screen, some hidden items will become viewable. In `_onUpdateSync` function, the `preItems` map stores the information about previous visible items, the previous means last time when `VirtualizedList` calls `onViewableItemsChanged`. Now it has a `nextItems` map, which stores the information about viewable items this time. Then it figures out the `changed` items by comparing these two maps. Then, it calls `onViewableItemsChanged`, passing `viewableItems` and `changed` items.

```js
_onUpdateSync(
    viewableIndicesToCheck,
    onViewableItemsChanged,
    createViewToken,
  ) {
    // Filter out indices that have gone out of view since this call was scheduled.
    viewableIndicesToCheck = viewableIndicesToCheck.filter(ii =>
      this._viewableIndices.includes(ii),
    );
    const prevItems = this._viewableItems;
    // Using map, so the time complexity would be o(n)
    const nextItems = new Map(
      viewableIndicesToCheck.map(ii => {
        const viewable = createViewToken(ii, true);
        return [viewable.key, viewable];
      }),
    );

    const changed = [];
    for (const [key, viewable] of nextItems) {
      if (!prevItems.has(key)) {
        changed.push(viewable);
      }
    }
    for (const [key, viewable] of prevItems) {
      if (!nextItems.has(key)) {
        changed.push({...viewable, isViewable: false});
      }
    }
    if (changed.length > 0) {
      this._viewableItems = nextItems;
      onViewableItemsChanged({
        viewableItems: Array.from(nextItems.values()),
        changed,
        viewabilityConfig: this._config,
      });
    }
  }
}
```

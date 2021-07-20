---
id: refreshcontrol
title: RefreshControl
---

This component is used inside a ScrollView or ListView to add pull to refresh functionality. When the ScrollView is at `scrollY: 0`, swiping down triggers an `onRefresh` event.

## Example

```SnackPlayer name=RefreshControl&supportedPlatforms=ios,android
import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

> Note: `refreshing` is a controlled prop, this is why it needs to be set to `true` in the `onRefresh` function otherwise the refresh indicator will stop immediately.

---

# Reference

## Props

### [View Props](view.md#props)

Inherits [View Props](view.md#props).

---

### <div class="label required basic">Required</div>**`refreshing`**

Whether the view should be indicating an active refresh.

| Type    |
| ------- |
| boolean |

---

### `colors` <div class="label android">Android</div>

The colors (at least one) that will be used to draw the refresh indicator.

| Type                         |
| ---------------------------- |
| array of [colors](colors.md) |

---

### `enabled` <div class="label android">Android</div>

Whether the pull to refresh functionality is enabled.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `onRefresh`

Called when the view starts refreshing.

| Type     |
| -------- |
| function |

---

### `progressBackgroundColor` <div class="label android">Android</div>

The background color of the refresh indicator.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `progressViewOffset`

Progress view top offset.

| Type   | Default |
| ------ | ------- |
| number | `0`     |

---

### `size` <div class="label android">Android</div>

Size of the refresh indicator.

| Type                                                             | Default                          |
| ---------------------------------------------------------------- | -------------------------------- |
| [RefreshControl.SIZE](refreshcontrol.md#refreshlayoutconstssize) | RefreshLayoutConsts.SIZE.DEFAULT |

---

### `tintColor` <div class="label ios">iOS</div>

The color of the refresh indicator.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `title` <div class="label ios">iOS</div>

The title displayed under the refresh indicator.

| Type   |
| ------ |
| string |

---

### `titleColor` <div class="label ios">iOS</div>

The color of the refresh indicator title.

| Type               |
| ------------------ |
| [color](colors.md) |

## Type Definitions

### RefreshLayoutConsts.SIZE

The SwipeRefreshLayout Android component constants. The actual component size may vary between devices. You can read more about the native component in the [Android documentation](https://developer.android.com/reference/androidx/swiperefreshlayout/widget/SwipeRefreshLayout).

| Type |
| ---- |
| enum |

**Constants:**

| Name    | Type | Value | Description                 |
| ------- | ---- | ----- | --------------------------- |
| DEFAULT | int  | `1`   | Default RefreshControl size |
| LARGE   | int  | `0`   | Large RefreshControl size   |

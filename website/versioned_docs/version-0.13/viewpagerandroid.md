---
id: version-0.13-viewpagerandroid
title: ViewPagerAndroid
original_id: viewpagerandroid
---

Container that allows to flip left and right between child views. Each child view of the `ViewPagerAndroid` will be treated as a separate page and will be streched to fill the `ViewPagerAndroid`.

It is important all children are `<View>`s and not composite components. You can set style properties like `padding` or `backgroundColor` for each child.

Example:

```
render: function() {
  return (
    <ViewPagerAndroid
      style={styles.viewPager}
      initialPage={0}>
      <View style={styles.pageStyle}>
        <Text>First page</Text>
      </View>
      <View style={styles.pageStyle}>
        <Text>Second page</Text>
      </View>
    </ViewPagerAndroid>
  );
}

...

var styles = {
  ...
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  }
}
```

### Props

- [`initialPage`](viewpagerandroid.md#initialpage)
- [`keyboardDismissMode`](viewpagerandroid.md#keyboarddismissmode)
- [`onPageScroll`](viewpagerandroid.md#onpagescroll)
- [`onPageSelected`](viewpagerandroid.md#onpageselected)

### Methods

- [`setPage`](viewpagerandroid.md#setpage)

---

# Reference

## Props

### `initialPage`

Index of initial page that should be selected. Use `setPage` method to update the page, and `onPageSelected` to monitor page changes

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `keyboardDismissMode`

Determines whether the keyboard gets dismissed in response to a drag.

- 'none' (the default), drags do not dismiss the keyboard.
- 'on-drag', the keyboard is dismissed when a drag begins.

| Type                    | Required |
| ----------------------- | -------- |
| enum('none', 'on-drag') | No       |

---

### `onPageScroll`

Executed when transitioning between pages (ether because of animation for the requested page change or when user is swiping/dragging between pages) The `event.nativeEvent` object for this callback will carry following data:

- position - index of first page from the left that is currently visible
- offset - value from range [0,1) describing stage between page transitions. Value x means that (1 - x) fraction of the page at "position" index is visible, and x fraction of the next page is visible.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onPageSelected`

This callback will be caleld once ViewPager finish navigating to selected page (when user swipes between pages). The `event.nativeEvent` object passed to this callback will have following fields:

- position - index of page that has been selected

| Type     | Required |
| -------- | -------- |
| function | No       |

## Methods

### `setPage()`

```jsx
setPage(selectedPage);
```

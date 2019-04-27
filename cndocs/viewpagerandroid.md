---
id: viewpagerandroid
title: ViewPagerAndroid
---

> **Deprecated.** Use [react-native-community/react-native-viewpager](https://github.com/react-native-community/react-native-viewpager) instead.

一个允许在子视图之间左右翻页的容器。每一个 ViewPagerAndroid 的子容器会被视作一个单独的页，并且会被拉伸填满 ViewPagerAndroid。

注意所有的子视图都必须是纯 View，而不能是自定义的复合容器。你可以给每个子视图设置样式属性譬如 padding 或 backgroundColor。

例如:

```
render() {
  return (
    <ViewPagerAndroid
      style={styles.viewPager}
      initialPage={0}>
      <View style={styles.pageStyle} key="1">
        <Text>First page</Text>
      </View>
      <View style={styles.pageStyle} key="2">
        <Text>Second page</Text>
      </View>
    </ViewPagerAndroid>
  );
}

...

const styles = {
  ...
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  }
}
```

### 查看 Props

* [View props...](view.md#props)

- [`initialPage`](viewpagerandroid.md#initialpage)
- [`keyboardDismissMode`](viewpagerandroid.md#keyboarddismissmode)
- [`onPageScroll`](viewpagerandroid.md#onpagescroll)
- [`onPageScrollStateChanged`](viewpagerandroid.md#onpagescrollstatechanged)
- [`onPageSelected`](viewpagerandroid.md#onpageselected)
- [`pageMargin`](viewpagerandroid.md#pagemargin)
- [`peekEnabled`](viewpagerandroid.md#peekenabled)
- [`scrollEnabled`](viewpagerandroid.md#scrollenabled)
- [`setPage`](viewpagerandroid.md#setpage)
- [`setPageWithoutAnimation`](viewpagerandroid.md#setpagewithoutanimation)

### 查看类型定义

* [`ViewPagerScrollState`](viewpagerandroid.md#viewpagerscrollstate)

---

# 文档

## Props

### `initialPage`

初始选中的页的下标。你可以用 setPage 函数来翻页，并且用 onPageSelected 来监听页的变化。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `keyboardDismissMode`

决定在滑动的时候是否要让软键盘消失。

* none （默认值），拖拽不会让键盘消失。
* on-drag， 当拖拽开始的时候会让键盘消失。

| 类型                    | 必填 |
| ----------------------- | ---- |
| enum('none', 'on-drag') | 否   |

---

### `onPageScroll`

当在页间切换时（不论是由于动画还是由于用户在页间滑动/拖拽）执行。

回调参数中的 event.nativeEvent 对象会包含如下数据：

* position 从左数起第一个当前可见的页面的下标。
* offset 一个在[0,1]之内的范围(可以等于0或1)，代表当前页面切换的状态。值 x 表示现在"position"所表示的页有(1 - x)的部分可见，而下一页有 x 的部分可见。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onPageScrollStateChanged`

页面滑动状态变化时调用此回调函数。页面滑动状态可能为以下三种之一：

* idle 空闲，意味着当前没有交互。
* dragging 拖动中，意味着当前页面正在被拖动。
* settling 处理中，意味着当前页面发生过交互，且正在结束开头或收尾的动画。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onPageSelected`

这个回调会在页面切换完成后（当用户在页面间滑动）调用。

回调参数中的 event.nativeEvent 对象会包含如下的字段：

* position 当前被选中的页面下标

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `pageMargin`

页面滑动时两个页面之间的间距。仅仅在滑动时可见，页面之间仍然时边对边的。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `peekEnabled`

是否在当前页滑动时展示前一页或者后一页，默认为 false

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `scrollEnabled`

设为 false 时可禁止滚动。默认值为 true

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |


### `setPage`

A helper function to scroll to a specific page in the ViewPager. The transition between pages will be animated.

* position - index of page that will be selected

| Type   | Required |
| ------ | -------- |
| Number | Yes      |

---

### `setPageWithoutAnimation`

A helper function to scroll to a specific page in the ViewPager. The transition between pages will _not_ be animated.

* position - index of page that will be selected

| Type   | Required |
| ------ | -------- |
| Number | Yes      |

## 类型定义

### ViewPagerScrollState

| 类型  |
| ----- |
| $Enum |

**常量:**

| Value    | 说明 |
| -------- | ---- |
| idle     |      |
| dragging |      |
| settling |      |

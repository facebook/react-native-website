---
id: version-0.6-scrollview
title: ScrollView
original_id: scrollview
---

Component that wraps platform ScrollView while providing integration with touch locking "responder" system.

Doesn't yet support other contained responders from blocking this scroll view from becoming the responder.

### Props

- [`maximumZoomScale`](scrollview.md#maximumzoomscale)
- [`alwaysBounceHorizontal`](scrollview.md#alwaysbouncehorizontal)
- [`automaticallyAdjustContentInsets`](scrollview.md#automaticallyadjustcontentinsets)
- [`bounces`](scrollview.md#bounces)
- [`bouncesZoom`](scrollview.md#bounceszoom)
- [`canCancelContentTouches`](scrollview.md#cancancelcontenttouches)
- [`centerContent`](scrollview.md#centercontent)
- [`contentContainerStyle`](scrollview.md#contentcontainerstyle)
- [`contentInset`](scrollview.md#contentinset)
- [`contentOffset`](scrollview.md#contentoffset)
- [`decelerationRate`](scrollview.md#decelerationrate)
- [`directionalLockEnabled`](scrollview.md#directionallockenabled)
- [`horizontal`](scrollview.md#horizontal)
- [`keyboardDismissMode`](scrollview.md#keyboarddismissmode)
- [`keyboardShouldPersistTaps`](scrollview.md#keyboardshouldpersisttaps)
- [`alwaysBounceVertical`](scrollview.md#alwaysbouncevertical)
- [`minimumZoomScale`](scrollview.md#minimumzoomscale)
- [`onScroll`](scrollview.md#onscroll)
- [`onScrollAnimationEnd`](scrollview.md#onscrollanimationend)
- [`pagingEnabled`](scrollview.md#pagingenabled)
- [`removeClippedSubviews`](scrollview.md#removeclippedsubviews)
- [`scrollEnabled`](scrollview.md#scrollenabled)
- [`scrollEventThrottle`](scrollview.md#scrolleventthrottle)
- [`scrollIndicatorInsets`](scrollview.md#scrollindicatorinsets)
- [`scrollsToTop`](scrollview.md#scrollstotop)
- [`showsHorizontalScrollIndicator`](scrollview.md#showshorizontalscrollindicator)
- [`showsVerticalScrollIndicator`](scrollview.md#showsverticalscrollindicator)
- [`stickyHeaderIndices`](scrollview.md#stickyheaderindices)
- [`style`](scrollview.md#style)
- [`zoomScale`](scrollview.md#zoomscale)

### Methods

- [`scrollTo`](scrollview.md#scrollto)
- [`scrollWithoutAnimationTo`](scrollview.md#scrollwithoutanimationto)

---

# Reference

## Props

### `maximumZoomScale`

The maximum allowed zoom scale. The default value is 1.0.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `alwaysBounceHorizontal`

When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself. The default value is true when `horizontal={true}` and false otherwise.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `automaticallyAdjustContentInsets`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `bounces`

When true, the scroll view bounces when it reaches the end of the content if the content is larger then the scroll view along the axis of the scroll direction. When false, it disables all bouncing even if the `alwaysBounce*` props are true. The default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `bouncesZoom`

When true, gestures can drive zoom past min/max and the zoom will animate to the min/max value at gesture end, otherwise the zoom will not exceed the limits.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `canCancelContentTouches`

When false, once tracking starts, won't try to drag if the touch moves. The default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `centerContent`

When true, the scroll view automatically centers the content when the content is smaller than the scroll view bounds; when the content is larger than the scroll view, this property has no effect. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `contentContainerStyle`

These styles will be applied to the scroll view content container which wraps all of the child views. Example:

return ( <ScrollView contentContainerStyle={styles.contentContainer}> </ScrollView> ); ... var styles = StyleSheet.create({ contentContainer: { paddingVertical: 20 } });

| Type                                 | Required |
| ------------------------------------ | -------- |
| StyleSheetPropType(View Style props) | No       |

---

### `contentInset`

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

---

### `contentOffset`

| Type          | Required |
| ------------- | -------- |
| PointPropType | No       |

---

### `decelerationRate`

A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger. Reasonable choices include

- Normal: 0.998 (the default)
- Fast: 0.9

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `directionalLockEnabled`

When true, the ScrollView will try to lock to only vertical or horizontal scrolling while dragging. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `horizontal`

When true, the scroll view's children are arranged horizontally in a row instead of vertically in a column. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `keyboardDismissMode`

Determines whether the keyboard gets dismissed in response to a drag.

- 'none' (the default), drags do not dismiss the keyboard.
- 'onDrag', the keyboard is dismissed when a drag begins.
- 'interactive', the keyboard is dismissed interactively with the drag and moves in synchrony with the touch; dragging upwards cancels the dismissal.

| Type                                   | Required |
| -------------------------------------- | -------- |
| enum('none', 'interactive', 'on-drag') | No       |

---

### `keyboardShouldPersistTaps`

When false, tapping outside of the focused text input when the keyboard is up dismisses the keyboard. When true, the scroll view will not catch taps, and the keyboard will not dismiss automatically. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `alwaysBounceVertical`

When true, the scroll view bounces vertically when it reaches the end even if the content is smaller than the scroll view itself. The default value is false when `horizontal={true}` and true otherwise.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `minimumZoomScale`

The minimum allowed zoom scale. The default value is 1.0.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `onScroll`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onScrollAnimationEnd`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `pagingEnabled`

When true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `removeClippedSubviews`

Experimental: When true, offscreen child views (whose `overflow` value is `hidden`) are removed from their native backing superview when offscreen. This can improve scrolling performance on long lists. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `scrollEnabled`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `scrollEventThrottle`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `scrollIndicatorInsets`

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |

---

### `scrollsToTop`

When true, the scroll view scrolls to top when the status bar is tapped. The default value is true.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `showsHorizontalScrollIndicator`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `showsVerticalScrollIndicator`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `stickyHeaderIndices`

An array of child indices determining which children get docked to the top of the screen when scrolling. For example, passing `stickyHeaderIndices={[0]}` will cause the first child to be fixed to the top of the scroll view. This property is not supported in conjunction with `horizontal={true}`.

| Type            | Required |
| --------------- | -------- |
| array of number | No       |

---

### `style`

| Type  | Required |
| ----- | -------- |
| style | No       |

- [Layout Props...](layout-props.md#props)

- [Transforms...](transforms.md#props)

- **`borderTopColor`**: string

- **`backgroundColor`**: string

- **`borderBottomLeftRadius`**: number

- **`borderBottomRightRadius`**: number

- **`borderColor`**: string

- **`borderLeftColor`**: string

- **`borderRadius`**: number

- **`borderRightColor`**: string

- **`borderBottomColor`**: string

- **`borderTopLeftRadius`**: number

- **`borderTopRightRadius`**: number

- **`opacity`**: number

- **`overflow`**: enum('visible', 'hidden')

- **`shadowColor`**: string

- **`shadowOffset`**: object: {width: number,height: number}

- **`shadowOpacity`**: number

- **`shadowRadius`**: number

---

### `zoomScale`

The current scale of the scroll view content. The default value is 1.0.

| Type   | Required |
| ------ | -------- |
| number | No       |

## Methods

### `scrollTo()`

```jsx
scrollTo(([destY]: number), ([destX]: number));
```

---

### `scrollWithoutAnimationTo()`

```jsx
scrollWithoutAnimationTo(([destY]: number), ([destX]: number));
```

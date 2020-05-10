---
id: version-0.12-scrollview
title: ScrollView
original_id: scrollview
---

Component that wraps platform ScrollView while providing integration with touch locking "responder" system.

Keep in mind that ScrollViews must have a bounded height in order to work, since they contain unbounded-height children into a bounded container (via a scroll interaction). In order to bound the height of a ScrollView, either set the height of the view directly (discouraged) or make sure all parent views have bounded height. Forgetting to transfer `{flex: 1}` down the view stack can lead to errors here, which the element inspector makes quick to debug.

Doesn't yet support other contained responders from blocking this scroll view from becoming the responder.

### Props

- [`contentInset`](scrollview.md#contentinset)
- [`contentContainerStyle`](scrollview.md#contentcontainerstyle)
- [`keyboardDismissMode`](scrollview.md#keyboarddismissmode)
- [`keyboardShouldPersistTaps`](scrollview.md#keyboardshouldpersisttaps)
- [`onScroll`](scrollview.md#onscroll)
- [`removeClippedSubviews`](scrollview.md#removeclippedsubviews)
- [`showsHorizontalScrollIndicator`](scrollview.md#showshorizontalscrollindicator)
- [`showsVerticalScrollIndicator`](scrollview.md#showsverticalscrollindicator)
- [`style`](scrollview.md#style)
- [`alwaysBounceHorizontal`](scrollview.md#alwaysbouncehorizontal)
- [`alwaysBounceVertical`](scrollview.md#alwaysbouncevertical)
- [`automaticallyAdjustContentInsets`](scrollview.md#automaticallyadjustcontentinsets)
- [`bounces`](scrollview.md#bounces)
- [`bouncesZoom`](scrollview.md#bounceszoom)
- [`canCancelContentTouches`](scrollview.md#cancancelcontenttouches)
- [`centerContent`](scrollview.md#centercontent)
- [`horizontal`](scrollview.md#horizontal)
- [`contentOffset`](scrollview.md#contentoffset)
- [`decelerationRate`](scrollview.md#decelerationrate)
- [`directionalLockEnabled`](scrollview.md#directionallockenabled)
- [`maximumZoomScale`](scrollview.md#maximumzoomscale)
- [`minimumZoomScale`](scrollview.md#minimumzoomscale)
- [`onScrollAnimationEnd`](scrollview.md#onscrollanimationend)
- [`pagingEnabled`](scrollview.md#pagingenabled)
- [`scrollEnabled`](scrollview.md#scrollenabled)
- [`scrollEventThrottle`](scrollview.md#scrolleventthrottle)
- [`scrollIndicatorInsets`](scrollview.md#scrollindicatorinsets)
- [`scrollsToTop`](scrollview.md#scrollstotop)
- [`snapToAlignment`](scrollview.md#snaptoalignment)
- [`snapToInterval`](scrollview.md#snaptointerval)
- [`stickyHeaderIndices`](scrollview.md#stickyheaderindices)
- [`zoomScale`](scrollview.md#zoomscale)

### Methods

- [`scrollTo`](scrollview.md#scrollto)
- [`scrollWithoutAnimationTo`](scrollview.md#scrollwithoutanimationto)
- [`handleScroll`](scrollview.md#handlescroll)

---

# Reference

## Props

### `contentInset`

The amount by which the scroll view content is inset from the edges of the scroll view. Defaults to `{0, 0, 0, 0}`.

| Type                                                               | Required | Platform |
| ------------------------------------------------------------------ | -------- | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       | iOS      |

---

### `contentContainerStyle`

These styles will be applied to the scroll view content container which wraps all of the child views. Example:

return ( <ScrollView contentContainerStyle={styles.contentContainer}> </ScrollView> ); ... var styles = StyleSheet.create({ contentContainer: { paddingVertical: 20 } });

| Type                                 | Required |
| ------------------------------------ | -------- |
| StyleSheetPropType(View Style props) | No       |

---

### `keyboardDismissMode`

Determines whether the keyboard gets dismissed in response to a drag.

- 'none' (the default), drags do not dismiss the keyboard.
- 'on-drag', the keyboard is dismissed when a drag begins.
- 'interactive', the keyboard is dismissed interactively with the drag and moves in synchrony with the touch; dragging upwards cancels the dismissal. On android this is not supported and it will have the same behavior as 'none'.

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

### `onScroll`

Fires at most once per frame during scrolling. The frequency of the events can be contolled using the `scrollEventThrottle` prop.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `removeClippedSubviews`

Experimental: When true, offscreen child views (whose `overflow` value is `hidden`) are removed from their native backing superview when offscreen. This can improve scrolling performance on long lists. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `showsHorizontalScrollIndicator`

When true, shows a horizontal scroll indicator.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `showsVerticalScrollIndicator`

When true, shows a vertical scroll indicator.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `style`

| Type  | Required |
| ----- | -------- |
| style | No       |

- [Layout Props...](layout-props.md#props)

- [Transforms...](transforms.md#props)

- **`borderStyle`**: enum('solid', 'dotted', 'dashed')

- **`backfaceVisibility`**: enum('visible', 'hidden')

- **`borderBottomColor`**: string

- **`borderBottomLeftRadius`**: number

- **`borderBottomRightRadius`**: number

- **`borderColor`**: string

- **`borderLeftColor`**: string

- **`borderRadius`**: number

- **`borderRightColor`**: string

- **`backgroundColor`**: string

- **`borderTopColor`**: string

- **`borderTopLeftRadius`**: number

- **`borderTopRightRadius`**: number

- **`opacity`**: number

- **`overflow`**: enum('visible', 'hidden')

- **`shadowColor`**: string

- **`shadowOffset`**: object: {width: number,height: number}

- **`shadowOpacity`**: number

- **`shadowRadius`**: number

---

### `alwaysBounceHorizontal`

When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself. The default value is true when `horizontal={true}` and false otherwise.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `alwaysBounceVertical`

When true, the scroll view bounces vertically when it reaches the end even if the content is smaller than the scroll view itself. The default value is false when `horizontal={true}` and true otherwise.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `automaticallyAdjustContentInsets`

Controls whether iOS should automatically adjust the content inset for scroll views that are placed behind a navigation bar or tab bar/ toolbar. The default value is true.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `bounces`

When true, the scroll view bounces when it reaches the end of the content if the content is larger then the scroll view along the axis of the scroll direction. When false, it disables all bouncing even if the `alwaysBounce*` props are true. The default value is true.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `bouncesZoom`

When true, gestures can drive zoom past min/max and the zoom will animate to the min/max value at gesture end, otherwise the zoom will not exceed the limits.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `canCancelContentTouches`

When false, once tracking starts, won't try to drag if the touch moves. The default value is true.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `centerContent`

When true, the scroll view automatically centers the content when the content is smaller than the scroll view bounds; when the content is larger than the scroll view, this property has no effect. The default value is false.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `horizontal`

When true, the scroll view's children are arranged horizontally in a row instead of vertically in a column. The default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `contentOffset`

Used to manually set the starting scroll offset. The default value is `{x: 0, y: 0}`.

| Type          | Required | Platform |
| ------------- | -------- | -------- |
| PointPropType | No       | iOS      |

---

### `decelerationRate`

A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger. Reasonable choices include

- Normal: 0.998 (the default)
- Fast: 0.9

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `directionalLockEnabled`

When true, the ScrollView will try to lock to only vertical or horizontal scrolling while dragging. The default value is false.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `maximumZoomScale`

The maximum allowed zoom scale. The default value is 1.0.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `minimumZoomScale`

The minimum allowed zoom scale. The default value is 1.0.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `onScrollAnimationEnd`

Called when a scrolling animation ends.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `pagingEnabled`

When true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination. The default value is false.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `scrollEnabled`

When false, the content does not scroll. The default value is true.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `scrollEventThrottle`

This controls how often the scroll event will be fired while scrolling (in events per seconds). A higher number yields better accuracy for code that is tracking the scroll position, but can lead to scroll performance problems due to the volume of information being send over the bridge. The default value is zero, which means the scroll event will be sent only once each time the view is scrolled.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `scrollIndicatorInsets`

The amount by which the scroll view indicators are inset from the edges of the scroll view. This should normally be set to the same value as the `contentInset`. Defaults to `{0, 0, 0, 0}`.

| Type                                                               | Required | Platform |
| ------------------------------------------------------------------ | -------- | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       | iOS      |

---

### `scrollsToTop`

When true, the scroll view scrolls to top when the status bar is tapped. The default value is true.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `snapToAlignment`

When `snapToInterval` is set, `snapToAlignment` will define the relationship of the the snapping to the scroll view.

- `start` (the default) will align the snap at the left (horizontal) or top (vertical)
- `center` will align the snap in the center
- `end` will align the snap at the right (horizontal) or bottom (vertical)

| Type                           | Required | Platform |
| ------------------------------ | -------- | -------- |
| enum('start', 'center', 'end') | No       | iOS      |

---

### `snapToInterval`

When set, causes the scroll view to stop at multiples of the value of `snapToInterval`. This can be used for paginating through children that have lengths smaller than the scroll view. Used in combination with `snapToAlignment`.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

---

### `stickyHeaderIndices`

An array of child indices determining which children get docked to the top of the screen when scrolling. For example, passing `stickyHeaderIndices={[0]}` will cause the first child to be fixed to the top of the scroll view. This property is not supported in conjunction with `horizontal={true}`.

| Type            | Required | Platform |
| --------------- | -------- | -------- |
| array of number | No       | iOS      |

---

### `zoomScale`

The current scale of the scroll view content. The default value is 1.0.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| number | No       | iOS      |

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

---

### `handleScroll()`

```jsx
handleScroll((e: Event));
```

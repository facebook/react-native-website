---
id: version-0.30-progressbarandroid
title: ProgressBarAndroid
original_id: progressbarandroid
---

React component that wraps the Android-only `ProgressBar`. This component is used to indicate that the app is loading or there is some activity in the app.

Example:

```
render: function() {
  var progressBar =
    <View style={styles.container}>
      <ProgressBar styleAttr="Inverse" />
    </View>;

  return (
    <MyLoadingComponent
      componentView={componentView}
      loadingView={progressBar}
      style={styles.loadingComponent}
    />
  );
},
```

### Props

- [View props...](view.md#props)

* [`color`](progressbarandroid.md#color)
* [`indeterminate`](progressbarandroid.md#indeterminate)
* [`progress`](progressbarandroid.md#progress)
* [`styleAttr`](progressbarandroid.md#styleattr)
* [`testID`](progressbarandroid.md#testid)

---

# Reference

## Props

### `color`

Color of the progress bar.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `indeterminate`

If the progress bar will show indeterminate progress. Note that this can only be false if styleAttr is Horizontal.

| Type              | Required |
| ----------------- | -------- |
| indeterminateType | No       |

---

### `progress`

The progress value (between 0 and 1).

| Type                  | Required |
| --------------------- | -------- |
| ReactPropTypes.number | No       |

---

### `styleAttr`

Style of the ProgressBar. One of:

- Horizontal
- Normal (default)
- Small
- Large
- Inverse
- SmallInverse
- LargeInverse

| Type                                   | Required |
| -------------------------------------- | -------- |
| ReactPropTypes.oneOf(STYLE_ATTRIBUTES) | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type                  | Required |
| --------------------- | -------- |
| ReactPropTypes.string | No       |

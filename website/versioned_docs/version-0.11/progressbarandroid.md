---
id: version-0.11-progressbarandroid
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

- [`styleAttr`](progressbarandroid.md#styleattr)
- [`testID`](progressbarandroid.md#testid)

---

# Reference

## Props

### `styleAttr`

Style of the ProgressBar. One of:

- Horizontal
- Small
- Large
- Inverse
- SmallInverse
- LargeInverse

| Type                                                                            | Required |
| ------------------------------------------------------------------------------- | -------- |
| enum('Horizontal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

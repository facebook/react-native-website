---
id: refreshcontrol
title: RefreshControl
---

This component is used inside a ScrollView or ListView to add pull to refresh functionality. When the ScrollView is at `scrollY: 0`, swiping down triggers an `onRefresh` event.

### Usage example

```javascript
class RefreshableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        ...
      >
      ...
      </ListView>
    );
  }
  ...
}
```

**Note:** `refreshing` is a controlled prop, this is why it needs to be set to true in the `onRefresh` function otherwise the refresh indicator will stop immediately.

### Props

* [View props...](view.md#props)

- [`refreshing`](refreshcontrol.md#refreshing)
- [`onRefresh`](refreshcontrol.md#onrefresh)
- [`colors`](refreshcontrol.md#colors)
- [`enabled`](refreshcontrol.md#enabled)
- [`progressBackgroundColor`](refreshcontrol.md#progressbackgroundcolor)
- [`progressViewOffset`](refreshcontrol.md#progressviewoffset)
- [`size`](refreshcontrol.md#size)
- [`tintColor`](refreshcontrol.md#tintcolor)
- [`title`](refreshcontrol.md#title)
- [`titleColor`](refreshcontrol.md#titlecolor)

---

# 文档

## Props

### `refreshing`

Whether the view should be indicating an active refresh.

| 类型 | 必填 |
| ---- | -------- |
| bool | 是      |

---

### `onRefresh`

Called when the view starts refreshing.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `colors`

The colors (at least one) that will be used to draw the refresh indicator.

| 类型                        | 必填 | 平台 |
| --------------------------- | -------- | -------- |
| array of [color](colors.md) | 否       | Android  |

---

### `enabled`

Whether the pull to refresh functionality is enabled.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | Android  |

---

### `progressBackgroundColor`

The background color of the refresh indicator.

| 类型               | 必填 | 平台 |
| ------------------ | -------- | -------- |
| [color](colors.md) | 否       | Android  |

---

### `progressViewOffset`

Progress view top offset

| 类型   | 必填 | 平台 |
| ------ | -------- | -------- |
| number | 否       | Android  |

---

### `size`

Size of the refresh indicator, see RefreshControl.SIZE.

| 类型                                                                   | 必填 | 平台 |
| ---------------------------------------------------------------------- | -------- | -------- |
| enum(RefreshLayoutConsts.SIZE.DEFAULT, RefreshLayoutConsts.SIZE.LARGE) | 否       | Android  |

---

### `tintColor`

The color of the refresh indicator.

| 类型               | 必填 | 平台 |
| ------------------ | -------- | -------- |
| [color](colors.md) | 否       | iOS      |

---

### `title`

The title displayed under the refresh indicator.

| 类型   | 必填 | 平台 |
| ------ | -------- | -------- |
| string | 否       | iOS      |

---

### `titleColor`

Title color.

| 类型               | 必填 | 平台 |
| ------------------ | -------- | -------- |
| [color](colors.md) | 否       | iOS      |

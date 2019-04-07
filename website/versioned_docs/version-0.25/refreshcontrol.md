---
id: version-0.25-refreshcontrol
title: RefreshControl
original_id: refreshcontrol
---

This component is used inside a ScrollView or ListView to add pull to refresh functionality. When the ScrollView is at `scrollY: 0`, swiping down triggers an `onRefresh` event.

### Usage example

```js
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

**Note:** `refreshing` is a controlled prop, this is why it needs to be set to true in the `onRefresh` function otherwise the refresh indicator will stop immediatly.

### Props

- [View props...](view.md#props)

* [`onRefresh`](refreshcontrol.md#onrefresh)
* [`refreshing`](refreshcontrol.md#refreshing)
* [`colors`](refreshcontrol.md#colors)
* [`enabled`](refreshcontrol.md#enabled)
* [`progressBackgroundColor`](refreshcontrol.md#progressbackgroundcolor)
* [`size`](refreshcontrol.md#size)
* [`tintColor`](refreshcontrol.md#tintcolor)
* [`title`](refreshcontrol.md#title)
* [`titleColor`](refreshcontrol.md#titlecolor)

---

# Reference

## Props

### `onRefresh`

Called when the view starts refreshing.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `refreshing`

Whether the view should be indicating an active refresh.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `colors`

The colors (at least one) that will be used to draw the refresh indicator.

| Type                        | Required | Platform |
| --------------------------- | -------- | -------- |
| array of [color](colors.md) | No       | Android  |

---

### `enabled`

Whether the pull to refresh functionality is enabled.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `progressBackgroundColor`

The background color of the refresh indicator.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | Android  |

---

### `size`

Size of the refresh indicator, see RefreshControl.SIZE.

| Type                             | Required | Platform |
| -------------------------------- | -------- | -------- |
| RefreshLayoutConsts.SIZE.DEFAULT | No       | Android  |

---

### `tintColor`

The color of the refresh indicator.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |

---

### `title`

The title displayed under the refresh indicator.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |

---

### `titleColor`

Title color.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |

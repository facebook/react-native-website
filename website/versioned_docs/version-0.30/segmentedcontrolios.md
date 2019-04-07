---
id: version-0.30-segmentedcontrolios
title: SegmentedControlIOS
original_id: segmentedcontrolios
---

Use `SegmentedControlIOS` to render a UISegmentedControl iOS.

#### Programmatically changing selected index

The selected index can be changed on the fly by assigning the selectIndex prop to a state variable, then changing that variable. Note that the state variable would need to be updated as the user selects a value and changes the index, as shown in the example below.

```
<SegmentedControlIOS
  values={['One', 'Two']}
  selectedIndex={this.state.selectedIndex}
  onChange={(event) => {
    this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
  }}
/>
```

### Props

- [View props...](view.md#props)

* [`enabled`](segmentedcontrolios.md#enabled)
* [`momentary`](segmentedcontrolios.md#momentary)
* [`onChange`](segmentedcontrolios.md#onchange)
* [`onValueChange`](segmentedcontrolios.md#onvaluechange)
* [`selectedIndex`](segmentedcontrolios.md#selectedindex)
* [`tintColor`](segmentedcontrolios.md#tintcolor)
* [`values`](segmentedcontrolios.md#values)

---

# Reference

## Props

### `enabled`

If false the user won't be able to interact with the control. Default value is true.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `momentary`

If true, then selecting a segment won't persist visually. The `onValueChange` callback will still work as expected.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `onChange`

Callback that is called when the user taps a segment; passes the event as an argument

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `onValueChange`

Callback that is called when the user taps a segment; passes the segment's value as an argument

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `selectedIndex`

The index in `props.values` of the segment to be (pre)selected.

| Type             | Required |
| ---------------- | -------- |
| PropTypes.number | No       |

---

### `tintColor`

Accent color of the control.

| Type             | Required |
| ---------------- | -------- |
| PropTypes.string | No       |

---

### `values`

The labels for the control's segment buttons, in order.

| Type                                | Required |
| ----------------------------------- | -------- |
| PropTypes.arrayOf(PropTypes.string) | No       |

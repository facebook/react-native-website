---
id: version-0.30-datepickerios
title: DatePickerIOS
original_id: datepickerios
---

Use `DatePickerIOS` to render a date/time picker (selector) on iOS. This is a controlled component, so you must hook in to the `onDateChange` callback and update the `date` prop in order for the component to update, otherwise the user's change will be reverted immediately to reflect `props.date` as the source of truth.

### Props

- [View props...](view.md#props)

* [`date`](datepickerios.md#date)
* [`maximumDate`](datepickerios.md#maximumdate)
* [`minimumDate`](datepickerios.md#minimumdate)
* [`minuteInterval`](datepickerios.md#minuteinterval)
* [`mode`](datepickerios.md#mode)
* [`onDateChange`](datepickerios.md#ondatechange)
* [`timeZoneOffsetInMinutes`](datepickerios.md#timezoneoffsetinminutes)

---

# Reference

## Props

### `date`

The currently selected date.

| Type                                  | Required |
| ------------------------------------- | -------- |
| PropTypes.instanceOf(Date).isRequired | No       |

---

### `maximumDate`

Maximum date.

Restricts the range of possible date/time values.

| Type                       | Required |
| -------------------------- | -------- |
| PropTypes.instanceOf(Date) | No       |

---

### `minimumDate`

Minimum date.

Restricts the range of possible date/time values.

| Type                       | Required |
| -------------------------- | -------- |
| PropTypes.instanceOf(Date) | No       |

---

### `minuteInterval`

The interval at which minutes can be selected.

| Type                                                    | Required |
| ------------------------------------------------------- | -------- |
| PropTypes.oneOf([1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30]) | No       |

---

### `mode`

The date picker mode.

| Type                                          | Required |
| --------------------------------------------- | -------- |
| PropTypes.oneOf(['date', 'time', 'datetime']) | No       |

---

### `onDateChange`

Date change handler.

This is called when the user changes the date or time in the UI. The first and only argument is a Date object representing the new date and time.

| Type                      | Required |
| ------------------------- | -------- |
| PropTypes.func.isRequired | No       |

---

### `timeZoneOffsetInMinutes`

Timezone offset in minutes.

By default, the date picker will use the device's timezone. With this parameter, it is possible to force a certain timezone offset. For instance, to show times in Pacific Standard Time, pass -7 \* 60.

| Type             | Required |
| ---------------- | -------- |
| PropTypes.number | No       |

---
id: datepickerandroid
title: '🚧 DatePickerAndroid'
---

> **Deprecated.** Use one of the [community packages](https://reactnative.directory/?search=datepicker) instead.

Opens the standard Android date picker dialog.

### Example

```jsx
try {
  const { action, year, month, day } =
    await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(2020, 4, 25)
    });
  if (action !== DatePickerAndroid.dismissedAction) {
    // Selected year, month (0-11), day
  }
} catch ({ code, message }) {
  console.warn('Cannot open date picker', message);
}
```

---

# Reference

## Methods

### `open()`

```jsx
static open(options)
```

Opens the standard Android date picker dialog.

The available keys for the `options` object are:

- `date` (`Date` object or timestamp in milliseconds) - date to show by default
- `minDate` (`Date` or timestamp in milliseconds) - minimum date that can be selected
- `maxDate` (`Date` object or timestamp in milliseconds) - maximum date that can be selected
- `mode` (`enum('calendar', 'spinner', 'default')`) - To set the date-picker mode to calendar/spinner/default
  - 'calendar': Show a date picker in calendar mode.
  - 'spinner': Show a date picker in spinner mode.
  - 'default': Show a default native date picker(spinner/calendar) based on android versions.

Returns a Promise which will be invoked an object containing `action`, `year`, `month` (0-11), `day` if the user picked a date. If the user dismissed the dialog, the Promise will still be resolved with action being `DatePickerAndroid.dismissedAction` and all the other keys being undefined. **Always** check whether the `action` is equal to `DatePickerAndroid.dateSetAction` before reading the values.

Note the native date picker dialog has some UI glitches on Android 4 and lower when using the `minDate` and `maxDate` options.

---

### `dateSetAction()`

```jsx
static dateSetAction()
```

A date has been selected.

---

### `dismissedAction()`

```jsx
static dismissedAction()
```

The dialog has been dismissed.

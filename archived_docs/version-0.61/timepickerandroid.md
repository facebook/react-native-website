---
id: version-0.61-timepickerandroid
title: 🚧 TimePickerAndroid
original_id: timepickerandroid
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

> **Deprecated.** Use [@react-native-community/datetimepicker](https://github.com/react-native-community/react-native-datetimepicker) instead.

本组件会打开一个标准的 Android 时间选择器的对话框。

### 示例

```
try {
  const {action, hour, minute} = await TimePickerAndroid.open({
    hour: 14,
    minute: 0,
    is24Hour: false, // Will display '2 PM'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    // Selected hour (0-23), minute (0-59)
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}
```

---

# 文档

## 方法

### `open()`

```jsx
static open(options)
```

打开一个标准的 Android 时间选择器的对话框。

可选的`options`对象的 key 值如下：

- `hour` (0-23) - 要显示的小时，默认为当前时间。
- `minute` (0-59) - 要显示的分钟，默认为当前时间。
- `is24Hour` (boolean) - 如果设为`true`，则选择器会使用 24 小时制。如果设为`false`，则会额外显示 AM/PM 的选项。如果不设定，则采取当前地区的默认设置。
- `mode` (`enum('clock', 'spinner', 'default')`) - set the time picker mode
  - 'clock': Show a time picker in clock mode.
  - 'spinner': Show a time picker in spinner mode.
  - 'default': Show a default time picker based on Android versions.

在用户选好时间后返回一个 Promise，回调参数为一个对象，其中包含有`action`, `hour` (0-23), `minute` (0-59)。如果用户取消了对话框，Promise 仍然会执行，返回的 action 为`TimePickerAndroid.dismissedAction`，其他几项参数则为 undefined. 所以请在使用其他值之前**务必**先检查`action`的值。

---

### `timeSetAction()`

```jsx
static timeSetAction()
```

已选中一个时间。

---

### `dismissedAction()`

```jsx
static dismissedAction()
```

对话框被取消。

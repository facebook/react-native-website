---
id: version-0.55-datepickerandroid
title: DatePickerAndroid
original_id: datepickerandroid
---

本组件会打开一个标准的 Android 日期选择器的对话框。

### 示例

```
try {
  const {action, year, month, day} = await DatePickerAndroid.open({
    // 要设置默认值为今天的话，使用`new Date()`即可。
    // 下面显示的会是2020年5月25日。月份是从0开始算的。
    date: new Date(2020, 4, 25)
  });
  if (action !== DatePickerAndroid.dismissedAction) {
    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
  }
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
```

### 查看方法

* [`open`](datepickerandroid.md#open)
* [`dateSetAction`](datepickerandroid.md#datesetaction)
* [`dismissedAction`](datepickerandroid.md#dismissedaction)

---

# 文档

## 方法

### `open()`

```javascript
static open(options)
```

打开一个标准的 Android 日期选择器的对话框。

可选的`options`对象的 key 值如下：

* `date` (`Date`对象或毫秒时间戳) - 默认显示的日期
* `minDate` (`Date`对象或毫秒时间戳) - 可选的最小日期
* `maxDate` (`Date`对象或毫秒时间戳) - 可选的最大日期
* `mode` (`enum('calendar', 'spinner', 'default')`) - 设置选择器的模式：
  * 'calendar': Show a date picker in calendar mode.
  * 'spinner': Show a date picker in spinner mode.
  * 'default': Show a default native date picker(spinner/calendar) based on android versions.

在用户选好日期后返回一个 Promise，回调参数为一个对象，其中包含有`action`, `year`, `month` (0-11), `day`。如果用户取消了对话框，Promise 仍然会执行，返回的 action 为`DatePickerAndroid.dismissedAction`，其他几项参数则为 undefined。所以请在使用其他值之前**务必**先检查`action`的值。

Note the native date picker dialog has some UI glitches on Android 4 and lower when using the `minDate` and `maxDate` options.

---

### `dateSetAction()`

```javascript
static dateSetAction()
```

已选中一个日期。

---

### `dismissedAction()`

```javascript
static dismissedAction()
```

对话框已被取消。

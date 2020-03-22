---
id: version-0.61-datepickerios
title: 🚧 DatePickerIOS
original_id: datepickerios
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

> **Deprecated.** Use [@react-native-community/datetimepicker](https://github.com/react-native-community/react-native-datetimepicker) instead.

使用`DatePickerIOS`来在 iOS 平台上渲染一个日期/时间选择器。这是一个受约束的(Controlled)组件，所以你必须监听`onDateChange`回调函数并且及时更新`date`属性来使得组件更新，否则用户的修改会立刻被撤销来确保当前显示值和`props.date`一致。

### 示例

```
import React, { Component } from 'react'
import {
  DatePickerIOS,
  View,
  StyleSheet,
} from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

  render() {
    return (
      <View style={styles.container}>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})
```

<center><img src="assets/DatePickerIOS/example.gif" width="360"></img></center>

---

# 文档

## Props

### `date`

当前被选中的日期。

| 类型 | 必填 |
| ---- | ---- |
| Date | 是   |

---

### `onChange`

Date change handler.

This is called when the user changes the date or time in the UI. The first and only argument is an Event. For getting the date the picker was changed to, use onDateChange instead.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDateChange`

日期/时间变化的监听函数。

当用户修改日期或时间时调用此回调函数。唯一的参数是一个日期对象，表示新的日期和时间。

| 类型     | 必填 |
| -------- | ---- |
| function | 是   |

---

### `maximumDate`

可选的最大日期。

限制可选的日期/时间范围。

| 类型 | 必填 |
| ---- | ---- |
| Date | 否   |

Example with `maximumDate` set to December 31, 2017:

<center><img src="assets/DatePickerIOS/maximumDate.gif" width="360"></img></center>

---

### `minimumDate`

可选的最小日期。

限制可选的日期/时间范围。

| 类型 | 必填 |
| ---- | ---- |
| Date | 否   |

See [`maximumDate`](datepickerios.md#maximumdate) for an example image.

---

### `minuteInterval`

可选的最小的分钟单位。

| 类型                                       | 必填 |
| ------------------------------------------ | ---- |
| enum(1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30) | 否   |

Example with `minuteInterval` set to `10`:

<center><img src="assets/DatePickerIOS/minuteInterval.png" width="360"></img></center>

---

### `mode`

选择器模式。

| Type                                          | Required |
| --------------------------------------------- | -------- |
| enum('date', 'time', 'datetime', 'countdown') | No       |

Example with `mode` set to `date`, `time`, and `datetime`: ![](assets/DatePickerIOS/mode.png)

---

### `locale`

The locale for the date picker. Value needs to be a [Locale ID](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html).

| 类型   | 必填 |
| ------ | ---- |
| String | 否   |

---

### `timeZoneOffsetInMinutes`

时区差，单位是分钟。

默认情况下，选择器会选择设备的默认时区。通过此参数，可以指定一个时区。举个例子，要使用北京时间（东八区），可以传递 8 \* 60。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `initialDate`

Provides an initial value that will change when the user starts selecting a date. It is useful for simple use-cases where you do not want to deal with listening to events and updating the date prop to keep the controlled state in sync. The controlled state has known bugs which causes it to go out of sync with native. The initialDate prop is intended to allow you to have native be source of truth.

| Type | Required |
| ---- | -------- |
| Date | No       |

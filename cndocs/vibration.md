---
id: vibration
title: Vibration
---

本模块导出函数`Vibration.vibrate()`用于控制设备震动。震动触发是异步的，也就是说这个函数会立即返回而非等待震动结束。

在不支持震动的设备上（如iOS模拟器），调用此方法没有任何效果。

**注意**对于android来说需要在`AndroidManifest.xml`中添加`<uses-permission android:name="android.permission.VIBRATE"/>`权限。

由于**在iOS上无法设置震动的持续时间**，所以这一API在两个平台上的使用和表现有所差异。In Android, if `pattern` is a number, it specifies the vibration duration in ms. If `pattern` is an array, those odd indices are the vibration duration, while the even ones are the separation time.

In iOS, invoking `vibrate(duration)` will just ignore the duration and vibrate for a fixed time. While the `pattern` array is used to define the duration between each vibration. See below example for more.

Repeatable vibration is also supported, the vibration will repeat with defined pattern until `cancel()` is called.

Example:

```
const DURATION = 10000
const PATTERN = [1000, 2000, 3000]

Vibration.vibrate(DURATION)
// Android: vibrate for 10s
// iOS: duration is not configurable, vibrate for fixed time (about 500ms)

Vibration.vibrate(PATTERN)
// Android: wait 1s -> vibrate 2s -> wait 3s
// iOS: wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate

Vibration.vibrate(PATTERN, true)
// Android: wait 1s -> vibrate 2s -> wait 3s -> wait 1s -> vibrate 2s -> wait 3s -> ...
// iOS: wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate -> wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate -> ...

Vibration.cancel()
// Android: vibration stopped
// iOS: vibration stopped
```

### 查看方法

* [`vibrate`](vibration.md#vibrate)
* [`cancel`](vibration.md#cancel)

---

# 文档

## 方法

### `vibrate()`

```javascript
Vibration.vibrate(pattern: number, Array<number>, repeat: boolean)
```

Trigger a vibration with specified `pattern`.

**参数：**

| 名称    | 类型                    | 必填 | 说明                                                          |
| ------- | ----------------------- | ---- | ------------------------------------------------------------- |
| pattern | number or Array<number> | 是   | 震动的模式，可以以数字或数组的形式定义。默认为震动400ms。     |
| repeat  | boolean                 | 否   | 表示是否持续循环震动，直到调用cancel()才会停止。默认为false。 |

---

### `cancel()`

```javascript
Vibration.cancel();
```

停止震动。

```
Vibration.cancel()
```

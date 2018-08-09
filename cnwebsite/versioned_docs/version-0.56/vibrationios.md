---
id: version-0.56-vibrationios
title: VibrationIOS
original_id: vibrationios
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

注意：`VibrationIOS`已经过期。请使用[`Vibration`](vibration.md)代替。

本模块导出函数`VibrationIOS.vibrate()`用于控制设备震动。在 iOS 设备上，调用这个函数会触发一个一秒钟的震动。震动触发是异步的，也就是说这个函数会立即返回而非等待震动结束。

在不支持震动的设备上（如 iOS 模拟器），调用此方法没有任何效果。

震动模式设置现在还不支持。

### 查看方法

- [`vibrate`](vibrationios.md#vibrate)

---

# 文档

## 方法

### `vibrate()`

```javascript
static vibrate()
```

@deprecated

---
id: version-0.22-vibrationios
title: VibrationIOS
original_id: vibrationios
---

NOTE: `VibrationIOS` is being deprecated. Use `Vibration` instead.

The Vibration API is exposed at `VibrationIOS.vibrate()`. On iOS, calling this function will trigger a one second vibration. The vibration is asynchronous so this method will return immediately.

There will be no effect on devices that do not support Vibration, eg. the iOS simulator.

Vibration patterns are currently unsupported.

### Methods

- [`vibrate`](vibrationios.md#vibrate)

---

# Reference

## Methods

### `vibrate()`

```javascript
static vibrate()
```

@deprecated

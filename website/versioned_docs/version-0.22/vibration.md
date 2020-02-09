---
id: version-0.22-vibration
title: Vibration
original_id: vibration
---

The Vibration API is exposed at `Vibration.vibrate()`. The vibration is synchronous so this method will return immediately.

There will be no effect on devices that do not support Vibration, eg. the simulator.

Note for android add `<uses-permission android:name="android.permission.VIBRATE"/>` to `AndroidManifest.xml`

Vibration patterns are currently unsupported.

### Methods

- [`vibrate`](vibration.md#vibrate)

---

# Reference

## Methods

### `vibrate()`

```jsx
static vibrate(duration)
```

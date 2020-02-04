---
id: vibration
title: Vibration
---

The Vibration API is exposed at `Vibration.vibrate()`. The vibration is synchronous so this method will return immediately. There will be no effect on devices that do not support vibration, such as the iOS Simulator or Android emulator.

The `vibrate()` method can take a duration or pattern argument. On Android, if `pattern` is a number, it specifies the vibration duration in milliseconds. If `pattern` is an array, those odd indices are the vibration duration, while the even ones are the separation time. On iOS, this argument will have no effect as the `vibrate()` method invokes a simple `AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)` call (e.g. a fixed time vibration).

Repeatable vibration is also supported on Android, in which case the vibration will repeat with the defined pattern until `cancel()` is called.

> Android apps should request the `android.permission.VIBRATE` permission by adding `<uses-permission android:name="android.permission.VIBRATE"/>` to `AndroidManifest.xml`.

**Example**

```jsx
// iOS and Android: Vibrate for a fixed time (about 500ms)
Vibration.vibrate();

// Android:
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

// Vibrate for 10 seconds:
Vibration.vibrate(10 * ONE_SECOND_IN_MS);

// Wait one second, then vibrate for two seconds:
Vibration.vibrate(PATTERN);

// Wait one second, vibrate for two seconds, wait three seconds, repeat.
Vibration.vibrate(PATTERN, true);

// Stop vibration:
Vibration.cancel();
```

---

# Reference

## Methods

### `vibrate()`

```jsx
Vibration.vibrate(?pattern: number, Array<number>, ?repeat: boolean)
```

Trigger a vibration.

The `vibrate()` method can take a pattern argument. On Android, if `pattern` is a number, it specifies the vibration duration in milliseconds. If `pattern` is an array, those odd indices are the vibration duration, while the even ones are the separation time. You may set `repeat` to true to run through the vibration pattern in a loop until `cancel()` is called.

> On iOS, passing any arguments to `vibrate()` will have no effect as the Vibration API is implemented as a `AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)` call, which is of fixed time vibration.

**Parameters:**

| Name    | Type                    | Required | Description                                                                   | Platform |
| ------- | ----------------------- | -------- | ----------------------------------------------------------------------------- | -------- |
| pattern | number or Array<number> | No       | Vibration pattern, accept a number or an array of numbers. Defaults to 400ms. | Android  |
| repeat  | boolean                 | No       | Repeat vibration pattern until cancel(), default to false.                    | Android  |

---

### `cancel()`

```jsx
Vibration.cancel();
```

Call this to stop vibrating after having invoked `vibrate()` with repetition enabled.

| Platform |
| -------- |
| Android  |

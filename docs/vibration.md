---
id: vibration
title: Vibration
---

The Vibration API is exposed at `Vibration.vibrate()`. The vibration is synchronous so this method will return immediately. There will be no effect on devices that do not support vibration, such as the iOS Simulator or Android emulator.

The `vibrate()` method can take a duration or pattern argument. On Android, if `pattern` is a number, it specifies the vibration duration in milliseconds (the vibration is of fixed length on iOS). If `pattern` is an array, those odd indices are the vibration duration, while the even ones are the separation time.

Repeatable vibration is also supported, in which case the vibration will repeat with the defined pattern until `cancel()` is called.

> Android apps should request the `android.permission.VIBRATE` permission by adding `<uses-permission android:name="android.permission.VIBRATE"/>` to `AndroidManifest.xml`.

**Example**

```jsx
// Vibrate for a fixed time
Vibration.vibrate();

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

// Vibrate for 10 seconds on Android (iOS will vibrate for a fixed time):
Vibration.vibrate(10 * ONE_SECOND_IN_MS);

// Wait one second, then vibrate for two seconds (see PATTERN above):
Vibration.vibrate(PATTERN);

// Perform the same vibration pattern, repeatedly, until cancel() is called.
Vibration.vibrate(PATTERN, true);

// Stop vibration pattern:
Vibration.cancel();
```

---

# Reference

## Methods

### `vibrate()`

```jsx
Vibration.vibrate(?pattern: number | Array<number>, ?repeat: boolean)
```

Trigger a vibration.

The `vibrate()` method can take a `pattern` argument. If `pattern` is an array, those odd indices are the vibration duration, while the even ones are the separation time. You may set `repeat` to true to run through the vibration pattern in a loop until `cancel()` is called. On Android, if `pattern` is a number, it specifies the vibration duration in milliseconds.

> The Vibration API is implemented as a `AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)` call on iOS. The vibration time is roughly 400 milliseconds.

**Parameters:**

| Name    | Type          | Required | Description                                                | Platform      |
| ------- | ------------- | -------- | ---------------------------------------------------------- | ------------- |
| pattern | number        | No       | Vibration duration in milliseconds. Defaults to 400 ms.    | Android       |
| pattern | Array<number> | No       | Vibration pattern as an array of numbers in milliseconds.  | Android, iOS  |
| repeat  | boolean       | No       | Repeat vibration pattern until cancel(), default to false. | Android , iOS |

---

### `cancel()`

```jsx
Vibration.cancel();
```

Call this to stop vibrating after having invoked `vibrate()` with repetition enabled.

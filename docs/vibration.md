---
id: vibration
title: Vibration
---

The Vibration API is exposed at `Vibration.vibrate()`. The vibration is synchronous so this method will return immediately.

There will be no effect on devices that do not support vibration, such as the iOS Simulator or Android emulator.

<div class="toggler">
  <span>Developer Notes</span>
  <span role="tablist" class="toggle-devNotes">
    <button role="tab" class="button-webNote" onclick="displayTabs('devNotes', 'webNote')">Android</button>
    <button role="tab" class="button-iosNote" onclick="displayTabs('devNotes', 'iosNote')">iOS</button>
  </span>
</div>

<block class="webNote devNotes" />

> Add `<uses-permission android:name="android.permission.VIBRATE"/>` to `AndroidManifest.xml`

In Android, if `pattern` is a number, it specifies the vibration duration in ms. If `pattern` is an array, those odd indices are the vibration duration, while the even ones are the separation time.

Repeatable vibration is also supported, the vibration will repeat with defined pattern until `cancel()` is called.

**Example**

```jsx
const DURATION = 10000;
const PATTERN = [1000, 2000, 3000];

Vibration.vibrate(DURATION);
// Vibrate for 10s

Vibration.vibrate(PATTERN);
// Wait 1s -> vibrate 2s -> wait 3s

Vibration.vibrate(PATTERN, true);
// Wait 1s -> vibrate 2s -> wait 3s -> wait 1s -> vibrate 2s -> wait 3s -> ...

Vibration.cancel();
// Stop vibration.
```

<block class="iosNote devNotes" />

> The vibration duration is not configurable on iOS. Invoking `vibrate(duration)` will ignore the duration, and vibrate for a fixed time. Vibrating with a pattern is not supported on iOS, either.

**Example**

```jsx
Vibration.vibrate();
// Vibrate for a fixed time (about 500ms)
```

<block class="endBlock devNotes" />

---

# Reference

## Methods

### `vibrate()`

```jsx
Vibration.vibrate(pattern: number, Array<number>, repeat: boolean)
```

Trigger a vibration.

**On Android,** a pattern of vibrations can be specified, as well as whether to keep vibrating until cancelled.

**Parameters:**

| Name    | Type                    | Required | Description                                                                  | Platform |
| ------- | ----------------------- | -------- | ---------------------------------------------------------------------------- | -------- |
| pattern | number or Array<number> | Yes      | Vibration pattern, accept a number or an array of numbers. Default to 400ms. | Android  |
| repeat  | boolean                 | No       | Repeat vibration pattern until cancel(), default to false.                   | Android  |

---

### `cancel()`

```jsx
Vibration.cancel();
```

**Android-Only.** Stop vibration.

| Platform |
| -------- |
| Android  |

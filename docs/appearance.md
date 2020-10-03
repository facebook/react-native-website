---
id: appearance
title: Appearance
---

```jsx
import { Appearance } from 'react-native';
```

The `Appearance` module exposes information about the user's appearance preferences, such as their preferred color scheme (light or dark).

<div class="toggler">
  <span>Developer Notes</span>
  <span role="tablist" class="toggle-devNotes">
    <button role="tab" class="button-webNote" onclick="displayTabs('devNotes', 'webNote')">Web</button>
    <button role="tab" class="button-androidNote" onclick="displayTabs('devNotes', 'androidNote')">Android</button>
    <button role="tab" class="button-iosNote" onclick="displayTabs('devNotes', 'iosNote')">iOS</button>
  </span>
</div>

<block class="webNote devNotes" />

> The `Appearance` API is inspired by the [Media Queries draft](https://drafts.csswg.org/mediaqueries-5/) from the W3C. The color scheme preference is modeled after the [`prefers-color-scheme` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

<block class="androidNote devNotes" />

> The color scheme preference will map to the user's Light or [Dark theme](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme) preference on Android 10 (API level 29) devices and higher.

<block class="iosNote devNotes" />

> The color scheme preference will map to the user's Light or [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/) preference on iOS 13 devices and higher.

<block class="endBlock devNotes" />

## Example

You can use the `Appearance` module to determine if the user prefers a dark color scheme:

```jsx
const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  // Use dark color scheme
}
```

Although the color scheme is available immediately, this may change (e.g. scheduled color scheme change at sunrise or sunset). Any rendering logic or styles that depend on the user preferred color scheme should try to call this function on every render, rather than caching the value. For example, you may use the [`useColorScheme`](usecolorscheme) React hook as it provides and subscribes to color scheme updates, or you may use inline styles rather than setting a value in a `StyleSheet`.

# Reference

## Methods

### `getColorScheme()`

```jsx
static getColorScheme()
```

Indicates the current user preferred color scheme. The value may be updated later, either through direct user action (e.g. theme selection in device settings) or on a schedule (e.g. light and dark themes that follow the day/night cycle).

Supported color schemes:

| Value     | Description                                         |
| --------- | --------------------------------------------------- |
| `"light"` | The user prefers a light color theme.               |
| `"dark"`  | The user prefers a dark color theme.                |
| `null`    | The user has not indicated a preferred color theme. |

> **Note:** `getColorScheme()` will always return `"light"` when debugging with browser.

See also: [`useColorScheme`](usecolorscheme) hook.

---

### `addChangeListener()`

```jsx
static addChangeListener(listener)
```

Add an event handler that is fired when appearance preferences change.

---

### `removeChangeListener()`

```jsx
static removeChangeListener(listener)
```

Remove an event handler.

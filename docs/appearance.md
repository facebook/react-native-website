---
id: appearance
title: Appearance
---

```jsx
import { Appearance } from 'react-native';
```

Exposes information about the user's appearance preferences.

You can use the Appearance module to determine if the user prefers a dark color scheme:

```jsx
const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  // Use dark color scheme
}
```

Although the color scheme is available immediately, this may change (e.g scheduled color scheme change at sunrise or sunset). Any rendering logic or styles that depend on the user preferred color scheme should try to call this function on every render, rather than caching the value (for example, using a context and the `useColorScheme` hook, or using inline styles rather than setting a value in a `StyleSheet`).

<div class="toggler">
  <span>Developer Notes</span>
  <span role="tablist" class="toggle-devNotes">
    <button role="tab" class="button-webNote" onclick="displayTabs('devNotes', 'webNote')">Web</button>
    <button role="tab" class="button-androidNote" onclick="displayTabs('devNotes', 'androidNote')">Android</button>
    <button role="tab" class="button-iosNote" onclick="displayTabs('devNotes', 'iosNote')">iOS</button>
  </span>
</div>

<block class="webNote devNotes" />

> The Appearance API is inspired by the [Media Queries draft](https://drafts.csswg.org/mediaqueries-5/) from the W3C. The color scheme preference is modeled after the [`prefers-color-scheme` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

<block class="androidNote devNotes" />

> The color scheme preference will map to the user's Light or [Dark theme](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme) preference on Android 10 (API level 29) devices and higher.

<block class="iosNote devNotes" />

> The color scheme preference will map to the user's Light or [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/) preference on iOS 13 devices and higher.

<block class="endBlock devNotes" />

### `useColorScheme` Hook

The `useColorScheme` React hook provides and subscribes to color scheme updates:

```jsx
import { Text, useColorScheme } from 'react-native';

const MyComponent = () => {
  const colorScheme = useColorScheme();
  return <Text>useColorScheme(): {colorScheme}</Text>;
};
```

You can find a complete example that demonstrates the use of this hook alongside a React context to add support for light and dark themes to your application in [`AppearanceExample.js`](https://github.com/facebook/react-native/blob/master/RNTester/js/examples/Appearance/AppearanceExample.js).

# Reference

## Methods

### `getColorScheme()`

```jsx
static getColorScheme()
```

Indicates the current user preferred color scheme. The value may be updated later, either through direct user action (e.g. theme selection in device settings) or on a schedule (e.g. light and dark themes that follow the day/night cycle).

Supported color schemes:

- `light`: The user prefers a light color theme.
- `dark`: The user prefers a dark color theme.
- null: The user has not indicated a preferred color theme.

See also: `useColorScheme` hook.

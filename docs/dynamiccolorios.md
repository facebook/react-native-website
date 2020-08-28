---
id: dynamiccolorios
title: DynamicColorIOS
---

The `DynamicColorIOS` function is a platform color type specific to iOS.

```jsx
DynamicColorIOS({ light: color, dark: color });
```

`DynamicColorIOS` takes a single argument as an object with two keys: `dark` and `light`. These correspond to the colors you want to use for "light mode" and "dark mode" on iOS.

> In the future, more keys might become available for different user preferences, like high contrast.

At runtime, the system will choose which of the two colors to display depending on the current system appearance settings. Dynamic colors are useful for branding colors or other app specific colors that still respond automatically to system setting changes.

<div class="toggler">
  <span>Developer Notes</span>
  <span role="tablist" class="toggle-devNotes">
    <button role="tab" class="button-webNote" onclick="displayTabs('devNotes', 'webNote')">Web</button>
    <button role="tab" class="button-iosNote" onclick="displayTabs('devNotes', 'iosNote')">iOS</button>
  </span>
</div>

<block class="webNote devNotes" />

> If you’re familiar with `@media (prefers-color-scheme: dark)` in CSS, this is similar! Only instead of defining all the colors in a media query, you define which color to use under what circumstances right there where you're using it. Neat!

<block class="iosNote devNotes" />

> The `DynamicColorIOS` function is similar to the iOS native methods [`UIColor colorWithDynamicProvider:`](https://developer.apple.com/documentation/uikit/uicolor/3238040-colorwithdynamicprovider)

<block class="endBlock devNotes" />

## Example

```jsx
import { DynamicColorIOS } from 'react-native';

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue'
});
```

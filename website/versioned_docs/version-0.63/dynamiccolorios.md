---
id: dynamiccolorios
title: DynamicColorIOS
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

The `DynamicColorIOS` function is a platform color type specific to iOS.

```jsx
DynamicColorIOS({ light: color, dark: color });
```

`DynamicColorIOS` takes a single argument as an object with two keys: `dark` and `light`. These correspond to the colors you want to use for "light mode" and "dark mode" on iOS.

> In the future, more keys might become available for different user preferences, like high contrast.

At runtime, the system will choose which of the two colors to display depending on the current system appearance settings. Dynamic colors are useful for branding colors or other app specific colors that still respond automatically to system setting changes.

#### Developer notes

<Tabs groupId="guide" defaultValue="web" values={constants.getDevNotesTabs(["ios", "web"])}>

<TabItem value="web">

> If you’re familiar with `@media (prefers-color-scheme: dark)` in CSS, this is similar! Only instead of defining all the colors in a media query, you define which color to use under what circumstances right there where you're using it. Neat!

</TabItem>
<TabItem value="ios">

> The `DynamicColorIOS` function is similar to the iOS native methods [`UIColor colorWithDynamicProvider:`](https://developer.apple.com/documentation/uikit/uicolor/3238040-colorwithdynamicprovider)

</TabItem>
</Tabs>

## Example

```jsx
import { DynamicColorIOS } from 'react-native';

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue'
});
```

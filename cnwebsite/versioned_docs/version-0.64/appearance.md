---
id: appearance
title: Appearance
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

```jsx
import { Appearance } from 'react-native';
```

The `Appearance` module exposes information about the user's appearance preferences, such as their preferred color scheme (light or dark).

#### 给开发者的提示

<Tabs groupId="guide" defaultValue="web" values={constants.getDevNotesTabs(["android", "ios", "web"])}>

<TabItem value="web">

> The `Appearance` API is inspired by the [Media Queries draft](https://drafts.csswg.org/mediaqueries-5/) from the W3C. The color scheme preference is modeled after the [`prefers-color-scheme` CSS media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

</TabItem>
<TabItem value="android">

> The color scheme preference will map to the user's Light or [Dark theme](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme) preference on Android 10 (API level 29) devices and higher.

</TabItem>
<TabItem value="ios">

> The color scheme preference will map to the user's Light or [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/) preference on iOS 13 devices and higher.

</TabItem>
</Tabs>

## 示例

`Appearance` 模块用来检测用户是否开启了暗色模式（夜间模式）：

```jsx
const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  // 用户开启了暗色模式
}
```

Although the color scheme is available immediately, this may change (e.g. scheduled color scheme change at sunrise or sunset). Any rendering logic or styles that depend on the user preferred color scheme should try to call this function on every render, rather than caching the value. For example, you may use the [`useColorScheme`](usecolorscheme) React hook as it provides and subscribes to color scheme updates, or you may use inline styles rather than setting a value in a `StyleSheet`.

---

# 文档

## 方法

### `getColorScheme()`

```jsx
static getColorScheme()
```

Indicates the current user preferred color scheme. The value may be updated later, either through direct user action (e.g. theme selection in device settings) or on a schedule (e.g. light and dark themes that follow the day/night cycle).

Supported color schemes:

| 取值      | 说明                       |
| --------- | -------------------------- |
| `"light"` | 用户选择了浅色模式。       |
| `"dark"`  | 用户选择了深色模式。       |
| `null`    | 用户没有明确选择某种模式。 |

> **注意：** 在使用 chrome 调试时，`getColorScheme()`将始终返回`light`。

更多说明请参考[`useColorScheme`](usecolorscheme)。

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

移除一个事件监听函数。

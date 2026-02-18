---
id: appearance
title: Appearance
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

```tsx
import {Appearance} from 'react-native';
```

`Appearance` 模块提供了用户外观偏好相关的信息，例如用户偏好的配色方案（浅色或深色）。

#### 开发者说明

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["android", "ios", "web"])}>

<TabItem value="web">

:::info
`Appearance` API 的灵感来自 W3C 的[媒体查询草案](https://drafts.csswg.org/mediaqueries-5/)。配色方案偏好基于 [`prefers-color-scheme` CSS 媒体特性](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) 建模。
:::

</TabItem>
<TabItem value="android">

:::info
在 Android 10（API level 29）及更高版本的设备上，配色方案偏好将映射到用户的浅色或[深色主题](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme)偏好。
:::

</TabItem>
<TabItem value="ios">

:::info
在 iOS 13 及更高版本的设备上，配色方案偏好将映射到用户的浅色或[深色模式](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/)偏好。
:::

:::note
截屏时，配色方案可能会在浅色和深色模式之间闪烁。这是因为 iOS 会分别在两种配色方案下拍摄快照，而配色方案的更新是异步的。
:::

</TabItem>
</Tabs>

## 示例

你可以使用 `Appearance` 模块来判断用户是否偏好深色配色方案：

```tsx
const colorScheme = Appearance.getColorScheme();
if (colorScheme === 'dark') {
  // 使用深色配色方案
}
```

虽然配色方案值可以立即获取，但它可能随时发生变化（例如在日出或日落时自动切换配色方案）。任何依赖于用户偏好配色方案的渲染逻辑或样式都应该在每次渲染时调用此函数，而不是缓存该值。例如，你可以使用 [`useColorScheme`](usecolorscheme) React Hook 来获取并订阅配色方案的更新，也可以使用内联样式而不是将值设置在 `StyleSheet` 中。

---

# 文档

## 方法

### `getColorScheme()`

```tsx
static getColorScheme(): 'light' | 'dark' | null;
```

返回当前用户偏好的配色方案。该值可能会在之后发生变化——可能由用户直接操作触发（例如在设备设置中选择主题，或通过 `setColorScheme` 在应用层面设置界面风格），也可能按计划触发（例如随昼夜更替自动切换的浅色/深色主题）。

支持的配色方案：

- `'light'`：用户偏好浅色主题。
- `'dark'`：用户偏好深色主题。
- `null`：用户未指定偏好的配色主题。

另见：`useColorScheme` hook。

:::note
使用 Chrome 调试时，`getColorScheme()` 将始终返回 `light`。
:::

---

### `setColorScheme()`

```tsx
static setColorScheme('light' | 'dark' | null): void;
```

强制应用始终采用浅色或深色界面风格。默认值为 `null`，表示应用继承系统的界面风格。如果设置了其他值，新的风格将应用于整个应用及其内部所有原生元素（Alert、Picker 等）。

支持的配色方案：

- `light`：采用浅色界面风格。
- `dark`：采用深色界面风格。
- null：跟随系统的界面风格。

:::note
此更改不会影响系统所选的界面风格，也不会影响其他应用中设置的任何风格。
:::

---

### `addChangeListener()`

```tsx
static addChangeListener(
  listener: (preferences: {colorScheme: 'light' | 'dark' | null}) => void,
): NativeEventSubscription;
```

添加一个事件监听器，在外观偏好发生变化时触发。

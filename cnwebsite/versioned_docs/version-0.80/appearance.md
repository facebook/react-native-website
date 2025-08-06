---
id: appearance
title: Appearance
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

```jsx
import { Appearance } from 'react-native';
```

`Appearance` 模块提供了关于用户外观偏好的信息，例如他们喜欢的颜色方案（明亮或暗黑）。

#### 给开发者的提示

<Tabs groupId="guide" defaultValue="web" values={constants.getDevNotesTabs(["android", "ios", "web"])}>

<TabItem value="web">

> `Appearance` API的灵感来自 W3C 的[媒体查询草案](https://drafts.csswg.org/mediaqueries-5/)。颜色方案偏好是基于[`prefers-color-scheme` CSS媒体特性](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)。

</TabItem>
<TabItem value="android">

> 用户对颜色方案的偏好将映射到 Android 10（API 级别 29）及更高版本设备上用户的浅色或[深色主题](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme)偏好。

</TabItem>
<TabItem value="ios">

> 颜色方案偏好将与用户在 iOS 13 及更高版本设备上的浅色或[深色模式](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/dark-mode/)偏好相匹配。

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

尽管颜色方案可以立即使用，但这可能会发生变化（例如，在日出或日落时计划更改颜色方案）。任何依赖于用户首选颜色方案的渲染逻辑或样式都应该在每次渲染时调用此函数，而不是缓存值。例如，您可以使用[`useColorScheme`](usecolorscheme) React钩子，因为它提供并订阅了颜色方案更新，或者您可以使用内联样式而不是在`StyleSheet`中设置值。

---

# 文档

## 方法

### `getColorScheme()`

```tsx
static getColorScheme(): 'light' | 'dark' | null;
```

指示当前用户首选的颜色方案。该值可能会在以后更新，可以通过直接用户操作（例如设备设置中的主题选择）或按计划进行（例如遵循日/夜周期的浅色和深色主题）。

支持的颜色方案：

| 取值      | 说明                       |
| --------- | -------------------------- |
| `"light"` | 用户选择了浅色模式。       |
| `"dark"`  | 用户选择了深色模式。       |
| `null`    | 用户没有明确选择某种模式。 |

> **注意：** 在使用 chrome 调试时，`getColorScheme()`将始终返回`light`。

更多说明请参考[`useColorScheme`](usecolorscheme)。

---

### `setColorScheme()`

```tsx
static setColorScheme('light' | 'dark' | null): void;
```

强制应用程序始终采用浅色或深色界面风格。默认值为`null`，这将导致应用程序继承系统的界面风格。如果您分配了不同的值，则新样式将适用于应用程序及其内部的所有原生元素（警报、选择器等）。

支持的颜色方案：

- `light`：使用浅色用户界面风格。
- `dark`：使用深色用户界面风格。
- null：遵循系统的界面风格。

> 注意：此更改不会影响系统选择的界面风格或其他应用程序中设置的任何样式。

---

### `addChangeListener()`

```tsx
static addChangeListener(
  listener: (preferences: {colorScheme: 'light' | 'dark' | null}) => void,
): NativeEventSubscription;
```

添加一个事件处理程序，当外观首选项发生变化时触发。


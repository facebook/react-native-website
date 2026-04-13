---
id: dynamiccolorios
title: DynamicColorIOS
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`DynamicColorIOS`函数是专门针对iOS平台的颜色类型。

```tsx
DynamicColorIOS({
  light: color,
  dark: color,
  highContrastLight: color, // (optional) will fallback to "light" if not provided
  highContrastDark: color, // (optional) will fallback to "dark" if not provided
});
```

`DynamicColorIOS` 接受一个对象参数，该对象包含两个必填键：`dark` 和 `light`，以及两个可选键：`highContrastLight` 和 `highContrastDark`。这些分别对应你希望在 iOS 的“浅色模式”和“深色模式”下使用的颜色；当启用高对比度辅助功能模式时，则会使用它们对应的高对比度版本。

在运行时，系统会根据当前的系统外观和辅助功能设置来选择显示哪一种颜色。动态颜色非常适合品牌色或其他应用专用颜色，同时仍能自动响应系统设置的变化。

#### 开发者笔记

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["ios", "web"])}>

<TabItem value="web">

:::info
如果你熟悉 CSS 中的 `@media (prefers-color-scheme: dark)`，这与它很类似！不同的是，你不是在媒体查询中定义所有颜色，而是直接在使用它的地方定义在什么情况下该使用哪种颜色。很方便！
:::

</TabItem>
<TabItem value="ios">

:::info
`DynamicColorIOS` 函数类似于 iOS 原生方法 [`UIColor colorWithDynamicProvider:`](https://developer.apple.com/documentation/uikit/uicolor/3238040-colorwithdynamicprovider)。
:::

</TabItem>
</Tabs>

## 示例

```tsx
import {DynamicColorIOS} from 'react-native';

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue',
});

const customContrastDynamicTextColor = DynamicColorIOS({
  dark: 'darkgray',
  light: 'lightgray',
  highContrastDark: 'black',
  highContrastLight: 'white',
});
```

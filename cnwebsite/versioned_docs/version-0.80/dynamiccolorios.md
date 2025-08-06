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

`DynamicColorIOS` 接受一个参数，该参数是一个包含两个键的对象：`dark` 和 `light`。这些对应于您想在 iOS 上用于“浅色模式”和“深色模式”的颜色。

> 将来可能会有更多的键可用于不同用户偏好，比如高对比度。

在运行时，系统将根据当前系统外观设置选择显示其中之一的颜色。动态颜色适用于品牌颜色或其他自定义应用程序特定颜色，仍然可以自动响应系统设置更改。

#### 开发者笔记

<Tabs groupId="guide" defaultValue="web" values={constants.getDevNotesTabs(["ios", "web"])}>

<TabItem value="web">

> 如果你熟悉 CSS 中的 `@media (prefers-color-scheme: dark)`，这个功能类似！只是不同于在媒体查询中定义所有颜色，而是直接在使用它的地方定义在什么情况下使用哪种颜色。很棒！

</TabItem>
<TabItem value="ios">

> `DynamicColorIOS`函数类似于iOS原生方法[`UIColor colorWithDynamicProvider:`](https://developer.apple.com/documentation/uikit/uicolor/3238040-colorwithdynamicprovider)。

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

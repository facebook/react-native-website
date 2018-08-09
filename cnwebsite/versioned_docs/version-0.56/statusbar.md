---
id: version-0.56-statusbar
title: StatusBar
original_id: statusbar
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

控制应用状态栏的组件。

### 和导航器一起使用的注意事项

由于`StatusBar`可以在任意视图中加载，且后加载的设置会覆盖先前的设置。因此在配合导航器使用时，请务必考虑清楚`StatusBar`的放置顺序。

### 静态API

有些场景并不适合使用组件，因此`StatusBar`也暴露了一个静态API。然而不推荐大家同时通过静态API和组件来定义相同的属性，因为静态API定义的属性值在后续的渲染中会被组件中定义的值所覆盖。

### 常量

`currentHeight` (仅限Android)状态栏的当前高度。

### 查看Props

* [`animated`](statusbar.md#animated)
* [`barStyle`](statusbar.md#barstyle)
* [`hidden`](statusbar.md#hidden)
* [`backgroundColor`](statusbar.md#backgroundcolor)
* [`translucent`](statusbar.md#translucent)
* [`networkActivityIndicatorVisible`](statusbar.md#networkactivityindicatorvisible)
* [`showHideTransition`](statusbar.md#showhidetransition)

### 查看方法

* [`setHidden`](statusbar.md#sethidden)
* [`setBarStyle`](statusbar.md#setbarstyle)
* [`setNetworkActivityIndicatorVisible`](statusbar.md#setnetworkactivityindicatorvisible)
* [`setBackgroundColor`](statusbar.md#setbackgroundcolor)
* [`setTranslucent`](statusbar.md#settranslucent)

### 查看类型定义

* [`StatusBarStyle`](statusbar.md#statusbarstyle)
* [`StatusBarAnimation`](statusbar.md#statusbaranimation)

---

# 文档

## Props

### `animated`

指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `barStyle`

设置状态栏文本的颜色。

| 类型                                             | 必填 |
| ------------------------------------------------ | ---- |
| enum('default', 'light-content', 'dark-content') | 否   |

---

### `hidden`

是否隐藏状态栏。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `backgroundColor`

状态栏的背景色。

| 类型               | 必填 | 平台    |
| ------------------ | ---- | ------- |
| [color](colors.md) | 否   | Android |

---

### `translucent`

指定状态栏是否透明。设置为true时，应用会延伸到状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `networkActivityIndicatorVisible`

指定是否显示网络活动提示符。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `showHideTransition`

通过`hidden`属性来显示或隐藏状态栏时所使用的动画效果。默认值为'fade'。

| 类型                  | 必填 | 平台 |
| --------------------- | ---- | ---- |
| enum('fade', 'slide') | 否   | iOS  |

## 方法

### `setHidden()`

```javascript
static setHidden(hidden: boolean, [animation]: StatusBarAnimation)
```

显示／隐藏状态栏

**参数：**

| 名称      | 类型                                                  | 必填 | 说明                             |
| --------- | ----------------------------------------------------- | ---- | -------------------------------- |
| hidden    | boolean                                               | 是   | 是否隐藏状态栏                   |
| animation | [StatusBarAnimation](statusbar.md#statusbaranimation) | 否   | 改变状态栏显示状态的动画过渡效果 |

---

### `setBarStyle()`

```javascript
static setBarStyle(style: StatusBarStyle, [animated]: boolean)
```

设置状态栏的样式

**参数：**

| 名称     | 类型                                          | 必填 | 说明               |
| -------- | --------------------------------------------- | ---- | ------------------ |
| style    | [StatusBarStyle](statusbar.md#statusbarstyle) | 是   | 要设置的状态栏样式 |
| animated | boolean                                       | 否   | 是否启用过渡动画   |

---

### `setNetworkActivityIndicatorVisible()`

```javascript
static setNetworkActivityIndicatorVisible(visible: boolean)
```

显示／隐藏网络活动指示器

**参数：**

| 名称    | 类型    | 必填 | 说明                   |
| ------- | ------- | ---- | ---------------------- |
| visible | boolean | 是   | 是否显示网络活动指示器 |

---

### `setBackgroundColor()`

```javascript
static setBackgroundColor(color: string, [animated]: boolean)
```

设置状态栏的背景色

**参数：**

| 名称     | 类型    | 必填 | 说明             |
| -------- | ------- | ---- | ---------------- |
| color    | string  | 是   | 背景色           |
| animated | boolean | 否   | 是否启用过渡动画 |

---

### `setTranslucent()`

```javascript
static setTranslucent(translucent: boolean)
```

指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。

**参数：**

| 名称        | 类型    | 必填 | 说明                |
| ----------- | ------- | ---- | ------------------- |
| translucent | boolean | 是   | Set as translucent. |

## 类型定义

### StatusBarStyle

状态栏样式

| 类型  |
| ----- |
| $Enum |

**常量：**

| Value         | 说明                                           |
| ------------- | ---------------------------------------------- |
| default       | 默认的样式（IOS为白底黑字、Android为黑底白字） |
| light-content | 黑底白字                                       |
| dark-content  | 白底黑字（需要Android API>=23）                |

---

### StatusBarAnimation

状态栏动画过渡效果

| 类型  |
| ----- |
| $Enum |

**常量：**

| Value | 说明     |
| ----- | -------- |
| none  | 没有动画 |
| fade  | 渐变效果 |
| slide | 滑动效果 |

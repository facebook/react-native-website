---
id: version-0.55-statusbar
title: StatusBar
original_id: statusbar
---

控制应用状态栏的组件。

### 和导航器一起使用的注意事项

It is possible to have multiple `StatusBar` components mounted at the same time. The props will be merged in the order the `StatusBar` components were mounted. One use case is to specify status bar styles per route using `Navigator`.

```
 <View>
   <StatusBar
     backgroundColor="blue"
     barStyle="light-content"
   />
   <Navigator
     initialRoute={{statusBarHidden: true}}
     renderScene={(route, navigator) =>
       <View>
         <StatusBar hidden={route.statusBarHidden} />
         ...
       </View>
     }
   />
 </View>
```

### Imperative API

For cases where using a component is not ideal, there is also an imperative API exposed as static functions on the component. It is however not recommended to use the static API and the component for the same prop because any value set by the static API will get overriden by the one set by the component in the next render.

### Constants

`currentHeight` (Android only) The height of the status bar.

### Props

* [`animated`](statusbar.md#animated)
* [`barStyle`](statusbar.md#barstyle)
* [`hidden`](statusbar.md#hidden)
* [`backgroundColor`](statusbar.md#backgroundcolor)
* [`translucent`](statusbar.md#translucent)
* [`networkActivityIndicatorVisible`](statusbar.md#networkactivityindicatorvisible)
* [`showHideTransition`](statusbar.md#showhidetransition)

### Methods

* [`setHidden`](statusbar.md#sethidden)
* [`setBarStyle`](statusbar.md#setbarstyle)
* [`setNetworkActivityIndicatorVisible`](statusbar.md#setnetworkactivityindicatorvisible)
* [`setBackgroundColor`](statusbar.md#setbackgroundcolor)
* [`setTranslucent`](statusbar.md#settranslucent)

### Type Definitions

* [`StatusBarStyle`](statusbar.md#statusbarstyle)
* [`StatusBarAnimation`](statusbar.md#statusbaranimation)

---

# 文档

## Props

### `animated`

If the transition between status bar property changes should be animated. Supported for backgroundColor, barStyle and hidden.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `barStyle`

Sets the color of the status bar text.

| 类型                                             | 必填 |
| ------------------------------------------------ | ---- |
| enum('default', 'light-content', 'dark-content') | 否   |

---

### `hidden`

If the status bar is hidden.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `backgroundColor`

The background color of the status bar.

| 类型               | 必填 | 平台    |
| ------------------ | ---- | ------- |
| [color](colors.md) | 否   | Android |

---

### `translucent`

If the status bar is translucent. When translucent is set to true, the app will draw under the status bar. This is useful when using a semi transparent status bar color.

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `networkActivityIndicatorVisible`

If the network activity indicator should be visible.

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `showHideTransition`

The transition effect when showing and hiding the status bar using the `hidden` prop. Defaults to 'fade'.

| 类型                  | 必填 | 平台 |
| --------------------- | ---- | ---- |
| enum('fade', 'slide') | 否   | iOS  |

## Methods

### `setHidden()`

```javascript
static setHidden(hidden: boolean, [animation]: StatusBarAnimation)
```

Show or hide the status bar

**参数：**

| 名称      | 类型                                                  | 必填 | 说明                                                             |
| --------- | ----------------------------------------------------- | ---- | ---------------------------------------------------------------- |
| hidden    | boolean                                               | 是   | Hide the status bar.                                             |
| animation | [StatusBarAnimation](statusbar.md#statusbaranimation) | 否   | Optional animation when changing the status bar hidden property. |

---

### `setBarStyle()`

```javascript
static setBarStyle(style: StatusBarStyle, [animated]: boolean)
```

Set the status bar style

**参数：**

| 名称     | 类型                                          | 必填 | 说明                      |
| -------- | --------------------------------------------- | ---- | ------------------------- |
| style    | [StatusBarStyle](statusbar.md#statusbarstyle) | 是   | Status bar style to set   |
| animated | boolean                                       | 否   | Animate the style change. |

---

### `setNetworkActivityIndicatorVisible()`

```javascript
static setNetworkActivityIndicatorVisible(visible: boolean)
```

Control the visibility of the network activity indicator

**参数：**

| 名称    | 类型    | 必填 | 说明                |
| ------- | ------- | ---- | ------------------- |
| visible | boolean | 是   | Show the indicator. |

---

### `setBackgroundColor()`

```javascript
static setBackgroundColor(color: string, [animated]: boolean)
```

Set the background color for the status bar

**参数：**

| 名称     | 类型    | 必填 | 说明                      |
| -------- | ------- | ---- | ------------------------- |
| color    | string  | 是   | Background color.         |
| animated | boolean | 否   | Animate the style change. |

---

### `setTranslucent()`

```javascript
static setTranslucent(translucent: boolean)
```

Control the translucency of the status bar

**参数：**

| 名称        | 类型    | 必填 | 说明                |
| ----------- | ------- | ---- | ------------------- |
| translucent | boolean | 是   | Set as translucent. |

## Type Definitions

### StatusBarStyle

Status bar style

| 类型  |
| ----- |
| $Enum |

**Constants:**

| Value         | 说明                                                                 |
| ------------- | -------------------------------------------------------------------- |
| default       | Default status bar style (dark for iOS, light for Android)           |
| light-content | Dark background, white texts and icons                               |
| dark-content  | Light background, dark texts and icons (requires API>=23 on Android) |

---

### StatusBarAnimation

Status bar animation

| 类型  |
| ----- |
| $Enum |

**Constants:**

| Value | 说明            |
| ----- | --------------- |
| none  | 否 animation    |
| fade  | Fade animation  |
| slide | Slide animation |

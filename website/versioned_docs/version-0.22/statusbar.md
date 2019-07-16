---
id: version-0.22-statusbar
title: StatusBar
original_id: statusbar
---

Component to control the app status bar.

### Usage with Navigator

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

For cases where using a component is not ideal, there is also an imperative API exposed as static functions on the component. It is however not recommended to use the static API and the compoment for the same prop because any value set by the static API will get overriden by the one set by the component in the next render.

### Props

- [`animated`](statusbar.md#animated)
- [`hidden`](statusbar.md#hidden)
- [`backgroundColor`](statusbar.md#backgroundcolor)
- [`translucent`](statusbar.md#translucent)
- [`barStyle`](statusbar.md#barstyle)
- [`networkActivityIndicatorVisible`](statusbar.md#networkactivityindicatorvisible)
- [`showHideTransition`](statusbar.md#showhidetransition)

### Methods

- [`setHidden`](statusbar.md#sethidden)
- [`setBarStyle`](statusbar.md#setbarstyle)
- [`setNetworkActivityIndicatorVisible`](statusbar.md#setnetworkactivityindicatorvisible)
- [`setBackgroundColor`](statusbar.md#setbackgroundcolor)
- [`setTranslucent`](statusbar.md#settranslucent)

### Type Definitions

- [`StatusBarStyle`](statusbar.md#statusbarstyle)
- [`StatusBarAnimation`](statusbar.md#statusbaranimation)

---

# Reference

## Props

### `animated`

If the transition between status bar property changes should be animated. Supported for backgroundColor, barStyle and hidden.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `hidden`

If the status bar is hidden.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `backgroundColor`

The background color of the status bar.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | Android  |

---

### `translucent`

If the status bar is translucent. When translucent is set to true, the app will draw under the status bar. This is useful when using a semi transparent status bar color.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `barStyle`

Sets the color of the status bar text.

| Type                             | Required | Platform |
| -------------------------------- | -------- | -------- |
| enum('default', 'light-content') | No       | iOS      |

---

### `networkActivityIndicatorVisible`

If the network activity indicator should be visible.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | iOS      |

---

### `showHideTransition`

The transition effect when showing and hiding the status bar using the `hidden` prop. Defaults to 'fade'.

| Type                  | Required | Platform |
| --------------------- | -------- | -------- |
| enum('fade', 'slide') | No       | iOS      |

## Methods

### `setHidden()`

```jsx
static setHidden(hidden: boolean, [animation]: StatusBarAnimation)
```

---

### `setBarStyle()`

```jsx
static setBarStyle(style: StatusBarStyle, [animated]: boolean)
```

---

### `setNetworkActivityIndicatorVisible()`

```jsx
static setNetworkActivityIndicatorVisible(visible: boolean)
```

---

### `setBackgroundColor()`

```jsx
static setBackgroundColor(color, [animated]: boolean)
```

---

### `setTranslucent()`

```jsx
static setTranslucent(translucent: boolean)
```

## Type Definitions

### StatusBarStyle

| Type   |
| ------ |
| \$Enum |

**Constants:**

| Value         | Description |
| ------------- | ----------- |
| default       |             |
| light-content |             |

---

### StatusBarAnimation

| Type   |
| ------ |
| \$Enum |

**Constants:**

| Value | Description |
| ----- | ----------- |
| none  |             |
| fade  |             |
| slide |             |

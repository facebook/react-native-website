---
id: version-0.20-statusbar
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

### Props

- [`animated`](statusbar.md#animated)
- [`hidden`](statusbar.md#hidden)
- [`backgroundColor`](statusbar.md#backgroundcolor)
- [`translucent`](statusbar.md#translucent)
- [`barStyle`](statusbar.md#barstyle)
- [`networkActivityIndicatorVisible`](statusbar.md#networkactivityindicatorvisible)
- [`showHideTransition`](statusbar.md#showhidetransition)

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

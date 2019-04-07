---
id: version-0.58-statusbar
title: StatusBar
original_id: statusbar
---

Component to control the app status bar.

### Usage with Navigator

It is possible to have multiple `StatusBar` components mounted at the same time. The props will be merged in the order the `StatusBar` components were mounted.

```javascript
<View>
  <StatusBar backgroundColor="blue" barStyle="light-content" />
  <View>
    <StatusBar hidden={route.statusBarHidden} />
    ...
  </View>
</View>
```

### Imperative API

For cases where using a component is not ideal, there is also an imperative API exposed as static functions on the component. It is however not recommended to use the static API and the component for the same prop because any value set by the static API will get overriden by the one set by the component in the next render.

### Constants

`currentHeight` (Android only) The height of the status bar.

### Props

- [`animated`](statusbar.md#animated)
- [`barStyle`](statusbar.md#barstyle)
- [`hidden`](statusbar.md#hidden)
- [`backgroundColor`](statusbar.md#backgroundcolor)
- [`translucent`](statusbar.md#translucent)
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

### `barStyle`

Sets the color of the status bar text.

| Type                                             | Required |
| ------------------------------------------------ | -------- |
| enum('default', 'light-content', 'dark-content') | No       |

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

```javascript
static setHidden(hidden: boolean, [animation]: StatusBarAnimation)
```

Show or hide the status bar

**Parameters:**

| Name      | Type                                                  | Required | Description                                                      |
| --------- | ----------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| hidden    | boolean                                               | Yes      | Hide the status bar.                                             |
| animation | [StatusBarAnimation](statusbar.md#statusbaranimation) | No       | Optional animation when changing the status bar hidden property. |

---

### `setBarStyle()`

```javascript
static setBarStyle(style: StatusBarStyle, [animated]: boolean)
```

Set the status bar style

**Parameters:**

| Name     | Type                                          | Required | Description               |
| -------- | --------------------------------------------- | -------- | ------------------------- |
| style    | [StatusBarStyle](statusbar.md#statusbarstyle) | Yes      | Status bar style to set   |
| animated | boolean                                       | No       | Animate the style change. |

---

### `setNetworkActivityIndicatorVisible()`

```javascript
static setNetworkActivityIndicatorVisible(visible: boolean)
```

Control the visibility of the network activity indicator

**Parameters:**

| Name    | Type    | Required | Description         |
| ------- | ------- | -------- | ------------------- |
| visible | boolean | Yes      | Show the indicator. |

---

### `setBackgroundColor()`

```javascript
static setBackgroundColor(color: string, [animated]: boolean)
```

Set the background color for the status bar

**Parameters:**

| Name     | Type    | Required | Description               |
| -------- | ------- | -------- | ------------------------- |
| color    | string  | Yes      | Background color.         |
| animated | boolean | No       | Animate the style change. |

---

### `setTranslucent()`

```javascript
static setTranslucent(translucent: boolean)
```

Control the translucency of the status bar

**Parameters:**

| Name        | Type    | Required | Description         |
| ----------- | ------- | -------- | ------------------- |
| translucent | boolean | Yes      | Set as translucent. |

## Type Definitions

### StatusBarStyle

Status bar style

| Type   |
| ------ |
| \$Enum |

**Constants:**

| Value         | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| default       | Default status bar style (dark for iOS, light for Android)           |
| light-content | Dark background, white texts and icons                               |
| dark-content  | Light background, dark texts and icons (requires API>=23 on Android) |

---

### StatusBarAnimation

Status bar animation

| Type   |
| ------ |
| \$Enum |

**Constants:**

| Value | Description     |
| ----- | --------------- |
| none  | No animation    |
| fade  | Fade animation  |
| slide | Slide animation |

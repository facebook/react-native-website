---
id: statusbar
title: StatusBar
---

控制应用状态栏的组件。

### 和导航器一起使用的注意事项

由于`StatusBar`可以在任意视图中加载，可以放置多个且后加载的会覆盖先加载的。因此在配合导航器使用时，请务必考虑清楚`StatusBar`的放置顺序。

```SnackPlayer name=StatusBar%20Android%20and%20iOS%20Component%20Example&supportedPlatforms=android,ios
import React, { useState } from "react";
import { Button, Text, StyleSheet, StatusBar, View } from "react-native";

import Constants from "expo-constants";

const App = () => {
  const styleTypes = ['default','dark-content', 'light-content'];
  const [visibleStatusBar, setVisibleStatusBar] = useState(false);
  const [styleStatusBar, setStyleStatusBar] = useState(styleTypes[0]);

  const changeVisibilityStatusBar = () => {
    setVisibleStatusBar(!visibleStatusBar);
  };

  const changeStyleStatusBar = () => {
    const styleId = styleTypes.indexOf(styleStatusBar) + 1;

    if(styleId === styleTypes.length){
      return setStyleStatusBar(styleTypes[0]);
    }
    return setStyleStatusBar(styleTypes[styleId]);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textStyle}>StatusBar Style: {styleStatusBar}</Text>
        <Text style={styles.textStyle}>StatusBar Visibility: {!visibleStatusBar ? 'Visible': 'Hidden'}</Text>
      </View>
      <StatusBar backgroundColor="blue" barStyle={styleStatusBar} />
      <View>
        <StatusBar hidden={visibleStatusBar} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Toggle StatusBar" onPress={() => changeVisibilityStatusBar()} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Change StatusBar Style" onPress={() => changeStyleStatusBar()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ECF0F1',
    padding: 8
  },
  buttonContainer:{
    padding: 10
  },
  textStyle:{
    textAlign: 'center'
  }
});

export default App;
```

### 静态 API

有些场景并不适合使用组件，因此`StatusBar`也暴露了一个静态 API。然而不推荐大家同时通过静态 API 和组件来定义相同的属性，因为静态 API 定义的属性值在后续的渲染中会被组件中定义的值所覆盖。

---

# 文档

## 常量

`currentHeight` (仅限 Android)状态栏的当前高度。

## Props

### `animated`

指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle 和 hidden。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `backgroundColor`

状态栏的背景色。

| 类型               | 必需 | 平台    |
| ------------------ | ---- | ------- |
| [color](colors.md) | 否   | Android |

---

### `barStyle`

设置状态栏文本的颜色。

在 Android 上此属性仅对 6.0 （API 23）及以上版本生效。

| 类型                                             | 必需 |
| ------------------------------------------------ | ---- |
| enum('default', 'light-content', 'dark-content') | 否   |

---

### `hidden`

是否隐藏状态栏。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `networkActivityIndicatorVisible`

指定是否显示网络活动提示符。

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `showHideTransition`

通过`hidden`属性来显示或隐藏状态栏时所使用的动画效果。默认值为'fade'。

| 类型                  | 必需 | 平台 |
| --------------------- | ---- | ---- |
| enum('fade', 'slide') | 否   | iOS  |

---

### `translucent`

指定状态栏是否透明。设置为 true 时，应用会延伸到状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。

| 类型 | 必需 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

## 方法

### `popStackEntry()`

```jsx
static popStackEntry(entry: any)
```

Get and remove the last StatusBar entry from the stack.

**参数:**

| 名称                                               | 类型 | 描述                                  |
| -------------------------------------------------- | ---- | ------------------------------------- |
| entry <div class="label basic required">必需</div> | any  | Entry returned from `pushStackEntry`. |

---

### `pushStackEntry()`

```jsx
static pushStackEntry(props: any)
```

将当前导航栏的属性压入栈中保存。The return value should be passed to `popStackEntry` when complete.

**参数:**

| 名称                                               | 类型 | 描述                                                             |
| -------------------------------------------------- | ---- | ---------------------------------------------------------------- |
| props <div class="label basic required">必需</div> | any  | Object containing the StatusBar props to use in the stack entry. |

---

### `replaceStackEntry()`

```jsx
static replaceStackEntry(entry: any, props: any)
```

Replace an existing StatusBar stack entry with new props.

**参数:**

| 名称                                               | 类型 | 描述                                                                         |
| -------------------------------------------------- | ---- | ---------------------------------------------------------------------------- |
| entry <div class="label basic required">必需</div> | any  | Entry returned from `pushStackEntry` to replace.                             |
| props <div class="label basic required">必需</div> | any  | Object containing the StatusBar props to use in the replacement stack entry. |

---

### `setBackgroundColor()`

```jsx
static setBackgroundColor(color: string, [animated]: boolean)
```

设置状态栏的背景色。仅限 Android。

**参数：**

| 名称     | 类型    | 必需 | 说明             |
| -------- | ------- | ---- | ---------------- |
| color    | string  | 是   | 背景色           |
| animated | boolean | 否   | 是否启用过渡动画 |

---

### `setBarStyle()`

```jsx
static setBarStyle(style: StatusBarStyle, [animated]: boolean)
```

设置状态栏的样式

**参数：**

| 名称     | 类型                                          | 必需 | 说明               |
| -------- | --------------------------------------------- | ---- | ------------------ |
| style    | [StatusBarStyle](statusbar.md#statusbarstyle) | 是   | 要设置的状态栏样式 |
| animated | boolean                                       | 否   | 是否启用过渡动画   |

---

### `setHidden()`

```jsx
static setHidden(hidden: boolean, [animation]: StatusBarAnimation)
```

显示／隐藏状态栏

**参数：**

| 名称      | 类型                                                  | 必需 | 说明                             |
| --------- | ----------------------------------------------------- | ---- | -------------------------------- |
| hidden    | boolean                                               | 是   | 是否隐藏状态栏                   |
| animation | [StatusBarAnimation](statusbar.md#statusbaranimation) | 否   | 改变状态栏显示状态的动画过渡效果 |

---

### `setNetworkActivityIndicatorVisible()`

```jsx
static setNetworkActivityIndicatorVisible(visible: boolean)
```

显示／隐藏网络活动指示器。仅限 iOS。

**参数：**

| 名称    | 类型    | 必需 | 说明                   |
| ------- | ------- | ---- | ---------------------- |
| visible | boolean | 是   | 是否显示网络活动指示器 |

---

### `setTranslucent()`

```jsx
static setTranslucent(translucent: boolean)
```

指定状态栏是否透明。设置为 true 时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。仅限 Android。

**参数：**

| 名称        | 类型    | 必需 | 说明                |
| ----------- | ------- | ---- | ------------------- |
| translucent | boolean | 是   | Set as translucent. |

## 类型定义

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

---

### StatusBarStyle

状态栏样式

| 类型  |
| ----- |
| $Enum |

**常量：**

| Value         | 说明                                             |
| ------------- | ------------------------------------------------ |
| default       | 默认的样式（IOS 为白底黑字、Android 为黑底白字） |
| light-content | 黑底白字                                         |
| dark-content  | 白底黑字（需要 Android API>=23）                 |

---

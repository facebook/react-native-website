---
id: drawerlayoutandroid
title: DrawerLayoutAndroid
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

封装了 Android 平台`DrawerLayout`的 React 组件。抽屉（通常用于导航切换）是通过`renderNavigationView`方法渲染的，并且 DrawerLayoutAndroid 的直接子视图会成为主视图（用于放置内容）。导航视图一开始在屏幕上并不可见，不过可以从`drawerPosition`指定的窗口侧面拖拽出来，并且抽屉的宽度可以使用`drawerWidth`属性来指定。

## 示例

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=DrawerLayoutAndroid%20Component%20Example&supportedPlatforms=android&ext=js
import React, {useRef, useState} from 'react';
import {Button, DrawerLayoutAndroid, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <SafeAreaView style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
          <Button
            title="Change Drawer Position"
            onPress={() => changeDrawerPosition()}
          />
          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
          <Button
            title="Open drawer"
            onPress={() => drawer.current.openDrawer()}
          />
        </SafeAreaView>
      </DrawerLayoutAndroid>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=DrawerLayoutAndroid%20Component%20Example&supportedPlatforms=android&ext=tsx
import React, {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const App = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current?.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# 文档

## Props

### [View Props](view.md#props)

继承所有 [View Props](view.md#props)。

---

### `drawerBackgroundColor`

设置导航视图的背景颜色。默认值为`white`。如果你想设置导航视图的不透明度，请使用 rgba。例如：

```tsx
return (
  <DrawerLayoutAndroid drawerBackgroundColor="rgba(0,0,0,0.5)" />
);
```

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `drawerLockMode`

设置导航视图的锁定模式。有 3 种状态：

- unlocked（默认），导航视图可以响应打开和关闭的手势操作。
- locked-closed，导航视图保持关闭，不能用手势打开。
- locked-open，导航视图保持打开，不能用手势关闭。但仍然可以通过程序调用打开或关闭（`openDrawer`/`closeDrawer`）。

| Type                                             | Required |
| ------------------------------------------------ | -------- |
| enum('unlocked', 'locked-closed', 'locked-open') | No       |

---

### `drawerPosition`

设置导航视图从屏幕的哪一边滑入。默认为 `left`。

| Type                  | Required |
| --------------------- | -------- |
| enum('left', 'right') | No       |

---

### `drawerWidth`

设置导航视图的宽度，更确切地说是从窗口边缘拉入的视图的宽度。

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `keyboardDismissMode`

设置拖动过程中是否隐藏软键盘。

- 'none'（默认），拖动时不隐藏软键盘。
- 'on-drag'，拖动开始时隐藏软键盘。

| Type                    | Required |
| ----------------------- | -------- |
| enum('none', 'on-drag') | No       |

---

### `onDrawerClose`

导航视图被关闭后的回调函数。

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerOpen`

导航视图被打开后的回调函数。

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerSlide`

导航视图发生交互时的回调函数。

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerStateChanged`

导航视图的状态发生变化时的回调函数。有 3 种状态：

- idle，导航视图没有发生任何交互。
- dragging，导航视图正在发生交互。
- settling，导航视图的交互已结束，正在完成关闭或打开的动画。

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `renderNavigationView`

被拉入的导航视图的内容。

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### `statusBarBackgroundColor`

使抽屉占满整个屏幕，并设置状态栏的背景颜色，允许其在状态栏上打开。仅在 API 21+ 有效。

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

## 方法

### `closeDrawer()`

```tsx
closeDrawer();
```

关闭导航视图。

---

### `openDrawer()`

```tsx
openDrawer();
```

打开导航视图。

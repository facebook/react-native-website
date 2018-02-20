---
id: drawerlayoutandroid
title: DrawerLayoutAndroid
---

封装了 Android 平台`DrawerLayout`的 React 组件。抽屉（通常用于导航切换）是通过`renderNavigationView`方法渲染的，并且 DrawerLayoutAndroid 的直接子视图会成为主视图（用于放置内容）。导航视图一开始在屏幕上并不可见，不过可以从`drawerPosition`指定的窗口侧面拖拽出来，并且抽屉的宽度可以使用`drawerWidth`属性来指定。

> 译注：此组件仅能在 Android 上使用。我们推荐使用跨平台的[react-navigation](https://reactnavigation.org/)中的 DrawerNavigation 来代替此组件。

示例：

```
render: function() {
  var navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    </View>
  );
  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
      </View>
    </DrawerLayoutAndroid>
  );
},
```

### 查看 Props

* [View props...](view.md#props)

- [`renderNavigationView`](drawerlayoutandroid.md#rendernavigationview)
- [`onDrawerClose`](drawerlayoutandroid.md#ondrawerclose)
- [`drawerPosition`](drawerlayoutandroid.md#drawerposition)
- [`drawerWidth`](drawerlayoutandroid.md#drawerwidth)
- [`keyboardDismissMode`](drawerlayoutandroid.md#keyboarddismissmode)
- [`drawerLockMode`](drawerlayoutandroid.md#drawerlockmode)
- [`onDrawerOpen`](drawerlayoutandroid.md#ondraweropen)
- [`onDrawerSlide`](drawerlayoutandroid.md#ondrawerslide)
- [`onDrawerStateChanged`](drawerlayoutandroid.md#ondrawerstatechanged)
- [`drawerBackgroundColor`](drawerlayoutandroid.md#drawerbackgroundcolor)
- [`statusBarBackgroundColor`](drawerlayoutandroid.md#statusbarbackgroundcolor)

### 查看方法

* [`openDrawer`](drawerlayoutandroid.md#opendrawer)
* [`closeDrawer`](drawerlayoutandroid.md#closedrawer)

---

# 文档

## Props

### `renderNavigationView`

The navigation view that will be rendered to the side of the screen and can be pulled in.

| 类型     | 必填 |
| -------- | ---- |
| function | 是   |

---

### `onDrawerClose`

Function called whenever the navigation view has been closed.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `drawerPosition`

Specifies the side of the screen from which the drawer will slide in.

| 类型                                                                      | 必填 |
| ------------------------------------------------------------------------- | ---- |
| enum(DrawerConsts.DrawerPosition.Left, DrawerConsts.DrawerPosition.Right) | 否   |

---

### `drawerWidth`

Specifies the width of the drawer, more precisely the width of the view that be pulled in from the edge of the window.

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `keyboardDismissMode`

Determines whether the keyboard gets dismissed in response to a drag.

* 'none' (the default), drags do not dismiss the keyboard.
* 'on-drag', the keyboard is dismissed when a drag begins.

| 类型                    | 必填 |
| ----------------------- | ---- |
| enum('none', 'on-drag') | 否   |

---

### `drawerLockMode`

Specifies the lock mode of the drawer. The drawer can be locked in 3 states:

* unlocked (default), meaning that the drawer will respond (open/close) to touch gestures.
* locked-closed, meaning that the drawer will stay closed and not respond to gestures.
* locked-open, meaning that the drawer will stay opened and not respond to gestures. The drawer may still be opened and closed programmatically (`openDrawer`/`closeDrawer`).

| 类型                                             | 必填 |
| ------------------------------------------------ | ---- |
| enum('unlocked', 'locked-closed', 'locked-open') | 否   |

---

### `onDrawerOpen`

Function called whenever the navigation view has been opened.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onDrawerSlide`

Function called whenever there is an interaction with the navigation view.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onDrawerStateChanged`

Function called when the drawer state has changed. The drawer can be in 3 states:

* idle, meaning there is no interaction with the navigation view happening at the time
* dragging, meaning there is currently an interaction with the navigation view
* settling, meaning that there was an interaction with the navigation view, and the navigation view is now finishing its closing or opening animation

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `drawerBackgroundColor`

Specifies the background color of the drawer. The default value is white. If you want to set the opacity of the drawer, use rgba. Example:

```
return (
  <DrawerLayoutAndroid drawerBackgroundColor="rgba(0,0,0,0.5)">
  </DrawerLayoutAndroid>
);
```

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `statusBarBackgroundColor`

Make the drawer take the entire screen and draw the background of the status bar to allow it to open over the status bar. It will only have an effect on API 21+.

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

## 方法

### `openDrawer()`

```javascript
openDrawer();
```

Opens the drawer.

---

### `closeDrawer()`

```javascript
closeDrawer();
```

Closes the drawer.

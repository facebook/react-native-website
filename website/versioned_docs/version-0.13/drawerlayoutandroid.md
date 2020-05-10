---
id: version-0.13-drawerlayoutandroid
title: DrawerLayoutAndroid
original_id: drawerlayoutandroid
---

React component that wraps the platform `DrawerLayout` (Android only). The Drawer (typically used for navigation) is rendered with `renderNavigationView` and direct children are the main view (where your content goes). The navigation view is initially not visible on the screen, but can be pulled in from the side of the window specified by the `drawerPosition` prop and its width can be set by the `drawerWidth` prop.

Example:

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

### Props

- [`renderNavigationView`](drawerlayoutandroid.md#rendernavigationview)
- [`drawerPosition`](drawerlayoutandroid.md#drawerposition)
- [`drawerWidth`](drawerlayoutandroid.md#drawerwidth)
- [`keyboardDismissMode`](drawerlayoutandroid.md#keyboarddismissmode)
- [`onDrawerClose`](drawerlayoutandroid.md#ondrawerclose)
- [`onDrawerOpen`](drawerlayoutandroid.md#ondraweropen)
- [`onDrawerSlide`](drawerlayoutandroid.md#ondrawerslide)
- [`onDrawerStateChanged`](drawerlayoutandroid.md#ondrawerstatechanged)

### Methods

- [`openDrawer`](drawerlayoutandroid.md#opendrawer)
- [`closeDrawer`](drawerlayoutandroid.md#closedrawer)

---

# Reference

## Props

### `renderNavigationView`

The navigation view that will be rendered to the side of the screen and can be pulled in.

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### `drawerPosition`

Specifies the side of the screen from which the drawer will slide in.

| Type                                                                      | Required |
| ------------------------------------------------------------------------- | -------- |
| enum(DrawerConsts.DrawerPosition.Left, DrawerConsts.DrawerPosition.Right) | No       |

---

### `drawerWidth`

Specifies the width of the drawer, more precisely the width of the view that be pulled in from the edge of the window.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `keyboardDismissMode`

Determines whether the keyboard gets dismissed in response to a drag.

- 'none' (the default), drags do not dismiss the keyboard.
- 'on-drag', the keyboard is dismissed when a drag begins.

| Type                    | Required |
| ----------------------- | -------- |
| enum('none', 'on-drag') | No       |

---

### `onDrawerClose`

Function called whenever the navigation view has been closed.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerOpen`

Function called whenever the navigation view has been opened.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerSlide`

Function called whenever there is an interaction with the navigation view.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onDrawerStateChanged`

Function called when the drawer state has changed. The drawer can be in 3 states:

- idle, meaning there is no interaction with the navigation view happening at the time
- dragging, meaning there is currently an interaction with the navigation view
- settling, meaning that there was an interaction with the navigation view, and the navigation view is now finishing its closing or opening animation

| Type     | Required |
| -------- | -------- |
| function | No       |

## Methods

### `openDrawer()`

```jsx
openDrawer();
```

---

### `closeDrawer()`

```jsx
closeDrawer();
```

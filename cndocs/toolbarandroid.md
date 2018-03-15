---
id: toolbarandroid
title: ToolbarAndroid
---

React component that wraps the Android-only [`Toolbar` widget][0]. A Toolbar can display a logo, navigation icon (e.g. hamburger menu), a title & subtitle and a list of actions. The title and subtitle are expanded so the logo and navigation icons are displayed on the left, title and subtitle in the middle and the actions on the right.

If the toolbar has an only child, it will be displayed between the title and actions.

Although the Toolbar supports remote images for the logo, navigation and action icons, this should only be used in DEV mode where `require('./some_icon.png')` translates into a packager URL. In release mode you should always use a drawable resource for these icons. Using `require('./some_icon.png')` will do this automatically for you, so as long as you don't explicitly use e.g. `{uri: 'http://...'}`, you will be good.

Example:

```
render: function() {
  return (
    <ToolbarAndroid
      logo={require('./app_logo.png')}
      title="AwesomeApp"
      actions={[{title: 'Settings', icon: require('./icon_settings.png'), show: 'always'}]}
      onActionSelected={this.onActionSelected} />
  )
},
onActionSelected: function(position) {
  if (position === 0) { // index of 'Settings'
    showSettings();
  }
}
```

[0]: https://developer.android.com/reference/android/support/v7/widget/Toolbar.html

### Props

* [View props...](view.md#props)

- [`overflowIcon`](toolbarandroid.md#overflowicon)
- [`actions`](toolbarandroid.md#actions)
- [`contentInsetStart`](toolbarandroid.md#contentinsetstart)
- [`logo`](toolbarandroid.md#logo)
- [`navIcon`](toolbarandroid.md#navicon)
- [`onActionSelected`](toolbarandroid.md#onactionselected)
- [`onIconClicked`](toolbarandroid.md#oniconclicked)
- [`contentInsetEnd`](toolbarandroid.md#contentinsetend)
- [`rtl`](toolbarandroid.md#rtl)
- [`subtitle`](toolbarandroid.md#subtitle)
- [`subtitleColor`](toolbarandroid.md#subtitlecolor)
- [`testID`](toolbarandroid.md#testid)
- [`title`](toolbarandroid.md#title)
- [`titleColor`](toolbarandroid.md#titlecolor)

---

# 文档

## Props

### `overflowIcon`

Sets the overflow icon.

| 类型                | 必填 |
| ------------------- | -------- |
| optionalImageSource | 否       |

---

### `actions`

Sets possible actions on the toolbar as part of the action menu. These are displayed as icons or text on the right side of the widget. If they don't fit they are placed in an 'overflow' menu.

This property takes an array of objects, where each object has the following keys:

* `title`: **required**, the title of this action
* `icon`: the icon for this action, e.g. `require('./some_icon.png')`
* `show`: when to show this action as an icon or hide it in the overflow menu: `always`, `ifRoom` or `never`
* `showWithText`: boolean, whether to show text alongside the icon or not

| 类型                                                                                                                  | 必填 |
| --------------------------------------------------------------------------------------------------------------------- | -------- |
| array of object: {title: string,icon: optionalImageSource,show: enum('always', 'ifRoom', 'never'),showWithText: bool} | 否       |

---

### `contentInsetStart`

Sets the content inset for the toolbar starting edge.

The content inset affects the valid area for Toolbar content other than the navigation button and menu. Insets define the minimum margin for these components and can be used to effectively align Toolbar content along well-known gridlines.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `logo`

Sets the toolbar logo.

| 类型                | 必填 |
| ------------------- | -------- |
| optionalImageSource | 否       |

---

### `navIcon`

Sets the navigation icon.

| 类型                | 必填 |
| ------------------- | -------- |
| optionalImageSource | 否       |

---

### `onActionSelected`

Callback that is called when an action is selected. The only argument that is passed to the callback is the position of the action in the actions array.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onIconClicked`

Callback called when the icon is selected.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `contentInsetEnd`

Sets the content inset for the toolbar ending edge.

The content inset affects the valid area for Toolbar content other than the navigation button and menu. Insets define the minimum margin for these components and can be used to effectively align Toolbar content along well-known gridlines.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `rtl`

Used to set the toolbar direction to RTL. In addition to this property you need to add

android:supportsRtl="true"

to your application AndroidManifest.xml and then call `setLayoutDirection(LayoutDirection.RTL)` in your MainActivity `onCreate` method.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `subtitle`

Sets the toolbar subtitle.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `subtitleColor`

Sets the toolbar subtitle color.

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `testID`

Used to locate this view in end-to-end tests.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `title`

Sets the toolbar title.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `titleColor`

Sets the toolbar title color.

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

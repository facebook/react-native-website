---
id: version-0.13-toolbarandroid
title: ToolbarAndroid
original_id: toolbarandroid
---

React component that wraps the Android-only [`Toolbar` widget][0]. A Toolbar can display a logo, navigation icon (e.g. hamburger menu), a title & subtitle and a list of actions. The title and subtitle are expanded so the logo and navigation icons are displayed on the left, title and subtitle in the middle and the actions on the right.

If the toolbar has an only child, it will be displayed between the title and actions.

Although the Toolbar supports remote images for the logo, navigation and action icons, this should only be used in DEV mode where `require('./some_icon.png')` translates into a bundler URL. In release mode you should always use a drawable resource for these icons. Using `require('./some_icon.png')` will do this automatically for you, so as long as you don't explicitly use e.g. `{uri: 'http://...'}`, you will be good.

Example:

```
render: function() {
  return (
    <ToolbarAndroid
      logo={require('image!app_logo')}
      title="AwesomeApp"
      actions={[{title: 'Settings', icon: require('image!icon_settings'), show: 'always'}]}
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

- [`actions`](toolbarandroid.md#actions)
- [`logo`](toolbarandroid.md#logo)
- [`navIcon`](toolbarandroid.md#navicon)
- [`onActionSelected`](toolbarandroid.md#onactionselected)
- [`onIconClicked`](toolbarandroid.md#oniconclicked)
- [`subtitle`](toolbarandroid.md#subtitle)
- [`subtitleColor`](toolbarandroid.md#subtitlecolor)
- [`testID`](toolbarandroid.md#testid)
- [`title`](toolbarandroid.md#title)
- [`titleColor`](toolbarandroid.md#titlecolor)

---

# Reference

## Props

### `actions`

Sets possible actions on the toolbar as part of the action menu. These are displayed as icons or text on the right side of the widget. If they don't fit they are placed in an 'overflow' menu.

This property takes an array of objects, where each object has the following keys:

- `title`: **required**, the title of this action
- `icon`: the icon for this action, e.g. `require('image!some_icon')`
- `show`: when to show this action as an icon or hide it in the overflow menu: `always`, `ifRoom` or `never`
- `showWithText`: boolean, whether to show text alongside the icon or not

| Type                                                                                                                  | Required |
| --------------------------------------------------------------------------------------------------------------------- | -------- |
| array of object: {title: string,icon: optionalImageSource,show: enum('always', 'ifRoom', 'never'),showWithText: bool} | No       |

---

### `logo`

Sets the toolbar logo.

| Type                | Required |
| ------------------- | -------- |
| optionalImageSource | No       |

---

### `navIcon`

Sets the navigation icon.

| Type                | Required |
| ------------------- | -------- |
| optionalImageSource | No       |

---

### `onActionSelected`

Callback that is called when an action is selected. The only argument that is passeed to the callback is the position of the action in the actions array.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onIconClicked`

Callback called when the icon is selected.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `subtitle`

Sets the toolbar subtitle.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `subtitleColor`

Sets the toolbar subtitle color.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `title`

Sets the toolbar title.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `titleColor`

Sets the toolbar title color.

| Type   | Required |
| ------ | -------- |
| string | No       |

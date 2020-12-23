---
id: version-0.60-toolbarandroid
title: ToolbarAndroid
original_id: toolbarandroid
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

ToolbarAndroid是一个包装了仅限Android平台的`工具栏(Toolbar)`[部件][0]的React组件。一个Toolbar可以显示一个徽标，一个导航图标（譬如汉堡形状的菜单按钮），一个标题与副标题，以及一个功能列表。标题和副标题会在中间显示，徽标和导航图标会在左侧显示，而功能列表则在右侧显示。

如果工具栏只有一个子节点，它会在标题和功能列表之间显示。

尽管Toolbar支持在徽标、导航和功能图标上使用远程图片，这也只应该在开发(DEV)模式下使用。在发行（release）模式下，你永远都应该用图片资源来渲染这些图标。使用`require('./some_icon.png')`会自动帮你包装好，所以只要你不直接用`{uri:'http://...'}`，就没什么问题。

[0]: https://developer.android.com/reference/android/support/v7/widget/Toolbar.html

例子：

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

### 查看Props

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

设置功能列表的弹出菜单的图标。

| 类型                | 必填 |
| ------------------- | -------- |
| optionalImageSource | 否       |

---

### `actions`

设置功能菜单中的可用功能。他们会显示为部件右侧的图标或文字。如果放不下，则会被放进一个弹出菜单里。

这个属性接受一个对象数组，每个对象可以有如下的字段：

* `title`: **必需**, 功能的标题。
* `icon`: 这个功能的图标，例如`require('./some_icon.png')`。
* `show`: 是直接作为icon显示，还是放到弹出菜单里：`always`总是显示，`ifRoom`如果工具栏放得下就显示，或者 `never`不显示。
* `showWithText`: 值为布尔类型，指定是否在图标旁边同时还显示文字。

| 类型                                                                                                                  | 必填 |
| --------------------------------------------------------------------------------------------------------------------- | -------- |
| array of object: {title: string,icon: optionalImageSource,show: enum('always', 'ifRoom', 'never'),showWithText: bool} | 否       |

---

### `contentInsetStart`

设置工具栏的左边缘和屏幕左边缘的距离。

除了导航按钮和菜单以外，设置这一属性也会影响工具栏的内容区域。它定义了工具栏与屏幕边沿的最小边距，可以用来使工具栏的内容和一些设计上的网格线对齐。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `logo`

设置整个工具条的logo。

| 类型                | 必填 |
| ------------------- | -------- |
| optionalImageSource | 否       |

---

### `navIcon`

设置导航器的图标。

| 类型                | 必填 |
| ------------------- | -------- |
| optionalImageSource | 否       |

---

### `onActionSelected`

当一个功能被选中的时候调用此回调。传递给此回调的唯一参数是该功能在actions数组中的位置。

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onIconClicked`

当图标被选中的时候调用此回调。

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `contentInsetEnd`

设置工具栏的右边缘和屏幕右边缘的距离。

除了导航按钮和菜单以外，设置这一属性也会影响工具栏的内容区域。它定义了工具栏与屏幕边沿的最小边距，可以用来使工具栏的内容和一些设计上的网格线对齐。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `rtl`

设置工具栏的排列顺序为从右到左。除了将这一属性设为true以外，你还需要在AndroidManifest.xml中添加：`android:supportsRtl="true"`以及在`MainActivity`的`onCreate`方法中调用`setLayoutDirection(LayoutDirection.RTL)`。

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `subtitle`

设置工具栏的子标题。

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `subtitleColor`

设置工具栏子标题的颜色。

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `testID`

用来在端到端测试中定位此视图。

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `title`

设置工具栏的标题。

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `titleColor`

设置工具栏的标题颜色。

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---
id: version-0.57-touchablenativefeedback
title: TouchableNativeFeedback
original_id: touchablenativefeedback
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

本组件用于封装视图，使其可以正确响应触摸操作（仅限Android平台）。在Android设备上，这个组件利用原生状态来渲染触摸的反馈。

目前它只支持一个单独的View实例作为子节点。在底层实现上，实际会创建一个新的RCTView节点替换当前的子View，并附带一些额外的属性。

原生触摸操作反馈的背景可以使用`background`属性来自定义。

例子：

```
renderButton: function() {
  return (
    <TouchableNativeFeedback
        onPress={this._onPressButton}
        background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
        <Text style={{margin: 30}}>Button</Text>
      </View>
    </TouchableNativeFeedback>
  );
},
```

### 查看Props

* [TouchableWithoutFeedback props...](touchablewithoutfeedback.md#props)

- [`background`](touchablenativefeedback.md#background)
- [`useForeground`](touchablenativefeedback.md#useforeground)

### 查看方法

* [`SelectableBackground`](touchablenativefeedback.md#selectablebackground)
* [`SelectableBackgroundBorderless`](touchablenativefeedback.md#selectablebackgroundborderless)
* [`Ripple`](touchablenativefeedback.md#ripple)
* [`canUseNativeForeground`](touchablenativefeedback.md#canusenativeforeground)

---

# 文档

## Props

### `background`

决定在触摸反馈的时候显示什么类型的背景。它接受一个有着`type`属性和一些基于`type`属性的额外数据的对象。我们推荐选用本组件的几个静态方法来创建这个对象。

| 类型               | 必填 |
| ------------------ | ---- |
| backgroundPropType | 否   |

---

### `useForeground`

Set to true to add the ripple effect to the foreground of the view, instead of the background. This is useful if one of your child views has a background of its own, or you're e.g. displaying images, and you don't want the ripple to be covered by them.

Check TouchableNativeFeedback.canUseNativeForeground() first, as this is only available on Android 6.0 and above. If you try to use this on older versions you will get a warning and fallback to background.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

## 方法

### `SelectableBackground()`

```javascript
static SelectableBackground()
```

会创建一个对象，表示安卓主题默认的对于被选中对象的背景(?android:attr/selectableItemBackground)。

---

### `SelectableBackgroundBorderless()`

```javascript
static SelectableBackgroundBorderless()
```

会创建一个对象，表示安卓主题默认的对于被选中的无边框对象的背景(?android:attr/selectableItemBackgroundBorderless)。只适用于Android API level 21+。

---

### `Ripple()`

```javascript
static Ripple(color: string, borderless: boolean)
```

会创建一个对象，当按钮被按下时产生一个涟漪状的背景，你可以通过color参数来指定颜色，如果参数`borderless`是true，那么涟漪还会渲染到视图的范围之外（参见原生的actionbar buttons作为该效果的一个例子）。这个背景类型只在Android API level 21+适用。

**参数：**

| 名称       | 类型    | 必填 | 说明                                         |
| ---------- | ------- | ---- | -------------------------------------------- |
| color      | string  | 是   | The ripple color                             |
| borderless | boolean | 是   | If the ripple can render outside it's bounds |

---

### `canUseNativeForeground()`

```javascript
static canUseNativeForeground()
```

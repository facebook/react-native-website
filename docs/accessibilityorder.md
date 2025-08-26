---
id: accessibilityorder
title: experimental_accessibilityOrder ⚗️
---

:::important
**This API is experimental.** Experimental APIs may contain bugs and are likely to change in a future version of React Native. Don't use them in production.
:::

`experimental_accessibilityOrder` is a prop on [`View`](view.md) which indicates the order in which an assistive technology focuses descendants of the `View`. This prop takes an array of strings where each string is a [`nativeID`](view.md#nativeid) of some descendant component whose order is being defined. This prop does not enable accessibility itself, each referenced component still needs to be accessible by setting [`accessible`](view.md#accessible) to true. This prop is both **nestable** and **exhaustive** meaning

* If `experimental_accessibilityOrder` contains a reference to some non-accessible component, it will focus the descendants of that component in the default order. Additionally, it can also contain a reference to other components that also have an `experimental_accessibilityOrder`.
* If some component that is otherwise accessible is not directly referenced in `experimental_accessibilityOrder`, or nested within some container directly referenced in `experimental_accessibilityOrder`, then it will not be accessible.

| Type    |
| ------- |
| array of strings |

## Guide

:::note
For the sake of brevity, layout is excluded in the following examples even though it dictates the default focus order. Assume the document order matches the layout order.
:::

`experimental_accessibilityOrder` lets you define the order in which assistive technologies focus descendant components. It is an array of [`nativeIDs`](view.md#nativeid) that are set on the components whose order you are controlling. For example:

```
<View accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
</View>
```

Assistive technologies will focus the `View` with `nativeID` of `“B”`, then `“C”`, then `“A”`.

`experimental_accessibilityOrder` will not “turn on” accessibility for the components it references, that still needs to be done. So if we remove `accessible={true}` on `“C”` above like so

```
<View accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C"/>
</View>
```

then the new order will be `“B”` then `“A”`, even though `“C”` is still in `experimental_accessibilityOrder`.

`experimental_accessibilityOrder` will “turn off” accessibility of components it doesn’t reference, however.

```
<View accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
  <View accessible={true} nativeID="D"/>
</View>
```

The order of the above example would be `“B”`, `“C”`, `“A”`. `“D”` will never get focused. In this sense `experimental_accessibilityOrder` is *exhaustive*.

There are still valid reasons to include an non-accessible component in `experimental_accessibilityOrder`. Consider

```
<View accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C">
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

The focus order will be `“B”`, `“D”`, `“E”`, `“F”`, `“A”`. Even though `“D”`, `“E”`, and `“F”` are not directly referenced in `experimental_accessibilityOrder`, `“C”` is directly referenced. In this instance `“C”` in an *accessibility container* - it contains accessible elements, but is not accessible itself. If an accessibility container is referenced in `experimental_accessibilityOrder` then the default order of the elements it contains is applied. In this sense `experimental_accessibilityOrder` is *nestable*.

`experimental_accessibilityOrder` can also reference another component with `experimental_accessibilityOrder`

```
<View accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C" accessibilityOrder={['F', 'E', 'D']}>
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

The focus order will be `“B”`, `“F”`, `“E”`, `“D”`, `“A”`.

A component cannot be both an accessibility container and an accessibility element (`accessible={true}`). So if we have

```
<View accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C" accessibilityOrder={['F', 'E', 'D']}>
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

The focus order would be `“B”`, `“C”`, `“A”`. `“D”`, `“E”`, and `“F”` are no longer in a container, so the exhaustive nature of `experimental_accessibilityOrder` means they will be excluded.

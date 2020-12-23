---
id: viewtoken
title: ViewToken 对象
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

`ViewToken` object is returned as one of properties in the `onViewableItemsChanged` callback, for example in [FlatList](flatlist) component. It is exported by [`ViewabilityHelper.js`](https://github.com/facebook/react-native/blob/master/Libraries/Lists/ViewabilityHelper.js).

## 示例

```js
{
  item: { key: "key-12" },
  key: "key-12",
  index: 11,
  isViewable: true
}
```

## 属性与值

### `index`

Unique numeric identifier assigned to the data element.

| Type   | Optional |
| ------ | -------- |
| number | Yes      |

### `isViewable`

Specifies if at least some part of list element is visible in the viewport.

| Type    | Optional |
| ------- | -------- |
| boolean | No       |

### `item`

Item data

| Type | Optional |
| ---- | -------- |
| any  | No       |

### `key`

Key identifier assigned of the data element extracted to the top level.

| Type   | Optional |
| ------ | -------- |
| string | No       |

### `section`

Item section data when used with `SectionList`.

| Type | Optional |
| ---- | -------- |
| any  | Yes      |

## 被下列组件引用

- [`FlatList`](flatlist)
- [`SectionList`](sectionlist)
- [`VirtualizedList`](virtualizedlist)

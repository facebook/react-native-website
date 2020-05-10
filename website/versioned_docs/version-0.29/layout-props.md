---
id: version-0.29-layout-props
title: Layout Props
original_id: layout-props
---

### Props

- [`marginRight`](layout-props.md#marginright)
- [`alignItems`](layout-props.md#alignitems)
- [`borderBottomWidth`](layout-props.md#borderbottomwidth)
- [`borderLeftWidth`](layout-props.md#borderleftwidth)
- [`borderRightWidth`](layout-props.md#borderrightwidth)
- [`borderTopWidth`](layout-props.md#bordertopwidth)
- [`borderWidth`](layout-props.md#borderwidth)
- [`bottom`](layout-props.md#bottom)
- [`flex`](layout-props.md#flex)
- [`flexDirection`](layout-props.md#flexdirection)
- [`flexWrap`](layout-props.md#flexwrap)
- [`height`](layout-props.md#height)
- [`justifyContent`](layout-props.md#justifycontent)
- [`left`](layout-props.md#left)
- [`margin`](layout-props.md#margin)
- [`marginBottom`](layout-props.md#marginbottom)
- [`marginHorizontal`](layout-props.md#marginhorizontal)
- [`marginLeft`](layout-props.md#marginleft)
- [`alignSelf`](layout-props.md#alignself)
- [`marginTop`](layout-props.md#margintop)
- [`marginVertical`](layout-props.md#marginvertical)
- [`maxHeight`](layout-props.md#maxheight)
- [`maxWidth`](layout-props.md#maxwidth)
- [`minHeight`](layout-props.md#minheight)
- [`minWidth`](layout-props.md#minwidth)
- [`padding`](layout-props.md#padding)
- [`paddingBottom`](layout-props.md#paddingbottom)
- [`paddingHorizontal`](layout-props.md#paddinghorizontal)
- [`paddingLeft`](layout-props.md#paddingleft)
- [`paddingRight`](layout-props.md#paddingright)
- [`paddingTop`](layout-props.md#paddingtop)
- [`paddingVertical`](layout-props.md#paddingvertical)
- [`position`](layout-props.md#position)
- [`right`](layout-props.md#right)
- [`top`](layout-props.md#top)
- [`width`](layout-props.md#width)
- [`zIndex`](layout-props.md#zindex)

---

# Reference

## Props

### `marginRight`

`marginRight` works like `margin-right` in CSS. See http://www.w3schools.com/cssref/pr_margin-right.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `alignItems`

`alignItems` aligns children in the cross direction. For example, if children are flowing vertically, `alignItems` controls how they align horizontally. It works like `align-items` in CSS, except the default value is `stretch` instead of `flex-start`. See https://css-tricks.com/almanac/properties/a/align-items/ for more detail.

| Type                                                | Required |
| --------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch') | No       |

---

### `borderBottomWidth`

`borderBottomWidth` works like `border-bottom-width` in CSS. See http://www.w3schools.com/cssref/pr_border-bottom_width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderLeftWidth`

`borderLeftWidth` works like `border-left-width` in CSS. See http://www.w3schools.com/cssref/pr_border-bottom_width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderRightWidth`

`borderRightWidth` works like `border-right-width` in CSS. See http://www.w3schools.com/cssref/pr_border-right_width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderTopWidth`

`borderTopWidth` works like `border-top-width` in CSS. See http://www.w3schools.com/cssref/pr_border-top_width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderWidth`

`borderWidth` works like `border-width` in CSS. See http://www.w3schools.com/cssref/pr_border-width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `bottom`

`bottom` is the number of logical pixels to offset the bottom edge of this component.

It works similarly to `bottom` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See https://developer.mozilla.org/en-US/docs/Web/CSS/bottom for more details of how `top` affects layout.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flex`

In React Native `flex` does not work the same way that it does in CSS. `flex` is a number rather than a string, and it works according to the `css-layout` library at https://github.com/facebook/css-layout .

When `flex` is a positive number, it makes the component flexible and it will be sized proportional to its flex value. So a component with `flex` set to 2 will take twice the space as a component with `flex` set to 1.

When `flex` is 0, the component is sized according to `width` and `height` and it is inflexible.

When `flex` is -1, the component is normally sized according `width` and `height`. However, if there's not enough space, the component will shrink to its `minWidth` and `minHeight`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexDirection`

`flexDirection` controls which directions children of a container go. `row` goes left to right, `column` goes top to bottom, and you may be able to guess what the other two do. It works like `flex-direction` in CSS, except the default is `column`. See https://css-tricks.com/almanac/properties/f/flex-direction/ for more detail.

| Type                                                   | Required |
| ------------------------------------------------------ | -------- |
| enum('row', 'row-reverse', 'column', 'column-reverse') | No       |

---

### `flexWrap`

`flexWrap` controls whether children can wrap around after they hit the end of a flex container. It works like `flex-wrap` in CSS. See https://css-tricks.com/almanac/properties/f/flex-wrap/ for more detail.

| Type                   | Required |
| ---------------------- | -------- |
| enum('wrap', 'nowrap') | No       |

---

### `height`

`height` sets the height of this component.

It works similarly to `height` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that. See http://www.w3schools.com/cssref/pr_dim_width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `justifyContent`

`justifyContent` aligns children in the main direction. For example, if children are flowing vertically, `justifyContent` controls how they align vertically. It works like `justify-content` in CSS. See https://css-tricks.com/almanac/properties/j/justify-content/ for more detail.

| Type                                                                      | Required |
| ------------------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around') | No       |

---

### `left`

`left` is the number of logical pixels to offset the left edge of this component.

It works similarly to `left` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See https://developer.mozilla.org/en-US/docs/Web/CSS/left for more details of how `left` affects layout.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `margin`

Setting `margin` has the same effect as setting each of `marginTop`, `marginLeft`, `marginBottom`, and `marginRight`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `marginBottom`

`marginBottom` works like `margin-bottom` in CSS. See http://www.w3schools.com/cssref/pr_margin-bottom.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `marginHorizontal`

Setting `marginHorizontal` has the same effect as setting both `marginLeft` and `marginRight`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `marginLeft`

`marginLeft` works like `margin-left` in CSS. See http://www.w3schools.com/cssref/pr_margin-left.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `alignSelf`

`alignSelf` controls how a child aligns in the cross direction, overriding the `alignItems` of the parent. It works like `align-self` in CSS. See https://css-tricks.com/almanac/properties/a/align-self/ for more detail.

| Type                                                        | Required |
| ----------------------------------------------------------- | -------- |
| enum('auto', 'flex-start', 'flex-end', 'center', 'stretch') | No       |

---

### `marginTop`

`marginTop` works like `margin-top` in CSS. See http://www.w3schools.com/cssref/pr_margin-top.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `marginVertical`

Setting `marginVertical` has the same effect as setting both `marginTop` and `marginBottom`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `maxHeight`

`maxHeight` is the maximum height for this component, in logical pixels.

It works similarly to `max-height` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See http://www.w3schools.com/cssref/pr_dim_max-height.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `maxWidth`

`maxWidth` is the maximum width for this component, in logical pixels.

It works similarly to `max-width` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See http://www.w3schools.com/cssref/pr_dim_max-width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `minHeight`

`minHeight` is the minimum height for this component, in logical pixels.

It works similarly to `min-height` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See http://www.w3schools.com/cssref/pr_dim_min-height.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `minWidth`

`minWidth` is the minimum width for this component, in logical pixels.

It works similarly to `min-width` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See http://www.w3schools.com/cssref/pr_dim_min-width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `padding`

`padding` works like `padding` in CSS. It's like setting each of `paddingTop`, `paddingBottom`, `paddingLeft`, and `paddingRight` to the same thing. See http://www.w3schools.com/css/css_padding.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `paddingBottom`

`paddingBottom` works like `padding-bottom` in CSS. See http://www.w3schools.com/cssref/pr_padding-bottom.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `paddingHorizontal`

Setting `paddingHorizontal` is like setting both of `paddingLeft` and `paddingRight`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `paddingLeft`

`paddingLeft` works like `padding-left` in CSS. See http://www.w3schools.com/cssref/pr_padding-left.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `paddingRight`

`paddingRight` works like `padding-right` in CSS. See http://www.w3schools.com/cssref/pr_padding-right.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `paddingTop`

`paddingTop` works like `padding-top` in CSS. See http://www.w3schools.com/cssref/pr_padding-top.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `paddingVertical`

Setting `paddingVertical` is like setting both of `paddingTop` and `paddingBottom`.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `position`

`position` in React Native is similar to regular CSS, but everything is set to `relative` by default, so `absolute` positioning is always relative to the parent.

If you want to position a child using specific numbers of logical pixels relative to its parent, set the child to have `absolute` position.

If you want to position a child relative to something that is not its parent, don't use styles for that. Use the component tree.

See https://github.com/facebook/css-layout for more details on how `position` differs between React Native and CSS.

| Type                         | Required |
| ---------------------------- | -------- |
| enum('absolute', 'relative') | No       |

---

### `right`

`right` is the number of logical pixels to offset the right edge of this component.

It works similarly to `right` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See https://developer.mozilla.org/en-US/docs/Web/CSS/right for more details of how `right` affects layout.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `top`

`top` is the number of logical pixels to offset the top edge of this component.

It works similarly to `top` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that.

See https://developer.mozilla.org/en-US/docs/Web/CSS/top for more details of how `top` affects layout.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `width`

`width` sets the width of this component.

It works similarly to `width` in CSS, but in React Native you must use logical pixel units, rather than percents, ems, or any of that. See http://www.w3schools.com/cssref/pr_dim_width.asp for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `zIndex`

`zIndex` controls which components display on top of others. Normally, you don't use `zIndex`. Components render according to their order in the document tree, so later components draw over earlier ones. `zIndex` may be useful if you have animations or custom modal interfaces where you don't want this behavior.

It works like the CSS `z-index` property - components with a larger `zIndex` will render on top. Think of the z-direction like it's pointing from the phone into your eyeball. See https://developer.mozilla.org/en-US/docs/Web/CSS/z-index for more detail.

On iOS, `zIndex` may require `View`s to be siblings of each other for it to work as expected.

| Type   | Required |
| ------ | -------- |
| number | No       |

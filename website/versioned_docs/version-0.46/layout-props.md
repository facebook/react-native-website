---
id: version-0.46-layout-props
title: Layout Props
original_id: layout-props
---

### Props

- [`marginHorizontal`](layout-props.md#marginhorizontal)
- [`alignContent`](layout-props.md#aligncontent)
- [`alignSelf`](layout-props.md#alignself)
- [`aspectRatio`](layout-props.md#aspectratio)
- [`borderBottomWidth`](layout-props.md#borderbottomwidth)
- [`borderLeftWidth`](layout-props.md#borderleftwidth)
- [`borderRightWidth`](layout-props.md#borderrightwidth)
- [`borderTopWidth`](layout-props.md#bordertopwidth)
- [`borderWidth`](layout-props.md#borderwidth)
- [`bottom`](layout-props.md#bottom)
- [`display`](layout-props.md#display)
- [`flex`](layout-props.md#flex)
- [`flexBasis`](layout-props.md#flexbasis)
- [`flexDirection`](layout-props.md#flexdirection)
- [`flexGrow`](layout-props.md#flexgrow)
- [`flexShrink`](layout-props.md#flexshrink)
- [`flexWrap`](layout-props.md#flexwrap)
- [`height`](layout-props.md#height)
- [`justifyContent`](layout-props.md#justifycontent)
- [`left`](layout-props.md#left)
- [`margin`](layout-props.md#margin)
- [`marginBottom`](layout-props.md#marginbottom)
- [`alignItems`](layout-props.md#alignitems)
- [`marginLeft`](layout-props.md#marginleft)
- [`marginRight`](layout-props.md#marginright)
- [`marginTop`](layout-props.md#margintop)
- [`marginVertical`](layout-props.md#marginvertical)
- [`maxHeight`](layout-props.md#maxheight)
- [`maxWidth`](layout-props.md#maxwidth)
- [`minHeight`](layout-props.md#minheight)
- [`minWidth`](layout-props.md#minwidth)
- [`overflow`](layout-props.md#overflow)
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
- [`direction`](layout-props.md#direction)

---

# Reference

## Props

### `marginHorizontal`

Setting `marginHorizontal` has the same effect as setting both `marginLeft` and `marginRight`.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `alignContent`

`alignContent` controls how rows align in the cross direction, overriding the `alignContent` of the parent. See https://developer.mozilla.org/en-US/docs/Web/CSS/align-content for more details.

| Type                                                                                 | Required |
| ------------------------------------------------------------------------------------ | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around') | No       |

---

### `alignSelf`

`alignSelf` controls how a child aligns in the cross direction, overriding the `alignItems` of the parent. It works like `align-self` in CSS (default: auto). See https://developer.mozilla.org/en-US/docs/Web/CSS/align-self for more details.

| Type                                                                    | Required |
| ----------------------------------------------------------------------- | -------- |
| enum('auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline') | No       |

---

### `aspectRatio`

Aspect ratio control the size of the undefined dimension of a node. Aspect ratio is a non-standard property only available in react native and not CSS.

- On a node with a set width/height aspect ratio control the size of the unset dimension
- On a node with a set flex basis aspect ratio controls the size of the node in the cross axis if unset
- On a node with a measure function aspect ratio works as though the measure function measures the flex basis
- On a node with flex grow/shrink aspect ratio controls the size of the node in the cross axis if unset
- Aspect ratio takes min/max dimensions into account

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderBottomWidth`

`borderBottomWidth` works like `border-bottom-width` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderLeftWidth`

`borderLeftWidth` works like `border-left-width` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderRightWidth`

`borderRightWidth` works like `border-right-width` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderTopWidth`

`borderTopWidth` works like `border-top-width` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderWidth`

`borderWidth` works like `border-width` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/border-width for more details.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `bottom`

`bottom` is the number of logical pixels to offset the bottom edge of this component.

It works similarly to `bottom` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See https://developer.mozilla.org/en-US/docs/Web/CSS/bottom for more details of how `bottom` affects layout.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `display`

`display` sets the display type of this component.

It works similarly to `display` in CSS, but only support 'flex' and 'none'. 'flex' is the default.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `flex`

In React Native `flex` does not work the same way that it does in CSS. `flex` is a number rather than a string, and it works according to the `Yoga` library at https://github.com/facebook/yoga

When `flex` is a positive number, it makes the component flexible and it will be sized proportional to its flex value. So a component with `flex` set to 2 will take twice the space as a component with `flex` set to 1.

When `flex` is 0, the component is sized according to `width` and `height` and it is inflexible.

When `flex` is -1, the component is normally sized according `width` and `height`. However, if there's not enough space, the component will shrink to its `minWidth` and `minHeight`.

flexGrow, flexShrink, and flexBasis work the same as in CSS.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexBasis`

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `flexDirection`

`flexDirection` controls which directions children of a container go. `row` goes left to right, `column` goes top to bottom, and you may be able to guess what the other two do. It works like `flex-direction` in CSS, except the default is `column`. See https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction for more details.

| Type                                                   | Required |
| ------------------------------------------------------ | -------- |
| enum('row', 'row-reverse', 'column', 'column-reverse') | No       |

---

### `flexGrow`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexShrink`

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexWrap`

`flexWrap` controls whether children can wrap around after they hit the end of a flex container. It works like `flex-wrap` in CSS (default: nowrap). See https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap for more details.

| Type                   | Required |
| ---------------------- | -------- |
| enum('wrap', 'nowrap') | No       |

---

### `height`

`height` sets the height of this component.

It works similarly to `height` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported. See https://developer.mozilla.org/en-US/docs/Web/CSS/height for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `justifyContent`

`justifyContent` aligns children in the main direction. For example, if children are flowing vertically, `justifyContent` controls how they align vertically. It works like `justify-content` in CSS (default: flex-start). See https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content for more details.

| Type                                                                      | Required |
| ------------------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around') | No       |

---

### `left`

`left` is the number of logical pixels to offset the left edge of this component.

It works similarly to `left` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See https://developer.mozilla.org/en-US/docs/Web/CSS/left for more details of how `left` affects layout.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `margin`

Setting `margin` has the same effect as setting each of `marginTop`, `marginLeft`, `marginBottom`, and `marginRight`. See https://developer.mozilla.org/en-US/docs/Web/CSS/margin for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `marginBottom`

`marginBottom` works like `margin-bottom` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `alignItems`

`alignItems` aligns children in the cross direction. For example, if children are flowing vertically, `alignItems` controls how they align horizontally. It works like `align-items` in CSS (default: stretch). See https://developer.mozilla.org/en-US/docs/Web/CSS/align-items for more details.

| Type                                                            | Required |
| --------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'baseline') | No       |

---

### `marginLeft`

`marginLeft` works like `margin-left` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `marginRight`

`marginRight` works like `margin-right` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `marginTop`

`marginTop` works like `margin-top` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `marginVertical`

Setting `marginVertical` has the same effect as setting both `marginTop` and `marginBottom`.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `maxHeight`

`maxHeight` is the maximum height for this component, in logical pixels.

It works similarly to `max-height` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See https://developer.mozilla.org/en-US/docs/Web/CSS/max-height for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `maxWidth`

`maxWidth` is the maximum width for this component, in logical pixels.

It works similarly to `max-width` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See https://developer.mozilla.org/en-US/docs/Web/CSS/max-width for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `minHeight`

`minHeight` is the minimum height for this component, in logical pixels.

It works similarly to `min-height` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See https://developer.mozilla.org/en-US/docs/Web/CSS/min-height for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `minWidth`

`minWidth` is the minimum width for this component, in logical pixels.

It works similarly to `min-width` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See https://developer.mozilla.org/en-US/docs/Web/CSS/min-width for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `overflow`

`overflow` controls how a children are measured and displayed. `overflow: hidden` causes views to be clipped while `overflow: scroll` causes views to be measured independently of their parents main axis. It works like `overflow` in CSS (default: visible). See https://developer.mozilla.org/en/docs/Web/CSS/overflow for more details.

| Type                                | Required |
| ----------------------------------- | -------- |
| enum('visible', 'hidden', 'scroll') | No       |

---

### `padding`

Setting `padding` has the same effect as setting each of `paddingTop`, `paddingBottom`, `paddingLeft`, and `paddingRight`. See https://developer.mozilla.org/en-US/docs/Web/CSS/padding for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `paddingBottom`

`paddingBottom` works like `padding-bottom` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `paddingHorizontal`

Setting `paddingHorizontal` is like setting both of `paddingLeft` and `paddingRight`.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `paddingLeft`

`paddingLeft` works like `padding-left` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `paddingRight`

`paddingRight` works like `padding-right` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `paddingTop`

`paddingTop` works like `padding-top` in CSS. See https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `paddingVertical`

Setting `paddingVertical` is like setting both of `paddingTop` and `paddingBottom`.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `position`

`position` in React Native is similar to regular CSS, but everything is set to `relative` by default, so `absolute` positioning is always relative to the parent.

If you want to position a child using specific numbers of logical pixels relative to its parent, set the child to have `absolute` position.

If you want to position a child relative to something that is not its parent, don't use styles for that. Use the component tree.

See https://github.com/facebook/yoga for more details on how `position` differs between React Native and CSS.

| Type                         | Required |
| ---------------------------- | -------- |
| enum('absolute', 'relative') | No       |

---

### `right`

`right` is the number of logical pixels to offset the right edge of this component.

It works similarly to `right` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See https://developer.mozilla.org/en-US/docs/Web/CSS/right for more details of how `right` affects layout.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `top`

`top` is the number of logical pixels to offset the top edge of this component.

It works similarly to `top` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported.

See https://developer.mozilla.org/en-US/docs/Web/CSS/top for more details of how `top` affects layout.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `width`

`width` sets the width of this component.

It works similarly to `width` in CSS, but in React Native you must use points or percentages. Ems and other units are not supported. See https://developer.mozilla.org/en-US/docs/Web/CSS/width for more details.

| Type            | Required |
| --------------- | -------- |
| number, ,string | No       |

---

### `zIndex`

`zIndex` controls which components display on top of others. Normally, you don't use `zIndex`. Components render according to their order in the document tree, so later components draw over earlier ones. `zIndex` may be useful if you have animations or custom modal interfaces where you don't want this behavior.

It works like the CSS `z-index` property - components with a larger `zIndex` will render on top. Think of the z-direction like it's pointing from the phone into your eyeball. See https://developer.mozilla.org/en-US/docs/Web/CSS/z-index for more details.

On iOS, `zIndex` may require `View`s to be siblings of each other for it to work as expected.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `direction`

`direction` specifies the directional flow of the user interface. The default is `inherit`, except for root node which will have value based on the current locale. See https://facebook.github.io/yoga/docs/rtl/ for more details.

| Type                          | Required | Platform |
| ----------------------------- | -------- | -------- |
| enum('inherit', 'ltr', 'rtl') | No       | iOS      |

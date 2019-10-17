---
id: version-0.27-navigatorios
title: NavigatorIOS
original_id: navigatorios
---

NavigatorIOS wraps UIKit navigation and allows you to add back-swipe functionality across your app.

> **NOTE**: This Component is not maintained by Facebook
>
> This component is under community responsibility. If a pure JavaScript solution fits your needs you may try the `Navigator` component instead.

#### Routes

A route is an object used to describe each page in the navigator. The first route is provided to NavigatorIOS as `initialRoute`:

```
render: function() {
  return (
    <NavigatorIOS
      initialRoute={{
        component: MyView,
        title: 'My View Title',
        passProps: { myProp: 'foo' },
      }}
    />
  );
},
```

Now MyView will be rendered by the navigator. It will receive the route object in the `route` prop, a navigator, and all of the props specified in `passProps`.

See the initialRoute propType for a complete definition of a route.

#### Navigator

A `navigator` is an object of navigation functions that a view can call. It is passed as a prop to any component rendered by NavigatorIOS.

```
var MyView = React.createClass({
  _handleBackButtonPress: function() {
    this.props.navigator.pop();
  },
  _handleNextButtonPress: function() {
    this.props.navigator.push(nextRoute);
  },
  ...
});
```

Navigator functions are also available on the NavigatorIOS component:

```
var MyView = React.createClass({
  _handleNavigationRequest: function() {
    this.refs.nav.push(otherRoute);
  },
  render: () => (
    <NavigatorIOS
      ref="nav"
      initialRoute={...}
    />
  ),
});
```

Props passed to the NavigatorIOS component will set the default configuration for the navigation bar. Props passed as properties to a route object will set the configuration for that route's navigation bar, overriding any props passed to the NavigatorIOS component.

### Props

- [`initialRoute`](navigatorios.md#initialroute)
- [`barTintColor`](navigatorios.md#bartintcolor)
- [`interactivePopGestureEnabled`](navigatorios.md#interactivepopgestureenabled)
- [`itemWrapperStyle`](navigatorios.md#itemwrapperstyle)
- [`navigationBarHidden`](navigatorios.md#navigationbarhidden)
- [`shadowHidden`](navigatorios.md#shadowhidden)
- [`tintColor`](navigatorios.md#tintcolor)
- [`titleTextColor`](navigatorios.md#titletextcolor)
- [`translucent`](navigatorios.md#translucent)

### Methods

- [`push`](navigatorios.md#push)
- [`popN`](navigatorios.md#popn)
- [`pop`](navigatorios.md#pop)
- [`replaceAtIndex`](navigatorios.md#replaceatindex)
- [`replace`](navigatorios.md#replace)
- [`replacePrevious`](navigatorios.md#replaceprevious)
- [`popToTop`](navigatorios.md#poptotop)
- [`popToRoute`](navigatorios.md#poptoroute)
- [`replacePreviousAndPop`](navigatorios.md#replacepreviousandpop)
- [`resetTo`](navigatorios.md#resetto)

---

# Reference

## Props

### `initialRoute`

NavigatorIOS uses "route" objects to identify child views, their props, and navigation bar configuration. "push" and all the other navigation operations expect routes to be like this:

| Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Required |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| object: {component: function,title: string,passProps: object,backButtonIcon: Image.propTypes.source,backButtonTitle: string,leftButtonIcon: Image.propTypes.source,leftButtonTitle: string,onLeftButtonPress: function,rightButtonIcon: Image.propTypes.source,rightButtonTitle: string,onRightButtonPress: function,wrapperStyle: [View](view.md#style),navigationBarHidden: bool,shadowHidden: bool,tintColor: string,barTintColor: string,titleTextColor: string,translucent: bool} | Yes      |

---

### `barTintColor`

The default background color of the navigation bar

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `interactivePopGestureEnabled`

<!-- alex ignore retext-equality -->

A Boolean value that indicates whether the interactive pop gesture is enabled. Useful for enabling/disabling the back swipe navigation gesture. If this prop is not provided, the default behavior is for the back swipe gesture to be enabled when the navigation bar is shown and disabled when the navigation bar is hidden. Once you've provided the interactivePopGestureEnabled prop, you can never restore the default behavior.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `itemWrapperStyle`

The default wrapper style for components in the navigator. A common use case is to set the backgroundColor for every page

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `navigationBarHidden`

A Boolean value that indicates whether the navigation bar is hidden by default

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `shadowHidden`

A Boolean value that indicates whether to hide the 1px hairline shadow by default

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `tintColor`

The default color used for buttons in the navigation bar

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `titleTextColor`

The default text color of the navigation bar title

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `translucent`

A Boolean value that indicates whether the navigation bar is translucent by default

| Type | Required |
| ---- | -------- |
| bool | No       |

## Methods

### `push()`

```jsx
push((route: object));
```

Navigate forward to a new route

---

### `popN()`

```jsx
popN((n: number));
```

Go back N pages at once. When N=1, behavior matches `pop()`

---

### `pop()`

```jsx
pop();
```

Go back one page

---

### `replaceAtIndex()`

```jsx
replaceAtIndex((route: object), (index: number));
```

Replace a route in the navigation stack.

`index` specifies the route in the stack that should be replaced. If it's negative, it counts from the back.

---

### `replace()`

```jsx
replace((route: object));
```

Replace the route for the current page and immediately load the view for the new route.

---

### `replacePrevious()`

```jsx
replacePrevious((route: object));
```

Replace the route/view for the previous page.

---

### `popToTop()`

```jsx
popToTop();
```

Go back to the top item

---

### `popToRoute()`

```jsx
popToRoute((route: object));
```

Go back to the item for a particular route object

---

### `replacePreviousAndPop()`

```jsx
replacePreviousAndPop((route: object));
```

Replaces the previous route/view and transitions back to it.

---

### `resetTo()`

```jsx
resetTo((route: object));
```

Replaces the top item and popToTop

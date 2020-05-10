---
id: version-0.5-navigatorios
title: NavigatorIOS
original_id: navigatorios
---

NavigatorIOS wraps UIKit navigation and allows you to add back-swipe functionality across your app.

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

A navigation object contains the following functions:

- `push(route)` - Navigate forward to a new route
- `pop()` - Go back one page
- `popN(n)` - Go back N pages at once. When N=1, behavior matches `pop()`
- `replace(route)` - Replace the route for the current page and immediately load the view for the new route
- `replacePrevious(route)` - Replace the route/view for the previous page
- `replacePreviousAndPop(route)` - Replaces the previous route/view and transitions back to it
- `resetTo(route)` - Replaces the top item and popToTop
- `popToRoute(route)` - Go back to the item for a particular route object
- `popToTop()` - Go back to the top item

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

### Props

- [`initialRoute`](navigatorios.md#initialroute)
- [`barTintColor`](navigatorios.md#bartintcolor)
- [`itemWrapperStyle`](navigatorios.md#itemwrapperstyle)
- [`navigationBarHidden`](navigatorios.md#navigationbarhidden)
- [`tintColor`](navigatorios.md#tintcolor)
- [`titleTextColor`](navigatorios.md#titletextcolor)

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
- [`handleNavigationComplete`](navigatorios.md#handlenavigationcomplete)
- [`renderNavigationStackItems`](navigatorios.md#rendernavigationstackitems)

---

# Reference

## Props

### `initialRoute`

NavigatorIOS uses "route" objects to identify child views, their props, and navigation bar configuration. "push" and all the other navigation operations expect routes to be like this:

| Type                                                                                                                                                                                                                                                                                                                                                      | Required |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| object: {component: function,title: string,passProps: object,backButtonIcon: Image.propTypes.source,backButtonTitle: string,leftButtonIcon: Image.propTypes.source,leftButtonTitle: string,onLeftButtonPress: function,rightButtonIcon: Image.propTypes.source,rightButtonTitle: string,onRightButtonPress: function,wrapperStyle: [View](view.md#style)} | Yes      |

---

### `barTintColor`

The background color of the navigation bar

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `itemWrapperStyle`

The default wrapper style for components in the navigator. A common use case is to set the backgroundColor for every page

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `navigationBarHidden`

A Boolean value that indicates whether the navigation bar is hidden

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `tintColor`

The color used for buttons in the navigation bar

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `titleTextColor`

The text color of the navigation bar title

| Type   | Required |
| ------ | -------- |
| string | No       |

## Methods

### `push()`

```jsx
push((route: object));
```

---

### `popN()`

```jsx
popN((n: number));
```

---

### `pop()`

```jsx
pop();
```

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

Replaces the top of the navigation stack.

---

### `replacePrevious()`

```jsx
replacePrevious((route: object));
```

Replace the current route's parent.

---

### `popToTop()`

```jsx
popToTop();
```

---

### `popToRoute()`

```jsx
popToRoute((route: object));
```

---

### `replacePreviousAndPop()`

```jsx
replacePreviousAndPop((route: object));
```

---

### `resetTo()`

```jsx
resetTo((route: object));
```

---

### `handleNavigationComplete()`

```jsx
handleNavigationComplete((e: Event));
```

---

### `renderNavigationStackItems()`

```jsx
renderNavigationStackItems();
```

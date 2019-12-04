---
id: version-0.5-navigator
title: Navigator
original_id: navigator
---

`Navigator` handles the transition between different scenes in your app. It is implemented in JavaScript and is available on both Android and iOS. If you are targeting iOS only, you may also want to consider using `NavigatorIOS` as it leverages native UIKit navigation.

To set up the `Navigator` you provide one or more objects called routes, to identify each scene. You also provide a `renderScene` function that renders the scene for each route object.

```jsx
import React, {Component} from 'react';
import {Text, Navigator, TouchableHighlight} from 'react-native';

export default class NavAllDay extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title: 'Awesome Scene', index: 0}}
        renderScene={(route, navigator) => <Text>Hello {route.title}!</Text>}
        style={{padding: 100}}
      />
    );
  }
}
```

In the above example, `initialRoute` is used to specify the first route. It contains a title property that identifies the route. The `renderScene` prop returns a function that displays text based on the route's title.

## Additional Scenes

The first example demonstrated one scene. To set up multiple scenes, you pass the `initialRouteStack` prop to `Navigator`:

```jsx
render() {
  const routes = [
    {title: 'First Scene', index: 0},
    {title: 'Second Scene', index: 1},
  ];
  return (
    <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={(route, navigator) =>
        <TouchableHighlight onPress={() => {
          if (route.index === 0) {
            navigator.push(routes[1]);
          } else {
            navigator.pop();
          }
        }}>
        <Text>Hello {route.title}!</Text>
        </TouchableHighlight>
      }
      style={{padding: 100}}
    />
  );
}
```

In the above example, a routes variable is defined with two route objects representing two scenes. Each route has an index property that is used to manage the scene being rendered. The `renderScene` method is changed to either `push` or `pop` the navigator depending on the current route's index. Finally, the `Text` component in the scene is now wrapped in a `TouchableHighlight` component to help trigger the navigator transitions.

## Navigation Bar

You can optionally pass in your own navigation bar by returning a `Navigator.NavigationBar` component to the `navigationBar` prop in `Navigator`. You can configure the navigation bar properties, through the `routeMapper` prop. There you set up the left, right, and title properties of the navigation bar:

```
<Navigator
  renderScene={(route, navigator) =>
    // ...
  }
  navigationBar={
     <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) =>
          { return (<Text>Cancel</Text>); },
         RightButton: (route, navigator, index, navState) =>
           { return (<Text>Done</Text>); },
         Title: (route, navigator, index, navState) =>
           { return (<Text>Awesome Nav Bar</Text>); },
       }}
       style={{backgroundColor: 'gray'}}
     />
  }
/>
```

When configuring the left, right, and title items for the navigation bar, you have access to info such as the current route object and navigation state. This allows you to customize the title for each scene as well as the buttons. For example, you can choose to hide the left button for one of the scenes.

Typically you want buttons to represent the left and right buttons. Building on the previous example, you can set this up as follows:

```
LeftButton: (route, navigator, index, navState) =>
  {
    if (route.index === 0) {
      return null;
    } else {
      return (
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text>Back</Text>
        </TouchableHighlight>
      );
    }
  },
```

This sets up a left navigator bar button that's visible on scenes after the the first one. When the button is tapped the navigator is popped.

Another type of navigation bar, with breadcrumbs, is provided by `Navigator.BreadcrumbNavigationBar`. You can also provide your own navigation bar by passing it through the `navigationBar` prop.

## Scene Transitions

To change the animation or gesture properties of the scene, provide a `configureScene` prop to get the config object for a given route:

```
<Navigator
  renderScene={(route, navigator) =>
    // ...
  }
  configureScene={(route, routeStack) =>
    Navigator.SceneConfigs.FloatFromBottom}
/>
```

In the above example, the newly pushed scene will float up from the bottom. See `Navigator.SceneConfigs` for default animations and more info on available [scene config options](navigator.md#configurescene).

### Props

- [`configureScene`](navigator.md#configurescene)
- [`initialRoute`](navigator.md#initialroute)
- [`initialRouteStack`](navigator.md#initialroutestack)
- [`navigationBar`](navigator.md#navigationbar)
- [`navigator`](navigator.md#navigator)
- [`onDidFocus`](navigator.md#ondidfocus)
- [`onWillFocus`](navigator.md#onwillfocus)
- [`renderScene`](navigator.md#renderscene)
- [`sceneStyle`](navigator.md#scenestyle)

### Methods

- [`immediatelyResetRouteStack`](navigator.md#immediatelyresetroutestack)
- [`jumpTo`](navigator.md#jumpto)
- [`jumpForward`](navigator.md#jumpforward)
- [`jumpBack`](navigator.md#jumpback)
- [`push`](navigator.md#push)
- [`popN`](navigator.md#popn)
- [`pop`](navigator.md#pop)
- [`replaceAtIndex`](navigator.md#replaceatindex)
- [`replace`](navigator.md#replace)
- [`replacePrevious`](navigator.md#replaceprevious)
- [`popToTop`](navigator.md#poptotop)
- [`popToRoute`](navigator.md#poptoroute)
- [`replacePreviousAndPop`](navigator.md#replacepreviousandpop)
- [`resetTo`](navigator.md#resetto)
- [`getCurrentRoutes`](navigator.md#getcurrentroutes)

---

# Reference

## Props

### `configureScene`

Optional function where you can configure scene animations and gestures. Will be invoked with `route` and `routeStack` parameters, where route corresponds to the current scene being rendered by the `Navigator` and `routeStack` is the set of currently mounted routes that the navigator could transition to.

The function should return a scene configuration object.

```jsx
(route, routeStack) => Navigator.SceneConfigs.FloatFromRight;
```

Available scene configuration options are:

- Navigator.SceneConfigs.PushFromRight (default)
- Navigator.SceneConfigs.FloatFromRight
- Navigator.SceneConfigs.FloatFromLeft
- Navigator.SceneConfigs.FloatFromBottom
- Navigator.SceneConfigs.FloatFromBottomAndroid
- Navigator.SceneConfigs.FadeAndroid
- Navigator.SceneConfigs.SwipeFromLeft
- Navigator.SceneConfigs.HorizontalSwipeJump
- Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
- Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft
- Navigator.SceneConfigs.VerticalUpSwipeJump
- Navigator.SceneConfigs.VerticalDownSwipeJump

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `initialRoute`

The initial route for navigation. A route is an object that the navigator will use to identify each scene it renders.

If both `initialRoute` and `initialRouteStack` props are passed to `Navigator`, then `initialRoute` must be in a route in `initialRouteStack`. If `initialRouteStack` is passed as a prop but `initialRoute` is not, then `initialRoute` will default internally to the last item in `initialRouteStack`.

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### `initialRouteStack`

Pass this in to provide a set of routes to initially mount. This prop is required if `initialRoute` is not provided to the navigator. If this prop is not passed in, it will default internally to an array containing only `initialRoute`.

| Type     | Required |
| -------- | -------- |
| [object] | No       |

---

### `navigationBar`

Use this to provide an optional component representing a navigation bar that is persisted across scene transitions. This component will receive two props: navigator and navState representing the navigator component and its state. The component is re-rendered when the route changes.

| Type | Required |
| ---- | -------- |
| node | No       |

---

### `navigator`

Optionally pass in the navigator object from a parent Navigator.

| Type   | Required |
| ------ | -------- |
| object | No       |

---

### `onDidFocus`

Will be called with the new route of each scene after the transition is complete or after the initial mounting.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onWillFocus`

Pass in a function to get notified with the target route when the navigator component is mounted and before each navigator transition.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `renderScene`

Required function which renders the scene for a given route. Will be invoked with the route and the navigator object.

```jsx
(route, navigator) => (
  <MySceneComponent title={route.title} navigator={navigator} />
);
```

| Type     | Required |
| -------- | -------- |
| function | Yes      |

---

### `sceneStyle`

Styles to apply to the container of each scene.

| Type              | Required |
| ----------------- | -------- |
| [style](style.md) | No       |

## Methods

---

### `immediatelyResetRouteStack()`

```jsx
immediatelyResetRouteStack((nextRouteStack: RouteStack));
```

Reset every scene with an array of routes. All existing route stacks are destroyed and potentially recreated. There is no accompanying animation and this method immediately replaces and re-renders the navigation bar and the stack items.

**Parameters:**

| Name           | Type       | Required | Description                       |
| -------------- | ---------- | -------- | --------------------------------- |
| nextRouteStack | RouteStack | Yes      | Next route stack to reinitialize. |

---

### `jumpTo()`

```jsx
jumpTo((route: object));
```

Transition to an existing scene without unmounting.

The specified route must be in the currently mounted set of routes defined in `routeStack`.

**Parameters:**

| Name  | Type   | Required | Description             |
| ----- | ------ | -------- | ----------------------- |
| route | object | Yes No   | Route to transition to. |

---

### `jumpForward()`

```jsx
jumpForward();
```

Jump forward to the next scene in the route stack.

---

### `jumpBack()`

```jsx
jumpBack();
```

Jump backward without unmounting the current scene.

---

### `push()`

```jsx
push((route: object));
```

Navigate forward to a new scene, squashing any scenes that you could jump forward to.

**Parameters:**

| Name  | Type   | Required | Description                             |
| ----- | ------ | -------- | --------------------------------------- |
| route | object | Yes No   | Route to push into the navigator stack. |

---

### `popN()`

```jsx
popN((n: number));
```

Go back N scenes at once. When N=1, behavior matches `pop()`. When N is invalid (negative or bigger than current routes count), do nothing.

**Parameters:**

| Name | Type   | Required | Description                                        |
| ---- | ------ | -------- | -------------------------------------------------- |
| n    | number | Yes      | The number of scenes to pop. Should be an integer. |

---

### `pop()`

```jsx
pop();
```

Transition back and unmount the current scene.

---

### `replaceAtIndex()`

```jsx
replaceAtIndex((route: object), (index: number), (cb: Function));
```

Replace a scene as specified by an index.

**Parameters:**

| Name  | Type     | Required | Description                                                                                        |
| ----- | -------- | -------- | -------------------------------------------------------------------------------------------------- |
| route | object   | Yes      | Route representing the new scene to render.                                                        |
| index | number   | Yes      | The route in the stack that should be replaced. If negative, it counts from the back of the stack. |
| cb    | function | Yes      | Callback function when the scene has been replaced.                                                |

---

### `replace()`

```jsx
replace((route: object));
```

Replace the current scene with a new route.

**Parameters:**

| Name  | Type   | Required | Description                            |
| ----- | ------ | -------- | -------------------------------------- |
| route | object | Yes No   | Route that replaces the current scene. |

---

### `replacePrevious()`

```jsx
replacePrevious((route: object));
```

Replace the previous scene.

**Parameters:**

| Name  | Type   | Required | Description                             |
| ----- | ------ | -------- | --------------------------------------- |
| route | object | Yes      | Route that replaces the previous scene. |

---

### `popToTop()`

```jsx
popToTop();
```

Get the first scene in the stack, unmounting every other scene.

---

### `popToRoute()`

```jsx
popToRoute((route: object));
```

Get a particular scene, as specified by its route. All scenes after it will be unmounted.

**Parameters:**

| Name  | Type   | Required | Description      |
| ----- | ------ | -------- | ---------------- |
| route | object | Yes      | Route to pop to. |

---

### `replacePreviousAndPop()`

```jsx
replacePreviousAndPop((route: object));
```

Replace the previous scene and get to it.

**Parameters:**

| Name  | Type   | Required | Description                             |
| ----- | ------ | -------- | --------------------------------------- |
| route | object | Yes      | Route that replaces the previous scene. |

---

### `resetTo()`

```jsx
resetTo((route: object));
```

Navigate to a new scene and reset route stack.

**Parameters:**

| Name  | Type   | Required | Description           |
| ----- | ------ | -------- | --------------------- |
| route | object | Yes      | Route to navigate to. |

---

### `getCurrentRoutes()`

```jsx
getCurrentRoutes();
```

Returns the current list of routes.

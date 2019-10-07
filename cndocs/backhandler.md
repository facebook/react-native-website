---
id: backhandler
title: BackHandler
---

监听设备上的后退按钮事件。

Android：监听后退按钮事件。如果没有添加任何监听函数，或者所有的监听函数都返回 false，则会执行默认行为，退出应用。

tvOS(即 Apple TV 机顶盒)：监听遥控器上的后退按钮事件（阻止应用退出的功能尚未实现）。

iOS：尚无作用。

监听函数是按倒序的顺序执行（即后添加的函数先执行）。如果某一个函数返回 true，则后续的函数都不会被调用。Beware: If your app shows an opened `Modal`, BackHandler will not publish any events ([see `Modal` docs](modal.md#onrequestclose)).

示例：

```jsx
BackHandler.addEventListener("hardwareBackPress", function() {
  // this.onMainScreen()和this.goBack()两个方法都只是伪方法，需要你自己去实现！

  if (!this.onMainScreen()) {
    this.goBack();
    return true;
  }
  return false;
});
```

在生命周期方法中使用的示例：

```jsx
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.goBack(); // works best when the goBack is async
    return true;
  }
```

在生命周期方法中使用的另一种写法：

```jsx
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
```

---

# 文档

## 方法

### `addEventListener()`

```jsx
static addEventListener(eventName, handler)
```

---

### `exitApp()`

```jsx
static exitApp()
```

---

### `removeEventListener()`

```jsx
static removeEventListener(eventName, handler)
```

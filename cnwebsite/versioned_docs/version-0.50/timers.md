---
id: version-0.50-timers
title: 定时器
original_id: timers
---

定时器是一个应用中非常重要的部分。React Native实现了和浏览器一致的[定时器Timer](https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Timers)。

## 定时器

- setTimeout, clearTimeout
- setInterval, clearInterval
- setImmediate, clearImmediate
- requestAnimationFrame, cancelAnimationFrame

`requestAnimationFrame(fn)`和`setTimeout(fn, 0)`不同，前者会在每帧刷新之后执行一次，而后者则会尽可能快的执行（在iPhone5S上有可能每秒1000次以上）。

`setImmediate`则会在当前JavaScript执行块结束的时候执行，就在将要发送批量响应数据到原生之前。注意如果你在`setImmediate`的回调函数中又执行了`setImmediate`，它会紧接着立刻执行，而不会在调用之前等待原生代码。

`Promise`的实现就使用了`setImmediate`来执行异步调用。

## InteractionManager

原生应用感觉如此流畅的一个重要原因就是在互动和动画的过程中避免繁重的操作。在React Native里，我们目前受到限制，因为我们只有一个JavaScript执行线程。不过你可以用`InteractionManager`来确保在执行繁重工作之前所有的交互和动画都已经处理完毕。

应用可以通过以下代码来安排一个任务，使其在交互结束之后执行：

```javascript
InteractionManager.runAfterInteractions(() => {
   // ...需要长时间同步执行的任务...
});
```

我们来把它和之前的几个任务安排方法对比一下：

- requestAnimationFrame(): 用来执行在一段时间内控制视图动画的代码
- setImmediate/setTimeout/setInterval(): 在稍后执行代码。注意这有可能会延迟当前正在进行的动画。
- runAfterInteractions(): 在稍后执行代码，不会延迟当前进行的动画。

触摸处理系统会把一个或多个进行中的触摸操作认定为'交互'，并且会将`runAfterInteractions()`的回调函数延迟执行，直到所有的触摸操作都结束或取消了。

InteractionManager还允许应用注册动画，在动画开始时创建一个交互“句柄”，然后在结束的时候清除它。

```javascript
var handle = InteractionManager.createInteractionHandle();
// 执行动画... (`runAfterInteractions`中的任务现在开始排队等候)
// 在动画完成之后
InteractionManager.clearInteractionHandle(handle);
// 在所有句柄都清除之后，现在开始依序执行队列中的任务
```

## 务必在卸载组件前清除定时器！

我们发现很多React Native应用发生致命错误（闪退）是与计时器有关。具体来说，是在某个组件被卸载（unmount）之后，计时器却仍然在运行。要解决这个问题，只需铭记`在unmount组件时清除（clearTimeout/clearInterval）所有用到的定时器`即可：

```js
import React,{
  Component
} from 'react';

export default class Hello extends Component {
  componentDidMount() {
    this.timer = setTimeout(
      () => { console.log('把一个定时器的引用挂在this上'); },
      500
    );
  }
  componentWillUnmount() {
    // 请注意Un"m"ount的m是小写
    
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }
};
```

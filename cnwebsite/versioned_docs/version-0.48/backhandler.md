---
id: version-0.48-backhandler
title: BackHandler
original_id: backhandler
---

监听设备上的后退按钮事件。

Android：监听后退按钮事件。如果没有添加任何监听函数，或者所有的监听函数都返回false，则会执行默认行为，退出应用。 

tvOS(即Apple TV机顶盒)：监听遥控器上的后退按钮事件（阻止应用退出的功能尚未实现）。

iOS：尚无作用。

监听函数是按倒序的顺序执行（即后添加的函数先执行）。如果某一个函数返回true，则后续的函数都不会被调用。

```javascript
BackHandler.addEventListener('hardwareBackPress', function() {
 // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
 // Typically you would use the navigator here to go to the last state.

 if (!this.onMainScreen()) {
   this.goBack();
   return true;
 }
 return false;
});
```

__译注__：以上的`this.onMainScreen()`和`this.goBack()`两个方法都只是伪方法，需要你自己去实现！具体可以参考这篇[博文](http://bbs.reactnative.cn/topic/480)。

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="exitapp"></a><span class="propType">static </span>exitApp<span class="propType">()</span> <a class="hash-link" href="#exitapp">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="addeventlistener"></a><span class="propType">static </span>addEventListener<span class="propType">(eventName, handler)</span> <a class="hash-link" href="#addeventlistener">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="removeeventlistener"></a><span class="propType">static </span>removeEventListener<span class="propType">(eventName, handler)</span> <a class="hash-link" href="#removeeventlistener">#</a></h4></div>
</div>

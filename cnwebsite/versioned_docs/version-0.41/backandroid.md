---
id: version-0.41-backandroid
title: BackAndroid
original_id: backandroid
---

监听硬件的`back`键操作。如果没有任何监听函数，或者监听函数的返回值不是true，则会调用默认的back键功能来退出应用。

例子：

```javascript
BackAndroid.addEventListener('hardwareBackPress', function() {
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
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="addeventlistener"></a><span class="propType">static </span>addEventListener<span class="propType">(eventName: BackPressEventName, handler: Function)</span> <a class="hash-link" href="#addeventlistener">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="removeeventlistener"></a><span class="propType">static </span>removeEventListener<span class="propType">(eventName: BackPressEventName, handler: Function)</span> <a class="hash-link" href="#removeeventlistener">#</a></h4></div>
</div>

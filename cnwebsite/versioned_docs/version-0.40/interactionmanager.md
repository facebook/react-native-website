---
id: version-0.40-interactionmanager
title: InteractionManager
original_id: interactionmanager
---

Interactionmanager可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。这样可以保证JavaScript动画的流畅运行。

应用这样可以安排一个任务在交互和动画完成之后执行：

```javascript
InteractionManager.runAfterInteractions(() => {
  // ...耗时较长的同步的任务...
});
```

把这个和其他的延迟计划函数对比：

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
`runAfterInteractions`接受一个普通的回调函数，或是一个`PromiseTask`对象，该对象需要带有名为`gen`的方法，并返回一个`Promise`。如果提供的参数是一个`PromiseTask`， 那么即便它是异步的它也会阻塞任务队列，直到它（以及它所有的依赖任务，哪怕这些依赖任务也是异步的）执行完毕后，才会执行下一个任务。

默认情况下，排队的任务会在一次setImmediate方法中依序批量执行。如果你调用了setDeadLine方法并设定了一个正整数值，则任务只会在设定的时间到达后开始执行。在此之前，任务会通过setTimeout来挂起并阻塞其他任务执行，这样可以给诸如触摸交互一类的事件留出时间，使应用可以更快地响应用户。

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="runafterinteractions"></a><span class="propType">static </span>runAfterInteractions<span class="propType">(callback: Function)</span> <a class="hash-link" href="#runafterinteractions">#</a></h4>
		<div><p>安排一个函数在所有的交互和动画完成之后运行。返回一个可取消的promise。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="createinteractionhandle"></a><span class="propType">static </span>createInteractionHandle<span class="propType">()</span> <a class="hash-link" href="#createinteractionhandle">#</a></h4>
		<div><p>通知管理器有某个动画或者交互开始了。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="clearinteractionhandle"></a><span class="propType">static </span>clearInteractionHandle<span class="propType">(handle: Handle)</span> <a class="hash-link" href="#clearinteractionhandle">#</a></h4>
		<div><p>通知管理器有某个动画或者交互已经结束了。</p></div>
	</div>
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="setdeadline"></a><span class="propType">static </span>setDeadline<span class="propType">(deadline: number)</span> <a class="hash-link" href="#setdeadline">#</a></h4>
	<div><p>如果设定了一个正整数值，则会使用setTimeout来挂起所有尚未执行的任务。在eventLoopRunningTime到达设定时间后，才开始使用一个setImmediate方法来批量执行所有任务。</p></div>
</div>
</div>

### 属性

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="events"></a>Events<span class="propType">: CallExpression</span> <a class="hash-link" href="#events">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="addlistener"></a>addListener<span class="propType">: CallExpression</span> <a class="hash-link" href="#addlistener">#</a></h4></div>
</div>

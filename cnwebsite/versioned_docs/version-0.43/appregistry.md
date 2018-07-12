---
id: version-0.43-appregistry
title: AppRegistry
original_id: appregistry
---

`AppRegistry`是JS运行所有React Native应用的入口。应用的根组件应当通过`AppRegistry.registerComponent`方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用`AppRegistry.runApplication`来真正运行应用。  

要“结束”一个应用并销毁视图的话，请调用`AppRegistry.unmountApplicationComponentAtRootTag`方法，参数为在`runApplication`中使用的标签名。它们必须严格匹配。

`AppRegistry`应当在`require`序列中尽可能早的被require到，以确保JS运行环境在其它模块之前被准备好。

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="registerconfig"></a><span class="propType">static </span>registerConfig<span class="propType">(config: Array&lt;AppConfig&gt;)</span> <a class="hash-link" href="#registerconfig">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="registercomponent"></a><span class="propType">static </span>registerComponent<span class="propType">(appKey: string, getComponentFunc: ComponentProvider)</span> <a class="hash-link" href="#registercomponent">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="registerrunnable"></a><span class="propType">static </span>registerRunnable<span class="propType">(appKey: string, func: Function)</span> <a class="hash-link" href="#registerrunnable">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="getappkeys"></a><span class="propType">static </span>getAppKeys<span class="propType">()</span> <a class="hash-link" href="#getappkeys">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="runapplication"></a><span class="propType">static </span>runApplication<span class="propType">(appKey: string, appParameters: any)</span> <a class="hash-link" href="#runapplication">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="unmountapplicationcomponentatroottag"></a><span class="propType">static </span>unmountApplicationComponentAtRootTag<span class="propType">(rootTag: number)</span> <a class="hash-link" href="#unmountapplicationcomponentatroottag">#</a></h4></div>
</div>

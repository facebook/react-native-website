---
id: version-0.51-appregistry
title: AppRegistry
original_id: appregistry
---

`AppRegistry`是JS运行所有React Native应用的入口。应用的根组件应当通过`AppRegistry.registerComponent`方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用`AppRegistry.runApplication`来真正运行应用。  

要“结束”一个应用并销毁视图的话，请调用`AppRegistry.unmountApplicationComponentAtRootTag`方法，参数为在`runApplication`中使用的标签名。它们必须严格匹配。

`AppRegistry`应当在`require`序列中尽可能早的被require到，以确保JS运行环境在其它模块之前被准备好。

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="registerconfig"></a><span class="methodType">static </span>registerConfig<span
            class="methodType">(config)</span> <a class="hash-link" href="#registerconfig">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="registercomponent"></a><span class="methodType">static </span>registerComponent<span
            class="methodType">(appKey, component, section?)</span> <a class="hash-link"
                                                                       href="#registercomponent">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="registerrunnable"></a><span class="methodType">static </span>registerRunnable<span
            class="methodType">(appKey, run)</span> <a class="hash-link"
                                                       href="#registerrunnable">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="registersection"></a><span class="methodType">static </span>registerSection<span
            class="methodType">(appKey, component)</span> <a class="hash-link"
                                                             href="#registersection">#</a></h4>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="getappkeys"></a><span
            class="methodType">static </span>getAppKeys<span class="methodType">()</span> <a class="hash-link"
                                                                                             href="#getappkeys">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="getsectionkeys"></a><span class="methodType">static </span>getSectionKeys<span
            class="methodType">()</span> <a class="hash-link" href="#getsectionkeys">#</a></h4>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="getsections"></a><span
            class="methodType">static </span>getSections<span class="methodType">()</span> <a class="hash-link"
                                                                                              href="#getsections">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="getrunnable"></a><span
            class="methodType">static </span>getRunnable<span class="methodType">(appKey)</span> <a class="hash-link"
                                                                                                    href="#getrunnable">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="getregistry"></a><span
            class="methodType">static </span>getRegistry<span class="methodType">()</span> <a class="hash-link"
                                                                                              href="#getregistry">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="setcomponentproviderinstrumentationhook"></a><span
            class="methodType">static </span>setComponentProviderInstrumentationHook<span
            class="methodType">(hook)</span> <a class="hash-link"
                                                href="#setcomponentproviderinstrumentationhook">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="runapplication"></a><span class="methodType">static </span>runApplication<span
            class="methodType">(appKey, appParameters)</span> <a class="hash-link"
                                                                 href="#runapplication">#</a></h4>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="unmountapplicationcomponentatroottag"></a><span
            class="methodType">static </span>unmountApplicationComponentAtRootTag<span
            class="methodType">(rootTag)</span> <a class="hash-link"
                                                   href="#unmountapplicationcomponentatroottag">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="registerheadlesstask"></a><span
            class="methodType">static </span>registerHeadlessTask<span class="methodType">(taskKey, task)</span> <a
            class="hash-link" href="#registerheadlesstask">#</a></h4>
        <div><p>Register a headless task. A headless task is a bit of code that runs without a UI.
            @param taskKey the key associated with this task
            @param task a promise returning function that takes some data passed from the native side as
            the only argument; when the promise is resolved or rejected the native side is
            notified of this event and it may decide to destroy the JS context.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="startheadlesstask"></a><span class="methodType">static </span>startHeadlessTask<span
            class="methodType">(taskId, taskKey, data)</span> <a class="hash-link"
                                                                 href="#startheadlesstask">#</a>
    </h4>
        <div><p>Only called from native code. Starts a headless task.</p>
            <p>@param taskId the native id for this task instance to keep track of its execution
                @param taskKey the key for the task to start
                @param data the data to pass to the task</p></div>
    </div>
</div>

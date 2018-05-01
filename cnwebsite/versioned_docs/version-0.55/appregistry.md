---
id: version-0.55-appregistry
title: AppRegistry
original_id: appregistry
---

`AppRegistry`所有 React Native 应用的 JS 入口。应用的根组件应当通过`AppRegistry.registerComponent`方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用`AppRegistry.runApplication`来真正运行应用。

要“结束”一个应用并销毁视图的话，请调用`AppRegistry.unmountApplicationComponentAtRootTag`方法，参数为在`runApplication`中使用的标签名。它们必须严格匹配。

`AppRegistry`应当在`require`序列中尽可能早的被 require 到，以确保 JS 运行环境在其它模块之前被准备好。

### 查看方法

* [`setWrapperComponentProvider`](appregistry.md#setwrappercomponentprovider)
* [`registerConfig`](appregistry.md#registerconfig)
* [`registerComponent`](appregistry.md#registercomponent)
* [`registerRunnable`](appregistry.md#registerrunnable)
* [`registerSection`](appregistry.md#registersection)
* [`getAppKeys`](appregistry.md#getappkeys)
* [`getSectionKeys`](appregistry.md#getsectionkeys)
* [`getSections`](appregistry.md#getsections)
* [`getRunnable`](appregistry.md#getrunnable)
* [`getRegistry`](appregistry.md#getregistry)
* [`setComponentProviderInstrumentationHook`](appregistry.md#setcomponentproviderinstrumentationhook)
* [`runApplication`](appregistry.md#runapplication)
* [`unmountApplicationComponentAtRootTag`](appregistry.md#unmountapplicationcomponentatroottag)
* [`registerHeadlessTask`](appregistry.md#registerheadlesstask)
* [`startHeadlessTask`](appregistry.md#startheadlesstask)

---

# 文档

## 方法

### `setWrapperComponentProvider()`

```javascript
static setWrapperComponentProvider(provider)
```

---

### `registerConfig()`

```javascript
static registerConfig(config)
```

---

### `registerComponent()`

```javascript
static registerComponent(appKey, componentProvider, section?)
```

---

### `registerRunnable()`

```javascript
static registerRunnable(appKey, run)
```

---

### `registerSection()`

```javascript
static registerSection(appKey, component)
```

---

### `getAppKeys()`

```javascript
static getAppKeys()
```

---

### `getSectionKeys()`

```javascript
static getSectionKeys()
```

---

### `getSections()`

```javascript
static getSections()
```

---

### `getRunnable()`

```javascript
static getRunnable(appKey)
```

---

### `getRegistry()`

```javascript
static getRegistry()
```

---

### `setComponentProviderInstrumentationHook()`

```javascript
static setComponentProviderInstrumentationHook(hook)
```

---

### `runApplication()`

```javascript
static runApplication(appKey, appParameters)
```

---

### `unmountApplicationComponentAtRootTag()`

```javascript
static unmountApplicationComponentAtRootTag(rootTag)
```

---

### `registerHeadlessTask()`

```javascript
static registerHeadlessTask(taskKey, task)
```

Register a headless task. A headless task is a bit of code that runs without a UI. @param taskKey the key associated with this task @param task a promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context.

---

### `startHeadlessTask()`

```javascript
static startHeadlessTask(taskId, taskKey, data)
```

Only called from native code. Starts a headless task.

@param taskId the native id for this task instance to keep track of its execution @param taskKey the key for the task to start @param data the data to pass to the task

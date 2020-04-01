---
id: version-0.62-appregistry
title: AppRegistry
original_id: appregistry
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

`AppRegistry`所有 React Native 应用的 JS 入口。应用的根组件应当通过`AppRegistry.registerComponent`方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用`AppRegistry.runApplication`来真正运行应用。

要“结束”一个应用并销毁视图的话，请调用`AppRegistry.unmountApplicationComponentAtRootTag`方法，参数为在`runApplication`中使用的标签名。它们必须严格匹配。

`AppRegistry`应当在`require`序列中尽可能早的被 require 到，以确保 JS 运行环境在其它模块之前被准备好。

---

# 文档

## 方法

### `setWrapperComponentProvider()`

```jsx
static setWrapperComponentProvider(provider)
```

---

### `registerConfig()`

```jsx
static registerConfig(config)
```

---

### `registerComponent()`

```jsx
static registerComponent(appKey, componentProvider, section?)
```

---

### `registerRunnable()`

```jsx
static registerRunnable(appKey, run)
```

---

### `registerSection()`

```jsx
static registerSection(appKey, component)
```

---

### `getAppKeys()`

```jsx
static getAppKeys()
```

---

### `getSectionKeys()`

```jsx
static getSectionKeys()
```

---

### `getSections()`

```jsx
static getSections()
```

---

### `getRunnable()`

```jsx
static getRunnable(appKey)
```

---

### `getRegistry()`

```jsx
static getRegistry()
```

---

### `setComponentProviderInstrumentationHook()`

```jsx
static setComponentProviderInstrumentationHook(hook)
```

---

### `runApplication()`

```jsx
static runApplication(appKey, appParameters)
```

---

### `unmountApplicationComponentAtRootTag()`

```jsx
static unmountApplicationComponentAtRootTag(rootTag)
```

---

### `registerHeadlessTask()`

```jsx
static registerHeadlessTask(taskKey, taskProvider)
```

Register a headless task. A headless task is a bit of code that runs without a UI. @param taskKey the key associated with this task @param taskProvider a promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context.

---

### `registerCancellableHeadlessTask()`

```jsx
static registerCancellableHeadlessTask(taskKey, taskProvider, taskCancelProvider)
```

Register a headless task which can be cancelled. A headless task is a bit of code that runs without a UI. @param taskKey the key associated with this task @param taskProvider a promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. @param taskCancelProvider a void returning function that takes no arguments; when a cancellation is requested, the function being executed by taskProvider should wrap up and return ASAP.

### `startHeadlessTask()`

```jsx
static startHeadlessTask(taskId, taskKey, data)
```

Only called from native code. Starts a headless task.

@param taskId the native id for this task instance to keep track of its execution @param taskKey the key for the task to start @param data the data to pass to the task

---

### `cancelHeadlessTask()`

```jsx
static cancelHeadlessTask(taskId, taskKey)
```

Only called from native code. Cancels a headless task. @param taskId the native id for this task instance that was used when startHeadlessTask was called @param taskKey the key for the task that was used when startHeadlessTask was called

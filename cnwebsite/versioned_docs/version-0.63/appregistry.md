---
id: version-0.63-appregistry
title: AppRegistry
original_id: appregistry
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

<div class="banner-native-code-required">
  <h3>Project with Native Code Required</h3>
  <p>
    If you are using the managed <code>expo-cli</code> workflow there is only ever one entry component registered with <code>AppRegistry</code> and it is handled automatically, you do not need to use this API.
  </p>
</div>

`AppRegistry`是所有 React Native 应用的 JS 入口。应用的根组件应当通过`AppRegistry.registerComponent`方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用`AppRegistry.runApplication`来真正运行应用。

```jsx
import { Text, AppRegistry } from 'react-native';

const App = (props) => (
  <View>
    <Text>App1</Text>
  </View>
);

AppRegistry.registerComponent('Appname', () => App);
```

要“结束”一个应用并销毁视图的话，请调用`AppRegistry.unmountApplicationComponentAtRootTag`方法，参数为在`runApplication`中使用的标签名。它们必须严格匹配。

`AppRegistry`应当在`require`序列中尽可能早的被 require 到，以确保 JS 运行环境在其它模块之前被准备好。

---

# 文档

## 方法

### `setWrapperComponentProvider()`

```jsx
static setWrapperComponentProvider(provider)
```

**参数：**

| Name     | Type              | Required |
| -------- | ----------------- | -------- |
| provider | ComponentProvider | yes      |

---

### `enableArchitectureIndicator()`

```jsx
static enableArchitectureIndicator(enabled)
```

**参数：**

| Name    | Type    | Required |
| ------- | ------- | -------- |
| enabled | boolean | yes      |

---

### `registerConfig()`

```jsx
static registerConfig([config])
```

**参数：**

| Name   | Type      | Required | Description |
| ------ | --------- | -------- | ----------- |
| config | AppConfig | yes      | See below.  |

Valid `AppConfig` keys are:

- 'appKey' (string)- Required.
- 'component' (ComponentProvider) - Optional.
- 'run' (Function) - Optional.
- 'section' (boolean) - Optional.

---

### `registerComponent()`

```jsx
static registerComponent(appKey, componentProvider, section?)
```

**参数：**

| Name              | Type              | Required |
| ----------------- | ----------------- | -------- |
| appKey            | string            | yes      |
| componentProvider | ComponentProvider | yes      |
| section           | boolean           | no       |

---

### `registerRunnable()`

```jsx
static registerRunnable(appKey, run)
```

**参数：**

| Name   | Type     | Required |
| ------ | -------- | -------- |
| appKey | string   | yes      |
| run    | Function | yes      |

---

### `registerSection()`

```jsx
static registerSection(appKey, component)
```

**参数：**

| Name      | Type              | Required |
| --------- | ----------------- | -------- |
| appKey    | string            | yes      |
| component | ComponentProvider | yes      |

---

### `getAppKeys()`

```jsx
static getAppKeys()
```

Returns an Array of AppKeys

---

### `getSectionKeys()`

```jsx
static getSectionKeys()
```

Returns an Array of SectionKeys

---

### `getSections()`

```jsx
static getSections()
```

Returns all Runnables which is an object with key of `AppKeys` and value of type of `Runnable` which consist of:

- 'component' (ComponentProvider).
- 'run' (Function).

---

### `getRunnable()`

```jsx
static getRunnable(appKey)
```

Returns a `Runnable` object which consist of:

- 'component' (ComponentProvider).
- 'run' (Function).

---

### `getRegistry()`

```jsx
static getRegistry()
```

Returns a type `Registry` which consist of:

- 'sections' (Array of strings).
- 'runnables' (Runnables).

---

### `setComponentProviderInstrumentationHook()`

```jsx
static setComponentProviderInstrumentationHook(hook)
```

**参数：**

| Name | Type     | Required | Description |
| ---- | -------- | -------- | ----------- |
| hook | Function | yes      | See below.  |

A valid `hook` accepts the following as arguments:

- 'component' (ComponentProvider)- Required.
- 'scopedPerformanceLogger' (IPerformanceLogger)- Required.

The `hook` function returns a React Component

---

### `runApplication()`

```jsx
static runApplication(appKey, appParameters)
```

加载 JavaScript bundle 并运行应用。

**参数：**

| Name          | Type   | Required |
| ------------- | ------ | -------- |
| appKey        | string | yes      |
| appParameters | any    | yes      |

---

### `unmountApplicationComponentAtRootTag()`

```jsx
static unmountApplicationComponentAtRootTag(rootTag)
```

Stops an application when a view should be destroyed.

**参数：**

| Name    | Type   | Required |
| ------- | ------ | -------- |
| rootTag | number | yes      |

---

### `registerHeadlessTask()`

```jsx
static registerHeadlessTask(taskKey, taskProvider)
```

Register a headless task. A headless task is a bit of code that runs without a UI. @param taskKey the key associated with this task @param taskProvider a promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context.

This is a way to run tasks in JavaScript while your app is in the background. It can be used, for example, to sync fresh data, handle push notifications, or play music.

**参数：**

| Name         | Type         | Required | Description |
| ------------ | ------------ | -------- | ----------- |
| taskKey      | String       | yes      | See below.  |
| taskProvider | TaskProvider | yes      | See below.  |

- A valid `TaskProvider` is a function that returns a `Task`.
- A `Task` is a function that accepts any data as argument and returns a Promise that resolves to undefined.

---

### `registerCancellableHeadlessTask()`

```jsx
static registerCancellableHeadlessTask(taskKey, taskProvider, taskCancelProvider)
```

Register a headless task which can be cancelled. A headless task is a bit of code that runs without a UI. @param taskKey the key associated with this task @param taskProvider a promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. @param taskCancelProvider a void returning function that takes no arguments; when a cancellation is requested, the function being executed by taskProvider should wrap up and return ASAP.

**参数：**

| Name               | Type               | Required | Description |
| ------------------ | ------------------ | -------- | ----------- |
| taskKey            | String             | yes      | See below.  |
| taskProvider       | TaskProvider       | yes      | See below.  |
| taskCancelProvider | TaskCancelProvider | yes      | See below.  |

- A valid `TaskProvider` is a function that returns a `Task`.
- A `Task` is a function that accepts any data as argument and returns a Promise that resolves to undefined.
- A valid `TaskCancelProvider` is a function that returns a `TaskCanceller`.
- A `TaskCanceller` is a function that accepts no argument and returns void.

### `startHeadlessTask()`

```jsx
static startHeadlessTask(taskId, taskKey, data)
```

Only called from native code. Starts a headless task.

@param taskId the native id for this task instance to keep track of its execution @param taskKey the key for the task to start @param data the data to pass to the task

**参数：**

| Name    | Type   | Required |
| ------- | ------ | -------- |
| taskId  | number | yes      |
| taskKey | string | yes      |
| data    | any    | yes      |

---

### `cancelHeadlessTask()`

```jsx
static cancelHeadlessTask(taskId, taskKey)
```

Only called from native code. Cancels a headless task. @param taskId the native id for this task instance that was used when startHeadlessTask was called @param taskKey the key for the task that was used when startHeadlessTask was called

**参数：**

| Name    | Type   | Required |
| ------- | ------ | -------- |
| taskId  | number | yes      |
| taskKey | string | yes      |

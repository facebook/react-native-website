---
id: appregistry
title: AppRegistry
---

<div class="banner-native-code-required">
  <h3>仅适用于非沙盒项目</h3>
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

### `cancelHeadlessTask()`

```jsx
static cancelHeadlessTask(taskId, taskKey)
```

Only called from native code. Cancels a headless task. @param taskId the native id for this task instance that was used when startHeadlessTask was called @param taskKey the key for the task that was used when startHeadlessTask was called

**参数：**

| 名称                                                     | 类型   | 说明                                                                                    |
| -------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| taskId <div class="label basic required">Required</div>  | number | The native id for this task instance that was used when `startHeadlessTask` was called. |
| taskKey <div class="label basic required">Required</div> | string | The key for the task that was used when `startHeadlessTask` was called.                 |

---

### `enableArchitectureIndicator()`

```jsx
static enableArchitectureIndicator(enabled)
```

**参数：**

| 名称                                                     | 类型    |
| -------------------------------------------------------- | ------- |
| enabled <div class="label basic required">Required</div> | boolean |

---

### `getAppKeys()`

```jsx
static getAppKeys()
```

Returns an Array of AppKeys

---

### `getRegistry()`

```jsx
static getRegistry()
```

Returns a [Registry](appregistry#registry) object.

---

### `getRunnable()`

```jsx
static getRunnable(appKey)
```

Returns a [Runnable](appregistry#runnable) object.

**参数：**

| 名称                                                    | 类型   |
| ------------------------------------------------------- | ------ |
| appKey <div class="label basic required">Required</div> | string |

---

### `getSectionKeys()`

```jsx
static getSectionKeys()
```

Returns an array of strings.

---

### `getSections()`

```jsx
static getSections()
```

Returns a [Runnables](appregistry#runnables) object.

---

### `registerCancellableHeadlessTask()`

```jsx
static registerCancellableHeadlessTask(taskKey, taskProvider, taskCancelProvider)
```

Register a headless task which can be cancelled. A headless task is a bit of code that runs without a UI.

**参数：**

| 名称                                                                              | 类型                                                 | 说明                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey <div class="label basic required two-lines">Required</div>            | string                                               | The native id for this task instance that was used when startHeadlessTask was called.                                                                                                                                               |
| taskProvider <div class="label basic required two-lines">Required</div>       | [TaskProvider](appregistry#taskprovider)             | A promise returning function that takes some data passed from the native side as the only argument. When the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. |
| taskCancelProvider <div class="label basic required two-lines">Required</div> | [TaskCancelProvider](appregistry#taskcancelprovider) | a void returning function that takes no arguments; when a cancellation is requested, the function being executed by taskProvider should wrap up and return ASAP.                                                                    |

---

### `registerComponent()`

```jsx
static registerComponent(appKey, componentProvider, section?)
```

**参数：**

| 名称                                                               | 类型              |
| ------------------------------------------------------------------ | ----------------- |
| appKey <div class="label basic required">Required</div>            | string            |
| componentProvider <div class="label basic required">Required</div> | ComponentProvider |
| section                                                            | boolean           |

---

### `registerConfig()`

```jsx
static registerConfig(config)
```

**参数：**

| 名称                                                    | 类型                               |
| ------------------------------------------------------- | ---------------------------------- |
| config <div class="label basic required">Required</div> | [AppConfig](appregistry#appconfig) |

---

### `registerHeadlessTask()`

```jsx
static registerHeadlessTask(taskKey, taskProvider)
```

Register a headless task. A headless task is a bit of code that runs without a UI.

This is a way to run tasks in JavaScript while your app is in the background. It can be used, for example, to sync fresh data, handle push notifications, or play music.

**参数：**

| 名称                                                                        | 类型                                     | 说明                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey<br/><div class="label basic required two-lines">Required</div>      | string                                   | The native id for this task instance that was used when startHeadlessTask was called.                                                                                                                                               |
| taskProvider<br/><div class="label basic required two-lines">Required</div> | [TaskProvider](appregistry#taskprovider) | A promise returning function that takes some data passed from the native side as the only argument. When the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. |

---

### `registerRunnable()`

```jsx
static registerRunnable(appKey, run)
```

**参数：**

| 名称                                                    | 类型     |
| ------------------------------------------------------- | -------- |
| appKey <div class="label basic required">Required</div> | string   |
| run <div class="label basic required">Required</div>    | function |

---

### `registerSection()`

```jsx
static registerSection(appKey, component)
```

**参数：**

| 名称                                                       | 类型              |
| ---------------------------------------------------------- | ----------------- |
| appKey <div class="label basic required">Required</div>    | string            |
| component <div class="label basic required">Required</div> | ComponentProvider |

---

### `runApplication()`

```jsx
static runApplication(appKey, appParameters)
```

加载 JavaScript bundle 并运行应用。

**参数：**

| 名称                                                           | 类型   |
| -------------------------------------------------------------- | ------ |
| appKey <div class="label basic required">Required</div>        | string |
| appParameters <div class="label basic required">Required</div> | any    |

---

### `setComponentProviderInstrumentationHook()`

```jsx
static setComponentProviderInstrumentationHook(hook)
```

**参数：**

| 名称                                                  | 类型     |
| ----------------------------------------------------- | -------- |
| hook <div class="label basic required">Required</div> | function |

A valid `hook` function accepts the following as arguments:

| 名称                                                                     | 类型               |
| ------------------------------------------------------------------------ | ------------------ |
| component <div class="label basic required">Required</div>               | ComponentProvider  |
| scopedPerformanceLogger <div class="label basic required">Required</div> | IPerformanceLogger |

The function must also return a React Component.

---

### `setWrapperComponentProvider()`

```jsx
static setWrapperComponentProvider(provider)
```

**参数：**

| 名称                                                      | 类型              |
| --------------------------------------------------------- | ----------------- |
| provider <div class="label basic required">Required</div> | ComponentProvider |

---

### `startHeadlessTask()`

```jsx
static startHeadlessTask(taskId, taskKey, data)
```

Only called from native code. Starts a headless task.

**参数：**

| 名称                                                     | 类型   | 说明                                                                 |
| -------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| taskId <div class="label basic required">Required</div>  | number | The native id for this task instance to keep track of its execution. |
| taskKey <div class="label basic required">Required</div> | string | The key for the task to start.                                       |
| data <div class="label basic required">Required</div>    | any    | The data to pass to the task.                                        |

---

### `unmountApplicationComponentAtRootTag()`

```jsx
static unmountApplicationComponentAtRootTag(rootTag)
```

Stops an application when a view should be destroyed.

**参数：**

| 名称                                                     | 类型   |
| -------------------------------------------------------- | ------ |
| rootTag <div class="label basic required">Required</div> | number |

## 类型定义

### AppConfig

Application configuration for the `registerConfig` method.

| 类型   |
| ------ |
| object |

**Properties:**

| 名称                                                    | 类型              |
| ------------------------------------------------------- | ----------------- |
| appKey <div class="label basic required">Required</div> | string            |
| component                                               | ComponentProvider |
| run                                                     | function          |
| section                                                 | boolean           |

> **Note:** Every config is expected to set either `component` or `run` function.

### Registry

| 类型   |
| ------ |
| object |

**Properties:**

| 名称      | 类型                                       |
| --------- | ------------------------------------------ |
| runnables | array of [Runnables](appregistry#runnable) |
| sections  | array of strings                           |

### Runnable

| 类型   |
| ------ |
| object |

**Properties:**

| 名称      | 类型              |
| --------- | ----------------- |
| component | ComponentProvider |
| run       | function          |

### Runnables

An object with key of `appKey` and value of type of [`Runnable`](appregistry#runnable).

| 类型   |
| ------ |
| object |

### Task

A `Task` is a function that accepts any data as argument and returns a Promise that resolves to `undefined`.

| 类型     |
| -------- |
| function |

### TaskCanceller

A `TaskCanceller` is a function that accepts no argument and returns void.

| 类型     |
| -------- |
| function |

### TaskCancelProvider

A valid `TaskCancelProvider` is a function that returns a [`TaskCanceller`](appregistry#taskcanceller).

| 类型     |
| -------- |
| function |

### TaskProvider

A valid `TaskProvider` is a function that returns a [`Task`](appregistry#task).

| 类型     |
| -------- |
| function |

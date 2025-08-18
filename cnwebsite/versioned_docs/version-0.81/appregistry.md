---
id: appregistry
title: AppRegistry
---

<div class="banner-native-code-required">
  <h3>仅适用于非沙盒项目</h3>
  <p>
    如果您正在使用托管的 Expo 工作流程，那么只会有一个入口组件在<code>AppRegistry</code>中注册，并且它会自动处理（或通过<a href="https://docs.expo.dev/versions/latest/sdk/register-root-component/">registerRootComponent</a>进行处理）。您不需要使用此API。
  </p>
</div>

`AppRegistry`是所有 React Native 应用的 JS 入口。应用的根组件应当通过`AppRegistry.registerComponent`方法注册自己，然后原生系统才可以加载应用的代码包并且在启动完成之后通过调用`AppRegistry.runApplication`来真正运行应用。

```tsx
import {Text, AppRegistry} from 'react-native';

const App = () => (
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

### `getAppKeys()`

```tsx
static getAppKeys(): string[];
```

返回一个 AppKeys 数组。

---

### `getRegistry()`

```tsx
static getRegistry(): {sections: string[]; runnables: Runnable[]};
```

返回一个[Registry](appregistry#registry)对象。

---

### `getRunnable()`

```tsx
static getRunnable(appKey: string): : Runnable | undefined;
```

返回一个[Runnable](appregistry#runnable)对象。

**参数:**

| 名称                                                        | 类型   |
| ----------------------------------------------------------- | ------ |
| appKey <div className="label basic required">Required</div> | string |

---

### `getSectionKeys()`

```tsx
static getSectionKeys(): string[];
```

Returns an array of strings.

---

### `getSections()`

```tsx
static getSections(): Record<string, Runnable>;
```

Returns a [Runnables](appregistry#runnables) object.

---

### `registerCancellableHeadlessTask()`

```tsx
static registerCancellableHeadlessTask(
  taskKey: string,
  taskProvider: TaskProvider,
  taskCancelProvider: TaskCancelProvider,
);
```

Register a headless task which can be cancelled. A headless task is a bit of code that runs without a UI.

**Parameters:**

| Name                                                                                  | Type                                                 | Description                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey<br/><div className="label basic required two-lines">Required</div>            | string                                               | The native id for this task instance that was used when startHeadlessTask was called.                                                                                                                                               |
| taskProvider<br/><div className="label basic required two-lines">Required</div>       | [TaskProvider](appregistry#taskprovider)             | A promise returning function that takes some data passed from the native side as the only argument. When the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. |
| taskCancelProvider<br/><div className="label basic required two-lines">Required</div> | [TaskCancelProvider](appregistry#taskcancelprovider) | a void returning function that takes no arguments; when a cancellation is requested, the function being executed by taskProvider should wrap up and return ASAP.                                                                    |

---

### `registerComponent()`

```tsx
static registerComponent(
  appKey: string,
  getComponentFunc: ComponentProvider,
  section?: boolean,
): string;
```

**参数:**

| 名称                                                                   | 类型              |
| ---------------------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">必填</div>            | string            |
| componentProvider <div className="label basic required">必填</div> | ComponentProvider |
| section                                                                | boolean           |

---

### `registerConfig()`

```tsx
static registerConfig(config: AppConfig[]);
```

**参数:**

| 名称                                                        | 类型                                 |
| ----------------------------------------------------------- | ------------------------------------ |
| config <div className="label basic required">Required</div> | [AppConfig](appregistry#appconfig)[] |

---

### `registerHeadlessTask()`

```tsx
static registerHeadlessTask(
  taskKey: string,
  taskProvider: TaskProvider,
);
```

Register a headless task. A headless task is a bit of code that runs without a UI.

This is a way to run tasks in JavaScript while your app is in the background. It can be used, for example, to sync fresh data, handle push notifications, or play music.

**Parameters:**

| Name                                                                        | Type                                     | Description                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey <div className="label basic required two-lines">Required</div>      | string                                   | The native id for this task instance that was used when startHeadlessTask was called.                                                                                                                                               |
| taskProvider <div className="label basic required two-lines">Required</div> | [TaskProvider](appregistry#taskprovider) | A promise returning function that takes some data passed from the native side as the only argument. When the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. |

---

### `registerRunnable()`

```tsx
static registerRunnable(appKey: string, func: Runnable): string;
```

**Parameters:**

| Name                                                        | Type     |
| ----------------------------------------------------------- | -------- |
| appKey <div className="label basic required">Required</div> | string   |
| run <div className="label basic required">Required</div>    | function |

---

### `registerSection()`

```tsx
static registerSection(
  appKey: string,
  component: ComponentProvider,
);
```

**Parameters:**

| Name                                                           | Type              |
| -------------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">Required</div>    | string            |
| component <div className="label basic required">Required</div> | ComponentProvider |

---

### `runApplication()`

```tsx
static runApplication(appKey: string, appParameters: any): void;
```

加载 JavaScript 包并运行应用程序。

**参数:**

| Name                                                               | Type   |
| ------------------------------------------------------------------ | ------ |
| appKey <div className="label basic required">Required</div>        | string |
| appParameters <div className="label basic required">Required</div> | any    |

---

### `setComponentProviderInstrumentationHook()`

```tsx
static setComponentProviderInstrumentationHook(
  hook: ComponentProviderInstrumentationHook,
);
```

**参数:**

| Name                                                      | Type     |
| --------------------------------------------------------- | -------- |
| hook <div className="label basic required">Required</div> | function |

A valid `hook` function accepts the following as arguments:

| Name                                                                         | Type               |
| ---------------------------------------------------------------------------- | ------------------ |
| component <div className="label basic required">Required</div>               | ComponentProvider  |
| scopedPerformanceLogger <div className="label basic required">Required</div> | IPerformanceLogger |

The function must also return a React Component.

---

### `setWrapperComponentProvider()`

```tsx
static setWrapperComponentProvider(
  provider: WrapperComponentProvider,
);
```

**Parameters:**

| Name                                                          | Type              |
| ------------------------------------------------------------- | ----------------- |
| provider <div className="label basic required">Required</div> | ComponentProvider |

---

### `startHeadlessTask()`

```tsx
static startHeadlessTask(
  taskId: number,
  taskKey: string,
  data: any,
);
```

Only called from native code. Starts a headless task.

**Parameters:**

| Name                                                         | Type   | Description                                                          |
| ------------------------------------------------------------ | ------ | -------------------------------------------------------------------- |
| taskId <div className="label basic required">Required</div>  | number | The native id for this task instance to keep track of its execution. |
| taskKey <div className="label basic required">Required</div> | string | The key for the task to start.                                       |
| data <div className="label basic required">Required</div>    | any    | The data to pass to the task.                                        |

---

### `unmountApplicationComponentAtRootTag()`

```tsx
static unmountApplicationComponentAtRootTag(rootTag: number);
```

Stops an application when a view should be destroyed.

**Parameters:**

| Name                                                         | Type   |
| ------------------------------------------------------------ | ------ |
| rootTag <div className="label basic required">Required</div> | number |

## Type Definitions

### AppConfig

Application configuration for the `registerConfig` method.

| Type   |
| ------ |
| object |

**Properties:**

| Name                                                        | Type              |
| ----------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">Required</div> | string            |
| component                                                   | ComponentProvider |
| run                                                         | function          |
| section                                                     | boolean           |

> **Note:** Every config is expected to set either `component` or `run` function.

### Registry

| Type   |
| ------ |
| object |

**Properties:**

| Name      | Type                                       |
| --------- | ------------------------------------------ |
| runnables | array of [Runnables](appregistry#runnable) |
| sections  | array of strings                           |

### Runnable

| Type   |
| ------ |
| object |

**Properties:**

| Name      | Type              |
| --------- | ----------------- |
| component | ComponentProvider |
| run       | function          |

### Runnables

An object with key of `appKey` and value of type of [`Runnable`](appregistry#runnable).

| Type   |
| ------ |
| object |

### Task

A `Task` is a function that accepts any data as argument and returns a Promise that resolves to `undefined`.

| Type     |
| -------- |
| function |

### TaskCanceller

A `TaskCanceller` is a function that accepts no argument and returns void.

| Type     |
| -------- |
| function |

### TaskCancelProvider

A valid `TaskCancelProvider` is a function that returns a [`TaskCanceller`](appregistry#taskcanceller).

| Type     |
| -------- |
| function |

### TaskProvider

A valid `TaskProvider` is a function that returns a [`Task`](appregistry#task).

| Type     |
| -------- |
| function |

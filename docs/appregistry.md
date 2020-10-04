---
id: appregistry
title: AppRegistry
---

<div class="banner-native-code-required">
  <h3>Project with Native Code Required</h3>
  <p>
    If you are using the managed <code>expo-cli</code> workflow there is only ever one entry component registered with <code>AppRegistry</code> and it is handled automatically, you do not need to use this API.
  </p>
</div>

`AppRegistry` is the JS entry point to running all React Native apps. App root components should register themselves with `AppRegistry.registerComponent`, then the native system can load the bundle for the app and then actually run the app when it's ready by invoking `AppRegistry.runApplication`.

```jsx
import { Text, AppRegistry } from 'react-native';

const App = (props) => (
  <View>
    <Text>App1</Text>
  </View>
);

AppRegistry.registerComponent('Appname', () => App);
```

To "stop" an application when a view should be destroyed, call `AppRegistry.unmountApplicationComponentAtRootTag` with the tag that was passed into `runApplication`. These should always be used as a pair.

`AppRegistry` should be required early in the `require` sequence to make sure the JS execution environment is setup before other modules are required.

---

# Reference

## Methods

### `cancelHeadlessTask()`

```jsx
static cancelHeadlessTask(taskId, taskKey)
```

Only called from native code. Cancels a headless task.

**Parameters:**

| Name                                                     | Type   | Description                                                                                |
| -------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| taskId <div class="label basic required">Required</div>  | number | The native id for this task instance that was used when `startHeadlessTask` was called. |
| taskKey <div class="label basic required">Required</div> | string | The key for the task that was used when `startHeadlessTask` was called.                 |

---

### `enableArchitectureIndicator()`

```jsx
static enableArchitectureIndicator(enabled)
```

**Parameters:**

| Name                                                     | Type    |
| -------------------------------------------------------- | ------- |
| enabled <div class="label basic required">Required</div> | boolean |

---

### `getAppKeys()`

```jsx
static getAppKeys()
```

Returns an array of strings.

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

**Parameters:**

| Name                                                    | Type   |
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

**Parameters:**

| Name                                                                              | Type                                                 | Description                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey<br/><div class="label basic required two-lines">Required</div>            | string                                               | The native id for this task instance that was used when startHeadlessTask was called.                                                                                                                                               |
| taskProvider<br/><div class="label basic required two-lines">Required</div>       | [TaskProvider](appregistry#taskprovider)             | A promise returning function that takes some data passed from the native side as the only argument. When the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. |
| taskCancelProvider<br/><div class="label basic required two-lines">Required</div> | [TaskCancelProvider](appregistry#taskcancelprovider) | a void returning function that takes no arguments; when a cancellation is requested, the function being executed by taskProvider should wrap up and return ASAP.                                                                    |

---

### `registerComponent()`

```jsx
static registerComponent(appKey, componentProvider, section?)
```

**Parameters:**

| Name                                                               | Type              |
| ------------------------------------------------------------------ | ----------------- |
| appKey <div class="label basic required">Required</div>            | string            |
| componentProvider <div class="label basic required">Required</div> | ComponentProvider |
| section                                                            | boolean           |

---

### `registerConfig()`

```jsx
static registerConfig(config)
```

**Parameters:**

| Name                                                    | Type                               |
| ------------------------------------------------------- | ---------------------------------- |
| config <div class="label basic required">Required</div> | [AppConfig](appregistry#appconfig) |

---

### `registerHeadlessTask()`

```jsx
static registerHeadlessTask(taskKey, taskProvider)
```

Register a headless task. A headless task is a bit of code that runs without a UI.

This is a way to run tasks in JavaScript while your app is in the background. It can be used, for example, to sync fresh data, handle push notifications, or play music.

**Parameters:**

| Name                                                                        | Type                                     | Description                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey<br/><div class="label basic required two-lines">Required</div>      | string                                   | The native id for this task instance that was used when startHeadlessTask was called.                                                                                                                                               |
| taskProvider<br/><div class="label basic required two-lines">Required</div> | [TaskProvider](appregistry#taskprovider) | A promise returning function that takes some data passed from the native side as the only argument. When the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. |

---

### `registerRunnable()`

```jsx
static registerRunnable(appKey, run)
```

**Parameters:**

| Name                                                    | Type     |
| ------------------------------------------------------- | -------- |
| appKey <div class="label basic required">Required</div> | string   |
| run <div class="label basic required">Required</div>    | function |

---

### `registerSection()`

```jsx
static registerSection(appKey, component)
```

**Parameters:**

| Name                                                       | Type              |
| ---------------------------------------------------------- | ----------------- |
| appKey <div class="label basic required">Required</div>    | string            |
| component <div class="label basic required">Required</div> | ComponentProvider |

---

### `runApplication()`

```jsx
static runApplication(appKey, appParameters)
```

Loads the JavaScript bundle and runs the app.

**Parameters:**

| Name                                                           | Type   |
| -------------------------------------------------------------- | ------ |
| appKey <div class="label basic required">Required</div>        | string |
| appParameters <div class="label basic required">Required</div> | any    |

---

### `setComponentProviderInstrumentationHook()`

```jsx
static setComponentProviderInstrumentationHook(hook)
```

**Parameters:**

| Name                                                  | Type     |
| ----------------------------------------------------- | -------- |
| hook <div class="label basic required">Required</div> | function |

A valid `hook` function accepts the following as arguments:

| Name                                                                     | Type               |
| ------------------------------------------------------------------------ | ------------------ |
| component <div class="label basic required">Required</div>               | ComponentProvider  |
| scopedPerformanceLogger <div class="label basic required">Required</div> | IPerformanceLogger |

The function must also return a React Component.

---

### `setWrapperComponentProvider()`

```jsx
static setWrapperComponentProvider(provider)
```

**Parameters:**

| Name                                                      | Type              |
| --------------------------------------------------------- | ----------------- |
| provider <div class="label basic required">Required</div> | ComponentProvider |

---

### `startHeadlessTask()`

```jsx
static startHeadlessTask(taskId, taskKey, data)
```

Only called from native code. Starts a headless task.

**Parameters:**

| Name                                                     | Type   | Description                                                          |
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

**Parameters:**

| Name                                                     | Type   |
| -------------------------------------------------------- | ------ |
| rootTag <div class="label basic required">Required</div> | number |

## Type Definitions

### AppConfig

Application configuration for the `registerConfig` method.

| Type   |
| ------ |
| object |

**Properties:**

| Name                                                    | Type              |
| ------------------------------------------------------- | ----------------- |
| appKey <div class="label basic required">Required</div> | string            |
| component                                               | ComponentProvider |
| run                                                     | function          |
| section                                                 | boolean           |

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

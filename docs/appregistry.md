---
id: appregistry
title: AppRegistry
---

<div class="banner-crna-ejected">
  <h3>Project with Native Code Required</h3>
  <p>
    This API only works in projects made with <code>react-native init</code>
    or in those made with <code>expo init</code> or Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

`AppRegistry` is the JS entry point to running all React Native apps. App root components should register themselves with `AppRegistry.registerComponent`, then the native system can load the bundle for the app and then actually run the app when it's ready by invoking `AppRegistry.runApplication`.

To "stop" an application when a view should be destroyed, call `AppRegistry.unmountApplicationComponentAtRootTag` with the tag that was passed into `runApplication`. These should always be used as a pair.

`AppRegistry` should be required early in the `require` sequence to make sure the JS execution environment is setup before other modules are required.

### Methods

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
* [`registerCancellableHeadlessTask`](appregistry.md#registercancellableheadlesstask)
* [`startHeadlessTask`](appregistry.md#startheadlesstask)
* [`cancelHeadlessTask`](appregistry.md#cancelheadlesstask)

---

# Reference

## Methods

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
static registerHeadlessTask(taskKey, taskProvider)
```

Register a headless task. A headless task is a bit of code that runs without a UI. @param taskKey the key associated with this task @param taskProvider a promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context.

---

### `registerCancellableHeadlessTask()`

```javascript
static registerCancellableHeadlessTask(taskKey, taskProvider, taskCancelProvider)
```

Register a headless task which can be cancelled. A headless task is a bit of code that runs without a UI. @param taskKey the key associated with this task @param taskProvider a promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. @param taskCancelProvider a void returning function that takes no arguments; when a cancellation is requested, the function being executed by taskProvider should wrap up and return ASAP.
---

### `startHeadlessTask()`

```javascript
static startHeadlessTask(taskId, taskKey, data)
```

Only called from native code. Starts a headless task.

@param taskId the native id for this task instance to keep track of its execution @param taskKey the key for the task to start @param data the data to pass to the task

---

### `cancelHeadlessTask()`

```javascript
static cancelHeadlessTask(taskId, taskKey)
```

Only called from native code. Cancels a headless task.

@param taskId the native id for this task instance that was used when startHeadlessTask was called @param taskKey the key for the task that was used when startHeadlessTask was called

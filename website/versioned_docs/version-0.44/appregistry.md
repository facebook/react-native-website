---
id: version-0.44-appregistry
title: AppRegistry
original_id: appregistry
---

`AppRegistry` is the JS entry point to running all React Native apps. App root components should register themselves with `AppRegistry.registerComponent`, then the native system can load the bundle for the app and then actually run the app when it's ready by invoking `AppRegistry.runApplication`.

To "stop" an application when a view should be destroyed, call `AppRegistry.unmountApplicationComponentAtRootTag` with the tag that was passed into `runApplication`. These should always be used as a pair.

`AppRegistry` should be `require`d early in the `require` sequence to make sure the JS execution environment is setup before other modules are `require`d.

### Methods

- [`registerConfig`](appregistry.md#registerconfig)
- [`registerComponent`](appregistry.md#registercomponent)
- [`registerRunnable`](appregistry.md#registerrunnable)
- [`registerSection`](appregistry.md#registersection)
- [`getAppKeys`](appregistry.md#getappkeys)
- [`getSectionKeys`](appregistry.md#getsectionkeys)
- [`getSections`](appregistry.md#getsections)
- [`getRunnable`](appregistry.md#getrunnable)
- [`getRegistry`](appregistry.md#getregistry)
- [`setComponentProviderInstrumentationHook`](appregistry.md#setcomponentproviderinstrumentationhook)
- [`runApplication`](appregistry.md#runapplication)
- [`unmountApplicationComponentAtRootTag`](appregistry.md#unmountapplicationcomponentatroottag)
- [`registerHeadlessTask`](appregistry.md#registerheadlesstask)
- [`startHeadlessTask`](appregistry.md#startheadlesstask)

---

# Reference

## Methods

### `registerConfig()`

```javascript
static registerConfig(config)
```

---

### `registerComponent()`

```javascript
static registerComponent(appKey, component, section?)
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

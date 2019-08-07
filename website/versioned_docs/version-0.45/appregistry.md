---
id: version-0.45-appregistry
title: AppRegistry
original_id: appregistry
---

<div class="banner-crna-ejected">
  <h3>Project with Native Code Required</h3>
  <p>
    This API only works in projects made with <code>react-native init</code>
    or in those made with Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

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
static registerHeadlessTask(taskKey, task)
```

Register a headless task. A headless task is a bit of code that runs without a UI. @param taskKey the key associated with this task @param task a promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context.

---

### `startHeadlessTask()`

```jsx
static startHeadlessTask(taskId, taskKey, data)
```

Only called from native code. Starts a headless task.

@param taskId the native id for this task instance to keep track of its execution @param taskKey the key for the task to start @param data the data to pass to the task

---
id: version-0.5-appregistry
title: AppRegistry
original_id: appregistry
---

<div class="banner-crna-ejected">
  <h3>Project with Native Code Required</h3>
  <p>
    This API only works in projects made with <code>react-native init</code> or in those made with Create React Native App which have since ejected. For more information about ejecting, please see the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on the Create React Native App repository.
  </p>
</div>

`AppRegistry` is the JavaScript entry point to running all React Native apps. App root components should register themselves with `AppRegistry.registerComponent()`, then the native system can load the bundle for the app and then actually run the app when it's ready by invoking `AppRegistry.runApplication()`.

To "stop" an application when a view should be destroyed, call `AppRegistry.unmountApplicationComponentAtRootTag()` with the tag that was passed into `runApplication()`. These should always be used as a pair.

`AppRegistry` should be `require`d early in the `require` sequence to make sure the JavaScript execution environment is set up before other modules are `require`d.

### Methods

- [`registerComponent`](appregistry.md#registercomponent)
- [`runApplication`](appregistry.md#runapplication)
- [`unmountApplicationComponentAtRootTag`](appregistry.md#unmountapplicationcomponentatroottag)
- [`registerHeadlessTask`](appregistry.md#registerheadlesstask)
- [`startHeadlessTask`](appregistry.md#startheadlesstask)
- [`setWrapperComponentProvider`](appregistry.md#setwrappercomponentprovider)
- [`registerConfig`](appregistry.md#registerconfig)
- [`registerRunnable`](appregistry.md#registerrunnable)
- [`registerSection`](appregistry.md#registersection)
- [`getAppKeys`](appregistry.md#getappkeys)
- [`getSectionKeys`](appregistry.md#getsectionkeys)
- [`getSections`](appregistry.md#getsections)
- [`getRunnable`](appregistry.md#getrunnable)
- [`getRegistry`](appregistry.md#getregistry)
- [`setComponentProviderInstrumentationHook`](appregistry.md#setcomponentproviderinstrumentationhook)

---

# Reference

## Methods

### `registerComponent()`

```jsx
AppRegistry.registerComponent(appKey, componentProvider, [
  section
]);
```

Registers an app's root component.

**Parameters:**

| Name              | Type     | Required | Description                                           |
| ----------------- | -------- | -------- | ----------------------------------------------------- |
| appKey            | string   | Yes      | Application key.                                      |
| componentProvider | function | Yes      | A function that returns a React component or element. |
| section           | boolean  | No       | Is this a section?                                    |

---

### `runApplication()`

```jsx
AppRegistry.runApplication(appKey, appParameters);
```

Loads the JavaScript bundle and runs the app.

**Parameters:**

| Name          | Type   | Required | Description      |
| ------------- | ------ | -------- | ---------------- |
| appKey        | string | Yes      | Application key. |
| appParameters | any    | Yes      | Params.          |

---

### `unmountApplicationComponentAtRootTag()`

```jsx
AppRegistry.unmountApplicationComponentAtRootTag(rootTag);
```

Stops an application when a view should be destroyed. The `rootTag` should match the tag that was passed into `runApplication()`. These should always be used as a pair.

**Parameters:**

| Name    | Type   | Required | Description |
| ------- | ------ | -------- | ----------- |
| rootTag | number | Yes      | React tag.  |

---

### `registerHeadlessTask()`

```jsx
AppRegistry.registerHeadlessTask(taskKey, task);
```

Register a headless task. A headless task is a bit of code that runs without a UI.

**Parameters:**

| Name    | Type     | Required | Description                                                                                                                                                                                                                         |
| ------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey | string   | No       | The key associated with this task.                                                                                                                                                                                                  |
| task    | function | No       | A promise returning function that takes some data passed from the native side as the only argument; when the promise is resolved or rejected the native side is notified of this event and it may decide to destroy the JS context. |

---

### `startHeadlessTask()`

```jsx
AppRegistry.startHeadlessTask(taskId, taskKey, data);
```

Only called from native code. Starts a headless task.

**Parameters:**

| Name    | Type   | Required | Description                                                          |
| ------- | ------ | -------- | -------------------------------------------------------------------- |
| taskId  | number | No       | The native id for this task instance to keep track of its execution. |
| taskKey | string | No       | The key for the task to start.                                       |
| data    | any    | No       | The data to pass to the task.                                        |

---

### `setWrapperComponentProvider()`

```jsx
AppRegistry.setWrapperComponentProvider(provider);
```

---

### `registerConfig()`

```jsx
AppRegistry.registerConfig(config);
```

---

### `registerRunnable()`

```jsx
AppRegistry.registerRunnable(appKey, run);
```

---

### `registerSection()`

```jsx
AppRegistry.registerSection(appKey, component);
```

---

### `getAppKeys()`

```jsx
AppRegistry.getAppKeys();
```

---

### `getSectionKeys()`

```jsx
AppRegistry.getSectionKeys();
```

---

### `getSections()`

```jsx
AppRegistry.getSections();
```

---

### `getRunnable()`

```jsx
AppRegistry.getRunnable(appKey);
```

---

### `getRegistry()`

```jsx
AppRegistry.getRegistry();
```

---

### `setComponentProviderInstrumentationHook()`

```jsx
AppRegistry.setComponentProviderInstrumentationHook(hook);
```

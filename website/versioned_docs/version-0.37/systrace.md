---
id: version-0.37-systrace
title: Systrace
original_id: systrace
---

### Methods

- [`setEnabled`](systrace.md#setenabled)
- [`beginEvent`](systrace.md#beginevent)
- [`endEvent`](systrace.md#endevent)
- [`beginAsyncEvent`](systrace.md#beginasyncevent)
- [`endAsyncEvent`](systrace.md#endasyncevent)
- [`counterEvent`](systrace.md#counterevent)
- [`attachToRelayProfiler`](systrace.md#attachtorelayprofiler)
- [`swizzleJSON`](systrace.md#swizzlejson)
- [`measureMethods`](systrace.md#measuremethods)
- [`measure`](systrace.md#measure)

---

# Reference

## Methods

### `setEnabled()`

```jsx
static setEnabled(enabled)
```

---

### `beginEvent()`

```jsx
static beginEvent(profileName?, args?)
```

beginEvent/endEvent for starting and then ending a profile within the same call stack frame

---

### `endEvent()`

```jsx
static endEvent()
```

---

### `beginAsyncEvent()`

```jsx
static beginAsyncEvent(profileName?)
```

beginAsyncEvent/endAsyncEvent for starting and then ending a profile where the end can either occur on another thread or out of the current stack frame, eg await the returned cookie variable should be used as input into the endAsyncEvent call to end the profile

---

### `endAsyncEvent()`

```jsx
static endAsyncEvent(profileName?, cookie?)
```

---

### `counterEvent()`

```jsx
static counterEvent(profileName?, value?)
```

counterEvent registers the value to the profileName on the systrace timeline

---

### `attachToRelayProfiler()`

```jsx
static attachToRelayProfiler(relayProfiler)
```

Relay profiles use await calls, so likely occur out of current stack frame therefore async variant of profiling is used

---

### `swizzleJSON()`

```jsx
static swizzleJSON()
```

This is not called by default due to perf overhead but it's useful if you want to find traces which spend too much time in JSON.

---

### `measureMethods()`

```jsx
static measureMethods(object, objectName, methodNames)
```

Measures multiple methods of a class. For example, you can do: Systrace.measureMethods(JSON, 'JSON', ['parse', 'stringify']);

@param object @param objectName @param methodNames Map from method names to method display names.

---

### `measure()`

```jsx
static measure(objName, fnName, func)
```

Returns an profiled version of the input function. For example, you can: JSON.parse = Systrace.measure('JSON', 'parse', JSON.parse);

@param objName @param fnName @param {function} func @return {function} replacement function

---
id: systrace
title: Systrace
---

### Methods

- [`installReactHook`](systrace.md#installreacthook)
- [`setEnabled`](systrace.md#setenabled)
- [`isEnabled`](systrace.md#isenabled)
- [`beginEvent`](systrace.md#beginevent)
- [`endEvent`](systrace.md#endevent)
- [`beginAsyncEvent`](systrace.md#beginasyncevent)
- [`endAsyncEvent`](systrace.md#endasyncevent)
- [`counterEvent`](systrace.md#counterevent)

---

# Reference

## Methods

### `installReactHook()`

```javascript
static installReactHook(useFiber)
```

---

### `setEnabled()`

```javascript
static setEnabled(enabled)
```

---

### `isEnabled()`

```javascript
static isEnabled()
```

---

### `beginEvent()`

```javascript
static beginEvent(profileName?, args?)
```

beginEvent/endEvent for starting and then ending a profile within the same call stack frame.

---

### `endEvent()`

```javascript
static endEvent()
```

---

### `beginAsyncEvent()`

```javascript
static beginAsyncEvent(profileName?)
```

beginAsyncEvent/endAsyncEvent for starting and then ending a profile where the end can either occur on another thread or out of the current stack frame, eg await the returned cookie variable should be used as input into the endAsyncEvent call to end the profile.

---

### `endAsyncEvent()`

```javascript
static endAsyncEvent(profileName?, cookie?)
```

---

### `counterEvent()`

```javascript
static counterEvent(profileName?, value?)
```

Register the value to the profileName on the systrace timeline.

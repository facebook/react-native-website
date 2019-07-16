---
id: version-0.60-systrace
title: Systrace
original_id: systrace
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

```jsx
static installReactHook(useFiber)
```

---

### `setEnabled()`

```jsx
static setEnabled(enabled)
```

---

### `isEnabled()`

```jsx
static isEnabled()
```

---

### `beginEvent()`

```jsx
static beginEvent(profileName?, args?)
```

beginEvent/endEvent for starting and then ending a profile within the same call stack frame.

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

beginAsyncEvent/endAsyncEvent for starting and then ending a profile where the end can either occur on another thread or out of the current stack frame, eg await the returned cookie variable should be used as input into the endAsyncEvent call to end the profile.

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

Register the value to the profileName on the systrace timeline.

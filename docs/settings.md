---
id: settings
title: Settings
---

`Settings` serves as a wrapper for [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults), a persistent key-value store available only on iOS.

---

# Reference

## Methods

### `clearWatch()`

```jsx
static clearWatch(watchId)
```

`watchId` is the number returned by `watchKeys()` when the subscription was originally configured.

### `get()`

```jsx
static get(key)
```

Get the current value for a key in `NSUserDefaults`.

---

### `set()`

```jsx
static set(settings)
```

Set one or more values in `NSUserDefaults`.

---

### `watchKeys()`

```jsx
static watchKeys(keys, callback)
```

Subscribe to be notified when the value for any of the keys specified by the `keys` array changes in `NSUserDefaults`. Returns a `watchId` number that may be used with `clearWatch()` to unsubscribe.

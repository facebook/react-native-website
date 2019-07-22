---
id: version-0.5-settings
title: Settings
original_id: settings
---

`Settings` serves as a wrapper for [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults), a persistent key-value store available only on iOS.

### Methods

- [`get`](settings.md#get)
- [`set`](settings.md#set)
- [`watchKeys`](settings.md#watchkeys)
- [`clearWatch`](settings.md#clearwatch)

---

# Reference

## Methods

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

---

### `clearWatch()`

```jsx
static clearWatch(watchId)
```

`watchId` is the number returned by `watchKeys()` when the subscription was originally configured.

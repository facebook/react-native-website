---
id: version-0.17-asyncstorage
title: AsyncStorage
original_id: asyncstorage
---

AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage.

It is recommended that you use an abstraction on top of AsyncStorage instead of AsyncStorage directly for anything more than light usage since it operates globally.

This JS code is a facade over the native iOS implementation to provide a clear JS API, real Error objects, and non-multi functions. Each method returns a `Promise` object.

### Methods

- [`getItem`](asyncstorage.md#getitem)
- [`setItem`](asyncstorage.md#setitem)
- [`removeItem`](asyncstorage.md#removeitem)
- [`mergeItem`](asyncstorage.md#mergeitem)
- [`clear`](asyncstorage.md#clear)
- [`getAllKeys`](asyncstorage.md#getallkeys)
- [`flushGetRequests`](asyncstorage.md#flushgetrequests)
- [`multiGet`](asyncstorage.md#multiget)
- [`multiSet`](asyncstorage.md#multiset)
- [`multiRemove`](asyncstorage.md#multiremove)
- [`multiMerge`](asyncstorage.md#multimerge)

### Properties

---

# Reference

## Methods

### `getItem()`

```jsx
static getItem(key, callback?)
```

Fetches `key` and passes the result to `callback`, along with an `Error` if there is any. Returns a `Promise` object.

---

### `setItem()`

```jsx
static setItem(key, value, callback?)
```

Sets `value` for `key` and calls `callback` on completion, along with an `Error` if there is any. Returns a `Promise` object.

---

### `removeItem()`

```jsx
static removeItem(key, callback?)
```

Returns a `Promise` object.

---

### `mergeItem()`

```jsx
static mergeItem(key, value, callback?)
```

Merges existing value with input value, assuming they are stringified json. Returns a `Promise` object. Not supported by all native implementations.

---

### `clear()`

```jsx
static clear(callback?)
```

Erases _all_ AsyncStorage for all clients, libraries, etc. You probably don't want to call this - use removeItem or multiRemove to clear only your own keys instead. Returns a `Promise` object.

---

### `getAllKeys()`

```jsx
static getAllKeys(callback?)
```

Gets _all_ keys known to the app, for all callers, libraries, etc. Returns a `Promise` object.

---

### `flushGetRequests()`

```jsx
static flushGetRequests()
```

Flushes any pending requests using a single multiget

---

### `multiGet()`

```jsx
static multiGet(keys, callback?)
```

multiGet invokes callback with an array of key-value pair arrays that matches the input format of multiSet. Returns a `Promise` object.

multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])

---

### `multiSet()`

```jsx
static multiSet(keyValuePairs, callback?)
```

multiSet and multiMerge take arrays of key-value array pairs that match the output of multiGet, e.g. Returns a `Promise` object.

multiSet([['k1', 'val1'], ['k2', 'val2']], cb);

---

### `multiRemove()`

```jsx
static multiRemove(keys, callback?)
```

Delete all the keys in the `keys` array. Returns a `Promise` object.

---

### `multiMerge()`

```jsx
static multiMerge(keyValuePairs, callback?)
```

Merges existing values with input values, assuming they are stringified json. Returns a `Promise` object.

Not supported by all native implementations.

## Properties

---
id: version-0.23-asyncstorage
title: AsyncStorage
original_id: asyncstorage
---

AsyncStorage is an asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage.

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

Example:

```jsx
let UID123_object = {
  name: 'Chris',
  age: 30,
  traits: {hair: 'brown', eyes: 'brown'},
};

// need only define what will be added or updated
let UID123_delta = {
  age: 31,
  traits: {eyes: 'blue', shoe_size: 10},
};

AsyncStorage.setItem(store_key, JSON.stringify(UID123_object), () => {
  AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
    AsyncStorage.getItem('UID123', (err, result) => {
      console.log(result);
      // => {'name':'Chris','age':31,'traits':{'shoe_size':10,'hair':'brown','eyes':'blue'}}
    });
  });
});
```

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

Example: see multiGet for example

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

Example:

```jsx
AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
    stores.map((result, i, store) => {
      // get at each store's key/value so you can work with it
      let key = store[i][0];
      let value = store[i][1];
    });
  });
});
```

---

### `multiSet()`

```jsx
static multiSet(keyValuePairs, callback?)
```

multiSet and multiMerge take arrays of key-value array pairs that match the output of multiGet, e.g. Returns a `Promise` object.

multiSet([['k1', 'val1'], ['k2', 'val2']], cb);

Example: see multiMerge for an example

---

### `multiRemove()`

```jsx
static multiRemove(keys, callback?)
```

Delete all the keys in the `keys` array. Returns a `Promise` object.

Example:

```jsx
let keys = ['k1', 'k2'];
AsyncStorage.multiRemove(keys, (err) => {
  // keys k1 & k2 removed, if they existed
  // do most stuff after removal (if you want)
});
```

---

### `multiMerge()`

```jsx
static multiMerge(keyValuePairs, callback?)
```

Merges existing values with input values, assuming they are stringified json. Returns a `Promise` object.

Not supported by all native implementations.

Example:

```jsx
// first user, initial values
let UID234_object = {
  name: 'Chris',
  age: 30,
  traits: {hair: 'brown', eyes: 'brown'},
};

// first user, delta values
let UID234_delta = {
  age: 31,
  traits: {eyes: 'blue', shoe_size: 10},
};

// second user, initial values
let UID345_object = {
  name: 'Marge',
  age: 25,
  traits: {hair: 'blonde', eyes: 'blue'},
};

// second user, delta values
let UID345_delta = {
  age: 26,
  traits: {eyes: 'green', shoe_size: 6},
};

let multi_set_pairs = [
  ['UID234', JSON.stringify(UID234_object)],
  ['UID345', JSON.stringify(UID345_object)],
];
let multi_merge_pairs = [
  ['UID234', JSON.stringify(UID234_delta)],
  ['UID345', JSON.stringify(UID345_delta)],
];

AsyncStorage.multiSet(multi_set_pairs, (err) => {
  AsyncStorage.multiMerge(multi_merge_pairs, (err) => {
    AsyncStorage.multiGet(['UID234', 'UID345'], (err, stores) => {
      stores.map((result, i, store) => {
        let key = store[i][0];
        let val = store[i][1];
        console.log(key, val);
        // => UID234 {"name":"Chris","age":31,"traits":{"shoe_size":10,"hair":"brown","eyes":"blue"}}
        // => UID345 {"name":"Marge","age":26,"traits":{"shoe_size":6,"hair":"blonde","eyes":"green"}}
      });
    });
  });
});
```

## Properties

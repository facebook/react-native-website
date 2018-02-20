---
id: asyncstorage
title: AsyncStorage
---

`AsyncStorage`是一个简单的、异步的、持久化的 Key-Value 存储系统，它对于 App 来说是全局性的。可用来代替 LocalStorage。

我们推荐您在 AsyncStorage 的基础上做一层抽象封装，而不是直接使用 AsyncStorage。

On iOS, `AsyncStorage` is backed by native code that stores small values in a serialized dictionary and larger values in separate files. On Android, `AsyncStorage` will use either [RocksDB](http://rocksdb.org/) or SQLite based on what is available.

本模块的 JS 代码提供了对原生实现的一个封装，以提供一个更清晰的 JS API、抛出真正的`Error`对象，以及简单的单项对象操作函数。每个方法都会返回一个`Promise`对象。

保存数据：

```
try {
  await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
} catch (error) {
  // Error saving data
}
```

读取数据：

```
try {
  const value = await AsyncStorage.getItem('@MySuperStore:key');
  if (value !== null){
    // We have data!!
    console.log(value);
  }
} catch (error) {
  // Error retrieving data
}
```

### 查看方法

* [`getItem`](asyncstorage.md#getitem)
* [`setItem`](asyncstorage.md#setitem)
* [`removeItem`](asyncstorage.md#removeitem)
* [`mergeItem`](asyncstorage.md#mergeitem)
* [`clear`](asyncstorage.md#clear)
* [`getAllKeys`](asyncstorage.md#getallkeys)
* [`flushGetRequests`](asyncstorage.md#flushgetrequests)
* [`multiGet`](asyncstorage.md#multiget)
* [`multiSet`](asyncstorage.md#multiset)
* [`multiRemove`](asyncstorage.md#multiremove)
* [`multiMerge`](asyncstorage.md#multimerge)

---

# 文档

## 方法

### `getItem()`

```javascript
static getItem(key: string, [callback]: ?(error: ?Error, result: ?string) => void)
```

Fetches an item for a `key` and invokes a callback upon completion. Returns a `Promise` object.

**参数：**

| 名称     | 类型                                      | 必填 | 说明                                                              |
| -------- | ----------------------------------------- | ---- | ----------------------------------------------------------------- |
| key      | string                                    | 是   | Key of the item to fetch.                                         |
| callback | ?(error: ?Error, result: ?string) => void | 否   | Function that will be called with a result if found or any error. |

---

### `setItem()`

```javascript
static setItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
```

Sets the value for a `key` and invokes a callback upon completion. Returns a `Promise` object.

**参数：**

| 名称     | 类型                     | 必填 | 说明                                         |
| -------- | ------------------------ | ---- | -------------------------------------------- |
| key      | string                   | 是   | Key of the item to set.                      |
| value    | string                   | 是   | Value to set for the `key`.                  |
| callback | ?(error: ?Error) => void | 否   | Function that will be called with any error. |

---

### `removeItem()`

```javascript
static removeItem(key: string, [callback]: ?(error: ?Error) => void)
```

Removes an item for a `key` and invokes a callback upon completion. Returns a `Promise` object.

**参数：**

| 名称     | 类型                     | 必填 | 说明                                         |
| -------- | ------------------------ | ---- | -------------------------------------------- |
| key      | string                   | 是   | Key of the item to remove.                   |
| callback | ?(error: ?Error) => void | 否   | Function that will be called with any error. |

---

### `mergeItem()`

```javascript
static mergeItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
```

Merges an existing `key` value with an input value, assuming both values are stringified JSON. Returns a `Promise` object.

**NOTE:** This is not supported by all native implementations.

**参数：**

| 名称     | 类型                     | 必填 | 说明                                         |
| -------- | ------------------------ | ---- | -------------------------------------------- |
| key      | string                   | 是   | Key of the item to modify.                   |
| value    | string                   | 是   | New value to merge for the `key`.            |
| callback | ?(error: ?Error) => void | 否   | Function that will be called with any error. |

Example:

```javascript
let UID123_object = {
  name: "Chris",
  age: 30,
  traits: { hair: "brown", eyes: "brown" }
};
// You only need to define what will be added or updated
let UID123_delta = {
  age: 31,
  traits: { eyes: "blue", shoe_size: 10 }
};

AsyncStorage.setItem("UID123", JSON.stringify(UID123_object), () => {
  AsyncStorage.mergeItem("UID123", JSON.stringify(UID123_delta), () => {
    AsyncStorage.getItem("UID123", (err, result) => {
      console.log(result);
    });
  });
});

// Console log result:
// => {'name':'Chris','age':31,'traits':
//    {'shoe_size':10,'hair':'brown','eyes':'blue'}}
```

---

### `clear()`

```javascript
static clear([callback]: ?(error: ?Error) => void)
```

Erases _all_ `AsyncStorage` for all clients, libraries, etc. You probably don't want to call this; use `removeItem` or `multiRemove` to clear only your app's keys. Returns a `Promise` object.

**参数：**

| 名称     | 类型                     | 必填 | 说明                                         |
| -------- | ------------------------ | ---- | -------------------------------------------- |
| callback | ?(error: ?Error) => void | 否   | Function that will be called with any error. |

---

### `getAllKeys()`

```javascript
static getAllKeys([callback]: ?(error: ?Error, keys: ?Array<string>) => void)
```

Gets _all_ keys known to your app; for all callers, libraries, etc. Returns a `Promise` object.

**参数：**

| 名称     | 类型                                           | 必填 | 说明                                                       |
| -------- | ---------------------------------------------- | ---- | ---------------------------------------------------------- |
| callback | ?(error: ?Error, keys: ?Array<string>) => void | 否   | Function that will be called the keys found and any error. |

---

### `flushGetRequests()`

```javascript
static flushGetRequests(): [object Object]
```

Flushes any pending requests using a single batch call to get the data.

---

### `multiGet()`

```javascript
static multiGet(keys: Array<string>, [callback]: ?(errors: ?Array<Error>, result: ?Array<Array<string>>) => void)
```

This allows you to batch the fetching of items given an array of `key` inputs. Your callback will be invoked with an array of corresponding key-value pairs found:

```
multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
```

The method returns a `Promise` object.

**参数：**

| 名称     | 类型                                                            | 必填 | 说明                                                                                                                |
| -------- | --------------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------- |
| keys     | Array<string>                                                   | 是   | Array of key for the items to get.                                                                                  |
| callback | ?(errors: ?Array<Error>, result: ?Array<Array<string>>) => void | 否   | Function that will be called with a key-value array of the results, plus an array of any key-specific errors found. |

Example:

```javascript
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

```javascript
static multiSet(keyValuePairs: Array<Array<string>>, [callback]: ?(errors: ?Array<Error>) => void)
```

Use this as a batch operation for storing multiple key-value pairs. When the operation completes you'll get a single callback with any errors:

```
multiSet([['k1', 'val1'], ['k2', 'val2']], cb);
```

The method returns a `Promise` object.

**参数：**

| 名称          | 类型                             | 必填 | 说明                                                                         |
| ------------- | -------------------------------- | ---- | ---------------------------------------------------------------------------- |
| keyValuePairs | Array<Array<string>>             | 是   | Array of key-value array for the items to set.                               |
| callback      | ?(errors: ?Array<Error>) => void | 否   | Function that will be called with an array of any key-specific errors found. |

---

### `multiRemove()`

```javascript
static multiRemove(keys: Array<string>, [callback]: ?(errors: ?Array<Error>) => void)
```

Call this to batch the deletion of all keys in the `keys` array. Returns a `Promise` object.

**参数：**

| 名称     | 类型                             | 必填 | 说明                                                                    |
| -------- | -------------------------------- | ---- | ----------------------------------------------------------------------- |
| keys     | Array<string>                    | 是   | Array of key for the items to delete.                                   |
| callback | ?(errors: ?Array<Error>) => void | 否   | Function that will be called an array of any key-specific errors found. |

Example:

```javascript
let keys = ["k1", "k2"];
AsyncStorage.multiRemove(keys, err => {
  // keys k1 & k2 removed, if they existed
  // do most stuff after removal (if you want)
});
```

---

### `multiMerge()`

```javascript
static multiMerge(keyValuePairs: Array<Array<string>>, [callback]: ?(errors: ?Array<Error>) => void)
```

Batch operation to merge in existing and new values for a given set of keys. This assumes that the values are stringified JSON. Returns a `Promise` object.

**NOTE**: This is not supported by all native implementations.

**参数：**

| 名称          | 类型                             | 必填 | 说明                                                                         |
| ------------- | -------------------------------- | ---- | ---------------------------------------------------------------------------- |
| keyValuePairs | Array<Array<string>>             | 是   | Array of key-value array for the items to merge.                             |
| callback      | ?(errors: ?Array<Error>) => void | 否   | Function that will be called with an array of any key-specific errors found. |

Example:

```javascript
// first user, initial values
let UID234_object = {
  name: "Chris",
  age: 30,
  traits: { hair: "brown", eyes: "brown" }
};

// first user, delta values
let UID234_delta = {
  age: 31,
  traits: { eyes: "blue", shoe_size: 10 }
};

// second user, initial values
let UID345_object = {
  name: "Marge",
  age: 25,
  traits: { hair: "blonde", eyes: "blue" }
};

// second user, delta values
let UID345_delta = {
  age: 26,
  traits: { eyes: "green", shoe_size: 6 }
};

let multi_set_pairs = [
  ["UID234", JSON.stringify(UID234_object)],
  ["UID345", JSON.stringify(UID345_object)]
];
let multi_merge_pairs = [
  ["UID234", JSON.stringify(UID234_delta)],
  ["UID345", JSON.stringify(UID345_delta)]
];

AsyncStorage.multiSet(multi_set_pairs, err => {
  AsyncStorage.multiMerge(multi_merge_pairs, err => {
    AsyncStorage.multiGet(["UID234", "UID345"], (err, stores) => {
      stores.map((result, i, store) => {
        let key = store[i][0];
        let val = store[i][1];
        console.log(key, val);
      });
    });
  });
});

// Console log results:
// => UID234 {"name":"Chris","age":31,"traits":{"shoe_size":10,"hair":"brown","eyes":"blue"}}
// => UID345 {"name":"Marge","age":26,"traits":{"shoe_size":6,"hair":"blonde","eyes":"green"}}
```

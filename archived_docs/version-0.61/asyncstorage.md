---
id: version-0.61-asyncstorage
title: 🚧 AsyncStorage
original_id: asyncstorage
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(99.72%), [95537559](https://github.com/search?q=95537559%40qq.com+in%3Aemail&type=Users)(0.28%)

 **Deprecated.** Use [@react-native-community/async-storage](https://github.com/react-native-community/react-native-async-storage) instead.

`AsyncStorage`是一个简单的、异步的、持久化的 Key-Value 存储系统，它对于 App 来说是全局性的。可用来代替 LocalStorage。

我们推荐您在 AsyncStorage 的基础上做一层抽象封装，而不是直接使用 AsyncStorage。

在 iOS 上，`AsyncStorage`在原生端的实现是把较小值存放在序列化的字典中，而把较大值写入单独的文件。在 Android 上，`AsyncStorage`会尝试使用[RocksDB](http://rocksdb.org/)，或退而选择 SQLite。

本模块的 JS 代码提供了对原生实现的一个封装，以提供一个更清晰的 JS API、抛出真正的`Error`对象，以及简单的单项对象操作函数。每个方法都会返回一个`Promise`对象。

导入`AsyncStorage`库：

```
import { AsyncStorage } from "react-native"
```


保存数据：

```
_storeData = async () => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
  } catch (error) {
    // Error saving data
  }
}
```

读取数据：

```
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
   } catch (error) {
     // Error retrieving data
   }
}
```

---

# 文档

## 方法

### `getItem()`

```jsx
static getItem(key: string, [callback]: ?(error: ?Error, result: ?string) => void)
```

读取`key`字段并将结果作为第二个参数传递给`callback`。如果有任何错误发生，则会传递一个`Error`对象作为第一个参数。返回一个`Promise`对象。

**参数：**

| 名称     | 类型                                      | 必填 | 说明                               |
| -------- | ----------------------------------------- | ---- | ---------------------------------- |
| key      | string                                    | 是   | 要读取的字段名                     |
| callback | ?(error: ?Error, result: ?string) => void | 否   | 读取完成后的回调函数（不建议使用） |

---

### `setItem()`

```jsx
static setItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
```

将`key`字段的值设置成`value`(注意 value 必须是字符串值，非字符串数据必须先序列化为字符串)，并在完成后调用`callback`函数。如果有任何错误发生，则会传递一个`Error`对象作为第一个参数。返回一个`Promise`对象。

**参数：**

| 名称     | 类型                     | 必填 | 说明                 |
| -------- | ------------------------ | ---- | -------------------- |
| key      | string                   | 是   | 要写入的字段名       |
| value    | string                   | 是   | 要写入`key`字段的值  |
| callback | ?(error: ?Error) => void | 否   | 发生错误时的回调函数 |

---

### `removeItem()`

```jsx
static removeItem(key: string, [callback]: ?(error: ?Error) => void)
```

删除一个字段。返回一个`Promise`对象。

**参数：**

| 名称     | 类型                     | 必填 | 说明                 |
| -------- | ------------------------ | ---- | -------------------- |
| key      | string                   | 是   | 要删除的字段名。     |
| callback | ?(error: ?Error) => void | 否   | 发生错误时的回调函数 |

---

### `mergeItem()`

```jsx
static mergeItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
```

假设已有的值和新的值都是字符串化的 JSON，则将两个值合并。返回一个`Promise`对象。

**注意：** 还没有被所有原生实现都支持。

**参数：**

| 名称     | 类型                     | 必填 | 说明                        |
| -------- | ------------------------ | ---- | --------------------------- |
| key      | string                   | 是   | 要合并更新的字段名。        |
| value    | string                   | 是   | 要合并到`key`字段上的新值。 |
| callback | ?(error: ?Error) => void | 否   | 发生错误时的回调函数。      |

示例：

```jsx
let UID123_object = {
  name: "Chris",
  age: 30,
  traits: { hair: "brown", eyes: "brown" }
};
// 只需定义新增或是修改的数据
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

```jsx
static clear([callback]: ?(error: ?Error) => void)
```

清空*全部的*`AsyncStorage`数据，不论来自什么库或调用者。通常不应该调用这个函数——使用`removeItem`或者`multiRemove`来清除你自己的 key。返回一个`Promise`对象。

**参数：**

| 名称     | 类型                     | 必填 | 说明                 |
| -------- | ------------------------ | ---- | -------------------- |
| callback | ?(error: ?Error) => void | 否   | 发生错误时的回调函数 |

---

### `getAllKeys()`

```jsx
static getAllKeys([callback]: ?(error: ?Error, keys: ?Array<string>) => void)
```

获取*所有*本应用可以访问到的数据，不论来自什么库或调用者。返回一个`Promise`对象。

**参数：**

| 名称     | 类型                                           | 必填 | 说明               |
| -------- | ---------------------------------------------- | ---- | ------------------ |
| callback | ?(error: ?Error, keys: ?Array<string>) => void | 否   | 完成后的回调函数。 |

---

### `flushGetRequests()`

```jsx
static flushGetRequests(): [object Object]
```

清除所有进行中的查询操作。

---

### `multiGet()`

```jsx
static multiGet(keys: Array<string>, [callback]: ?(errors: ?Array<Error>, result: ?Array<Array<string>>) => void)
```

获取 keys 所包含的所有字段的值，其回调函数会传入一个 key-value 数组形式的数组：

```
multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
```

同样会返回`Promise`对象。

**参数：**

| 名称     | 类型                                                            | 必填 | 说明               |
| -------- | --------------------------------------------------------------- | ---- | ------------------ |
| keys     | Array<string>                                                   | 是   | 要获取的字段名数组 |
| callback | ?(errors: ?Array<Error>, result: ?Array<Array<string>>) => void | 否   | 完成后的回调函数   |

示例：

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
static multiSet(keyValuePairs: Array<Array<string>>, [callback]: ?(errors: ?Array<Error>) => void)
```

multiSet 和 multiMerge 都接受一个与 multiGet 输出值一致的 key-value 数组的数组：

```
multiSet([['k1', 'val1'], ['k2', 'val2']], cb);
```

返回一个`Promise`对象。

**参数：**

| 名称          | 类型                             | 必填 | 说明                 |
| ------------- | -------------------------------- | ---- | -------------------- |
| keyValuePairs | Array<Array<string>>             | 是   | 要写入的字段名数组。 |
| callback      | ?(errors: ?Array<Error>) => void | 否   | 完成后的回调函数。   |

---

### `multiRemove()`

```jsx
static multiRemove(keys: Array<string>, [callback]: ?(errors: ?Array<Error>) => void)
```

删除所有`keys`字段名数组中的数据。返回一个`Promise`对象。

**参数：**

| 名称     | 类型                             | 必填 | 说明                 |
| -------- | -------------------------------- | ---- | -------------------- |
| keys     | Array<string>                    | 是   | 要删除的字段名数组。 |
| callback | ?(errors: ?Array<Error>) => void | 否   | 完成后的回调函数。   |

示例：

```jsx
let keys = ["k1", "k2"];
AsyncStorage.multiRemove(keys, err => {
  // 如果k1,k2字段值存在的话就会被删除
});
```

---

### `multiMerge()`

```jsx
static multiMerge(keyValuePairs: Array<Array<string>>, [callback]: ?(errors: ?Array<Error>) => void)
```

将多个输入的值和已有的值合并，要求都是字符串化的 JSON。返回一个`Promise`对象。

**注意：**还没有被所有原生实现都支持。

**参数：**

| 名称          | 类型                             | 必填 | 说明                 |
| ------------- | -------------------------------- | ---- | -------------------- |
| keyValuePairs | Array<Array<string>>             | 是   | 要合并的字段名数组。 |
| callback      | ?(errors: ?Array<Error>) => void | 否   | 完成后的回调函数。   |

示例：

```jsx
// 第一个用户的初始数据
let UID234_object = {
  name: "Chris",
  age: 30,
  traits: { hair: "brown", eyes: "brown" }
};

// 第一个用户的增量数据
let UID234_delta = {
  age: 31,
  traits: { eyes: "blue", shoe_size: 10 }
};

// 第二个用户的初始数据
let UID345_object = {
  name: "Marge",
  age: 25,
  traits: { hair: "blonde", eyes: "blue" }
};

// 第二个用户的增量数据
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

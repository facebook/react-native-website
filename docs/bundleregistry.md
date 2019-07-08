---
id: bundleregistry
title: BundleRegistry
---

<div class="banner-crna-ejected">
  <h3>Project with Native Code Required</h3>
  <p>
    This API only works in projects made with <code>react-native init</code>
    or in those made with <code>expo init</code> or Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

`BundleRegistry` is the JS module which provides an API to load new bundles on-demand and access their exported data. `BundleRegistry` can only be used when running in multi-bundle mode, which means the bundler has to create multiple bundles and store them in the same directory.

To create bundles for multi-bundle mode, you need to use [Haul](https://github.com/callstack/haul/tree/next) and `multi-bundle` command instead of `bundle`. Please refer to [Haul](https://github.com/callstack/haul/tree/next) documentation for a complete guide.

Using `BundleRegistry.loadBundle` you can send request to the native side in React Native to load new bundle either asynchronously (default) or synchronously.

`BundleRegistry` itself is a EventEmitter, so you can use `addListener` to listen for `bundleLoaded` events, emitted when the bundle is loaded and ready to be used.

### Methods

- [`loadBundle`](bundleregistry.md#loadbundle)
- [`isBundleLoaded`](bundleregistry.md#isbundleloaded)
- [`getBundleExport`](bundleregistry.md#getbundleexport)
- [`addListener`](bundleregistry.md#addlistener)
- [`removeListener`](bundleregistry.md#removelistener)
- [`enableLogging`](bundleregistry.md#enablelogging)
- [`disableLogging`](bundleregistry.md#disablelogging)

### Supported events

- [`bundleLoaded`](bundleregistry.md#bundleloaded)

---

# Reference

## Events

### `bundleLoaded`

Emitted when the bundle was loaded, evaluated and it's ready to be used.

Event payload:

| Name               | Type   | Description                                       |
| ------------------ | ------ | ------------------------------------------------- |
| bundleName         | string | Name of the loaded bundle                         |
| loadStartTimestamp | number | Timestamp for when the bundle was started loading |

## Methods

### `loadBundle()`

```javascript
static loadBundle(bundleName: string, synchronously: boolean = false)
```

Sends a request to load bundle specified by `bundleName` to the native side. By default th loading is asynchronous and doesn't block the main thread. You can optionally set the 2nd argument to `true` in which case the loading happens synchronously - it's useful when some bundle needs to be loaded before running anything else.

**Example:**

In host/initial bundle:

```javascript
BundleRegistry.addEventListener(
  'bundleLoaded',
  ({bundleName, loadStartTimestamp}) => {
    console.log(
      `Bundle ${bundleName} loaded in ${Date.now() - loadStartTimestamp} ms`,
    );
  },
);
BundleRegistry.loadBundle('app0');
```

---

### `getBundleExport()`

```javascript
static getBundleExport(bundleName: string)
```

Gets bundle default export for specified `bundleName`.

**Example:**

Entry point for `app0` bundle:

```javascript
export default function App0() {
  /* ... */
}
```

In host/initial bundle:

```javascript
const App0 = BundleRegistry.getBundleExport('app0');
```

---

### `addListener()`

```javascript
static addListener(eventName: string, listener: Function)
```

Adds event listeners.

---

### `removeListener()`

```javascript
static removeListener(eventName: string, listener: Function)
```

Removes event listener.

---

### `enableLogging()`

```javascript
static enableLogging()
```

Enables debug logging to `console`.

---

### `disableLogging()`

```javascript
static disableLogging()
```

Disables debug logging to `console`.

---

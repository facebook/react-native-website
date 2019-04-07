---
id: version-0.58-dimensions
title: Dimensions
original_id: dimensions
---

### Methods

- [`set`](dimensions.md#set)
- [`get`](dimensions.md#get)
- [`addEventListener`](dimensions.md#addeventlistener)
- [`removeEventListener`](dimensions.md#removeeventlistener)

---

# Reference

## Methods

### `set()`

```javascript
static set(dims)
```

This should only be called from native code by sending the didUpdateDimensions event.

@param {object} dims Simple string-keyed object of dimensions to set

---

### `get()`

```javascript
static get(dim)
```

Initial dimensions are set before `runApplication` is called so they should be available before any other require's are run, but may be updated later.

> Note: Although dimensions are available immediately, they may change (e.g due to device rotation) so any rendering logic or styles that depend on these constants should try to call this function on every render, rather than caching the value (for example, using inline styles rather than setting a value in a `StyleSheet`).

Example: `var {height, width} = Dimensions.get('window');`

@param {string} dim Name of dimension as defined when calling `set`. @returns {Object?} Value for the dimension.

> For Android the `window` dimension will exclude the size used by the `status bar` (if not translucent) and `bottom navigation bar`

---

### `addEventListener()`

```javascript
static addEventListener(type, handler)
```

Add an event handler. Supported events:

- `change`: Fires when a property within the `Dimensions` object changes. The argument to the event handler is an object with `window` and `screen` properties whose values are the same as the return values of `Dimensions.get('window')` and `Dimensions.get('screen')`, respectively.

---

### `removeEventListener()`

```javascript
static removeEventListener(type, handler)
```

Remove an event handler.

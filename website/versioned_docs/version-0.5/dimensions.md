---
id: version-0.5-dimensions
title: Dimensions
original_id: dimensions
---

### Methods

- [`set`](dimensions.md#set)
- [`get`](dimensions.md#get)

---

# Reference

## Methods

### `set()`

```jsx
static set(dims)
```

This should only be called from native code.

@param {object} dims string-keyed object of dimensions to set

---

### `get()`

```jsx
static get(dim)
```

Initial dimensions are set before `runApplication` is called so they should be available before any other require's are run, but may be updated later.

Note: Although dimensions are available immediately, they may change (e.g due to device rotation) so any rendering logic or styles that depend on these constants should try to call this function on every render, rather than caching the value (for example, using inline styles rather than setting a value in a `StyleSheet`).

@param {string} dim Name of dimension as defined when calling `set`. @returns {Object?} Value for the dimension.

---
id: version-0.5-geolocation
title: Geolocation
original_id: geolocation
---

You need to include the `NSLocationWhenInUseUsageDescription` key in Info.plist to enable geolocation. Geolocation is enabled by default when you create a project with `react-native init`.

Geolocation follows the MDN specification: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

### Methods

- [`getCurrentPosition`](geolocation.md#getcurrentposition)
- [`watchPosition`](geolocation.md#watchposition)
- [`clearWatch`](geolocation.md#clearwatch)
- [`stopObserving`](geolocation.md#stopobserving)

---

# Reference

## Methods

### `getCurrentPosition()`

```jsx
static getCurrentPosition(geo_success, geo_error?, geo_options?)
```

Invokes the success callback once with the latest location info. Supported options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool)

---

### `watchPosition()`

```jsx
static watchPosition(success, error?, options?)
```

Invokes the success callback whenever the location changes. Supported options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool)

---

### `clearWatch()`

```jsx
static clearWatch(watchID)
```

---

### `stopObserving()`

```jsx
static stopObserving()
```

Stops observing for device location changes. In addition, it removes all listeners previously registered.

Notice that this method has only effect if the `geolocation.watchPosition(successCallback, errorCallback)` method was previously invoked.

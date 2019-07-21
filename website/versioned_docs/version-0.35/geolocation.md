---
id: version-0.35-geolocation
title: Geolocation
original_id: geolocation
---

The Geolocation API extends the web spec: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

As a browser polyfill, this API is available through the `navigator.geolocation` global - you do not need to `import` it.

### iOS

You need to include the `NSLocationWhenInUseUsageDescription` key in Info.plist to enable geolocation. Geolocation is enabled by default when you create a project with `react-native init`.

### Android

To request access to location, you need to add the following line to your app's `AndroidManifest.xml`:

`<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`

Android API >= 18 Positions will also contain a `mocked` boolean to indicate if position was created from a mock provider.

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

Invokes the success callback once with the latest location info. Supported options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool) On Android, this can return almost immediately if the location is cached or request an update, which might take a while.

---

### `watchPosition()`

```jsx
static watchPosition(success, error?, options?)
```

Invokes the success callback whenever the location changes. Supported options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool), distanceFilter(m)

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

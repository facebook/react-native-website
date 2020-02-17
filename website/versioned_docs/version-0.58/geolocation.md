---
id: version-0.58-geolocation
title: Geolocation
original_id: geolocation
---

The Geolocation API extends the [Geolocation web spec](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation).

As a browser polyfill, this API is available through the `navigator.geolocation` global - you do not need to `import` it.

On Android, this uses the [android.location API](https://developer.android.com/reference/android/location/package-summary). This API is not recommended by Google because it is less accurate and slower than the recommended [Google Location Services API](https://developer.android.com/training/location/). In order to use it with React Native, use the [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service) module.

### Configuration and Permissions

<div class="banner-crna-ejected">
  <h3>Projects with Native Code Only</h3>
  <p>
    This section only applies to projects made with <code>react-native init</code>
    or to those made with <code>expo init</code> or Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

#### iOS

You need to include the `NSLocationWhenInUseUsageDescription` key in Info.plist to enable geolocation when using the app. Geolocation is enabled by default when you create a project with `react-native init`.

In order to enable geolocation in the background, you need to include the 'NSLocationAlwaysUsageDescription' key in Info.plist and add location as a background mode in the 'Capabilities' tab in Xcode.

If you are using CocoaPods for React Native, make sure to include the `RCTGeolocation` sub-podspec.

#### Android

To request access to location, you need to add the following line to your app's `AndroidManifest.xml`:

`<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`

Android API >= 18 Positions will also contain a `mocked` boolean to indicate if position was created from a mock provider.

<p>
  Android API >= 23 Requires an additional step to check for, and request
  the ACCESS_FINE_LOCATION permission using
  the <a href="https://facebook.github.io/react-native/docs/permissionsandroid" target="_blank">PermissionsAndroid API</a>.
  Failure to do so may result in a hard crash.
</p>

### Methods

- [`setRNConfiguration`](#setrnconfiguration)
- [`requestAuthorization`](#requestauthorization)
- [`getCurrentPosition`](#getcurrentposition)
- [`watchPosition`](#watchposition)
- [`clearWatch`](#clearwatch)
- [`stopObserving`](#stopobserving)

---

# Reference

## Methods

### `setRNConfiguration()`

```jsx
geolocation.setRNConfiguration(config);
```

Sets configuration options that will be used in all location requests.

**Parameters:**

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| config | object | Yes      | See below.  |

Supported options:

- `skipPermissionRequests` (boolean, iOS-only) - Defaults to `false`. If `true`, you must request permissions before using Geolocation APIs.

---

### `requestAuthorization()`

```jsx
geolocation.requestAuthorization();
```

Request suitable Location permission based on the key configured on pList. If NSLocationAlwaysUsageDescription is set, it will request Always authorization, although if NSLocationWhenInUseUsageDescription is set, it will request InUse authorization.

---

### `getCurrentPosition()`

```jsx
geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]);
```

Invokes the success callback once with the latest location info.

**Parameters:**

| Name        | Type     | Required | Description                               |
| ----------- | -------- | -------- | ----------------------------------------- |
| geo_success | function | Yes      | Invoked with latest location info.        |
| geo_error   | function | No       | Invoked whenever an error is encountered. |
| geo_options | object   | No       | See below.                                |

Supported options:

- `timeout` (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to INFINITY.
- `maximumAge` (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY.
- `enableHighAccuracy` (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.

---

### `watchPosition()`

```jsx
geolocation.watchPosition(success, [error], [options]);
```

Invokes the success callback whenever the location changes. Returns a `watchId` (number).

**Parameters:**

| Name    | Type     | Required | Description                               |
| ------- | -------- | -------- | ----------------------------------------- |
| success | function | Yes      | Invoked whenever the location changes.    |
| error   | function | No       | Invoked whenever an error is encountered. |
| options | object   | No       | See below.                                |

Supported options:

- `timeout` (ms) - Is a positive value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. Defaults to INFINITY.
- `maximumAge` (ms) - Is a positive value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device will always return a cached position regardless of its age. Defaults to INFINITY.
- `enableHighAccuracy` (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.
- `distanceFilter` (m) - The minimum distance from the previous location to exceed before returning a new location. Set to 0 to not filter locations. Defaults to 100m.
- `useSignificantChanges` (bool) - Uses the battery-efficient native significant changes APIs to return locations. Locations will only be returned when the device detects a significant distance has been breached. Defaults to FALSE.

---

### `clearWatch()`

```jsx
geolocation.clearWatch(watchID);
```

**Parameters:**

| Name    | Type   | Required | Description                          |
| ------- | ------ | -------- | ------------------------------------ |
| watchID | number | Yes      | Id as returned by `watchPosition()`. |

---

### `stopObserving()`

```jsx
geolocation.stopObserving();
```

Stops observing for device location changes. In addition, it removes all listeners previously registered.

Notice that this method has only effect if the `geolocation.watchPosition(successCallback, errorCallback)` method was previously invoked.

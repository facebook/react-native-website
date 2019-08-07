---
id: version-0.40-permissionsandroid
title: PermissionsAndroid
original_id: permissionsandroid
---

`PermissionsAndroid` provides access to Android M's new permissions model. Some permissions are granted by default when the application is installed so long as they appear in `AndroidManifest.xml`. However, "dangerous" permissions require a dialog prompt. You should use this module for those permissions.

On devices before SDK version 23, the permissions are automatically granted if they appear in the manifest, so `checkPermission` and `requestPermission` should always be true.

If a user has previously turned off a permission that you prompt for, the OS will advise your app to show a rationale for needing the permission. The optional `rationale` argument will show a dialog prompt only if necessary - otherwise the normal permission prompt will appear.

### Example

```
async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.requestPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
```

### Methods

- [`constructor`](permissionsandroid.md#constructor)
- [`checkPermission`](permissionsandroid.md#checkpermission)
- [`check`](permissionsandroid.md#check)
- [`requestPermission`](permissionsandroid.md#requestpermission)
- [`request`](permissionsandroid.md#request)
- [`requestMultiple`](permissionsandroid.md#requestmultiple)

---

# Reference

## Methods

### `constructor()`

```jsx
constructor();
```

---

### `checkPermission()`

```jsx
checkPermission(permission);
```

DEPRECATED - use check

Returns a promise resolving to a boolean value as to whether the specified permissions has been granted

@deprecated

---

### `check()`

```jsx
check(permission);
```

Returns a promise resolving to a boolean value as to whether the specified permissions has been granted

---

### `requestPermission()`

```jsx
requestPermission(permission, rationale?)
```

DEPRECATED - use request

Prompts the user to enable a permission and returns a promise resolving to a boolean value indicating whether the user allowed or denied the request

If the optional rationale argument is included (which is an object with a `title` and `message`), this function checks with the OS whether it is necessary to show a dialog explaining why the permission is needed (https://developer.android.com/training/permissions/requesting.html#explain) and then shows the system permission dialog

@deprecated

---

### `request()`

```jsx
request(permission, rationale?)
```

Prompts the user to enable a permission and returns a promise resolving to a string value indicating whether the user allowed or denied the request

If the optional rationale argument is included (which is an object with a `title` and `message`), this function checks with the OS whether it is necessary to show a dialog explaining why the permission is needed (https://developer.android.com/training/permissions/requesting.html#explain) and then shows the system permission dialog

---

### `requestMultiple()`

```jsx
requestMultiple(permissions);
```

Prompts the user to enable multiple permissions in the same dialog and returns an object with the permissions as keys and strings as values indicating whether the user allowed or denied the request

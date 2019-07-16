---
id: version-0.56-permissionsandroid
title: PermissionsAndroid
original_id: permissionsandroid
---

<div class="banner-crna-ejected">
  <h3>Project with Native Code Required</h3>
  <p>
    This API only works in projects made with <code>react-native init</code>
    or in those made with Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

`PermissionsAndroid` provides access to Android M's new permissions model. The so-called "normal" permissions are granted by default when the application is installed as long as they appear in `AndroidManifest.xml`. However, "dangerous" permissions require a dialog prompt. You should use this module for those permissions.

On devices before SDK version 23, the permissions are automatically granted if they appear in the manifest, so `check` and `request` should always resolve to `PermissionsAndroid.RESULTS.GRANTED`.

If a user has previously turned off a permission that you prompt for, the OS will advise your app to show a rationale for needing the permission. The optional `rationale` argument will show a dialog prompt only if necessary - otherwise the normal permission prompt will appear.

### Example

```
import { PermissionsAndroid } from 'react-native';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
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

### Permissions that require prompting the user

Available as constants under `PermissionsAndroid.PERMISSIONS`:

- `READ_CALENDAR`: 'android.permission.READ_CALENDAR'
- `WRITE_CALENDAR`: 'android.permission.WRITE_CALENDAR'
- `CAMERA`: 'android.permission.CAMERA'
- `READ_CONTACTS`: 'android.permission.READ_CONTACTS'
- `WRITE_CONTACTS`: 'android.permission.WRITE_CONTACTS'
- `GET_ACCOUNTS`: 'android.permission.GET_ACCOUNTS'
- `ACCESS_FINE_LOCATION`: 'android.permission.ACCESS_FINE_LOCATION'
- `ACCESS_COARSE_LOCATION`: 'android.permission.ACCESS_COARSE_LOCATION'
- `RECORD_AUDIO`: 'android.permission.RECORD_AUDIO'
- `READ_PHONE_STATE`: 'android.permission.READ_PHONE_STATE'
- `CALL_PHONE`: 'android.permission.CALL_PHONE'
- `READ_CALL_LOG`: 'android.permission.READ_CALL_LOG'
- `WRITE_CALL_LOG`: 'android.permission.WRITE_CALL_LOG'
- `ADD_VOICEMAIL`: 'com.android.voicemail.permission.ADD_VOICEMAIL'
- `USE_SIP`: 'android.permission.USE_SIP'
- `PROCESS_OUTGOING_CALLS`: 'android.permission.PROCESS_OUTGOING_CALLS'
- `BODY_SENSORS`: 'android.permission.BODY_SENSORS'
- `SEND_SMS`: 'android.permission.SEND_SMS'
- `RECEIVE_SMS`: 'android.permission.RECEIVE_SMS'
- `READ_SMS`: 'android.permission.READ_SMS'
- `RECEIVE_WAP_PUSH`: 'android.permission.RECEIVE_WAP_PUSH'
- `RECEIVE_MMS`: 'android.permission.RECEIVE_MMS'
- `READ_EXTERNAL_STORAGE`: 'android.permission.READ_EXTERNAL_STORAGE'
- `WRITE_EXTERNAL_STORAGE`: 'android.permission.WRITE_EXTERNAL_STORAGE'

### Result strings for requesting permissions

Available as constants under `PermissionsAndroid.RESULTS`:

- `GRANTED`: 'granted'
- `DENIED`: 'denied'
- `NEVER_ASK_AGAIN`: 'never_ask_again'

### Methods

- [`constructor`](permissionsandroid.md#constructor)
- [`check`](permissionsandroid.md#check)
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

### `check()`

```jsx
check(permission);
```

Returns a promise resolving to a boolean value as to whether the specified permissions has been granted.

**Parameters:**

| Name       | Type   | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| permission | string | Yes      | The permission to check for. |

---

### `request()`

```jsx
request(permission, [rationale]);
```

Prompts the user to enable a permission and returns a promise resolving to a string value (see result strings above) indicating whether the user allowed or denied the request or does not want to be asked again.

If `rationale` is provided, this function checks with the OS whether it is necessary to show a dialog explaining why the permission is needed (https://developer.android.com/training/permissions/requesting.html#explain) and then shows the system permission dialog.

**Parameters:**

| Name       | Type   | Required | Description                          |
| ---------- | ------ | -------- | ------------------------------------ |
| permission | string | Yes      | The permission to request.           |
| rationale  | object | No       | Object with a `title` and `message`. |

---

### `requestMultiple()`

```jsx
requestMultiple(permissions);
```

Prompts the user to enable multiple permissions in the same dialog and returns an object with the permissions as keys and strings as values (see result strings above) indicating whether the user allowed or denied the request or does not want to be asked again.

**Parameters:**

| Name        | Type  | Required | Description                     |
| ----------- | ----- | -------- | ------------------------------- |
| permissions | array | Yes      | Array of permission to request. |

---
id: removing-default-permissions
title: Removing Default Permissions
---

By default, `INTERNET` permission is added to your Android app as pretty much all apps use it. `SYSTEM_ALERT_WINDOW` permission is added to your Android APK in debug mode but it will be removed in production.

## Hints

1. If your app is free to use in the App-Store and there is no "In-App-Purchase" possible in your App, you also can remove:

- android.vending.CHECK_LICENSE

2. You don't need `WRITE_EXTERNAL_STORAGE` and `READ_EXTERNAL_STORAGE` permissions to use `AsyncStorage`.

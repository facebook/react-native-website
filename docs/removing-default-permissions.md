---
id: removing-default-permissions
title: Removing Default Permissions
---

By default, `INTERNET` permission is added to your Android app as pretty much all apps use it. `SYSTEM_ALERT_WINDOW` permission is added to your Android APK in debug mode but it will be removed in production.

## Notes

* You don't need `WRITE_EXTERNAL_STORAGE` and `READ_EXTERNAL_STORAGE` permissions to use `AsyncStorage`.

---
id: version-0.51-share
title: Share
original_id: share
---

### Methods

- [`share`](share.md#share)
- [`sharedAction`](share.md#sharedaction)
- [`dismissedAction`](share.md#dismissedaction)

---

# Reference

## Methods

### `share()`

```javascript
static share(content, options)
```

Open a dialog to share text content.

In iOS, Returns a Promise which will be invoked an object containing `action`, `activityType`. If the user dismissed the dialog, the Promise will still be resolved with action being `Share.dismissedAction` and all the other keys being undefined.

In Android, Returns a Promise which always be resolved with action being `Share.sharedAction`.

### Content

- `message` - a message to share
- `title` - title of the message

#### iOS

- `url` - an URL to share

At least one of URL and message is required.

### Options

#### iOS

- `subject` - a subject to share via email
- `excludedActivityTypes`
- `tintColor`

#### Android

- `dialogTitle`

---

### `sharedAction()`

```javascript
static sharedAction()
```

The content was successfully shared.

---

### `dismissedAction()`

```javascript
static dismissedAction()
```

The dialog has been dismissed. @platform ios

---
id: devsettings
title: DevSettings
---

The `DevSettings` module exposes methods for customizing settings for developers in development.

---

# Reference

## Methods

### `addMenuItem()`

```jsx
 addMenuItem(title: string, handler: () => )
```

Add a custom menu item to the developer menu:

```jsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```

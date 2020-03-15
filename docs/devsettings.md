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
static addMenuItem(title: string, handler: function)
```

Add a custom menu item to the developer menu:

```jsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```

### `reload()`

```jsx
static reload()
```

Reload the application. Can be invoked directly or on user interaction:

```jsx
<Button title="Reload" onPress={() => DevSettings.reload()} />
```

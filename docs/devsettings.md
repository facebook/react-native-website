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
static addMenuItem(title, handler)
```

Add a custom menu item to the developer menu.

**Parameters:**

| Name                                                           | Type     |
| -------------------------------------------------------------- | -------- |
| title <div className="label basic required">Required</div>     | string   |
| component <div className="label basic required">Required</div> | function |

**Example:**

```jsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```

---

### `reload()`

```jsx
static reload()
```

Reload the application. Can be invoked directly or on user interaction.

**Example:**

```jsx
<Button title="Reload" onPress={() => DevSettings.reload()} />
```

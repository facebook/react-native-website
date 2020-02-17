---
id: version-0.61-devsettings
title: DevSettings
original_id: devsettings
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

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
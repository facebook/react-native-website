---
id: version-0.63-devsettings
title: DevSettings
original_id: devsettings
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

The `DevSettings` module exposes methods for customizing settings for developers in development.

---

# 文档

## 方法

### `addMenuItem()`

```jsx
static addMenuItem(title: string, handler: function)
```

在开发者菜单中添加一个自定义的菜单项：

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

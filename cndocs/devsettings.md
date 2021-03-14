---
id: devsettings
title: DevSettings
---

The `DevSettings` module exposes methods for customizing settings for developers in development.

---

# 文档

## 方法

### `addMenuItem()`

```jsx
static addMenuItem(title, handler)
```

在开发者菜单中添加一个自定义的菜单项：

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

### `reload()`

```jsx
static reload()
```

Reload the application. Can be invoked directly or on user interaction:

```jsx
<Button title="Reload" onPress={() => DevSettings.reload()} />
```

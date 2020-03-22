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
 addMenuItem(title: string, handler: () => )
```

在开发者菜单中添加一个自定义的菜单项：

```jsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```
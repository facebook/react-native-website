---
id: devsettings
title: DevSettings
---

`DevSettings` 模块可以对开发者菜单进行一些自定义。

---

# 文档

## 方法

### `addMenuItem()`

```jsx
static addMenuItem(title, handler)
```

在开发者菜单中添加一个自定义的菜单项：

**参数：**

| 名称                                                           | 类型     |
| -------------------------------------------------------------- | -------- |
| title <div className="label basic required">必需</div>     | string   |
| component <div className="label basic required">必需</div> | function |

**示例：**

```jsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```

### `reload()`

```jsx
static reload()
```

重新加载引用（刷新）。可以直接调用也可以通过用户交互来触发。

```jsx
<Button title="Reload" onPress={() => DevSettings.reload()} />
```

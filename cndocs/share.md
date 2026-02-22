---
id: share
title: Share
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 示例

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Example&supportedPlatforms=ios,android&ext=js
import React from 'react';
import {Alert, Share, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Button onPress={onShare} title="Share" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ShareExample;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Example&supportedPlatforms=ios,android&ext=tsx
import React from 'react';
import {Alert, Share, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Button onPress={onShare} title="Share" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ShareExample;
```

</TabItem>
</Tabs>

# 参考文档

## 方法

### `share()`

```tsx
static share(content: ShareContent, options?: ShareOptions);
```

打开一个对话框来分享文本内容。

在 iOS 中，返回一个 Promise，最终会解析为一个包含 `action` 和 `activityType` 的对象。如果用户关闭了对话框，Promise 仍然会被解析，此时 action 为 `Share.dismissedAction`，其他属性均为 undefined。请注意，某些分享选项在 iOS 模拟器上可能无法显示或正常工作。

在 Android 中，返回一个 Promise，其 action 始终为 `Share.sharedAction`。

**属性：**

| 名称                                                         | 类型   | 说明                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content <div className="label basic required">必需</div> | object | `message` - 要分享的消息<br/>`url` - 要分享的网址 <div className="label ios">iOS</div><br/>`title` - 消息的标题 <div className="label android">Android</div><hr/>至少需要提供 `url` 或 `message` 中的一个。                                                                                                                                                                             |
| options                                                      | object | `dialogTitle` <div className="label android">Android</div><br/>`excludedActivityTypes` <div className="label ios">iOS</div><br/>`subject` - 通过邮件分享时的主题 <div className="label ios">iOS</div><br/>`tintColor` <div className="label ios">iOS</div><br/>`anchor` - 操作表应锚定到的节点（用于 iPad） <div className="label ios">iOS</div> |

---

## 属性

### `sharedAction`

```tsx
static sharedAction: 'sharedAction';
```

表示内容已成功分享。

---

### `dismissedAction` <div className="label ios">iOS</div>

```tsx
static dismissedAction: 'dismissedAction';
```

表示对话框已被关闭。

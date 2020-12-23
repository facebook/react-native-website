---
id: share
title: Share
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 示例

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Function%20Component%20Example&supportedPlatforms=ios,android
import React from 'react';
import { Share, View, Button } from 'react-native';

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
      alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};

export default ShareExample;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Class%20Component%20Example&supportedPlatforms=ios,android
import React, { Component } from 'react';
import { Share, View, Button } from 'react-native';

class ShareExample extends Component {
  onShare = async () => {
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
      alert(error.message);
    }
  };

  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <Button onPress={this.onShare} title="Share" />
      </View>
    );
  }
}

export default ShareExample;
```

</TabItem>
</Tabs>

---

# 文档

## 方法

### `share()`

```jsx
static share(content, options)
```

打开一个对话框来分享文本内容。

在 iOS 中，返回一个 Promise，最终会解析为一个对象，包含有`action`和`activityType`两个属性。如果用户取消对话框，则 Promise 仍将被解析，最终返回的`action`属性会是`Share.dismissedAction`，而其他属性为 undefined。Note that some share options will not appear or work on the iOS simulator.

在 Android 中同样返回一个 Promise，但返回的`action`始终为`Share.sharedAction`。

**属性：**

| 名称                                                     | 类型   | 说明                                                                                                                                                                                                                                     |
| -------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content <div className="label basic required">必填</div> | object | `message` - 要分享的消息<br/>`url` - 要分享的网址 <div class="label ios">iOS</div><br/>`title` - 消息的标题 <div class="label android">Android</div><hr/>`url`或`message`至少要提供一个                                                  |
| options                                                  | object | `dialogTitle` <div class="label android">Android</div><br/>`excludedActivityTypes` <div class="label ios">iOS</div><br/>`subject` - 通过邮件分享的标题 <div class="label ios">iOS</div><br/>`tintColor` <div class="label ios">iOS</div> |

---

## 属性

### `sharedAction`

```jsx
static sharedAction
```

表示内容已成功分享。

---

### `dismissedAction` <div class="label ios">iOS</div>

```jsx
static dismissedAction
```

表示对话框被取消。

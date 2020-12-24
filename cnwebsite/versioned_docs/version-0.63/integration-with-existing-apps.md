---
id: integration-with-existing-apps
title: 集成到现有原生应用
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

import IntegrationJava from './\_integration-with-exisiting-apps-java.md'; import IntegrationObjC from './\_integration-with-exisiting-apps-objc.md'; import IntegrationSwift from './\_integration-with-exisiting-apps-swift.md';

如果你正准备从头开始制作一个新的应用，那么 React Native 会是个非常好的选择。但如果你只想给现有的原生应用中添加一两个视图或是业务流程，React Native 也同样不在话下。只需简单几步，你就可以给原有应用加上新的基于 React Native 的特性、画面和视图等。

具体的步骤根据你所开发的目标平台不同而不同。

> 译注：本文档可能更新不够及时，不能保证适用于最新版本，欢迎了解的朋友使用页面底部的编辑链接帮忙改进此文档。一个实用的建议是可以使用`npx react-native init NewProject`创建一个最新版本的纯 RN 项目，去参考其 Podfile 或是 gradle 等的配置，以它们为准。

<Tabs groupId="language" defaultValue="java" values={[ {label: 'Android (Java)', value: 'java'}, {label: 'iOS (Objective-C)', value: 'objc'}, {label: 'iOS (Swift)', value: 'swift'}, ]}>

<TabItem value="java">

<IntegrationJava />

</TabItem>
<TabItem value="objc">

<IntegrationObjC />

</TabItem>
<TabItem value="swift">

<IntegrationSwift />

</TabItem>
</Tabs>

---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(50.00%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(50.00%)

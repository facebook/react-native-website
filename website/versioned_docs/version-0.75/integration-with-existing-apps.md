---
id: integration-with-existing-apps
title: Integration with Existing Apps
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

import IntegrationJava from './\_integration-with-existing-apps-java.md'; import IntegrationObjC from './\_integration-with-existing-apps-objc.md'; import IntegrationSwift from './\_integration-with-existing-apps-swift.md'; import
IntegrationKotlin from './\_integration-with-existing-apps-kotlin.md';

React Native is great when you are starting a new mobile app from scratch. However, it also works well for adding a single view or user flow to existing native applications. With a few steps, you can add new React Native based features, screens, views, etc.

The specific steps are different depending on what platform you're targeting.

<Tabs groupId="language" queryString defaultValue="java" values={[ {label: 'Android (Kotlin)', value: 'kotlin'}, {label: 'Android (Java)', value: 'java'}, {label: 'iOS (Objective-C)', value: 'objc'}, {label: 'iOS (Swift)', value: 'swift'}, ]}>

<TabItem value="kotlin">

<IntegrationKotlin />

</TabItem>
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

---
id: integration-with-existing-apps
title: Integration with Existing Apps
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

import IntegrationAndroid from './\_integration-with-exisiting-apps-android.md'; import IntegrationiOS from './\_integration-with-exisiting-apps-ios.md';

React Native is great when you are starting a new mobile app from scratch. However, it also works well for adding a single view or user flow to existing native applications. With a few steps, you can add new React Native based features, screens, views, etc.

The specific steps are different depending on what platform you're targeting.

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms}>

<TabItem value="android">

<IntegrationAndroid />

</TabItem>
<TabItem value="ios">

<IntegrationiOS />

</TabItem>
</Tabs>

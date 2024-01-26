---
id: release-stable-minor
title: Minor Stable 0.Y.0
---

import BumpOSSNote from './\_markdown-older-bump-script.mdx';

:::info
Documents in this section go over steps to run different types of React Native release updates. Its intended audience is those in [relevant release roles](./release-roles-responsibilites.md).
:::

### Pre-requisites

- Write access to [react-native](https://github.com/facebook/react-native) repository.
- Write access to [releases](https://github.com/reactwg/react-native-releases) repository.
- One CircleCI personal API token - see [here](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token) how to set one.
- Blog post PR should be ready to merge (for `react-native-website` [repository](https://github.com/facebook/react-native-website)).
- Documentation PR should be ready to merge (for `react-native-website` [repository](https://github.com/facebook/react-native-website)).
- Changelog PR should be ready to merge (for `react-native` [repository](https://github.com/facebook/react-native)).
- Previous RC has been thoroughly tested and no important issues have been reported. When releasing stable minor, you **should not** include any new cherry-picks.

### 1. Publish the release

```bash
# Make sure you are on the release branch of the version
git checkout -b 0.Y-stable

yarn trigger-react-native-release --to-version 0.Y.0 --token <YOUR_CIRCLE_CI_TOKEN>
> Do you want this to be latest?
# Reply to this prompt with "yes".
# This updates npm registry to point to this version as "latest"
```

<BumpOSSNote />

When this is done, all the other PRs (changelog, documentation, blog post) should also get merged.

### 2. Update the GitHub releases

- You can find out how many commits and contributors for a release by making a PR and [comparing the release branches](https://github.com/facebook/react-native/compare/0.66-stable...0.67-stable).

```markdown
<!-- Template for GitHub stable release -->

0.66 stable is out!

This release includes **621 commits** with **92 contributors**! Thank you to all our contributors new and old! See the highlights of the release in our [release blog post](https://reactnative.dev/blog/2021/10/01/version-066).

---

You can participate in the conversation on the status of this release in this [discussion](https://github.com/reactwg/react-native-releases/discussions/23)

---

To help you upgrade to this version, you can use the [upgrade helper](https://react-native-community.github.io/upgrade-helper/) ⚛️

---

You can find the whole changelog history in the [changelog.md file](https://github.com/facebook/react-native/blob/main/CHANGELOG.md).
```

It's likely that when you post this GitHub release, the PRs for changelog, blog post and documentation are still in the rollout phase. You can start publishing the release anyway (to do step #3) with placeholders instead of links - but make sure to come back and update them once everything is out!

### 3. Create a new patch post for your new version

In the [releases working group](https://github.com/reactwg/react-native-releases/discussions), lock the relevant "road to 0.Y.0" discussion, unpin it and label it as "Released". Then, open a new discussion of the "Patches" type, with this text:

```markdown
## Should we release 0.66.1?

Current Release: 0.66.0

Conversations on this thread are limited:

- [major release issues](https://reactnative.dev/contributing/release-faq#what-is-release-blocking).
- [qualified cherry-pick requests](https://reactnative.dev/contributing/release-faq#what-is-a-qualified-pick-request) of commits on main that [did not make the previous patch version](https://reactnative.dev/contributing/release-faq#how-do-i-know-if-my-fixfeature-is-in-a-certain-release).

Please include a link to the specific commit on main to be cherry-picked, for example: [facebook/react-native@bd2b7d6](https://github.com/facebook/react-native/commit/20b0eba581a00e5e7e300f6377379b836617c147)

In other words, if you cannot point to a particular commit on main, then your request likely belongs as a new issue.
If the issue is a [major release issues](https://reactnative.dev/contributing/release-faq#what-is-release-blocking), please reference the issue here.

---

#### List of qualified picks

1.

#### Local commits to backport to main

1.
```

### 4. Update the Support policy

Update the [support policy](https://github.com/reactwg/react-native-releases#releases-support-policy) for the new version.

- The first line should contain the `Next Release` and the status must be `Not Started`
- The other lines must be updated by bumping the versions in the first column by 1 minor

So, for example, if the table contains:

```diff
| Version    | Type                  | Status           |
| ---------- | --------------------- | ---------------- |
-| 0.72.x     | Next version          | Not started      |
-| 0.71.x     | Latest stable         | In support       |
-| 0.70.x     | Previous minor series | In support       |
-| 0.69.x     | Previous minor series | In support       |
-| <=0.68.x   | Old minor series      | Unsupported      |
+| 0.73.x     | Next version          | Not started      |
+| 0.72.x     | Latest stable         | In support       |
+| 0.71.x     | Previous minor series | In support       |
+| 0.70.x     | Previous minor series | In support       |
+| <=0.69.x   | Old minor series      | Unsupported      |
```

### 5. Verify that Upgrade Helper GitHub action has fired

- You should see a [new publish job here](https://github.com/react-native-community/rn-diff-purge/actions).
- Once it has finished, you should be able to see that the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) presents the option to target the new minor.
- If not, check out the guide on [how to update Upgrade Helper](/contributing/updating-upgrade-helper).

### 6. Communicate the new release

Once all the steps above have been completed, it's time to signal to the community that latest minor is available! Do so in the following channels:

- [@reactnative](https://twitter.com/reactnative) on twitter (with a link to the blogpost)
- RN Discord `#releases-coordination`

---
id: release-stable-minor
title: Release Stable Minor
---

### Pre-requisites

- Have the blog post ready to submit as a PR for `react-native-website` [repository](https://github.com/facebook/react-native-website).
- Changelog PR should be ready to merge.

### 1. Publish the release

```bash
# In your react-native checkout, on the release branch of the version
./scripts/bump-oss-version.js
> What version are you releasing?
# Your version
> Do you want this to be latest?
# Generally yes. This updates npm registry to point to this version as "latest"
```

### 2. Update the GitHub releases

- You can find out how many commits and contributors for a release by making a PR and [comparing the release branches](https://github.com/facebook/react-native/compare/0.66-stable...0.67-stable).

```markdown
<!-- Template for GitHub stable release -->

0.66 stable is out!

This release includes **621 commits** with **92 contributors**! Thank you to all our contributors new and old! You can find the [full changelog here](https://github.com/react-native-community/releases/blob/master/CHANGELOG.md#v0660).

- See the highlights of the release in our [release blog post](https://reactnative.dev/blog/2021/10/01/version-066).
- You can participate in the conversation on the status of this release at [this issue](https://github.com/react-native-community/releases/issues/254).
- You can upgrade to this version using the [upgrade helper webtool](https://react-native-community.github.io/upgrade-helper/) ⚛️
```

### 3. Create a new patch post for your new version

```markdown
## Should we release 0.67.1?

Current Release: 0.67.0

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

### 4. Close any outstanding patch posts for previous versions

- Any patch posts for the previous stable are irrelevant now.

### 5. Communicate the new release

- Ship the `react-native-website` changes if not done already.
- Ship the blog post, tweet about blog post.

---
id: release-stable-minor
title: Release Stable Minor
---

### Pre-requisites

- Have the blog post ready to submit as a PR for `react-native-website` [repository](https://github.com/facebook/react-native-website).
- Changelog PR should be ready to merge.
- Previous RC has been thoroughly tested and no important issues have been reported. When releasing stable minor, you should not include any new cherry-picks.

### 1. Publish the release

```bash
# In your react-native checkout, on the release branch of the version
./scripts/bump-oss-version.js --to-version x.y.z --token <YOUR_CIRCLE_CI_TOKEN>
> Do you want this to be latest?
# Generally yes. This updates npm registry to point to this version as "latest"
```

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

### 3. Upload prebuilt Hermes binary

In the `publish_release` CI workflow, the `build_hermes_macos` step produces a `tmp/hermes/output/hermes-runtime-darwin-vx.y.z.tar.gz` artifact, for example [here](https://app.circleci.com/pipelines/github/facebook/react-native/13933/workflows/5f2ad198-2264-4e7e-8c62-7b28e97532d8/jobs/262322/artifacts) are the artifacts for `0.69.0` release. Download it and attach it to the GitHub release.

### 4. Create a new patch post for your new version

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

### 4. Close any outstanding patch posts for previous versions

- Any patch posts for the previous stable are irrelevant now.

### 5. Verify that Upgrade Helper GitHub action has fired

- You should see a [new publish job complete here](https://github.com/react-native-community/rn-diff-purge/actions).
- If not, check out the guide on [how to update Upgrade Helper](/contributing/updating-upgrade-helper).

### 6. Communicate the new release

- Ship the `react-native-website` changes if not done already. See [here](https://github.com/facebook/react-native-website#cutting-a-new-version) how to cut a new version of the website.
- Ship the blog post and tweet about it.

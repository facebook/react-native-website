---
id: release-stable-patch
title: Release Stable Patch
---

### Pre-requisites

- You have some pick requests that qualify for a patch release and people have agreed it’s good to release a patch.

### 1. Cherry-pick commits and run `bump-oss-version` script

```bash
# Be on relevant release branch
# update the stable branch with tags
git pull origin <release-branch> --tags

# cherry pick relevant commits
git cherry-pick <commit>

# once done picking, run the script to release
# You most likely want this release marked as "latest"
./scripts/bump-oss-version.js
```

### 2. Verify Upgrade helper is updated

- You should see a [new publish job complete here](https://github.com/react-native-community/rn-diff-purge/actions).
- If not, check out the guide on [how to update Upgrade Helper](/contributing/updating-upgrade-helper).

### 3. Create a new patch discussion post using template below

```markdown
<!-- Template for new patch -->

# Should we release 0.67.1?

Current Release: [0.67.0](https://github.com/facebook/react-native/releases/tag/v0.67.0)

Conversations on this thread are limited:
- [major release issues](https://reactnative.dev/contributing/release-faq#what-is-release-blocking).
- [qualified cherry-pick requests](https://reactnative.dev/contributing/release-faq#what-is-a-qualified-pick-request) of commits on main that [did not make the previous patch version](https://reactnative.dev/contributing/release-faq#how-do-i-know-if-my-fixfeature-is-in-a-certain-release).

Please include a link to the specific commit on main to be cherry-picked, for example: [facebook/react-native@bd2b7d6](https://github.com/facebook/react-native/commit/20b0eba581a00e5e7e300f6377379b836617c147)

In other words, if you cannot point to a particular commit on main, then your request likely belongs as a new issue.
If the issue is a [major release issues](https://reactnative.dev/contributing/release-faq#what-is-release-blocking), please reference the issue here.

---

#### List of qualified picks
<!-- Keep these in chronological order in time of commit -->
1.

#### Local commits to backport to main
1.
```

### 4. Update previous discussion post

- Label it `Released`.
- Update the title saying the patch has been released and link to new patch discussion.
- Lock the discussion.

### 5. Create GitHub Release

Use template below for the GitHub Release:

```markdown
<!-- Template for a stable patch -->

- TODO Enumerate picks ( you can run `npx @rnx-kit/rn-changelog-generator single -c <commit>` to generate markdown

---

You can participate in the conversation on the status of this release at this [discussion](TODO: your discussion link)

---

To help you upgrade to this version, you can use the [upgrade helper](https://react-native-community.github.io/upgrade-helper/) ⚛️

---

You can find the whole changelog history in the [changelog.md file](https://github.com/facebook/react-native/blob/main/CHANGELOG.md).
```

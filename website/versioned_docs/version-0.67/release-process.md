---
id: release-process
title: Release Process
---

This document goes over steps to run different types of React Native release updates. It is intended audience is for those in relevant release roles.

- [Cut a new release candidate](#releasing-a-new-minor-release-candidate)
- [Patch release candidate](#release-release-candidate-patch)
- [Patch Stable](#release-stable-patch)
- [Promote release candidate to stable](#releasing-stable-0minor0)
- [Troubleshooting](#troubleshooting)

## Releasing a new minor release candidate

### Prerequisites

- Write access to [react-native](https://github.com/facebook/react-native) repo
- Your CircleCI personal API token. See [here](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token) on how to set one
- If testing, follow [pre-requisites for testing](https://github.com/facebook/react-native/wiki/Release-Testing)

### Creating 0.{minor}.0-rc.0

- Create the release branch in `react-native` repo with the appropriate name. Usually `0.X-stable`

      ```bash
      git checkout main
      git pull origin main
      git checkout -b 0.68-stable
      git push origin 0.68-stable

      # This will walk you through what version you are releasing
      ./scripts/bump-oss-version.js -v 0.68.0-rc.0 -t <YOUR_CIRCLE_CI_TOKEN>
      ```

  <img width="400" alt="CircleCI showing publish release" src="https://user-images.githubusercontent.com/1309636/150040711-cfbc2fe3-91eb-42b9-bd06-de2aa7fb94ea.png"/>

  - Once you have run that script, head to CircleCI and you should see under the releases workflow, a `prepare-package-for-release` job
  - This script runs and commits any changes and triggers a deploy job, `build_and_publish_npm_package`
  - Note: Look under “All Branches” to find the publish job. CircleCI does not give a way to search for these jobs.
  - Once complete you should be able to run `npm view react-native` and verify `next` is expected release version

```bash
    $ npm view react-native
    ....
    dist-tags:
    latest: 0.65.1            next: 0.66.0-rc.2         nightly: 0.0.0-f617e022c

```

### 2. Create a PR of the changelog generator

```bash
# Run following with the stable release as base, and your rc.0 version
npx @rnx-kit/rn-changelog-generator --base v[LATEST_STABLE]--compare v[YOUR_RC_0] \
--repo ~/react-native --changelog ~/react-native/CHANGELOG.md > NEW_CHANGES.md

# example against 0.66.4 and 0.67.0-rc.0
npx @rnx-kit/rn-changelog-generator --base v0.66.4 --compare v0.67.0-rc.0 \
--repo ~/react-native --changelog ~/react-native/CHANGELOG.md > NEW_CHANGES.md
```

- Prepend contents of `NEW_CHANGES.md` to `CHANGELOG.md`
- Create a pull request of this change to `react-native` repo and add the `Changelog` label.

### 3. Create a Github Release

- Create a [Github release](https://github.com/facebook/react-native/releases) with this template and **check “Pre-Release” checkbox**

```markdown
<!-- Template for pre-release Github release -->

- <!-- TODO List out notable picks for this patch -->

---

To test it, run:

<!-- TODO Update with your version -->

npx react-native init RN067RC5 --version 0.67.0-rc.5

---

You can participate in the conversation on the status of this release in the [working group](https://github.com/reactwg/react-native-releases/discussions).

---

To help you upgrade to this version, you can use the [upgrade helper](https://react-native-community.github.io/upgrade-helper/) ⚛️

---

See changes from this release in the [changelog PR](https://github.com/facebook/react-native/labels/%F0%9F%93%9D%20Changelog)
```

<img width="400" alt="Create a Github Release" src="https://user-images.githubusercontent.com/1309636/133348648-c33f82b8-b8d2-474a-a06e-35a1fb8d18de.png"/>

### 4. Create a tracking discussion post

- Create a “Road to <YOUR_MINOR_VERSION”> discussion post in [`react-native-releases`](https://github.com/reactwg/react-native-releases/discussions)

```markdown
<!-- Template for a new minor release candidate -->
<!-- Title: Road to <YOUR_VERSION> -->

The branch cut has happened.

## Notice

<!-- TODO update the version -->

- [Current release candidate: 0.68.0-rc.0][current-release]
- Have an issue with current release candidate? [File an issue][issue-form] and we will triage.
- Have a pick request for this release? Does it fall under our [pick request qualifications][faq-wiki]? If so please create a PR against the release branch and comment with the PR link
- If you are release testing. Copy and fill [Release report form](https://github.com/facebook/react-native/wiki/Release-Tester-Matrix)

#### Highlighted Changes in this release

<!-- Add stand-out changes in this release, and link to changelog PR.  -->

- Checkout this [Changelog PR][changelog-pr]

## [Release Process][release-process-wiki]

#### Checklist

- [ ] [Changelog PR][changelog-pr]
- [ ] Start a Google doc of blog post for release and invite contributors of release highlights to expand
- [ ] Follow up on [release dependencies][dependencies-wiki]
  > When ready to publish stable
- [ ] Ship changelog
- [ ] Ship blog post
- [ ] Notify `react-native-website` to ship new version

#### Retrospective Topics

<!-- List out pain points, issues to investigate that are not release-blocking to follow up on -->

-

## Release Status

### Tracking 0.67.0-rc.1

#### Blocking issues for releasing 0.67.0-rc.1

-

#### Picks for 0.67.0-rc.1

-

[changelog-pr]: https://github.com/facebook/react-native/labels/%F0%9F%93%9D%20Changelog
[current-release]: https://github.com/facebook/react-native/releases
[changelog-wiki]: https://github.com/facebook/react-native/wiki/Release-Changelog
[dependencies-wiki]: https://github.com/facebook/react-native/wiki/Release-Dependencies
[faq-wiki]: https://github.com/facebook/react-native/wiki/Release-FAQ
[issue-form]: https://github.com/facebook/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Cpre-release&template=release_blocker_form.yml
[releases]: https://github.com/facebook/react-native/releases
[release-process-wiki]: https://github.com/facebook/react-native/wiki/Release-Process
[upgrade-helper-wiki]: https://github.com/facebook/react-native/wiki/Updating-upgrade-helper
```

### 5. Verify Upgrade Helper github action has fired

- You should see a [new publish job complete here](https://github.com/react-native-community/rn-diff-purge/actions)
- If not, check out the [wiki on how to update](https://github.com/facebook/react-native/wiki/Updating-upgrade-helper)

### 6. Broadcast release candidate is out

- Discord #releases-coordination channel
- Twitter?
- Relevant chats

## Release release candidate patch

### Pre-requisite

- You have some pick requests that qualify for a patch release and people have agreed it’s good to release a patch

### 1. Check out latest version from release branch and run bump-oss-version script

```bash
# update the stable branch with tags
$ git pull origin <release-branch> --tags

# cherry pick relevant commits
$ git cherry-pick <commit>

# once done picking, run the script to release
./scripts/bump-oss-version.js
```

### 2. Similar to cutting new branch, watch CircleCI to ensure right jobs are being triggered

### 3. Update the relevant discussion post with latest RC

## Release Stable Patch

### Pre-requisitse

- You have some pick requests that qualify for a patch release and people have agreed it’s good to release a patch

### 1. Cherry-pick commits and run `bump-oss-version` script

```bash

    # Be on relevant release branch
    # update the stable branch with tags
    $ git pull origin <release-branch> --tags

    # cherry pick relevant commits
    $ git cherry-pick <commit>

    # once done picking, run the script to release
    # You most likely want this release marked as "latest"
    ./scripts/bump-oss-version.js

```

### 2. Verify Upgrade helper is updated

- You should see a [new publish job complete here](https://github.com/react-native-community/rn-diff-purge/actions)
- If not, check out the [wiki on how to update](https://github.com/facebook/react-native/wiki/Updating-upgrade-helper)

### 3. Create a new patch discussion post using template below

```markdown
    <!-- Template for new patch -->

    # Should we release 0.67.1?

    Current Release: [0.67.0](https://github.com/facebook/react-native/releases/tag/v0.67.0)

    Conversations on this thread are limited:
    * [major release issues](https://github.com/facebook/react-native/wiki/Release-FAQ#what-is-release-blocking)
    * [qualified cherry-pick requests](https://github.com/facebook/react-native/wiki/Release-FAQ#what-is-a-qualified-pick-request) of commits on main that [did not make the previous patch version](https://github.com/facebook/react-native/wiki/Release-FAQ#how-do-i-know-if-my-fixfeature-is-in-a-certain-release).

    Please include a link to the specific commit on main to be cherry-picked, for example: [facebook/react-native@bd2b7d6](https://github.com/facebook/react-native/commit/20b0eba581a00e5e7e300f6377379b836617c147)

    In other words, if you cannot point to a particular commit on main, then your request likely belongs as a new issue.
    If the issue is a [major release issue](https://github.com/facebook/react-native/wiki/Release-FAQ#what-is-release-blocking), please reference the issue here.

    ---
    #### List of qualified picks
    <!-- Keep these in chronological order in time of commit -->
    1.

    #### Local commits to backport to main
    1.
```

### 4. Update previous discussion post

- label it `Released`
- Update the title saying the patch has been released and link to new patch discussion
- Lock the discussion

### 5. Create Github Release

- Use template for Github release

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

## Releasing Stable (0.{minor}.0)

### Pre-requisites

- Have the blog post ready to submit as a PR for react-native-website
- Changelog PR should be ready to merge

### 1. Publish the release

```bash
# In your react-native checkout, on the release branch of the version
$ ./scripts/bump-oss-version.js
> What version are you releasing?
# Your version
> Do you want this to be latest?
# Generally yes. This updates npm registry to point to this version as "latest"
```

### 2. Update the Github releases

- You can find out how many commits and contributors for a release by making a PR and [comparing the release branches](https://github.com/facebook/react-native/compare/0.66-stable...0.67-stable).

```markdown
<!-- Temlate for Github stable release -->

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

- [major release issues](https://github.com/facebook/react-native/wiki/Release-FAQ#what-is-release-blocking)
- [qualified cherry-pick requests](https://github.com/facebook/react-native/wiki/Release-FAQ#what-is-a-qualified-pick-request) of commits on main that [did not make the previous patch version](https://github.com/facebook/react-native/wiki/Release-FAQ#how-do-i-know-if-my-fixfeature-is-in-a-certain-release).

Please include a link to the specific commit on main to be cherry-picked, for example: [facebook/react-native@bd2b7d6](https://github.com/facebook/react-native/commit/20b0eba581a00e5e7e300f6377379b836617c147)

In other words, if you cannot point to a particular commit on main, then your request likely belongs as a new issue.
If the issue is a [major release issue](https://github.com/facebook/react-native/wiki/Release-FAQ#what-is-release-blocking), please reference the issue here.

---

#### List of qualified picks

1.

#### Local commits to backport to main

1.
```

### 4. Close any outstanding patch posts for previous versions

- Any patch posts for the previous stable are irrelevant now

### 5. Communicate the new release

- Ship the blog post, tweet about blog post
- Ship the react-native-website changes if not done already

## Troubleshooting

### Manually set npm tags

Say you accidentally forgot to mark something as "latest" or "next"

```bash
# You'll need to first login:
npm login

# Add a tag to a version
npm dist-tag add <pkg>@<version> [<tag>]

# Remove a tag to a version
npm dist-tag rm <pkg>@<version> <tag>

# List tags for react-native
npm dist-tag ls [<pkg>]

# Example of setting latest to 0.66.4
npm dist-tag add react-native@0.66.4 latest
```

### Git Tags

```
# Delete a tag (annotated or not) locally, then push to delete it remotely
git tag --delete tagname
git push origin :tagname

# Add an annotated tag
git tag -a v0.65.3 -m "whatever message"

# Make sure you pull with tags
git pull <remote> <branch> --tags

# Make sure you push any local tags you added/removed
git push <remote> <branch> --follow-tags

```

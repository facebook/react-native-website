---
id: release-candidate-minor
title: Release Minor Candidate
---

This document goes over steps to run different types of React Native release updates. It is intended audience is for those in relevant release roles.

### Pre-requisites

- Write access to [react-native](https://github.com/facebook/react-native) repository.
- Your CircleCI personal API token. See [here](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token) on how to set one.
- If testing, follow [pre-requisites for testing](/contributing/release-testing#pre-requisites).

### Creating 0.{minor}.0-rc.0

- Create the release branch in `react-native` repo with the appropriate name (usually `0.X-stable`).

  ```bash
  git checkout main
  git pull origin main
  git checkout -b 0.68-stable
  git push origin 0.68-stable

  # This will walk you through what version you are releasing
  ./scripts/bump-oss-version.js -v 0.68.0-rc.0 -t <YOUR_CIRCLE_CI_TOKEN>
  ```

- Once you have run that script, head to CircleCI and you should see under the releases workflow, a `prepare-package-for-release` job.

  <figure>
    <img width="400" alt="CircleCI showing publish release" src="https://user-images.githubusercontent.com/1309636/150040711-cfbc2fe3-91eb-42b9-bd06-de2aa7fb94ea.png"/>
    <figcaption>CircleCI showing publish release.</figcaption>
  </figure>
  
- This script runs and commits any changes and triggers a deploy job, `build_and_publish_npm_package`.
- Note: Look under “All Branches” to find the publish job. CircleCI does not give a way to search for these jobs.
- Once complete you should be able to run `npm view react-native` and verify `next` is expected release version.

  ```bash
  npm view react-native
  ...
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

- Prepend contents of `NEW_CHANGES.md` to `CHANGELOG.md`.
- Create a pull request of this change to `react-native` repo and add the `Changelog` label.

### 3. Create a GitHub Release

- Create a [GitHub Release](https://github.com/facebook/react-native/releases) with this template and **check “Pre-Release” checkbox**.

```markdown
<!-- Template for pre-release GitHub release -->

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

<figure>
  <img width="400" alt="Creating a GitHub Release" src="https://user-images.githubusercontent.com/1309636/133348648-c33f82b8-b8d2-474a-a06e-35a1fb8d18de.png"/>
  <figcaption>Creating a GitHub Release.</figcaption>
</figure>

### 4. Create a tracking discussion post

Create a "Road to <YOUR_MINOR_VERSION>" discussion post in [`react-native-releases`](https://github.com/reactwg/react-native-releases/discussions):

```markdown
<!-- Template for a new minor release candidate -->
<!-- Title: Road to <YOUR_VERSION> -->

The branch cut has happened.

## Notice

<!-- TODO update the version -->

- [Current release candidate: 0.68.0-rc.0][current-release]
- Have an issue with current release candidate? [File an issue][issue-form] and we will triage.
- Have a pick request for this release? Does it fall under our [pick request qualifications][release-faq]? If so please create a PR against the release branch and comment with the PR link
- If you are release testing. Copy and fill [Test Checklist](/contributing/release-testing#test-checklist).

#### Highlighted Changes in this release

<!-- Add stand-out changes in this release, and link to changelog PR.  -->

- Checkout this [Changelog PR][changelog-pr]

## [Release Process][release-processes]

#### Checklist

- [ ] [Changelog PR][changelog-pr]
- [ ] Start a Google doc of blog post for release and invite contributors of release highlights to expand
- [ ] Follow up on [release dependencies][release-dependencies]
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
[release-dependencies]: https://reactnative.dev/contributing/release-dependencies
[release-faq]: https://reactnative.dev/contributing/release-faq
[issue-form]: https://github.com/facebook/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Cpre-release&template=release_blocker_form.yml
[releases]: https://github.com/facebook/react-native/releases
[release-processes]: https://reactnative.dev/contributing/how-to
[upgrade-helper]: https://reactnative.dev/contributing/updating-upgrade-helper
```

### 5. Verify that Upgrade Helper GitHub action has fired

- You should see a [new publish job complete here](https://github.com/react-native-community/rn-diff-purge/actions).
- If not, check out the guide on [how to update Upgrade Helper](/contributing/updating-upgrade-helper).

### 6. Broadcast that release candidate is out

- React Native Twitter.
- Discord `#releases-coordination` channel.

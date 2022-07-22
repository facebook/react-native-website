---
id: release-branch-cut-and-rc0
title: Branch Cut & RC0
---

:::info
Documents in this section go over steps to run different types of React Native release updates. Its intended audience is those in [relevant release roles](./release-roles-responsibilites.md).
:::

### Pre-requisites

- Write access to [react-native](https://github.com/facebook/react-native) repository.
- Write access to [hermes](https://github.com/facebook/hermes) repository.
- Write access to [releases](https://github.com/reactwg/react-native-releases) repository.
- One CircleCI personal API token - see [here](https://circleci.com/docs/managing-api-tokens#creating-a-personal-api-token) how to set one.

### 1. Creating a new release branch

- Create the release branch in `react-native` repo with the appropriate name (usually `0.XX-stable`).

  ```bash
  git checkout main
  git pull origin main
  git checkout -b 0.69-stable
  ```

- Head to the [Publish Tag](https://github.com/facebook/hermes/actions/workflows/create-tag.yml) workflow in the Hermes repo. Click the "Run Workflow" button and input the RN stable version you are targetting (e.g. 0.69.0). You need to have write access to the facebook/hermes repo to do so or ask a Meta employee to help you on this step.

- Bump the Hermes version on the release branch using this command:

  ```bash
  # Replace <the_hermes_tag> with the tag that will look like 'hermes-2022-02-21-RNv0.68.0-rc1-0172d30ac14e8c936c4fd2c435b799e0009aeb00'
  ./scripts/bump-hermes-version.js -t <the_hermes_tag>
  ```

### 2. Test the current changes

Before continuing further, follow the [testing guide](/contributing/release-testing) to ensure the code doesn't have any major issues.

### 3. Kick off the build of 0.{minor}.0-rc.0

```bash
git push origin 0.69-stable

# This will walk you through what version you are releasing
./scripts/bump-oss-version.js --to-version 0.69.0-rc.0 --token <YOUR_CIRCLE_CI_TOKEN>
```

- Once you have run that script, head to CircleCI and you should see under the releases workflow, a `prepare-package-for-release` job.

  <figure>
    <img width="400" alt="CircleCI showing publish release" src="https://user-images.githubusercontent.com/1309636/150040711-cfbc2fe3-91eb-42b9-bd06-de2aa7fb94ea.png"/>
    <figcaption>CircleCI showing publish release.</figcaption>
  </figure>

- This script runs and commits any changes and triggers a deploy job, `build_and_publish_npm_package`.
- Note: Look under "All Branches" to find the publish job. CircleCI does not give a way to search for these jobs.
- Once complete you should be able to run `npm view react-native` and verify that under the `next` tag, the version is the expected release version.

  ```bash
  npm view react-native
  ...
  dist-tags:
  latest: 0.68.1            next: 0.69.0-rc.0         nightly: 0.0.0-f617e022c
  ```

### 4. Create a PR of the changelog using the generator

To generate the changelog, we rely on a dedicated tool called [`@rnx-kit/rn-changelog-generator`](https://github.com/microsoft/rnx-kit/tree/main/incubator/rn-changelog-generator) that will parse the custom changelog messages that contributors write in their PRs.

```bash
# Run following with the stable release as base, and your rc.0 version
npx @rnx-kit/rn-changelog-generator --base v[LATEST_STABLE]--compare v[YOUR_RC_0] \
--repo ~/react-native --changelog ~/react-native/CHANGELOG.md

# example against 0.68.2 and 0.69.0-rc.0
npx @rnx-kit/rn-changelog-generator --base v0.68.2 --compare v0.69.0-rc.0 \
--repo ~/react-native --changelog ~/react-native/CHANGELOG.md
```

Create a pull request of this change to `react-native` repo and add the `Changelog` label.

### 5. Create a GitHub Release

- Create a [GitHub Release](https://github.com/facebook/react-native/releases) with this template and **check "Pre-Release" checkbox**.

```markdown
<!-- Template for pre-release GitHub release -->

- <!-- TODO List out notable picks for this patch -->

---

To test it, run:

<!-- TODO Update with your version -->

npx react-native init RN069RC0 --version 0.69.0-rc.0

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

### 6. Upload prebuilt Hermes binary

In the `publish_release` CI workflow, the `build_hermes_macos` step produces a `tmp/hermes/output/hermes-runtime-darwin-vx.y.z.tar.gz` artifact, for example [here](https://app.circleci.com/pipelines/github/facebook/react-native/13933/workflows/5f2ad198-2264-4e7e-8c62-7b28e97532d8/jobs/262322/artifacts) are the artifacts for `0.69.0` release. Download it and attach it to the GitHub release.

### 7. Create a tracking discussion post

Create a "Road to <YOUR_MINOR_VERSION>" discussion post in the [`react-native-releases`](https://github.com/reactwg/react-native-releases/discussions) working group:

```markdown
<!-- Template for a new minor release candidate -->
<!-- Title: Road to <YOUR_VERSION> -->

The branch cut has happened.

## Notice

<!-- TODO update the version -->

- [Current release candidate: 0.69.0-rc.0][current-release]
- Have an issue with current release candidate? [File an issue][issue-form] and we will triage.
- Have a pick request for this release? Does it fall under our [pick request qualifications][release-faq]? If so please create a PR against the release branch and comment with the PR link
- If you are release testing, copy and fill a [test checklist](/contributing/release-testing#test-checklist).

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
- [ ] Make PR to `react-native-website` with the new version cut ([see docs](https://github.com/facebook/react-native-website#cutting-a-new-version))

#### Retrospective Topics

<!-- List out pain points, issues to investigate that are not release-blocking to follow up on -->

-

## Release Status

### Tracking 0.69.0-rc.1

#### Blocking issues for releasing 0.69.0-rc.1

-

#### Picks for 0.69.0-rc.1

-

[changelog-pr]: https://github.com/facebook/react-native/labels/%F0%9F%93%9D%20Changelog
[current-release]: https://github.com/facebook/react-native/releases
[changelog-wiki]: https://reactnative.dev/contributing/changelogs-in-pull-requests
[release-dependencies]: https://reactnative.dev/contributing/release-dependencies
[release-faq]: https://reactnative.dev/contributing/release-faq
[issue-form]: https://github.com/facebook/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Cpre-release&template=release_blocker_form.yml
[releases]: https://github.com/facebook/react-native/releases
[release-processes]: https://reactnative.dev/contributing/overview
[upgrade-helper]: https://reactnative.dev/contributing/updating-upgrade-helper
```

After creating it, make sure to link it in the relevant GitHub Release you created above, and to pin it in the discussion repo.

### 8. Verify that Upgrade Helper GitHub action has fired

- You should see a [new publish job here](https://github.com/react-native-community/rn-diff-purge/actions).
- Once it has finished, you should be able to see that the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) presents the option to target the new RC0.
- If not, check out the guide on [how to update Upgrade Helper](/contributing/updating-upgrade-helper).

### 9. Broadcast that release candidate is out

Once all the steps above have been completed, it's time to signal to the community that RC0 is available for testing! Do so in the following channels:

- [@reactnative](https://twitter.com/reactnative) on twitter
- RN Discord `#releases-coordination` and to the testers in `#testers-feedback`

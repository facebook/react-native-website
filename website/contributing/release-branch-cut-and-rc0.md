---
id: release-branch-cut-and-rc0
title: Branch Cut & RC0
---

import AsyncTestingNote from './\_markdown-async-testing-note.mdx';
import GHReleasesNotesPrerelease from './\_markdown-GH-release-notes-prerelease.mdx';
import RoadToReleaseTemplate from './\_markdown-road-to-release-template.mdx';

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

### 2. Update the Hermes version

- Head to the [Publish Tag](https://github.com/facebook/hermes/actions/workflows/create-tag.yml) workflow in the Hermes repo. Click the "Run Workflow" button and input the RN stable version you are targeting (e.g. 0.69.0). You need to have write access to the facebook/hermes repo to do so or ask a Meta employee to help you on this step.

- Bump the Hermes version on the release branch using this command:

  ```bash
  # Replace <the_hermes_tag> with the tag that will look like 'hermes-2022-07-20-RNv0.70.0-bc97c5399e0789c0a323f8e1431986e207a9e8ba'
  ./packages/react-native/scripts/hermes/bump-hermes-version.js -t <the_hermes_tag>
  ```

- Add and commit the extra file that got created at `packages/react-native/sdks/hermes/.hermesversion`.

### 3. Push the branch and test the current changes

You can now push the branch you created so that others can also start testing:

```bash
git push origin 0.69-stable
```

Before continuing further, follow the [testing guide](/contributing/release-testing) to ensure the code doesn't have any major issues.

<AsyncTestingNote/>

### 4. Bump monorepo packages

- Update monorepo package dependencies by running `yarn bump-all-updated-packages`. Bear in mind that all the package bumps must be on patch level, and be on the minor you are working on. Read more about this script and how it works [here](./release-updating-packages).
- Push the newly generated commit. A CI workflow will publish the new versions of each monorepo package (excluding `react-native`) to npm.
- Wait for this workflow to successfully complete before continuing.

### 5. Kick off the build of `0.{minor}.0-rc.0`

Once you're done with the testing, you can kick-off the bump and publishing of RC0:

```bash
# This will walk you through what version you are releasing
yarn trigger-react-native-release --to-version 0.69.0-rc.0 --token <YOUR_CIRCLE_CI_TOKEN>
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

- Hermes artifacts will be uploaded to the [Maven repository](https://repo1.maven.org/maven2/com/facebook/react/react-native-artifacts/). It might take ~20 minutes for Maven to process them.

### 6. Create a PR of the changelog using the generator

To generate the changelog, we rely on a dedicated tool called [`@rnx-kit/rn-changelog-generator`](https://github.com/microsoft/rnx-kit/tree/main/incubator/rn-changelog-generator) that will parse the custom changelog messages that contributors write in their PRs.

Note: Due to the number of commits for an RC0, this operation is likely to hit GitHub API limits. The snippet below set the optional `--token` arg, which can be obtained from [GitHub Settings > Developer Settings > Personal access tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta).

```bash
# Run following with the stable release as base, and your rc.0 version
npx @rnx-kit/rn-changelog-generator --base v[LATEST_STABLE] --compare v[YOUR_RC_0] \
--repo ~/react-native --changelog ~/react-native/CHANGELOG.md --token [GITHUB_TOKEN]

# example against 0.68.2 and 0.69.0-rc.0
npx @rnx-kit/rn-changelog-generator --base v0.68.2 --compare v0.69.0-rc.0 \
--repo ~/react-native --changelog ~/react-native/CHANGELOG.md --token [GITHUB_TOKEN]
```

Create a pull request of this change to `react-native` repo and add the `Changelog` label.

#### Manually Adjust the Changelog

At the end of the generated Changelog, there could be two additional sections: the **Failed to Parse** section and the **Unknown** section.

The **Failed to Parse** section contains commits that has a `## Changelog:` entry in their summary but, due to typos or other problems, the tool was not able to parse and automatically attribute them to the right section.

The **Unknown** section is populated with commit that landed without the `## Changelog:` entry in the summary.

For both these categories, we have to manually go through the listed commits and move them to the right section, based on the actual change they introduce. The following are a set of heuristic we follow to manually update the changelog:

- Commit of internal changes can be **deleted** from the Changelog.
  - Examples: commit on BUCK files or code refactoring that do not change behaviours or interfaces
- Commit which bumps dependencies should be **moved to the `Changed`** section
  - For each dependency, there should be a single entry with the most recent bump. Commits that bumps the dependencies to lower versions can be **removed**

### 7. Create a GitHub Release

- Create a [GitHub Release](https://github.com/facebook/react-native/releases) with this template and **check "Pre-Release" checkbox**.

<GHReleasesNotesPrerelease />

### 8. Create a tracking discussion post

Create a "Road to [YOUR_MINOR_VERSION]" discussion post in the [`react-native-releases`](https://github.com/reactwg/react-native-releases/discussions) working group:

<RoadToReleaseTemplate />

After creating it, make sure to link it in the relevant GitHub Release you created above, and to pin it in the discussion repo.

### 9. Verify that Upgrade Helper GitHub action has fired

- You should see a [new publish job here](https://github.com/react-native-community/rn-diff-purge/actions).
- Once it has finished, you should be able to see that the [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) presents the option to target the new RC0.
- If not, check out the guide on [how to update Upgrade Helper](/contributing/updating-upgrade-helper).

### 10. Broadcast that release candidate is out

Once all the steps above have been completed, it's time to signal to the community that RC0 is available for testing! Do so in the following channels:

- [@reactnative](https://twitter.com/reactnative) on twitter
- RN Discord `#releases-coordination`

### 11. Bump minor version of all monorepo packages in `main`

Now we've cut a stable release branch, let's update the versions of each package on `main`. This is in the format `0.[next-major].0-main`.

```sh
node scripts/releases/set-version 0.75.0-main --skip-react-native-version
git commit -a -m "Bump packages for next major release"
```

After running, push your changes to a new branch and submit a PR to `main`.

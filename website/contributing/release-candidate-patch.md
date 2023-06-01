---
id: release-candidate-patch
title: RC Patches
---

import AsyncTestingNote from './\_markdown-async-testing-note.mdx';
import GHReleasesNotesPrerelease from './\_markdown-GH-release-notes-prerelease.mdx';

:::info
Documents in this section go over steps to run different types of React Native release updates. Its intended audience is those in [relevant release roles](./release-roles-responsibilites.md).
:::

### Pre-requisites

- You have some pick requests that qualify for a new Release Candidate (RC) patch in the "road to 0.XX.0" [discussion](https://github.com/reactwg/react-native-releases/discussions).
- Write access to [react-native](https://github.com/facebook/react-native) repository.
- Write access to [releases](https://github.com/reactwg/react-native-releases) repository.
- One CircleCI personal API token - see [here](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token) how to set one.

### 1. Check out the latest version from release branch

```bash
# Be on relevant release branch
# update the stable branch with tags
git pull origin <release-branch> --tags
git checkout -b <release-branch>

# cherry pick relevant commits
git cherry-pick <commit-hash>
```

### 2. Bump monorepo packages

Update all packages in the monorepo that were modified by the cherry picks. You can do it by running:

```sh
yarn bump-all-updated-packages # All the package bumps should be on the patch level
git push origin 0.XX-stable
```

After pushing, the CI will take care to publish the new packages automatically.

### 3. Test the current changes

Before continuing further, follow the [testing guide](/contributing/release-testing) to ensure the source code doesn't have any major issues.

<AsyncTestingNote/>

### 4. Run `bump-oss-version` script

```bash
# once verified all the cherry-picked commits, we can push them to remote
git push

# run a script to bump the version
# You **do not** want this release marked as "latest"!
./scripts/bump-oss-version.js --to-version 0.y.0-rc.x --token <YOUR_CIRCLE_CI_TOKEN>
```

### 5. Watch CircleCI to ensure right jobs are being triggered

- Once you have run the bump script script, head to CircleCI and you should see under the releases workflow, a `prepare-package-for-release` job.

  <figure>
    <img width="400" alt="CircleCI showing publish release" src="https://user-images.githubusercontent.com/1309636/150040711-cfbc2fe3-91eb-42b9-bd06-de2aa7fb94ea.png"/>
    <figcaption>CircleCI showing publish release.</figcaption>
  </figure>

- Once complete you should be able to run `npm view react-native` and verify that under the `next` tag, the version is the expected release version.

  ```bash
  npm view react-native
  ...
  dist-tags:
  latest: 0.(y-1).1            next: 0.y.0-rc.x         nightly: 0.0.0-f617e022c
  ```

### 6. Create a GitHub Release

- Create a [GitHub Release](https://github.com/facebook/react-native/releases) with this template and **check "Pre-Release" checkbox**.

<GHReleasesNotesPrerelease />

### 7. Update the relevant discussion post with the latest RC

Go back to the "road to 0.XX.0" [discussion](https://github.com/reactwg/react-native-releases/discussions) and update the "Current release candidate" line with the new version you published.

### 8. Broadcast that release candidate is out

Once all the steps above have been completed, it's time to signal to the community that the new RC is available for testing! Do so in the following channels:

- RN Discord `#releases-coordination`

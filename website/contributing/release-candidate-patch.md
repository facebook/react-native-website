---
id: release-candidate-patch
title: Release Patch Candidate
---

### Pre-requisites

- You have some pick requests that qualify for a patch release and people have agreed it’s good to release a patch.

### 1. Check out the latest version from release branch

```bash
# Be on relevant release branch
# update the stable branch with tags
git pull origin <release-branch> --tags

# cherry pick relevant commits
git cherry-pick <commit>

# once done picking, push changes to the remote
git push
```

### 2. Test the current changes

Before continuing further, follow the [testing](/contributing/release-testing) guide to ensure the release doesn't have any major issues.

### 3. Run `bump-oss-version` script

```bash
# run a script to bump the version
# You most likely **don't** want this release marked as "latest"
./scripts/bump-oss-version.js --version x.y.z-rc.x --token circle-ci-token
```

### 4. Similar to cutting new branch, watch CircleCI to ensure right jobs are being triggered

### 5. Update the relevant discussion post with the latest RC

---
id: release-candidate-patch
title: Release Patch Candidate
---

### Pre-requisites

- You have some pick requests that qualify for a patch release and people have agreed it’s good to release a patch.

### 1. Check out the latest version from release branch and run `bump-oss-version` script

```bash
# update the stable branch with tags
git pull origin <release-branch> --tags

# cherry pick relevant commits
git cherry-pick <commit>

# once done picking, run the script to release
./scripts/bump-oss-version.js
```

### 2. Similar to cutting new branch, watch CircleCI to ensure right jobs are being triggered

### 3. Update the relevant discussion post with the latest RC

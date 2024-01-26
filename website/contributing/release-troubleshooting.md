---
id: release-troubleshooting
title: Troubleshooting
---

### Adding a Local Commit in a -stable branch

In the `-stable` branches (contrary to main branch), the release crew can directly push new commits to quickly address issues. After applying the necessary changes, those changes need to be re-implemented in `main`; this is to avoid inconsistent state across branches, and to prevent having the same failures in future releases.

To make sure not to forget about these changes, we follow some best practices:

1. When adding a local commit to the `stable` branch, the commit message should follow the format:
   `[LOCAL] <fix or change applied to the repo>`
2. After the commit:
   1. open the **Road to 0.X.0** discussion (e.g: [Road to 0.71.0](https://github.com/reactwg/react-native-releases/discussions/41)) or the **Should we release 0.X.Y** discussion (e.g.: [Should we release 0.70.7](https://github.com/reactwg/react-native-releases/discussions/48))
   2. edit the main message adding the link to your commit under the **Local commits to backport to main** section

Once the issue in the `-stable` branch is handled, make sure to backport the fixes to main. When the PR backporting the fix is open against `main`, make sure to update the relevant release discussion by adding the link to the PR right below the local commit in the **Local commits to backport to main** section. This makes it easier to keep track that the local commit has been taken care of.

Typically, the author of the original change should backport it. In that way, the commit's attribution is preserved. If the author is not available (for example, they are in PTO or in a different timezone and the backporting is urgent to unblock other work), anyone can take care of it.

### The Git Tag Has Been Pushed to Remote but CI Failed to Release to NPM

The release process is composed of various steps, of which two are key for the rollout:

1. Create a version tag on the GitHub repository
2. Publish all the artifacts on Maven and NPM

Step 2 takes most of the CI time because it has to build all the artifacts and prefabs needed. It might happen that CI will fail during this part, not reaching the publish to NPM step.

In case Step 1 completes successfully but Step 2 fails, the code in the stable branch is set to the new version, but it has failed to rollout. This means that we need to do some extra steps to be able to retry to publish this version.
If you end up in this situation, follow these steps:

1. Remove the tag that has been pushed (update the `X`, `Y` and `k` values appropriately):
   ```sh
   git tag -d v0.X.Y[-RC.k]
   git push origin :v0.X.Y[-RC.k]
   ```
2. Revert the commit pushed by Step 1. The script we use for the release updates the version numbers all across the codebase in many files ([here's an example](https://github.com/facebook/react-native/commit/38465f2d184a2558681a6b6b45163694c885bd39)). The commit usually has this title `[0.X.Y-rc.k] Bump version numbers` for RCs or `[0.X.Y] Bump version numbers` for stable releases.
   ```sh
   git revert <sha of the commit>
   git push origin 0.X-stable
   ```
3. Apply all the necessary fixes in the `-stable` branch of the codebase. The remedies for this could be of two types:
   - you forgot to cherry-pick some commits. In this case, you follow the standard cherry-pick procedure for RCs and patches.
   - you need to fix some bugs in the code. See the ["Add a local commit"](#adding-a-local-commit-in-a--stable-branch) section.
4. Once you have pushed all the necessary commits in the branch, re-trigger the release process **with the same tag** via the usual script.

### Manually set npm tags

Say you accidentally forgot to mark a release as "latest" or "next"?

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

### Add Git Tags

Say you accidentally forgot to add a tags to the release?

```bash
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

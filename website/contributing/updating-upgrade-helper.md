---
id: updating-upgrade-helper
title: How to Update Upgrade Helper
---

_Point people: [@lucasbento](https://github.com/lucasbento), [@pvinis](https://github.com/pvinis), [@kelset](https://github.com/kelset)_

From the readme of [its dedicated repo](https://github.com/react-native-community/upgrade-helper#-how-it-works):

:::note

The Upgrade Helper tool aims to provide the full set of changes happening between any two versions, based on the previous work done in the `rn-diff-purge` project:

This repository exposes an untouched React Native app generated with the CLI `react-native init RnDiffApp`. Each new React Native release causes a new project to be created, removing the old one, and getting a diff between them. This way, the diff is always clean, always in sync with the changes of the init template.

:::
The upgrade helper webapp relies on [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge) having the diff for the versions of RN released.

## Instructions to update

### For release versions >= 0.68

- The GitHub action will be triggered by the [CircleCI job that pushes the release link](https://github.com/facebook/react-native/blob/main/.circleci/config.yml#L822).

### For release versions < 0.68

:::caution

You need to have write access or be a Code Owner for the `rn-diff-purge` repo to do either of these approaches.

:::

#### Trigger GitHub action via CURL

```bash
# Update the "version" with your version and provide your PAT
curl -X POST -H "Accept: application/vnd.github.v3+json" \
   https://api.github.com/repos/react-native-community/rn-diff-purge/dispatches \
   -d '{"event_type":"publish", "client_payload": {"version": "0.67.0"}}' \
   -H "authorization: Bearer <PAT>"
```

#### Manual instructions

To generate the diff for a new version, there are essentially only 3 steps needed:

- `git clone` the `rn-diff-purge` repo.
- `cd` into it, and `yarn install`.
- Run the script `./new-release.sh <version_tag>`.
  - For example: `./new-release.sh 0.66.0-rc.1`.

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const process = require('process');
const fetch = require('node-fetch');
const fs = require('fs-extra');

async function graphqlQuery({owner, name}) {
  const repoArgs = `owner: "${owner}", name: "${name}"`;

  const query = {
    query: `{
      repository(${repoArgs}) {
        id
        name
        description
        isArchived
        url
        licenseInfo {
          key
        }
        packagejson: object(expression: "master:package.json") {
          ... on Blob {
            text
          }
        }
        stargazers {
          totalCount
        }
        issues(states:OPEN) {
          totalCount
        }
        pullRequests(states:OPEN) {
          totalCount
        }
      }
    }`,
  };

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Got an error from the Github API: ${text}`);
  }

  return await response.json();
}

async function collectRepos() {
  const repos = [
    {
      owner: 'react-native-community',
      name: 'react-native-webview',
      type: 'Component',
      title: 'WebView',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-cameraroll',
      type: 'API',
      title: 'CameraRoll',
    },
    {
      owner: 'harisbaig100',
      name: 'react-native-clipboard',
      type: 'API',
      title: 'ClipBoard',
      packageName: '@react-native-community/react-native-clipboard',
    },
    {
      owner: 'harisbaig100',
      name: 'react-native-segmented-control',
      type: 'Component',
      title: 'SegmentedControlIOS',
      packageName: '@react-native-community/segmented-control',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-masked-view',
      type: 'Component',
      title: 'MaskedViewIOS',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-simple-share',
      type: 'API',
      title: 'Share',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-blur',
      type: 'Component',
      title: 'Blur',
    },
    {
      owner: 'react-native-community',
      name: 'asyncstorage',
      type: 'API',
      title: 'AsyncStorage',
      packageName: '@react-native-community/async-storage',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-slider',
      type: 'Component',
      title: 'Slider',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-datetimepicker',
      type: 'Component',
      title: 'DatePickerIOS',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-image-editor',
      type: 'API',
      title: 'ImageEditor',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-image-picker-ios',
      type: 'Component',
      title: 'ImagePickerIOS',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-checkbox',
      type: 'Component',
      title: 'Checkbox',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-push-notification-ios',
      type: 'API',
      title: 'PushNotificationIOS',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-picker',
      type: 'Component',
      title: 'Picker',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-viewpager',
      type: 'Component',
      title: 'ViewpagerAndroid',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-netinfo',
      type: 'API',
      title: 'NetInfo',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-geolocation',
      type: 'API',
      title: 'Geolocation',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-audio-toolkit',
      type: 'API',
      title: 'AudioToolkit',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-statusbar',
      type: 'Component',
      title: 'StatusBarIOS',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-statusbar',
      type: 'Component',
      title: 'StatusBar',
    },
    {
      owner: 'react-native-community',
      name: 'art',
      type: 'API',
      title: 'ART',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-progress-bar-android',
      type: 'Component',
      title: 'ProgressBarAndroid',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-progress-view',
      type: 'Component',
      title: 'ProgressViewIOS',
    },
    {
      owner: 'expo',
      name: 'react-native-action-sheet',
      type: 'Component',
      title: 'ActionSheetIOS',
      packageName: '@expo/react-native-action-sheet',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-datetimepicker',
      type: 'Component',
      title: 'DatePickerAndroid',
    },
    {
      owner: 'react-native-community',
      name: 'react-native-picker',
      type: 'Component',
      title: 'PickerIOS',
    },
  ];
  const results = await Promise.all(repos.map(repo => graphqlQuery(repo)));
  const mapped = results.map(({data: {repository}}, idx) => ({
    ...repository,
    ...repos[idx],
  }));
  return mapped;
}

async function parseRepos(repos) {
  const filteredRepos = repos.filter(repo => !repo.isArchived);

  const parsedRepos = filteredRepos
    .map(repo => {
      return {
        ...repo,
        packagejson: repo.packagejson && JSON.parse(repo.packagejson.text),
      };
    })
    .map(repo => {
      const hasCommunityEslint =
        repo.packagejson &&
        !!(
          repo.packagejson.devDependencies &&
          repo.packagejson.devDependencies[
            '@react-native-community/eslint-config'
          ]
        );

      const usesMitLicense = !!(
        repo.licenseInfo && repo.licenseInfo.key === 'mit'
      );

      const id = repo.title
        .toLowerCase()
        .split(' ')
        .join('_');

      if (!repo.packageName && !repo.packagejson) {
        console.log(repo);
      }

      return {
        id,
        name: repo.name,
        title: repo.title,
        type: repo.type,
        description: repo.description,
        packageName: repo.packageName || repo.packagejson.name,
        url: repo.url,
        description: repo.description,
        stars: repo.stargazers ? repo.stargazers.totalCount : 0,
        openIssues: repo.issues ? repo.issues.totalCount : 0,
        openPullRequests: repo.pullRequests ? repo.pullRequests.totalCount : 0,
        features: {
          communityEslint: hasCommunityEslint,
          mitLicense: usesMitLicense,
        },
      };
    });

  parsedRepos.sort((a, b) => a.name.localeCompare(b.name));

  return parsedRepos;
}

async function syncCommunityRepos() {
  if (!process.env.GITHUB_TOKEN) {
    console.error(
      `You must have a GITHUB_TOKEN set to call "sync-community-repos"`
    );
    process.exit(1);
  }

  try {
    const collectedRepos = await collectRepos();
    const parsedRepos = await parseRepos(collectedRepos);
    parsedRepos.forEach(repo => {
      fs.writeFileSync(
        `../docs/${repo.id}.md`,
        `---
id: ${repo.id}
title: ${repo.title}
---

${repo.description ? repo.description : ''}

> This ${
          repo.type
        } is not a part of React Native Core but maintained by the React Native Community. You can learn more at its [repo](${
          repo.url
        }).

Package: \`${repo.packageName}\`

GitHub repository: [${repo.url}](${repo.url})

<div class="docs_badges">
<img src="https://img.shields.io/github/stars/react-native-community/${
          repo.name
        }?style=social" />
<img src="https://img.shields.io/github/issues-pr-raw/react-native-community/${
          repo.name
        }" />
<img src="https://img.shields.io/github/issues-raw/react-native-community/${
          repo.name
        }" />
<img src="https://img.shields.io/npm/v/${repo.packageName}" />
</div>
`
      );
    });
  } catch (e) {
    console.error({e});
  }
}

syncCommunityRepos();

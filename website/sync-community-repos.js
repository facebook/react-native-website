/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const process = require('process');
const fetch = require('node-fetch');
const fs = require('fs-extra');

async function graphqlQuery(after = null) {
  const repoArgs = `privacy: PUBLIC, isFork: false, first: 20 ${
    after ? `after: ${after}` : ''
  }`;
  const query = {
    query: `{
      organization(login: "react-native-community") {
        repositories(${repoArgs}) {
          totalCount
          pageInfo {
            endCursor
            startCursor
          }
          nodes {
            id
            name
            description
            isArchived
            url
            licenseInfo {
              key
            }
            repositoryTopics(first: 100) {
              nodes {
                topic {
                  name
                }
              }
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
  const repos = [];

  let endCursor = null;
  do {
    const json = await graphqlQuery(endCursor);

    const {repositories} = json.data.organization;
    repos.push(...repositories.nodes);

    const {pageInfo} = repositories;
    endCursor = pageInfo.endCursor;
  } while (endCursor != null);

  return repos;
}

async function parseRepos(repos) {
  const filteredRepos = repos.filter(repo => !repo.isArchived);

  const parsedRepos = filteredRepos.map(repo => {
    let hasCommunityEslint = false;
    if (repo.packagejson && repo.packagejson.text) {
      const packagejson = JSON.parse(repo.packagejson.text);

      hasCommunityEslint = !!(
        packagejson.devDependencies &&
        packagejson.devDependencies['@react-native-community/eslint-config']
      );
    }

    const usesMitLicense = !!(
      repo.licenseInfo && repo.licenseInfo.key === 'mit'
    );

    return {
      name: repo.name,
      url: repo.url,
      description: repo.description,
      stars: repo.stargazers.totalCount,
      topics: repo.repositoryTopics.nodes.map(topic => topic.topic.name),
      openIssues: repo.issues.totalCount,
      openPullRequests: repo.pullRequests.totalCount,
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

  const collectedRepos = await collectRepos();
  const parsedRepos = await parseRepos(collectedRepos);
  fs.writeFileSync(
    './community-repos.json',
    JSON.stringify(parsedRepos, null, 2)
  );
}

syncCommunityRepos();

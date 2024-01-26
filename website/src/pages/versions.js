/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
const versions = require('../../versions.json');
// The versionsArchived mapping is a custom feature, NOT a Docusaurus feature
const versionsArchived = require('../../versionsArchived.json');

const VersionItem = ({version, archivedDocumentationUrl, currentVersion}) => {
  const versionName = version === 'next' ? 'main' : version;

  const isCurrentVersion = currentVersion === version;
  const isNext = version === 'next';
  const isRC = version.toUpperCase().indexOf('-RC') !== -1;

  const latestMajorVersion = versions[0].toUpperCase().replace('-RC', '');

  const documentationUrl = useBaseUrl(
    archivedDocumentationUrl ??
      `/docs/${isCurrentVersion ? '' : version + '/'}getting-started`
  );
  const documentationLink = <a href={documentationUrl}>Documentation</a>;

  let releaseNotesURL = 'https://github.com/facebook/react-native/releases';
  let releaseNotesTitle = 'Changelog';
  if (isNext) {
    releaseNotesURL = `https://github.com/facebook/react-native/compare/${latestMajorVersion}-stable...main`;
    releaseNotesTitle = 'Commits since ' + latestMajorVersion;
  } else if (!isRC) {
    releaseNotesURL = `https://github.com/facebook/react-native/releases/tag/v${version}.0`;
  }

  const releaseNotesLink = <a href={releaseNotesURL}>{releaseNotesTitle}</a>;

  return (
    <tr>
      <th>{versionName}</th>
      <td>{documentationLink}</td>
      <td>{releaseNotesLink}</td>
    </tr>
  );
};

const Versions = () => {
  const currentVersion = versions.length > 0 ? versions[0] : null;
  const latestVersions = ['next'].concat(
    versions.filter(version => version.indexOf('-RC') !== -1)
  );
  const stableVersions = versions.filter(
    version => version.indexOf('-RC') === -1 && version !== currentVersion
  );

  return (
    <Layout title="Versions" wrapperClassName="versions-page">
      <h1>React Native versions</h1>
      <p>
        Open source React Native releases follow a release train that is
        coordinated on GitHub through the{' '}
        <a
          href={'https://github.com/reactwg/react-native-releases/discussions'}>
          <code>react-native-releases</code>
        </a>{' '}
        repository. New releases are created off the <code>main</code> branch of{' '}
        <a href={'https://github.com/facebook/react-native'}>
          <code>facebook/react-native</code>
        </a>
        . They will follow a Release Candidate process to allow contributors
        like yourself to{' '}
        <a href={useBaseUrl('docs/upgrading')}>verify the changes</a> and to
        identify any issues by{' '}
        <a href="https://github.com/facebook/react-native/issues">
          writing clear, actionable bug reports
        </a>
        . Eventually, the release candidate will be promoted to stable.
      </p>
      <h2>Next version (Unreleased)</h2>
      <p>
        To see what changes are coming and provide better feedback to React
        Native contributors, use the latest release candidate when possible.
        Changes introduced in a release candidate will have been shipped to
        production Facebook apps for over two weeks by the time the release
        candidate is cut.
      </p>
      <table className="versions">
        <tbody>
          {latestVersions.map(version => (
            <VersionItem
              key={'version_' + version}
              version={version}
              currentVersion={currentVersion}
            />
          ))}
        </tbody>
      </table>
      <h2>Latest version</h2>
      <p>
        The most recent stable version will be used automatically whenever a new
        project is created using the <code>npx react-native init</code> command.
      </p>
      <table className="versions">
        <tbody>
          <VersionItem
            key={'version_' + currentVersion}
            version={currentVersion}
            currentVersion={currentVersion}
          />
        </tbody>
      </table>
      <h2>Previous versions</h2>
      <table className="versions">
        <tbody>
          {stableVersions.map(version => (
            <VersionItem
              key={'version_' + version}
              version={version}
              currentVersion={currentVersion}
            />
          ))}
        </tbody>
      </table>
      <h2>Archived versions</h2>
      <p>
        The documentation for unmaintained versions can be found on website
        archive snapshots, hosted as separate sites.
      </p>
      <table className="versions">
        <tbody>
          {Object.entries(versionsArchived).map(
            ([version, archivedDocumentationUrl]) => (
              <VersionItem
                key={'version_' + version}
                version={version}
                archivedDocumentationUrl={archivedDocumentationUrl}
                currentVersion={currentVersion}
              />
            )
          )}
        </tbody>
      </table>
      <p>
        The documentation for versions below <code>0.60</code> can be found on
        the separate website called{' '}
        <a href="https://archive.reactnative.dev/versions">
          React Native Archive
        </a>
        .
      </p>
    </Layout>
  );
};

export default Versions;

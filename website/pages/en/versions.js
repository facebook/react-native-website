/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;

const CWD = process.cwd();
const siteConfig = require(CWD + '/siteConfig.js');
const versions = require(CWD + '/versions.json');

class VersionItem extends React.Component {
  render() {
    const version = this.props.version;
    const versionName = version === 'next' ? 'Master' : version;

    const isCurrentVersion = this.props.currentVersion === version;
    const isNext = version === 'next';
    const isRC = version.toUpperCase().indexOf('-RC') !== -1;

    const latestMajorVersion = versions[0].toUpperCase().replace('-RC', '');
    const documentationLink = (
      <a
        href={
          this.props.baseUrl +
          'docs/' +
          (isCurrentVersion ? '' : version + '/') +
          'getting-started'
        }>
        Documentation
      </a>
    );
    let releaseNotesURL = 'https://github.com/facebook/react-native/releases';
    let releaseNotesTitle = 'Changelog';
    if (isNext) {
      releaseNotesURL = `https://github.com/facebook/react-native/compare/${latestMajorVersion}-stable...master`;
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
  }
}

class Versions extends React.Component {
  render() {
    let currentVersion = versions.length > 0 ? versions[0] : null;
    let latestVersions = ['next'].concat(
      versions.filter(version => version.indexOf('-RC') !== -1)
    );
    const stableVersions = versions.filter(
      version => version.indexOf('-RC') === -1
    );

    return (
      <div className="pageContainer versionsPage">
        <Container className="mainContainer documentContainer postContainer">
          <h1>React Native versions</h1>
          <p>
            Open source React Native releases follow a monthly release train
            that is coordinated on GitHub through the
            <a
              href={
                'https://github.com/react-native-community/react-native-releases'
              }>
              <code>react-native-releases</code>
            </a>{' '}
            repository. At the beginning of each month, a new release candidate
            is created off the master branch of{' '}
            <a href={'https://github.com/facebook/react-native'}>
              <code>facebook/react-native</code>
            </a>
            . The release candidate will soak for a month to allow contributors
            like yourself to{' '}
            <a href={siteConfig.baseUrl + 'docs/upgrading'}>
              verify the changes
            </a>{' '}
            and to identify any issues by{' '}
            <a href="https://github.com/facebook/react-native/issues">
              writing clear, actionable bug reports
            </a>
            . Eventually, the release candidate will be promoted to stable.
          </p>
          <h2>Stable versions</h2>
          <p>
            The most recent stable version will be used automatically whenever a
            new project is created using the <code>react-native init</code>{' '}
            command.
          </p>
          <table className="versions">
            <tbody>
              {stableVersions.map(function(version) {
                return (
                  <VersionItem
                    key={'version_' + version}
                    version={version}
                    baseUrl={siteConfig.baseUrl}
                    currentVersion={currentVersion}
                  />
                );
              })}
            </tbody>
          </table>
          <p>
            You can come back to this page and switch the version of the docs
            you're reading at any time by clicking on the version number at the
            top of the page.
          </p>
        </Container>
      </div>
    );
  }
}

Versions.defaultProps = {
  language: 'en',
};

module.exports = Versions;

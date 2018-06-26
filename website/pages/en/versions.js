/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const CWD = process.cwd();
const siteConfig = require(CWD + "/siteConfig.js");
const versions = require(CWD + "/versions.json");

class VersionItem extends React.Component {
  render() {
    const version = this.props.version;
    const versionName = version === "next" ? "Master" : version;

    const isCurrentVersion = this.props.currentVersion === version;
    const isNext = version === "next";
    const isRC = version.indexOf("-RC") !== -1;

    const documentationLink = (
      <a
        href={
          this.props.baseUrl +
          "docs/" +
          (isCurrentVersion ? "" : version + "/") +
          "getting-started.html"
        }
      >
        Documentation
      </a>
    );
    let releaseNotesURI = "https://github.com/facebook/react-native/releases";
    if (!isNext && !isRC) {
      releaseNotesURI += `/tag/v${version}.0`;
    }
    const releaseNotesLink = isNext ? null : (
      <a href={releaseNotesURI}>Release Notes</a>
    );

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
    let latestVersions = ["next"].concat(
      versions.filter(version => version.indexOf("-RC") !== -1)
    );
    const stableVersions = versions.filter(
      version => version.indexOf("-RC") === -1
    );

    return (
      <div className="pageContainer">
        <Container className="mainContainer documentContainer postContainer">
          <h1>React Native Versions</h1>
          <p>
            Open source React Native releases follow a monthly release train. At
            the beginning of each month, a new release candidate is created off
            the master branch on GitHub. The release candidate will soak for a
            month to allow contributors like yourself to{" "}
            <a href={siteConfig.baseUrl + "docs/upgrading.html"}>
              verify the changes
            </a>{" "}
            and to identify any issues by{" "}
            <a href="https://github.com/facebook/react-native/issues">
              writing clear, actionable bug reports
            </a>. Eventually, the release candidate will be promoted to stable.
          </p>
          <h2>Latest versions</h2>
          <p>
            To see what changes are coming and provide better feedback to React
            Native contributors, use the latest release candidate when possible.
            Changes introduced in a release candidate will have been shipped to
            production Facebook apps for over two weeks by the time the release
            is cut.
          </p>
          <table className="versions">
            <tbody>
              {latestVersions.map(function(version) {
                return (
                  <VersionItem
                    key={"version_" + version}
                    version={version}
                    baseUrl={siteConfig.baseUrl}
                    currentVersion={currentVersion}
                  />
                );
              })}
            </tbody>
          </table>
          <h2>Stable versions</h2>
          <p>
            The most recent stable version will be used automatically whenever a
            new project is created using the <code>react-native init</code>{" "}
            command.
          </p>
          <table className="versions">
            <tbody>
              {stableVersions.map(function(version) {
                return (
                  <VersionItem
                    key={"version_" + version}
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
  language: "en"
};

module.exports = Versions;

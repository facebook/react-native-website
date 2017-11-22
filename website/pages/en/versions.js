/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const CWD = process.cwd();
const siteConfig = require(CWD + "/siteConfig.js");
const versions = require(CWD + "/versions.json");

class Versions extends React.Component {
  render() {
    const releaseCandidateVersion = versions[0];
    const stableVersion = versions[1];

    return (
      <div className="pageContainer">
        <Container className="mainContainer documentContainer postContainer">
          <h1>React Native Versions</h1>
          <p>
            React Native follows a monthly release train. Every month, a new
            branch created off master enters the Release Candidate phase, and
            the previous Release Candidate branch is released and considered
            stable.
          </p>
          <p>
            If you have an existing project that uses React Native, read the
            release notes to learn about new features and fixes. You can follow{" "}
            <a href={siteConfig.baseUrl + "docs/upgrading.html"}>
              our guide to upgrade your app to the latest version
            </a>.
          </p>
          <p>
            You can view the docs for a particular version of React Native by
            clicking on the Documentation link next to the release in this page.
            You can come back to this page and switch the version of the docs
            you're reading at any time by clicking on the version number at the
            top of the page.
          </p>
          <h2>Latest versions</h2>
          <p>
            To see what changes are coming and provide better feedback to React
            Native contributors, use the latest release candidate when possible.
            By the time a release candidate is released, the changes it contains
            will have been shipped in production Facebook apps for over two
            weeks.
          </p>
          <table className="versions">
            <tbody>
              <tr>
                <th>Master</th>
                <td>
                  <a
                    href={siteConfig.baseUrl + "docs/next/getting-started.html"}
                  >
                    Documentation
                  </a>
                </td>
                <td />
              </tr>
              <tr>
                <th>{releaseCandidateVersion}-RC</th>
                <td>
                  <a
                    href={
                      siteConfig.baseUrl +
                      "docs/" +
                      releaseCandidateVersion +
                      "/getting-started.html"
                    }
                  >
                    Documentation
                  </a>
                </td>
                <td>
                  <a
                    href={
                      "https://github.com/facebook/react-native/releases/tag/v" +
                      releaseCandidateVersion +
                      ".0-rc.0"
                    }
                  >
                    Release Notes
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Stable version</h2>
          <p>
            This is the version that is configured automatically when you create
            a new project using <code>react-native init</code>. The stable
            version is released roughly a month after entering release candidate
            status.
          </p>
          <table className="versions">
            <tbody>
              <tr>
                <th>{stableVersion}</th>
                <td>
                  <a
                    href={
                      siteConfig.baseUrl +
                      "docs/" +
                      stableVersion +
                      "/getting-started.html"
                    }
                  >
                    Documentation
                  </a>
                </td>
                <td>
                  <a
                    href={
                      "https://github.com/facebook/react-native/releases/tag/v" +
                      stableVersion +
                      ".0"
                    }
                  >
                    Release Notes
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Past versions</h2>
          <p>
            You can find past versions of React Native on GitHub. The release
            notes can be useful if you would like to learn when a specific
            feature or fix was released.
          </p>
          <table className="versions">
            <tbody>
              {versions.slice(1).map(function(version) {
                return (
                  <tr key={"version_" + version}>
                    <th>{version}</th>
                    <td>
                      <a
                        href={
                          siteConfig.baseUrl +
                          "docs/" +
                          version +
                          "/getting-started.html"
                        }
                      >
                        Documentation
                      </a>
                    </td>
                    <td>
                      <a
                        href={
                          "https://github.com/facebook/react-native/releases/tag/v" +
                          version +
                          ".0"
                        }
                      >
                        Release Notes
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}

Versions.defaultProps = {
  language: "en"
};

module.exports = Versions;

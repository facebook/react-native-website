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
        文档
      </a>
    );
    const releaseNotesLink = isNext ? null : (
      <a
        href={
          "https://github.com/facebook/react-native/releases/tag/v" +
          version.replace("-RC", "") +
          ".0" +
          (isRC ? "-rc.0" : "")
        }
      >
        更新日志（英文）
      </a>
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
          <h1>React Native 版本规则</h1>
          <p>
            开源版本的React
            Native原则上每月发布一个新版本。在每月初发布新的稳定版本的同时，
            在GitHub的最新主代码分支上会切出一个新的测试候选版本（RC）。这个候选版本会在这一个月
            中接受大家的
            <a href={siteConfig.baseUrl + "docs/upgrading.html"}>
              尝鲜测试
            </a>，并积极听取
            <a href="github.com/facebook/react-native/issues">
              描述清楚的、有建设性的意见反馈
            </a>。下个月时，这一候选版本就会成为新的稳定版本。
          </p>
          <h2>最新候选版本</h2>
          <p>
            要了解尝试最新的变化并提供积极的意见反馈，那就来试试最新的候选版本吧。
            候选版本中的新变化一般会在两周之后正式版发布时，在Facebook的官方应用中上线使用。
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
          <h2>稳定版本</h2>
          <p>
            最新的稳定版本会在每次使用<code>react-native init</code>命令创建新项目时自动采用。
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
        </Container>
      </div>
    );
  }
}

Versions.defaultProps = {
  language: "en"
};

module.exports = Versions;

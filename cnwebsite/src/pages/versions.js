/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';

import useBaseUrl from '@docusaurus/useBaseUrl';
const versions = require('../../versions.json');

const VersionItem = ({version, currentVersion}) => {
  const versionName = version === 'next' ? 'Master' : version;

  const isCurrentVersion = currentVersion === version;
  const isNext = version === 'next';
  const isRC = version.toUpperCase().indexOf('-RC') !== -1;

  const latestMajorVersion = versions[0].toUpperCase().replace('-RC', '');
  const documentationLink = (
    <a
      href={useBaseUrl(
        'docs/' + (isCurrentVersion ? '' : version + '/') + 'getting-started'
      )}>
      文档
    </a>
  );
  let releaseNotesURL = 'https://github.com/facebook/react-native/releases';
  let releaseNotesTitle = '更新日志（英文）';
  if (isNext) {
    releaseNotesURL = `https://github.com/facebook/react-native/compare/${latestMajorVersion}-stable...master`;
    releaseNotesTitle = latestMajorVersion + '之后提交的 Commits';
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
    <Layout wrapperClassName="versions-page">
      <h1>React Native 版本规则</h1>
      <p>
        开源版本的React Native原则上每月发布一个新版本。关于版本迭代的讨论请移步{' '}
        <a
          href={
            'https://github.com/react-native-community/react-native-releases'
          }>
          <code>react-native-releases</code>
        </a>{' '}
        仓库（注意请不要在这个仓库里讨论一般的问题）。在每次发布新的稳定版本的同时，
        一般还会在最新主代码分支
        <a href={'https://github.com/facebook/react-native'}>
          <code>facebook/react-native</code>
        </a>
        上切出一个新的测试候选版本（RC）。 这个候选版本会在这一个月中接受大家的{' '}
        <a href={useBaseUrl('docs/upgrading')}>尝鲜测试</a>并积极听取{' '}
        <a href="https://github.com/facebook/react-native/issues">
          描述清楚的、有建设性的意见反馈
        </a>
        。在解决一些重要的问题后，这一候选版本就会成为新的稳定版本。
      </p>
      <h2>最新候选版本（未正式发布）</h2>
      <p>
        要了解尝试最新的变化并提供积极的意见反馈，那就来试试最新的候选版本吧。
        Facebook的官方应用会积极地替大家试用新代码，甚至在还没有切出候选版时就已经应用到上线的应用中。
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
      <h2>稳定版本</h2>
      <p>
        最新的稳定版本会在每次使用<code>npx react-native init</code>
        命令创建新项目时自动采用。
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
      <h2>之前的版本</h2>
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
      <h2>归档的版本</h2>
      <p>
        老版本的文档（<code>0.63</code>
        之前）由于格式不兼容，将仅以markdown形式的文档保存，不再发布到网页上，请移步
        <a href="https://github.com/reactnativecn/react-native-website/tree/production/archived_docs">
          归档文档目录
        </a>
        查看 。
      </p>
    </Layout>
  );
};

export default Versions;

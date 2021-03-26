/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';

import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const renderApp = (app, i) => {
  return (
    <div className="showcase" key={i}>
      <div>
        <a href={app.infoLink}>{renderAppIcon(app)}</a>
        <h3>{app.name}</h3>
        {renderLinks(app)}
        {renderInfo(app.infoTitle, app.infoLink)}
      </div>
    </div>
  );
};

const renderAppIcon = app => {
  let imgSource = app.icon;
  if (!app.icon.startsWith('http')) {
    imgSource = useBaseUrl('img/showcase/' + app.icon);
  }
  return <img src={imgSource} alt={app.name} />;
};

const renderInfo = (title, uri) => {
  return uri ? (
    <p className="info">
      <a href={uri} target="_blank">
        {title}
      </a>
    </p>
  ) : null;
};

const renderLinks = app => {
  if (!app.linkAppStore && !app.linkPlayStore) {
    return;
  }

  const linkAppStore = app.linkAppStore ? (
    <a href={app.linkAppStore} target="_blank">
      iOS
    </a>
  ) : null;
  const linkPlayStore = app.linkPlayStore ? (
    <a href={app.linkPlayStore} target="_blank">
      Android
    </a>
  ) : null;

  return (
    <p>
      {linkPlayStore}
      {linkPlayStore && linkAppStore ? ' • ' : ''}
      {linkAppStore}
    </p>
  );
};

const Showcase = () => {
  const {siteConfig} = useDocusaurusContext();

  const showcaseApps = siteConfig.customFields.users;
  const pinnedApps = showcaseApps.filter(app => app.pinned);
  const featuredApps = showcaseApps
    .filter(app => !app.pinned)
    .sort((a, b) => a.name.localeCompare(b.name));
  const apps = pinnedApps.concat(featuredApps);

  return (
    <Layout
      title="Who's using React Native?"
      description="Thousands of apps are using React Native, check out these apps!">
      <div className="showcaseSection">
        <div className="prose">
          <h1>Who's using React Native?</h1>
          <p>
            Thousands of apps are using React Native, from established Fortune
            500 companies to hot new startups. If you're curious to see what can
            be accomplished with React Native, check out these apps!
          </p>
        </div>
        <div className="logos">{apps.map(renderApp)}</div>
        <a
          class="form-button"
          href="https://forms.gle/BdNf3v5hemV9D5c86"
          target="_blank">
          Fill out this form to apply to the customer spotlight.
        </a>
        <p>
          A curated list of{' '}
          <a href="https://github.com/ReactNativeNews/React-Native-Apps">
            open source React Native apps
          </a>{' '}
          is also being kept by <a href="https://infinite.red/">Infinite Red</a>
          .
        </p>
      </div>
    </Layout>
  );
};

export default Showcase;

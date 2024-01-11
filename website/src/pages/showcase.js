/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';

import {Section} from './index';
import IconExternalLink from '../theme/Icon/ExternalLink';

const renderApp = (app, i) => <AppBox app={app} key={`app-${app.name}-${i}`} />;

const AppBox = ({app}) => {
  const imgSource = useBaseUrl(
    app.icon.startsWith('http') ? app.icon : 'img/showcase/' + app.icon
  );

  return (
    <div className="showcase">
      <div className="iconBox">
        <img src={imgSource} alt={app.name} className="iconBackground" />
        <img src={imgSource} alt={app.name} className="icon" />
      </div>
      <div className="showcaseContent">
        <div>
          <h3>{app.name}</h3>
          {renderLinks(app)}
        </div>
        {app.infoLink && (
          <a
            className="articleButton"
            href={app.infoLink}
            target="_blank"
            title={app.infoTitle}>
            Learn more{' '}
            <IconExternalLink width={12} height={12} style={{opacity: 0.5}} />
          </a>
        )}
      </div>
    </div>
  );
};

const renderLinks = app => {
  if (!app.linkAppStore && !app.linkPlayStore && !app.linkDesktop) {
    return <p />;
  }

  const links = [
    app.linkAppStore ? (
      <a key="ios" href={app.linkAppStore} target="_blank">
        iOS
      </a>
    ) : null,
    app.linkPlayStore ? (
      <a key="android" href={app.linkPlayStore} target="_blank">
        Android
      </a>
    ) : null,
    app.linkDesktop ? (
      <a key="desktop" href={app.linkDesktop} target="_blank">
        Desktop
      </a>
    ) : null,
  ]
    .filter(Boolean)
    .flatMap((link, i) =>
      i === 0 ? [link] : [<span key={i}> • </span>, link]
    );

  return <p className="showcaseLinks">{links}</p>;
};

const randomizeApps = apps =>
  [...apps].filter(app => !app.group).sort(() => 0.5 - Math.random());

const Showcase = () => {
  const {siteConfig} = useDocusaurusContext();

  const {meta, microsoft, shopify, wix, amazon, others} =
    siteConfig.customFields.users;
  const [pinnedRandomizedApps, setPinnedRandomizedApps] = useState([]);
  const [randomizedApps, setRandomizedApps] = useState([]);

  useEffect(() => {
    setRandomizedApps(randomizeApps(others.filter(app => !app.pinned)));
    setPinnedRandomizedApps(randomizeApps(others.filter(app => app.pinned)));
  }, []);

  return (
    <Layout
      title="Showcase"
      description="Thousands of apps are using React Native, check out these apps!">
      <Section background="dark">
        <div className="sectionContainer headerContainer">
          <h1>
            Who is using <span>React Native</span>?
          </h1>
          <p>
            Thousands of apps are using React Native, from established Fortune
            500 companies to hot new startups. If you are curious to see what
            can be accomplished with React Native, check out these apps!
          </p>
        </div>
      </Section>
      <Section>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Meta logo"
              width={140}
              sources={{
                light: useBaseUrl('/img/meta_positive_primary.svg'),
                dark: useBaseUrl('/img/meta_negative_primary.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            React Native is shaping mobile, web, and desktop experiences within
            Meta’s product ecosystem, from Facebook Marketplace, Messenger
            Desktop, Ads Manager to the Oculus companion app and many more.
          </p>
          <div className="logos">{meta.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Microsoft logo"
              width={180}
              sources={{
                light: useBaseUrl('/img/microsoft-logo-gray.png'),
                dark: useBaseUrl('/img/microsoft-logo-white.png'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Microsoft leverages the power of React Native to deliver excellent
            customer experiences in some of its most well known apps.
            <br />
            Microsoft doesn't stop at mobile platforms either -- Microsoft
            leverages React Native to target desktop too! Find out more in the{' '}
            <a
              href="https://microsoft.github.io/react-native-windows/resources-showcase"
              target="_blank">
              dedicated showcase
            </a>{' '}
            for React Native Windows and macOS.
          </p>
          <div className="logos">{microsoft.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Amazon logo"
              width={140}
              sources={{
                light: useBaseUrl('/img/amazon_logo_lightbg.png'),
                dark: useBaseUrl('/img/amazon_logo_darkbg.png'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Amazon has used React Native to rapidly deliver new customer-facing
            features in some of its most popular mobile applications as early as
            2016. Amazon also uses React Native to support customer-favorite
            devices such as the Kindle E-readers.
          </p>
          <div className="logos">{amazon.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Shopify logo"
              width={160}
              sources={{
                light: useBaseUrl('/img/shopify_logo_whitebg.svg'),
                dark: useBaseUrl('/img/shopify_logo_darkbg.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            All new mobile apps at Shopify are React Native and we are actively
            migrating our flagship merchant admin app Shopify Mobile to React
            Native as well. You can read more about React Native development at
            Shopify on our{' '}
            <a href="https://shopify.engineering/topics/mobile" target="_blank">
              blog
            </a>
            .
          </p>
          <div className="logos">{shopify.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Wix logo"
              width={80}
              sources={{
                light: useBaseUrl('/img/showcase/wix_logo_lightbg.svg'),
                dark: useBaseUrl('/img/showcase/wix_logo_darkbg.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            With one of the largest React Native code bases in the world, Wix
            has a long history with the development community and maintains a
            variety of open source projects. Wix is an early adopter of React
            Native and uses it for its entire suite of applications.
          </p>
          <div className="logos">{wix.map(renderApp)}</div>
        </div>
        <div className="showcaseSection showcaseCustomers">
          <h2>Users Showcase</h2>
          <div className="logos">
            {pinnedRandomizedApps.map(renderApp)}
            {randomizedApps.map(renderApp)}
          </div>
        </div>
      </Section>
      <Section background="dark">
        <div className="sectionContainer footerContainer">
          <a
            className="formButton"
            href="https://forms.gle/BdNf3v5hemV9D5c86"
            target="_blank">
            Apply to the Showcase by filling out this form
          </a>
          <p>
            A curated list of{' '}
            <a
              key="demo-apps"
              href="https://github.com/ReactNativeNews/React-Native-Apps">
              open source React Native apps
            </a>{' '}
            is maintained by <a href="https://infinite.red">Infinite Red</a>.
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default Showcase;

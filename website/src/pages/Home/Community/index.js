/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

import styles from './styles.module.css';

function Community() {
  const {siteConfig} = useDocusaurusContext();
  const apps = Object.values(siteConfig.customFields.users)
    .flat()
    .filter(app => app.pinned);

  return (
    <Section>
      <SectionTitle title="Meta supported. Community driven." />
      <div className={styles.featureContainer}>
        <div>
          <p>
            Meta released React Native in 2015 and has been maintaining it ever
            since.
          </p>
          <p>
            In 2018, React Native had the{' '}
            <a href="https://octoverse.github.com/2018/projects#repositories">
              2nd highest
            </a>{' '}
            number of contributors for any repository in GitHub. Today, React
            Native is supported by contributions from individuals and companies
            around the world including{' '}
            <span>
              <a href="https://callstack.com/">Callstack</a>
            </span>
            ,{' '}
            <span>
              <a href="https://expo.io/">Expo</a>
            </span>
            , <a href="https://infinite.red/">Infinite Red</a>,{' '}
            <a href="https://www.microsoft.com/">Microsoft</a> and{' '}
            <a href="https://swmansion.com/">Software Mansion</a>.
          </p>
          <p>
            Our community is always shipping exciting new projects and exploring
            platforms beyond Android and iOS with repos like{' '}
            <span>
              <a href="https://github.com/microsoft/react-native-windows#readme">
                React Native Windows
              </a>
            </span>
            ,{' '}
            <a href="https://github.com/microsoft/react-native-macos#readme">
              React Native macOS
            </a>{' '}
            and{' '}
            <a href="https://github.com/necolas/react-native-web#readme">
              React Native Web
            </a>
            .
          </p>
        </div>
        <div>
          <p>
            React Native is being used in thousands of apps, but it's likely
            you've already used it in one of these apps:
          </p>
          <ul className="AppList">
            {apps.map((app, i) => {
              const imgSource = !app.icon.startsWith('http')
                ? useBaseUrl('img/showcase/' + app.icon)
                : app.icon;
              return (
                <li key={i} className="item">
                  {app.infoLink ? (
                    <a href={app.infoLink}>
                      <img src={imgSource} alt={app.name} />
                    </a>
                  ) : (
                    <img src={imgSource} alt={app.name} />
                  )}
                </li>
              );
            })}
          </ul>
          <p>
            and <a href={useBaseUrl(`showcase`)}>many more</a>.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Community;

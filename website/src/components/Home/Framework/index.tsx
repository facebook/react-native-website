/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Framework() {
  return (
    <Section>
      <SectionTitle
        title="Get a head start with a framework"
        description={
          <>
            React Native brings the React programming paradigm to platforms like
            Android and iOS. It doesn’t prescribe how to do routing, or how to
            access each of the numerous platform APIs. To build a new app with
            React Native, we recommend a framework like{' '}
            <a href="https://expo.dev">Expo</a>.
          </>
        }
      />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <ThemedImage
            alt="File system with folders and files representing screens and navigation"
            className={styles.cardImage}
            sources={{
              light: useBaseUrl('/img/homepage/file-based-routing.png'),
              dark: useBaseUrl('/img/homepage/file-based-routing-dark.png'),
            }}
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>File-based routing</h4>
            <p className={styles.cardDescription}>
              Create stack, modal, drawer, and tab screens with minimal
              boilerplate using your filesystem.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <ThemedImage
            alt="Grid of icons representing libraries, SDKs, and native code"
            className={styles.cardImage}
            sources={{
              light: useBaseUrl('/img/homepage/libraries.png'),
              dark: useBaseUrl('/img/homepage/libraries-dark.png'),
            }}
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>
              Use any library, SDK, or native code
            </h4>
            <p className={styles.cardDescription}>
              Generate native changes or write your own native code. Use over 50
              modules to create your app.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <ThemedImage
            alt="List of developer tool toggles for debugging, performance, and more"
            className={styles.cardImage}
            sources={{
              light: useBaseUrl('/img/homepage/tools.png'),
              dark: useBaseUrl('/img/homepage/tools-dark.png'),
            }}
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>Developer tools</h4>
            <p className={styles.cardDescription}>
              Get started quickly with Expo Go, then continue with
              expo-dev-client: a module that adds Expo’s tools to apps that
              require native changes.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export {Framework};

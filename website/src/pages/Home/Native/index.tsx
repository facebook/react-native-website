/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ThemedImage from '@theme/ThemedImage';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';

import styles from './styles.module.css';

function Native() {
  return (
    <Section>
      <SectionTitle
        title="Native development for everyone"
        description={
          <>
            React Native lets you create truly native apps and doesn't
            compromise your users' experiences. It provides a core set of
            platform agnostic native components like <code>View</code>,{' '}
            <code>Text</code>, and <code>Image</code> that map directly to the
            platform's native UI building blocks.
          </>
        }
      />
      <ThemedImage
        sources={{
          light: '/img/homepage/dissection.png',
          dark: '/img/homepage/dissection-dark.png',
        }}
        className={styles.flyoutIllustration}
        alt="A React Native UI pointing out native elements like Views, ScrollViews, and more"
      />
    </Section>
  );
}

export default Native;

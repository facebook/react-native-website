/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './styles.module.css';

import Badge from '@site/src/theme/Badge';
import Android from '@site/src/theme/Icon/Android';
import Apple from '@site/src/theme/Icon/Apple';
import VisionOS from '@site/src/theme/Icon/VisionOS';
import Windows from '@site/src/theme/Icon/Windows';
import TV from '@site/src/theme/Icon/TV';
import Web from '@site/src/theme/Icon/Web';

export default function PlatformSupport({platforms}) {
  return (
    <div className={styles.container}>
      <strong>Platform support</strong>
      <div className={styles.badgeContainer}>
        {platforms.includes('android') && (
          <Badge icon={<Android />} title="Android" />
        )}
        {platforms.includes('ios') && <Badge icon={<Apple />} title="iOS" />}
        {platforms.includes('macOS') && (
          <Badge icon={<Apple />} title="macOS" />
        )}
        {platforms.includes('tv') && <Badge icon={<TV />} title="TV" />}
        {platforms.includes('watchOS') && (
          <Badge icon={<Apple />} title="watchOS" />
        )}
        {platforms.includes('web') && <Badge icon={<Web />} title="Web" />}
        {platforms.includes('windows') && (
          <Badge icon={<Windows />} title="Windows" />
        )}
        {platforms.includes('visionOS') && (
          <Badge icon={<VisionOS />} title="visionOS" />
        )}
      </div>
    </div>
  );
}

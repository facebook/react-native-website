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
        {platforms.includes('tv') && <Badge icon={<TV />} title="TV" />}
        {platforms.includes('web') && <Badge icon={<Web />} title="Web" />}
      </div>
    </div>
  );
}

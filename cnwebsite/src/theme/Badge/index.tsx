/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './styles.module.css';

export default function Badge({icon, title}) {
  return (
    <div className={styles.container}>
      {icon}
      {title}
    </div>
  );
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import styles from './styles.module.css';

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {description ? (
        <h3 className={styles.description}>{description}</h3>
      ) : null}
    </div>
  );
}

export default SectionTitle;

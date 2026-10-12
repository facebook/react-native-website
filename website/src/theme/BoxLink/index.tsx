/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './styles.module.css';

export default function BoxLink({href, children}) {
  return (
    <a href={href} target="_blank" referrerPolicy="origin">
      <div className={styles.container}>
        <div>{children}</div>
        <div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.rightArrowIcon}>
            <path
              d="M4.16699 9.99984H15.8337M15.8337 9.99984L10.0003 4.1665M15.8337 9.99984L10.0003 15.8332"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}

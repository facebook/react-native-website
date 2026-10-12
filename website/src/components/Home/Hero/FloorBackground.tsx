/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import styles from './styles.module.css';

function FloorBackground() {
  return (
    <svg
      width={1863}
      height={342}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svgContent}>
      <path
        d="M824.138 157.64 931.336.765m0 0L701.252 340.662M931.336.765 505.157 340.662M931.336.765 285.531 340.662M931.336.765 99.895 340.662M931.336.765.54 288.37M931.336.765.54 212.547M931.336.765.54 157.64M931.336.765.54 115.807M931.336.765.54 84.432M931.336.765.54 58.285M931.336.766.54 34.755M931.336.764.54 19.067M931.336.765H.54m930.796 0v339.897m0-339.897L1038.54 157.64M931.336.765l230.084 339.897M931.336.765l426.184 339.897M931.336.765l645.804 339.897M931.336.765l831.444 339.897M931.336.765 1862.13 288.37M931.336.765l930.794 211.782M931.336.765 1862.13 157.64M931.336.765l930.794 115.042M931.336.765l930.794 83.667M931.336.765l930.794 57.52M931.336.766l930.794 33.99M931.336.764l930.794 18.302M931.336.765h930.794"
        stroke="url(#grad1)"
      />
      <defs>
        <radialGradient
          id="grad1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(860.14 -50) scale(713.885 273.082)">
          <stop stopColor="var(--home-hero-floor)" />
          <stop offset="1" stopColor="var(--home-hero-floor)" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default FloorBackground;

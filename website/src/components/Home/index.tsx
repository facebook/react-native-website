/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Hero from './Hero';
import Platforms from './Platforms';
import Native from './Native';
import Framework from './Framework';
import Watch from './Watch';
import Community from './Community';
import CallToAction from './CallToAction';

export default function Home() {
  return (
    <>
      <Hero />
      <Platforms />
      <Native />
      <Framework />
      <Watch />
      <Community />
      <CallToAction />
    </>
  );
}

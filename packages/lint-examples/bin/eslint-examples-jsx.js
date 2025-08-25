#!/usr/bin/env node
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import lintExamples from '../src/lintExamples.js';

lintExamples({
  command: 'eslint',
  args: ['--max-warnings=0', '.'],
  extension: 'jsx',
  writeBack: true,
});

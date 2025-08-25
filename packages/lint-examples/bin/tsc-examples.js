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

console.log('Typechecking TSX docs code examples...');

lintExamples({
  command: 'tsc',
  extension: 'tsx',
  writeBack: false,
});

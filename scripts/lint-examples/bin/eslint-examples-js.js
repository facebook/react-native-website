#!/usr/bin/env node
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const lintExamples = require('../src/lintExamples');

lintExamples({
  command: 'eslint',
  args: ['--max-warnings=0', '.'],
  extension: 'js',
  writeBack: true,
});

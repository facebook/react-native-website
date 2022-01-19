/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.allow = [
  // We frequently refer to form props by their name "disabled".
  // Ideally we would alex-ignore only the valid uses (PRs accepted).
  'invalid',

  // Unfortunately "watchman" is a library name that we depend on.
  'watchman-watchwoman',

  // ignore rehab rule, Detox is an e2e testing library
  'rehab',

  // host refers to host objects in native code
  'host-hostess',
];

// Use a "maybe" level of profanity instead of the default "unlikely".
exports.profanitySureness = 1;

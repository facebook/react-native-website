/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.allow = [
  // We frequently refer to the color property for styling.
  // However, we're keeping "colored" as disallowed and will use alternatives.
  "color",
  "colors",

  // We frequently refer to executing scripts.
  "executed",
  "execution",

  // We frequently refer to failures in errors but never in people.
  "failure",
  "failures",

  // We frequently refer to events firing,
  // and it's unclear what context this is profane.
  "fire",
  "fires",

  // We frequently refer to form props by their name "disabled".
  "invalid",

  // Unfortunately "watchman" is a library name that we depend on.
  "watchman-watchwoman"
];

// Use a "maybe" level of profanity instead of the default "unlikely".
exports.profanitySureness = 1;

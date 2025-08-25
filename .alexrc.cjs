/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.allow = [
  // We frequently refer to form props by their name "disabled".
  // Ideally we would alex-ignore only the valid uses (PRs accepted).
  "invalid",

  // Unfortunately "watchman" is a library name that we depend on.
  "watchman-watchwoman",

  // ignore rehab rule, Detox is an e2e testing library
  "rehab",

  // host refers to host objects in native code
  "host-hostess",

  // allowing this term to prevent reporting "primitive", which is a programming term
  "savage",

  // allowing this term, since it seems to be used not in insensitive cases
  "straightforward",

  // allowing those terms, since they refer to colors and the surname of one of core contributors
  "black",
  "white",

  // allowing this term, since we use it for expressing gratitude for certain contributors
  "special",
];

// Use a "maybe" level of profanity instead of the default "unlikely".
exports.profanitySureness = 1;

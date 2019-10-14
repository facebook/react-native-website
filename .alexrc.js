/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

exports.allow = [
  // We frequently refer to the color property for styling
  "color",
  "colors",

  // We frequently refer to events firing, and it's unclear what context this is profane.
  "fire",
  "fires",

  // We frequently refer executing scripts
  "executed",
  "execution",

  // Unfortunately this is a library name we depend on
  "watchman"
];

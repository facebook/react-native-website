/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

// TODO this plugin could be removed after PR merged:
// https://github.com/facebook/docusaurus/pull/3545
module.exports = function() {
  return {
    plugin: 'site-plugin',
    getClientModules() {
      return [path.resolve(__dirname, './snackPlayerInitializer')];
    },
  };
};

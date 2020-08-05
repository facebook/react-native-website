/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function formatPlatformName(platform) {
  switch (platform.toLowerCase()) {
    case 'ios':
      return 'iOS';
    case 'android':
      return 'Android';
  }
  return platform;
}

module.exports = {
  formatPlatformName,
};

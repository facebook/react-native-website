/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Hard-coded knowledge about the React Native codebase and how to document it,
// beyond what is explicitly encoded in the react-docgen artifact
// (generatedComponentApiDocs.js)

// Ideally this file should go away.

module.exports = {
  linkableTypeAliases: {
    NativeColorValue: {
      text: 'color',
      url: 'colors.md',
    },
    ViewProps: {
      text: 'View Props',
      url: 'view.md#props',
    },
    PressEvent: {
      text: 'PressEvent',
      url: 'pressevent.md',
    },
    'RefreshLayoutConsts.SIZE.DEFAULT': {
      text: 'RefreshControl.SIZE',
      url: 'refreshcontrol.md#refreshlayoutconstssize',
    },
  },
};

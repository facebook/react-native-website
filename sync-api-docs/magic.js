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
    StatusBarAnimation: {
      text: 'StatusBarAnimation',
      url: 'statusbar#statusbaranimation',
    },
    StatusBarStyle: {
      text: 'StatusBarStyle',
      url: 'statusbar#statusbarstyle',
    },
    ReactNode: {
      text: 'React.Node',
      url: 'react-node.md',
    },
    TextStyleProps: {
      text: 'Text Style Props',
      url: 'text-style-props',
    },
    SectionT: {
      text: 'Section',
      url: 'sectionlist#section',
    },
    ViewStyleProps: {
      text: 'View Style Props',
      url: 'view-style-props',
    },
    Text: {
      text: 'Text',
      url: 'text#style',
    },
  },
};

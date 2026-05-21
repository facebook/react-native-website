/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module 'docusaurus-plugin-copy-page-button/src/CopyPageButton' {
  import type {ComponentType, CSSProperties} from 'react';

  type StyleConfig = {
    className?: string;
    style?: CSSProperties;
  };

  type CustomStyles = {
    container?: StyleConfig;
    button?: StyleConfig;
    dropdown?: StyleConfig;
    dropdownItem?: StyleConfig;
  };

  type CopyPageButtonProps = {
    customStyles?: CustomStyles;
    enabledActions?: Array<'copy' | 'view' | 'chatgpt' | 'claude' | 'gemini'>;
    generateMarkdownRoutes?: boolean;
  };

  const CopyPageButton: ComponentType<CopyPageButtonProps>;
  export default CopyPageButton;
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import DocItemFooterOriginal from '@theme-original/DocItemFooter';
import DocsRating from '../../../core/DocsRating';

export default function DocItemFooter(props) {
  return (
    <>
      <DocsRating label={props.content.metadata.unversionedId} />
      <DocItemFooterOriginal {...props} />
    </>
  );
}

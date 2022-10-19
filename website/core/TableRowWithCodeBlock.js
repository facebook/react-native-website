/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState} from 'react';

import CodeBlock from '@theme/CodeBlock';

const TableRowWithCodeBlock = ({name, url, code}) => (
  <tr>
    <td>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ) : (
        name
      )}
    </td>
    <td>
      <CodeBlock>{code}</CodeBlock>
    </td>
  </tr>
);

export default TableRowWithCodeBlock;

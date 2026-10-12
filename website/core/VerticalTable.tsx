/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

const VerticalTable = ({data}) => (
  <table>
    {data.map(row => (
      <tr>
        <th style={{minWidth: '180px'}}>{row[0]}</th>
        <td style={{width: '100%'}}>{row[1]}</td>
      </tr>
    ))}
  </table>
);

export default VerticalTable;

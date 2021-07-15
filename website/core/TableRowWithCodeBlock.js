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

import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import type {Props} from '@theme/CodeBlock';
import InlineCode from './InlineCode';

export default function MDXCode(props: Props) {
  const shouldBeInline = React.Children.toArray(props.children).every(
    el => typeof el === 'string' && !el.includes('\n')
  );

  return shouldBeInline ? <InlineCode {...props} /> : <CodeBlock {...props} />;
}

import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import InlineCode from './InlineCode';

export default {
  ...MDXComponents,
  inlineCode: InlineCode,
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Preprocess the react-docgen artifact before rendering it to Markdown.
// This file may end up in the React Native repo, as part of the
// `generate-api-docs` script.

function tokenizeJsdocish(str) {
  const TAG_RE = /^.*?@([\w-_]+)\s*(.*)\s*$/gm;
  let match;
  let sanitized = '';
  let index = 0;
  let tokens = [];
  while ((match = TAG_RE.exec(str)) != null) {
    if (match.index > index) {
      tokens.push({type: 'text', value: str.slice(index, match.index)});
      index = match.index;
    }
    tokens.push({type: 'tag', key: match[1], value: match[2].trim()});
    index = TAG_RE.lastIndex;
  }
  if (str.length > index) {
    tokens.push({type: 'text', value: str.slice(index, str.length)});
    index = str.length;
  }
  return {
    tokens,
    get text() {
      return tokens
        .map(token => (token.type === 'text' ? token.value : ''))
        .join('');
    },
    get tags() {
      return tokens.filter(token => token.type === 'tag');
    },
  };
}

function preprocessTagsInDescription(obj) {
  if (obj && obj.description) {
    const descriptionTokenized = tokenizeJsdocish(obj.description);
    obj.description = descriptionTokenized.text;
    obj.rnTags = {};
    const platformTag = descriptionTokenized.tags.find(
      ({key}) => key === 'platform'
    );
    if (platformTag) {
      obj.rnTags.platform = platformTag.value;
    }
  }
}

// NOTE: This function mutates `docs`.
function preprocessGeneratedApiDocs(docs) {
  for (const {component} of docs) {
    if (component.props) {
      for (const prop of Object.values(component.props)) {
        preprocessTagsInDescription(prop);
      }
      for (const prop of component.methods) {
        preprocessTagsInDescription(prop);
      }
    }
  }
}

module.exports = preprocessGeneratedApiDocs;

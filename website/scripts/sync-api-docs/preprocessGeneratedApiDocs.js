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

const parseDocComment = require('comment-parser');
const tokenizeComment = require('tokenize-comment');

function joinDescriptionAndExamples(tokenized) {
  let sections = [];
  if (tokenized.description) {
    sections.push(tokenized.description);
  }
  for (const {raw} of tokenized.examples) {
    sections.push(raw);
  }
  if (tokenized.footer) {
    sections.push(tokenized.footer);
  }
  return sections.join('\n\n');
}

// NOTE: This function mutates `docs`.
function preprocessGeneratedApiDocs(docs) {
  for (const doc of docs) {
    if (doc.props) {
      for (const [key, prop] of Object.entries(doc.props)) {
        if (prop.description) {
          const descriptionTokenized = tokenizeComment(prop.description);
          prop.description = joinDescriptionAndExamples(descriptionTokenized);
          prop.rnTags = {};
          const platformTag = descriptionTokenized.tags.find(
            ({key}) => key === 'platform'
          );
          if (platformTag) {
            prop.rnTags.platform = platformTag.value;
          }
        }
      }
    }
  }
}

module.exports = preprocessGeneratedApiDocs;

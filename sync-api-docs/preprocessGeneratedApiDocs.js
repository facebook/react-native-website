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

const tokenizeComment = require('tokenize-comment');
const {typeOf} = require('tokenize-comment/lib/utils');

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

function preprocessTagsInDescription(obj) {
  if (obj && obj.description) {
    obj.description = obj.description
      .split('\n')
      .map(line => {
        return line.replace(/    /, '');
      })
      .join('\n');
    const descriptionTokenized = tokenizeComment(obj.description);
    obj.description = obj.description.replace(
      /@platform .*|@default .*|@type .*/g,
      ''
    );
    obj.rnTags = {};
    const platformTag = descriptionTokenized.tags.find(
      ({key}) => key === 'platform'
    );
    const defaultTag = descriptionTokenized.tags.filter(
      tag => tag.key === 'default'
    );
    const typeTag = descriptionTokenized.tags.filter(tag => tag.key === 'type');

    if (platformTag) {
      obj.rnTags.platform = platformTag.value.split(',');
    }
    if (defaultTag.length) {
      obj.rnTags.default = [];
      defaultTag.forEach(tag => {
        obj.rnTags.default.push(tag.value);
      });
    }
    if (typeTag.length) {
      obj.rnTags.type = [];
      typeTag.forEach(tag => {
        obj.rnTags.type.push(tag.value);
      });
    }
  }
}

// NOTE: This function mutates `docs`.
function preprocessGeneratedApiDocs(docs) {
  for (const {component} of docs) {
    if (component.props && component.description) {
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

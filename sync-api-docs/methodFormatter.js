/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {typeOf} = require('tokenize-comment/lib/utils');
const magic = require('./magic');
const {formatMultiplePlatform} = require('./utils');

function formatMethodType(param) {
  let text, url;
  if (param?.type?.name === 'union') {
    if (param?.type?.alias) {
      const {alias} = param.type;
      if (Object.hasOwnProperty.call(magic.linkableTypeAliases, alias)) {
        ({url, text} = magic.linkableTypeAliases[alias]);
      }
      if (url) return `[${text}](${url})`;
      else return param.type.alias;
    }
    return param.type.name;
  } else {
    if (param?.type?.type) return param.type.type;
    else return param.type.name;
  }
}

function formatMethodName(param) {
  let tag = param.description;
  if (tag) {
    const isMatch = tag.match(/{@platform [a-z ,]*}/);
    if (isMatch) {
      const platform = isMatch[0].match(/ [a-z ,]*/);
      tag = tag.replace(/{@platform [a-z ,]*}/g, '');
      tag = formatMultiplePlatform(platform[0].split(','));
      return param.name + tag;
    }
  }
  return param.name;
}

function formatMethodDescription(param) {
  let tag = param.description;
  const isMatch = tag.match(/{@platform [a-z ,]*}/);
  if (isMatch) {
    const platform = isMatch[0].match(/ [a-z ,]*/);

    // Replaces @platform strings with empty string
    // and appends type with formatted platform
    tag = tag.replace(/{@platform [a-z ,]*}/g, '');
  }
  return tag;
}

module.exports = {
  formatMethodType,
  formatMethodName,
  formatMethodDescription,
};

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {typeOf} = require('tokenize-comment/lib/utils');
const he = require('he');
const magic = require('./magic');

// Adds multiple platform tags for prop name
function formatMultiplePlatform(platforms) {
  let platformString = '';
  platforms.forEach(platform => {
    switch (platform.trim()) {
      case 'ios':
        platformString += '<div class="label ios">' + 'iOS' + '</div> ';
        break;
      case 'android':
        platformString += '<div class="label android">' + 'Android' + '</div>';
        break;
      case 'tv':
        platformString += '<div class="label tv">' + 'TV' + '</div>';
    }
  });
  return platformString;
}

// Wraps a string in an inline code block in a way that is safe to include in a
// table cell, by wrapping it as HTML <code> if necessary.
function stringToInlineCodeForTable(str) {
  let useHtml = /[`|]/.test(str);
  str = str.replace(/\n/g, ' ');
  if (useHtml) {
    return '<code>' + he.encode(str).replace(/\|/g, '&#124;') + '</code>';
  }
  return '`' + str + '`';
}

function maybeLinkifyType(flowType) {
  let url, text;
  flowType.elements?.forEach(elem => {
    if (Object.hasOwnProperty.call(magic.linkableTypeAliases, elem.name)) {
      ({url, text} = magic.linkableTypeAliases[elem.name]);
    }
  });
  if (!text) {
    text = stringToInlineCodeForTable(
      flowType.raw || formatType(flowType.name)
    );
  }
  if (url) {
    return `[${text}](${url})`;
  }
  return text;
}

function formatType(name) {
  if (name.toLowerCase() === 'boolean') return 'bool';
  if (name.toLowerCase() === 'stringish') return 'string';
  if (name === '$ReadOnlyArray') return 'array';
  return name;
}

function maybeLinkifyTypeName(name) {
  let url, text;
  if (Object.hasOwnProperty.call(magic.linkableTypeAliases, name)) {
    ({url, text} = magic.linkableTypeAliases[name]);
  }
  if (!text) {
    text = stringToInlineCodeForTable(name);
  }
  if (url) {
    return `[${text}](${url})`;
  }
  return text;
}

// Adds proper markdown formatting to component's prop type.
function formatTypeColumn(prop) {
  // Checks for @type pragma comment
  if (prop.rnTags && prop.rnTags.type) {
    let tableRows = '';
    const typeTags = prop.rnTags.type;

    typeTags.forEach(tag => {
      // Checks for @platform pragma in @type string
      const isMatch = tag.match(/{@platform [a-z ,]*}/);
      if (isMatch) {
        // Extracts platforms from matched regex
        const platform = isMatch[0].match(/ [a-z ,]*/);

        // Replaces @platform strings with empty string
        // and appends type with formatted platform
        tag = tag.replace(/{@platform [a-z ,]*}/g, '');
        tag = tag + formatMultiplePlatform(platform[0].split(','));
      }
      tableRows = tableRows + tag + '<hr/>';
    });
    tableRows = tableRows.replace(/<hr\/>$/, '');
    return tableRows;
  }

  // To extract type from prop flowType
  else if (prop.flowType && Object.keys(prop.flowType).length >= 1) {
    let text, url;

    // Handles flowtype name for signatures
    if (prop.flowType.name === 'signature') {
      // Handles flowtype for function signature
      if (prop.flowType.type === 'function') {
        // Extracts EventType from the raw value
        const isMatch = prop.flowType.raw.match(/: [a-zA-Z]*/);
        if (isMatch) {
          // Formats EventType
          const eventType = isMatch[0].substr(2);
          // Checks for aliases in magic and generates md url
          if (
            Object.hasOwnProperty.call(magic.linkableTypeAliases, eventType)
          ) {
            ({url, text} = magic.linkableTypeAliases[eventType]);
            return `${prop.flowType.type}([${text}](${url}))`;
          }
          // TODO: Handling unknown function params
          return `${prop.flowType.type}`;
        } else {
          return prop.flowType.type;
        }
      }
    } else if (prop.flowType.name.includes('$ReadOnlyArray')) {
      prop?.flowType?.elements[0]?.elements &&
        prop?.flowType?.elements[0]?.elements.forEach(elem => {
          if (
            Object.hasOwnProperty.call(magic.linkableTypeAliases, elem.name)
          ) {
            ({url, text} = magic.linkableTypeAliases[elem.name]);
          }
        });
      if (url) return `array of [${text}](${url})`;
    } else if (prop.flowType.name === '$ReadOnly') {
      // Special Case: switch#trackcolor
      let markdown = '';
      if (prop.flowType.elements[0]?.type === 'object') {
        prop?.flowType?.elements[0]?.signature?.properties.forEach(
          ({key, value}) => {
            value?.elements?.forEach(elem => {
              if (
                Object.hasOwnProperty.call(magic.linkableTypeAliases, elem.name)
              ) {
                ({url, text} = magic.linkableTypeAliases[elem.name]);
                markdown += `${key}: [${text}](${url})` + ', ';
              }
            });
          }
        );
        if (markdown.match(/, $/)) markdown = markdown.replace(/, $/, '');
        return `${prop.flowType.elements[0]?.type}: {${markdown}}`;
      }
    } else {
      // Get text and url from magic aliases
      prop?.flowType?.elements?.forEach(elem => {
        if (Object.hasOwnProperty.call(magic.linkableTypeAliases, elem.name)) {
          ({url, text} = magic.linkableTypeAliases[elem.name]);
        }
      });
    }

    // If no text is found, get raw values as text
    if (!text) {
      // TO BE FIXED
      text =
        (prop.flowType.raw && stringToInlineCodeForTable(prop.flowType.raw)) ||
        formatType(prop.flowType.name);
    }

    // If URL is found, return text and link in markdown format
    if (url) {
      return `[${text}](${url})`;
    }

    return text;
  }
}

// Adds proper markdown formatting to component's default value.
function formatDefaultColumn(prop) {
  if (prop?.rnTags?.default) {
    // Parse from @default annotation
    let tableRows = '';
    prop.rnTags.default.forEach(tag => {
      const isMatch = tag.match(/{@platform [a-z]*}/);

      if (isMatch) {
        const platform = isMatch[0].match(/ [a-z]*/);
        tag = tag.replace(/{@platform [a-z]*}/g, '');

        // Checks component for NativeColorValue in default
        let colorBlock = '';
        prop?.flowType?.elements.some(elem => {
          if (elem.name === 'NativeColorValue' && !tag.includes('null')) {
            colorBlock =
              '<ins style="background:' +
              tag.replace(/'/g, '') +
              '" class="color-box"></ins>';
            return true;
          }
        });

        tag =
          (!tag.includes('null') ? '`' + tag + '`' : tag) +
          colorBlock +
          formatMultiplePlatform(platform[0].split(','));
      } else {
        tag = '`' + tag + '`';
      }
      tableRows = tableRows + tag + '<hr/>';
    });
    tableRows = tableRows.replace(/<hr\/>$/, '');
    return {Default: tableRows};
  } else {
    // Parse defaultValue if @default annotation not provided
    return prop?.defaultValue?.value
      ? {Default: stringToInlineCodeForTable(prop?.defaultValue?.value)}
      : '';
  }
}

module.exports = {
  formatMultiplePlatform,
  maybeLinkifyType,
  maybeLinkifyTypeName,
  formatTypeColumn,
  formatDefaultColumn,
};

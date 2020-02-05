/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const he = require('he');
const magic = require('./magic');
const {formatPlatformName} = require('./platforms');

// Formats an array of rows as a Markdown table
function generateTable(rows) {
  const colWidths = new Map();
  for (const row of rows) {
    for (const col of Object.keys(row)) {
      colWidths.set(
        col,
        Math.max(colWidths.get(col) || col.length, String(row[col]).length)
      );
    }
  }
  let header = '|',
    divider = '|';
  for (const [col, width] of colWidths) {
    header += ' ' + col.padEnd(width + 1) + '|';
    divider += ' ' + '-'.repeat(width) + ' ' + '|';
  }

  let result = header + '\n' + divider + '\n';
  for (const row of rows) {
    result += '|';
    for (const [col, width] of colWidths) {
      result += ' ' + String(row[col] || '').padEnd(width + 1) + '|';
    }
    result += '\n';
  }
  return result;
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

// Formats information about a prop
function generateProp(propName, prop) {
  const infoTable = generateTable([
    {
      Type: prop.flowType ? maybeLinkifyType(prop.flowType) : '',
      Required: prop.required ? 'Yes' : 'No',
      ...(prop.rnTags && prop.rnTags.platform
        ? {Platform: formatPlatformName(prop.rnTags.platform)}
        : {}),
    },
  ]);

  return (
    '### `' +
    propName +
    '`' +
    '\n' +
    '\n' +
    (prop.description ? prop.description + '\n\n' : '') +
    infoTable
  );
}

function maybeLinkifyType(flowType) {
  let url, text;
  if (Object.hasOwnProperty.call(magic.linkableTypeAliases, flowType.name)) {
    ({url, text} = magic.linkableTypeAliases[flowType.name]);
  }
  if (!text) {
    text = stringToInlineCodeForTable(flowType.raw || flowType.name);
  }
  if (url) {
    return `[${text}](${url})`;
  }
  return text;
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

// Formats information about props
function generateProps({props, composes}) {
  const title = 'Props';

  return (
    '## ' +
    title +
    '\n' +
    '\n' +
    (composes && composes.length
      ? composes
          .map(parent => 'Inherits ' + maybeLinkifyTypeName(parent) + '.')
          .join('\n\n') + '\n\n'
      : '') +
    Object.keys(props)
      .sort()
      .map(function(propName) {
        return generateProp(propName, props[propName]);
      })
      .join('\n---\n\n')
  );
}

// Generates a Docusaurus header for a component page
function generateHeader({id, title}) {
  return (
    '---' + '\n' + 'id: ' + id + '\n' + 'title: ' + title + '\n' + '---' + '\n'
  );
}

function generateMarkdown({id, title}, reactAPI) {
  const markdownString =
    generateHeader({id, title}) +
    '\n' +
    reactAPI.description +
    '\n\n' +
    '---\n\n' +
    '# Reference\n\n' +
    generateProps(reactAPI);

  return markdownString;
}

module.exports = generateMarkdown;

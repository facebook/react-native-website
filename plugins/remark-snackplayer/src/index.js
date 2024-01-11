/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const visit = require('unist-util-visit-parents');
const fromEntries = require('object.fromentries');

const parseParams = (paramString = '') => {
  const params = fromEntries(new URLSearchParams(paramString));

  if (!params.platform) {
    params.platform = 'web';
  }

  return params;
};

function attr(name, value) {
  return {
    type: 'mdxJsxAttribute',
    name,
    value,
  };
}

async function toJsxNode(node) {
  const params = parseParams(node.meta);

  // Gather necessary Params
  const name = params.name ? decodeURIComponent(params.name) : 'Example';
  const description = params.description
    ? decodeURIComponent(params.description)
    : 'Example usage';
  const ext = params.ext ? decodeURIComponent(params.ext) : 'tsx';
  const filename = `App.${ext}`;
  const files = encodeURIComponent(
    JSON.stringify({
      [filename]: {
        type: 'CODE',
        contents: node.value,
      },
    })
  );
  const dependencies = params.dependencies || '';
  const platform = params.platform || 'web';
  const supportedPlatforms = params.supportedPlatforms || 'ios,android,web';
  const theme = params.theme || 'light';
  const preview = params.preview || 'true';
  const loading = params.loading || 'lazy';

  // Need help constructing this AST node?
  // Use the MDX Playground and explore what your output mdast should look like
  // https://mdxjs.com/playground/
  const jsxNode = {
    type: 'mdxJsxTextElement',
    name: 'div',
    attributes: [
      attr('class', 'snack-player'),
      attr('data-snack-name', name),
      attr('data-snack-description', description),
      attr('data-snack-files', files),
      attr('data-snack-dependencies', dependencies),
      attr('data-snack-platform', platform),
      attr('data-snack-supported-platforms', supportedPlatforms),
      attr('data-snack-theme', theme),
      attr('data-snack-preview', preview),
      attr('data-snack-loading', loading),
      attr('data-snack-device-frame', 'false'),
    ],
    children: [],
  };

  // We "replace" the current node by a JSX node
  Object.keys(node).forEach(key => delete node[key]);
  Object.keys(jsxNode).forEach(key => (node[key] = jsxNode[key]));
}

const SnackPlayer = () => {
  return async tree => {
    const nodesToProcess = [];
    visit(tree, 'code', (node, parent) => {
      if (node.lang === 'SnackPlayer') {
        nodesToProcess.push(toJsxNode(node, parent));
      }
    });
    await Promise.all(nodesToProcess);
  };
};

module.exports = SnackPlayer;

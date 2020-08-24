'use strict';

const hljs = require('highlight.js');
const visit = require('unist-util-visit-parents');
const u = require('unist-builder');

function parseParams(paramString) {
  var params = {};

  if (paramString) {
    var pairs = paramString.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      params[pair[0]] = pair[1];
    }
  }

  if (!params.platform) {
    params.platform = 'web';
  }

  return params;
}

function htmlForCodeBlock(code) {
  return (
    '<pre><code class="hljs css javascript">' +
    hljs.highlight('javascript', code).value +
    '</code></pre>'
  );
}

/**
 * Use the SnackPlayer by including a ```SnackPlayer``` block in markdown.
 *
 * Optionally, include url parameters directly after the block's language.
 * Valid options are name, description, and platform.
 *
 * E.g.
 * ```SnackPlayer platform=android&name=Hello%20world!
 * import React from 'react';
 * import { Text } from 'react-native';
 *
 * export default class App extends React.Component {
 *   render() {
 *     return <Text>Hello World!</Text>;
 *   }
 * }
 * ```
 */
function SnackPlayer() {
  return tree =>
    new Promise(async (resolve, reject) => {
      const nodesToChange = [];
      // Parse all CodeBlocks
      visit(tree, 'code', (node, parent) => {
        //Add SnackPlayer CodeBlocks to processing queue
        if (node.lang == 'SnackPlayer') {
          nodesToChange.push({
            node,
            parent,
          });
        }
      });
      for (const {node, parent} of nodesToChange) {
        try {
          let params = parseParams(node.meta);

          // Gather necessary Params
          const name = params.name
            ? decodeURIComponent(params.name)
            : 'Example';
          const description = params.description
            ? decodeURIComponent(params.description)
            : 'Example usage';
          const sampleCode = node.value;
          const encodedSampleCode = encodeURIComponent(sampleCode);
          const platform = params.platform ? params.platform : 'ios';
          const supportedPlatforms = params.supportedPlatforms
            ? params.supportedPlatforms
            : 'ios,android,web';

          // Generate Node for SnackPlayer
          const snackPlayerDiv = u('html', {
            value: `<div class="snack-player">
                          <div class="mobile-friendly-snack" style="display: none">
                          ${htmlForCodeBlock(sampleCode)}</div>
                          <div class="desktop-friendly-snack" style="margin-top: 15px; margin-bottom: 15px">
                          <div
                            data-snack-name="${name}"
                            data-snack-description="${description}"
                            data-snack-code="${encodedSampleCode}"
                            data-snack-platform="${platform}"
                            data-snack-supported-platforms=${supportedPlatforms}
                            data-snack-preview="true"
                            style="
                              overflow: hidden;
                              background: #fafafa;
                              border: 1px solid rgba(0,0,0,.16);
                              border-radius: 4px;
                              height: 514px;
                              width: 100%;
                            "
                          >
                          </div>
                          </div>
                          </div>`,
          });

          // Replace code block with SnackPlayer Node
          const index = parent[0].children.indexOf(node);
          parent[0].children.splice(index, 1, snackPlayerDiv);
        } catch (e) {
          return reject(e);
        }
      }

      resolve();
    });
}

function ReactNativeWebPlayer() {
  return function transformer(tree, file) {};
}

module.exports = {ReactNativeWebPlayer, SnackPlayer};

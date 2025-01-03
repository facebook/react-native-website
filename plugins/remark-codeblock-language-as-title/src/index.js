/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function languageAsTitleRemarkPlugin() {
  /**
   * @param {import('mdast').Root} root - The root node of the Markdown AST
   * @returns {Promise<void>}
   */
  return async root => {
    const {visit} = await import('unist-util-visit');
    visit(root, 'code', node => {
      if (node.lang) {
        if (node.meta) {
          if (node.meta.includes('title=')) {
            return;
          }
          node.meta = `title="${node.lang}" ${node.meta}`;
        } else {
          node.meta = `title="${node.lang}"`;
        }
      }
    });
  };
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {glob} from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';

const imageReferenceRegExp = new RegExp(/!\[.*?\]\((.*)\)/g);

async function main() {
  const assets: {imagePath: string; markdownPath: string}[] = [];
  const missingAssets = [];
  const queue = [];

  const files = await glob('../docs/**/*.md', {});

  for (const file of files) {
    const entry = (async () => {
      const buffer = await fs.readFile(file);
      const contents = buffer.toString('utf-8');
      let match;
      while ((match = imageReferenceRegExp.exec(contents))) {
        const rawPath = match[1].replace(/^\//, '');
        const imagePath = path.join('./', rawPath);
        assets.push({imagePath, markdownPath: file});
      }
    })();
    queue.push(entry);
  }

  await Promise.all(queue);

  for (const {imagePath, markdownPath} of assets) {
    try {
      await fs.stat(
        path.join(import.meta.dirname, '../website/static', imagePath)
      );
    } catch {
      missingAssets.push({imagePath, markdownPath});
    }
  }

  if (missingAssets.length > 0) {
    console.error('Found missing assets!');
    missingAssets.forEach(({imagePath, markdownPath}) => {
      console.error(
        `Could not find static/${imagePath} which has at least one ` +
          `reference in ${markdownPath}. ` +
          `Did you forget to add the asset to '/website/static/docs/assets'?`
      );
    });
  }
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

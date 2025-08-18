/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';

import siteConfig from './docusaurus.config.js';

const imageReferenceRegExp = new RegExp(/!\[.*?\]\((.*)\)/g);

const missingAssets = [];
let queue = Promise.resolve();

glob
  .glob('./docs/**/*.md')
  .then(files => {
    files.forEach(file => {
      queue = queue
        .then(() => {
          return fs.readFile(file);
        })
        .then(contents => {
          let matches;
          while ((matches = imageReferenceRegExp.exec(contents))) {
            const pathToFile = path.join(
              './',
              matches[1].replace(siteConfig.baseUrl, '')
            );
            missingAssets.push({imagePath: pathToFile, markdownPath: file});
          }
        });
    });
    return queue;
  })
  .then(() => {
    queue = Promise.resolve();
    missingAssets.forEach(missingAsset => {
      const {imagePath, markdownPath} = missingAsset;
      queue = queue
        .then(() => {
          return fs.stat('./static/' + imagePath);
        })
        .catch(() => {
          console.error(
            'Could not find ' +
              'static/' +
              imagePath +
              ' which has at least one reference in ' +
              markdownPath +
              ". Did you forget to add the asset to '/static/docs/assets'?"
          );
        });
    });
    return queue;
  });

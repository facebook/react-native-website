/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const glob = require('glob-promise');
const path = require('path');
const fs = require('fs-extra');

// quick fix for GH pages trailing slash issues
// /myDoc/index.html => /myDoc.html
async function generateSimpleHtmlFiles(outDir) {
  console.log('generateSimpleHtmlFiles', outDir);

  const pattern = path.join(outDir, '/**/index.html');
  // console.log('pattern', pattern);

  const filePaths = (await glob(pattern)).filter(filePath => {
    return filePath !== path.join(outDir, '/index.html');
  });

  // console.log('filePaths', filePaths);

  await Promise.all(
    filePaths.map(async filePath => {
      if ((await fs.stat(filePath)).isDirectory()) {
        return;
      }
      // console.log(file);
      const filePathCopy = `${path.dirname(filePath)}.html`;
      if (await fs.pathExists(filePathCopy)) {
        // console.log(`Skipping ${filePathCopy}`);
      } else {
        await fs.copyFile(filePath, filePathCopy);
        // console.log(`Created ${filePathCopy}`);
      }
    })
  );
}

module.exports = function() {
  console.log('site plugin');
  return {
    plugin: 'site-plugin',
    async postBuild(props) {
      await generateSimpleHtmlFiles(props.outDir);
    },
  };
};

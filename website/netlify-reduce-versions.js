/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * During the build process, we build a complete website for each version
 * which is 9.2 MB / version.
 *
 * On Netlify, our deploy preview infrastructure, we have to upload every
 * changed file. Each time we cut a new version or making multiple changes
 * we're facing timeout errors from Netlify trying to upload megabytes of HTML
 * file.
 *
 * This script makes sure we're not deploying unnecessary versions on Netlify.
 *
 * We only need 0.5 which is the first draft of each doc, and the recent ones.
 */

const fs = require('fs-extra');
const versions = require('./versions.json');

const filterWantedVersions = version =>
  +version === 0.5 ||
  ((version.length > 3 && +version >= 0.56) ||
    +version === 0.46 ||
    version === '0.50');

fs.writeFileSync(
  './versions.json',
  JSON.stringify(versions.filter(filterWantedVersions))
);

fs.readdirSync('./versioned_docs').map(directory => {
  if (!filterWantedVersions(directory.replace('version-', ''))) {
    fs.removeSync(`./versioned_docs/${directory}`);
  }
});

fs.readdirSync('./versioned_sidebars').map(directory => {
  const match = /version-(\d.\d\d?)-sidebars.json/g.exec(directory);

  if (match && !filterWantedVersions(match[1])) {
    fs.removeSync(`./versioned_sidebars/${directory}`);
  }
});

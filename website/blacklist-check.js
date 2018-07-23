/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Docusaurus provides us with an easy way to keep snapshots of the docs for each version of React Native. As a result, people can go back and see what a View component looked like in any past React Native release.
 *
 * This is less relevant for "evergreen" content such as the Getting Started guide, the Tutorial, and basically the rest of the Guides. These docs should be getting updated across all versions at the same time. This script makes sure we are not tracking separate versions of a unversioned doc.
 */
const glob = require("glob-promise");
const fm = require("front-matter");
const fs = require("fs-extra");
const Promise = require("bluebird");

const blacklist = require("./versionedDocsBlacklist.json");

let blacklistedAssetsFound = [];
let queue = Promise.resolve();
glob("versioned_docs/**/*.md")
  .then(files => {
    files.forEach(file => {
      queue = queue
        .then(() => {
          return fs.readFile(file, "utf8");
        })
        .then(data => {
          const frontmatter = fm(data);
          const id = frontmatter.attributes.original_id;
          const re = /\/version-(.+)\//;
          const version = file.match(re)[1];
          if (version !== "0.5" && blacklist.includes(id)) {
            blacklistedAssetsFound.push({ id, file, version });
          }
        });
    });
    return queue;
  })
  .then(() => {
    const foundBlacklistedFiles = blacklistedAssetsFound.length > 0;
    if (foundBlacklistedFiles) {
      console.log("The following guides should not be versioned:");
    }
    blacklistedAssetsFound.forEach(asset => {
      const { id, version, file } = asset;
      console.log("[version-" + version + "]: " + id);
    });
    if (foundBlacklistedFiles) {
      console.log(
        "This can be rectified by moving the following files to `versioned_docs/version-0.5`:"
      );
    }
    blacklistedAssetsFound.forEach(asset => {
      const { id, version, file } = asset;
      console.log(file);
    });
    if (foundBlacklistedFiles) {
      process.exit(1);
    }
  });

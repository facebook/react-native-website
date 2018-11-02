/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Docusaurus provides us with an easy way to keep snapshots of the docs for
 * each version of React Native. As a result, people can go back and see what a
 * View component looked like in any past React Native release.
 *
 * This is less relevant for "evergreen" content such as the Getting Started
 * guide, the Tutorial, and basically the rest of the Guides. These docs should
 * be getting updated across all versions at the same time. This script makes
 * sure we are not tracking separate versions of a unversioned doc.
 *
 * We achieve this by ensuring any changes made to these files in `docs/` are
 * then persisted to the `versioned_docs/version-0.5` folder, as Version 0.5
 * is the oldest document version. This makes it so that the same text is
 * displayed to the reader, regardless of what version they are looking at.
 */
const glob = require("glob-promise");
const fm = require("front-matter");
const fs = require("fs-extra");
const Promise = require("bluebird");

const blacklist = require("./versionedDocsBlacklist.json");
const versions = require("./versions.json");
if (versions.length === 0) {
  throw "No versions found.";
}

const replaceVersionWithAsset = opts => {
  const { version, asset } = opts;
  const { id, file } = asset;

  const pathToDocVersion =
    "versioned_docs/version-" + version + "/" + id + ".md";
  const idForDocVersion = "version-" + version + "-" + id;

  const data = fs.readFileSync(`../docs/${id}.md`, "utf8");
  const frontmatter = fm(data);
  const title = frontmatter.attributes.title;
  const body = frontmatter.body;

  const newData = `---
id: ${idForDocVersion}
title: ${title}
original_id: ${id}
---
${body}
`;

  fs.writeFileSync(pathToDocVersion, newData);
  fs.removeSync(file);
};

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
      console.log("Rectifying...");
    }
    const oldestVersion = versions[versions.length - 1];
    blacklistedAssetsFound.forEach(asset => {
      replaceVersionWithAsset({
        version: oldestVersion,
        asset
      });
    });
  });

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
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
const glob = require('glob');
const fm = require('front-matter');
const fs = require('fs-extra');

const pathToDocs = '../docs';
const pathToVersionedDocs = './versioned_docs';
const blacklist = require('./versionedDocsBlacklist.json');
const versions = require('./versions.json');
if (versions.length === 0) {
  throw 'No versions found.';
}
const oldestVersion = versions[versions.length - 1];

const updateVersionWithAsset = opts => {
  const {version, asset} = opts;
  const {id} = asset;

  const pathToDocVersion = `${pathToVersionedDocs}/version-${version}/${id}.md`;
  const idForDocVersion = `version-${version}-${id}`;

  const data = fs.readFileSync(`${pathToDocs}/${id}.md`, 'utf8');
  const frontmatter = fm(data);
  const title = frontmatter.attributes.title;
  const body = frontmatter.body;

  const newData = `---
id: ${idForDocVersion}
title: ${title}
original_id: ${id}
---
${body}`;

  fs.writeFileSync(pathToDocVersion, newData);
};

const globAsync = (pattern, options) =>
  new Promise((resolve, reject) => {
    glob(pattern, options, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });

const getBlacklistedAssetsInVersionedDocs = async () => {
  let blacklistedAssetsFound = [];
  const files = await globAsync(`${pathToVersionedDocs}/**/*.md`);
  files.forEach(file => {
    const data = fs.readFileSync(file, 'utf8');
    const frontmatter = fm(data);
    const id = frontmatter.attributes.original_id;
    const re = /\/version-(.+)\//;
    const version = file.match(re)[1];
    if (version !== oldestVersion && blacklist.includes(id)) {
      blacklistedAssetsFound.push({id, file, version});
    }
  });

  return blacklistedAssetsFound;
};

const getOriginalUnversionedAssets = async () => {
  let assets = [];
  const files = await globAsync(`${pathToDocs}/*.md`);
  files.forEach(file => {
    const data = fs.readFileSync(file, 'utf8');
    const frontmatter = fm(data);
    const {id} = frontmatter.attributes;
    if (blacklist.includes(id)) {
      assets.push({id, file});
    }
  });

  return assets;
};

const syncGuides = async () => {
  // delete unversioned docs that creep into `website/versioned_docs`...
  const blacklistedAssetsFound = await getBlacklistedAssetsInVersionedDocs();
  blacklistedAssetsFound.forEach(asset => {
    fs.removeSync(asset.file);
  });

  // ...then update the oldest version with whatever is in `docs/` master
  const originalAssets = await getOriginalUnversionedAssets();
  originalAssets.forEach(asset => {
    updateVersionWithAsset({
      version: oldestVersion,
      asset,
    });
  });
};

syncGuides();

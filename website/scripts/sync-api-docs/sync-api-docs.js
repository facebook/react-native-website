/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ***** EXPERIMENTAL *****
// Updates the API docs from the React Native source code.

'use strict';

const process = require('process');
const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');

const preprocessGeneratedApiDocs = require('./preprocessGeneratedApiDocs');
const generateMarkdown = require('./generateMarkdown');
const titleToId = require('./titleToId');

const DOCS_ROOT_DIR = path.resolve(__dirname, '..', '..', '..', 'docs');

const API_DOCS_ARTIFACT_URL =
  'https://raw.githubusercontent.com/facebook/react-native/master/docs/generatedComponentApiDocs.js';
const API_DOCS_ARTIFACT_LOCAL_PATH = path.join(
  __dirname,
  'generatedComponentApiDocs.js'
);

async function downloadApiDocs(urlOrPath) {
  if (await fs.exists(urlOrPath)) {
    await fs.copyFile(urlOrPath, API_DOCS_ARTIFACT_LOCAL_PATH);
    return;
  }
  const res = await fetch(API_DOCS_ARTIFACT_URL);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const apiDocsJs = await res.text();
  await fs.writeFile(API_DOCS_ARTIFACT_LOCAL_PATH, apiDocsJs, 'utf8');
}

async function generateApiDocs() {
  const apiDocs = require(API_DOCS_ARTIFACT_LOCAL_PATH);
  preprocessGeneratedApiDocs(apiDocs);
  await Promise.all(
    apiDocs.map(async (page, pageIndex) => {
      if (!page.displayName) {
        console.log(
          'react-docgen data at index ' +
            pageIndex +
            ' was malformed, skipping.'
        );
        return;
      }
      const id = titleToId(page.displayName);
      const pageMarkdown = generateMarkdown(
        {title: page.displayName, id: id},
        page
      );
      const outFile = path.join(DOCS_ROOT_DIR, id + '.md');
      console.log('Generated ' + outFile);
      await fs.writeFile(outFile, pageMarkdown, 'utf8');
    })
  );
}

async function syncApiDocs(urlOrPath) {
  await downloadApiDocs(urlOrPath || API_DOCS_ARTIFACT_URL);
  await generateApiDocs();
}

async function main(args) {
  await syncApiDocs(args[0]);
}

main(process.argv.slice(2));

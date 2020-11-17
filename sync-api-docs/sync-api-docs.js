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
const fs = require('fs-extra');
const path = require('path');

const extractDocsFromRN = require('./extractDocsFromRN');
const preprocessGeneratedApiDocs = require('./preprocessGeneratedApiDocs');
const generateMarkdown = require('./generateMarkdown');
const {titleToId} = require('./utils');

const DOCS_ROOT_DIR = path.resolve(__dirname, '..', 'docs');

async function generateApiDocs(rnPath) {
  const apiDocs = await extractDocsFromRN(rnPath);
  preprocessGeneratedApiDocs(apiDocs);
  await Promise.all(
    apiDocs.map(async ({component, file}, index) => {
      if (!component.displayName) {
        console.log(
          `react-docgen data for ${path.basename(file)} was malformed, skipping`
        );
        return;
      }
      const id = titleToId(component.displayName);
      const componentMarkdown = generateMarkdown(
        {title: component.displayName, id: id},
        component
      );
      const outFile = path.join(DOCS_ROOT_DIR, id + '.md');
      console.log('Generated ' + outFile);
      await fs.writeFile(outFile, componentMarkdown, 'utf8');
    })
  );
}

async function main(args) {
  await generateApiDocs(args[0]);
}

main(process.argv.slice(2));

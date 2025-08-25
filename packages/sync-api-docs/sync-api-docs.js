/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ***** EXPERIMENTAL *****
// Updates the API docs from the React Native source code.

import fs from 'node:fs/promises';
import process from 'node:process';
import path from 'node:path';

import extractDocsFromRN from './extractDocsFromRN.js';
import preprocessGeneratedApiDocs from './preprocessGeneratedApiDocs.js';
import generateMarkdown from './generateMarkdown.js';
import {titleToId} from './utils.js';

const DOCS_ROOT_DIR = path.resolve(import.meta.dirname, '..', '..', 'docs');

async function generateApiDocs(rnPath) {
  const apiDocs = await extractDocsFromRN(rnPath);
  preprocessGeneratedApiDocs(apiDocs);
  await Promise.all(
    apiDocs.map(async ({component, file}) => {
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

main(process.argv.slice(2)).catch(error => {
  console.error(error);
});

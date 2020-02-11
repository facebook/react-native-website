/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const reactDocs = require('@motiz88/react-native-docgen');

const GENERATE_ANNOTATION = '@' + 'generate-docs';

module.exports = extractDocsFromRN;

async function extractDocsFromRN(rnRoot) {
  // TODO: make implementation async

  const allComponentFiles = glob.sync(
    path.join(rnRoot, '/Libraries/{Components,Image,}/**/*.js'),
    {
      nodir: true,
    }
  );

  const docs = [];

  for (const file of allComponentFiles) {
    const contents = fs.readFileSync(file, {encoding: 'utf-8'});
    if (!contents.includes(GENERATE_ANNOTATION)) {
      continue;
    }

    console.log(file);

    const result = reactDocs.parse(
      contents,
      reactDocs.resolver.findExportedComponentDefinition,
      reactDocs.defaultHandlers
    );

    docs.push({
      file,
      component: cleanComponentResult(result),
    });
  }

  // Make sure output is JSON-safe
  return JSON.parse(JSON.stringify(docs));
}

function cleanComponentResult(component) {
  return {
    ...component,
    methods: component.methods.filter(method => !method.name.startsWith('_')),
  };
}

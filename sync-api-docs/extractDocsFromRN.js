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
      absolute: true,
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
      reactDocs.resolver.findAllComponentDefinitions,
      reactDocs.defaultHandlers.filter(
        handler => handler !== reactDocs.handlers.propTypeCompositionHandler
      ),
      {filename: file}
    );

    const filteredResult = result.filter(item => {
      if (item.description) return item;
    });

    docs.push({
      file,
      component: cleanComponentResult(...filteredResult),
    });
  }

  // Make sure output is JSON-safe
  const docsSerialized = JSON.parse(JSON.stringify(docs));
  await fs.writeFile(
    path.join(__dirname, 'extracted.json'),
    JSON.stringify(docsSerialized, null, 2),
    'utf8'
  );
  return docsSerialized;
}

function cleanComponentResult(component) {
  return {
    ...component,
    methods: component.methods.filter(method => !method.name.startsWith('_')),
  };
}

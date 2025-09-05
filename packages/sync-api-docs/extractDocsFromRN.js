/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import fs from 'node:fs/promises';
import {glob} from 'glob';
import path from 'node:path';
import reactDocs from '@motiz88/react-native-docgen';

const GENERATE_ANNOTATION = '@' + 'generate-docs';

export default async function extractDocsFromRN(rnRoot) {
  const allComponentFiles = await glob.glob(
    path.join(rnRoot, '/Libraries/{Components,Image,}/**/*.js'),
    {
      nodir: true,
      absolute: true,
    }
  );

  const docs = [];

  for (const file of allComponentFiles) {
    const contents = await fs.readFile(file, {encoding: 'utf-8'});
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
    path.join(import.meta.dirname, 'extracted.json'),
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

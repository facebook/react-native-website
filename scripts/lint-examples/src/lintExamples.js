/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const {execSync} = require('child_process');
const {promises: fs} = require('fs');
const path = require('path');
const glob = require('glob-promise');

/**
 * The root document to search for documents
 */
const documentsRoot = path.join(__dirname, '..', '..', '..', 'docs');

/**
 * The directory to output generated files to
 */
const outputRoot = path.join(__dirname, '..', 'out');

/**
 * Process arguments to be forwarded to the linter
 */
const processArgs = process.argv.slice(2);

/**
 * Valid extensions for snack examples
 */
const validExtensions = ['js', 'tsx'];

/**
 * Extracts snack examples based on extension to output files, then runs an
 * arbitrary linter command over them, optionally writing back updates to the
 * file made by the linter. Commands passed to node are passed to the
 * underlying command.
 *
 * @param opts.command an npx command to run as the linter tool
 * @param opts.args extra arguments to be passed to the linter
 * @param opts.extension extension to treat the example as if it does not specify one
 * @param opts.writeBack whether to update examples with mutations made by the linter
 */
async function lintExamples({command, args, extension, writeBack}) {
  if (!validExtensions.includes(extension)) {
    console.error(
      `Invalid extension "${extension}" (should be one of ${JSON.stringify(
        validExtensions,
      )})`,
    );
    process.exit(1);
  }

  try {
    const mappings = await extractExamples(extension ?? 'js');
    process.exitCode = await runLinter(command, args ?? []);

    if (writeBack) {
      await updateDocuments(mappings);
    }
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
}

/**
 * Extracts all Snack player code examples inline in markdown into a unique
 * file per example. Returns a mapping from output files back to the original
 * markdown.
 *
 * @param extension extension to treat the example as if it does not specify
 */
async function extractExamples(extension) {
  const documents = await glob('**/*.md', {
    cwd: documentsRoot,
    absolute: true,
  });
  const mappings = [];

  await fs.mkdir(outputRoot, {recursive: true});
  await fs.rm(outputRoot, {recursive: true});

  await Promise.all(
    documents.map(async doc => {
      mappings.push(...(await extractExamplesFromDocument(doc, extension)));
    }),
  );

  return mappings;
}

/**
 * Extracts snack player examples from a given markdown file. Returns a mapping
 * from output files back to the original markdown.
 *
 * @param filename absolute filename of the documents root
 * @param extension extension to treat the example as if it does not specify
 */
async function extractExamplesFromDocument(filename, extension) {
  const fileContents = await fs.readFile(filename, {
    encoding: 'utf-8',
  });
  const snackRegex = /(```SnackPlayer(.*)\r?\n)((((?!```).)*\r?\n)+)```/g;
  const matches = [...fileContents.matchAll(snackRegex)];

  let matchIndex = 0;
  const mappings = await Promise.all(
    matches.map(async match => {
      const contentOffset = match.index + match[1].length;
      const snackParams = new URLSearchParams(match[2].trim());
      const exampleName = snackParams.get('name');
      const exampleExt = snackParams.get('ext');
      const disableLinting = snackParams.get('disableLinting');
      const content = match[3];

      if (disableLinting === 'true') {
        return [];
      }

      const baseFileName = path.relative(documentsRoot, filename);
      const outFile = path.join(
        outputRoot,
        `${baseFileName}-${++matchIndex}${
          exampleName ? '-' + exampleName : ''
        }.${extension}`,
      );

      if (exampleExt) {
        if (!validExtensions.includes(exampleExt)) {
          console.error(
            `Invalid extension "${exampleExt}" encountered while parsing ${filename} (should be one of ${JSON.stringify(
              validExtensions,
            )})`,
          );
          process.exit(1);
        }

        if (exampleExt !== extension) {
          return [];
        }
      }

      await fs.mkdir(path.dirname(outFile), {recursive: true});
      await fs.writeFile(outFile, content);

      return [
        {
          documentPath: filename,
          examplePath: outFile,
          offset: contentOffset,
          length: content.length,
        },
      ];
    }),
  );

  return mappings.flat();
}

/**
 * Runs the given npx command over the set of extracted documents, returning
 * the exit code
 *
 * @param command an npx command to run as the linter tool
 * @param args extra arguments to be passed to the linter
 */
async function runLinter(command, args) {
  const combinedArgs = [...processArgs, ...args];

  try {
    execSync(`npx ${command} ${combinedArgs.join(' ')}`, {
      cwd: outputRoot,
      stdio: 'inherit',
    });

    return 0;
  } catch (ex) {
    return ex.status;
  }
}

/**
 * Updates in-document examples to match the newly linted example files
 *
 * @param mappings file mappings generated by extractExamples()
 */
async function updateDocuments(mappings) {
  const mappingsByDocument = {};
  for (const mapping of mappings) {
    if (mappingsByDocument[mapping.documentPath] === undefined) {
      mappingsByDocument[mapping.documentPath] = [];
    }
    mappingsByDocument[mapping.documentPath].push(mapping);
  }

  const documents = Object.keys(mappingsByDocument);
  await Promise.all(
    documents.map(async doc => {
      const documentMappings = mappingsByDocument[doc];
      documentMappings.sort((m1, m2) => m2.offset - m1.offset);

      const origDocumentContents = await fs.readFile(doc, {
        encoding: 'utf-8',
      });
      let newDocumentContents = origDocumentContents;
      for (const mapping of documentMappings) {
        const exampleContents = await fs.readFile(mapping.examplePath, {
          encoding: 'utf-8',
        });
        newDocumentContents =
          newDocumentContents.substring(0, mapping.offset) +
          exampleContents +
          newDocumentContents.substring(mapping.offset + mapping.length);
      }

      if (newDocumentContents !== origDocumentContents) {
        await fs.writeFile(doc, newDocumentContents);
      }
    }),
  );
}

module.exports = lintExamples;

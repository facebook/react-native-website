/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'node:assert';
import fs from 'node:fs';

if (process.argv.length < 4) {
  console.log(
    `Usage: update-redirect <path to _redirects> <path to versions.json>`
  );
  process.exit(1);
}

const [redirects, versions] = process.argv.slice(2);
assert.match(
  redirects,
  /_redirects$/,
  'Expects _redirects path as 2nd argument'
);
assert.match(
  versions,
  /versions.json$/,
  'Expects versions.json path as 3nd argument'
);

const latestPublicVersion = JSON.parse(fs.readFileSync(versions, 'utf8'))[0];
const VERSION_KEY = '$LATEST_VERSION$';

const before = fs.readFileSync(redirects, 'utf8');

if (!before.includes(VERSION_KEY)) {
  console.warn(
    `yarn run update-redirect is expecting to find ${VERSION_KEY} in '${redirects}

This is a problem because any direct linking to ${latestPublicVersion} must be redirected:
- from: https://reactnative.dev/docs/${latestPublicVersion}/...
- to:   https://reactnative.dev/docs/...

Someone must have committed the _redirects after build.`
  );
  process.exit(1);
}

fs.writeFileSync(redirects, before.replace(VERSION_KEY, latestPublicVersion));
console.log(
  `Successfully added direct for /docs/${latestPublicVersion}/* -> /docs/*`
);

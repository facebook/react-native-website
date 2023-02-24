/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import assert from 'node:assert';
import {URL} from 'node:url';
import {lintRule} from 'unified-lint-rule';
import {visit} from 'unist-util-visit';
import {fetch} from './lib.js';

// Forked from: https://github.com/davidtheclark/remark-lint-no-dead-urls

const linkCache = new Map();

const HTTP = {
  OK: 200,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
};

const uri = {
  isLocalhost: url => /^(https?:\/\/)(localhost|127\.0\.0\.1)(:\d+)?/.test(url),
  isExternal: url => /(https?:\/\/)/.test(url),
  isPath: url => /^\/.*/.test(url),
};

async function cacheFetch(urlOrPath, method, options) {
  if (linkCache.has(urlOrPath)) {
    return [urlOrPath, linkCache.get(urlOrPath)];
  }

  const {baseUrl, ...other} = options;
  const url = new URL(urlOrPath, baseUrl).toString();

  const code = await fetch(url, method, other);

  linkCache.set(urlOrPath, code);
  return [urlOrPath, code];
}

async function naiveLinkCheck(urls, options) {
  return Promise.allSettled(
    urls.map(async url => {
      try {
        return await cacheFetch(url, 'HEAD', options);
      } catch (e) {
        try {
          // Fallback, some endpoints don't support HEAD requests
          return await cacheFetch(url, 'GET', options);
        } catch (e) {
          if (e.code === 'ERR_GOT_REQUEST_ERROR') {
            throw e;
          }
          const code = e.statusCode ?? e?.response?.statusCode ?? e.code;
          linkCache.set(url, code);
          return [url, code];
        }
      }
    })
  );
}

async function noDeadUrls(ast, file, options = {}) {
  const urlToNodes = new Map();

  const {skipUrlPatterns, ...clientOptions} = options;

  // Grab all possible urls from the markdown
  visit(ast, ['link', 'image', 'definition'], node => {
    const {url} = node;
    if (
      !url ||
      uri.isLocalhost(url) ||
      skipUrlPatterns?.some(skipPattern => new RegExp(skipPattern).test(url))
    ) {
      return;
    }

    // It only makes sense to consider paths when we know the base url. This is useful for images, or cross
    // references. There might be false positives when adding new pages that aren't already live.
    const isGoodRelativePath = clientOptions.baseUrl && uri.isPath(url);
    const isExternalURL = uri.isExternal(url);
    if (!isExternalURL && !isGoodRelativePath) {
      return;
    }

    if (!urlToNodes.has(url)) {
      urlToNodes.set(url, []);
    }

    urlToNodes.get(url).push(node);
  });

  const results = await naiveLinkCheck([...urlToNodes.keys()], clientOptions);

  for (const {value, ...other} of results) {
    const [url, statusCode] = value;
    const nodes = urlToNodes.get(url) ?? [];

    if (statusCode === HTTP.OK) {
      continue;
    }

    for (const node of nodes) {
      switch (statusCode) {
        case 'ENOTFOUND':
          file.message(`Link to ${url} is broken, domain not found`, node);
          break;
        case HTTP.TOO_MANY_REQUESTS:
          file.message(`Link to ${url} is being rate limited`, node);
          break;
        case HTTP.NOT_FOUND:
        default:
          file.message(`Link to ${url} is broken`, node);
          break;
      }
    }
  }
}

export default lintRule('remark-lint:no-broken-external-links', noDeadUrls);

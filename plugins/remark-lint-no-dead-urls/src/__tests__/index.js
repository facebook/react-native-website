/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import remark from 'remark';
import dedent from 'dedent';
import {jest} from '@jest/globals';

jest.unstable_mockModule('../lib.js', () => ({
  fetch: jest.fn(),
}));

const {fetch} = await import('../lib.js');
const plugin = (await import('../')).default;

const processMarkdown = (md, opts) => {
  return remark().use(plugin, opts).process(md);
};

describe('remark-lint-no-dead-urls', () => {
  beforeEach(() => fetch.mockReset());

  test('works with no URLs', () => {
    const lint = processMarkdown(dedent`
      # Title

      No URLs in here.
    `);

    return lint.then(vFile => {
      expect(fetch).toHaveBeenCalledTimes(0);
      expect(vFile.messages.length).toBe(0);
    });
  });

  test('works a good, bad a local link', () => {
    fetch.mockReturnValueOnce(200).mockReturnValueOnce(404);

    const lint = processMarkdown(
      dedent`
      # Title

      Here is a [good link](https://www.github.com).

      Here is a [bad link](https://github.com/unified/oops).

      Here is a [local link](http://localhost:3000).
    `
    );

    return lint.then(vFile => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(vFile.messages.length).toBe(1);
      expect(vFile.messages[0].reason).toBe(
        'Link to https://github.com/unified/oops is broken'
      );
    });
  }, 15000);

  test('works with definitions and images', () => {
    fetch.mockReturnValueOnce(200).mockReturnValueOnce(404);

    const lint = processMarkdown(
      dedent`
      # Title

      Here is a good pig: ![picture of pig](/pig-photos/384).

      Download the pig picture [here](/pig-photos/384).

      Here is a [bad link]. Here is that [bad link] again.

      [bad link]: /oops/broken
    `,
      {
        baseUrl: 'http://my.domain.com',
      }
    );

    return lint.then(vFile => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(vFile.messages.length).toBe(1);
      expect(vFile.messages[0].reason).toBe('Link to /oops/broken is broken');
    });
  });

  test('skips URLs with unsupported protocols', () => {
    const lint = processMarkdown(dedent`
      [Send me an email.](mailto:me@me.com)
      [Look at this file.](ftp://path/to/file.txt)
      [Special schema.](flopper://a/b/c)
    `);

    return lint.then(vFile => {
      expect(fetch).toHaveBeenCalledTimes(0);
      expect(vFile.messages.length).toBe(0);
    });
  });

  test('localhost', () => {
    const lint = processMarkdown(
      dedent`
        - [http://localhost](http://localhost)
        - [http://localhost/alex/test](http://localhost/alex/test)
        - [http://localhost:3000](http://localhost:3000)
        - [http://localhost:3000/alex/test](http://localhost:3000/alex/test)
        - [https://localhost](http://localhost)
        - [https://localhost/alex/test](http://localhost/alex/test)
        - [https://localhost:3000](http://localhost:3000)
        - [https://localhost:3000/alex/test](http://localhost:3000/alex/test)
      `
    );

    return lint.then(vFile => {
      expect(vFile.messages.length).toBe(0);
    });
  });

  test('local IP 127.0.0.1', () => {
    const lint = processMarkdown(
      dedent`
        - [http://127.0.0.1](http://127.0.0.1)
        - [http://127.0.0.1:3000](http://127.0.0.1:3000)
        - [http://127.0.0.1/alex/test](http://127.0.0.1)
        - [http://127.0.0.1:3000/alex/test](http://127.0.0.1:3000)
        - [https://127.0.0.1](http://127.0.0.1)
        - [https://127.0.0.1:3000](http://127.0.0.1:3000)
        - [https://127.0.0.1/alex/test](http://127.0.0.1)
        - [https://127.0.0.1:3000/alex/test](http://127.0.0.1:3000)
      `
    );

    return lint.then(vFile => {
      expect(vFile.messages.length).toBe(0);
    });
  });

  test.each([
    '[Ignore this](http://www.url-to-ignore.com)',
    '[Ignore this](http://www.url-to-ignore.com/somePath)',
    '[Ignore this](http://www.url-to-ignore.com/somePath?withQuery=wow)',
    '[its complicated](http://url-to-ignore.com/somePath/maybe)',
  ])('skipUrlPatterns for content: %s', markdownContent => {
    const lint = processMarkdown(markdownContent, {
      skipUrlPatterns: [/^http:\/\/(.*)url-to-ignore\.com/],
    });

    return lint.then(vFile => {
      expect(vFile.messages.length).toBe(0);
    });
  });
});

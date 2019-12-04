'use strict';

const hljs = require('highlight.js');
const {utils} = require('remarkable');
const {escapeHtml} = utils;

// Remove leading "SnackPlayer", "ReactNativeWebPlayer"
function cleanParams(params) {
  if (params && params.split(' ').length > 0) {
    return params.split(' ')[1];
  }

  return null;
}

function parseParams(paramString) {
  var params = {};

  if (paramString) {
    var pairs = paramString.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      params[pair[0]] = pair[1];
    }
  }

  if (!params.platform) {
    params.platform = 'web';
  }

  return params;
}

function htmlForCodeBlock(code) {
  return (
    '<pre><code class="hljs css javascript">' +
    hljs.highlight('javascript', code).value +
    '</code></pre>'
  );
}

/**
 * Expo SDKs lag stable React Native versions by a week or two.
 * This mapping informs the SnackPlayer which version of Expo whenever
 * a React Native version param is passed. There's no harm in keeping this
 * list up to date, but in practical terms you will only need to do so
 * whenever an example that uses the SnackPlayer is updated with code
 * that requires a newer Expo SDK release.
 */
const LatestSDKVersion = '26.0.0';
/**
 * Use the SnackPlayer by including a ```SnackPlayer``` block in markdown.
 *
 * Optionally, include url parameters directly after the block's language.
 * Valid options are name, description, and platform.
 *
 * E.g.
 * ```SnackPlayer platform=android&name=Hello%20world!
 * import React from 'react';
 * import { Text } from 'react-native';
 *
 * export default class App extends React.Component {
 *   render() {
 *     return <Text>Hello World!</Text>;
 *   }
 * }
 * ```
 */
function SnackPlayer(md) {
  md.renderer.rules.fence_custom.SnackPlayer = function(
    tokens,
    idx,
    options,
    env,
    self
  ) {
    let params = parseParams(cleanParams(tokens[idx].params));

    const name = params.name ? decodeURIComponent(params.name) : 'Example';
    const description = params.description
      ? decodeURIComponent(params.description)
      : 'Example usage';
    const sampleCode = tokens[idx].content;
    const encodedSampleCode = encodeURIComponent(sampleCode);
    const platform = params.platform ? params.platform : 'ios';
    const supportedPlatforms = params.supportedPlatforms
      ? params.supportedPlatforms
      : 'ios,android,web';
    const rnVersion = params.version ? params.version : 'next';

    return (
      '<div class="snack-player">' +
      '<div class="mobile-friendly-snack" style="display: none">' +
      htmlForCodeBlock(sampleCode) +
      '</div>' +
      '<div class="desktop-friendly-snack" style="margin-top: 15px; margin-bottom: 15px">' +
      `<div
        data-snack-name="${name}"
        data-snack-description="${description}"
        data-snack-code="${encodedSampleCode}"
        data-snack-platform="${platform}"
        data-snack-supported-platforms=${supportedPlatforms}
        data-snack-preview="true"
        style="
          overflow: hidden;
          background: #fafafa;
          border: 1px solid rgba(0,0,0,.16);
          border-radius: 4px;
          height: 514px;
          width: 100%;
        "
      >` +
      '</div>' +
      '</div>' +
      '</div>'
    );
  };
}

/**
 * Use the WebPlayer by including a ```ReactNativeWebPlayer``` block in
 * markdown.
 *
 * Optionally, include url parameters directly after the block's language. For
 * the complete list of url parameters, see:
 * https://github.com/dabbott/react-native-web-player
 *
 * E.g.
 * ```ReactNativeWebPlayer platform=android
 * import React from 'react';
 * import { Text } from 'react-native';
 *
 * const App = () => <Text>Hello World!</Text>;
 * export default App;
 * ```
 */
function ReactNativeWebPlayer(md) {
  md.renderer.rules.fence_custom.ReactNativeWebPlayer = function(
    tokens,
    idx,
    options,
    env,
    self
  ) {
    const WEB_PLAYER_VERSION = '1.10.0';

    let sampleCode = tokens[idx].content;
    let hash = `#code=${encodeURIComponent(sampleCode)}`;

    let paramsString = cleanParams(tokens[idx].params);
    if (paramsString) {
      hash += `&${paramsString}`;
    }
    let params = parseParams(paramsString);

    return (
      '<div class="web-player">' +
      htmlForCodeBlock(sampleCode) +
      `<iframe style="margin-top: 4" width="100%" height="${
        parseParams(paramsString).platform === 'android' ? '425' : '420'
      }" data-src="//cdn.rawgit.com/dabbott/react-native-web-player/gh-v${WEB_PLAYER_VERSION}/index.html${hash}" frame-border="0"></iframe>` +
      `</div>` +
      '\n\n'
    );
  };
}

module.exports = {ReactNativeWebPlayer, SnackPlayer};

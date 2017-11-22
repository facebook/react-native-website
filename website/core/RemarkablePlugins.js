"use strict";

const hljs = require("highlight.js");
const escapeHtml = require("remarkable").utils.escapeHtml;

// Remove leading "SnackPlayer", "ReactNativeWebPlayer"
function cleanParams(params) {
  if (params && params.split(" ").length > 0) {
    return params.split(" ")[1];
  }

  return null;
}

function parseParams(paramString) {
  var params = {};

  if (paramString) {
    var pairs = paramString.split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      params[pair[0]] = pair[1];
    }
  }

  return params;
}

function htmlForCodeBlock(code) {
  return (
    '<pre><code class="hljs css javascript">' +
    hljs.highlight("javascript", code).value +
    "</code></pre>"
  );
}

const LatestSDKVersion = "23.0.0";
const ReactNativeToExpoSDKVersionMap = {
  "0.50": "23.0.0",
  "0.49": "22.0.0",
  "0.48": "21.0.0",
  "0.47": "20.0.0",
  "0.46": "19.0.0",
  "0.45": "18.0.0",
  "0.44": "17.0.0",
  "0.43": "16.0.0",
  "0.42": "15.0.0",
  "0.41": "14.0.0"
};

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

    const name = params.name ? decodeURIComponent(params.name) : "Example";
    const description = params.description
      ? decodeURIComponent(params.description)
      : "Example usage";
    const sampleCode = tokens[idx].content;
    const encodedSampleCode = encodeURIComponent(sampleCode);
    const platform = params.platform ? params.platform : "ios";
    let version = "next"; // Locked to latest. Could be read from params if needed in the future.
    if (version === "next") {
      version = LatestSDKVersion;
    } else {
      version = ReactNativeToExpoSDKVersionMap[version] || LatestSDKVersion;
    }

    return (
      '<div class="snack-player">' +
      '<div class="mobile-friendly-snack" style="display: none">' +
      htmlForCodeBlock(sampleCode) +
      "</div>" +
      '<div class="desktop-friendly-snack" style="margin-top: 15px; margin-bottom: 15px">' +
      `<div
        data-snack-name="${name}"
        data-snack-description="${description}"
        data-snack-code="${encodedSampleCode}"
        data-snack-platform="${platform}"
        data-snack-preview="true"
        data-snack-sdk-version="${version}"
        style="
          overflow: hidden;
          background: #fafafa;
          border: 1px solid rgba(0,0,0,.16);
          border-radius: 4px;
          height: 514px;
          width: 880px;
        "
      >` +
      "</div>" +
      "</div>" +
      "</div>"
    );
  };
}

function ReactNativeWebPlayer(md) {
  md.renderer.rules.fence_custom.ReactNativeWebPlayer = function(
    tokens,
    idx,
    options,
    env,
    self
  ) {
    const WEB_PLAYER_VERSION = "1.10.0";

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
      `<iframe style="margin-top: 4" width="880" height="${
        parseParams(paramsString).platform === "android" ? "425" : "420"
      }" data-src="//cdn.rawgit.com/dabbott/react-native-web-player/gh-v${
        WEB_PLAYER_VERSION
      }/index.html${hash}" frame-border="0"></iframe>` +
      `</div>` +
      "\n\n"
    );
  };
}

module.exports = { ReactNativeWebPlayer, SnackPlayer };

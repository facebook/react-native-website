/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default (function() {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  function initSnackPlayers() {
    console.log('initSnackPlayers');
    window.ExpoSnack.initialize();
  }

  function setupTabPanelsMutationObservers() {
    const tabPanels = document.querySelectorAll('[role=tabpanel]');
    console.log('setupTabPanelsMutationObservers', {tabPanels});
    tabPanels.forEach(tabPanel => {
      new MutationObserver(function(mutations, observer) {
        initSnackPlayers();
        console.log('tabPanel MutationObserver triggered', {tabPanels});
      }).observe(tabPanel, {childList: true});
    });
  }

  if (document.readyState === 'complete') {
    setupTabPanelsMutationObservers();
  } else {
    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'complete') {
        setupTabPanelsMutationObservers();
      }
    });
  }

  return {
    onRouteUpdate({location}) {
      console.log('onRouteUpdate', {location});

      // TODO temporary, because onRouteUpdate fires before the new route renders...
      // see https://github.com/facebook/docusaurus/issues/3399#issuecomment-704401189
      setTimeout(() => {
        initSnackPlayers();
        setupTabPanelsMutationObservers();
      }, 0);
    },
  };
})();

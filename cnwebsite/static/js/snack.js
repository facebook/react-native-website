
(function() {
  if (window.ExpoSnack) {
    return;
  }

  var ExpoSnack = {
    append: function(container, options) {
      options = options || {};
      options.id = options.id || container.dataset.snackId || container.dataset.sketchId;
      options.platform = options.platform || container.dataset.snackPlatform || container.dataset.sketchPlatform;
      options.supportedPlatforms = options.supportedPlatforms || container.dataset.snackSupportedPlatforms
      options.preview = options.preview || container.dataset.snackPreview || container.dataset.sketchPreview;
      options.sdkVersion = options.sdkVersion || container.dataset.snackSdkVersion;
      options.name = options.name || container.dataset.snackName;
      options.description = options.description || container.dataset.snackDescription;
      options.theme = options.theme || container.dataset.snackTheme;
      options.appetizePayerCode = options.appetizePayerCode || container.dataset.snackAppetizePayerCode;

      if (!options.code && container.dataset.snackCode) {
        options.code = decodeURIComponent(container.dataset.snackCode);
      }

      if (!options.dependencies && container.dataset.snackDependencies){
        options.dependencies = container.dataset.snackDependencies;
      }

      if (container.querySelector('iframe[data-snack-iframe]')) {
        return;
      }

      if (!options.id && !options.code) {
        return;
      }

      var iframeId = Math.random().toString(36).substr(2, 10);
      var iframe = document.createElement('iframe');

      var iframeQueryParams = '?preview=' + options.preview
        + '&platform=' + options.platform
        + '&iframeId=' + iframeId;

      if (options.supportedPlatforms) {
        iframeQueryParams += '&supportedPlatforms=' + options.supportedPlatforms;
      }
      if (options.sdkVersion) {
        iframeQueryParams += '&sdkVersion=' + options.sdkVersion;
      }
      if (options.name) {
        iframeQueryParams += '&name=' + options.name;
      }
      if (options.description) {
        iframeQueryParams += '&description=' + options.description;
      }
      if (options.theme) {
        iframeQueryParams += '&theme=' + options.theme;
      }
      if (options.appetizePayerCode) {
        iframeQueryParams += '&appetizePayerCode=' + options.appetizePayerCode
      }

      if (options.id) {
        iframe.src = 'https://snack.reactnative.cn/embedded/' + options.id + iframeQueryParams;
      } else {
        iframe.src = 'https://snack.reactnative.cn/embedded' + iframeQueryParams + '&waitForData=true';
      }
      iframe.style = 'display: block';
      iframe.height = '100%';
      iframe.width = '100%';
      iframe.frameBorder = '0';
      iframe.allowTransparency = true;
      iframe.dataset.snackIframe = true;

      container.appendChild(iframe);

      if (options.code || options.dependencies) {
        window.addEventListener('message', function(event) {
          var eventName = event.data[0];
          var data = event.data[1];
          if (eventName === 'expoFrameLoaded' && data.iframeId === iframeId) {
            iframe.contentWindow.postMessage(['expoDataEvent', {
              iframeId: iframeId,
              dependencies: options.dependencies,
              code: options.code,
            }], '*')
          }
        });
      }
    },

    remove: function(container) {
      var iframe = container.querySelector('iframe[data-snack-iframe]');

      if (iframe) {
        iframe.parentNode.removeChild(iframe);
      }
    },

    initialize: function() {
      document.querySelectorAll('[data-sketch-id], [data-snack-id], [data-snack-code]').forEach(function(element) {
        ExpoSnack.append(element);
      });
    }
  }

  if (document.readyState === "complete") {
    ExpoSnack.initialize();
  } else {
    document.addEventListener('readystatechange', function() {
      if (document.readyState === "complete") {
        ExpoSnack.initialize();
      }
    });
  }

  window.ExpoSnack = ExpoSnack;
  window.ExpoSketch = ExpoSnack;
})();

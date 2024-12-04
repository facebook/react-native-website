/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState, useEffect} from 'react';

function ThemeImage({lightSrc, darkSrc, className, alt}) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const themeObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme' &&
          mutation.target instanceof Element
        ) {
          setTheme(mutation.target.getAttribute('data-theme'));
        }
      });
    });

    const htmlElement = document.documentElement;
    themeObserver.observe(htmlElement, {
      attributes: true,
    });

    return () => themeObserver.disconnect();
  }, []);

  return (
    <img
      src={theme === 'dark' ? darkSrc : lightSrc}
      alt={alt}
      className={className}
    />
  );
}

export default ThemeImage;

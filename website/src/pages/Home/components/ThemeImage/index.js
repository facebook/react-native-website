import React from 'react';

// ThemeImage function component
function ThemeImage({lightSrc, darkSrc, className, alt}) {
  // Use a state to store the current theme (assuming the default is light)
  const [theme, setTheme] = React.useState('light');

  // Effect to handle changes in the data-theme attribute on the HTML element
  React.useEffect(() => {
    const themeObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          setTheme(mutation.target.getAttribute('data-theme'));
        }
      });
    });

    // Start observing the HTML element for attribute changes
    const htmlElement = document.documentElement;
    themeObserver.observe(htmlElement, {
      attributes: true, // configure it to listen to attribute changes
    });

    // Clean up function to disconnect the observer
    return () => themeObserver.disconnect();
  }, []);

  // Conditional rendering based on the theme
  return (
    <img
      src={theme === 'dark' ? darkSrc : lightSrc}
      alt={alt}
      className={className}
    />
  );
}

export default ThemeImage;

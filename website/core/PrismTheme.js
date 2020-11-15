var theme = {
  plain: {
    color: '#FFFFFF',
    background: '#282C34',
  },
  styles: [
    // other modifications
    {
      types: ['property'],
      style: {
        color: '#2aa198',
      },
    },
    // solarized-dark theme
    {
      types: ['attr-name', 'comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#93a1a1',
      },
    },

    {
      types: ['punctuation'],
      style: {
        color: '#657b83' /* base00 */,
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['selector', 'char', 'builtin', 'url'],
      style: {
        color: '#2aa198' /* cyan */,
      },
    },
    {
      types: ['entity'],
      style: {
        color: '#2aa198' /* cyan */,
      },
    },
    {
      types: ['atrule', 'inserted'],
      style: {
        color: '#859900' /* yellow */,
      },
    },
    {
      types: ['important', 'variable', 'deleted'],
      style: {
        color: '#cb4b16' /* orange */,
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['entity'],
      style: {
        cursor: 'help',
      },
    },
    // react-native theme
    {
      types: ['attr-name', 'keyword'],
      style: {
        color: '#c5a5c5',
      },
    },
    {
      types: ['string', 'regex', 'attr-value'],
      style: {
        color: '#8dc891',
      },
    },
    {
      types: ['number', 'constant', 'symbol'],
      style: {
        color: '#5a9bcf',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: '#ff8b50',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#fac863',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#79b6f2',
      },
    },
    {
      types: ['operator', 'tag'],
      style: {
        color: '#fc929e',
      },
    },
  ],
};

module.exports = theme;

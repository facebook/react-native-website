// This check is not a performant one, and can output false-positives due to rate limiting,
// hence it should be only run manually via `yarn  lint:markdown:links` script locally.
export default {
  plugins: [
    [
      '@react-native-website/remark-lint-no-broken-external-links',
      {
        skipUrlPatterns: [
          'www.apkfiles.com',
          'thehackernews.com',
          'github.com\/facebook\/react-native\/issues',
        ],
        baseUrl: 'https://reactnative.dev/docs',
        headers: {
          'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36`,
        },
      },
    ],
  ],
};

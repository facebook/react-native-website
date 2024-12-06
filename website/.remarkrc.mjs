export default {
  plugins: [
    [
      // "@react-native-website/remark-lint-no-broken-external-links",
      "remark-lint-no-dead-urls",
      {
        skipUrlPatterns: [
          // False positive, flagged as a bot and rate limited
          "www.apkfiles.com",
          // TODO: replace the 2048 example repository with another suitable project
          "github.com/JoelMarcey",
        ],
        from: "https://reactnative.dev/docs",
        skipLocalhost: true,
      },
    ],
  ],
};

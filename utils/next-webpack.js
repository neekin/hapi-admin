const babelIncludeRegexes = [
  /next[\\/]dist[\\/]shared[\\/]lib/,
  /next[\\/]dist[\\/]client/,
  /next[\\/]dist[\\/]pages/,
  /[\\/](strip-ansi|ansi-regex)[\\/]/,
  /styled-jsx[\\/]/,
  /hapi-admin[\\/]/,
  /hapi-admin-pro[\\/]/
]


function withHapiAdmin({adminOptions={},...nextConfig}) {
  return Object.assign({}, nextConfig, {
    webpack(config, opt) {
      const   { dir, defaultLoaders } = opt
      config.module.rules = [
        ...config.module.rules,
        {
          test: /\.(tsx|ts|js|cjs|mjs|jsx)$/,
          include: [dir, ...babelIncludeRegexes],
          use: defaultLoaders.babel,
          exclude: (excludePath) => {
            if (babelIncludeRegexes.some((r) => r.test(excludePath))) {
              return false;
            }
            return /node_modules/.test(excludePath);
          },
        },
      ];
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, opt);
      }
      return config;
    },
  });
}

module.exports = withHapiAdmin
const path = require('path');
const spawn = require('child_process').spawn;
const postcssPlugins = require('../config/postcss-plugins');

module.exports = {
  // fixes https://github.com/storybookjs/storybook/issues/15336
  typescript: {reactDocgen: false},

  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@locales': path.resolve(__dirname, '../locales/'),
      locales_dynamic: path.resolve(__dirname, '../locales/'),
    };
    config.resolve.extensions.push('.ts', '.tsx');

    const extraRules = [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]-[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: postcssPlugins,
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ];

    config.module.rules.push(...extraRules);

    return config;
  },

  docs: {
    autodocs: false,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};

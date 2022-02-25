'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../config/paths');
const shouldUseSourceMap = true;

exports.shouldUseSourceMap = shouldUseSourceMap;
// common function to get style loaders
// loader顺序：style-loader（MiniCssExtractPlugin.loader）、css-loader、postcss-loader、sass-loader（或less-loader等）
exports.getStyleLoaders = (cssOptions, preProcessor) => {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    !isEnvDevelopment && {
      loader: MiniCssExtractPlugin.loader,
      // css is located in `css/`, use '../' to locate index.html folder
      // in production `paths.publicUrlOrPath` can be a relative path
      options: paths.publicUrlOrPath.startsWith('.')
        ? { publicPath: '../' }
        : {},
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            'postcss-normalize',
          ],
        },
        sourceMap: !isEnvDevelopment ? shouldUseSourceMap : isEnvDevelopment,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    // css预处理工具：sass/less/stylus等
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: !isEnvDevelopment ? shouldUseSourceMap : isEnvDevelopment,
          root: paths.appSrc,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: !isEnvDevelopment ? shouldUseSourceMap : isEnvDevelopment,
        },
      },
    );
  }
  return loaders;
};
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const LIBS_DIR = path.resolve(__dirname, 'libs');

module.exports = env => {
  // const ionic = env.ionic === 'true'; TODO: use ionic

  return {
    entry: {
      game: SRC_DIR + '/index.ts',
    },

    output: {
      path: BUILD_DIR,
      filename: '[name].js',
      library: 'game',
      libraryTarget: 'umd',
    },

    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          include: [SRC_DIR, LIBS_DIR],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-env'],
            },
          },
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public', to: BUILD_DIR }],
      }),
    ],

    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules'],
      alias: {
        'phaser-framework': path.resolve(__dirname, './libs/phaser-framework'),
        '~': SRC_DIR,
      },
    },
  };
};

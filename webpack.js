const path = require('path');
const fs = require('fs');

module.exports = {
  entry: ['babel-polyfill', './src/client/assets/javascript/client.js'],
  output: {
    path: path.join(__dirname, '/src/client/assets/javascript/webpack-dist/'),
    filename: '../index.js'
  },
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            ...JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'))),
          }
        }]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    // Options
                  },
                ],
              ],
            },
          },
        },
          {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
    ]
  },
  devtool: 'source-map',
  watch: true
};

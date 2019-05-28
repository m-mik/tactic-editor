const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

const entry = PRODUCTION
  ? [
    'babel-polyfill',
    './src/app.jsx',
  ]
  : [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/app.jsx',
  ];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin(),
  new ExtractTextPlugin('./[name].[contenthash].css'),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

let plugins = [
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION),
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new HTMLWebpackPlugin({
    template: './src/index.html',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: PRODUCTION ? 'vendor.bundle.[hash].min.js' : 'vendor.bundle.js',
    minChunks(module) {
      return module.context && module.context.indexOf('node_modules') !== -1;
    },
  }),
];

plugins = plugins.concat(PRODUCTION ? prodPlugins : devPlugins);

const cssLoader = PRODUCTION
  ? ExtractTextPlugin.extract({
    use: [
      'css-loader?modules&minimize&localIdentName=[name]__[local]___[hash:base64:5]',
      'postcss-loader',
      'resolve-url-loader',
      'sass-loader?sourceMap',
    ],
    publicPath: '/',
  })
  : [
    'style-loader',
    'css-loader?&modules&importLoaders=3&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader',
    'resolve-url-loader',
    'sass-loader?sourceMap',
  ];

module.exports = {
  devtool: PRODUCTION ? 'source-map' : 'eval',
  entry,
  plugins,
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html-loader',
      query: {
        minimize: PRODUCTION,
        attrs: ['img:src', 'a:href'],
      },
      exclude: /node_modules/,
    }, {
      test: /\.(js|jsx)$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg|gif)$/,
      loaders: ['url-loader?limit=10000&name=[hash].[ext]'],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      loaders: cssLoader,
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loaders: cssLoader,
      exclude: /node_modules/,
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      use: 'url-loader?limit=10000&name=[name].[ext]',
      exclude: /node_modules/,
    }],
  },
  output: {
    filename: PRODUCTION ? 'bundle.[hash].min.js' : 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, PRODUCTION ? 'dist' : 'src'),
    historyApiFallback: true,
    port: 8080,
    compress: PRODUCTION,
    inline: DEVELOPMENT,
    hot: DEVELOPMENT,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};

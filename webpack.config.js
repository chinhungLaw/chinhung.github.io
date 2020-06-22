const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const UglifyJSPlugin = webpack.optimize.UglifyJsPlugin;

const getWebpackConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const output = './';

  let config = {
    devtool: isProduction ? undefined : 'cheap-module-source-map',
    devServer: {
      contentBase: output,
      host: '127.0.0.1',
      port: '8000',
      allowedHosts: [
        '127.0.0.1',
      ],
      public: 'http://127.0.0.1:8000'
    },
    entry: {
      include: [
        './pages/*/index.js',
      ],
    },
    output: {
      path: path.join(__dirname, output),
      filename: `js/[name]${isProduction ? '.[chunkhash:8]' : ''}.js`,
      publicPath: isProduction ? process.env.CDN_URL || './' : '/',
    },
    module: {
      rules: [
        // {
          // test: /\.js$/,
          // exclude: /node_modules/,
          // use: [
            // 'babel-loader',
          // ],
        // },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: isProduction,
                },
              },
            ],
          }),
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: isProduction,
                },
              }, {
                loader: "sass-loader",
              },
            ],
          }),
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024 * 5,
                fallback: 'file-loader',
                publicPath: '/img/',
                // img output path
                name: `[name].[hash:8].[ext]`,
              },
            },
          ],
        },
        {
          test: /\.(mp4|mp3)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: `img/[name].[hash:8].[ext]`,
            },
          },
        },
        {
          test: /\.(html|htm)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':src']
            }
          }
        },
      ],
    },
    plugins: [
      isProduction && new CleanWebpackPlugin([ output ]),
      new WebpackChunkHash(),
      // css output path
      new ExtractTextPlugin(`css/[name]${isProduction ? '.[contenthash:8]' : ''}.css`),
      isProduction && new UglifyJSPlugin(),
    ].filter(item => item),
  };

  const setHTMLPlugin = () => {
    Object.keys(config.entry).forEach(chunk => {
      const entry = config.entry[chunk];

      config.plugins.push(new HtmlWebpackPlugin({
        // html output path
        filename: `${chunk}.html`,
        // template path
        template: entry.replace(/\.js$/, '.html'),
        chunks: [ chunk ],
        minify: isProduction ? {
          minifyJS: true,
          minifyCSS: true,
          collapseWhitespace: true,
          preserveLineBreaks: true,
          removeComments: true,
        } : false,
      }));
    });
  };

  const setEntry = () => {
    const entry = {};
    glob.sync(config.entry.include).forEach(item => {
      const name = item.replace(/^(\.?[\/\\])?pages?[\/\\]/, '').replace(/[\\\/][^\/\\]*$/, '');
      entry[name] = item;
    });
    config.entry = entry;
  };

  setEntry();
  setHTMLPlugin();

  return config;
};

module.exports = getWebpackConfig();

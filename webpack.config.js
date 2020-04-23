const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack-hot-middleware');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');
module.exports = {
  mode: 'development',
  entry: {
    index: ['./src/index.js', hotMiddlewareScript],
    about: ['./src/about.js', hotMiddlewareScript]
  },
  output: {
    filename: '[name].bundle.js',
    path: dist,
    publicPath: '/'
  },
/*   devServer: {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
  }, */
  module: {
    rules: [{
        test: /\.css$/,

        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              name: '[name].[ext]',
              publicPath: 'styles',
              outputPath: 'styles',
              hmr: true
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: 'images',
          outputPath: 'images'
        }
        
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name]/[name].[ext]',
          publicPath: 'fonts',
          outputPath: 'fonts'
        }
      },
      {
        // Match woff2 in addition to patterns like .woff?v=1.1.1.
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            // Limit at 50k. Above that it emits separate files
            limit: 50000,
      
            // url-loader sets mimetype if it's passed.
            // Without this it derives it from the file extension
            mimetype: "application/font-woff",
            publicPath: 'fonts',
            outputPath: 'fonts',
            // Output below fonts directory
            name: '[name]/[name].[ext]',
          }
        },
      },
      {
        test: /\.html$/i,
        use: [
/*             'file-loader?name=[name].[ext]',
            'extract-loader', */
            'html-loader'
        ]
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/about.html',
      filename: 'about.html',
      inject: 'body',
      chunks: ['about'],
      title: 'About HTML'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['index'],
      title: 'Index HTML'
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
/*     new CopyWebpackPlugin([
      {
        from: "./src/fonts",
        to: "./fonts"
      },
      {
        from: "./src/favicon",
        to: "./favicon"
      },
      {
        from: "./src/images",
        to: "./images"
      }
    ]) */
  ]
};
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
    Game_Land: ['./src/Game_Land.js', hotMiddlewareScript]
  },
  output: {
    filename: '[name].bundle.js',
    path: dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: 'fonts',
          outputPath: 'fonts'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,

        use: [
          'style-loader',
          
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              name: '[name].[ext]',
              publicPath: 'styles',
              outputPath: 'styles',
              hmr: true,
            },
          },
          { 
            loader: 'css-loader',
            options: {
              url: true
            }
          },
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
          name: '[name].[ext]',
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
            name: '[name].[ext]',
          }
        },
      },
      {
        test: /\.html$/i,
        use: [
            'html-loader'
        ]
    },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.ProvidePlugin({
      slick: 'slick-carousel'
    }),
    new CleanWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    })
  ]
};
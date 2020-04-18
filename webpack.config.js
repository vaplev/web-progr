const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.html$/i,
        use: [
            'file-loader?name=[name].[ext]',
            'extract-loader',
            'html-loader'
        ]
    },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
/*     new HtmlWebpackPlugin({
      template: __dirname + '/src/about.html',
      filename: 'about.html',
      title: 'About HTML'
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
      title: 'Index HTML'
    })  */
    new HtmlWebpackPlugin({
      inject: true,
      filename: '/src/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: '/src/about.html'
    })
  ]
};
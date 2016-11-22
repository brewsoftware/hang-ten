var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    SingleModuleInstancePlugin = require('single-module-instance-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: './src/main/js/index.tsx'
  },
  output: {
    path: './content',
    filename: '[name].js',
    chunkFilename: './chunks/[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.IgnorePlugin(/^(fs|path)$/),

    // You may want to add this for production build only, because otherwise
    // you won't get detailed messages on React exceptions.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/main/index.ejs',
      minify: {collapseWhitespace: false}
    }),
    new ExtractTextPlugin('[name].css'),
    new SingleModuleInstancePlugin()
  ],
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'babel!ts'},
      {test: /\.json$/, loader: 'hson'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less?strictUnits=true&strictMath=true')}
    ]
  }
};

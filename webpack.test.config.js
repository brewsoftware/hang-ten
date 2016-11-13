var webpack = require('webpack'),
    glob = require('glob');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: glob.sync('./src/**/*.spec.ts')
  },
  output: {
    path: './content/test',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.IgnorePlugin(/^(fs|path)$/)
  ],
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'babel!ts'},
      {test: /\.json$/, loader: 'hson'},
      {test: /\.less$/, loader: 'null'}
    ]
  }
};

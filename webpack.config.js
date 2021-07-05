module.exports = {
  entry: {
    'assets/js/pack': './_packs/entry.js',
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9095
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  }
};

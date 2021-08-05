// Webpack이 실행될 때 참조하는 설정 파일
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',

  // entry file
  entry: ['./src/index.js', './src/index.css'],

  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname + '/public/'),
    filename: 'bundle.js',
  },

  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-transform-runtime', { regenerator: true }],
              [
                'babel-plugin-import',
                {
                  libraryName: '@material-ui/core',
                  // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                  libraryDirectory: 'esm',
                  camel2DashComponentName: false,
                },
                'core',
              ],
              [
                'babel-plugin-import',
                {
                  libraryName: '@material-ui/icons',
                  // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                  libraryDirectory: 'esm',
                  camel2DashComponentName: false,
                },
                'icons',
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const webpack = require('webpack');
const path = require('path');

module.exports = {
  /* webpack-dev-server를 콘솔이 아닌 자바스크립트로 실행 할 때, HotReloadMoule을 사용하기 위해선 dev-server 클라이언트와 핫 모듈을 따로 entry에 넣어주어야한다.*/
  mode: 'development',
  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://0.0.0.0:8080', // 개발서버의 포트가 이 부분에 입력되어야 제대로 작동한다.
    'webpack/hot/only-dev-server',
    './src/index.css',
  ],

  output: {
    path: '/', // public 이 아니고 /, 이렇게 하면 파일을 메모리에 저장하고 사용한다.
    filename: 'bundle.js',
  },

  // 개발서버 설정
  devServer: {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './public',
    /* 모든 요청을 프록시로 돌려서 express의 응답을 받아오며,
    bundle 파일의 경우엔 우선권을 가져서 devserver 의 스크립트를 사용하게 된다. */
    proxy: {
      '**': 'http://localhost:3000', // express 서버주소
    },
    stats: {
      // 콘솔 로그 최소화
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],

  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-hot-loader/babel', ['@babel/plugin-transform-runtime', { regenerator: true }]],
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

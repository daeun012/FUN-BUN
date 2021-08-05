const express = require('express');
const http = require('http');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const morgan = require('morgan');

const mongoose = require('mongoose');
const socketIOServer = require('socket.io');
const socketEevents = require('./socket/socketEvents');
const path = require('path');

const app = express();

const server = http.createServer(app);
const io = socketIOServer(server);

const userRoutes = require('./routes/userRoute');
const chatRoutes = require('./routes/chatRoute');

const port = 3000;
const devPort = 8080;

// mongodb 연결하기
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongod server');
});
mongoose.connect('mongodb://localhost:27017/funbun', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// 미들웨어
app.use('/', express.static(path.join(__dirname, './../public')));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(socketEevents(io));

// 라우트 API
app.use('/users/', userRoutes.router);
app.use('/chat/', chatRoutes.router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

server.listen(port, () => {
  console.log('Listening on port: ', port);
});

// development 환경일 때 개발서버를 킴
if (process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  const config = require('../webpack.dev.config');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(devPort, () => {
    console.log('webpack-dev-server is listening on port', devPort);
  });
}

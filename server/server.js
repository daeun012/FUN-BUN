const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketEevents = require('./socket/socketEvents');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const chatRoutes = require('./routes/chatRoute');

app.use(cors());

const port = 5000;
http.listen(port, () => {
  console.log('Listening on port: ', port);
});

// mongodb 연결하기
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongod server');
});
mongoose.connect('mongodb://localhost:27017/funbun', { useNewUrlParser: true, useUnifiedTopology: true });

// 미들웨어
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(socketEevents(io));

// 라우트 API
app.use('/auth/', authRoutes.router);
app.use('/users/', userRoutes.router);
app.use('/chat/', chatRoutes.router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

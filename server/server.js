const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/authRouter');

const port = 5000;
http.listen(port, () => {
  console.log('Listening on port: ', port);
});

// mongodb 연결하기
mongoose.connect('mongodb://localhost:27017/funbun', { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongod server');
});

// 미들웨어
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 라우트 API
app.use('/auth', authRoutes.router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

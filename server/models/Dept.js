const mongoose = require('mongoose');

const deptSchema = mongoose.Schema({
  deptno: Number,
  deptname: String,
});

module.exports = mongoose.model('Dept', deptSchema);

const mongoose = require('../config/db');
const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  postedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Notice', noticeSchema);

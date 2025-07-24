const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);

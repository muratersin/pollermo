const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema({
  optionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Vote', voteSchema);

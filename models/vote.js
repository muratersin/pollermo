const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = {
  optionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  ip: {
    type: String,
  },
};

module.exports = mongoose.model('Vote', voteSchema);

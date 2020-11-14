const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema(
  {
    pollId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    optionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    createdAt: Number,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  },
);

module.exports = mongoose.model('Vote', voteSchema);

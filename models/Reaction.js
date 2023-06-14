const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => createdAtVal.toISOString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;

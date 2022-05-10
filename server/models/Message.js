const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const messageSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      unique: false,
      trim: true
    },
    email: {
      type: String,
      required: 'You need to leave an email!',
      unique: false,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    messageText: {
      type: String,
      required: false,  //'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Message = model('Message', messageSchema);

module.exports = Message;

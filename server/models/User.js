const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
    },
    google: {
      id: String,
      email: {
        type: String,
        lowercase: true,
      },
      password: String,
    },
    facebook: {
      id: String,
      email: {
        type: String,
        lowercase: true,
      },
      password: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;

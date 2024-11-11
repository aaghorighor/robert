const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {    
    user: {
      first_name: { type: String, require: true },
      last_name: { type: String, require: false },     
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      required: true,
      maxlength: 1000,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Review', ReviewSchema);

const mongoose = require('mongoose')

const { Schema } = mongoose

const testimoniesSchema = new Schema(
  {
    church: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
    first_name: {
      type: String,
      trim: true,
      required: true
    },
    last_name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: false,
      max: 1000
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Testimonies', testimoniesSchema)

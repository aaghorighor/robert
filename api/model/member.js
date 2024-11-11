const mongoose = require('mongoose')

const { Schema } = mongoose

const memberSchema = new Schema(
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
    mobile: {
      type: String,
      trim: true,
      required: false,
      default: ''
    },
    user_status: {
      type: Boolean,
      default: false
    },
    email: { type: String, unique: true, lowercase: true },
    pin: {
      type: Number,
      default: 0
    },
    role: {
      type: String,
      required: false,
      default: ''
    }   
  },
  { timestamps: true }
)

memberSchema.statics.findByEmail = function (email) {
  const user = this.findOne({ email })
  return user
}

module.exports = mongoose.model('Member', memberSchema)

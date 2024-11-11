const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const userSchema = new Schema(
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
    otp: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user', 'owner']
    },
    password: {
      type: String,
      required: false
    },
    photo: {
      secure_url: {
        type: String,
        required: false,
        default: ''
      },
      public_id: {
        type: String,
        required: false,
        default: ''
      }
    }
  },
  { timestamps: true }
)

userSchema.statics.findByEmail = function (email) {
  const user = this.findOne({ email })
  return user
}

userSchema.methods.generatePasswordHash = function (password) {
  const saltRounds = 10
  const result = bcrypt.hash(password, saltRounds)
  return result
}

userSchema.methods.validatePassword = function (password) {
  try {
    return bcrypt.compare(password, this.password)
  } catch (error) {
    console.error(error)
    return false
  }
}
module.exports = mongoose.model('User', userSchema)

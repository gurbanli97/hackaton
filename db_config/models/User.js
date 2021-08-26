'use strict';
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    fullname: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    dob: {
      type: Date
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User"
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const User = mongoose.model('User', newSchema);
  return User;
};
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define User schema

const UserSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now
  },
  isTeacher: {
    type: Boolean,
    default: false
  },
  enrolls: [
    {
      course: {
        type: String
      },
      courseName: {
        type: String
      }
    }
  ]
});

UserSchema.methods.enroll = function(u) {
  this.enrolls.push(u);
  return this.save();
};

module.exports = User = mongoose.model("users", UserSchema);

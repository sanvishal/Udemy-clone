const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  courseName: {
    type: String,
    required: true
  },
  courseDescription: {
    type: String
  },
  rating: {
    type: Number
  },
  author: {
    type: String
  }
});

module.exports = Courses = mongoose.model("courses", CoursesSchema);

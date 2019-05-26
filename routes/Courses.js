const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const courses = express.Router();
const Courses = require("../models/Courses");
const Users = require("../models/User");

const nodemailer = require("nodemailer");
const keys = require("../config/keys");

//courses.use(cors());

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "udemyclonenoreply@gmail.com",
    pass: keys.PASSWORD
  }
});

courses.get("/:id", (req, res) => {
  Courses.findOne({
    _id: req.params.id
  })
    .then(course => {
      return res.json(course);
    })
    .catch(err => {
      return res.json({ status: "error", message: "Oops :( Please try again" });
    });
});

courses.get("/", (req, res) => {
  Courses.find({})
    .then(courses => {
      return res.json(courses);
    })
    .catch(err => {
      return res.json({ status: "error", message: "Oops :( Please try again" });
    });
});

courses.get("/getcourses/:id", (req, res) => {
  Users.findOne({ _id: req.params.id }).then(data => {
    return res.json(data);
  });
});

courses.post("/:id/enroll", (req, res) => {
  const decode = jwt.verify(req.body.token, process.env.SECRET);

  Users.findOne({
    _id: decode._id,
    "enrolls.course": req.params.id
  })
    .then(u => {
      if (!u) {
        console.log("found");
        Users.findOne({
          _id: decode._id
        }).then(user => {
          user
            .enroll({
              course: req.params.id,
              courseName: req.body.courseName
            })
            .then(r => {
              var mailOptions = {
                from: "udemyclonenoreply@gmail.com",
                to: decode.email,
                subject: "You have been enrolled in " + req.body.courseName,
                text: "You are enrolled in " + req.body.courseName
              };

              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });

              return res.json({
                status: "success",
                message: "course is successfully enrolled!"
              });
            })
            .catch(err => {
              return res.json({
                status: "error",
                message: "Oops :( Please try again"
              });
            });
        });
      } else {
        console.log("not found");
        return res.json({ status: "error", message: "Already registered" });
      }
    })
    .catch(err => {
      return res.json({ status: "error", message: "Oops :( Please try again" });
    });
});

courses.post("/addcourse", (req, res) => {
  const decode = jwt.verify(req.body.jwt, process.env.SECRET);

  const courseData = {
    author: req.body.author,
    courseName: req.body.courseName,
    courseDescription: req.body.courseDescription,
    rating: 0
  };

  if (decode.isTeacher) {
    Courses.create(courseData)
      .then(course => {
        return res.json({
          status: "success",
          message: "course is successfully created!"
        });
      })
      .catch(err => {
        return res.json({
          status: "error",
          message: "Oops :( Please try again"
        });
      });
  } else {
    return res.json({ status: "error", message: "Oops :( Please try again" });
  }
});

module.exports = courses;

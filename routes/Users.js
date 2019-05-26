const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// create a users router
const users = express.Router();
const User = require("../models/User");

// allow CORS
users.use(cors());

process.env.SECRET = "thisisascretdonttelltoanyoneshhhhhhh";

// post register account
users.post("/register", (req, res) => {
  const date = new Date();

  // Collect all the user data from form
  const UserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    createdon: date,
    isTeacher: req.body.isTeacher
  };

  // see if the email already exists in the DB else create one
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      // if user does not exist...
      if (!user) {
        // encrypt password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          UserData.password = hash;
          // store password and userdata in DB
          User.create(UserData)
            .then(user => {
              // send status to client
              res.json({
                status: "success",
                message: user.email + " is successfully registered!"
              });
            })
            .catch(err =>
              res.json({ status: "error", message: "Oops :( Please try again" })
            );
        });
      } else {
        res.json({
          // Duplicate account
          status: "error",
          message: "The user under email" + UserData.email + " already exists!"
        });
      }
    })
    .catch(err => {
      res.json({ status: "error", message: "Oops :( Please try again" });
    });
});

// post login form
users.post("/login", (req, res) => {
  User.findOne({
    // search for email in DB
    email: req.body.email
  })
    .then(user => {
      // if exists then search if password matches
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isTeacher: user.isTeacher
          };

          // Authenticate using JWT
          let token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 2000
          });

          // send encrypted token to client
          res.send(token);
        } else {
          // Wrong password
          res.json({
            status: "error",
            message: "Incorrect password!"
          });
        }
      } else {
        // User didn't register
        res.json({
          status: "error",
          message: "Account does not exist, please register to continue"
        });
      }
    })
    .catch(err => {
      res.json({
        status: "error",
        message: "Oops :( Something occured, try again"
      });
    });
});

// user dashboard
users.get("/profile", (req, res) => {
  // decode auth token
  const decode = jwt.verify(req.headers["authorization"], process.env.SECRET);

  User.findOne({
    _id: decode._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.json({
          status: "error",
          message: "User does not exist! please Register to continue"
        });
      }
    })
    .catch(err => {
      res.json({ status: "error", message: "Oops :( please try again!" });
    });
});

module.exports = users;

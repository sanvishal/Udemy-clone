const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const path = require("path");

// set up app using express
const app = express();

// set up port
const port = process.env.PORT || 5000;

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors middleware
app.use(cors());

// configure mongoose for mongodb
mongoose
  .connect(keys.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

var Users = require("./routes/Users");
var Courses = require("./routes/Courses");
// use users route
app.use("/users", Users);

// use courses route
app.use("/courses", Courses);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// start server
const serveHost = process.env.YOUR_HOST || "0.0.0.0";
app.listen(port, serveHost, () => {
  console.log(`Server started at port ${port}`);
});

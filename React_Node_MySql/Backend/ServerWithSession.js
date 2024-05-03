const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
var utils = require("./Utils");
var myLog = require("./MyLog.js");

const app = express();
const PORT = 2200;

// Initialization
app.use(cookieParser());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekey",
    saveUninitialized: true, // don't create session until something stored
    cookie: { maxAge: oneDay }, // session timeout of one day
    resave: true, // don't save session if unmodified
  })
);

// User Object we will receive ith data from frontend
const user = {
  name: "Helal",
  Roll_number: 10,
  Address: "Dhaka",
};

// Login page
app.get("/login", (req, res) => {
  if (utils.isValidUser(user.name, "password")) {
    req.session.user = user;
    req.session.isLoggedIn = true;
    req.session.userName = user.name;
    return res.send("Your are logged in");
  } else {
    return res.send("You are not authorized user");
  }
});

app.get("/user", (req, res) => {
  const sessionuser = req.session.user;
  res.send(sessionuser);
});

app.get("/isloggedin", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  const username = req.session.userName;

  if (isLoggedIn) {
    res.send("isLoggedIn: " + isLoggedIn + " userName: " + username);
  } else {
    res.send("isLoggedIn: " + isLoggedIn);
  }

});

// Logout page
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Your are logged out ");
});

app.listen(PORT, () => {
    myLog.info(`ServerWithSession Running at port ${PORT}`);
});

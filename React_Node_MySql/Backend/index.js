//https://blog.logrocket.com/build-rest-api-node-express-mysql/
//https://github.com/atharvadeosthale/rest-api-mysql-article/tree/master
const express = require("express");
const app = express();
const sessions = require("express-session");
const PORT = 2300;
const apiRoutes = require("./routes/APIroutes");
const myUtils = require("./utilities/MyUtils");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
const oneMin = 1000 * 60;

//session middleware
app.use(
  sessions({
    name: myUtils.SESSION_NAME_TAG,
    secret: myUtils.SESSION_SECRET,
    saveUninitialized: true, // don't create session until something stored
    cookie: { maxAge: oneDay }, // session timeout of one day
    resave: true, // don't save session if unmodified
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/we-learn", apiRoutes);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

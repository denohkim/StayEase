const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/student", function (req, res) {
  res.render("student-dashboard");
});

app.use(express.static("views"));
app.listen(PORT, function () {
  console.log(`Web server running at: http://localhost:${PORT}`);
  console.log("Type Ctrl+C to shut down the web server");
});

const express = require('express');
const path = require('path');
// const basicAuth = require('express-basic-auth')
const apiRoute = require('./routes/api');
const { getStudentsFromCsvfile, storeStudentInCsvFile } = require('./csvfile_manipulation');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('node_modules/normalize.css'));
// app.use(basicAuth({
//   users: { 'admin': 'supersecret' },
//   challenge: true
// }))

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Success");
});

app.get("/students", (req, res) => {
  getStudentsFromCsvfile((err, students) => {
    if (err) {
      console.error(err);
      res.send("ERROR");
    }
    res.render("students", {
      students,
    });
  });
});

app.get("/students/create", (req, res) => {
  res.render("create-students");
});

app.post("/students/create", (req, res) => {
  console.log(req.body);
  const student = req.body;
  storeStudentInCsvFile(student, (err, storeResult) => {
    if (err) {
      res.redirect("/students/create?error=1");
    } else {
      res.redirect("/students/create?created=1");
    }
  });
});

app.use('/api', apiRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })
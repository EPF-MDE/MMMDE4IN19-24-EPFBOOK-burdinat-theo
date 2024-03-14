const express = require('express');
const path = require('path');
const apiRoute = require('./routes/api');
const { getStudentsFromCsvfile, storeStudentInCsvFile } = require('./csvfile_manipulation');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set("views", "./views");
app.set("view engine", "ejs");

//TP2
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
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
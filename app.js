const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const apiRoute = require('./routes/api');
const { getFromCsvfile, storeStudentInCsvFile, getUserFromId, updateUser } = require('./csvfile_manipulation');
const StudentModel = require('./models/Student');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/epfbook');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('node_modules/normalize.css'));
app.use(basicAuth({
  challenge: true,
  authorizer: authorizer,
  authorizeAsync: true,
}));
app.use(cookieParser());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"))
});

app.get("/students", (req, res) => {
  getFromCsvfile("students",(err, students) => {
    if (err) {
      console.error(err);
      res.send("ERROR");
    }
    res.render("students", {
      students,
      model: "CSV"
    });
  });
});

app.get("/students/create", (req, res) => {
  res.render("create-students", { model: "CSV" });
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

app.get("/students/data", (req, res) => {
  res.render("students_data");
});

app.get("/students/create-in-db", (req, res) => {
  res.render("create-students", { model: "MongoDB" });
});

app.post("/students/create-in-db", (req, res) => {
  const student = new StudentModel(req.body);
  student.save().then((result) => {
    res.redirect("/students/create?created=1");
  }).catch((err) => {
    res.redirect("/students/create?error=1");
  });
});

app.get("/students/from-db", async (req, res) => {
  const students = await StudentModel.find({}).exec();
  res.render('students', { students, model: "MongoDB" });
});

app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id)+1;
  student = getUserFromId(id, (err, student) => {
    if (err) {
      res.send(err);
    } else {
      res.render('student_details', { student, success: req.query.success });
    }
  });
});

app.post('/students/:id', (req, res) => {
  const id = parseInt(req.params.id)+1;
  const {name, school} = req.body;
  updateUser(id, name, school, (err) => {
    if (err) {
      console.log(err);
      res.redirect(`/students/${id-1}?success=false`);
    } else {
      res.redirect(`/students/${id-1}?success=true`);
    }
  });
});

app.get('/students/:id/update', (req, res) => {
  const id = parseInt(req.params.id)+1;
  student = getUserFromId(id, (err, student) => {
    if (err) {
      res.send(err);
    } else {
      res.render('put_update', { student, success: req.query.success });
    }
  });
});

app.put('/students/:id/update', (req, res) => {
  const id = parseInt(req.params.id)+1;
  const {name, school} = req.body;
  updateUser(id, name, school, (err) => {
    if (err) {
      console.log(err);
      res.redirect(`/students/${id-1}?success=false`);
    } else {
      res.redirect(`/students/${id-1}?success=true`);
    }
  });
});

app.use('/api', apiRoute);

function authorizer(username, password, cb) {
  getFromCsvfile("users", (err, users) => {
    if (err) {
      console.error(err);
      return cb(null, false);
    }
    const foundUser = users.find((user) => {
      return basicAuth.safeCompare(user.username, username);
    });
    if (!foundUser) {
      return cb(null, false);
    } else {
      return bcrypt.compare(password, foundUser.password, cb)
    }
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port} : http://localhost:3000/`)
  })
const express = require('express');
const { getFromCsvfile, storeStudentInCsvFile, getUserFromId, updateUser } = require('../csvfile_manipulation');
const router = express.Router();
const StudentModel = require('../models/Student');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/epfbook');

router.get("/students", (req, res) => {
  getFromCsvfile("students", (err, students) => {
    if (err) {
      console.error(err);
      res.send("ERROR");
    }
    res.send(students);
  });
});
  
router.post("/students/create", (req, res) => {
  console.log(req.body);
  const student = req.body;
  storeStudentInCsvFile(student, (err) => {
    if (err) {
      res.send("error");
    } else {
      res.send("ok");
    }
  });
});

router.post("/login", (req, res) => {
  const token = "FOOBAR";
  const tokenCookie = {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60* 1000),
  };
  res.cookie("auth-token", token, tokenCookie);
  res.status(200).send("Cookie has been set");
  console.log(req.cookies);
});

router.post("/students/create-in-db", (req, res) => {
  const student = new StudentModel(req.body);
  student.save()
    .then(() => {
      res.redirect("/students/create?created=1");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/students/create?error=1");
    });
});

router.get("/students/from-db", async (req, res) => {
  const students = await StudentModel.find({}).exec();
  res.send(students);
});

router.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id)+1;
  getUserFromId(id, (err, student) => {
    if (err) {
      res.send(err);
    } else {
      res.send(student);
    }
  });
});

router.post('/students/:id', (req, res) => {
  const id = parseInt(req.params.id)+1;
  const {name, school} = req.body;
  updateUser(id, name, school, (err) => {
    if (err) {
      console.log(err);
      res.send("Failed to update student.");
    } else {
      res.send("Student updated successfully.");
    }
  });
});

router.put('/students/:id/update', (req, res) => {
  const id = parseInt(req.params.id)+1;
  const {name, school} = req.body;
  updateUser(id, name, school, (err) => {
    if (err) {
      console.log(err);
      res.send("Failed to update student.");
    } else {
      res.send("Student updated successfully.");
    }
  });
});

module.exports = router;
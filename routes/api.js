const express = require('express');
const { getFromCsvfile, storeStudentInCsvFile } = require('../csvfile_manipulation');
const router = express.Router();

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
  storeStudentInCsvFile(student, (err, storeResult) => {
    if (err) {
      res.status(500).send("error");
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


module.exports = router;
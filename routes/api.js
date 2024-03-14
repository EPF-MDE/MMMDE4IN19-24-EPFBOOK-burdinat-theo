const express = require('express');
const fs = require('fs')
const router = express.Router();

router.get("/students", (req, res) => {
    const rowSeparator = "\r\n";
    const cellSeparator = ","; 
    fs.readFile("students.csv", "utf-8", (err, data) => {
      const rows = data.split(rowSeparator);
      const [headerRow, ...contentRows] = rows;
      const header = headerRow.split(cellSeparator);
      const students = contentRows.map((row) => {
        const cells = row.split(cellSeparator);
        const student = { 
          [header[0]]: cells[0], 
          [header[1]]: cells[1], 
        };
        return student; 
      });
      res.send(students); 
    });
});
  
  
router.post("/students/create", (req, res) => {
    console.log(req.body);
    const csvLine = `\r\n${req.body.name},${req.body.school}`;
    console.log(csvLine);
    fs.writeFile("students.csv", csvLine, { flag: "a" }, (err) => { res.send("Student created");});
});

module.exports = router;
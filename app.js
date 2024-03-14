const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

app.use(express.json())

app.get("/api/students", (req, res) => {
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


app.post("/api/students/create", (req, res) => {
  console.log(req.body);
  const csvLine = `\r\n${req.body.name},${req.body.school}`;
  console.log(csvLine);
  fs.writeFile("students.csv", csvLine, { flag: "a" }, (err) => { res.send("Student created");});
})

//TP2
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })
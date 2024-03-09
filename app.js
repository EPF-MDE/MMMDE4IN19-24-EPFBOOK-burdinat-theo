const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! What a beautiful day today')
})


app.get("/students", (req, res) => {
  const rowSeparator = "\n";
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })
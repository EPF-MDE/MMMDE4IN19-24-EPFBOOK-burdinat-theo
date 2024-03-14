const fs = require('fs');

const getStudentsFromCsvfile = (cb) => {
  const rowSeparator = "\r\n";
  const cellSeparator = ",";
  fs.readFile("./students.csv", "utf8", (err, data) => {
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
    return cb(null, students);
  });
};

const storeStudentInCsvFile = (student, cb) => {
    const csvLine = `\r\n${student.name},${student.school}`;
    console.log(csvLine);
    fs.writeFile("./students.csv", csvLine, { flag: "a" }, (err) => {
      cb(err, "ok");
    });
  };

module.exports = {
    getStudentsFromCsvfile,
    storeStudentInCsvFile
};
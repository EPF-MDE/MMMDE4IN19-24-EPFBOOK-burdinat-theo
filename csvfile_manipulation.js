const fs = require('fs');

const getFromCsvfile = (fileName, cb) => {
  const rowSeparator = "\r\n";
  const cellSeparator = ",";
  const filePath = `./${fileName}.csv`;
  fs.readFile(filePath, "utf8", (err, data) => {
    const rows = data.split(rowSeparator);
    const [headerRow, ...contentRows] = rows;
    const header = headerRow.split(cellSeparator);

    const infos = contentRows.map((row) => {
      const cells = row.split(cellSeparator);
      const info = {
          [header[0]]: cells[0],
          [header[1]]: cells[1],
      };
      return info;
    });
    return cb(null, infos);
  });
};

const storeStudentInCsvFile = (student, cb) => {
  const csvLine = `\r\n${student.name},${student.school}`;
  console.log(csvLine);
  fs.writeFile("./students.csv", csvLine, { flag: "a" }, (err) => {
    cb(err, "ok");
  });
};

const getUserFromId = (id, cb) => {
  fs.readFile('students.csv', 'utf8', (err, data) => {
    if (err) {
        return cb("Error reading student data.");
    }
    const lines = data.split('\r\n');
    if (id <= 0 || id >= lines.length) {
        return cb("Student not found.");
    }
    const studentData = lines[id].split(',');
    const student = {
        name: studentData[0],
        school: studentData[1]
    };
    return cb(null, student);
  });
};

module.exports = {
    getFromCsvfile,
    storeStudentInCsvFile,
    getUserFromId
};
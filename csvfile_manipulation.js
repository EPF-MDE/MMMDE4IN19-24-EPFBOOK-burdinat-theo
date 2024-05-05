const fs = require('fs');
const path = require('path');

// Function to read data from a CSV file
const getFromCsvfile = (fileName, cb) => {
  const rowSeparator = "\r\n"; // Separator for rows in the CSV file
  const cellSeparator = ","; // Separator for cells in each row
  const filePath = `./${fileName}.csv`; // Path to the CSV file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return cb("Error reading file."); // Error handling if file read fails
    }
    const rows = data.split(rowSeparator); // Splitting the data into rows
    const [headerRow, ...contentRows] = rows; // Separating the header row from the content rows
    const header = headerRow.split(cellSeparator); // Splitting the header row into individual cells

    const infos = contentRows.map((row) => {
      const cells = row.split(cellSeparator); // Splitting each content row into individual cells
      const info = {
          [header[0]]: cells[0], // Creating an object with header cell as key and content cell as value
          [header[1]]: cells[1],
      };
      return info; // Returning the object for each content row
    });
    return cb(null, infos); // Returning the data to the callback function
  });
};

// Function to store a student's data in a CSV file
const storeStudentInCsvFile = (student, cb) => {
  const csvLine = `\r\n${student.name},${student.school}`; // Creating a CSV line with student's name and school
  fs.writeFile("./students.csv", csvLine, { flag: "a" }, (err) => {
    cb(err, "ok"); // Returning the result of the operation to the callback function
  });
};

// Function to get a user's data from their ID
const getUserFromId = (id, cb) => {
  fs.readFile('students.csv', 'utf8', (err, data) => {
    if (err) {
        return cb("Error reading student data."); // Error handling if file read fails
    }
    const lines = data.split('\r\n'); // Splitting the data into lines
    if (id <= 0 || id >= lines.length) {
        return cb("Student not found."); // Error handling if student ID is invalid
    }
    const studentData = lines[id].split(','); // Splitting the line into individual cells
    const student = {
        name: studentData[0], // Assigning the first cell as student's name
        school: studentData[1] // Assigning the second cell as student's school
    };
    return cb(null, student); // Returning the student data to the callback function
  });
};

// Function to update a user's data
const updateUser = (id, name, school, cb) => {
  const filePath = path.join(__dirname, 'students.csv'); // Path to the CSV file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return cb('Failed to read students data.'); // Error handling if file read fails
        }
        let lines = data.split('\r\n'); // Splitting the data into lines
        if (id <= 0 || id >= lines.length) {
            return cb('Student not found.'); // Error handling if student ID is invalid
        }
        lines[id] = `${name},${school}`; // Updating the line with new name and school
        const updatedContent = lines.join('\r\n'); // Joining the lines back into a single string
        fs.writeFile(filePath, updatedContent, (err) => {
            if (err) {
                return cb('Failed to update student.'); // Error handling if file write fails
            }
            return cb(null); // Returning success to the callback function
        });
    });
};

// Exporting the functions for use in app.js
module.exports = {
    getFromCsvfile,
    storeStudentInCsvFile,
    getUserFromId,
    updateUser
};
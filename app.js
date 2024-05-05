const express = require('express'); // Import express
const path = require('path'); // Import path
const basicAuth = require('express-basic-auth'); // Import express-basic-auth
const bcrypt = require('bcrypt'); // Import bcrypt
const cookieParser = require('cookie-parser'); // Import cookie-parser
const mongoose = require('mongoose'); // Import mongoose
const apiRoute = require('./routes/api'); // Import api route
const { getFromCsvfile, storeStudentInCsvFile, getUserFromId, updateUser } = require('./csvfile_manipulation'); // Import csv file manipulation functions
const StudentModel = require('./models/Student'); // Import Student model (MongoDB)

const app = express(); // Create express app
const port = process.env.PORT || 3000; // Set port (3000 by default if not set in environment variable)

mongoose.connect('mongodb://localhost:27017/epfbook'); // Connect to MongoDB database

app.use(express.json()); // Use express.json() middleware
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded() middleware 
app.use(express.static('public')); // Set static folder
app.use(express.static('node_modules/normalize.css')); // Set normalize.css folder
// Set basic auth middleware
app.use(basicAuth({
  challenge: true,
  authorizer: authorizer,
  authorizeAsync: true,
}));
app.use(cookieParser()); // Use cookie-parser middleware

app.set("views", "./views"); // Set views folder
app.set("view engine", "ejs"); // Set view engine to ejs

// Home page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"))
});

// Students list from CSV page route
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

// Create student in CSV page route
app.get("/students/create", (req, res) => {
  res.render("create-students", { model: "CSV" });
});

// Create student in CSV from webpage post route
app.post("/students/create", (req, res) => {
  console.log(req.body);
  const student = req.body;
  storeStudentInCsvFile(student, (err) => {
    if (err) {
      res.redirect("/students/create?error=1");
    } else {
      res.redirect("/students/create?created=1");
    }
  });
});

// Student data viz page route
app.get("/students/data", (req, res) => {
  res.render("students_data");
});

// Create student in MongoDB page route
app.get("/students/create-in-db", (req, res) => {
  res.render("create-students", { model: "MongoDB" });
});

// Create student in MongoDB from webpage post route
app.post("/students/create-in-db", (req, res) => {
  const student = new StudentModel(req.body);
  student.save()
    .then(() => {
      res.redirect("/students/create-in-db?created=1");
    })
    .catch((err) => {
      console.error(err);
      res.redirect("/students/create-in-db?error=1");
    });
});

// Students list from MongoDB page route
app.get("/students/from-db", async (req, res) => {
  const students = await StudentModel.find({}).exec();
  res.render('students', { students, model: "MongoDB" });
});

// Student details page route
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id)+1;
  const id_link = id-1;
  getUserFromId(id, (err, student) => {
    if (err) {
      res.send(err);
    } else {
      res.render('student_details', { student, id_link, success: req.query.success });
    }
  });
});

// Student update from website route (post method)
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

// Student update from website page route (put method)
app.get('/students/:id/update', (req, res) => {
  const id = parseInt(req.params.id)+1;
  getUserFromId(id, (err, student) => {
    if (err) {
      res.send(err);
    } else {
      res.render('put_update', { student, success: req.query.success, id_link: id-1});
    }
  });
});

// Student update from website route (put method)
app.put('/students/:id/update', (req, res) => {
  const id = parseInt(req.params.id);
  const {name, school} = req.body;
  updateUser(id, name, school, (err) => {
    if (err) {
      console.log(err);
      res.json({ success: false, message: "Failed to update student.", error: err });
    } else {
      res.json({ success: true, message: "Student updated successfully." });
    }
  });
});

app.use('/api', apiRoute); // Use api route for all api endpoints

// Basic auth authorizer function
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

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port} : http://localhost:3000/`)
  })
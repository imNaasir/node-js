const express = require("express");

// import model
const students = require("./model");
const server = express();

server.use(express.json());

// get endpoint
server.get("/", function (req, res) {
  res.json("hello from express");
});

// get all students
server.get("/api/students", (req, res) => {
  students
    .getAllStudents()
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      req.status(400).json({ message: "couldn't get students" });
      // res.json(error);
    });
});

// get one student
server.get("/api/students/:id", (req, res) => {
  let {id} = req.params;
  let studentId = Number(id);
  // console.log("id");
  // console.log(studentId);
  students
    .findById(studentId)
    .then((student) => {

      
      // res.status(200).json({ message: `student ${id} founded successfully` });
      if (student == null) {
        res.status(404).json({ message: `student ${id} not found` });
      } else {
        res.json(student);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `student ${id} could not be found` });
    });
});

const port = 3000;
server.listen(port, () => {
  console.log("server started");
});

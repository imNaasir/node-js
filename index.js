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
      req.status(400).json({message: "couldn't get students"});
      // res.json(error);
    });
});

// get one student
server.get("/api/student", (req, res) => {
  let id = req.params
  students.findById(id).then((students) => {res.json(students);}).catch((error) => {

})

const port = 3000;
server.listen(port, () => {
  console.log("server started");
});

const express = require("express");
const students = require("./model");
const server = express();

server.use(express.json());

server.get("/", function (req, res) {
  res.json("hello from express");
});

server.get("/api/students", (req, res) => {
  students
    .getAllStudents()
    .then((students) => {
      res.json(students);
    })
    .catch((error) => {
      console.error("Error getting students:", error);
      res
        .status(500)
        .json({ message: "Internal server error - couldn't get students" });
    });
});

server.get("/api/students/:id", (req, res) => {
  let { id } = req.params;
  let studentId = Number(id);
  students
    .findById(studentId)
    .then((student) => {
      if (student == null) {
        res.status(404).json({ message: `Student with id ${id} not found` });
      } else {
        res.json(student);
      }
    })
    .catch((error) => {
      console.error(`Error finding student with id ${id}:`, error);
      res
        .status(500)
        .json({
          message: `Internal server error - student ${id} could not be found`,
        });
    });
});

// add new student
server.post("/api/students", (req, res) => {
  let body = req.body;
  if (!body.name) {
    res.status(400).json({ message: "Name is required" });
  } else {
    students
      .add_student(body)
      .then((student) => {
        res.status(201).json(student); // 201 Created status code for successful resource creation
      })
      .catch((error) => {
        console.error("Error creating student:", error);
        res
          .status(500)
          .json({
            message: "Internal server error - could not create student",
          });
      });
  }
});

// update student
server.put("/api/students/:id", async (req, res) => {
  let { id } = req.params;
  console.log("update", req.body);

  try {
    let body = req.body;
    let updatedStudent = await students.update_student(id, req.body);
    if (updatedStudent == null) {
      res.status(404).json({ message: `Student with id ${id} not found` });
    } else {
      res.json(updatedStudent);
    }
  } catch (err) {
    console.error("Error updating student:", err);
    res
      .status(500)
      .json({
        message: `Internal server error - could not update student with id ${id}`,
      });
  }
});

server.delete("/api/students/:id", function (req, res) {
  let { id } = req.params;

  students
    .deleteStudent(id)
    .then((student) => {
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: `Student with id ${id} not found` });
      }
    })
    .catch((error) => {
      console.error("Error deleting student:", error);
      res
        .status(500)
        .json({ message: "Internal server error - could not delete student" });
    });
});


const port = 4000;
server.listen(port, () => {
  console.log("Server started on port", port);
});

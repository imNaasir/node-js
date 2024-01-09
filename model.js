const nanoid = require("nanoid");

function getId() {
  return nanoid().slice(0, 5);
}

let students = [
  { id: getId(), name: "Mohamed", school: "Alrashad", grade: "A", age: 21 },
  { id: getId(), name: "Faarah", school: "Albiri", grade: "b", age: 23 },
  { id: getId(), name: "Fadumo", school: "Albiri", grade: "c", age: 29 },
];

module.exports = {
  async getAllStudents() {
    return students;
  },

  // get one student
  async findById(id) {
    const student = students.find((student) => student.id === id);
    return student;
  },

  // add students
  async add_student({ name, school, grade, age }) {
    const newStudent = {
      id: getId(),
      name: name,
      school: school,
      grade: grade,
      age: age,
    };
    students.push(newStudent);
    return newStudent;
  },

  // update student
  async update(id, changes) {
    const student = students.find((student) => student.id === id);
    console.log(student);

    const updatedStudent = { ...changes, id };
    students = students.map((student) =>
      student.id === id ? updatedStudent : student
    );
    return updatedStudent;
  },

  //   delete student
  async deleteStudent(id) {
    const student = students.find((student) => student.id === id);
    students = students.filter((student) => student.id !== id);
    return student;
  },
};

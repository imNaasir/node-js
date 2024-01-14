let students = [
  { id: 1, name: "Mohamed", school: "Alrashad", grade: "A", age: 21 },
  { id: 2, name: "Faarah", school: "Albiri", grade: "b", age: 23 },
  { id: 3, name: "Fadumo", school: "Albiri", grade: "c", age: 29 },
];

let nextId = 4; // Initialize nextId with the next available id

module.exports = {
  async getAllStudents() {
    return students;
  },

  async findById(id) {
    const student = students.find((student) => student.id === id);
    return student;
  },

  async add_student({ name, school, grade, age }) {
    const newStudent = {
      id: nextId++,
      name: name,
      school: school,
      grade: grade,
      age: age,
    };
    students.push(newStudent);
    return newStudent;
  },

  async update_student(id, changes) {
    id = Number(id); // Convert id to a number if it's a string
    console.log(id);

    const student = students.find((student) => student.id === id);
    console.log(student);

    if (!student) {
      return null; // If the student with the given id is not found
    }

    const updatedStudent = { ...changes, id };
    students = students.map((s) => (s.id === id ? updatedStudent : s));
    return updatedStudent;
  },

  async deleteStudent(id) {
    const studentIndex = students.find((student) => student.id === id);
    if (studentIndex !== -1) {
      const deletedStudent = students.splice(studentIndex, 1);
      return deletedStudent[0];
    } else {
      return null; // If the student with the given id is not found
    }
  },
};

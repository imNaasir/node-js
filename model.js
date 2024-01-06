let students = [
    {id: 1, name: 'Mohamed', school: 'Alrashad', grade: 'A', age: 21},
    {id: 2, name: 'Faarah', school: 'Albiri', grade: 'b', age: 23},
    {id: 3, name: 'Fadumo', school: 'Albiri', grade: 'c', age: 29},
];

module.exports = {
    async getAllStudents() {
        return students
    },

    // get one student
    async findById(id) {
        const student = students.find(student => student.id === id);
        return student
    }
}
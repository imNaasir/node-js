import { nanoid } from 'nanoid'

function getNanoid() {
    return nanoid().slice(0, 5)
};

let students = [
    {id: nanoid(), name: 'Mohamed', school: 'Alrashad', grade: 'A', age: 21},
    {id: nanoid(), name: 'Faarah', school: 'Albiri', grade: 'b', age: 23},
    {id: nanoid(), name: 'Fadumo', school: 'Albiri', grade: 'c', age: 29},
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
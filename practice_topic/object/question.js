// Student object
const student = {
    name: "Monish Khambalkar",
    age: 22,
    course: "Computer Science",
    subjects: {
        math: 85,
        english: 92,
        physics: 78,
        chemistry: 88
    }
};


student.rollNO = 30;
student["attendance"] = "92%";

console.log(student)
console.log(Object.keys(student))

student1 = Object.values(student)

// Export only the object
module.exports = student1;

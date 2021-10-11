import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var studentsTbody = document.getElementById('students');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var inputMinimumBox = document.getElementById("minimum-box");
var inputMaximumBox = document.getElementById("maximum-box");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    console.log('Desplegando estudiantes');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.codigo + "</td>\n                             <td>" + student.cedula + "</td>\n                             <td>" + student.edad + "</td>\n                             <td>" + student.direccion + "</td>\n                             <td>" + student.telefono + "</td>";
        studentsTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    var minimum = inputMinimumBox.valueAsNumber;
    var maximum = inputMaximumBox.valueAsNumber;
    if (isNaN(minimum)) {
        minimum = minimum || 0;
    }
    if (isNaN(maximum)) {
        maximum = maximum || 5;
    }
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByNameMinMax(text, minimum, maximum, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByNameMinMax(nameKey, minimum, maximum, courses) {
    var coursesFiltered = nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
    var coursesFilteredmin = coursesFiltered.filter(function (c) {
        return c.credits >= minimum;
    });
    var coursesFilteredmax = coursesFilteredmin.filter(function (c) {
        return c.credits <= maximum;
    });
    return coursesFilteredmax;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}

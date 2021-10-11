import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputMinimumBox: HTMLInputElement = <HTMLInputElement> document.getElementById("minimum-box")!;
const inputMaximumBox: HTMLInputElement = <HTMLInputElement> document.getElementById("maximum-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
function renderStudentsInTable(students: Student[]): void {
    console.log('Desplegando estudiantes');
    students.forEach((student) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${student.codigo}</td>
                             <td>${student.cedula}</td>
                             <td>${student.edad}</td>
                             <td>${student.direccion}</td>
                             <td>${student.telefono}</td>`;
      studentsTbody.appendChild(trElement);
    });
  }
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  let minimum = inputMinimumBox.valueAsNumber;
  let maximum = inputMaximumBox.valueAsNumber;
  if (isNaN(minimum)){
    minimum = minimum || 0
  }
  if (isNaN(maximum)){
    maximum = maximum || 5
  }
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByNameMinMax(text, minimum, maximum, dataCourses);
  renderCoursesInTable(coursesFiltered);
}


function searchCourseByNameMinMax(nameKey: string,minimum: number,maximum: number, courses: Course[]) {
  let coursesFiltered = nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
  let coursesFilteredmin = coursesFiltered.filter( c => 
    c.credits >= minimum);
  let coursesFilteredmax = coursesFilteredmin.filter( c => 
    c.credits <= maximum);
  return coursesFilteredmax;
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
// Get foorm and student list conatiner
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem('students')) || [];

/**
 * Save current students array to localStorage
 * and re-render the student list on the page
 */
function saveAndRender(){
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
}

function renderStudents(){
    studentList.innerHTML = '';
    students.forEach((student, index)=>{
        const div = document.createElement('div');
        div.className = "student-record";
        div.innerHTML= `${student.name} | ${student.id} | ${student.email} | ${student.contact}
      <div>
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </div>`;
      studentList.appendChild(div);
    });
}

// When the form is submitted
form.addEventListener("submit",function(e){
    e.preventDefault();


const name = document.getElementById("studentName").value.trim();
const id = document.getElementById("studentId").value.trim();
const email = document.getElementById("emailId").value.trim();
const contact = document.getElementById("contactNo").value.trim();

// Validation to ensure correct data is filled
if(!/^[A-Za-z\s]+$/.test(name)){
    alert('Name must contain only letters');
    return;
}

if(!/^\d+$/.test(id)){
    alert('Student ID must be numeric');
    return;
}

if(!/^\d+$/.test(contact)){
    alert('Contact No must be numeric');
    return;
}

 if (!email.includes('@') || !email.includes('.')) {
    alert('Please enter a valid email');
    return;
} 

students.push({name, id, email, contact});

saveAndRender();

form.reset();
});

function editStudent(index){
    const student = students[index];
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentId").value = student.Id;
    document.getElementById("emailId").value = student.email;
    document.getElementById("contactNo").value = student.contact;

    students.splice(index, 1);

    saveAndRender();
}

function deleteStudent(index){
    if (confirm('Are you sure you want to delete this record ?')) {
        students.splice(index, 1);
        saveAndRender();
    }
}

renderStudents();





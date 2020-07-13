
const documentReady=()=>{
    const addMark=document.getElementById('addForm');
    const listStudent=document.getElementById('list-students');
    const listSubject=document.getElementById('list-subjects');
    axios.get('http://localhost:8080/schoolAPI/students')
          .then(function (response) {
            console.log(response);
            response.data.forEach((student)=>{
                listStudent.innerHTML+=`<option value=`+student.id+`>${student.id}- ${student.first_name} ${student.last_name}</option>`
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    axios.get('http://localhost:8080/schoolAPI/subjects')
          .then(function (response) {
            console.log(response);
            response.data.forEach((subject)=>{
                listSubject.innerHTML+=`<option value=`+subject.id+`>${subject.id}- ${subject.title}</option>`
            })
          })
          .catch(function (error) {
            console.log(error);
          });

    addMark.addEventListener('submit',(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/schoolAPI/marks', {
            students: listStudent.options[listStudent.selectedIndex].value,
            subjects: listSubject.options[listSubject.selectedIndex].value,
            mark:document.getElementById('mark').value
          })
          .then(function (response) {
            console.log(response);
            window.location.replace("http://localhost:5500/srtdash/tableMarks.html");
          })
          .catch(function (error) {
            console.log(error);
          });
    });
}

document.addEventListener('DOMContentLoaded', documentReady, false);